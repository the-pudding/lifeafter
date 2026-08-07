#!/usr/bin/env python3
"""
shape_garments.py

Turns clothing into SHAPE rather than line work: cuts new edge loops into the base
mesh at each garment boundary, then inflates the clothed regions outward so the
silhouette itself steps at every hem.
"""

import argparse, json, re, struct, sys
from pathlib import Path
import numpy as np

# -------------------------------------------------------------------------- glTF + rig helpers

ARM_BONES = ("upper_arm", "forearm", "hand")

COMP = {5120: "i1", 5121: "u1", 5122: "i2", 5123: "u2", 5125: "u4", 5126: "f4"}
NCOMP = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}

def read_glb(path):
    d = Path(path).read_bytes()
    if d[:4] != b"glTF":
        sys.exit(f"{path} is not a GLB (binary glTF).")
    jlen = struct.unpack_from("<I", d, 12)[0]
    gltf = json.loads(d[20 : 20 + jlen].decode("utf-8"))
    blen = struct.unpack_from("<I", d, 20 + jlen)[0]
    off = 20 + jlen + 8
    return gltf, bytearray(d[off : off + blen])

def write_glb(path, gltf, buf):
    buf = bytearray(buf)
    while len(buf) % 4:
        buf.append(0)
    gltf["buffers"][0]["byteLength"] = len(buf)
    js = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
    js += b" " * (-len(js) % 4)
    total = 12 + 8 + len(js) + 8 + len(buf)
    out = bytearray()
    out += b"glTF" + struct.pack("<II", 2, total)
    out += struct.pack("<I", len(js)) + b"JSON" + js
    out += struct.pack("<I", len(buf)) + b"BIN\x00" + bytes(buf)
    Path(path).write_bytes(out)
    return total

def read_accessor(gltf, buf, idx):
    a = gltf["accessors"][idx]
    bv = gltf["bufferViews"][a["bufferView"]]
    n = NCOMP[a["type"]]
    dt = np.dtype("<" + COMP[a["componentType"]])
    off = bv.get("byteOffset", 0) + a.get("byteOffset", 0)
    stride = bv.get("byteStride")
    if stride and stride != n * dt.itemsize:
        raw = np.frombuffer(buf, np.uint8, count=stride * a["count"], offset=off)
        raw = raw.reshape(a["count"], stride)[:, : n * dt.itemsize].copy()
        arr = raw.view(dt).reshape(a["count"], n)
    else:
        arr = np.frombuffer(buf, dt, count=a["count"] * n, offset=off).reshape(a["count"], n)
    return arr.astype(np.float64) if dt.kind == "f" else arr.astype(np.int64)

def add_accessor(gltf, buf, arr, comp_type, type_str, minmax=False, target=None):
    dt = np.dtype("<" + COMP[comp_type])
    data = np.ascontiguousarray(arr, dtype=dt).tobytes()
    while len(buf) % 4:
        buf.append(0)
    bv_off = len(buf)
    buf += data
    gltf["bufferViews"].append(
        {"buffer": 0, "byteOffset": bv_off, "byteLength": len(data)}
        | ({"target": target} if target else {})
    )
    acc = {
        "bufferView": len(gltf["bufferViews"]) - 1,
        "componentType": comp_type,
        "count": int(np.asarray(arr).shape[0]),
        "type": type_str,
    }
    if minmax:
        a = np.asarray(arr, dtype=np.float64)
        acc["min"] = [float(v) for v in a.min(axis=0)]
        acc["max"] = [float(v) for v in a.max(axis=0)]
    gltf["accessors"].append(acc)
    return len(gltf["accessors"]) - 1

def bind_joint_positions(gltf, buf, skin):
    ibm = read_accessor(gltf, buf, skin["inverseBindMatrices"])
    ibm = ibm.reshape(-1, 4, 4).transpose(0, 2, 1)
    return np.linalg.inv(ibm)[:, :3, 3]

def probe_landmarks(gltf, buf, skin, positions):
    names = [gltf["nodes"][n].get("name", "") or "" for n in skin["joints"]]
    jp = bind_joint_positions(gltf, buf, skin)

    def find(*frags, side="L"):
        for i, n in enumerate(names):
            low = n.lower()
            if all(f in low for f in frags) and f".{side.lower()}" in low:
                return i
        for i, n in enumerate(names):
            if all(f in n.lower() for f in frags):
                return i
        return None

    i_ua, i_fa = find("upper_arm"), find("forearm")
    if i_ua is None or i_fa is None:
        sys.exit("Could not find upper_arm / forearm bones; rig naming is unexpected.")

    arm_root = jp[i_ua].copy()
    arm_root[0] = abs(arm_root[0])
    tip = jp[i_fa].copy()
    tip[0] = abs(tip[0])
    arm_dir = tip - arm_root
    arm_dir /= np.linalg.norm(arm_dir)

    i_neck = find("spine.006") or find("neck")
    head_top = positions[:, 1].max()
    neck_y = jp[i_neck][1] if i_neck is not None else head_top * 0.88
    arm_joints = {i for i, n in enumerate(names) if any(b in n.lower() for b in ARM_BONES)}
    head_joints = set()
    if i_neck is not None:
        head_joints = {i for i, n in enumerate(names)
                       if n.lower().startswith(names[i_neck].lower().rsplit("_", 1)[0])}

    return dict(
        height=float(head_top - positions[:, 1].min()),
        head_top=float(head_top),
        arm_root=arm_root,
        arm_dir=arm_dir,
        upper_arm_len=float(np.linalg.norm(jp[i_fa] - jp[i_ua])),
        neck_y=float(neck_y),
        arm_joints=arm_joints,
        head_joints=head_joints,
    )

def weld(P, N, J, W):
    lookup, canon = {}, np.empty(len(P), np.int64)
    for i, p in enumerate(P):
        canon[i] = lookup.setdefault(tuple(np.round(p, 5)), len(lookup))
    n = len(lookup)
    Pc = np.zeros((n, 3)); Nc = np.zeros((n, 3))
    Jc = np.zeros((n, 4), np.int64); Wc = np.zeros((n, 4))
    for i, c in enumerate(canon):
        Pc[c] = P[i]
        Nc[c] += N[i]
        if W[i].sum() > W[Wc[c].argmax() if Wc[c].any() else 0].sum() or not Wc[c].any():
            Jc[c], Wc[c] = J[i], W[i]
    ln = np.linalg.norm(Nc, axis=1, keepdims=True)
    Nc = np.divide(Nc, ln, out=np.tile([0.0, 0.0, 1.0], (n, 1)), where=ln > 1e-9)
    return canon, Pc, Nc, Jc, Wc

def merge_skin(j0, w0, j1, w1, t):
    acc = {}
    for j, w in zip(j0, w0 * (1.0 - t)):
        if w > 0:
            acc[int(j)] = acc.get(int(j), 0.0) + w
    for j, w in zip(j1, w1 * t):
        if w > 0:
            acc[int(j)] = acc.get(int(j), 0.0) + w
    top = sorted(acc.items(), key=lambda kv: -kv[1])[:4]
    joints = np.zeros(4, np.uint16)
    weights = np.zeros(4, np.float32)
    for k, (j, w) in enumerate(top):
        joints[k], weights[k] = j, w
    s = weights.sum()
    if s > 0:
        weights /= s
    else:
        weights[0] = 1.0
    return joints, weights

OUTFITS = {
    # Standard but baggier
    "tshirtJeans":       dict(neck=0.66, sleeve=0.75, shirt_hem=3.25, waist=3.60, hem=0.66, shoe=0.60, shirt_thick=0.08, pants_thick=0.10),
    "tshirtShorts":      dict(neck=0.66, sleeve=0.75, shirt_hem=3.25, waist=3.60, hem=2.55, shoe=0.60, shirt_thick=0.08, pants_thick=0.08),
    "tshirtShortShorts": dict(neck=0.66, sleeve=0.75, shirt_hem=3.25, waist=3.60, hem=2.95, shoe=0.60, shirt_thick=0.08, pants_thick=0.07),
    "longSleeve":        dict(neck=0.62, sleeve=1.95, shirt_hem=3.25, waist=3.60, hem=0.66, shoe=0.60, shirt_thick=0.09, pants_thick=0.10),
    "tank":              dict(neck=0.80, sleeve=0.62, shirt_hem=3.25, waist=3.60, hem=2.20, shoe=0.60, shirt_thick=0.06, pants_thick=0.09),
    
    # Noticeably oversized/heavy materials
    "hoodie":            dict(neck=0.50, sleeve=1.95, shirt_hem=3.05, waist=3.60, hem=0.66, shoe=0.60, shirt_thick=0.15, pants_thick=0.12),
    "hoodieBaggyPants":  dict(neck=0.50, sleeve=1.95, shirt_hem=3.05, waist=3.60, hem=0.66, shoe=0.60, shirt_thick=0.15, pants_thick=0.18),
    "tankBaggyPants":    dict(neck=0.80, sleeve=0.62, shirt_hem=3.25, waist=3.60, hem=0.66, shoe=0.60, shirt_thick=0.06, pants_thick=0.18),
    "dress":             dict(neck=0.70, sleeve=0.70, shirt_hem=2.60, waist=None, hem=None, shoe=0.45, shirt_thick=0.10),
}

# --- ADJUSTED HAIR LOGIC (More Z-volume, shifted closer to forehead) ---
HAIR = {
    "m_bald": [],  # NEW MALE HAIRSTYLE (Generates no hair geometry)
    "m_short": [
        {
            "segments": 24, "clump_amp": 0.02, "clump_freq": 6,
            "profile": [
                (7.38,  0.09, 0.12, 0.20, 0.0),  
                (7.25,  0.11, 0.28, 0.37, 0.0),  
                (7.10,  0.12, 0.32, 0.40, 0.1),  
                (6.90,  0.10, 0.32, 0.39, 0.7),  
                (6.70,  0.06, 0.28, 0.33, 0.9),  
                (6.50, -0.02, 0.20, 0.24, 1.0),  
            ]
        }
    ],
    "m_messy": [
        {
            "segments": 24, "clump_amp": 0.08, "clump_freq": 8,
            "profile": [
                (7.42,  0.10, 0.15, 0.25, 0.0),
                (7.28,  0.12, 0.33, 0.43, 0.0),
                (7.10,  0.14, 0.37, 0.45, 0.05), 
                (6.90,  0.11, 0.36, 0.43, 0.6),  
                (6.70,  0.06, 0.30, 0.36, 0.9),
                (6.45, -0.02, 0.22, 0.26, 1.0),
            ]
        }
    ],
    "m_curly": [  
        {
            "segments": 24, "clump_amp": 0.12, "clump_freq": 12,
            "profile": [
                (7.45,  0.11, 0.16, 0.24, 0.0),  
                (7.30,  0.13, 0.30, 0.40, 0.0),
                (7.12,  0.14, 0.33, 0.42, 0.05), 
                (6.90,  0.09, 0.28, 0.36, 0.85), 
                (6.65,  0.04, 0.22, 0.29, 0.95),
                (6.45, -0.02, 0.16, 0.21, 1.0),
            ]
        }
    ],
    "f_long": [
        {
            "segments": 24, "clump_amp": 0.04, "clump_freq": 7,
            "profile": [
                (7.38,  0.09, 0.12, 0.21, 0.0),
                (7.25,  0.11, 0.28, 0.37, 0.0),
                (7.10,  0.12, 0.33, 0.42, 0.15), 
                (6.90,  0.11, 0.35, 0.42, 0.75),
                (6.60,  0.06, 0.36, 0.43, 0.9),
                (6.20,  0.01, 0.37, 0.43, 0.95),
                (5.80, -0.05, 0.38, 0.39, 0.95),
                (5.50, -0.08, 0.32, 0.24, 1.0),
            ]
        }
    ],
    "f_bob": [
        {
            "segments": 24, "clump_amp": 0.03, "clump_freq": 6,
            "profile": [
                (7.38,  0.10, 0.12, 0.20, 0.0),
                (7.25,  0.12, 0.29, 0.38, 0.0),
                (7.10,  0.13, 0.34, 0.43, 0.1),  
                (6.80,  0.12, 0.38, 0.44, 0.6),
                (6.50,  0.08, 0.42, 0.45, 0.8),
                (6.30,  0.04, 0.38, 0.40, 0.9),
            ]
        }
    ],
    "f_ponytail": [
        {
            "segments": 24, "clump_amp": 0.01, "clump_freq": 10,
            "profile": [
                (7.35,  0.10, 0.12, 0.20, 0.0),
                (7.22,  0.11, 0.27, 0.36, 0.05),
                (7.05,  0.12, 0.31, 0.40, 0.25), 
                (6.85,  0.11, 0.30, 0.38, 0.7),
                (6.65,  0.01, 0.26, 0.33, 0.9),
                (6.50, -0.11, 0.15, 0.22, 1.0), 
            ]
        },
        {
            "segments": 16, "clump_amp": 0.08, "clump_freq": 4,
            "profile": [
                (6.55, -0.30, 0.05, 0.05, 0.0),
                (6.45, -0.40, 0.12, 0.12, 0.0),
                (6.20, -0.48, 0.10, 0.10, 0.0),
                (5.90, -0.52, 0.08, 0.08, 0.0),
                (5.70, -0.54, 0.03, 0.03, 0.0),
            ]
        }
    ]
}
HAIR_PIVOT = 6.45   

THICK = dict(shirt=0.10, pants=0.085, shoe=0.14, hair=0.16)

# ------------------------------------------------------------------ mesh utils

def face_normals(V, F):
    n = np.cross(V[F[:, 1]] - V[F[:, 0]], V[F[:, 2]] - V[F[:, 0]])
    ln = np.linalg.norm(n, axis=1, keepdims=True)
    return np.divide(n, ln, out=np.zeros_like(n), where=ln > 1e-12), ln[:, 0] * 0.5

def vertex_normals(V, F):
    fn, area = face_normals(V, F)
    N = np.zeros_like(V)
    for k in range(3):
        np.add.at(N, F[:, k], fn * area[:, None])
    ln = np.linalg.norm(N, axis=1, keepdims=True)
    return np.divide(N, ln, out=np.tile([0.0, 1.0, 0.0], (len(V), 1)), where=ln > 1e-12)

def limb_weight(J, W, joints):
    return np.array([sum(w for j, w in zip(Jr, Wr) if j in joints) for Jr, Wr in zip(J, W)])

def cut(V, J, W, F, field):
    d = field(V, J, W)
    d = np.where(np.abs(d) < 1e-9, 1e-9, d)
    V, J, W = list(V), list(J), list(W)
    on_edge, out = {}, []

    def split(ia, ib):
        k = (ia, ib) if ia < ib else (ib, ia)
        if k in on_edge:
            return on_edge[k]
        a, b = k
        t = d[a] / (d[a] - d[b])
        jj, ww = merge_skin(J[a], W[a], J[b], W[b], t)
        V.append(V[a] * (1 - t) + V[b] * t)
        J.append(jj); W.append(ww)
        on_edge[k] = len(V) - 1
        return on_edge[k]

    for f in F:
        s = d[f] > 0
        if s.all() or (~s).all():
            out.append(list(f))
            continue
        lone = int(np.where(s != np.bincount(s.astype(int)).argmax())[0][0])
        a, b, c = f[lone], f[(lone + 1) % 3], f[(lone + 2) % 3]
        p, q = split(a, b), split(c, a)
        out += [[a, p, q], [p, b, c], [p, c, q]]

    return np.array(V), np.array(J), np.array(W), np.array(out, np.int64)

# --------------------------------------------------------------------- regions

def make_fields(lm, o):
    def mirror(P):
        M = P.copy(); M[:, 0] = np.abs(M[:, 0]); return M
    f = []
    f.append(("head", lambda P, J, W: limb_weight(J, W, lm["head_joints"]) - 0.5))
    if o.get("neck"):
        f.append(("neck", lambda P, J, W: np.linalg.norm(mirror(P) - np.array([0.0, lm["neck_y"] + 0.18, -0.02]), axis=1) - o["neck"]))
    if o.get("sleeve"):
        f.append(("sleeve", lambda P, J, W: (mirror(P) - lm["arm_root"]) @ lm["arm_dir"] - o["sleeve"]))
    for key in ("shirt_hem", "waist", "hem", "shoe"):
        if o.get(key):
            f.append((key, (lambda v: (lambda P, J, W: P[:, 1] - v))(o[key])))
    return f

def classify(C, arm_c, head_c, lm, o):
    M = C.copy(); M[:, 0] = np.abs(M[:, 0])
    y = C[:, 1]
    on_arm = arm_c > 0.5
    arm_t = (M - lm["arm_root"]) @ lm["arm_dir"]

    shirt = np.ones(len(C), bool)
    if o.get("neck"):
        shirt &= np.linalg.norm(M - np.array([0.0, lm["neck_y"] + 0.18, -0.02]), axis=1) > o["neck"]
    shirt &= head_c < 0.5   
    if o.get("shirt_hem"):
        shirt &= y > o["shirt_hem"]
    if o.get("sleeve"):
        shirt &= (~on_arm) | (arm_t < o["sleeve"])

    pants = np.zeros(len(C), bool)
    if o.get("waist") and o.get("hem"):
        pants = (y < o["waist"]) & (y > o["hem"]) & (~on_arm)

    shoe = (y < o["shoe"]) if o.get("shoe") else np.zeros(len(C), bool)
    return shirt, pants, shoe

# ------------------------------------------------------------------ inflation / features

def sculpt_features(V, J, W, lm):
    """Applies proportional, regional displacement fields to shape the face."""
    ht = lm["head_top"]
    ny = lm["neck_y"]
    hh = ht - ny
    
    # Isolate the front of the face
    head_mask = limb_weight(J, W, lm["head_joints"]) > 0.5
    # Assuming Z > 0 is the front of the character based on standard orientation
    front_mask = V[:, 2] > 0 
    face_mask = head_mask & front_mask
    
    if not face_mask.any(): 
        return
        
    # Randomize feature prominence for unique faces on every run
    brow_prominence = np.random.uniform(0.02, 0.06)
    nose_prominence = np.random.uniform(0.05, 0.09)
    cheek_prominence = np.random.uniform(0.01, 0.03)
    mouth_depth = np.random.uniform(0.02, 0.04)
    eye_depth = np.random.uniform(0.03, 0.05)
    
    # Normalize coordinates relative to the face boundaries
    # Y: 0 is the neck, 1 is the top of the head
    Y = (V[:, 1] - ny) / hh
    # X: 0 is the center line, normalized roughly against half the head height
    X = V[:, 0] / (hh * 0.5) 
    
    Z_offset = np.zeros(len(V))
    Y_offset = np.zeros(len(V))
    
    # 1. Brow Ridge: Horizontal band across the top of the eyes
    brow_mask = np.exp(-((Y - 0.65)**2) / 0.005) * np.exp(-(X**2) / 0.8)
    Z_offset += brow_mask * brow_prominence
    
    # 2. Eye Holes: Two circular indents below the brow
    eye_mask = np.exp(-((Y - 0.58)**2) / 0.003) * np.exp(-((np.abs(X) - 0.35)**2) / 0.04)
    Z_offset -= eye_mask * eye_depth
    
    # 3. Nose: Central vertical protrusion
    nose_mask = np.exp(-((Y - 0.45)**2) / 0.015) * np.exp(-(X**2) / 0.04)
    Z_offset += nose_mask * nose_prominence
    Y_offset += nose_mask * (nose_prominence * 0.3) # Slight upturn to the nose
    
    # 4. Cheeks: Gentle, wider protrusions on the sides
    cheek_mask = np.exp(-((Y - 0.42)**2) / 0.015) * np.exp(-((np.abs(X) - 0.5)**2) / 0.1)
    Z_offset += cheek_mask * cheek_prominence
    
    # 5. Mouth: Horizontal indent below the nose
    mouth_mask = np.exp(-((Y - 0.28)**2) / 0.002) * np.exp(-(X**2) / 0.15)
    Z_offset -= mouth_mask * mouth_depth
    
    # Apply the calculated offsets to the face vertices
    V[face_mask, 2] += Z_offset[face_mask]
    V[face_mask, 1] += Y_offset[face_mask]


def inflate(V, J, W, F, thick, N):
    copies, key_of = {}, {}
    nV, nJ, nW = [], [], []
    for fi, f in enumerate(F):
        for vi in f:
            k = (int(vi), round(float(thick[fi]), 6))
            if k not in copies:
                copies[k] = len(nV)
                nV.append(V[vi] + N[vi] * k[1])
                nJ.append(J[vi]); nW.append(W[vi])
            key_of[(fi, int(vi))] = copies[k]

    newF = [[key_of[(fi, int(v))] for v in f] for fi, f in enumerate(F)]

    edges = {}
    for fi, f in enumerate(F):
        for a, b in ((f[0], f[1]), (f[1], f[2]), (f[2], f[0])):
            edges.setdefault((min(a, b), max(a, b)), []).append((fi, int(a), int(b)))

    walls = 0
    for (a, b), inc in edges.items():
        if len(inc) != 2:
            continue
        f0, f1 = inc
        if abs(thick[f0[0]] - thick[f1[0]]) < 1e-9:
            continue
        hi, lo = (f0, f1) if thick[f0[0]] > thick[f1[0]] else (f1, f0)
        u, v = hi[1], hi[2]                       
        ul, vl = key_of[(lo[0], u)], key_of[(lo[0], v)]
        uh, vh = key_of[(hi[0], u)], key_of[(hi[0], v)]
        quad = [[ul, vl, vh], [ul, vh, uh]]
        cen = V[F[hi[0]]].mean(0)
        want = (0.5 * (V[u] + V[v])) - cen
        want -= N[u] * (want @ N[u])
        nrm = np.cross(np.array(nV[vl]) - nV[ul], np.array(nV[vh]) - nV[ul])
        if nrm @ want < 0:
            quad = [t[::-1] for t in quad]
        newF += quad
        walls += 2

    return np.array(nV), np.array(nJ), np.array(nW), np.array(newF, np.int64), walls


# ----------------------------------------------------------------------- build parts

def hair_solid(profile, segments=12, clump_amp=0.0, clump_freq=0):
    rings, V, F = [], [], []
    th = np.arange(segments) / segments * 2 * np.pi
    
    if clump_amp > 0 and clump_freq > 0:
        noise = clump_amp * np.sin(th * clump_freq) + (clump_amp * 0.5) * np.cos(th * clump_freq * 1.618)
        r_mod = 1.0 + noise
    else:
        r_mod = np.ones_like(th)

    # Calculate a front mask that isolates the front half of the head
    front_mask = np.clip(np.cos(th), 0, 1) ** 1.5

    for (y, cz, ax, az, trim_front) in profile:
        rings.append(list(range(len(V), len(V) + segments)))
        
        # Pull the hair back away from the face based on the trim_front value
        az_mod = az * (1.0 - trim_front * front_mask)
        ax_mod = ax * (1.0 - (trim_front * 0.2) * front_mask) 
        
        V += list(np.c_[
            (ax_mod * r_mod) * np.sin(th), 
            np.full(segments, y), 
            cz + (az_mod * r_mod) * np.cos(th)
        ])
        
    # Squashed cap creates a dome instead of a cone
    top = len(V); V.append([0.0, profile[0][0] + 0.03, profile[0][1]])
    bot = len(V); V.append([0.0, profile[-1][0] - 0.03, profile[-1][1]])

    for k in range(segments):
        k2 = (k + 1) % segments
        F.append([top, rings[0][k], rings[0][k2]])
        F.append([bot, rings[-1][k2], rings[-1][k]])
    for a, b in zip(rings, rings[1:]):
        for k in range(segments):
            k2 = (k + 1) % segments
            F += [[a[k], b[k], b[k2]], [a[k], b[k2], a[k2]]]

    V, F = np.array(V), np.array(F, np.int64)
    if np.einsum("ij,ij->i", V[F[:, 0]], np.cross(V[F[:, 1]], V[F[:, 2]])).sum() < 0:
        F = F[:, ::-1]
    return V, F


def skin_from_nearest(P, Vb, Jb, Wb, k=3):
    J, W = [], []
    for p in P:
        d = np.linalg.norm(Vb - p, axis=1)
        near = np.argsort(d)[:k]
        blend = 1.0 / np.maximum(d[near], 1e-6); blend /= blend.sum()
        acc = {}
        for i, bw in zip(near, blend):
            for j, wj in zip(Jb[i], Wb[i]):
                if wj > 0:
                    acc[int(j)] = acc.get(int(j), 0.0) + wj * bw
        top = sorted(acc.items(), key=lambda kv: -kv[1])[:4]
        jj = np.zeros(4, np.uint16); ww = np.zeros(4)
        for m, (j, w) in enumerate(top):
            jj[m], ww[m] = j, w
        ww = ww / ww.sum() if ww.sum() > 0 else np.array([1.0, 0, 0, 0])
        J.append(jj); W.append(ww)
    return np.array(J), np.array(W)

def detect_sex(path):
    m = re.search(r"_(m|f)_", Path(path).stem)
    return m.group(1) if m else None

# ----------------------------------------------------------------------- build

def build(in_path, out_path, o, thick, verbose=True):
    gltf, buf = read_glb(in_path)
    mesh = gltf["meshes"][0]
    prim = mesh["primitives"][0]
    at = prim["attributes"]

    P = read_accessor(gltf, buf, at["POSITION"])
    N0 = read_accessor(gltf, buf, at["NORMAL"])
    J = read_accessor(gltf, buf, at["JOINTS_0"])
    W = read_accessor(gltf, buf, at["WEIGHTS_0"])
    F = read_accessor(gltf, buf, prim["indices"]).reshape(-1, 3)

    skin = gltf["skins"][0]
    lm = probe_landmarks(gltf, buf, skin, P)
    canon, V, _, J, W = weld(P, N0, J, W)
    F = canon[F]
    tri0 = len(F)

    for name, fn in make_fields(lm, o):
        before = len(F)
        V, J, W, F = cut(V, J, W, F, fn)
        if verbose:
            print(f"    cut {name:<10} {len(F) - before:+4d} tris")

    # Features: actively deform specific vertices BEFORE calculating normals
    if o.get("features"):
        sculpt_features(V, J, W, lm)
        if verbose:
            print("    sculpted facial features (indentations/extrusions via closest vertex)")

    N = vertex_normals(V, F)
    C = V[F].mean(1)
    arm_v = limb_weight(J, W, lm["arm_joints"])
    head_v = limb_weight(J, W, lm["head_joints"])
    shirt, pants, shoe = classify(C, arm_v[F].mean(1), head_v[F].mean(1), lm, o)

    t = shirt * o.get("shirt_thick", thick["shirt"]) + pants * o.get("pants_thick", thick["pants"]) + shoe * thick["shoe"]
    if verbose:
        print(f"    regions: shirt {shirt.sum()}  pants {pants.sum()}  "
              f"shoe {shoe.sum()}  bare {(t == 0).sum()}")

    Vb, Jb, Wb = V.copy(), J.copy(), W.copy() 
    
    V, J, W, F, walls = inflate(V, J, W, F, t, N)
    if verbose:
        print(f"    walls: {walls} tris")

    # Hair
    if o.get("hair_parts"):
        y_shift = lm["head_top"] - 7.3 
        Vh_list, Fh_list = [], []
        v_offset = len(V)
        
        for part in o["hair_parts"]:
            adjusted_profile = []
            for (y, cz, ax, az, trim) in part["profile"]:
                adjusted_profile.append((y + y_shift, cz, ax, az, trim))
                
            v_part, f_part = hair_solid(
                adjusted_profile, 
                segments=part.get("segments", 12),
                clump_amp=part.get("clump_amp", 0.0),
                clump_freq=part.get("clump_freq", 0)
            )
            
            Vh_list.append(v_part)
            Fh_list.append(f_part + v_offset)
            v_offset += len(v_part)
            
        Vh = np.vstack(Vh_list)
        Fh = np.vstack(Fh_list)
        Jh, Wh = skin_from_nearest(Vh, Vb, Jb, Wb)
        
        F = np.vstack([F, Fh])
        V = np.vstack([V, Vh]); J = np.vstack([J, Jh]); W = np.vstack([W, Wh])
        
        if verbose:
            print(f"    hair: {len(Fh)} tris combined, y {Vh[:,1].min():.2f}-{Vh[:,1].max():.2f}")

    fn, _ = face_normals(V, F)
    Vf = V[F].reshape(-1, 3)
    Nf = np.repeat(fn, 3, axis=0)
    Jf = J[F].reshape(-1, 4)
    Wf = W[F].reshape(-1, 4)
    If = np.arange(len(Vf), dtype=np.uint32)

    a_pos = add_accessor(gltf, buf, Vf.astype(np.float32), 5126, "VEC3", minmax=True, target=34962)
    a_nrm = add_accessor(gltf, buf, Nf.astype(np.float32), 5126, "VEC3", target=34962)
    a_jnt = add_accessor(gltf, buf, Jf.astype(np.uint16), 5123, "VEC4", target=34962)
    a_wgt = add_accessor(gltf, buf, Wf.astype(np.float32), 5126, "VEC4", target=34962)
    a_idx = add_accessor(gltf, buf, If, 5125, "SCALAR", target=34963)

    mesh["primitives"] = [{
        "attributes": {"POSITION": a_pos, "NORMAL": a_nrm, "JOINTS_0": a_jnt, "WEIGHTS_0": a_wgt},
        "indices": a_idx,
        "material": prim.get("material", 0),
    }]

    size = write_glb(out_path, gltf, buf)
    if verbose:
        print(f"    -> {Path(out_path).name}  {tri0} -> {len(F)} tris, {size/1024:.1f} KB")
    return len(F)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input"); ap.add_argument("output", nargs="?")
    ap.add_argument("--outfit", choices=sorted(OUTFITS), default="tshirtJeans")
    ap.add_argument("--all-outfits", action="store_true")
    ap.add_argument("--tucked", action="store_true", help="shirt hem meets the waistband instead of overlapping")
    ap.add_argument("--hairstyle", choices=list(HAIR.keys()) + ["auto"], default="auto",
                    help="Choose a specific hairstyle or let 'auto' decide based on filename (_m_ / _f_).")
    ap.add_argument("--hair-scale", type=float, default=1.0, help="lengthen/shorten the fall (for longer styles)")
    ap.add_argument("--no-hair", action="store_true")
    ap.add_argument("--features", action="store_true", help="Sculpt facial indentations and extrusions")
    for k, v in THICK.items():
        ap.add_argument(f"--{k}-thick", type=float, default=v)
    args = ap.parse_args()
    thick = {k: getattr(args, f"{k}_thick") for k in THICK}

    style_key = args.hairstyle
    if style_key == "auto":
        sex_flag = detect_sex(args.input)
        style_key = "f_long" if sex_flag == "f" else "m_short"
        print(f"  auto-detected hairstyle: {style_key}")

    if args.no_hair:
        parts_data = []
    else:
        parts_data = json.loads(json.dumps(HAIR[style_key]))
        if args.hair_scale != 1.0:
            for part in parts_data:
                for row in part["profile"]:                       
                    if row[0] < HAIR_PIVOT: 
                        row[0] = HAIR_PIVOT - (HAIR_PIVOT - row[0]) * args.hair_scale

    def prep(name):
        o = dict(OUTFITS[name])
        if args.tucked and o.get("waist"):
            o["shirt_hem"] = o["waist"]
        o["hair_parts"] = parts_data
        o["features"] = args.features
        return o

    if args.all_outfits:
        stem = Path(args.output or args.input)
        for name in OUTFITS:
            print(f"  {name}:")
            build(args.input, stem.with_name(f"{stem.stem}_{name}.glb"), prep(name), thick)
    else:
        print(f"  {args.outfit}:")
        build(args.input, args.output or "out.glb", prep(args.outfit), thick)

if __name__ == "__main__":
    main()