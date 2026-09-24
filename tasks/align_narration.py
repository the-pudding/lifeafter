"""Word timings for the narration, by forced alignment.

Writes src/data/narration_timings.json: for each story beat that has a
recording, the words as spoken and where each one falls in its mp3. The
runtime wraps the same words in spans and lights them as the voice arrives.

    python tasks/align_narration.py 1        # one beat, to eyeball it
    python tasks/align_narration.py --all    # every beat with an mp3
    python tasks/align_narration.py --check  # which beats the copy has outrun

Run --check after npm run gdoc: rewriting a narrated beat leaves its
timings describing words that are no longer on screen.

Needs stable-ts and a torchaudio matching your torch:
    pip install stable-ts "torchaudio==$(python -c 'import torch;print(torch.__version__.split("+")[0])')"
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COPY = ROOT / "src/data/copy.json"
AUDIO = ROOT / "static/assets/app"
OUT = ROOT / "src/data/narration_timings.json"

# base gives some words a 100ms window where small places them correctly;
# the cost is seconds per clip, so there's no reason to go smaller
MODEL = "small"

# the shortest window a word can hold and still be seen lighting up
MIN_WORD_S = 0.06


def spoken_text(text):
    """The words the voice actually reads.

    Mirrors what renderStoryText leaves visible, so the token sequence here
    matches the one the runtime wraps: hint keycaps and inline buttons are
    never read aloud, and a markdown link is read as its label. Inline
    spans keep their text, so only the tags go.
    """
    text = re.sub(r'<div class="hints[^"]*">[\s\S]*?</div>', " ", text)
    text = re.sub(r"(?:^|\r?\n)[ \t]*>>[^\r\n]*", " ", text)
    text = re.sub(r"\{\{(?:audio|explore)\}\}", " ", text)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^\s)]+)\)", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


# an em dash joins two spoken words with no space between them. left alone
# the aligner hands back one span covering both, so the highlight sits on
# the pair at once and the second half never gets a time of its own
DASH = re.compile(r"([\u2014\u2013])")


def spoken_words(text):
    """The spoken text as the tokens the aligner and the runtime both count."""
    return DASH.sub(r"\1 ", spoken_text(text)).split()


def beats():
    copy = json.loads(COPY.read_text())
    for group in copy.values():
        if not isinstance(group, list):
            continue
        for entry in group:
            if isinstance(entry, dict) and entry.get("id") not in (None, "null", ""):
                yield entry


def align(model, beat_id, text):
    result = model.align(str(AUDIO / f"{beat_id}.mp3"), text, language="en")
    words = [w for seg in result.segments for w in seg.words]
    expected = text.split()
    if len(words) != len(expected):
        print(f"  ! {beat_id}: aligned {len(words)} words, expected {len(expected)}")
        return None
    starts = [round(w.start, 3) for w in words]
    last_end = round(words[-1].end, 3)
    # the aligner sometimes can't separate an unstressed word from the one
    # after it and hands back the same start for both. such a word reaches
    # back for its window rather than delaying the word it runs into, since
    # everything after it is placed correctly
    for i in range(len(starts) - 1, -1, -1):
        following = starts[i + 1] if i + 1 < len(starts) else last_end
        if following - starts[i] >= MIN_WORD_S:
            continue
        floor = starts[i - 1] + MIN_WORD_S if i else 0.0
        starts[i] = round(max(floor, following - MIN_WORD_S), 3)
    # each word holds until the next one starts, so a silence between them
    # can't blink the highlight off mid-sentence
    return [
        {
            "w": expected[i],
            "start": starts[i],
            "end": starts[i + 1] if i + 1 < len(starts) else last_end,
        }
        for i in range(len(starts))
    ]


def check():
    """Names the beats whose timings no longer match the copy."""
    timings = json.loads(OUT.read_text()) if OUT.exists() else {}
    stale, missing = [], []
    for beat in beats():
        beat_id = beat["id"]
        words = spoken_words(beat["text"])
        if not words:
            continue
        if beat_id not in timings:
            if (AUDIO / f"{beat_id}.mp3").exists():
                missing.append(beat_id)
            continue
        if [w["w"] for w in timings[beat_id]] != words:
            stale.append(beat_id)
            print(f"  stale {beat_id}")
            print(f"    timings: {' '.join(w['w'] for w in timings[beat_id])}")
            print(f"    copy   : {' '.join(words)}")
    for beat_id in missing:
        print(f"  never aligned {beat_id} (has a recording)")
    if not stale and not missing:
        print("every beat's timings match the copy")
        return 0
    print(f"\nre-run: python {Path(__file__).name} {' '.join(stale + missing)}")
    return 1


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 1
    if args == ["--check"]:
        return check()
    wanted = None if args == ["--all"] else set(args)

    todo = []
    for beat in beats():
        beat_id = beat["id"]
        if wanted is not None and beat_id not in wanted:
            continue
        if not (AUDIO / f"{beat_id}.mp3").exists():
            print(f"  - {beat_id}: no recording, skipped")
            continue
        text = " ".join(spoken_words(beat["text"]))
        if text:
            todo.append((beat_id, text))
    if not todo:
        print("nothing to align")
        return 1

    import stable_whisper

    model = stable_whisper.load_model(MODEL)

    # merged, so aligning one beat doesn't drop the others
    timings = json.loads(OUT.read_text()) if OUT.exists() else {}
    for beat_id, text in todo:
        words = align(model, beat_id, text)
        if words is None:
            continue
        timings[beat_id] = words
        print(f"  ✓ {beat_id}: {len(words)} words, {words[-1]['end']:.2f}s")

    OUT.write_text(json.dumps(timings, indent="\t", ensure_ascii=False) + "\n")
    print(f"wrote {OUT.relative_to(ROOT)} ({len(timings)} beats)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
