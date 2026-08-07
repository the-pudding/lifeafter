import{C as e,D as t,E as n,F as r,G as i,J as a,K as o,N as s,O as c,P as l,Q as u,R as d,S as f,T as p,U as m,W as h,X as g,Y as _,Z as v,_ as y,_t as b,at as x,d as S,et as C,ft as w,h as T,i as E,it as D,k as O,m as k,mt as A,n as j,nt as M,p as N,pt as P,s as F,vt as I,w as L,y as ee}from"../chunks/CJCU64uk.js";import{i as te}from"../chunks/CDUc7RJ8.js";import"../chunks/CT0T0Gak.js";import{t as ne}from"../chunks/BOh7yNxE.js";import"../chunks/xkGGZbdb.js";var re=O(`<link rel="preload" as="font" type="font/woff2" crossorigin=""/>`),ie=O(`<meta name="description"/> <meta name="author" content="The Pudding"/> <meta name="news_keywords"/> <meta property="og:title"/> <meta property="og:site_name" content="The Pudding"/> <meta property="og:url"/> <meta property="og:description"/> <meta property="og:type" content="article"/> <meta property="og:locale" content="en_US"/> <meta property="og:image"/> <meta property="og:image:type" content="image/jpeg"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:site" content="https://pudding.cool"/> <meta name="twitter:creator" content="@puddingviz"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image:src"/> <meta name="robots" content="max-image-preview:large"/> <link rel="canonical"/> <!>`,1);function R(n,r){let o=E(r,`title`,3,`Life after death?`),s=E(r,`description`,3,`Humans around the world wrestling with what comes after it all`),c=E(r,`url`,3,`https://pudding.cool/2026/09/lifeafter`),l=E(r,`keywords`,3,`afterlife, global flourishing study, religion, worldwide beliefs, heaven, hell, agnostic`),u=E(r,`preloadFont`,19,()=>[]);y(`111nuu7`,n=>{var r=ie(),f=g(r),p=v(f,4),h=v(p,2),_=v(h,4),y=v(_,2),b=v(y,6),x=v(b,14),C=v(x,2),w=v(C,2),T=v(w,4);e(v(T,2),17,u,L,(e,n)=>{var r=re();i(()=>S(r,`href`,d(n))),t(e,r)}),i(()=>{S(f,`content`,s()),S(p,`content`,l()),S(h,`content`,o()),S(_,`content`,c()),S(y,`content`,s()),S(b,`content`,`${c()??``}/assets/social-facebook.jpg`),S(x,`content`,o()),S(C,`content`,s()),S(w,`content`,`${c()??``}/assets/social-twitter.jpg`),S(T,`href`,`${c()??``}/`)}),m(()=>{a.title=o()??``}),t(n,r)})}var ae=e=>e;function oe(e,{delay:t=0,duration:n=400,easing:r=ae}={}){let i=+getComputedStyle(e).opacity;return{delay:t,duration:n,easing:r,css:e=>`opacity: ${e*i}`}}var se=`attached`,ce=1e3,le=1001,ue=1002,z=1003,de=1004,fe=1005,pe=1006,me=1007,he=1008,ge=1009,_e=1010,ve=1011,ye=1012,be=1013,xe=1014,B=1015,Se=1016,Ce=1017,we=1018,Te=1020,Ee=35902,V=35899,De=1021,H=1022,Oe=1023,U=1026,W=1027,ke=1028,Ae=1029,je=1030,Me=1031,Ne=1033,Pe=33776,Fe=33777,Ie=33778,Le=33779,Re=35840,ze=35841,Be=35842,Ve=35843,He=36196,Ue=37492,We=37496,Ge=37488,Ke=37489,qe=37490,Je=37491,Ye=37808,Xe=37809,Ze=37810,Qe=37811,$e=37812,et=37813,tt=37814,nt=37815,rt=37816,it=37817,at=37818,ot=37819,st=37820,ct=37821,lt=36492,ut=36494,dt=36495,ft=36283,pt=36284,mt=36285,ht=36286,gt=2201,_t=2202,vt=2300,yt=2301,bt=2302,xt=2303,St=2400,Ct=2401,wt=2402,Tt=2500,Et=2501,Dt=3200,Ot=`srgb`,kt=`srgb-linear`,At=`linear`,jt=`srgb`,Mt=7680,Nt=35044,Pt=2e3;function Ft(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function It(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Lt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Rt(){let e=Lt(`canvas`);return e.style.display=`block`,e}var zt={},Bt=null;function Vt(...e){let t=`THREE.`+e.shift();Bt?Bt(`log`,t,...e):console.log(t,...e)}function Ht(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function G(...e){e=Ht(e);let t=`THREE.`+e.shift();if(Bt)Bt(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function K(...e){e=Ht(e);let t=`THREE.`+e.shift();if(Bt)Bt(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ut(...e){let t=e.join(` `);t in zt||(zt[t]=!0,G(...e))}function Wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Gt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Kt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},qt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Jt=1234567,Yt=Math.PI/180,Xt=180/Math.PI;function Zt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qt[e&255]+qt[e>>8&255]+qt[e>>16&255]+qt[e>>24&255]+`-`+qt[t&255]+qt[t>>8&255]+`-`+qt[t>>16&15|64]+qt[t>>24&255]+`-`+qt[n&63|128]+qt[n>>8&255]+`-`+qt[n>>16&255]+qt[n>>24&255]+qt[r&255]+qt[r>>8&255]+qt[r>>16&255]+qt[r>>24&255]).toLowerCase()}function Qt(e,t,n){return Math.max(t,Math.min(n,e))}function $t(e,t){return(e%t+t)%t}function en(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function tn(e,t,n){return e===t?0:(n-e)/(t-e)}function nn(e,t,n){return(1-n)*e+n*t}function rn(e,t,n,r){return nn(e,t,1-Math.exp(-n*r))}function an(e,t=1){return t-Math.abs($t(e,t*2)-t)}function on(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function sn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function cn(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ln(e,t){return e+Math.random()*(t-e)}function un(e){return e*(.5-Math.random())}function dn(e){e!==void 0&&(Jt=e);let t=Jt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fn(e){return e*Yt}function pn(e){return e*Xt}function mn(e){return(e&e-1)==0&&e!==0}function hn(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function gn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _n(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:G(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function vn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function yn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var bn={DEG2RAD:Yt,RAD2DEG:Xt,generateUUID:Zt,clamp:Qt,euclideanModulo:$t,mapLinear:en,inverseLerp:tn,lerp:nn,damp:rn,pingpong:an,smoothstep:on,smootherstep:sn,randInt:cn,randFloat:ln,randFloatSpread:un,seededRandom:dn,degToRad:fn,radToDeg:pn,isPowerOfTwo:mn,ceilPowerOfTwo:hn,floorPowerOfTwo:gn,setQuaternionFromProperEuler:_n,normalize:yn,denormalize:vn},q=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qt(this.x,e.x,t.x),this.y=Qt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qt(this.x,e,t),this.y=Qt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:G(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qt(this.x,e.x,t.x),this.y=Qt(this.y,e.y,t.y),this.z=Qt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qt(this.x,e,t),this.y=Qt(this.y,e,t),this.z=Qt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sn.copy(this).projectOnVector(e),this.sub(Sn)}reflect(e){return this.sub(Sn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sn=new J,Cn=new xn,Y=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ut(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(wn.makeScale(e,t)),this}rotate(e){return Ut(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(wn.makeRotation(-e)),this}translate(e,t){return Ut(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(wn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wn=new Y,Tn=new Y().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),En=new Y().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dn(){let e={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=kn(e.r),e.g=kn(e.g),e.b=kn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=An(e.r),e.g=An(e.g),e.b=An(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?At:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[kt]:{primaries:t,whitePoint:r,transfer:At,toXYZ:Tn,fromXYZ:En,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:t,whitePoint:r,transfer:jt,toXYZ:Tn,fromXYZ:En,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),e}var On=Dn();function kn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function An(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var jn,Mn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jn===void 0&&(jn=Lt(`canvas`)),jn.width=e.width,jn.height=e.height;let t=jn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=jn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Lt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=kn(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(kn(t[e]/255)*255):t[e]=kn(t[e]);return{data:t,width:e.width,height:e.height}}else return G(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Nn=0,Pn=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,`id`,{value:Nn++}),this.uuid=Zt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Fn(r[t].image)):e.push(Fn(r[t]))}else e=Fn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Fn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Mn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(G(`Texture: Unable to serialize Texture.`),{})}var In=0,Ln=new J,Rn=class e extends Kt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=le,i=le,a=pe,o=he,s=Oe,c=ge,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,`id`,{value:In++}),this.uuid=Zt(),this.name=``,this.source=new Pn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Y,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ln).x}get height(){return this.source.getSize(Ln).y}get depth(){return this.source.getSize(Ln).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){G(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){G(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ce:e.x-=Math.floor(e.x);break;case le:e.x=e.x<0?0:1;break;case ue:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ce:e.y-=Math.floor(e.y);break;case le:e.y=e.y<0?0:1;break;case ue:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rn.DEFAULT_IMAGE=null,Rn.DEFAULT_MAPPING=300,Rn.DEFAULT_ANISOTROPY=1;var zn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qt(this.x,e.x,t.x),this.y=Qt(this.y,e.y,t.y),this.z=Qt(this.z,e.z,t.z),this.w=Qt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qt(this.x,e,t),this.y=Qt(this.y,e,t),this.z=Qt(this.z,e,t),this.w=Qt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bn=class extends Kt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zn(0,0,e,t),this.scissorTest=!1,this.viewport=new zn(0,0,e,t),this.textures=[];let r=new Rn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:pe,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Pn(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Vn=class extends Bn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Hn=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=z,this.minFilter=z,this.wrapR=le,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Un=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=z,this.minFilter=z,this.wrapR=le,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Wn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Gn.setFromMatrixColumn(e,0).length(),i=1/Gn.setFromMatrixColumn(e,1).length(),a=1/Gn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qn,e,Jn)}lookAt(e,t,n){let r=this.elements;return Zn.subVectors(e,t),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),Yn.crossVectors(n,Zn),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),Yn.crossVectors(n,Zn)),Yn.normalize(),Xn.crossVectors(Zn,Yn),r[0]=Yn.x,r[4]=Xn.x,r[8]=Zn.x,r[1]=Yn.y,r[5]=Xn.y,r[9]=Zn.y,r[2]=Yn.z,r[6]=Xn.z,r[10]=Zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Gn.set(r[0],r[1],r[2]).length(),o=Gn.set(r[4],r[5],r[6]).length(),s=Gn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Kn.copy(this);let c=1/a,l=1/o,u=1/s;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=l,Kn.elements[5]*=l,Kn.elements[6]*=l,Kn.elements[8]*=u,Kn.elements[9]*=u,Kn.elements[10]*=u,t.setFromRotationMatrix(Kn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Pt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Pt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gn=new J,Kn=new Wn,qn=new J(0,0,0),Jn=new J(1,1,1),Yn=new J,Xn=new J,Zn=new J,Qn=new Wn,$n=new xn,er=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Qt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Qt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:G(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $n.setFromEuler(this),this.setFromQuaternion($n,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};er.DEFAULT_ORDER=`XYZ`;var tr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},nr=0,rr=new J,ir=new xn,ar=new Wn,or=new J,sr=new J,cr=new J,lr=new xn,ur=new J(1,0,0),dr=new J(0,1,0),fr=new J(0,0,1),pr={type:`added`},mr={type:`removed`},hr={type:`childadded`,child:null},gr={type:`childremoved`,child:null},_r=class e extends Kt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,`id`,{value:nr++}),this.uuid=Zt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new J,n=new er,r=new xn,i=new J(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wn},normalMatrix:{value:new Y}}),this.matrix=new Wn,this.matrixWorld=new Wn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.multiply(ir),this}rotateOnWorldAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.premultiply(ir),this}rotateX(e){return this.rotateOnAxis(ur,e)}rotateY(e){return this.rotateOnAxis(dr,e)}rotateZ(e){return this.rotateOnAxis(fr,e)}translateOnAxis(e,t){return rr.copy(e).applyQuaternion(this.quaternion),this.position.add(rr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ur,e)}translateY(e){return this.translateOnAxis(dr,e)}translateZ(e){return this.translateOnAxis(fr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ar.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?or.copy(e):or.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ar.lookAt(sr,or,this.up):ar.lookAt(or,sr,this.up),this.quaternion.setFromRotationMatrix(ar),r&&(ar.extractRotation(r.matrixWorld),ir.setFromRotationMatrix(ar),this.quaternion.premultiply(ir.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(K(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pr),hr.child=e,this.dispatchEvent(hr),hr.child=null):K(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mr),gr.child=e,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ar.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ar.multiply(e.parent.matrixWorld)),e.applyMatrix4(ar),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pr),hr.child=e,this.dispatchEvent(hr),hr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,cr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,lr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};_r.DEFAULT_UP=new J(0,1,0),_r.DEFAULT_MATRIX_AUTO_UPDATE=!0,_r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vr=class extends _r{constructor(){super(),this.isGroup=!0,this.type=`Group`}},yr={type:`move`},br=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position),s=.02,l=.005;c.inputState.pinching&&o>s+l?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=s-l&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new vr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},xr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function wr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,On.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=On.workingColorSpace){return this.r=e,this.g=t,this.b=n,On.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=On.workingColorSpace){if(e=$t(e,1),t=Qt(t,0,1),n=Qt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=wr(i,r,e+1/3),this.g=wr(i,r,e),this.b=wr(i,r,e-1/3)}return On.colorSpaceToWorking(this,r),this}setStyle(e,t=Ot){function n(t){t!==void 0&&parseFloat(t)<1&&G(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:G(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);G(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){let n=xr[e.toLowerCase()];return n===void 0?G(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return On.workingToColorSpace(Tr.copy(this),e),Math.round(Qt(Tr.r*255,0,255))*65536+Math.round(Qt(Tr.g*255,0,255))*256+Math.round(Qt(Tr.b*255,0,255))}getHexString(e=Ot){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=On.workingColorSpace){On.workingToColorSpace(Tr.copy(this),t);let n=Tr.r,r=Tr.g,i=Tr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=On.workingColorSpace){return On.workingToColorSpace(Tr.copy(this),t),e.r=Tr.r,e.g=Tr.g,e.b=Tr.b,e}getStyle(e=Ot){On.workingToColorSpace(Tr.copy(this),e);let t=Tr.r,n=Tr.g,r=Tr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(Cr);let n=nn(Sr.h,Cr.h,t),r=nn(Sr.s,Cr.s,t),i=nn(Sr.l,Cr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tr=new X;X.NAMES=xr;var Er=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new X(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Dr=class extends _r{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new er,this.environmentIntensity=1,this.environmentRotation=new er,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Or=new J,kr=new J,Ar=new J,jr=new J,Mr=new J,Nr=new J,Pr=new J,Fr=new J,Ir=new J,Lr=new J,Rr=new zn,zr=new zn,Br=new zn,Vr=class e{constructor(e=new J,t=new J,n=new J){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Or.subVectors(e,t),r.cross(Or);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Or.subVectors(r,t),kr.subVectors(n,t),Ar.subVectors(e,t);let a=Or.dot(Or),o=Or.dot(kr),s=Or.dot(Ar),c=kr.dot(kr),l=kr.dot(Ar),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,jr)===null?!1:jr.x>=0&&jr.y>=0&&jr.x+jr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,jr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,jr.x),s.addScaledVector(a,jr.y),s.addScaledVector(o,jr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Rr.setScalar(0),zr.setScalar(0),Br.setScalar(0),Rr.fromBufferAttribute(e,t),zr.fromBufferAttribute(e,n),Br.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Rr,i.x),a.addScaledVector(zr,i.y),a.addScaledVector(Br,i.z),a}static isFrontFacing(e,t,n,r){return Or.subVectors(n,t),kr.subVectors(e,t),Or.cross(kr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Or.subVectors(this.c,this.b),kr.subVectors(this.a,this.b),Or.cross(kr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Mr.subVectors(r,n),Nr.subVectors(i,n),Fr.subVectors(e,n);let s=Mr.dot(Fr),c=Nr.dot(Fr);if(s<=0&&c<=0)return t.copy(n);Ir.subVectors(e,r);let l=Mr.dot(Ir),u=Nr.dot(Ir);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Mr,a);Lr.subVectors(e,i);let f=Mr.dot(Lr),p=Nr.dot(Lr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Nr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Pr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Pr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Mr,a).addScaledVector(Nr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hr=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Wr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Wr):Wr.fromBufferAttribute(r,t),Wr.applyMatrix4(e.matrixWorld),this.expandByPoint(Wr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wr),Wr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qr),$r.subVectors(this.max,Qr),Kr.subVectors(e.a,Qr),qr.subVectors(e.b,Qr),Jr.subVectors(e.c,Qr),Yr.subVectors(qr,Kr),Xr.subVectors(Jr,qr),Zr.subVectors(Kr,Jr);let t=[0,-Yr.z,Yr.y,0,-Xr.z,Xr.y,0,-Zr.z,Zr.y,Yr.z,0,-Yr.x,Xr.z,0,-Xr.x,Zr.z,0,-Zr.x,-Yr.y,Yr.x,0,-Xr.y,Xr.x,0,-Zr.y,Zr.x,0];return!ni(t,Kr,qr,Jr,$r)||(t=[1,0,0,0,1,0,0,0,1],!ni(t,Kr,qr,Jr,$r))?!1:(ei.crossVectors(Yr,Xr),t=[ei.x,ei.y,ei.z],ni(t,Kr,qr,Jr,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ur[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ur[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ur[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ur[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ur[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ur[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ur[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ur[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ur),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ur=[new J,new J,new J,new J,new J,new J,new J,new J],Wr=new J,Gr=new Hr,Kr=new J,qr=new J,Jr=new J,Yr=new J,Xr=new J,Zr=new J,Qr=new J,$r=new J,ei=new J,ti=new J;function ni(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ti.fromArray(e,a);let o=i.x*Math.abs(ti.x)+i.y*Math.abs(ti.y)+i.z*Math.abs(ti.z),s=t.dot(ti),c=n.dot(ti),l=r.dot(ti);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ri=new J,ii=new q,ai=0,oi=class extends Kt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,`id`,{value:ai++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nt,this.updateRanges=[],this.gpuType=B,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyMatrix3(e),this.setXY(t,ii.x,ii.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix3(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix4(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyNormalMatrix(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.transformDirection(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},si=class extends oi{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ci=class extends oi{constructor(e,t,n){super(new Uint32Array(e),t,n)}},li=class extends oi{constructor(e,t,n){super(new Float32Array(e),t,n)}},ui=new Hr,di=new J,fi=new J,pi=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ui.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;di.subVectors(e,this.center);let t=di.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(di,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fi.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(di.copy(e.center).add(fi)),this.expandByPoint(di.copy(e.center).sub(fi))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},mi=0,hi=new Wn,gi=new _r,_i=new J,vi=new Hr,yi=new Hr,bi=new J,xi=class e extends Kt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,`id`,{value:mi++}),this.uuid=Zt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ft(e)?ci:si)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Y().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return gi.lookAt(e),gi.updateMatrix(),this.applyMatrix4(gi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new li(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&G(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){K(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];vi.setFromBufferAttribute(n),this.morphTargetsRelative?(bi.addVectors(this.boundingBox.min,vi.min),this.boundingBox.expandByPoint(bi),bi.addVectors(this.boundingBox.max,vi.max),this.boundingBox.expandByPoint(bi)):(this.boundingBox.expandByPoint(vi.min),this.boundingBox.expandByPoint(vi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&K(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){K(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new J,1/0);return}if(e){let n=this.boundingSphere.center;if(vi.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];yi.setFromBufferAttribute(n),this.morphTargetsRelative?(bi.addVectors(vi.min,yi.min),vi.expandByPoint(bi),bi.addVectors(vi.max,yi.max),vi.expandByPoint(bi)):(vi.expandByPoint(yi.min),vi.expandByPoint(yi.max))}vi.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)bi.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(bi));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)bi.fromBufferAttribute(a,t),o&&(_i.fromBufferAttribute(e,t),bi.add(_i)),r=Math.max(r,n.distanceToSquared(bi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&K(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){K(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new oi(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new J,s[e]=new J;let c=new J,l=new J,u=new J,d=new q,f=new q,p=new q,m=new J,h=new J;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new J,y=new J,b=new J,x=new J;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new oi(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new J,i=new J,a=new J,o=new J,s=new J,c=new J,l=new J,u=new J;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bi.fromBufferAttribute(e,t),bi.normalize(),e.setXYZ(t,bi.x,bi.y,bi.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new oi(a,r,i)}if(this.index===null)return G(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Si=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Nt,this.updateRanges=[],this.version=0,this.uuid=Zt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ci=new J,wi=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ci.fromBufferAttribute(this,t),Ci.applyMatrix4(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ci.fromBufferAttribute(this,t),Ci.applyNormalMatrix(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ci.fromBufferAttribute(this,t),Ci.transformDirection(e),this.setXYZ(t,Ci.x,Ci.y,Ci.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array),i=yn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Vt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new oi(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ti=0,Ei=class extends Kt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,`id`,{value:Ti++}),this.uuid=Zt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mt,this.stencilZFail=Mt,this.stencilZPass=Mt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){G(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){G(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new X().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors==`number`?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new q().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Di=new J,Oi=new J,ki=new J,Ai=new J,ji=new J,Mi=new J,Ni=new J,Pi=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Oi.copy(e).add(t).multiplyScalar(.5),ki.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Oi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ki),o=Ai.dot(this.direction),s=-Ai.dot(ki),c=Ai.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Oi).addScaledVector(ki,d),f}intersectSphere(e,t){Di.subVectors(e.center,this.origin);let n=Di.dot(this.direction),r=Di.dot(Di)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,r,i){ji.subVectors(t,e),Mi.subVectors(n,e),Ni.crossVectors(ji,Mi);let a=this.direction.dot(Ni),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);let s=o*this.direction.dot(Mi.crossVectors(Ai,Mi));if(s<0)return null;let c=o*this.direction.dot(ji.cross(Ai));if(c<0||s+c>a)return null;let l=-o*Ai.dot(Ni);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fi=class extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ii=new Wn,Li=new Pi,Ri=new pi,zi=new J,Bi=new J,Vi=new J,Hi=new J,Ui=new J,Wi=new J,Gi=new J,Ki=new J,qi=class extends _r{constructor(e=new xi,t=new Fi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Wi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ui.fromBufferAttribute(s,e),a?Wi.addScaledVector(Ui,r):Wi.addScaledVector(Ui.sub(t),r))}t.add(Wi)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ri.copy(n.boundingSphere),Ri.applyMatrix4(i),Li.copy(e.ray).recast(e.near),!(Ri.containsPoint(Li.origin)===!1&&(Li.intersectSphere(Ri,zi)===null||Li.origin.distanceToSquared(zi)>(e.far-e.near)**2))&&(Ii.copy(i).invert(),Li.copy(e.ray).applyMatrix4(Ii),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Yi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Yi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Yi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Yi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function Ji(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ki.copy(s),Ki.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ki);return l<n.near||l>n.far?null:{distance:l,point:Ki.clone(),object:e}}function Yi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Bi),e.getVertexPosition(c,Vi),e.getVertexPosition(l,Hi);let u=Ji(e,t,n,r,Bi,Vi,Hi,Gi);if(u){let e=new J;Vr.getBarycoord(Gi,Bi,Vi,Hi,e),i&&(u.uv=Vr.getInterpolatedAttribute(i,s,c,l,e,new q)),a&&(u.uv1=Vr.getInterpolatedAttribute(a,s,c,l,e,new q)),o&&(u.normal=Vr.getInterpolatedAttribute(o,s,c,l,e,new J),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new J,materialIndex:0};Vr.getNormal(Bi,Vi,Hi,t.normal),u.face=t,u.barycoord=e}return u}var Xi=new zn,Zi=new zn,Qi=new zn,$i=new zn,ea=new Wn,ta=new J,na=new pi,ra=new Wn,ia=new Pi,aa=class extends qi{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=se,this.bindMatrix=new Wn,this.bindMatrixInverse=new Wn,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Hr),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ta),this.boundingBox.expandByPoint(ta)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pi),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ta),this.boundingSphere.expandByPoint(ta)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),na.copy(this.boundingSphere),na.applyMatrix4(r),e.ray.intersectsSphere(na)!==!1&&(ra.copy(r).invert(),ia.copy(e.ray).applyMatrix4(ra),!(this.boundingBox!==null&&ia.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ia)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new zn,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():G(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Zi.fromBufferAttribute(r.attributes.skinIndex,e),Qi.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Xi.copy(t),t.set(0,0,0,0)):(Xi.set(...t,1),t.set(0,0,0)),Xi.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Qi.getComponent(e);if(r!==0){let i=Zi.getComponent(e);ea.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector($i.copy(Xi).applyMatrix4(ea),r)}}return t.isVector4&&(t.w=Xi.w),t.applyMatrix4(this.bindMatrixInverse)}},oa=class extends _r{constructor(){super(),this.isBone=!0,this.type=`Bone`}},sa=class extends Rn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=z,l=z,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ca=new Wn,la=new Wn,ua=class e{constructor(e=[],t=[]){this.uuid=Zt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){G(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new Wn)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new Wn;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:la;ca.multiplyMatrices(i,t[r]),ca.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new sa(t,e,e,Oe,B);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(G(`Skeleton: No bone found with UUID:`,r),i=new oa),this.bones.push(i),this.boneInverses.push(new Wn().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},da=class extends oi{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fa=new Wn,pa=new Wn,ma=[],ha=new Hr,ga=new Wn,_a=new qi,va=new pi,ya=class extends qi{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new da(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ga)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fa),ha.copy(e.boundingBox).applyMatrix4(fa),this.boundingBox.union(ha)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fa),va.copy(e.boundingSphere).applyMatrix4(fa),this.boundingSphere.union(va)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(_a.geometry=this.geometry,_a.material=this.material,_a.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),va.copy(this.boundingSphere),va.applyMatrix4(n),e.ray.intersectsSphere(va)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,fa),pa.multiplyMatrices(n,fa),_a.matrixWorld=pa,_a.raycast(e,ma);for(let e=0,n=ma.length;e<n;e++){let n=ma[e];n.instanceId=i,n.object=this,t.push(n)}ma.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new da(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new sa(new Float32Array(r*this.count),r,this.count,ke,B));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ba=new J,xa=new J,Sa=new Y,Ca=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ba.subVectors(n,t).cross(xa.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ba),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Sa.getNormalMatrix(e),r=this.coplanarPoint(ba).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},wa=new pi,Ta=new q(.5,.5),Ea=new J,Da=class{constructor(e=new Ca,t=new Ca,n=new Ca,r=new Ca,i=new Ca,a=new Ca){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),wa.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wa)}intersectsSprite(e){return wa.center.set(0,0,0),wa.radius=.7071067811865476+Ta.distanceTo(e.center),wa.applyMatrix4(e.matrixWorld),this.intersectsSphere(wa)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ea.x=r.normal.x>0?e.max.x:e.min.x,Ea.y=r.normal.y>0?e.max.y:e.min.y,Ea.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Oa=class extends Ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ka=new J,Aa=new J,ja=new Wn,Ma=new Pi,Na=new pi,Pa=new J,Fa=new J,Ia=class extends _r{constructor(e=new xi,t=new Oa){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ka.fromBufferAttribute(t,e-1),Aa.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ka.distanceTo(Aa);e.setAttribute(`lineDistance`,new li(n,1))}else G(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(r),Na.radius+=i,e.ray.intersectsSphere(Na)===!1)return;ja.copy(r).invert(),Ma.copy(e.ray).applyMatrix4(ja);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=La(this,e,Ma,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=La(this,e,Ma,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=La(this,e,Ma,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=La(this,e,Ma,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function La(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ka.fromBufferAttribute(s,i),Aa.fromBufferAttribute(s,a),n.distanceSqToSegment(ka,Aa,Pa,Fa)>r)return;Pa.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Pa);if(!(c<t.near||c>t.far))return{distance:c,point:Fa.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ra=new J,za=new J,Ba=class extends Ia{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ra.fromBufferAttribute(t,e),za.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ra.distanceTo(za);e.setAttribute(`lineDistance`,new li(n,1))}else G(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Va=class extends Ia{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},Ha=class extends Ei{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ua=new Wn,Wa=new Pi,Ga=new pi,Ka=new J,qa=class extends _r{constructor(e=new xi,t=new Ha){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(r),Ga.radius+=i,e.ray.intersectsSphere(Ga)===!1)return;Ua.copy(r).invert(),Wa.copy(e.ray).applyMatrix4(Ua);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ka.fromBufferAttribute(l,n),Ja(Ka,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ka.fromBufferAttribute(l,a),Ja(Ka,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ja(e,t,n,r,i,a,o){let s=Wa.distanceSqToPoint(e);if(s<n){let n=new J;Wa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ya=class extends Rn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xa=class extends Rn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Za=class extends Rn{constructor(e,t,n=xe,r,i,a,o=z,s=z,c,l=U,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Qa=class extends Za{constructor(e,t=xe,n=301,r,i,a=z,o=z,s,c=U){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},$a=class extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},eo=class e extends xi{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new li(c,3)),this.setAttribute(`normal`,new li(l,3)),this.setAttribute(`uv`,new li(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new J;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},to=class e extends xi{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new J,l=new q;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new li(a,3)),this.setAttribute(`normal`,new li(o,3)),this.setAttribute(`uv`,new li(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},no=class e extends xi{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new li(u,3)),this.setAttribute(`normal`,new li(d,3)),this.setAttribute(`uv`,new li(f,2));function _(){let a=new J,_=new J,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new q,m=new J,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ro=class e extends no{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},io=class e extends xi{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new li(i,3)),this.setAttribute(`normal`,new li(i.slice(),3)),this.setAttribute(`uv`,new li(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new J,r=new J,i=new J;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new J;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new J;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new J,t=new J,n=new J,r=new J,o=new q,s=new q,c=new q;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ao=class e extends io{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},oo=class e extends xi{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new li(p,3)),this.setAttribute(`normal`,new li(m,3)),this.setAttribute(`uv`,new li(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},so=class e extends xi{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new J,d=new J,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new li(p,3)),this.setAttribute(`normal`,new li(m,3)),this.setAttribute(`uv`,new li(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function co(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(uo(i))i.isRenderTargetTexture?(G(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(uo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function lo(e){let t={};for(let n=0;n<e.length;n++){let r=co(e[n]);for(let e in r)t[e]=r[e]}return t}function uo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function fo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function po(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:On.workingColorSpace}var mo={clone:co,merge:lo},ho=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,go=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_o=class extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ho,this.fragmentShader=go,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=co(e.uniforms),this.uniformsGroups=fo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new X().setHex(r.value);break;case`v2`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new zn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Wn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},vo=class extends _o{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},yo=class extends Ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bo=class extends yo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,`reflectivity`,{get:function(){return Qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},xo=class extends Ei{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new X(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},So=class extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Dt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Co=class extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function wo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function To(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function Eo(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function Do(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0)if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}var Oo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ko=class extends Oo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:St,endingEnd:St}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ct:i=e,o=2*t-n;break;case wt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ct:a=e,s=2*n-t;break;case wt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ao=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},jo=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Mo=class extends Oo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},No=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=wo(t,this.TimeBufferType),this.values=wo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:wo(e.times,Array),values:wo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Mo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case vt:t=this.InterpolantFactoryMethodDiscrete;break;case yt:t=this.InterpolantFactoryMethodLinear;break;case bt:t=this.InterpolantFactoryMethodSmooth;break;case xt:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return G(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vt;case this.InterpolantFactoryMethodLinear:return yt;case this.InterpolantFactoryMethodSmooth:return bt;case this.InterpolantFactoryMethodBezier:return xt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(K(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(K(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){K(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){K(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&It(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){K(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===bt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};No.prototype.ValueTypeName=``,No.prototype.TimeBufferType=Float32Array,No.prototype.ValueBufferType=Float32Array,No.prototype.DefaultInterpolation=yt;var Po=class extends No{constructor(e,t,n){super(e,t,n)}};Po.prototype.ValueTypeName=`bool`,Po.prototype.ValueBufferType=Array,Po.prototype.DefaultInterpolation=vt,Po.prototype.InterpolantFactoryMethodLinear=void 0,Po.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends No{constructor(e,t,n,r){super(e,t,n,r)}};Fo.prototype.ValueTypeName=`color`;var Io=class extends No{constructor(e,t,n,r){super(e,t,n,r)}};Io.prototype.ValueTypeName=`number`;var Lo=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xn.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ro=class extends No{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Lo(this.times,this.values,this.getValueSize(),e)}};Ro.prototype.ValueTypeName=`quaternion`,Ro.prototype.InterpolantFactoryMethodSmooth=void 0;var zo=class extends No{constructor(e,t,n){super(e,t,n)}};zo.prototype.ValueTypeName=`string`,zo.prototype.ValueBufferType=Array,zo.prototype.DefaultInterpolation=vt,zo.prototype.InterpolantFactoryMethodLinear=void 0,zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends No{constructor(e,t,n,r){super(e,t,n,r)}};Bo.prototype.ValueTypeName=`vector`;var Vo=class{constructor(e=``,t=-1,n=[],r=Tt){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Zt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(Uo(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(No.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=To(o);o=Eo(o,1,c),s=Eo(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new Io(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ho(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return Io;case`vector`:case`vector2`:case`vector3`:case`vector4`:return Bo;case`color`:return Fo;case`quaternion`:return Ro;case`bool`:case`boolean`:return Po;case`string`:return zo}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function Uo(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=Ho(e.type);if(e.times===void 0){let t=[],n=[];Do(e.keys,t,n,`value`),e.times=t,e.values=n}return t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e)}var Wo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Go(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Go(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Go(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Ko=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},qo=class{constructor(e){this.manager=e===void 0?Ko:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};qo.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Jo={},Yo=class extends Error{constructor(e,t){super(e),this.response=t}},Xo=class extends qo{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Wo.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Jo[e]!==void 0){Jo[e].push({onLoad:t,onProgress:n,onError:r});return}Jo[e]=[],Jo[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&G(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Jo[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}else throw new Yo(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Wo.add(`file:${e}`,t);let n=Jo[e];delete Jo[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Jo[e];if(n===void 0)throw this.manager.itemError(e),t;delete Jo[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Zo=new WeakMap,Qo=class extends qo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Wo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Zo.get(a);e===void 0&&(e=[],Zo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Lt(`img`);function s(){l(),t&&t(this);let n=Zo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Zo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Wo.remove(`image:${e}`);let n=Zo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Zo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Wo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},$o=class extends qo{constructor(e){super(e)}load(e,t,n,r){let i=new Rn,a=new Qo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},es=class extends _r{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ts=new Wn,ns=new J,rs=new J,is=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q(512,512),this.mapType=ge,this.map=null,this.mapPass=null,this.matrix=new Wn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Da,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new zn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ns.setFromMatrixPosition(e.matrixWorld),t.position.copy(ns),rs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rs),t.updateMatrixWorld(),ts.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ts,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ts)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},as=new J,os=new xn,ss=new J,cs=class extends _r{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Wn,this.projectionMatrix=new Wn,this.projectionMatrixInverse=new Wn,this.coordinateSystem=Pt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(as,os,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,ss.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(as,os,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,ss.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ls=new J,us=new q,ds=new q,fs=class extends cs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Yt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xt*2*Math.atan(Math.tan(Yt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ls.x,ls.y).multiplyScalar(-e/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-e/ls.z)}getViewSize(e,t){return this.getViewBounds(e,us,ds),t.subVectors(ds,us)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Yt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ps=class extends is{constructor(){super(new fs(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Xt*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ms=class extends es{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(_r.DEFAULT_UP),this.updateMatrix(),this.target=new _r,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new ps}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},hs=class extends is{constructor(){super(new fs(90,1,.5,500)),this.isPointLightShadow=!0}},gs=class extends es{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new hs}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},_s=class extends cs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},vs=class extends is{constructor(){super(new _s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ys=class extends es{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(_r.DEFAULT_UP),this.updateMatrix(),this.target=new _r,this.shadow=new vs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},bs=class extends es{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},xs=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ss=new WeakMap,Cs=class extends qo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&G(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&G(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Wo.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{Ss.has(a)===!0?(r&&r(Ss.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign(i.options,{colorSpaceConversion:`none`}))}).then(function(n){Wo.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e)}).catch(function(t){r&&r(t),Ss.set(s,t),Wo.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});Wo.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ws=-90,Ts=1,Es=class extends _r{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new fs(ws,Ts,e,t);r.layers=this.layers,this.add(r);let i=new fs(ws,Ts,e,t);i.layers=this.layers,this.add(i);let a=new fs(ws,Ts,e,t);a.layers=this.layers,this.add(a);let o=new fs(ws,Ts,e,t);o.layers=this.layers,this.add(o);let s=new fs(ws,Ts,e,t);s.layers=this.layers,this.add(s);let c=new fs(ws,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ds=class extends fs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Os=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,i,a;switch(t){case`quaternion`:r=this._slerp,i=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case`string`:case`bool`:r=this._select,i=this._select,a=this._setAdditiveIdentityOther,this.buffer=Array(n*5);break;default:r=this._lerp,i=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=i,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,i=e*r+r,a=this.cumulativeWeight;if(a===0){for(let e=0;e!==r;++e)n[i+e]=n[e];a=t}else{a+=t;let e=t/a;this._mixBufferRegion(n,i,0,e,r)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,i=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,i<1){let e=t*this._origIndex;this._mixBufferRegion(n,r,e,1-i,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let e=t,i=t+t;e!==i;++e)if(n[e]!==n[e+t]){o.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let e=n,i=r;e!==i;++e)t[e]=t[r+e%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,i){if(r>=.5)for(let r=0;r!==i;++r)e[t+r]=e[n+r]}_slerp(e,t,n,r){xn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,i){let a=this._workIndex*i;xn.multiplyQuaternionsFlat(e,a,e,t,e,n),xn.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,i){let a=1-r;for(let o=0;o!==i;++o){let i=t+o;e[i]=e[i]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,i){for(let a=0;a!==i;++a){let i=t+a;e[i]=e[i]+e[n+a]*r}}},ks=`\\[\\]\\.:\\/`,As=RegExp(`[`+ks+`]`,`g`),js=`[^`+ks+`]`,Ms=`[^`+ks.replace(`\\.`,``)+`]`,Ns=`((?:WC+[\\/:])*)`.replace(`WC`,js),Ps=`(WCOD+)?`.replace(`WCOD`,Ms),Fs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,js),Is=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,js),Ls=RegExp(`^`+Ns+Ps+Fs+Is+`$`),Rs=[`material`,`materials`,`bones`,`map`],zs=class{constructor(e,t,n){let r=n||Bs.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bs=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(As,``)}static parseTrackName(e){let t=Ls.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Rs.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){G(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){K(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){K(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){K(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){K(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){K(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){K(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){K(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;K(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){K(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){K(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bs.Composite=zs,Bs.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Bs.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Bs.prototype.GetterByBindingType=[Bs.prototype._getValue_direct,Bs.prototype._getValue_array,Bs.prototype._getValue_arrayElement,Bs.prototype._getValue_toArray],Bs.prototype.SetterByBindingTypeAndVersioning=[[Bs.prototype._setValue_direct,Bs.prototype._setValue_direct_setNeedsUpdate,Bs.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bs.prototype._setValue_array,Bs.prototype._setValue_array_setNeedsUpdate,Bs.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bs.prototype._setValue_arrayElement,Bs.prototype._setValue_arrayElement_setNeedsUpdate,Bs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bs.prototype._setValue_fromArray,Bs.prototype._setValue_fromArray_setNeedsUpdate,Bs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vs=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let i=t.tracks,a=i.length,o=Array(a),s={endingStart:St,endingEnd:St};for(let e=0;e!==a;++e){let t=i[e].createInterpolant(null);o[e]=t,t.settings=s}this._interpolantSettings=s,this._interpolants=o,this._propertyBindings=Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=gt,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let n=this._clip.duration,r=e._clip.duration,i=r/n,a=n/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,i,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,i=r.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);let s=o.parameterPositions,c=o.sampleValues;return s[0]=i,s[1]=i+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let i=this._startTime;if(i!==null){let r=(e-i)*n;r<0||n===0?t=0:(this._startTime=null,t=n*r)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let e=this._interpolants,t=this._propertyBindings;switch(this.blendMode){case Et:for(let n=0,r=e.length;n!==r;++n)e[n].evaluate(a),t[n].accumulateAdditive(o);break;case Tt:default:for(let n=0,i=e.length;n!==i;++n)e[n].evaluate(a),t[n].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,i=this._loopCount,a=n===_t;if(e===0)return i===-1?r:a&&(i&1)==1?t-r:r;if(n===2200){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));handle_stop:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break handle_stop}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e<0?-1:1})}}else{if(i===-1&&(e>=0?(i=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){let n=Math.floor(r/t);r-=t*n,i+=Math.abs(n);let o=this.repetitions-i;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e>0?1:-1});else{if(o===1){let t=e<0;this._setEndings(t,!t,a)}else this._setEndings(!1,!1,a);this._loopCount=i,this.time=r,this._mixer.dispatchEvent({type:`loop`,action:this,loopDelta:n})}}else this._loopCount=i,this.time=r;if(a&&(i&1)==1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Ct,r.endingEnd=Ct):(e?r.endingStart=this.zeroSlopeAtStart?Ct:St:r.endingStart=wt,t?r.endingEnd=this.zeroSlopeAtEnd?Ct:St:r.endingEnd=wt)}_scheduleFading(e,t,n){let r=this._mixer,i=r.time,a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,s=a.sampleValues;return o[0]=i,s[0]=t,o[1]=i+e,s[1]=n,this}},Hs=new Float32Array(1),Us=class extends Kt{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,i=r.length,a=e._propertyBindings,o=e._interpolants,s=n.uuid,c=this._bindingsByRootAndName,l=c[s];l===void 0&&(l={},c[s]=l);for(let e=0;e!==i;++e){let i=r[e],c=i.name,u=l[c];if(u!==void 0)++u.referenceCount,a[e]=u;else{if(u=a[e],u!==void 0){u._cacheIndex===null&&(++u.referenceCount,this._addInactiveBinding(u,s,c));continue}let r=t&&t._propertyBindings[e].binding.parsedPath;u=new Os(Bs.create(n,c,r),i.ValueTypeName,i.getValueSize()),++u.referenceCount,this._addInactiveBinding(u,s,c),a[e]=u}o[e].resultBuffer=u.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let t=(e._localRoot||this._root).uuid,n=e._clip.uuid,r=this._actionsByClip[n];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,n,t)}let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];n.useCount++===0&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.useCount===0&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,i=this._actionsByClip,a=i[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=a;else{let t=a.knownActions;e._byClipCacheIndex=t.length,t.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let i=e._clip.uuid,a=this._actionsByClip,o=a[i],s=o.knownActions,c=s[s.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,s[l]=c,s.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],s.length===0&&delete a[i],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.referenceCount===0&&this._removeInactiveBinding(n)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,i=this._bindings,a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=i.length,i.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,i=n.path,a=this._bindingsByRootAndName,o=a[r],s=t[t.length-1],c=e._cacheIndex;s._cacheIndex=c,t[c]=s,t.pop(),delete o[i],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Ao(new Float32Array(2),new Float32Array(2),1,Hs),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,i=t[r];e.__cacheIndex=r,t[r]=e,i.__cacheIndex=n,t[n]=i}clipAction(e,t,n){let r=t||this._root,i=r.uuid,a=typeof e==`string`?Vo.findByName(r,e):e,o=a===null?e:a.uuid,s=this._actionsByClip[o],c=null;if(n===void 0&&(n=a===null?Tt:a.blendMode),s!==void 0){let e=s.actionByRoot[i];if(e!==void 0&&e.blendMode===n)return e;c=s.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let l=new Vs(this,a,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,i),l}existingAction(e,t){let n=t||this._root,r=n.uuid,i=typeof e==`string`?Vo.findByName(n,e):e,a=i?i.uuid:e,o=this._actionsByClip[a];return o===void 0?null:o.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,i=Math.sign(e),a=this._accuIndex^=1;for(let o=0;o!==n;++o)t[o]._update(r,e,i,a);let o=this._bindings,s=this._nActiveBindings;for(let e=0;e!==s;++e)o[e].apply(a);return this}setTime(e){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,i=r[n];if(i!==void 0){let e=i.knownActions;for(let n=0,r=e.length;n!==r;++n){let r=e[n];this._deactivateAction(r);let i=r._cacheIndex,a=t[t.length-1];r._cacheIndex=null,r._byClipCacheIndex=null,a._cacheIndex=i,t[i]=a,t.pop(),this._removeInactiveBindingsForAction(r)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let e in n){let r=n[e].actionByRoot[t];r!==void 0&&(this._deactivateAction(r),this._removeInactiveAction(r))}let r=this._bindingsByRootAndName[t];if(r!==void 0)for(let e in r){let t=r[e];t.restoreOriginalState(),this._removeInactiveBinding(t)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Ws=new Wn,Gs=class{constructor(e,t,n=0,r=1/0){this.ray=new Pi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new tr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):K(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Ws.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ws),this}intersectObject(e,t=!0,n=[]){return qs(e,this,n,t),n.sort(Ks),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)qs(e[r],this,n,t);return n.sort(Ks),n}};function Ks(e,t){return e.distance-t.distance}function qs(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)qs(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Js(e,t,n,r){let i=Ys(r);switch(n){case De:return e*t;case ke:return e*t/i.components*i.byteLength;case Ae:return e*t/i.components*i.byteLength;case je:return e*t*2/i.components*i.byteLength;case Me:return e*t*2/i.components*i.byteLength;case H:return e*t*3/i.components*i.byteLength;case Oe:return e*t*4/i.components*i.byteLength;case Ne:return e*t*4/i.components*i.byteLength;case Pe:case Fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ie:case Le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ze:case Ve:return Math.max(e,16)*Math.max(t,8)/4;case Re:case Be:return Math.max(e,8)*Math.max(t,8)/2;case He:case Ue:case Ge:case Ke:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case We:case qe:case Je:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Xe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ze:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Qe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case $e:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case et:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case tt:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case nt:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case rt:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case it:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case at:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ot:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case st:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ct:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case lt:case ut:case dt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ft:case pt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case mt:case ht:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ys(e){switch(e){case ge:case _e:return{byteLength:1,components:1};case ye:case ve:case Se:return{byteLength:2,components:1};case Ce:case we:return{byteLength:2,components:4};case xe:case be:case B:return{byteLength:4,components:1};case Ee:case V:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?G(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function Xs(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Zs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Qs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Y}},envmap:{envMap:{value:null},envMapRotation:{value:new Y},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Y}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Y}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Y},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Y},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Y},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Y}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Y}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Y}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0},uvTransform:{value:new Y}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}}},$s={basic:{uniforms:lo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:Qs.meshbasic_vert,fragmentShader:Qs.meshbasic_frag},lambert:{uniforms:lo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new X(0)},envMapIntensity:{value:1}}]),vertexShader:Qs.meshlambert_vert,fragmentShader:Qs.meshlambert_frag},phong:{uniforms:lo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qs.meshphong_vert,fragmentShader:Qs.meshphong_frag},standard:{uniforms:lo([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qs.meshphysical_vert,fragmentShader:Qs.meshphysical_frag},toon:{uniforms:lo([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new X(0)}}]),vertexShader:Qs.meshtoon_vert,fragmentShader:Qs.meshtoon_frag},matcap:{uniforms:lo([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:Qs.meshmatcap_vert,fragmentShader:Qs.meshmatcap_frag},points:{uniforms:lo([Z.points,Z.fog]),vertexShader:Qs.points_vert,fragmentShader:Qs.points_frag},dashed:{uniforms:lo([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qs.linedashed_vert,fragmentShader:Qs.linedashed_frag},depth:{uniforms:lo([Z.common,Z.displacementmap]),vertexShader:Qs.depth_vert,fragmentShader:Qs.depth_frag},normal:{uniforms:lo([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:Qs.meshnormal_vert,fragmentShader:Qs.meshnormal_frag},sprite:{uniforms:lo([Z.sprite,Z.fog]),vertexShader:Qs.sprite_vert,fragmentShader:Qs.sprite_frag},background:{uniforms:{uvTransform:{value:new Y},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qs.background_vert,fragmentShader:Qs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Y}},vertexShader:Qs.backgroundCube_vert,fragmentShader:Qs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qs.cube_vert,fragmentShader:Qs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qs.equirect_vert,fragmentShader:Qs.equirect_frag},distance:{uniforms:lo([Z.common,Z.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qs.distance_vert,fragmentShader:Qs.distance_frag},shadow:{uniforms:lo([Z.lights,Z.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Qs.shadow_vert,fragmentShader:Qs.shadow_frag}};$s.physical={uniforms:lo([$s.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Y},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Y},clearcoatNormalScale:{value:new q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Y},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Y},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Y},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Y},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Y},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Y},transmissionSamplerSize:{value:new q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Y},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Y},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Y},anisotropyVector:{value:new q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Y}}]),vertexShader:Qs.meshphysical_vert,fragmentShader:Qs.meshphysical_frag};var ec={r:0,b:0,g:0},tc=new Wn,nc=new Y;nc.set(-1,0,0,0,1,0,0,0,1);function rc(e,t,n,r,i,a){let o=new X(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new qi(new eo(1,1,1),new _o({name:`BackgroundCubeMaterial`,uniforms:co($s.backgroundCube.uniforms),vertexShader:$s.backgroundCube.vertexShader,fragmentShader:$s.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,`envMap`,{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nc),l.material.toneMapped=On.getTransfer(i.colorSpace)!==jt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new qi(new oo(2,2),new _o({name:`BackgroundMaterial`,uniforms:co($s.background.uniforms),vertexShader:$s.background.vertexShader,fragmentShader:$s.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,`map`,{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=On.getTransfer(i.colorSpace)!==jt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ec,po(e)),n.buffers.color.setClear(ec.r,ec.g,ec.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ic(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ac(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function oc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(G(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&G(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function sc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ca,s=new Y,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var cc=4,lc=[.125,.215,.35,.446,.526,.582],uc=20,dc=256,fc=new _s,pc=new X,mc=null,hc=0,gc=0,_c=!1,vc=new J,yc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=vc}=i;mc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(mc,hc,gc),this._renderer.xr.enabled=_c,e.scissorTest=!1,Sc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pe,minFilter:pe,generateMipmaps:!1,type:Se,format:Oe,colorSpace:kt,depthBuffer:!1},r=xc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bc(r)),this._blurMaterial=wc(r,e,t),this._ggxMaterial=Cc(r,e,t)}return r}_compileMaterial(e){let t=new qi(new xi,e);this._renderer.compile(t,fc)}_sceneToCubeUV(e,t,n,r,i){let a=new fs(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(pc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qi(new eo,new Fi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(pc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Sc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Sc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,fc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-cc?n-d+cc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Sc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,fc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Sc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,fc)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&K(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*uc-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):uc;m>uc&&G(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${uc}`);let h=[],g=0;for(let e=0;e<uc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Sc(t,3*v*(r>_-cc?r-_+cc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,fc)}};function bc(e){let t=[],n=[],r=[],i=e,a=e-cc+1+lc.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-cc?s=lc[o-e+cc-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new xi;h.setAttribute(`position`,new oi(f,3)),h.setAttribute(`uv`,new oi(p,2)),h.setAttribute(`faceIndex`,new oi(m,1)),r.push(new qi(h,null)),i>cc&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function xc(e,t,n){let r=new Vn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Sc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Cc(e,t,n){return new _o({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:dc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wc(e,t,n){let r=new Float32Array(uc),i=new J(0,1,0);return new _o({name:`SphericalGaussianBlur`,defines:{n:uc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tc(){return new _o({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ec(){return new _o({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Dc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Oc=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ya(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new eo(5,5,5),i=new _o({name:`CubemapFromEquirect`,uniforms:co(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new qi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=pe),new Es(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function kc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new Oc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new yc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new yc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ac(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ut(`WebGLRenderer: `+e+` extension not supported.`),t}}}function jc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ci:si)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Mc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Nc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:K(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Pc(e,t,n){let r=new WeakMap,i=new zn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Hn(h,p,m,u);g.type=B,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new q(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Fc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ic={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Lc(e,t,n,r,i,a){let o=new Vn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Za(t,n):void 0}),s=new Vn(t,n,{type:Se,depthBuffer:!1,stencilBuffer:!1}),c=new xi;c.setAttribute(`position`,new li([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new li([0,2,0,0,2,0],2));let l=new vo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new qi(c,l),d=new _s(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},On.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=Ic[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var Rc=new Rn,zc=new Za(1,1),Bc=new Hn,Vc=new Un,Hc=new Ya,Uc=[],Wc=[],Gc=new Float32Array(16),Kc=new Float32Array(9),qc=new Float32Array(4);function Jc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Uc[i];if(a===void 0&&(a=new Float32Array(i),Uc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Yc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Xc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Zc(e,t){let n=Wc[t];n===void 0&&(n=new Int32Array(t),Wc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Qc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function $c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2fv(this.addr,t),Xc(n,t)}}function el(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Yc(n,t))return;e.uniform3fv(this.addr,t),Xc(n,t)}}function tl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4fv(this.addr,t),Xc(n,t)}}function nl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;qc.set(r),e.uniformMatrix2fv(this.addr,!1,qc),Xc(n,r)}}function rl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;Kc.set(r),e.uniformMatrix3fv(this.addr,!1,Kc),Xc(n,r)}}function il(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;Gc.set(r),e.uniformMatrix4fv(this.addr,!1,Gc),Xc(n,r)}}function al(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2iv(this.addr,t),Xc(n,t)}}function sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yc(n,t))return;e.uniform3iv(this.addr,t),Xc(n,t)}}function cl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4iv(this.addr,t),Xc(n,t)}}function ll(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ul(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2uiv(this.addr,t),Xc(n,t)}}function dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yc(n,t))return;e.uniform3uiv(this.addr,t),Xc(n,t)}}function fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4uiv(this.addr,t),Xc(n,t)}}function pl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(zc.compareFunction=n.isReversedDepthBuffer()?518:515,a=zc):a=Rc,n.setTexture2D(t||a,i)}function ml(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Vc,i)}function hl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Hc,i)}function gl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Bc,i)}function _l(e){switch(e){case 5126:return Qc;case 35664:return $c;case 35665:return el;case 35666:return tl;case 35674:return nl;case 35675:return rl;case 35676:return il;case 5124:case 35670:return al;case 35667:case 35671:return ol;case 35668:case 35672:return sl;case 35669:case 35673:return cl;case 5125:return ll;case 36294:return ul;case 36295:return dl;case 36296:return fl;case 35678:case 36198:case 36298:case 36306:case 35682:return pl;case 35679:case 36299:case 36307:return ml;case 35680:case 36300:case 36308:case 36293:return hl;case 36289:case 36303:case 36311:case 36292:return gl}}function vl(e,t){e.uniform1fv(this.addr,t)}function yl(e,t){let n=Jc(t,this.size,2);e.uniform2fv(this.addr,n)}function bl(e,t){let n=Jc(t,this.size,3);e.uniform3fv(this.addr,n)}function xl(e,t){let n=Jc(t,this.size,4);e.uniform4fv(this.addr,n)}function Sl(e,t){let n=Jc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Cl(e,t){let n=Jc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function wl(e,t){let n=Jc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Tl(e,t){e.uniform1iv(this.addr,t)}function El(e,t){e.uniform2iv(this.addr,t)}function Dl(e,t){e.uniform3iv(this.addr,t)}function Ol(e,t){e.uniform4iv(this.addr,t)}function kl(e,t){e.uniform1uiv(this.addr,t)}function Al(e,t){e.uniform2uiv(this.addr,t)}function jl(e,t){e.uniform3uiv(this.addr,t)}function Ml(e,t){e.uniform4uiv(this.addr,t)}function Nl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?zc:Rc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Pl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Vc,a[e])}function Fl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Hc,a[e])}function Il(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Bc,a[e])}function Ll(e){switch(e){case 5126:return vl;case 35664:return yl;case 35665:return bl;case 35666:return xl;case 35674:return Sl;case 35675:return Cl;case 35676:return wl;case 5124:case 35670:return Tl;case 35667:case 35671:return El;case 35668:case 35672:return Dl;case 35669:case 35673:return Ol;case 5125:return kl;case 36294:return Al;case 36295:return jl;case 36296:return Ml;case 35678:case 36198:case 36298:case 36306:case 35682:return Nl;case 35679:case 36299:case 36307:return Pl;case 35680:case 36300:case 36308:case 36293:return Fl;case 36289:case 36303:case 36311:case 36292:return Il}}var Rl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_l(t.type)}},zl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ll(t.type)}},Bl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Vl=/(\w+)(\])?(\[|\.)?/g;function Hl(e,t){e.seq.push(t),e.map[t.id]=t}function Ul(e,t,n){let r=e.name,i=r.length;for(Vl.lastIndex=0;;){let a=Vl.exec(r),o=Vl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Hl(n,l===void 0?new Rl(s,e,t):new zl(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new Bl(s),Hl(n,e)),n=e}}}var Wl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ul(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Gl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Kl=37297,ql=0;function Jl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Yl=new Y;function Xl(e){On._getMatrix(Yl,On.workingColorSpace,e);let t=`mat3( ${Yl.elements.map(e=>e.toFixed(4))} )`;switch(On.getTransfer(e)){case At:return[t,`LinearTransferOETF`];case jt:return[t,`sRGBTransferOETF`];default:return G(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Zl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Jl(e.getShaderSource(t),r)}else return i}function Ql(e,t){let n=Xl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var $l={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function eu(e,t){let n=$l[t];return n===void 0?(G(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var tu=new J;function nu(){return On.getLuminanceCoefficients(tu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${tu.x.toFixed(4)}, ${tu.y.toFixed(4)}, ${tu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ru(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ou).join(`
`)}function iu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function au(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ou(e){return e!==``}function su(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var lu=/^[ \t]*#include +<([\w\d./]+)>/gm;function uu(e){return e.replace(lu,fu)}var du=new Map;function fu(e,t){let n=Qs[t];if(n===void 0){let e=du.get(t);if(e!==void 0)n=Qs[e],G(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return uu(n)}var pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mu(e){return e.replace(pu,hu)}function hu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function gu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var _u={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function vu(e){return _u[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var yu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function bu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:yu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var xu={302:`ENVMAP_MODE_REFRACTION`};function Su(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:xu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Cu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function wu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Cu[e.combine]||`ENVMAP_BLENDING_NONE`}function Tu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Eu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=vu(n),l=bu(n),u=Su(n),d=wu(n),f=Tu(n),p=ru(n),m=iu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ou).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ou).join(`
`),_.length>0&&(_+=`
`)):(g=[gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ou).join(`
`),_=[gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Qs.tonemapping_pars_fragment,n.toneMapping===0?``:eu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Qs.colorspace_pars_fragment,Ql(`linearToOutputTexel`,n.outputColorSpace),nu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ou).join(`
`)),o=uu(o),o=su(o,n),o=cu(o,n),s=uu(s),s=su(s,n),s=cu(s,n),o=mu(o),s=mu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Gl(i,i.VERTEX_SHADER,y),S=Gl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Zl(i,x,`vertex`),n=Zl(i,S,`fragment`);K(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):G(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Wl(i,h),T=au(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Kl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ql++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Du=0,Ou=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ku(e),t.set(e,n)),n}},ku=class{constructor(e){this.id=Du++,this.code=e,this.usedTimes=0}};function Au(e){return e===1030||e===37490||e===36285}function ju(e,t,n,r,i,a){let o=new tr,s=new Ou,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&G(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=$s[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,ee=!!i.aoMap,te=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,ie=!!i.displacementMap,R=!!i.emissiveMap,ae=!!i.metalnessMap,oe=!!i.roughnessMap,se=i.anisotropy>0,ce=i.clearcoat>0,le=i.dispersion>0,ue=i.iridescence>0,z=i.sheen>0,de=i.transmission>0,fe=se&&!!i.anisotropyMap,pe=ce&&!!i.clearcoatMap,me=ce&&!!i.clearcoatNormalMap,he=ce&&!!i.clearcoatRoughnessMap,ge=ue&&!!i.iridescenceMap,_e=ue&&!!i.iridescenceThicknessMap,ve=z&&!!i.sheenColorMap,ye=z&&!!i.sheenRoughnessMap,be=!!i.specularMap,xe=!!i.specularColorMap,B=!!i.specularIntensityMap,Se=de&&!!i.transmissionMap,Ce=de&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,V=!!i.alphaHash,De=!!i.extensions,H=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(H=e.toneMapping);let Oe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:On.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:ee,lightMap:te,bumpMap:ne,normalMap:re,displacementMap:ie,emissiveMap:R,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&Au(i.normalMap.format),metalnessMap:ae,roughnessMap:oe,anisotropy:se,anisotropyMap:fe,clearcoat:ce,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,dispersion:le,iridescence:ue,iridescenceMap:ge,iridescenceThicknessMap:_e,sheen:z,sheenColorMap:ve,sheenRoughnessMap:ye,specularMap:be,specularColorMap:xe,specularIntensityMap:B,transmission:de,transmissionMap:Se,thicknessMap:Ce,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:V,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:ee&&m(i.aoMap.channel),lightMapUv:te&&m(i.lightMap.channel),bumpMapUv:ne&&m(i.bumpMap.channel),normalMapUv:re&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:R&&m(i.emissiveMap.channel),metalnessMapUv:ae&&m(i.metalnessMap.channel),roughnessMapUv:oe&&m(i.roughnessMap.channel),anisotropyMapUv:fe&&m(i.anisotropyMap.channel),clearcoatMapUv:pe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(i.sheenRoughnessMap.channel),specularMapUv:be&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:B&&m(i.specularIntensityMap.channel),transmissionMapUv:Se&&m(i.transmissionMap.channel),thicknessMapUv:Ce&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(re||se),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:H,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&On.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:R&&i.emissiveMap.isVideoTexture===!0&&On.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:De&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(De&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=$s[t];n=mo.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Eu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Mu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Nu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Pu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Fu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||Nu),r.length>1&&r.sort(t||Pu),i.length>1&&i.sort(t||Pu),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Iu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Fu,e.set(t,[i])):n>=r.length?(i=new Fu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Lu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new J,color:new X};break;case`SpotLight`:n={position:new J,direction:new J,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new J,halfWidth:new J,halfHeight:new J};break}return e[t.id]=n,n}}}function Ru(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var zu=0;function Bu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Vu(e){let t=new Lu,n=Ru(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new Wn,o=new Wn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Bu);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=zu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Hu(e){let t=new Vu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Uu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Hu(e),t.set(n,[a])):r>=i.length?(a=new Hu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Wu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ku=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],qu=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Ju=new Wn,Yu=new J,Xu=new J;function Zu(e,t,n){let r=new Da,i=new q,a=new q,o=new zn,s=new So,c=new Co,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new _o({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:Wu,fragmentShader:Gu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new xi;m.setAttribute(`position`,new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new qi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(G(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){G(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){G(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Vn(i.x,i.y,{format:je,type:Se,minFilter:pe,magFilter:pe,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Za(i.x,i.y,B),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=U,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=z,d.map.depthTexture.magFilter=z}else l.isPointLight?(d.map=new Oc(i.x),d.map.depthTexture=new Qa(i.x,xe)):(d.map=new Vn(i.x,i.y),d.map.depthTexture=new Za(i.x,i.y,xe)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=U,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=pe,d.map.depthTexture.magFilter=pe):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=z,d.map.depthTexture.magFilter=z);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Yu.setFromMatrixPosition(l.matrixWorld),e.position.copy(Yu),Xu.copy(e.position),Xu.add(Ku[t]),e.up.copy(qu[t]),e.lookAt(Xu),e.updateMatrixWorld(),n.makeTranslation(-Yu.x,-Yu.y,-Yu.z),Ju.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ju,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Vn(i.x,i.y,{format:je,type:Se})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Qu(e,t){function n(){let t=!1,n=new zn,r=null,i=new zn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ae(e.DEPTH_TEST):oe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Gt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ae(e.STENCIL_TEST):oe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},ee=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),ne=new zn().fromArray(ee),re=new zn().fromArray(te);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let R={};R[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),R[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),R[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ae(e.DEPTH_TEST),o.setFunc(3),pe(!1),me(1),ae(e.CULL_FACE),de(0);function ae(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function oe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function se(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ce(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function le(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let z={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function de(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(oe(e.BLEND),g=!1);return}if(g===!1&&(ae(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:K(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:K(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:K(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:K(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(z[r],z[i],z[o],z[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function fe(t,n){t.side===2?oe(e.CULL_FACE):ae(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?de(0):de(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ae(e.SAMPLE_ALPHA_TO_COVERAGE):oe(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function me(t){t===0?oe(e.CULL_FACE):(ae(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function he(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ge(t,n,r){t?(ae(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):oe(e.POLYGON_OFFSET_FILL)}function _e(t){t?ae(e.SCISSOR_TEST):oe(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function ye(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||R[t]),i.type=t,i.texture=n)}function be(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){K(`WebGLState:`,e)}}function B(){try{e.compressedTexImage3D(...arguments)}catch(e){K(`WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){K(`WebGLState:`,e)}}function Ce(){try{e.texSubImage3D(...arguments)}catch(e){K(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){K(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){K(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){K(`WebGLState:`,e)}}function V(){try{e.texStorage3D(...arguments)}catch(e){K(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){K(`WebGLState:`,e)}}function H(){try{e.texImage3D(...arguments)}catch(e){K(`WebGLState:`,e)}}function Oe(t){return d[t]===void 0?e.getParameter(t):d[t]}function U(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function W(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function ke(t){re.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),re.copy(t))}function Ae(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function je(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ne.set(0,0,e.canvas.width,e.canvas.height),re.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ae,disable:oe,bindFramebuffer:se,drawBuffers:ce,useProgram:le,setBlending:de,setMaterial:fe,setFlipSided:pe,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:B,texImage2D:De,texImage3D:H,pixelStorei:U,getParameter:Oe,updateUBOMapping:Ae,uniformBlockBinding:je,texStorage2D:Ee,texStorage3D:V,texSubImage2D:Se,texSubImage3D:Ce,compressedTexSubImage2D:we,compressedTexSubImage3D:Te,scissor:W,viewport:ke,reset:Me}}function $u(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new q,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Lt(`canvas`)}function g(e,t,n){let r=1,i=H(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),G(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&G(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];G(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||G(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?At:On.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,G(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&G(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&V(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)G(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)G(`WebGLRenderer: Texture marked for update but image is incomplete`);else{oe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){oe(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function I(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){oe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function L(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){se(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ee={[ce]:e.REPEAT,[le]:e.CLAMP_TO_EDGE,[ue]:e.MIRRORED_REPEAT},te={[z]:e.NEAREST,[de]:e.NEAREST_MIPMAP_NEAREST,[fe]:e.NEAREST_MIPMAP_LINEAR,[pe]:e.LINEAR,[me]:e.LINEAR_MIPMAP_NEAREST,[he]:e.LINEAR_MIPMAP_LINEAR},ne={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function re(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&G(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ee[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ee[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ee[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,te[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,te[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ne[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ie(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function R(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ae(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=R(n.start,r.width,4),c=R(t.start,r.width,4);n.start<=i+1&&a===c&&R(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function oe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ie(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=On.getPrimaries(On.workingColorSpace),r=o.colorSpace===``?null:On.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);re(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===W,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture)if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ae(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023)if(r!==null)if(C){if(T)if(o.layerUpdates.size>0){let t=Js(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0);else G(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?G(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}else if(o.isDataArrayTexture)if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T)if(o.layerUpdates.size>0){let i=Js(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w)if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=H(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=H(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function se(t,o,s){if(o.image.length!==6)return;let c=ie(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=On.getPrimaries(On.workingColorSpace),r=o.colorSpace===``?null:On.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);re(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?G(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=H(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ve(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),re(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=Te(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ye(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)ve(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ve(i.__webglFramebuffer[0],t,0):ve(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),_e(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),_e(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function be(t,n,i){let a=r.get(t);n!==void 0&&ge(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ye(t)}function xe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ee(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),_e(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),re(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ge(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ge(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),re(c,a),ge(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),re(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ge(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ge(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ye(t)}function B(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Se.push(l),Ce.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function V(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(On.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&G(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):K(`WebGLTextures: Unsupported texture color space:`,n)),t}function H(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=L,this.rebindTextures=be,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function ed(e,t){function n(n,r=``){let i,a=On.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var td=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,rd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new $a(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _o({vertexShader:td,fragmentShader:nd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qi(new oo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},id=class extends Kt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new rd,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new q,C=null,w=new fs;w.viewport=new zn;let T=new fs;T.viewport=new zn;let E=[w,T],D=new Ds,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new br,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new br,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new br,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&G(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&G(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?W:U,a=_.stencil?Te:xe);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Vn(d.textureWidth,d.textureHeight,{format:Oe,type:ge,depthTexture:new Za(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Vn(f.framebufferWidth,f.framebufferHeight,{format:Oe,type:ge,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ne.setContext(r),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new J,P=new J;function F(e,t,n){N.setFromMatrixPosition(t.matrixWorld),P.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(P),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function I(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;I(D,i);for(let e=0;e<a.length;e++)I(a[e],i);a.length===2?F(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),L(e,D,i)};function L(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Xt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ee=null;function te(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new fs,o.layers.enable(n),o.viewport=new zn,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new $a,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ee&&ee(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ne=new Xs;ne.setAnimationLoop(te),this.setAnimationLoop=function(e){ee=e},this.dispose=function(){}}},ad=new Wn,od=new Y;od.set(-1,0,0,0,1,0,0,0,1);function sd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,po(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ad.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(od),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function cd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return K(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?G(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):G(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ld=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ud=null;function dd(){return ud===null&&(ud=new sa(ld,16,16,je,Se),ud.name=`DFG_LUT`,ud.minFilter=pe,ud.magFilter=pe,ud.wrapS=le,ud.wrapT=le,ud.generateMipmaps=!1,ud.needsUpdate=!0),ud}var fd=class{constructor(e={}){let{canvas:t=Rt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ge}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Ne,Me,Ae]),g=new Set([ge,xe,ye,Te,Ce,we]),_=new Uint32Array(4),v=new Int32Array(4),y=new J,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Ot;let j=0,M=0,N=null,P=-1,F=null,I=new zn,L=new zn,ee=null,te=new X(0),ne=0,re=t.width,ie=t.height,R=1,ae=null,oe=null,se=new zn(0,0,re,ie),ce=new zn(0,0,re,ie),le=!1,ue=new Da,z=!1,de=!1,fe=new Wn,pe=new J,me=new zn,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function be(){return N===null?R:1}let B=n;function Ee(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,Ze,!1),t.addEventListener(`webglcontextrestored`,Qe,!1),t.addEventListener(`webglcontextcreationerror`,$e,!1),B===null){let t=`webgl2`;if(B=Ee(t,e),B===null)throw Ee(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw K(`WebGLRenderer: `+e.message),e}let V,De,H,Oe,U,W,ke,je,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je;function Ye(){V=new Ac(B),V.init(),Ke=new ed(B,V),De=new oc(B,V,e,Ke),H=new Qu(B,V),De.reversedDepthBuffer&&d&&H.buffers.depth.setReversed(!0),O=B.createFramebuffer(),k=B.createFramebuffer(),A=B.createFramebuffer(),Oe=new Nc(B),U=new Mu,W=new $u(B,V,H,U,De,Ke,Oe),ke=new kc(T),je=new Zs(B),qe=new ic(B,je),Pe=new jc(B,je,Oe,qe),Fe=new Fc(B,Pe,je,qe,Oe),Ue=new Pc(B,De,W),Be=new sc(U),Ie=new ju(T,ke,V,De,qe,Be),Le=new sd(T,U),Re=new Iu,ze=new Uu(V),He=new rc(T,ke,H,Fe,p,s),Ve=new Zu(T,Fe,De),Je=new cd(B,Oe,De,H),We=new ac(B,V,Oe),Ge=new Mc(B,V,Oe),Oe.programs=Ie.programs,T.capabilities=De,T.extensions=V,T.properties=U,T.renderLists=Re,T.shadowMap=Ve,T.state=H,T.info=Oe}Ye(),m!==1009&&(w=new Lc(m,t.width,t.height,o,r,i));let Xe=new id(T,B);this.xr=Xe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=V.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=V.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(e){e!==void 0&&(R=e,this.setSize(re,ie,!1))},this.getSize=function(e){return e.set(re,ie)},this.setSize=function(e,n,r=!0){if(Xe.isPresenting){G(`WebGLRenderer: Can't change size while VR device is presenting.`);return}re=e,ie=n,t.width=Math.floor(e*R),t.height=Math.floor(n*R),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(re*R,ie*R).floor()},this.setDrawingBufferSize=function(e,n,r){re=e,ie=n,R=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){K(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){G(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(se)},this.setViewport=function(e,t,n,r){e.isVector4?se.set(e.x,e.y,e.z,e.w):se.set(e,t,n,r),H.viewport(I.copy(se).multiplyScalar(R).round())},this.getScissor=function(e){return e.copy(ce)},this.setScissor=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),H.scissor(L.copy(ce).multiplyScalar(R).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(e){H.setScissorTest(le=e)},this.setOpaqueSort=function(e){ae=e},this.setTransparentSort=function(e){oe=e},this.getClearColor=function(e){return e.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=He.getClearColor(),r=He.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,B.clearBufferuiv(B.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,B.clearBufferiv(B.COLOR,0,v))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ze,!1),t.removeEventListener(`webglcontextrestored`,Qe,!1),t.removeEventListener(`webglcontextcreationerror`,$e,!1),He.dispose(),Re.dispose(),ze.dispose(),U.dispose(),ke.dispose(),Fe.dispose(),qe.dispose(),Je.dispose(),Ie.dispose(),Xe.dispose(),Xe.removeEventListener(`sessionstart`,ot),Xe.removeEventListener(`sessionend`,st),ct.stop()};function Ze(e){e.preventDefault(),Vt(`WebGLRenderer: Context Lost.`),E=!0}function Qe(){Vt(`WebGLRenderer: Context Restored.`),E=!1;let e=Oe.autoReset,t=Ve.enabled,n=Ve.autoUpdate,r=Ve.needsUpdate,i=Ve.type;Ye(),Oe.autoReset=e,Ve.enabled=t,Ve.autoUpdate=n,Ve.needsUpdate=r,Ve.type=i}function $e(e){K(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function et(e){let t=e.target;t.removeEventListener(`dispose`,et),tt(t)}function tt(e){nt(e),U.remove(e)}function nt(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){Ie.releaseProgram(e)}),e.isShaderMaterial&&Ie.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=vt(e,t,n,r,i);H.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Pe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;qe.setup(i,r,s,n,c);let h,g=We;if(c!==null&&(h=je.get(c),g=Ge,g.setIndex(h)),i.isMesh)r.wireframe===!0?(H.setLineWidth(r.wireframeLinewidth*be()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),H.setLineWidth(e*be()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh)if(V.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?je.get(c).bytesPerElement:1,o=U.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(B,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function rt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,mt(e,t,n),e.side=0,e.needsUpdate=!0,mt(e,t,n),e.side=2):mt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=ze.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];rt(a,n,e),r.add(a)}else rt(t,n,e),r.add(t)}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){U.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}V.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let it=null;function at(e){it&&it(e)}function ot(){ct.stop()}function st(){ct.start()}let ct=new Xs;ct.setAnimationLoop(at),typeof self<`u`&&ct.setContext(self),this.setAnimationLoop=function(e){it=e,Xe.setAnimationLoop(e),e===null?ct.stop():ct.start()},Xe.addEventListener(`sessionstart`,ot),Xe.addEventListener(`sessionend`,st),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){K(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Xe.enabled===!0&&Xe.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(t),t=Xe.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=ze.get(e,C.length),x.init(t),x.state.textureUnits=W.getTextureUnits(),C.push(x),fe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ue.setFromProjectionMatrix(fe,Pt,t.reversedDepth),de=this.localClippingEnabled,z=Be.init(this.clippingPlanes,de),b=Re.get(e,S.length),b.init(),S.push(b),Xe.enabled===!0&&Xe.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&lt(e,t,-1/0,T.sortObjects)}lt(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ae,oe,t.reversedDepth),ve=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,ve&&He.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),z===!0&&Be.beginShadows();let i=x.state.shadowsArray;if(Ve.render(i,e,t),z===!0&&Be.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];dt(n,r,e,a)}ve&&He.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ut(b,e,n,n.viewport)}}else r.length>0&&dt(n,r,e,t),ve&&He.render(e),ut(b,e,t)}N!==null&&M===0&&(W.updateMultisampleRenderTarget(N),W.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),qe.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],W.setTextureUnits(x.state.textureUnits),z===!0&&Be.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function lt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ue.intersectsSprite(e)){r&&me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(fe);let t=Fe.update(e),i=e.material;i.visible&&b.push(e,t,i,n,me.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ue.intersectsObject(e))){let t=Fe.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),me.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),me.copy(e.boundingSphere.center)),me.applyMatrix4(e.matrixWorld).applyMatrix4(fe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,me.z,o)}}else i.visible&&b.push(e,t,i,n,me.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)lt(i[e],t,n,r)}function ut(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),z===!0&&Be.setGlobalState(T.clippingPlanes,n),r&&H.viewport(I.copy(r)),i.length>0&&ft(i,t,n),a.length>0&&ft(a,t,n),o.length>0&&ft(o,t,n),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function dt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=V.has(`EXT_color_buffer_half_float`)||V.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Vn(1,1,{generateMipmaps:!0,type:e?Se:ge,minFilter:he,samples:Math.max(4,De.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:On.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(te),ne=T.getClearAlpha(),ne<1&&T.setClearColor(16777215,.5),T.clear(),ve&&He.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),z===!0&&Be.setGlobalState(T.clippingPlanes,r),ft(e,n,r),W.updateMultisampleRenderTarget(a),W.updateRenderTargetMipmap(a),V.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,pt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(W.updateMultisampleRenderTarget(a),W.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(te,ne),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ft(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&pt(o,t,n,s,l,c)}}function pt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function mt(e,t,n){t.isScene!==!0&&(t=_e);let r=U.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ie.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ie.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ke.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,et),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return gt(e,s),d}else s.uniforms=Ie.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ie.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Be.uniform),gt(e,s),r.needsLights=bt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function ht(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Wl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function gt(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function _t(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function vt(e,t,n,r,i){t.isScene!==!0&&(t=_e),W.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:On.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ke.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=U.get(r),y=x.state.lights;if(z===!0&&(de===!0||e!==F)){let t=e===F&&r.id===P;Be.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Be.numPlanes||v.numIntersection!==Be.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=mt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(H.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=_t(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){H.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(B,`projectionMatrix`,e.projectionMatrix),O.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(B,pe.setFromMatrixPosition(e.matrixWorld)),De.logarithmicDepthBuffer&&O.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(B,`directionalShadowMap`,y.state.directionalShadowMap,W),y.state.spotShadowMap.length>0&&O.setValue(B,`spotShadowMap`,y.state.spotShadowMap,W),y.state.pointShadowMap.length>0&&O.setValue(B,`pointShadowMap`,y.state.pointShadowMap,W)),i.isSkinnedMesh){O.setOptional(B,i,`bindMatrix`),O.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(B,`boneTexture`,e.boneTexture,W))}i.isBatchedMesh&&(O.setOptional(B,i,`batchingTexture`),O.setValue(B,`batchingTexture`,i._matricesTexture,W),O.setOptional(B,i,`batchingIdTexture`),O.setValue(B,`batchingIdTexture`,i._indirectTexture,W),O.setOptional(B,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(B,`batchingColorTexture`,i._colorsTexture,W));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ue.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(B,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=dd()),w){if(O.setValue(B,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&yt(k,E),a&&r.fog===!0&&Le.refreshFogUniforms(k,a),Le.refreshMaterialUniforms(k,r,R,ie,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Wl.upload(B,ht(v),k,W)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Wl.upload(B,ht(v),k,W),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(B,`center`,i.center),O.setValue(B,`modelViewMatrix`,i.modelViewMatrix),O.setValue(B,`normalMatrix`,i.normalMatrix),O.setValue(B,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Je.update(n,S),Je.bind(n,S)}}return S}function yt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function bt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=U.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=U.get(e);if(o.__useDefaultFramebuffer!==void 0){H.bindFramebuffer(B.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest,H.viewport(I),H.scissor(L),H.setScissorTest(ee),P=-1;return}else if(o.__webglFramebuffer===void 0)W.setupRenderTarget(e);else if(o.__hasExternalTextures)W.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&U.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);W.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&W.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest}else I.copy(se).multiplyScalar(R).floor(),L.copy(ce).multiplyScalar(R).floor(),ee=le;if(n!==0&&(r=O),H.bindFramebuffer(B.FRAMEBUFFER,r)&&H.drawBuffers(e,r),H.viewport(I),H.scissor(L),H.setScissorTest(ee),i){let r=U.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=U.get(e.textures[t]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=U.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,t.__webglTexture,n)}P=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){K(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){H.bindFramebuffer(B.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s),!De.textureFormatReadable(c)){K(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!De.textureTypeReadable(l)){K(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,Ke.convert(c),Ke.convert(l),a)}finally{let e=N===null?null:U.get(N).__webglFramebuffer;H.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){H.bindFramebuffer(B.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s),!De.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!De.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,d),B.bufferData(B.PIXEL_PACK_BUFFER,a.byteLength,B.STREAM_READ),B.readPixels(t,n,r,i,Ke.convert(l),Ke.convert(u),0);let f=N===null?null:U.get(N).__webglFramebuffer;H.bindFramebuffer(B.FRAMEBUFFER,f);let p=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Wt(B,p,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,d),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,a),B.deleteBuffer(d),B.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;W.setTexture2D(e,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,o,s,i,a),H.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ke.convert(t.format),_=Ke.convert(t.type),v;t.isData3DTexture?(W.setTexture3D(t,0),v=B.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(W.setTexture2DArray(t,0),v=B.TEXTURE_2D_ARRAY):(W.setTexture2D(t,0),v=B.TEXTURE_2D),H.activeTexture(B.TEXTURE0),H.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,t.flipY),H.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),H.pixelStorei(B.UNPACK_ALIGNMENT,t.unpackAlignment);let y=H.getParameter(B.UNPACK_ROW_LENGTH),b=H.getParameter(B.UNPACK_IMAGE_HEIGHT),x=H.getParameter(B.UNPACK_SKIP_PIXELS),S=H.getParameter(B.UNPACK_SKIP_ROWS),C=H.getParameter(B.UNPACK_SKIP_IMAGES);H.pixelStorei(B.UNPACK_ROW_LENGTH,h.width),H.pixelStorei(B.UNPACK_IMAGE_HEIGHT,h.height),H.pixelStorei(B.UNPACK_SKIP_PIXELS,l),H.pixelStorei(B.UNPACK_SKIP_ROWS,u),H.pixelStorei(B.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=U.get(e),r=U.get(t),h=U.get(n.__renderTarget),g=U.get(r.__renderTarget);H.bindFramebuffer(B.READ_FRAMEBUFFER,h.__webglFramebuffer),H.bindFramebuffer(B.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,U.get(e).__webglTexture,i,d+n),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,U.get(t).__webglTexture,a,m+n)),B.blitFramebuffer(l,u,o,s,f,p,o,s,B.DEPTH_BUFFER_BIT,B.NEAREST);H.bindFramebuffer(B.READ_FRAMEBUFFER,null),H.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||U.has(e)){let n=U.get(e),r=U.get(t);H.bindFramebuffer(B.READ_FRAMEBUFFER,k),H.bindFramebuffer(B.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,n.__webglTexture,i),T?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,r.__webglTexture,a),i===0?T?B.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):B.copyTexSubImage2D(v,a,f,p,l,u,o,s):B.blitFramebuffer(l,u,o,s,f,p,o,s,B.COLOR_BUFFER_BIT,B.NEAREST);H.bindFramebuffer(B.READ_FRAMEBUFFER,null),H.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?B.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h);H.pixelStorei(B.UNPACK_ROW_LENGTH,y),H.pixelStorei(B.UNPACK_IMAGE_HEIGHT,b),H.pixelStorei(B.UNPACK_SKIP_PIXELS,x),H.pixelStorei(B.UNPACK_SKIP_ROWS,S),H.pixelStorei(B.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&B.generateMipmap(v),H.unbindTexture()},this.initRenderTarget=function(e){U.get(e).__webglFramebuffer===void 0&&W.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?W.setTextureCube(e,0):e.isData3DTexture?W.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?W.setTexture2DArray(e,0):W.setTexture2D(e,0),H.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,H.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Pt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=On._getDrawingBufferColorSpace(e),t.unpackColorSpace=On._getUnpackColorSpace()}};function pd(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}function md(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`);let a=e.clone();return a.setIndex(i),a.clearGroups(),a}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function hd(e){let t=new Map,n=new Map,r=e.clone();return gd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function gd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)gd(e.children[r],t.children[r],n)}var _d=class extends qo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new wd(e)}),this.register(function(e){return new Td(e)}),this.register(function(e){return new Pd(e)}),this.register(function(e){return new Fd(e)}),this.register(function(e){return new Id(e)}),this.register(function(e){return new Dd(e)}),this.register(function(e){return new Od(e)}),this.register(function(e){return new kd(e)}),this.register(function(e){return new Ad(e)}),this.register(function(e){return new Cd(e)}),this.register(function(e){return new jd(e)}),this.register(function(e){return new Ed(e)}),this.register(function(e){return new Nd(e)}),this.register(function(e){return new Md(e)}),this.register(function(e){return new xd(e)}),this.register(function(e){return new Ld(e,bd.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Ld(e,bd.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Rd(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=xs.extractUrlBase(e);a=xs.resolveURL(t,this.path)}else a=xs.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new Xo(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(s.decode(new Uint8Array(e,0,4))===zd){try{a[bd.KHR_BINARY_GLTF]=new Hd(e)}catch(e){r&&r(e);return}i=JSON.parse(a[bd.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new hf(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case bd.KHR_MATERIALS_UNLIT:a[t]=new Sd;break;case bd.KHR_DRACO_MESH_COMPRESSION:a[t]=new Ud(i,this.dracoLoader);break;case bd.KHR_TEXTURE_TRANSFORM:a[t]=new Wd;break;case bd.KHR_MESH_QUANTIZATION:a[t]=new Gd;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function vd(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function yd(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var bd={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},xd=class{constructor(e){this.parser=e,this.name=bd.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new X(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],kt);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new ys(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new gs(s),o.distance=c;break;case`spot`:o=new ms(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),sf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Sd=class{constructor(){this.name=bd.KHR_MATERIALS_UNLIT}getMaterialType(){return Fi}extendParams(e,t,n){let r=[];e.color=new X(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],kt),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,Ot))}return Promise.all(r)}},Cd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},wd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new q(e,e)}return Promise.all(r)}},Td=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_DISPERSION}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Ed=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},Dd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_SHEEN}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new X(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],kt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,Ot)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Od=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},kd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_VOLUME}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new X().setRGB(i[0],i[1],i[2],kt),Promise.all(r)}},Ad=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_IOR}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},jd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_SPECULAR}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new X().setRGB(i[0],i[1],i[2],kt),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,Ot)),Promise.all(r)}},Md=class{constructor(e){this.parser=e,this.name=bd.EXT_MATERIALS_BUMP}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},Nd=class{constructor(e){this.parser=e,this.name=bd.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return yd(this.parser,e,this.name)===null?null:bo}extendMaterialParams(e,t){let n=yd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},Pd=class{constructor(e){this.parser=e,this.name=bd.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},Fd=class{constructor(e){this.parser=e,this.name=bd.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Id=class{constructor(e){this.parser=e,this.name=bd.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Ld=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}else return null}},Rd=class{constructor(e){this.name=bd.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==Yd.TRIANGLES&&e.mode!==Yd.TRIANGLE_STRIP&&e.mode!==Yd.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new Wn,n=new J,a=new xn,s=new J(1,1,1),c=new ya(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));for(let t in o)if(t===`_COLOR_0`){let e=o[t];c.instanceColor=new da(e.array,e.itemSize,e.normalized)}else t!==`TRANSLATION`&&t!==`ROTATION`&&t!==`SCALE`&&e.geometry.setAttribute(t,o[t]);_r.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},zd=`glTF`,Bd=12,Vd={JSON:1313821514,BIN:5130562},Hd=class{constructor(e){this.name=bd.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Bd),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==zd)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-Bd,i=new DataView(e,Bd),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Vd.JSON){let r=new Uint8Array(e,Bd+a,t);this.content=n.decode(r)}else if(r===Vd.BIN){let n=Bd+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},Ud=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=bd.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=ef[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=ef[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=Xd[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,kt,n)})})}},Wd=class{constructor(){this.name=bd.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0?e:(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0,e)}},Gd=class{constructor(){this.name=bd.KHR_MESH_QUANTIZATION}},Kd=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},qd=new xn,Jd=class extends Kd{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return qd.fromArray(i).normalize().toArray(i),i}},Yd={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Xd={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zd={9728:z,9729:pe,9984:de,9985:me,9986:fe,9987:he},Qd={33071:le,33648:ue,10497:ce},$d={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ef={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},tf={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},nf={CUBICSPLINE:void 0,LINEAR:yt,STEP:vt},rf={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function af(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new yo({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function of(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function sf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function cf(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function lf(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function uf(e){let t,n=e.extensions&&e.extensions[bd.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+df(n.attributes):e.indices+`:`+df(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+df(e.targets[n]);return t}function df(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function ff(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function pf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var mf=new Wn,hf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new vd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>`u`||n&&r<17||i&&a<98?this.textureLoader=new $o(this.options.manager):this.textureLoader=new Cs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xo(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return of(i,a,r),sf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+ e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[bd.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(xs.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=$d[r.type],t=Xd[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new oi(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=$d[r.type],o=Xd[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Si(f,u/s),t.cache.add(n,c)),p=new wi(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new oi(f,a,d);if(r.sparse!==void 0){let t=$d.SCALAR,n=Xd[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new oi(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=Zd[n.magFilter]||1006,t.minFilter=Zd[n.minFilter]||1008,t.wrapS=Qd[n.wrapS]||1e3,t.wrapT=Qd[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Rn(e);t.needsUpdate=!0,n(t)}),t.load(xs.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),sf(e,a),e.userData.mimeType=a.mimeType||pf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[bd.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[bd.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[bd.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Ha,Ei.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Oa,Ei.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return yo}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[bd.KHR_MATERIALS_UNLIT]){let e=r[bd.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new X(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],kt),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,Ot)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||rf.OPAQUE;if(l===rf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===rf.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Fi&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new q(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Fi&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Fi){let e=i.emissiveFactor;o.emissive=new X().setRGB(e[0],e[1],e[2],kt)}return i.emissiveTexture!==void 0&&a!==Fi&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,Ot)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),sf(n,i),t.associations.set(n,{materials:e}),i.extensions&&of(r,n,i),n})}createUniqueName(e){let t=Bs.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[bd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return _f(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=uf(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[bd.KHR_DRACO_MESH_COMPRESSION]?i(o):_f(new xi,o,t),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?af(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===Yd.TRIANGLES||u.mode===Yd.TRIANGLE_STRIP||u.mode===Yd.TRIANGLE_FAN||u.mode===void 0)d=i.isSkinnedMesh===!0?new aa(l,f):new qi(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),u.mode===Yd.TRIANGLE_STRIP?d.geometry=md(d.geometry,1):u.mode===Yd.TRIANGLE_FAN&&(d.geometry=md(d.geometry,2));else if(u.mode===Yd.LINES)d=new Ba(l,f);else if(u.mode===Yd.LINE_STRIP)d=new Ia(l,f);else if(u.mode===Yd.LINE_LOOP)d=new Va(l,f);else if(u.mode===Yd.POINTS)d=new qa(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&lf(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),sf(d,i),u.extensions&&of(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&of(r,c[0],i),c[0];let l=new vr;i.extensions&&of(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new fs(bn.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new _s(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),sf(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new Wn;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new ua(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new Vo(i,void 0,l);return sf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,mf)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new J().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new oa:t.length>1?new vr:t.length===1?t[0]:new _r,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),sf(o,i),i.extensions&&of(n,o,i),i.matrix!==void 0){let e=new Wn;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new vr;n.name&&(i.name=r.createUniqueName(n.name)),sf(i,n),n.extensions&&of(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(hd(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Ei||e instanceof Rn)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}tf[i.path]===tf.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(tf[i.path]){case tf.weights:l=Io;break;case tf.rotation:l=Ro;break;case tf.translation:case tf.scale:l=Bo;break;default:switch(n.itemSize){case 1:l=Io;break;default:l=Bo;break}break}let u=r.interpolation===void 0?yt:nf[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+tf[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=ff(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof Ro?Jd:Kd)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function gf(e,t,n){let r=t.attributes,i=new Hr;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new J(t[0],t[1],t[2]),new J(a[0],a[1],a[2])),e.normalized){let t=ff(Xd[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new J,t=new J;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=ff(Xd[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new pi;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function _f(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=ef[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return On.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${On.workingColorSpace}" not supported.`),sf(e,t),gf(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:cf(e,t.targets,n)})}var vf=class{constructor(e,t={}){this.enabled=!0;let n=t.defaultThickness===void 0?.003:t.defaultThickness,r=new X().fromArray(t.defaultColor===void 0?[0,0,0]:t.defaultColor),i=t.defaultAlpha===void 0?1:t.defaultAlpha,a=t.defaultKeepAlive===void 0?!1:t.defaultKeepAlive,o=t.defaultThicknessJitter===void 0?.9:t.defaultThicknessJitter,s=t.defaultNormalJitter===void 0?.3:t.defaultNormalJitter,c=t.defaultNoiseFrequency===void 0?3.2:t.defaultNoiseFrequency,l={},u={},d={},f={outlineThickness:{value:n},outlineColor:{value:r},outlineAlpha:{value:i},outlineThicknessJitter:{value:o},outlineNormalJitter:{value:s},outlineNoiseFrequency:{value:c}},p=[`#include <common>`,`#include <uv_pars_vertex>`,`#include <displacementmap_pars_vertex>`,`#include <fog_pars_vertex>`,`#include <morphtarget_pars_vertex>`,`#include <skinning_pars_vertex>`,`#include <logdepthbuf_pars_vertex>`,`#include <clipping_planes_pars_vertex>`,`uniform float outlineThickness;`,`uniform float outlineThicknessJitter;`,`uniform float outlineNormalJitter;`,`uniform float outlineNoiseFrequency;`,`float pencilHash( vec3 p ) {`,`	p = fract( p * 0.3183099 + vec3( 0.1, 0.2, 0.3 ) );`,`	p *= 17.0;`,`	return fract( p.x * p.y * p.z * ( p.x + p.y + p.z ) );`,`}`,`float pencilValueNoise( vec3 p ) {`,`	vec3 i = floor( p );`,`	vec3 f = fract( p );`,`	vec3 u = f * f * ( 3.0 - 2.0 * f );`,`	return mix(`,`		mix(`,`			mix( pencilHash( i + vec3( 0.0, 0.0, 0.0 ) ), pencilHash( i + vec3( 1.0, 0.0, 0.0 ) ), u.x ),`,`			mix( pencilHash( i + vec3( 0.0, 1.0, 0.0 ) ), pencilHash( i + vec3( 1.0, 1.0, 0.0 ) ), u.x ),`,`			u.y ),`,`		mix(`,`			mix( pencilHash( i + vec3( 0.0, 0.0, 1.0 ) ), pencilHash( i + vec3( 1.0, 0.0, 1.0 ) ), u.x ),`,`			mix( pencilHash( i + vec3( 0.0, 1.0, 1.0 ) ), pencilHash( i + vec3( 1.0, 1.0, 1.0 ) ), u.x ),`,`			u.y ),`,`		u.z );`,`}`,`vec3 pencilSketchJitter( vec3 p ) {`,`	vec3 coarse = vec3(`,`		pencilValueNoise( p ),`,`		pencilValueNoise( p + vec3( 19.1, 5.3, 8.7 ) ),`,`		pencilValueNoise( p + vec3( 3.4, 27.6, 14.2 ) )`,`	);`,`	vec3 fine = vec3(`,`		pencilValueNoise( p * 3.0 + vec3( 91.3, 12.9, 4.1 ) ),`,`		pencilValueNoise( p * 3.0 + vec3( 6.7, 55.2, 19.8 ) ),`,`		pencilValueNoise( p * 3.0 + vec3( 40.5, 2.2, 71.4 ) )`,`	);`,`	return ( coarse - 0.5 ) * 2.0 + ( fine - 0.5 ) * 2.0 * 0.25;`,`}`,`vec4 calculateOutline( vec4 pos, vec3 normal, vec4 skinned ) {`,`	vec3 jitter = pencilSketchJitter( position.xyz * outlineNoiseFrequency );`,`	float thickness = outlineThickness * max( 0.0, 1.0 + jitter.x * outlineThicknessJitter );`,`	const float ratio = 1.0;`,`	vec3 wobbledNormal = normalize( normal + jitter * outlineNormalJitter );`,`	vec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + wobbledNormal, 1.0 );`,`	vec4 norm = normalize( pos - pos2 );`,`	return pos + norm * thickness * pos.w * ratio;`,`}`,`void main() {`,`	#include <uv_vertex>`,`	#include <beginnormal_vertex>`,`	#include <morphnormal_vertex>`,`	#include <skinbase_vertex>`,`	#include <skinnormal_vertex>`,`	#include <begin_vertex>`,`	#include <morphtarget_vertex>`,`	#include <skinning_vertex>`,`	#include <displacementmap_vertex>`,`	#include <project_vertex>`,`	vec3 outlineNormal = - objectNormal;`,`	gl_Position = calculateOutline( gl_Position, outlineNormal, vec4( transformed, 1.0 ) );`,`	#include <logdepthbuf_vertex>`,`	#include <clipping_planes_vertex>`,`	#include <fog_vertex>`,`}`].join(`
`),m=[`#include <common>`,`#include <fog_pars_fragment>`,`#include <logdepthbuf_pars_fragment>`,`#include <clipping_planes_pars_fragment>`,`uniform vec3 outlineColor;`,`uniform float outlineAlpha;`,`void main() {`,`	#include <clipping_planes_fragment>`,`	#include <logdepthbuf_fragment>`,`	gl_FragColor = vec4( outlineColor, outlineAlpha );`,`	#include <tonemapping_fragment>`,`	#include <colorspace_fragment>`,`	#include <fog_fragment>`,`	#include <premultiplied_alpha_fragment>`,`}`].join(`
`);function h(){return new _o({type:`PencilOutlineEffect`,uniforms:mo.merge([Z.fog,Z.displacementmap,f]),vertexShader:p,fragmentShader:m,side:1})}function g(e){let t=l[e.uuid];return t===void 0&&(t={material:h(),used:!0,keepAlive:a,count:0},l[e.uuid]=t),t.used=!0,t.material}function _(e){let t=g(e);return u[t.uuid]=e,C(t,e),t}function v(e){let t=e.geometry,n=t!==void 0&&t.attributes.normal!==void 0;return e.isMesh===!0&&e.material!==void 0&&n===!0}function y(e){if(v(e)!==!1){if(Array.isArray(e.material))for(let t=0,n=e.material.length;t<n;t++)e.material[t]=_(e.material[t]);else e.material=_(e.material);d[e.uuid]=e.onBeforeRender,e.onBeforeRender=x}}function b(e){if(v(e)!==!1){if(Array.isArray(e.material))for(let t=0,n=e.material.length;t<n;t++)e.material[t]=u[e.material[t].uuid];else e.material=u[e.material.uuid];e.onBeforeRender=d[e.uuid]}}function x(e,t,n,r,i){let a=u[i.uuid];a!==void 0&&S(i,a)}function S(e,t){let n=t.userData.outlineParameters;e.uniforms.outlineAlpha.value=t.opacity,n!==void 0&&(n.thickness!==void 0&&(e.uniforms.outlineThickness.value=n.thickness),n.color!==void 0&&e.uniforms.outlineColor.value.fromArray(n.color),n.alpha!==void 0&&(e.uniforms.outlineAlpha.value=n.alpha),n.thicknessJitter!==void 0&&(e.uniforms.outlineThicknessJitter.value=n.thicknessJitter),n.normalJitter!==void 0&&(e.uniforms.outlineNormalJitter.value=n.normalJitter),n.noiseFrequency!==void 0&&(e.uniforms.outlineNoiseFrequency.value=n.noiseFrequency)),t.displacementMap&&(e.uniforms.displacementMap.value=t.displacementMap,e.uniforms.displacementScale.value=t.displacementScale,e.uniforms.displacementBias.value=t.displacementBias)}function C(e,t){if(e.name===`invisible`)return;let n=t.userData.outlineParameters;e.fog=t.fog,e.toneMapped=t.toneMapped,e.premultipliedAlpha=t.premultipliedAlpha,e.displacementMap=t.displacementMap,n===void 0?(e.transparent=t.transparent,e.visible=t.visible):(t.visible===!1?e.visible=!1:e.visible=n.visible===void 0?!0:n.visible,e.transparent=n.alpha!==void 0&&n.alpha<1?!0:t.transparent,n.keepAlive!==void 0&&(l[t.uuid].keepAlive=n.keepAlive)),(t.wireframe===!0||t.depthTest===!1)&&(e.visible=!1),t.clippingPlanes&&(e.clipping=!0,e.clippingPlanes=t.clippingPlanes,e.clipIntersection=t.clipIntersection,e.clipShadows=t.clipShadows),e.version=t.version}function w(){let e;e=Object.keys(u);for(let t=0,n=e.length;t<n;t++)u[e[t]]=void 0;e=Object.keys(d);for(let t=0,n=e.length;t<n;t++)d[e[t]]=void 0;e=Object.keys(l);for(let t=0,n=e.length;t<n;t++){let n=e[t];l[n].used===!1?(l[n].count++,l[n].keepAlive===!1&&l[n].count>60&&delete l[n]):(l[n].used=!1,l[n].count=0)}}this.render=function(t,n){if(this.enabled===!1){e.render(t,n);return}let r=e.autoClear;e.autoClear=this.autoClear,e.render(t,n),e.autoClear=r,this.renderOutline(t,n)},this.renderOutline=function(t,n){let r=e.autoClear,i=t.matrixWorldAutoUpdate,a=t.background,o=e.shadowMap.enabled;t.matrixWorldAutoUpdate=!1,t.background=null,e.autoClear=!1,e.shadowMap.enabled=!1,t.traverse(y),e.render(t,n),t.traverse(b),w(),t.matrixWorldAutoUpdate=i,t.background=a,e.autoClear=r,e.shadowMap.enabled=o},this.setSize=function(t,n,r){e.setSize(t,n,r)}}},yf=`#191022`,bf=[{name:`brick`,color:`#0a0709`},{name:`plank`,color:`#1a1118`},{name:`trash`,color:`#0c070a`}];function xf(e,t,n){let{toonGradientMap:r,wallGradientMap:i,roomWidth:a,roomHeight:o,roomDepth:s,halfWidth:c,halfDepth:l,outerWallHalfWidth:u,exteriorDepth:d,zoneWidth:f,wallThickness:p,facadeThickness:m,corridorWidth:h,zoneXs:g,ageMin:_,ageMax:v,ageToZ:y,exteriorGroup:b}=n,x=new xo({color:`#060106`,gradientMap:r,flatShading:!0});x.userData.outlineParameters={visible:!1};let S=new qi(new oo(u*2,s),x);S.rotation.x=-Math.PI/2,S.receiveShadow=!0,e.add(S);let C=new xo({color:`#22162b`,gradientMap:r});C.userData.outlineParameters={visible:!1};let w=new qi(new oo(u*2,d),C);w.rotation.x=-Math.PI/2,w.position.z=l+d/2,w.receiveShadow=!0,b.add(w);let T={brick:new eo(1,1,1),plank:new eo(1,1,1),trash:new ao(1,0)},E=h/2+.4;function D(e){return g.some(t=>Math.abs(e-t)<E)}function O(){let e=-u+Math.random()*u*2;for(let t=0;t<5&&D(e);t++)e=-u+Math.random()*u*2;return e}let k=3.3;function A(e,t){return g.some(n=>{let r=e-n,i=t-l;return r*r+i*i<k*k})}function j(e){let t=e();for(let n=0;n<6&&A(t[0],t[1]);n++)t=e();return t}let M=.16,N=.075,P=new _r;for(let e of bf){let t=new xo({color:e.color,gradientMap:r,flatShading:!0});t.userData.outlineParameters={visible:!1};let n=new ya(T[e.name],t,60);n.castShadow=!0,n.receiveShadow=!0;for(let t=0;t<60;t++){let r=Math.random(),i=e.name===`plank`?.8:.55,a=r<i,o=!a&&r<i+.15,s=Math.random()<.5?-1:1,f,p,m,h;if(e.name===`plank`&&a){let e=.5+Math.random()*.7;[f,m]=j(()=>[O(),l+.06]),h=(Math.random()*20+12)*(Math.PI/180),p=Math.cos(h)*e/2,P.position.set(f,p,m),P.rotation.set(h,Math.random()*Math.PI*.2,0),P.scale.set(M,e,N)}else if(a){[f,m]=j(()=>[O(),l+.1+Math.random()*.25]);let t=e.name===`brick`?.08+Math.random()*.06:.05+Math.random()*.08;P.position.set(f,t*.5,m),P.rotation.set(Math.random()*Math.PI*.3,Math.random()*Math.PI,Math.random()*Math.PI*.3),P.scale.set(t*(.8+Math.random()*.6),t*(.6+Math.random()*.5),t*(.8+Math.random()*.6))}else if(e.name===`plank`&&o){let e=.5+Math.random()*.7;[f,m]=j(()=>[s*(c-.08-Math.random()*.15),l+Math.random()*d]),h=(Math.random()*20+12)*(Math.PI/180),p=Math.cos(h)*e/2,P.position.set(f,p,m),P.rotation.set(0,Math.random()*Math.PI,-s*h),P.scale.set(N,e,M)}else if(o){[f,m]=j(()=>[s*(c-.15-Math.random()*.35),l+Math.random()*d]);let t=e.name===`brick`?.08+Math.random()*.06:.05+Math.random()*.08;P.position.set(f,t*.5,m),P.rotation.set(Math.random()*Math.PI*.3,Math.random()*Math.PI,Math.random()*Math.PI*.3),P.scale.set(t*(.8+Math.random()*.6),t*(.6+Math.random()*.5),t*(.8+Math.random()*.6))}else if([f,m]=j(()=>[-u+Math.random()*u*2,l+Math.random()*d]),e.name===`plank`){let e=.4+Math.random()*.8;P.position.set(f,N/2,m),P.rotation.set(0,Math.random()*Math.PI,0),P.scale.set(M,N,e)}else{let t=e.name===`brick`?.09+Math.random()*.07:.04+Math.random()*.07;P.position.set(f,t*.4,m),P.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),P.scale.set(t*(.7+Math.random()*.6),t*(.5+Math.random()*.6),t*(.7+Math.random()*.6))}P.updateMatrix(),n.setMatrixAt(t,P.matrix)}n.instanceMatrix.needsUpdate=!0,b.add(n)}let F=.01,I=new xo({color:`#250e31`,gradientMap:r,flatShading:!0});I.userData.outlineParameters={visible:!1};let L=new ya(new ao(1,0),I,200);L.castShadow=!1,L.receiveShadow=!0;for(let e=0;e<200;e++){let t=F+Math.random()*(.035-F);P.position.set(-u+Math.random()*u*2,t*.4,l+Math.random()*d),P.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),P.scale.set(t*(.7+Math.random()*.6),t*(.5+Math.random()*.5),t*(.7+Math.random()*.6)),P.updateMatrix(),L.setMatrixAt(e,P.matrix)}L.instanceMatrix.needsUpdate=!0,b.add(L);let ee=new Fi({color:0,side:2});ee.userData.outlineParameters={visible:!1};let te=new qi(new oo(u*2,o*4),ee);te.position.set(0,o,l+d),b.add(te);let ne=new xo({color:0,gradientMap:r,flatShading:!0});ne.userData.outlineParameters={visible:!1};let re=new qi(new oo(a,s),ne);re.rotation.x=Math.PI/2,re.position.y=o,e.add(re);let ie=new Fi({color:`#fff4e0`});ie.userData.outlineParameters={visible:!1};let R=new qi(new oo(a*.5,o*.4),ie);R.position.set(0,o*.24,-l+.05),e.add(R);let ae=[];for(let e=Math.ceil(_);e<=Math.floor(v);e++){let t=y(e);ae.push(-c,0,t,c,0,t)}let oe=new xi;oe.setAttribute(`position`,new li(ae,3));let se=new Ba(oe,new Oa({color:`#361433`}));se.position.y=.01,e.add(se);let ce=new Fi({color:`#361433`});ce.userData.outlineParameters={visible:!1};for(let t of[-f/2,f/2]){let n=new qi(new oo(.07,s),ce);n.rotation.x=-Math.PI/2,n.position.set(t,.012,0),e.add(n)}let le=new xo({color:yf,map:i,gradientMap:r,flatShading:!0});le.userData.outlineParameters={visible:!1};let ue=new qi(new eo(a,o,p),le);ue.position.set(0,o/2,-l-p/2),ue.castShadow=!0,ue.receiveShadow=!0,e.add(ue);function z(){let e=h/2,t=[],n=-c;for(let r of g){let i=r-e;i>n&&t.push([n,i]),n=r+e}return n<c&&t.push([n,c]),t}let de=new xo({color:yf,map:i,gradientMap:r,flatShading:!0});de.userData.outlineParameters={visible:!1};let fe=[];for(let[e,n]of z()){let r=new qi(new eo(n-e,o*1.2,m),de);r.position.set((e+n)/2,o*1.2/2,l),r.castShadow=!0,r.receiveShadow=!0,t.add(r),fe.push(r)}let pe=new eo(p,o,s),me=new xo({color:yf,map:i,gradientMap:r,flatShading:!0});me.userData.outlineParameters={visible:!1};let he=new qi(pe,me);he.position.set(-c-p/2,o/2,0),he.castShadow=!0,he.receiveShadow=!0,e.add(he);let ge=he.clone();ge.position.x=c+p/2,e.add(ge);let _e=new eo(p,o,d),ve=new Fi({color:0});ve.userData.outlineParameters={visible:!1};let ye=new qi(_e,ve);ye.position.set(-c-p/2,o/2,l+d/2),b.add(ye);let be=ye.clone();return be.position.x=c+p/2,b.add(be),{backWall:ue,leftWall:he,rightWall:ge,innerWallMeshes:fe}}function Sf(e,t,n,r=-4){let i=new Xa(e),a=new Fi({map:i,transparent:!0,depthTest:!0,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:r}),o=new Fi({transparent:!0,opacity:0,depthWrite:!1}),s=new eo(t,n,Math.min(t,n)*.05),c=[o,o,o,o,a,a];a.userData.outlineParameters={visible:!1},o.userData.outlineParameters={visible:!1};let l=new qi(s,c);return l.renderOrder=10,{mesh:l,texture:i}}function Cf(e,{width:t,height:n,color:r=`#ff29d8`,glowColor:i=r,glowPadding:a=.8,depthBiasUnits:o}){let s=t*(1+a),c=n*(1+a),l=1024,u=document.createElement(`canvas`);s>=c?(u.height=Math.max(480,Math.round(c/s*l)),u.width=Math.round(u.height*(s/c))):(u.width=Math.max(480,Math.round(s/c*l)),u.height=Math.round(u.width*(c/s)));let d=u.getContext(`2d`),{mesh:f,texture:p}=Sf(u,s,c,o),m=e.replace(/fill="black"/gi,`fill="${r}"`).replace(/fill="#000000"/gi,`fill="${r}"`).replace(/fill="#000"/gi,`fill="${r}"`),h=new Blob([m],{type:`image/svg+xml`}),g=URL.createObjectURL(h),_=new Image;return _.onload=()=>{let e=u.width/(1+a),t=u.height/(1+a),n=(u.width-e)/2,r=(u.height-t)/2;d.clearRect(0,0,u.width,u.height),d.save(),d.shadowColor=i,d.shadowBlur=55,d.drawImage(_,n,r,e,t),d.drawImage(_,n,r,e,t),d.restore(),d.save(),d.shadowColor=i,d.shadowBlur=16,d.drawImage(_,n,r,e,t),d.restore(),d.drawImage(_,n,r,e,t),p.needsUpdate=!0,URL.revokeObjectURL(g)},_.src=g,f}var wf=`<svg width="600" height="247" viewBox="0 0 600 247" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M583.912 75.4217C576.382 62.0563 559.116 69.9722 554.538 81.8247C553.911 82.8609 553.574 83.701 552.586 83.3051C551.19 82.3993 548.907 78.7211 546.535 77.8633C540.265 74.6539 532.38 76.7821 526.589 80.0117C503.864 92.9614 500.977 123.846 486.19 139.85C483.173 143.253 473.762 149.874 470.45 143.817C466.108 128.804 498.304 113.322 501.853 94.5473C505.136 81.0748 494.4 73.8238 482.221 77.6222C472.627 80.3417 463.79 88.174 456.898 94.9931C456.271 95.556 455.615 96.3314 454.881 96.5197C454.68 96.5339 454.598 96.4024 454.562 96.2124C454.379 95.31 455.704 91.754 455.816 89.8392C456.39 86.0689 454.249 81.7188 450.652 80.3663C445.672 78.5401 440.029 81.6481 436.225 84.7112C416.493 102.097 420.965 138.014 394.998 150.013C389.52 152.184 385.125 150.001 385.457 143.807C386.853 126.308 406.91 115.264 413.299 99.2133C415.641 93.8352 417.351 85.0739 409.797 83.0194L409.685 82.9878C392.472 81.0901 383.777 121.291 375.62 133.33C372.083 139.19 358.218 162.617 351.368 151.66C349.878 144.724 355.497 135.575 358.88 129.789C370.474 111.457 387.533 95.9594 393.773 74.4988C394.962 69.7276 395.116 64.2462 391.1 60.881C388.231 58.4172 383.298 57.3372 379.808 58.5541C365.694 63.993 365.854 87.5767 359.33 99.3539C359.064 99.6391 358.727 99.6569 358.478 99.3509C357.792 98.6585 357.082 96.0195 355.852 94.2528C353.155 90.2124 348.363 88.6617 343.566 89.1813C314.559 94.5022 311.282 129.521 296.506 149.412C293.111 154.429 280.672 167.138 277.04 156.107C275.248 132.459 323.84 94.747 320.373 72.6851C319.362 67.7336 315.257 64.5561 310.495 63.9405C292.064 61.4062 291.573 92.0482 284.919 104.977C284.173 106.1 283.262 104.031 282.6 102.676C276.448 89.5539 261.093 93.9535 252.031 102.291C234.174 117.668 228.335 156.245 209.685 165.917C206.385 167.309 202.126 166.885 201.043 162.915C197.731 141.997 230.394 126.44 231.121 105.339C231.157 102.181 229.85 98.8567 226.91 97.7287C222.899 96.162 217.919 98.82 214.743 101.356C203.007 111.131 199.423 128.81 192.774 142.005C188.113 150.928 180.483 162.946 173.491 168.267C171.291 169.909 167.955 171.217 165.287 170.2C160.301 167.333 164.69 157.601 167.245 153.605C175.189 139.823 195.584 123.815 194.839 107.161C194.087 99.7884 184.972 99.7358 180.039 102.791C164.873 112.051 153.51 142.527 147.773 159.269C144.46 170.192 136.682 192.335 150.062 197.384C164.258 200.921 174.514 181.951 183.269 172.289C183.754 171.717 184.99 170.325 184.623 171.626C182.228 177.832 178.909 186.003 183.056 191.677C186.723 197.007 193.874 195.327 198.376 192.264C205.811 187.531 211.247 180.03 216.783 173.11C217.121 172.696 217.44 172.323 217.724 172.038C218.233 171.521 218.623 171.273 218.865 171.396C219.569 172.354 219.09 173.949 219.102 175.985C219.001 181.479 219.741 188.413 225.212 191.094C238.971 196.386 250.535 177.48 257.674 167.63C258.833 165.935 260.206 163.663 258.804 167.91C257.745 171.53 255.899 176.059 255.651 179.344C254.924 186.756 259.182 192.066 267.268 189.414C278.56 185.896 285.297 175.501 291.626 166.17C292.046 165.538 292.957 164.288 293.46 164.191C294.052 163.899 293.975 166.4 293.762 167.645C293.022 173.98 292.608 182.142 298.902 185.896C309.49 191.897 323.165 176.902 329.908 168.033C330.837 166.872 331.577 166.566 331.269 168.891C329.696 177.093 329.258 186.243 340.402 185.248C349.606 183.208 358.029 171.115 363.559 163.172C365.884 159.953 364.174 165.851 364.086 166.914C363.151 172.27 363.648 179.791 369.433 181.851C383.339 185.039 394.158 164.345 401.954 154.495C405.166 150.723 400.913 160.345 400.664 161.205C398.487 167.331 397.417 176.37 404.03 178.656C410.383 180.879 417.132 177.524 420.19 171.828C424.336 164.765 425.454 155.733 428.873 148.375C435.125 135.143 456.567 95.3186 471.911 97.0299C476.956 99.1886 473.277 108.241 471.538 111.902C466.729 121.609 457.963 129.519 451.261 138.01C445.323 145.822 439.236 155.589 438.035 165.413C437.16 171.704 441.046 176.936 447.304 177.791C462.524 179.352 476.856 161.488 485.817 151.409C489.1 147.592 487.343 153.696 487.059 156.016C486.557 159.249 486.586 162.852 487.26 165.875C488.781 174.539 497.387 177.091 504.834 174.772C518.338 170.388 530.848 150.279 539.579 138.747C540.17 138.059 540.508 137.935 540.519 138.474C540.502 139.029 540.23 140.516 539.916 141.35C532.783 166.22 512.11 202.793 482.268 195.936C477.518 194.599 472.757 191.895 468.119 190.104C460.595 186.796 453.296 188.059 448.523 194.933C441.709 203.972 443.962 217.636 453.184 224.517C463.979 232.899 478.826 231.88 490.993 227.721C531.085 214.518 537.461 168.763 553.184 134.82C560.347 119.256 572.632 106.988 581.014 92.2079C583.818 87.1159 586.42 80.6893 583.912 75.4454V75.4217ZM242.224 157.392C239.42 144.506 258.969 111.203 272.645 111.873L272.746 111.887C277.909 112.77 278.128 119.666 277.028 123.628C275.845 131.405 250.901 176.114 242.224 157.392ZM326.969 154.689C324.354 156.394 320.243 156.725 317.723 154.545L317.647 154.473C314.24 150.674 316.848 144.1 318.634 138.949C322.84 128.504 331.624 113.276 341.484 108.129C343.395 107.299 345.672 107.096 347.736 107.505C356.798 109.491 349.747 124.099 346.695 130.032C342.709 137.216 333.398 150.636 326.963 154.695L326.969 154.689ZM541.466 118.826C536.207 128.667 527.151 142.819 517.149 144.686C514.109 145.112 510.607 143.589 509.738 140.403C507.567 131.77 513.523 118.924 518.125 111.739C523.342 104.258 529.725 94.803 537.668 93.1078L537.781 93.092C552.042 91.4715 545.157 111.335 541.46 118.82L541.466 118.826Z" fill="black"/>
<path d="M144.04 53.9596C142.36 53.1257 140.58 52.2664 138.906 51.4326C137.593 50.7767 136.901 50.3564 137.096 50.2001L137.114 50.1826C137.776 49.999 139.296 50.1261 140.136 50.1822C144.3 50.3554 148.908 50.1637 152.268 48.0571C158.603 43.6953 156.349 37.6985 148.991 36.8188C140.704 35.8104 133.233 40.3181 127.076 45.2392C125.893 46.0054 124.639 46.3147 123.267 46.1902C86.3449 39.5647 26.6503 67.9842 43.378 111.681C52.1559 133.54 84.7419 126.69 80.1045 102.745C79.0339 97.372 74.8579 93.9447 73.4146 89.2755C68.4341 72.405 98.3524 56.546 110.94 58.1087C112.685 58.6065 112.04 60.0209 111.229 61.3142C103.428 71.9569 98.9203 84.3253 93.2951 96.1064C81.9973 118.437 64.3054 154.085 45.5134 165.027C39.7758 168.063 33.0504 168.708 27.1353 171.137C18.523 174.246 13.6431 184.514 15.6247 193.174C18.4284 207.197 34.5232 213.24 46.9566 209.268C50.3992 208.222 53.611 206.527 56.61 204.367C68.8541 195.269 76.4254 180.765 82.4173 167.582C87.6225 156.456 91.4082 144.158 95.1051 132.503C96.087 131.396 97.4711 136.153 98.5121 137.361C98.9794 138.085 99.5058 138.75 100.086 139.382C109.082 149.229 123.409 149.231 134.629 144.167C169.534 128.898 182.784 72.7445 144.058 53.9481L144.04 53.9596ZM107.799 124.851C105.575 123.925 103.398 122.656 101.937 120.862C99.4822 117.808 100.369 114.741 101.221 111.194C103.215 103.603 106.172 95.6804 108.769 88.2184C110.94 82.2812 118.546 62.1282 123.793 59.9658C127.732 59.1117 135.233 64.1114 137.871 66.9675L137.954 67.0518C156.438 86.0097 137.037 135.454 107.805 124.845L107.799 124.851Z" fill="black"/>
<path d="M417.711 77.9811C423.538 78.142 429.612 71.6517 431.274 63.4872C432.937 55.3226 429.559 48.5727 423.727 48.4117C417.901 48.2509 411.826 54.7411 410.164 62.9057C408.502 71.0702 411.879 77.8201 417.711 77.9811Z" fill="black"/>
<path d="M219.961 60.4045C216.652 65.4197 209.483 71.4256 208.317 76.6974C207.785 80.6673 211.178 83.077 214.841 81.7069C220.592 79.4664 222.178 70.593 224.73 65.2647C227.887 59.332 233.366 51.3172 238.783 48.8452C239.935 48.4308 241.454 48.2745 241.893 49.6616C243.382 56.7154 229.259 64.2302 227.662 73.3835C226.971 76.1944 227.688 80.1956 231.104 80.6802C236.96 81.3404 241.568 74.6258 245.43 71.2126C246.081 70.5995 246.515 70.7519 246.748 71.86C247.975 80.1414 255.089 81.3221 261.874 77.2714C267.597 73.8052 277.432 63.1812 278.71 56.8097C278.971 54.9718 278.572 52.8993 276.286 53.1182C273.788 53.2574 271.507 56.2447 271.118 58.5576C270.812 60.5751 271.474 62.5691 270.325 64.4437C267.835 68.8804 260.67 71.3053 256.516 68.0275C255.284 67.0967 255.127 65.9947 256.53 65.1716C263.681 60.7806 273.931 51.4911 276.549 43.7232C276.95 41.9922 276.96 39.8295 276.167 38.1798C274.261 34.7537 270.076 35.6114 266.591 37.1437C257.936 41.4348 250.102 54.6056 247.182 63.8047C246.919 64.6785 246.935 65.7805 246.138 66.3672C244.521 67.284 241.497 67.4971 240.106 66.7297C239.351 66.3081 239.092 65.3231 239.142 64.4597C239.329 60.8969 243.246 58.0639 245.29 55.4998C247.614 52.6225 250.527 48.5279 251.123 45.1906C251.617 42.7419 249.618 40.6509 247.175 40.6985C241.312 40.665 236.334 46.8152 232.053 50.4182C230.923 51.2793 228.763 52.9273 227.735 53.7071C227.669 53.763 227.123 54.1665 227.251 53.986L227.256 53.9765C229.003 51.8417 230.886 49.5241 232.884 47.5979C238.04 42.3554 248.253 36.4295 247.752 28.3697C247.626 27.2872 247.042 26.268 246.18 25.8161C235.536 21.8671 225.378 52.7638 219.959 60.4068L219.961 60.4045ZM261.347 47.8407C262.8 46.7264 265.845 44.7662 267.514 45.9801C270.648 50.3844 261.456 57.812 258.107 60.2061C257.088 60.9172 255.362 62.0813 254.351 62.5338C254.069 62.6547 253.706 62.7837 253.497 62.4999L253.482 62.4782C252.341 56.8266 257.297 51.2292 261.349 47.8383L261.347 47.8407Z" fill="black"/>
<path d="M194.534 81.6208C198.485 80.7757 201.082 78.7459 203.698 75.4866C209.478 68.282 214.078 56.5909 217.732 49.7409C220.728 44.2541 224.224 38.6122 227.826 33.4874C228.711 32.2611 229.556 30.9771 230.496 29.7851C230.921 29.2654 231.299 28.9087 231.883 28.653C232.903 28.2268 234.275 27.9493 235.462 27.5094C238.268 26.4543 241.29 23.8195 242.036 21.0309C242.271 19.9784 242.064 18.9302 241.525 17.9046C240.842 16.6201 239.712 15.6222 238.294 15.3315C232.599 14.2112 228.896 20.3931 226.363 24.9312C226.147 25.3192 225.874 25.7489 225.523 25.9707C224.801 26.4472 223.84 26.1313 222.848 25.9026C215.909 24.1101 208.835 20.6104 201.58 22.6871C195.268 24.3647 188.654 29.1758 188.139 36.0355C187.88 39.5068 189.73 42.8796 193.49 43.1756C199.812 43.775 202.432 36.8619 207.014 33.8601C210.259 31.5615 214.145 30.4944 218.1 30.1504C219.189 30.053 220.298 30.0012 221.414 29.9874C221.832 29.9994 222.418 29.9456 222.696 30.2899L222.708 30.3115C222.893 30.6139 222.541 31.2251 222.328 31.5775C218.37 38.2014 214.273 44.7777 209.665 50.97C206.525 54.7329 202.473 61.9345 197.388 62.3918C194.674 62.5534 192.077 61.2141 189.45 62.4384C185.739 64.0546 183.052 68.1436 182.936 71.5059C182.409 77.9855 188.082 83.1369 194.53 81.6231L194.534 81.6208Z" fill="black"/>
</svg>
`,Tf=`<svg width="318" height="63" viewBox="0 0 318 63" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_16_32)">
<path d="M25.5859 44.5859C24.3047 44.5859 23.4219 44.2656 22.9375 43.625C22.4688 42.9844 22.2344 42.2031 22.2344 41.2812C22.2344 40.5156 22.3438 39.7344 22.5625 38.9375C22.7969 38.125 23.0703 37.3828 23.3828 36.7109C23.9297 35.4922 24.4844 34.2812 25.0469 33.0781C25.6094 31.875 26.125 30.7734 26.5938 29.7734L33.6953 14.6562C34.0547 13.875 34.5938 13.3672 35.3125 13.1328C36.0312 12.8984 36.6875 12.9219 37.2812 13.2031C37.8906 13.4688 38.1953 13.9609 38.1953 14.6797C38.1953 14.9609 38.125 15.2578 37.9844 15.5703C37.8594 15.8828 37.6953 16.2188 37.4922 16.5781C36.9297 17.6406 36.2109 19.0391 35.3359 20.7734C34.4766 22.5078 33.5234 24.4609 32.4766 26.6328C31.3359 29.0234 30.375 31.0312 29.5938 32.6562C28.8281 34.2656 28.1094 35.7891 27.4375 37.2266C27.2656 37.5859 27.0938 38.0078 26.9219 38.4922C26.7656 38.9609 26.6875 39.3828 26.6875 39.7578C26.6875 40.2734 26.9141 40.5312 27.3672 40.5312C27.8672 40.5312 28.5312 40.3281 29.3594 39.9219C30.2031 39.5 31.0781 38.9766 31.9844 38.3516C32.9062 37.7422 33.7969 37.1094 34.6562 36.4531C35.5156 35.7812 36.3125 35.1328 37.0469 34.5078C37.2969 34.3047 37.5938 34.2031 37.9375 34.2031C38.6562 34.2031 39.0156 34.6016 39.0156 35.3984C39.0156 35.7266 38.9062 36.0938 38.6875 36.5C38.4688 36.9062 38.0859 37.3047 37.5391 37.6953C36.5391 38.6172 35.5312 39.4922 34.5156 40.3203C33.5156 41.1328 32.5078 41.8594 31.4922 42.5C30.4922 43.125 29.4922 43.625 28.4922 44C27.4922 44.3906 26.5234 44.5859 25.5859 44.5859ZM44.2188 25.3906C43.25 25.3906 42.5703 25.2422 42.1797 24.9453C41.7891 24.6328 41.5703 24.2266 41.5234 23.7266C41.5234 22.9922 41.7891 22.2734 42.3203 21.5703C42.8672 20.8516 43.6719 20.4922 44.7344 20.4922C45.6406 20.4922 46.2734 20.6719 46.6328 21.0312C46.9922 21.375 47.1719 21.8125 47.1719 22.3438C47.1719 22.9375 46.9375 23.5938 46.4688 24.3125C46.0156 25.0312 45.2656 25.3906 44.2188 25.3906ZM38.4766 44.5859C37.2109 44.5859 36.2109 44.2656 35.4766 43.625C34.7578 42.9688 34.3984 41.9531 34.3984 40.5781C34.3984 39.625 34.5703 38.6797 34.9141 37.7422C35.2734 36.7891 35.6641 35.8984 36.0859 35.0703C36.5234 34.2266 36.8672 33.4922 37.1172 32.8672C37.1953 32.6641 37.3281 32.3516 37.5156 31.9297C37.7188 31.5078 37.9297 31.0781 38.1484 30.6406L38.9453 29C39.2109 28.5625 39.5156 28.25 39.8594 28.0625C40.2031 27.875 40.5547 27.7812 40.9141 27.7812C41.5078 27.7812 42.0156 27.9766 42.4375 28.3672C42.875 28.7422 43.0938 29.2266 43.0938 29.8203C43.0781 29.9609 43.0547 30.1016 43.0234 30.2422C43.0078 30.3828 42.9609 30.5234 42.8828 30.6641C42.5391 31.2891 42.2422 31.875 41.9922 32.4219C41.7422 32.9531 41.4844 33.4922 41.2188 34.0391C41 34.4922 40.7266 35.0469 40.3984 35.7031C40.0703 36.3594 39.7812 37.0234 39.5312 37.6953C39.2812 38.3516 39.1562 38.9375 39.1562 39.4531C39.1562 39.875 39.2578 40.1562 39.4609 40.2969C39.6797 40.4219 39.9844 40.4844 40.375 40.4844C41 40.4844 41.6875 40.2891 42.4375 39.8984C43.2031 39.5078 43.9297 39.0234 44.6172 38.4453C45.3359 37.8672 46 37.2812 46.6094 36.6875C47.2188 36.0781 47.6719 35.5859 47.9688 35.2109C48.2656 34.9141 48.5781 34.7656 48.9062 34.7656C49.1875 34.7656 49.4141 34.8906 49.5859 35.1406C49.7734 35.3906 49.8672 35.7109 49.8672 36.1016C49.8672 36.4609 49.7734 36.8438 49.5859 37.25C49.4141 37.6562 49.125 38.0391 48.7188 38.3984C47.6875 39.4453 46.6094 40.4453 45.4844 41.3984C44.3594 42.3359 43.2031 43.1016 42.0156 43.6953C40.8438 44.2891 39.6641 44.5859 38.4766 44.5859ZM43 51.1016C42.625 51.1016 42.2891 51.0078 41.9922 50.8203C41.6953 50.6328 41.5469 50.3359 41.5469 49.9297C41.5469 49.5703 41.7266 49.0156 42.0859 48.2656L50.3594 30.7344H49.1172C48.2578 30.7344 47.6719 30.6016 47.3594 30.3359C47.0469 30.0703 46.8906 29.7578 46.8906 29.3984C46.8906 29.0234 47.0859 28.6641 47.4766 28.3203C47.8672 27.9609 48.4375 27.7812 49.1875 27.7812H51.9531C53.4375 24.7812 54.9141 22.4766 56.3828 20.8672C57.8672 19.2422 59.3125 18.1172 60.7188 17.4922C62.125 16.8672 63.4453 16.5547 64.6797 16.5547C65.5547 16.5547 66.3281 16.9062 67 17.6094C67.6719 18.2969 68.0078 19.3359 68.0078 20.7266C68.0078 21.3828 67.9141 22.125 67.7266 22.9531C67.6328 23.375 67.3828 23.6797 66.9766 23.8672C66.5859 24.0391 66.2656 24.125 66.0156 24.125C65.7031 24.125 65.4141 24.0547 65.1484 23.9141C64.8828 23.7578 64.75 23.5234 64.75 23.2109C64.75 23.0547 64.7656 22.8672 64.7969 22.6484C64.8125 22.5391 64.8203 22.3672 64.8203 22.1328C64.8203 20.9141 64.375 20.3047 63.4844 20.3047C62.8594 20.3047 62.0938 20.6641 61.1875 21.3828C60.2812 22.0859 59.3906 23.0078 58.5156 24.1484C57.6406 25.2891 56.9375 26.5 56.4062 27.7812H61.8672C62.8828 27.7812 63.7188 27.8359 64.375 27.9453C65.0312 28.0547 65.3594 28.4453 65.3594 29.1172C65.3594 29.5078 65.2109 29.8516 64.9141 30.1484C64.6172 30.4453 64.0781 30.625 63.2969 30.6875C61.8281 30.75 60.3984 30.7891 59.0078 30.8047C57.6172 30.8047 56.2109 30.8047 54.7891 30.8047C54.4453 31.4922 54.0078 32.3828 53.4766 33.4766C52.9453 34.5547 52.3906 35.7031 51.8125 36.9219C51.2344 38.1406 50.6875 39.2969 50.1719 40.3906C49.2656 42.2969 48.4688 43.9609 47.7812 45.3828C47.1094 46.8203 46.5938 47.9062 46.2344 48.6406C45.8906 49.3594 45.4062 49.9453 44.7812 50.3984C44.1719 50.8672 43.5781 51.1016 43 51.1016ZM63.1094 44.5859C61.8594 44.5859 60.7891 44.2812 59.8984 43.6719C59.0234 43.0469 58.3516 42.2344 57.8828 41.2344C57.4297 40.2188 57.2031 39.1328 57.2031 37.9766C57.2031 36.9609 57.4922 35.8281 58.0703 34.5781C58.6641 33.3125 59.5078 32.1016 60.6016 30.9453C61.6953 29.7891 63 28.8359 64.5156 28.0859C66.0469 27.3203 67.7109 26.9375 69.5078 26.9375C70.8047 26.9375 71.7734 27.25 72.4141 27.875C73.0547 28.5 73.375 29.3672 73.375 30.4766C73.375 31.1328 73.2031 31.8203 72.8594 32.5391C72.5156 33.2578 71.9219 33.9844 71.0781 34.7188C70.2344 35.4688 69.1016 36.2344 67.6797 37.0156C66.2734 37.7812 64.5078 38.5547 62.3828 39.3359C62.5547 40.3047 63.3359 40.7891 64.7266 40.7891C65.8047 40.7891 66.9688 40.5703 68.2188 40.1328C69.4688 39.6797 70.6719 39.1641 71.8281 38.5859C72.9844 38.0234 73.9766 37.4922 74.8047 36.9922C75.6328 36.4922 76.125 36.2109 76.2812 36.1484C76.4219 36.0547 76.5469 36 76.6562 35.9844C76.7812 35.9688 76.8906 35.9609 76.9844 35.9609C77.3594 35.9609 77.6172 36.1094 77.7578 36.4062C77.9141 36.6875 77.9922 36.9219 77.9922 37.1094C77.9922 37.25 77.9766 37.4219 77.9453 37.625C77.9141 37.8125 77.7969 38.0312 77.5938 38.2812C77.3906 38.4844 76.7969 38.9297 75.8125 39.6172C74.8281 40.3047 73.7734 40.9688 72.6484 41.6094C71.2734 42.375 69.7422 43.0625 68.0547 43.6719C66.3672 44.2812 64.7188 44.5859 63.1094 44.5859ZM62.0312 36.6406C63.0469 36.1094 64.0781 35.4922 65.125 34.7891C66.1875 34.0703 66.9922 33.5469 67.5391 33.2188C68.2734 32.75 68.7578 32.3359 68.9922 31.9766C69.2578 31.5859 69.3906 31.2578 69.3906 30.9922C69.3906 30.7578 69.3125 30.5703 69.1562 30.4297C69.0156 30.2891 68.8516 30.2031 68.6641 30.1719L68.4531 30.1484H68.2422C67.3828 30.1484 66.5859 30.3984 65.8516 30.8984C65.1328 31.3828 64.5234 31.9922 64.0234 32.7266C63.4922 33.4922 63.0625 34.2109 62.7344 34.8828C62.4219 35.5547 62.1875 36.1406 62.0312 36.6406ZM90.3906 44.5859C89.8594 44.5859 89.2266 44.4375 88.4922 44.1406C87.7578 43.8438 87.1094 43.3516 86.5469 42.6641C86 41.9766 85.7266 41.0547 85.7266 39.8984C85.7266 38.9297 85.9453 37.7188 86.3828 36.2656C86.8203 34.8125 87.5078 33.3828 88.4453 31.9766C89.3828 30.5391 90.5781 29.3438 92.0312 28.3906C93.5 27.4375 95.1953 26.9609 97.1172 26.9609C97.8047 26.9609 98.4062 27.0469 98.9219 27.2188C99.4375 27.3906 99.875 27.5781 100.234 27.7812C100.438 27.9062 100.625 28.0391 100.797 28.1797C100.984 28.3047 101.156 28.4453 101.312 28.6016L102.133 28.2031C102.367 28.0938 102.609 28 102.859 27.9219C103.125 27.8281 103.352 27.7812 103.539 27.7812C104.133 27.7812 104.617 27.9453 104.992 28.2734C105.367 28.6016 105.555 28.9609 105.555 29.3516C105.555 29.4766 105.547 29.5625 105.531 29.6094C105.422 30.0469 105.219 30.6484 104.922 31.4141C104.641 32.1797 104.336 33.0312 104.008 33.9688C103.68 34.875 103.398 35.75 103.164 36.5938C102.945 37.4375 102.836 38.1328 102.836 38.6797C102.836 39.1484 102.914 39.5391 103.07 39.8516C103.227 40.1484 103.492 40.2969 103.867 40.2969C104.32 40.2969 104.93 40.0391 105.695 39.5234C106.461 38.9922 107.25 38.3672 108.062 37.6484C108.5 37.2578 108.953 36.8438 109.422 36.4062C109.891 35.9531 110.367 35.4766 110.852 34.9766C111.102 34.7734 111.344 34.6719 111.578 34.6719C111.891 34.6719 112.148 34.8281 112.352 35.1406C112.57 35.4375 112.68 35.7734 112.68 36.1484C112.68 36.5859 112.531 36.9531 112.234 37.25C111.609 37.8281 110.969 38.4453 110.312 39.1016C109.656 39.7578 108.75 40.5625 107.594 41.5156C106.562 42.3594 105.5 43.0859 104.406 43.6953C103.312 44.2891 102.328 44.5859 101.453 44.5859C100.359 44.5859 99.5625 44.1641 99.0625 43.3203C98.5625 42.4609 98.3125 41.5469 98.3125 40.5781C98.3125 39.875 98.4141 39.25 98.6172 38.7031C97.9766 39.5625 97.2188 40.4531 96.3438 41.375C95.4688 42.2812 94.5234 43.0469 93.5078 43.6719C92.4922 44.2812 91.4531 44.5859 90.3906 44.5859ZM92.2656 40.4609C92.7656 40.4609 93.3906 40.1406 94.1406 39.5C94.9062 38.8594 95.6406 38.1094 96.3438 37.25C97.125 36.3125 97.7422 35.4609 98.1953 34.6953C98.6484 33.9297 98.875 33.4141 98.875 33.1484C98.875 32.5547 98.5312 32.0859 97.8438 31.7422C97.1562 31.3828 96.5391 31.2031 95.9922 31.2031C95.0234 31.2031 94.1016 31.5156 93.2266 32.1406C92.3672 32.7656 91.6641 33.5703 91.1172 34.5547C90.5703 35.5234 90.2969 36.5312 90.2969 37.5781C90.2969 38.1875 90.4062 38.8203 90.625 39.4766C90.8594 40.1328 91.4062 40.4609 92.2656 40.4609ZM105.672 51.1016C105.297 51.1016 104.961 51.0078 104.664 50.8203C104.367 50.6328 104.219 50.3359 104.219 49.9297C104.219 49.5703 104.398 49.0156 104.758 48.2656L113.031 30.7344H111.789C110.93 30.7344 110.344 30.6016 110.031 30.3359C109.719 30.0703 109.562 29.7578 109.562 29.3984C109.562 29.0234 109.758 28.6641 110.148 28.3203C110.539 27.9609 111.109 27.7812 111.859 27.7812H114.625C116.109 24.7812 117.586 22.4766 119.055 20.8672C120.539 19.2422 121.984 18.1172 123.391 17.4922C124.797 16.8672 126.117 16.5547 127.352 16.5547C128.227 16.5547 129 16.9062 129.672 17.6094C130.344 18.2969 130.68 19.3359 130.68 20.7266C130.68 21.3828 130.586 22.125 130.398 22.9531C130.305 23.375 130.055 23.6797 129.648 23.8672C129.258 24.0391 128.938 24.125 128.688 24.125C128.375 24.125 128.086 24.0547 127.82 23.9141C127.555 23.7578 127.422 23.5234 127.422 23.2109C127.422 23.0547 127.438 22.8672 127.469 22.6484C127.484 22.5391 127.492 22.3672 127.492 22.1328C127.492 20.9141 127.047 20.3047 126.156 20.3047C125.531 20.3047 124.766 20.6641 123.859 21.3828C122.953 22.0859 122.062 23.0078 121.188 24.1484C120.312 25.2891 119.609 26.5 119.078 27.7812H124.539C125.555 27.7812 126.391 27.8359 127.047 27.9453C127.703 28.0547 128.031 28.4453 128.031 29.1172C128.031 29.5078 127.883 29.8516 127.586 30.1484C127.289 30.4453 126.75 30.625 125.969 30.6875C124.5 30.75 123.07 30.7891 121.68 30.8047C120.289 30.8047 118.883 30.8047 117.461 30.8047C117.117 31.4922 116.68 32.3828 116.148 33.4766C115.617 34.5547 115.062 35.7031 114.484 36.9219C113.906 38.1406 113.359 39.2969 112.844 40.3906C111.938 42.2969 111.141 43.9609 110.453 45.3828C109.781 46.8203 109.266 47.9062 108.906 48.6406C108.562 49.3594 108.078 49.9453 107.453 50.3984C106.844 50.8672 106.25 51.1016 105.672 51.1016ZM123.531 44.5859C122.297 44.5859 121.438 44.2812 120.953 43.6719C120.469 43.0625 120.227 42.3125 120.227 41.4219C120.227 40.6406 120.359 39.8281 120.625 38.9844C120.891 38.1406 121.188 37.3828 121.516 36.7109L124.258 31.0859H123.25C122.375 31.0859 121.773 30.9453 121.445 30.6641C121.117 30.3828 120.953 30.0625 120.953 29.7031C120.953 29.3438 121.156 28.9375 121.562 28.4844C121.969 28.0156 122.523 27.7812 123.227 27.7812H125.758L130.703 17.9609C131.016 17.3672 131.398 16.9453 131.852 16.6953C132.32 16.4297 132.805 16.2969 133.305 16.2969C133.773 16.2969 134.203 16.4219 134.594 16.6719C134.984 16.9219 135.18 17.3359 135.18 17.9141C135.18 18.2109 135.109 18.5156 134.969 18.8281C134.844 19.125 134.672 19.4766 134.453 19.8828C134.203 20.3516 133.867 20.9844 133.445 21.7812C133.023 22.5625 132.5 23.5078 131.875 24.6172L130.188 27.7812H137.828C138.578 27.7812 139.188 27.8828 139.656 28.0859C140.141 28.2734 140.383 28.7031 140.383 29.375C140.383 29.7188 140.258 30.0547 140.008 30.3828C139.758 30.7109 139.219 30.9062 138.391 30.9688H128.641L127 34.25L125.547 37.2266C125.359 37.6016 125.172 38.0391 124.984 38.5391C124.812 39.0234 124.727 39.4531 124.727 39.8281C124.727 40.2969 124.945 40.5312 125.383 40.5312C125.883 40.5312 126.555 40.3203 127.398 39.8984C128.242 39.4766 129.133 38.9609 130.07 38.3516C131.023 37.7422 131.938 37.1094 132.812 36.4531C133.688 35.7812 134.492 35.1328 135.227 34.5078C135.492 34.3359 135.727 34.25 135.93 34.25C136.273 34.25 136.531 34.4375 136.703 34.8125C136.875 35.1875 136.891 35.6406 136.75 36.1719C136.625 36.7031 136.258 37.2109 135.648 37.6953C134.633 38.6172 133.602 39.4922 132.555 40.3203C131.523 41.1328 130.5 41.8594 129.484 42.5C128.453 43.125 127.438 43.625 126.438 44C125.438 44.3906 124.469 44.5859 123.531 44.5859ZM138.156 44.5859C136.906 44.5859 135.836 44.2812 134.945 43.6719C134.07 43.0469 133.398 42.2344 132.93 41.2344C132.477 40.2188 132.25 39.1328 132.25 37.9766C132.25 36.9609 132.539 35.8281 133.117 34.5781C133.711 33.3125 134.555 32.1016 135.648 30.9453C136.742 29.7891 138.047 28.8359 139.562 28.0859C141.094 27.3203 142.758 26.9375 144.555 26.9375C145.852 26.9375 146.82 27.25 147.461 27.875C148.102 28.5 148.422 29.3672 148.422 30.4766C148.422 31.1328 148.25 31.8203 147.906 32.5391C147.562 33.2578 146.969 33.9844 146.125 34.7188C145.281 35.4688 144.148 36.2344 142.727 37.0156C141.32 37.7812 139.555 38.5547 137.43 39.3359C137.602 40.3047 138.383 40.7891 139.773 40.7891C140.852 40.7891 142.016 40.5703 143.266 40.1328C144.516 39.6797 145.719 39.1641 146.875 38.5859C148.031 38.0234 149.023 37.4922 149.852 36.9922C150.68 36.4922 151.172 36.2109 151.328 36.1484C151.469 36.0547 151.594 36 151.703 35.9844C151.828 35.9688 151.938 35.9609 152.031 35.9609C152.406 35.9609 152.664 36.1094 152.805 36.4062C152.961 36.6875 153.039 36.9219 153.039 37.1094C153.039 37.25 153.023 37.4219 152.992 37.625C152.961 37.8125 152.844 38.0312 152.641 38.2812C152.438 38.4844 151.844 38.9297 150.859 39.6172C149.875 40.3047 148.82 40.9688 147.695 41.6094C146.32 42.375 144.789 43.0625 143.102 43.6719C141.414 44.2812 139.766 44.5859 138.156 44.5859ZM137.078 36.6406C138.094 36.1094 139.125 35.4922 140.172 34.7891C141.234 34.0703 142.039 33.5469 142.586 33.2188C143.32 32.75 143.805 32.3359 144.039 31.9766C144.305 31.5859 144.438 31.2578 144.438 30.9922C144.438 30.7578 144.359 30.5703 144.203 30.4297C144.062 30.2891 143.898 30.2031 143.711 30.1719L143.5 30.1484H143.289C142.43 30.1484 141.633 30.3984 140.898 30.8984C140.18 31.3828 139.57 31.9922 139.07 32.7266C138.539 33.4922 138.109 34.2109 137.781 34.8828C137.469 35.5547 137.234 36.1406 137.078 36.6406ZM149.242 44.5859C148.461 44.5859 148.07 44.1875 148.07 43.3906C148.07 43.2188 148.094 43.0078 148.141 42.7578C148.203 42.4922 148.32 42.2031 148.492 41.8906C148.758 41.3906 149.047 40.8047 149.359 40.1328C149.672 39.4453 150 38.7344 150.344 38C150.719 37.2031 151.148 36.2891 151.633 35.2578C152.133 34.2109 152.719 33.0078 153.391 31.6484C153.172 31.4609 152.984 31.2344 152.828 30.9688C152.688 30.6875 152.617 30.3438 152.617 29.9375C152.617 29.2031 152.898 28.6641 153.461 28.3203C154.039 27.9609 154.727 27.7812 155.523 27.7812C156.305 27.7812 157.062 27.9219 157.797 28.2031C158.547 28.4688 158.922 28.875 158.922 29.4219C158.922 29.4844 158.867 29.6328 158.758 29.8672C158.664 30.0859 158.617 30.2344 158.617 30.3125C158.617 30.3438 158.625 30.3594 158.641 30.3594H158.664L158.711 30.3359C159.867 29.6172 161.109 29.0078 162.438 28.5078C163.766 28.0078 164.859 27.7578 165.719 27.7578C166.422 27.7578 166.961 27.9297 167.336 28.2734C167.727 28.6016 167.922 29.1641 167.922 29.9609C167.922 30.1328 167.914 30.3203 167.898 30.5234C167.883 30.7109 167.852 30.9141 167.805 31.1328C167.695 31.7109 167.258 32.4609 166.492 33.3828C165.727 34.3047 164.914 35.1953 164.055 36.0547C163.664 36.4453 163.195 36.9141 162.648 37.4609C162.102 37.9922 161.625 38.4844 161.219 38.9375C160.812 39.375 160.609 39.6719 160.609 39.8281C160.609 40.0469 160.688 40.1562 160.844 40.1562C161.969 39.6719 163.242 39.0781 164.664 38.375C166.086 37.6562 167.461 36.9375 168.789 36.2188C170.117 35.5 171.203 34.8984 172.047 34.4141C172.375 34.2266 172.656 34.1328 172.891 34.1328C173.547 34.1328 173.875 34.4766 173.875 35.1641C173.875 35.5234 173.719 35.9375 173.406 36.4062C173.109 36.8594 172.602 37.3359 171.883 37.8359C171.211 38.2578 170.289 38.8438 169.117 39.5938C167.961 40.3281 166.812 41.0234 165.672 41.6797C164.547 42.3203 163.469 42.8672 162.438 43.3203C161.422 43.7734 160.57 44 159.883 44C158.805 44 157.992 43.7422 157.445 43.2266C156.914 42.7109 156.648 42.0469 156.648 41.2344C156.648 41.0938 156.656 41 156.672 40.9531C156.844 39.9531 157.203 38.9844 157.75 38.0469C158.297 37.1094 158.867 36.25 159.461 35.4688C160.055 34.7031 160.578 33.9922 161.031 33.3359C161.5 32.6797 161.734 32.1172 161.734 31.6484C161.734 31.4141 161.648 31.2969 161.477 31.2969C161.227 31.2969 160.773 31.4219 160.117 31.6719C159.461 31.9062 158.812 32.2188 158.172 32.6094C157.531 33 157.094 33.4141 156.859 33.8516C156.547 34.3984 156.148 35.1641 155.664 36.1484C155.195 37.1172 154.727 38.1094 154.258 39.125C153.805 40.1406 153.422 40.9844 153.109 41.6562C152.766 42.5156 152.195 43.2188 151.398 43.7656C150.617 44.3125 149.898 44.5859 149.242 44.5859ZM184.328 44.5859C183.188 44.5859 182.242 44.2656 181.492 43.625C180.742 42.9688 180.367 41.8828 180.367 40.3672C180.367 38.4453 180.797 36.6484 181.656 34.9766C182.516 33.3047 183.602 31.875 184.914 30.6875C186.211 29.5 187.578 28.5859 189.016 27.9453C190.469 27.2891 191.766 26.9609 192.906 26.9609C193.828 26.9609 194.594 27.1094 195.203 27.4062C195.547 27.5938 195.836 27.8047 196.07 28.0391L196.258 27.6406L196.68 26.6562L196.938 26.0703C196.969 25.9453 197.172 25.4453 197.547 24.5703C197.922 23.6953 198.422 22.5156 199.047 21.0312C199.625 19.6562 200.102 18.4922 200.477 17.5391C200.852 16.5703 201.047 16.0547 201.062 15.9922C201.281 15.2109 201.648 14.5156 202.164 13.9062C202.68 13.2969 203.375 12.9922 204.25 12.9922C204.844 12.9922 205.336 13.125 205.727 13.3906C206.117 13.6406 206.312 14.1328 206.312 14.8672C206.312 15.4297 206.188 16.0312 205.938 16.6719C205.688 17.3125 205.469 17.8828 205.281 18.3828C204.531 19.8828 203.719 21.5469 202.844 23.375C201.984 25.2031 201.125 27.0781 200.266 29C199.406 30.9219 198.594 32.7734 197.828 34.5547C197.062 36.3203 196.398 37.8828 195.836 39.2422C195.82 39.2578 195.812 39.2969 195.812 39.3594C195.812 39.4219 195.805 39.4609 195.789 39.4766C195.789 39.7578 195.859 40.0547 196 40.3672C196.141 40.6641 196.367 40.8125 196.68 40.8125C196.773 40.8125 196.867 40.7969 196.961 40.7656C198.117 40.4219 199.305 39.8203 200.523 38.9609C201.742 38.1016 202.867 37.1797 203.898 36.1953C204.945 35.1953 205.781 34.3203 206.406 33.5703C206.625 33.3047 206.867 33.1719 207.133 33.1719C207.367 33.1719 207.57 33.2812 207.742 33.5C207.93 33.7188 208.023 34.0156 208.023 34.3906C208.023 34.6875 207.938 35.0391 207.766 35.4453C207.609 35.8516 207.344 36.2891 206.969 36.7578C205.75 38.1016 204.484 39.375 203.172 40.5781C201.859 41.7656 200.547 42.7344 199.234 43.4844C197.922 44.2188 196.641 44.5859 195.391 44.5859C194.25 44.5859 193.352 44.2656 192.695 43.625C192.039 42.9688 191.711 41.9922 191.711 40.6953V40.4375C191.711 40.3281 191.719 40.25 191.734 40.2031C191.016 41.5 189.938 42.5547 188.5 43.3672C187.078 44.1797 185.688 44.5859 184.328 44.5859ZM186.062 40.4375C187.016 40.4375 187.922 40.1484 188.781 39.5703C189.641 38.9922 190.43 38.25 191.148 37.3438C191.867 36.4375 192.492 35.4922 193.023 34.5078C193.57 33.5234 194.016 32.625 194.359 31.8125L194.688 31.0859L195.133 30.0781C194.211 30.0938 193.227 30.2969 192.18 30.6875C190.383 31.2969 188.812 32.375 187.469 33.9219C186.141 35.4531 185.406 37.3125 185.266 39.5C185.266 40.125 185.531 40.4375 186.062 40.4375ZM208.375 44.5859C207.125 44.5859 206.055 44.2812 205.164 43.6719C204.289 43.0469 203.617 42.2344 203.148 41.2344C202.695 40.2188 202.469 39.1328 202.469 37.9766C202.469 36.9609 202.758 35.8281 203.336 34.5781C203.93 33.3125 204.773 32.1016 205.867 30.9453C206.961 29.7891 208.266 28.8359 209.781 28.0859C211.312 27.3203 212.977 26.9375 214.773 26.9375C216.07 26.9375 217.039 27.25 217.68 27.875C218.32 28.5 218.641 29.3672 218.641 30.4766C218.641 31.1328 218.469 31.8203 218.125 32.5391C217.781 33.2578 217.188 33.9844 216.344 34.7188C215.5 35.4688 214.367 36.2344 212.945 37.0156C211.539 37.7812 209.773 38.5547 207.648 39.3359C207.82 40.3047 208.602 40.7891 209.992 40.7891C211.07 40.7891 212.234 40.5703 213.484 40.1328C214.734 39.6797 215.938 39.1641 217.094 38.5859C218.25 38.0234 219.242 37.4922 220.07 36.9922C220.898 36.4922 221.391 36.2109 221.547 36.1484C221.688 36.0547 221.812 36 221.922 35.9844C222.047 35.9688 222.156 35.9609 222.25 35.9609C222.625 35.9609 222.883 36.1094 223.023 36.4062C223.18 36.6875 223.258 36.9219 223.258 37.1094C223.258 37.25 223.242 37.4219 223.211 37.625C223.18 37.8125 223.062 38.0312 222.859 38.2812C222.656 38.4844 222.062 38.9297 221.078 39.6172C220.094 40.3047 219.039 40.9688 217.914 41.6094C216.539 42.375 215.008 43.0625 213.32 43.6719C211.633 44.2812 209.984 44.5859 208.375 44.5859ZM207.297 36.6406C208.312 36.1094 209.344 35.4922 210.391 34.7891C211.453 34.0703 212.258 33.5469 212.805 33.2188C213.539 32.75 214.023 32.3359 214.258 31.9766C214.523 31.5859 214.656 31.2578 214.656 30.9922C214.656 30.7578 214.578 30.5703 214.422 30.4297C214.281 30.2891 214.117 30.2031 213.93 30.1719L213.719 30.1484H213.508C212.648 30.1484 211.852 30.3984 211.117 30.8984C210.398 31.3828 209.789 31.9922 209.289 32.7266C208.758 33.4922 208.328 34.2109 208 34.8828C207.688 35.5547 207.453 36.1406 207.297 36.6406ZM224.406 44.5859C223.875 44.5859 223.242 44.4375 222.508 44.1406C221.773 43.8438 221.125 43.3516 220.562 42.6641C220.016 41.9766 219.742 41.0547 219.742 39.8984C219.742 38.9297 219.961 37.7188 220.398 36.2656C220.836 34.8125 221.523 33.3828 222.461 31.9766C223.398 30.5391 224.594 29.3438 226.047 28.3906C227.516 27.4375 229.211 26.9609 231.133 26.9609C231.82 26.9609 232.422 27.0469 232.938 27.2188C233.453 27.3906 233.891 27.5781 234.25 27.7812C234.453 27.9062 234.641 28.0391 234.812 28.1797C235 28.3047 235.172 28.4453 235.328 28.6016L236.148 28.2031C236.383 28.0938 236.625 28 236.875 27.9219C237.141 27.8281 237.367 27.7812 237.555 27.7812C238.148 27.7812 238.633 27.9453 239.008 28.2734C239.383 28.6016 239.57 28.9609 239.57 29.3516C239.57 29.4766 239.562 29.5625 239.547 29.6094C239.438 30.0469 239.234 30.6484 238.938 31.4141C238.656 32.1797 238.352 33.0312 238.023 33.9688C237.695 34.875 237.414 35.75 237.18 36.5938C236.961 37.4375 236.852 38.1328 236.852 38.6797C236.852 39.1484 236.93 39.5391 237.086 39.8516C237.242 40.1484 237.508 40.2969 237.883 40.2969C238.336 40.2969 238.945 40.0391 239.711 39.5234C240.477 38.9922 241.266 38.3672 242.078 37.6484C242.516 37.2578 242.969 36.8438 243.438 36.4062C243.906 35.9531 244.383 35.4766 244.867 34.9766C245.117 34.7734 245.359 34.6719 245.594 34.6719C245.906 34.6719 246.164 34.8281 246.367 35.1406C246.586 35.4375 246.695 35.7734 246.695 36.1484C246.695 36.5859 246.547 36.9531 246.25 37.25C245.625 37.8281 244.984 38.4453 244.328 39.1016C243.672 39.7578 242.766 40.5625 241.609 41.5156C240.578 42.3594 239.516 43.0859 238.422 43.6953C237.328 44.2891 236.344 44.5859 235.469 44.5859C234.375 44.5859 233.578 44.1641 233.078 43.3203C232.578 42.4609 232.328 41.5469 232.328 40.5781C232.328 39.875 232.43 39.25 232.633 38.7031C231.992 39.5625 231.234 40.4531 230.359 41.375C229.484 42.2812 228.539 43.0469 227.523 43.6719C226.508 44.2812 225.469 44.5859 224.406 44.5859ZM226.281 40.4609C226.781 40.4609 227.406 40.1406 228.156 39.5C228.922 38.8594 229.656 38.1094 230.359 37.25C231.141 36.3125 231.758 35.4609 232.211 34.6953C232.664 33.9297 232.891 33.4141 232.891 33.1484C232.891 32.5547 232.547 32.0859 231.859 31.7422C231.172 31.3828 230.555 31.2031 230.008 31.2031C229.039 31.2031 228.117 31.5156 227.242 32.1406C226.383 32.7656 225.68 33.5703 225.133 34.5547C224.586 35.5234 224.312 36.5312 224.312 37.5781C224.312 38.1875 224.422 38.8203 224.641 39.4766C224.875 40.1328 225.422 40.4609 226.281 40.4609ZM245.688 44.5859C244.453 44.5859 243.594 44.2812 243.109 43.6719C242.625 43.0625 242.383 42.3125 242.383 41.4219C242.383 40.6406 242.516 39.8281 242.781 38.9844C243.047 38.1406 243.344 37.3828 243.672 36.7109L246.414 31.0859H245.406C244.531 31.0859 243.93 30.9453 243.602 30.6641C243.273 30.3828 243.109 30.0625 243.109 29.7031C243.109 29.3438 243.312 28.9375 243.719 28.4844C244.125 28.0156 244.68 27.7812 245.383 27.7812H247.914L252.859 17.9609C253.172 17.3672 253.555 16.9453 254.008 16.6953C254.477 16.4297 254.961 16.2969 255.461 16.2969C255.93 16.2969 256.359 16.4219 256.75 16.6719C257.141 16.9219 257.336 17.3359 257.336 17.9141C257.336 18.2109 257.266 18.5156 257.125 18.8281C257 19.125 256.828 19.4766 256.609 19.8828C256.359 20.3516 256.023 20.9844 255.602 21.7812C255.18 22.5625 254.656 23.5078 254.031 24.6172L252.344 27.7812H259.984C260.734 27.7812 261.344 27.8828 261.812 28.0859C262.297 28.2734 262.539 28.7031 262.539 29.375C262.539 29.7188 262.414 30.0547 262.164 30.3828C261.914 30.7109 261.375 30.9062 260.547 30.9688H250.797L249.156 34.25L247.703 37.2266C247.516 37.6016 247.328 38.0391 247.141 38.5391C246.969 39.0234 246.883 39.4531 246.883 39.8281C246.883 40.2969 247.102 40.5312 247.539 40.5312C248.039 40.5312 248.711 40.3203 249.555 39.8984C250.398 39.4766 251.289 38.9609 252.227 38.3516C253.18 37.7422 254.094 37.1094 254.969 36.4531C255.844 35.7812 256.648 35.1328 257.383 34.5078C257.648 34.3359 257.883 34.25 258.086 34.25C258.43 34.25 258.688 34.4375 258.859 34.8125C259.031 35.1875 259.047 35.6406 258.906 36.1719C258.781 36.7031 258.414 37.2109 257.805 37.6953C256.789 38.6172 255.758 39.4922 254.711 40.3203C253.68 41.1328 252.656 41.8594 251.641 42.5C250.609 43.125 249.594 43.625 248.594 44C247.594 44.3906 246.625 44.5859 245.688 44.5859ZM254.852 44.5859C254.305 44.5859 253.883 44.4219 253.586 44.0938C253.289 43.7812 253.141 43.3828 253.141 42.8984C253.141 42.2422 253.406 41.375 253.938 40.2969C254.453 39.2188 255.039 38.0234 255.695 36.7109C256.352 35.3828 256.992 34.1016 257.617 32.8672C258.258 31.6328 258.781 30.6016 259.188 29.7734L266.922 14.5625C267.109 14.1562 267.477 13.7969 268.023 13.4844C268.57 13.1562 269.117 12.9922 269.664 12.9922C270.352 12.9922 270.828 13.125 271.094 13.3906C271.359 13.6406 271.492 13.9531 271.492 14.3281C271.492 14.6719 271.406 15.0391 271.234 15.4297C271.062 15.8047 270.867 16.1562 270.648 16.4844C269.367 18.6875 268.094 21.0469 266.828 23.5625C265.562 26.0781 264.234 28.4922 262.844 30.8047C263.438 30.2266 264.078 29.6484 264.766 29.0703C265.453 28.4766 266.227 27.9766 267.086 27.5703C267.945 27.1641 268.93 26.9609 270.039 26.9609C271.07 26.9609 271.953 27.1641 272.688 27.5703C273.422 27.9766 273.789 28.7109 273.789 29.7734C273.789 30.7734 273.57 31.6875 273.133 32.5156C272.695 33.3438 272.18 34.125 271.586 34.8594C271.008 35.5781 270.469 36.3203 269.969 37.0859C269.469 37.8516 269.172 38.6875 269.078 39.5938V39.6875L269.055 39.7812C269.055 40.0938 269.156 40.2891 269.359 40.3672C269.578 40.4453 269.852 40.4844 270.18 40.4844C270.82 40.4844 271.508 40.3125 272.242 39.9688C272.992 39.6094 273.742 39.1719 274.492 38.6562C275.227 38.1406 275.906 37.6094 276.531 37.0625C277.172 36.5156 277.688 36.0547 278.078 35.6797C278.344 35.4297 278.641 35.3047 278.969 35.3047C279.25 35.3047 279.484 35.4141 279.672 35.6328C279.875 35.8359 279.977 36.1172 279.977 36.4766C279.977 36.8047 279.859 37.1797 279.625 37.6016C279.406 38.0234 279.023 38.4453 278.477 38.8672C277.352 39.8359 276.188 40.7578 274.984 41.6328C273.797 42.5078 272.594 43.2188 271.375 43.7656C270.172 44.3125 268.984 44.5859 267.812 44.5859C266.703 44.5859 265.812 44.3359 265.141 43.8359C264.469 43.3203 264.133 42.5156 264.133 41.4219C264.133 40.3438 264.375 39.3125 264.859 38.3281C265.359 37.3438 265.914 36.4297 266.523 35.5859C267.148 34.7422 267.648 34 268.023 33.3594C268.211 33.0938 268.352 32.8516 268.445 32.6328C268.555 32.3984 268.609 32.1484 268.609 31.8828C268.609 31.3516 268.352 31.0859 267.836 31.0859C266.617 31.0859 265.516 31.4688 264.531 32.2344C263.562 32.9844 262.68 33.9141 261.883 35.0234C261.102 36.1172 260.383 37.1797 259.727 38.2109C259.414 38.6953 259.086 39.2891 258.742 39.9922C258.398 40.6953 258.016 41.4141 257.594 42.1484C257.203 42.8359 256.773 43.4141 256.305 43.8828C255.836 44.3516 255.352 44.5859 254.852 44.5859ZM284.945 35.6328C284.633 35.6328 284.359 35.5625 284.125 35.4219C283.891 35.2656 283.773 35.0469 283.773 34.7656C283.773 34.75 283.789 34.6641 283.82 34.5078C284.133 33.3359 284.797 32.1641 285.812 30.9922C286.828 29.8203 288.047 28.6953 289.469 27.6172C290.25 27.1172 291.094 26.5312 292 25.8594C292.922 25.1875 293.734 24.5078 294.438 23.8203C295.156 23.1172 295.586 22.4844 295.727 21.9219C295.805 21.5312 295.844 21.25 295.844 21.0781C295.844 20.1562 295.352 19.6953 294.367 19.6953C293.68 19.6953 292.844 19.9062 291.859 20.3281C290.875 20.75 289.914 21.3516 288.977 22.1328C288.352 22.6484 287.805 23.2188 287.336 23.8438C286.977 24.2969 286.555 24.5234 286.07 24.5234C285.68 24.5234 285.297 24.4141 284.922 24.1953C284.562 23.9766 284.383 23.6953 284.383 23.3516C284.383 23.1328 284.438 22.9219 284.547 22.7188C284.672 22.5 284.836 22.2656 285.039 22.0156C286.07 20.75 287.234 19.6797 288.531 18.8047C289.844 17.9297 291.164 17.2734 292.492 16.8359C293.82 16.3828 295.031 16.1562 296.125 16.1562C297.281 16.1562 298.25 16.4297 299.031 16.9766C299.812 17.5234 300.203 18.3984 300.203 19.6016C300.203 20.8516 299.922 21.9453 299.359 22.8828C298.812 23.8203 297.938 24.7578 296.734 25.6953C295.531 26.6328 293.938 27.7344 291.953 29C290.578 29.9531 289.43 30.9531 288.508 32C287.586 33.0469 286.945 34 286.586 34.8594C286.461 35.125 286.227 35.3203 285.883 35.4453C285.539 35.5703 285.227 35.6328 284.945 35.6328ZM281.852 44.375C281.195 44.375 280.688 44.1875 280.328 43.8125C279.969 43.4219 279.789 42.9297 279.789 42.3359C279.789 41.6172 280.008 40.9375 280.445 40.2969C280.883 39.6406 281.43 39.1016 282.086 38.6797C282.758 38.2578 283.445 38.0469 284.148 38.0469C284.805 38.0469 285.297 38.2266 285.625 38.5859C285.969 38.9453 286.141 39.3984 286.141 39.9453C286.141 40.2422 286.109 40.5078 286.047 40.7422C285.797 41.7266 285.258 42.5781 284.43 43.2969C283.617 44.0156 282.758 44.375 281.852 44.375Z" fill="white"/>
<rect x="5.5" y="7.5" width="307" height="48" rx="15.5" stroke="white" stroke-width="3"/>
</g>
<defs>
<clipPath id="clip0_16_32">
<rect width="318" height="63" fill="white"/>
</clipPath>
</defs>
</svg>
`,Ef=`<svg width="271" height="56" viewBox="0 0 271 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_23_13)">
<path d="M10.5391 37.9141C8.63281 37.9141 7.29688 37.4062 6.53125 36.3906C5.76562 35.375 5.38281 34.1641 5.38281 32.7578C5.38281 31.9609 5.48438 31.1406 5.6875 30.2969C5.89062 29.4375 6.15625 28.6094 6.48438 27.8125L7.63281 25C7.75781 24.7031 7.89062 24.3828 8.03125 24.0391C8.17188 23.6797 8.35156 23.2578 8.57031 22.7734L15.4141 7.5625C15.6016 7.14062 15.9453 6.77344 16.4453 6.46094C16.9609 6.14844 17.4922 5.99219 18.0391 5.99219C18.7578 5.99219 19.2578 6.13281 19.5391 6.41406C19.8359 6.69531 19.9844 7.03906 19.9844 7.44531C19.9844 7.75781 19.9062 8.10156 19.75 8.47656C19.5938 8.83594 19.4219 9.17188 19.2344 9.48438C18.6562 10.5938 18.0938 11.7109 17.5469 12.8359C17 13.9609 16.4688 15.0938 15.9531 16.2344C15.4375 17.375 14.9062 18.5156 14.3594 19.6562C13.8125 20.7969 13.25 21.9219 12.6719 23.0312C13.6562 22.25 14.7734 21.5391 16.0234 20.8984C17.2734 20.2578 18.5781 19.9375 19.9375 19.9375C20.5781 19.9375 21.2188 20.1016 21.8594 20.4297C22.5156 20.7578 23.0625 21.2344 23.5 21.8594C23.9531 22.4844 24.1797 23.2578 24.1797 24.1797C24.1797 24.4609 24.0859 24.9688 23.8984 25.7031C23.7109 26.4375 23.4609 27.2188 23.1484 28.0469C22.8516 28.8594 22.5078 29.5547 22.1172 30.1328C22.2266 30.3047 22.3672 30.4141 22.5391 30.4609C22.7109 30.4922 22.9062 30.5078 23.125 30.5078C24.0625 30.5078 24.9844 30.3594 25.8906 30.0625C26.8125 29.75 27.6562 29.3906 28.4219 28.9844C29.2031 28.5781 29.8516 28.2188 30.3672 27.9062C30.5547 27.7031 30.7578 27.6016 30.9766 27.6016C31.2422 27.6016 31.4688 27.7188 31.6562 27.9531C31.8594 28.1875 31.9609 28.4922 31.9609 28.8672C31.9609 29.2266 31.8828 29.5859 31.7266 29.9453C31.5859 30.2891 31.3203 30.6719 30.9297 31.0938C29.5547 31.9062 28.1328 32.625 26.6641 33.25C25.1953 33.8594 23.6719 34.1641 22.0938 34.1641C21.0625 34.1641 20.2344 33.875 19.6094 33.2969C18.2812 34.8906 16.8672 36.0625 15.3672 36.8125C13.8828 37.5469 12.2734 37.9141 10.5391 37.9141ZM12.2734 33.4844C13.4922 33.4844 14.6484 33.1172 15.7422 32.3828C16.8359 31.6328 17.7188 30.6953 18.3906 29.5703C19.0781 28.4297 19.4219 27.2734 19.4219 26.1016C19.4219 25.6328 19.3203 25.1406 19.1172 24.625C18.9141 24.1094 18.4219 23.8516 17.6406 23.8516C16.4531 23.8516 15.2812 24.2266 14.125 24.9766C12.9688 25.7109 12.0156 26.6484 11.2656 27.7891C10.5156 28.9141 10.1406 30.0703 10.1406 31.2578C10.1406 31.7891 10.2656 32.2969 10.5156 32.7812C10.7812 33.25 11.3672 33.4844 12.2734 33.4844ZM30.2266 50.8984C29.6016 50.8984 29.0938 50.6875 28.7031 50.2656C28.3125 49.8594 28.1172 49.3047 28.1172 48.6016C28.1172 47.9453 28.1953 47.2891 28.3516 46.6328C28.5234 45.9922 28.8203 45.2812 29.2422 44.5C29.6484 43.7188 30.1875 42.8438 30.8594 41.875C31.5469 40.9219 32.4062 39.7969 33.4375 38.5L38.125 29.0078C35.7812 31.7891 33.6562 33.9141 31.75 35.3828C29.8438 36.8516 28.0625 37.5859 26.4062 37.5859C25.875 37.5859 25.4219 37.4609 25.0469 37.2109C24.6719 36.9766 24.4844 36.5781 24.4844 36.0156C24.4844 35.2344 24.6719 34.3516 25.0469 33.3672C25.3594 32.6016 25.6875 31.8906 26.0312 31.2344C26.3906 30.5625 26.7578 29.8594 27.1328 29.125C27.5234 28.3438 27.9766 27.3828 28.4922 26.2422C29.0078 25.1016 29.5781 23.7344 30.2031 22.1406C30.5156 21.5312 30.9219 21.0938 31.4219 20.8281C31.9219 20.5469 32.4062 20.4062 32.875 20.4062C33.3594 20.4062 33.7656 20.5234 34.0938 20.7578C34.4375 20.9766 34.6094 21.2734 34.6094 21.6484C34.6094 21.8516 34.5781 22.0156 34.5156 22.1406L30.2266 31.0703C30.0078 31.5391 29.8984 31.8984 29.8984 32.1484C29.8984 32.3828 29.9922 32.5 30.1797 32.5C30.3516 32.5 30.5703 32.4141 30.8359 32.2422C31.1016 32.0703 31.3516 31.875 31.5859 31.6562L41.2656 22.1406C42.0469 21.5156 42.6484 21.1328 43.0703 20.9922C43.4922 20.8516 43.9062 20.7812 44.3125 20.7812C44.6406 20.7812 44.875 20.9062 45.0156 21.1562C45.1562 21.3906 45.2266 21.6406 45.2266 21.9062C45.2266 22.1094 45.1875 22.3125 45.1094 22.5156L39.8594 33.4609C40.6094 32.8984 41.4688 32.3516 42.4375 31.8203C43.4062 31.2734 44.3516 30.7812 45.2734 30.3438C46.1953 29.9062 46.9766 29.5625 47.6172 29.3125C48.2578 29.0469 48.6172 28.9141 48.6953 28.9141C49.0859 28.9141 49.4297 29.0625 49.7266 29.3594C50.0234 29.6562 50.1719 30.0312 50.1719 30.4844C50.1719 30.8906 50.0156 31.3203 49.7031 31.7734C49.4062 32.2266 48.875 32.6641 48.1094 33.0859C47.125 33.6328 46.1875 34.1406 45.2969 34.6094C44.4219 35.0781 43.6875 35.4766 43.0938 35.8047L41.4297 36.7422C40.6797 37.1797 39.9844 37.6406 39.3438 38.125C38.7188 38.6094 38.0859 39.1484 37.4453 39.7422C36.7578 41.5391 36.1094 43.125 35.5 44.5C34.9062 45.875 34.5391 46.6953 34.3984 46.9609C33.1328 49.5859 31.7422 50.8984 30.2266 50.8984ZM63.0156 37.5859C62.4844 37.5859 61.8516 37.4375 61.1172 37.1406C60.3828 36.8438 59.7344 36.3516 59.1719 35.6641C58.625 34.9766 58.3516 34.0547 58.3516 32.8984C58.3516 31.9297 58.5703 30.7188 59.0078 29.2656C59.4453 27.8125 60.1328 26.3828 61.0703 24.9766C62.0078 23.5391 63.2031 22.3438 64.6562 21.3906C66.125 20.4375 67.8203 19.9609 69.7422 19.9609C70.4297 19.9609 71.0312 20.0469 71.5469 20.2188C72.0625 20.3906 72.5 20.5781 72.8594 20.7812C73.0625 20.9062 73.25 21.0391 73.4219 21.1797C73.6094 21.3047 73.7812 21.4453 73.9375 21.6016L74.7578 21.2031C74.9922 21.0938 75.2344 21 75.4844 20.9219C75.75 20.8281 75.9766 20.7812 76.1641 20.7812C76.7578 20.7812 77.2422 20.9453 77.6172 21.2734C77.9922 21.6016 78.1797 21.9609 78.1797 22.3516C78.1797 22.4766 78.1719 22.5625 78.1562 22.6094C78.0469 23.0469 77.8438 23.6484 77.5469 24.4141C77.2656 25.1797 76.9609 26.0312 76.6328 26.9688C76.3047 27.875 76.0234 28.75 75.7891 29.5938C75.5703 30.4375 75.4609 31.1328 75.4609 31.6797C75.4609 32.1484 75.5391 32.5391 75.6953 32.8516C75.8516 33.1484 76.1172 33.2969 76.4922 33.2969C76.9453 33.2969 77.5547 33.0391 78.3203 32.5234C79.0859 31.9922 79.875 31.3672 80.6875 30.6484C81.125 30.2578 81.5781 29.8438 82.0469 29.4062C82.5156 28.9531 82.9922 28.4766 83.4766 27.9766C83.7266 27.7734 83.9688 27.6719 84.2031 27.6719C84.5156 27.6719 84.7734 27.8281 84.9766 28.1406C85.1953 28.4375 85.3047 28.7734 85.3047 29.1484C85.3047 29.5859 85.1562 29.9531 84.8594 30.25C84.2344 30.8281 83.5938 31.4453 82.9375 32.1016C82.2812 32.7578 81.375 33.5625 80.2188 34.5156C79.1875 35.3594 78.125 36.0859 77.0312 36.6953C75.9375 37.2891 74.9531 37.5859 74.0781 37.5859C72.9844 37.5859 72.1875 37.1641 71.6875 36.3203C71.1875 35.4609 70.9375 34.5469 70.9375 33.5781C70.9375 32.875 71.0391 32.25 71.2422 31.7031C70.6016 32.5625 69.8438 33.4531 68.9688 34.375C68.0938 35.2812 67.1484 36.0469 66.1328 36.6719C65.1172 37.2812 64.0781 37.5859 63.0156 37.5859ZM64.8906 33.4609C65.3906 33.4609 66.0156 33.1406 66.7656 32.5C67.5312 31.8594 68.2656 31.1094 68.9688 30.25C69.75 29.3125 70.3672 28.4609 70.8203 27.6953C71.2734 26.9297 71.5 26.4141 71.5 26.1484C71.5 25.5547 71.1562 25.0859 70.4688 24.7422C69.7812 24.3828 69.1641 24.2031 68.6172 24.2031C67.6484 24.2031 66.7266 24.5156 65.8516 25.1406C64.9922 25.7656 64.2891 26.5703 63.7422 27.5547C63.1953 28.5234 62.9219 29.5312 62.9219 30.5781C62.9219 31.1875 63.0312 31.8203 63.25 32.4766C63.4844 33.1328 64.0312 33.4609 64.8906 33.4609ZM84.5078 37.5859C83.2266 37.5859 82.3438 37.2656 81.8594 36.625C81.3906 35.9844 81.1562 35.2031 81.1562 34.2812C81.1562 33.5156 81.2656 32.7344 81.4844 31.9375C81.7188 31.125 81.9922 30.3828 82.3047 29.7109C82.8516 28.4922 83.4062 27.2812 83.9688 26.0781C84.5312 24.875 85.0469 23.7734 85.5156 22.7734L92.6172 7.65625C92.9766 6.875 93.5156 6.36719 94.2344 6.13281C94.9531 5.89844 95.6094 5.92188 96.2031 6.20312C96.8125 6.46875 97.1172 6.96094 97.1172 7.67969C97.1172 7.96094 97.0469 8.25781 96.9062 8.57031C96.7812 8.88281 96.6172 9.21875 96.4141 9.57812C95.8516 10.6406 95.1328 12.0391 94.2578 13.7734C93.3984 15.5078 92.4453 17.4609 91.3984 19.6328C90.2578 22.0234 89.2969 24.0312 88.5156 25.6562C87.75 27.2656 87.0312 28.7891 86.3594 30.2266C86.1875 30.5859 86.0156 31.0078 85.8438 31.4922C85.6875 31.9609 85.6094 32.3828 85.6094 32.7578C85.6094 33.2734 85.8359 33.5312 86.2891 33.5312C86.7891 33.5312 87.4531 33.3281 88.2812 32.9219C89.125 32.5 90 31.9766 90.9062 31.3516C91.8281 30.7422 92.7188 30.1094 93.5781 29.4531C94.4375 28.7812 95.2344 28.1328 95.9688 27.5078C96.2188 27.3047 96.5156 27.2031 96.8594 27.2031C97.5781 27.2031 97.9375 27.6016 97.9375 28.3984C97.9375 28.7266 97.8281 29.0938 97.6094 29.5C97.3906 29.9062 97.0078 30.3047 96.4609 30.6953C95.4609 31.6172 94.4531 32.4922 93.4375 33.3203C92.4375 34.1328 91.4297 34.8594 90.4141 35.5C89.4141 36.125 88.4141 36.625 87.4141 37C86.4141 37.3906 85.4453 37.5859 84.5078 37.5859ZM98.2422 37.5859C97.1484 37.5859 96.1875 37.1953 95.3594 36.4141C94.5312 35.6172 94.1172 34.4609 94.1172 32.9453C94.1172 31.7109 94.2891 30.3672 94.6328 28.9141C94.9766 27.4453 95.3594 26.0703 95.7812 24.7891C96.2031 23.4922 96.5312 22.4922 96.7656 21.7891C97.0781 21.1328 97.4688 20.6641 97.9375 20.3828C98.4219 20.0859 98.8906 19.9375 99.3438 19.9375C99.75 19.9375 100.148 20.0703 100.539 20.3359C100.93 20.6016 101.125 20.9375 101.125 21.3438C101.125 21.5312 101.094 21.6797 101.031 21.7891C100.719 22.8047 100.344 23.9141 99.9062 25.1172C99.4844 26.3047 99.1094 27.4844 98.7812 28.6562C98.4531 29.8281 98.2891 30.8906 98.2891 31.8438C98.2891 32.0781 98.3438 32.3984 98.4531 32.8047C98.5625 33.1953 98.7109 33.3906 98.8984 33.3906C99.3047 33.3906 99.7578 33.1641 100.258 32.7109C100.758 32.2578 101.305 31.6328 101.898 30.8359C102.648 30.0547 103.352 29.0547 104.008 27.8359C104.68 26.6016 105.305 25.4219 105.883 24.2969C106.445 23.1875 107 22.2422 107.547 21.4609C108.094 20.6641 108.641 20.2656 109.188 20.2656C109.828 20.2656 110.281 20.4766 110.547 20.8984C110.812 21.3047 110.945 21.7969 110.945 22.375C110.945 23.25 110.742 24.0859 110.336 24.8828C109.93 25.6797 109.414 26.5156 108.789 27.3906C108.18 28.2656 107.547 29.2578 106.891 30.3672C107.156 30.6953 107.547 30.8594 108.062 30.8594C109.234 30.8594 110.422 30.5859 111.625 30.0391C112.828 29.4766 113.977 28.7656 115.07 27.9062C115.305 27.7656 115.523 27.6953 115.727 27.6953C116.008 27.6953 116.234 27.8203 116.406 28.0703C116.594 28.3203 116.688 28.6406 116.688 29.0312C116.688 29.4531 116.562 29.9141 116.312 30.4141C116.062 30.8984 115.648 31.3438 115.07 31.75C113.898 32.6406 112.727 33.3438 111.555 33.8594C110.383 34.3594 109.086 34.6094 107.664 34.6094C107.195 34.6094 106.742 34.5234 106.305 34.3516C105.867 34.1797 105.297 33.875 104.594 33.4375C103.562 34.7969 102.523 35.8281 101.477 36.5312C100.445 37.2344 99.3672 37.5859 98.2422 37.5859ZM121.891 18.3906C120.922 18.3906 120.242 18.2422 119.852 17.9453C119.461 17.6328 119.242 17.2266 119.195 16.7266C119.195 15.9922 119.461 15.2734 119.992 14.5703C120.539 13.8516 121.344 13.4922 122.406 13.4922C123.312 13.4922 123.945 13.6719 124.305 14.0312C124.664 14.375 124.844 14.8125 124.844 15.3438C124.844 15.9375 124.609 16.5938 124.141 17.3125C123.688 18.0312 122.938 18.3906 121.891 18.3906ZM116.148 37.5859C114.883 37.5859 113.883 37.2656 113.148 36.625C112.43 35.9688 112.07 34.9531 112.07 33.5781C112.07 32.625 112.242 31.6797 112.586 30.7422C112.945 29.7891 113.336 28.8984 113.758 28.0703C114.195 27.2266 114.539 26.4922 114.789 25.8672C114.867 25.6641 115 25.3516 115.188 24.9297C115.391 24.5078 115.602 24.0781 115.82 23.6406L116.617 22C116.883 21.5625 117.188 21.25 117.531 21.0625C117.875 20.875 118.227 20.7812 118.586 20.7812C119.18 20.7812 119.688 20.9766 120.109 21.3672C120.547 21.7422 120.766 22.2266 120.766 22.8203C120.75 22.9609 120.727 23.1016 120.695 23.2422C120.68 23.3828 120.633 23.5234 120.555 23.6641C120.211 24.2891 119.914 24.875 119.664 25.4219C119.414 25.9531 119.156 26.4922 118.891 27.0391C118.672 27.4922 118.398 28.0469 118.07 28.7031C117.742 29.3594 117.453 30.0234 117.203 30.6953C116.953 31.3516 116.828 31.9375 116.828 32.4531C116.828 32.875 116.93 33.1562 117.133 33.2969C117.352 33.4219 117.656 33.4844 118.047 33.4844C118.672 33.4844 119.359 33.2891 120.109 32.8984C120.875 32.5078 121.602 32.0234 122.289 31.4453C123.008 30.8672 123.672 30.2812 124.281 29.6875C124.891 29.0781 125.344 28.5859 125.641 28.2109C125.938 27.9141 126.25 27.7656 126.578 27.7656C126.859 27.7656 127.086 27.8906 127.258 28.1406C127.445 28.3906 127.539 28.7109 127.539 29.1016C127.539 29.4609 127.445 29.8438 127.258 30.25C127.086 30.6562 126.797 31.0391 126.391 31.3984C125.359 32.4453 124.281 33.4453 123.156 34.3984C122.031 35.3359 120.875 36.1016 119.688 36.6953C118.516 37.2891 117.336 37.5859 116.148 37.5859ZM124.492 37.5859C123.945 37.5859 123.516 37.4141 123.203 37.0703C122.891 36.7266 122.734 36.3047 122.734 35.8047C122.734 35.3984 122.969 34.6406 123.438 33.5312C123.906 32.4062 124.453 31.2031 125.078 29.9219C125.875 28.25 126.578 26.8047 127.188 25.5859C127.797 24.3516 128.25 23.4141 128.547 22.7734C128.859 22.1016 129.25 21.6016 129.719 21.2734C130.188 20.9453 130.648 20.7812 131.102 20.7812C131.477 20.7812 131.812 20.9219 132.109 21.2031C132.406 21.4688 132.555 21.8672 132.555 22.3984C132.555 22.6016 132.531 22.8203 132.484 23.0547C132.438 23.2891 132.352 23.5391 132.227 23.8047C132.711 23.1953 133.43 22.6016 134.383 22.0234C135.336 21.4297 136.367 20.9375 137.477 20.5469C138.586 20.1562 139.609 19.9609 140.547 19.9609C141.375 19.9609 142.062 20.1641 142.609 20.5703C143.172 20.9609 143.453 21.6328 143.453 22.5859C143.453 23.3984 143.273 24.2812 142.914 25.2344C142.555 26.1719 142.125 27.0781 141.625 27.9531C141.094 28.875 140.594 29.6875 140.125 30.3906C139.672 31.0781 139.32 31.6484 139.07 32.1016C138.867 32.3516 138.766 32.6406 138.766 32.9688C138.766 33.2812 138.93 33.4375 139.258 33.4375C139.367 33.4375 139.492 33.4297 139.633 33.4141C139.773 33.3828 139.945 33.2969 140.148 33.1562C141.32 32.7188 142.484 32.1641 143.641 31.4922C144.812 30.8203 145.883 30.125 146.852 29.4062C147.836 28.6875 148.625 28.0547 149.219 27.5078C149.469 27.3047 149.711 27.2031 149.945 27.2031C150.508 27.2031 150.789 27.5625 150.789 28.2812C150.789 28.7656 150.633 29.3047 150.32 29.8984C150.023 30.4922 149.547 31.0469 148.891 31.5625C147.75 32.375 146.68 33.1328 145.68 33.8359C144.695 34.5234 143.648 35.1484 142.539 35.7109C141.43 36.2734 140.109 36.7734 138.578 37.2109C137.781 37.4609 137.102 37.5859 136.539 37.5859C134.945 37.5859 134.148 36.7109 134.148 34.9609C134.148 34.8516 134.148 34.75 134.148 34.6562C134.164 34.5469 134.18 34.4297 134.195 34.3047C134.242 33.6016 134.492 32.7891 134.945 31.8672C135.398 30.9297 135.891 30.0078 136.422 29.1016C136.953 28.2266 137.43 27.4062 137.852 26.6406C138.273 25.875 138.484 25.3047 138.484 24.9297C138.484 24.3672 138.219 24.0859 137.688 24.0859C136.703 24.0859 135.758 24.375 134.852 24.9531C133.961 25.5312 133.117 26.2656 132.32 27.1562C131.539 28.0312 130.82 28.9531 130.164 29.9219C129.508 30.875 128.93 31.7422 128.43 32.5234C128.07 33.1172 127.719 33.8125 127.375 34.6094C127.047 35.4062 126.656 36.1016 126.203 36.6953C125.766 37.2891 125.195 37.5859 124.492 37.5859ZM161.734 37.5859C160.141 37.5859 158.914 37.125 158.055 36.2031C157.195 35.2656 156.766 34.1484 156.766 32.8516C156.766 31.7891 157.117 30.5312 157.82 29.0781C158.539 27.6094 159.484 26.1875 160.656 24.8125C161.844 23.4062 163.172 22.25 164.641 21.3438C166.125 20.4219 167.602 19.9609 169.07 19.9609C169.789 19.9609 170.383 20.125 170.852 20.4531C171.336 20.7812 171.578 21.3359 171.578 22.1172C171.578 22.7734 171.477 23.5 171.273 24.2969C171.07 25.0781 170.742 25.7578 170.289 26.3359C169.836 26.8984 169.227 27.1797 168.461 27.1797C168.148 27.1797 167.945 27.1328 167.852 27.0391C167.773 26.9453 167.734 26.7812 167.734 26.5469L167.758 25.9141V25.1406C167.758 24.8594 167.719 24.625 167.641 24.4375C167.562 24.2344 167.367 24.1328 167.055 24.1328C166.555 24.1328 165.961 24.4062 165.273 24.9531C164.586 25.4844 163.898 26.1953 163.211 27.0859C162.57 27.9453 162.039 28.8047 161.617 29.6641C161.195 30.5078 160.984 31.2188 160.984 31.7969C160.984 32.3438 161.172 32.7734 161.547 33.0859C161.938 33.3984 162.461 33.5547 163.117 33.5547C164.148 33.5547 165.281 33.3125 166.516 32.8281C167.75 32.3438 168.922 31.7812 170.031 31.1406C171.109 30.5156 172.055 29.9297 172.867 29.3828C173.695 28.8359 174.188 28.5234 174.344 28.4453C174.625 28.3203 174.859 28.2578 175.047 28.2578C175.438 28.2578 175.703 28.3984 175.844 28.6797C175.984 28.9609 176.055 29.2031 176.055 29.4062C176.055 29.5469 176.039 29.7188 176.008 29.9219C175.977 30.1094 175.859 30.3281 175.656 30.5781C175.438 30.8438 174.867 31.3438 173.945 32.0781C173.023 32.8125 172.008 33.5469 170.898 34.2812C169.57 35.1719 168.086 35.9453 166.445 36.6016C164.805 37.2578 163.234 37.5859 161.734 37.5859ZM172.164 37.5859C171.617 37.5859 171.195 37.4219 170.898 37.0938C170.602 36.7812 170.453 36.3828 170.453 35.8984C170.453 35.2422 170.719 34.375 171.25 33.2969C171.766 32.2188 172.352 31.0234 173.008 29.7109C173.664 28.3828 174.305 27.1016 174.93 25.8672C175.57 24.6328 176.094 23.6016 176.5 22.7734L184.234 7.5625C184.422 7.15625 184.789 6.79688 185.336 6.48438C185.883 6.15625 186.43 5.99219 186.977 5.99219C187.664 5.99219 188.141 6.125 188.406 6.39062C188.672 6.64062 188.805 6.95312 188.805 7.32812C188.805 7.67188 188.719 8.03906 188.547 8.42969C188.375 8.80469 188.18 9.15625 187.961 9.48438C186.68 11.6875 185.406 14.0469 184.141 16.5625C182.875 19.0781 181.547 21.4922 180.156 23.8047C180.75 23.2266 181.391 22.6484 182.078 22.0703C182.766 21.4766 183.539 20.9766 184.398 20.5703C185.258 20.1641 186.242 19.9609 187.352 19.9609C188.383 19.9609 189.266 20.1641 190 20.5703C190.734 20.9766 191.102 21.7109 191.102 22.7734C191.102 23.7734 190.883 24.6875 190.445 25.5156C190.008 26.3438 189.492 27.125 188.898 27.8594C188.32 28.5781 187.781 29.3203 187.281 30.0859C186.781 30.8516 186.484 31.6875 186.391 32.5938V32.6875L186.367 32.7812C186.367 33.0938 186.469 33.2891 186.672 33.3672C186.891 33.4453 187.164 33.4844 187.492 33.4844C188.133 33.4844 188.82 33.3125 189.555 32.9688C190.305 32.6094 191.055 32.1719 191.805 31.6562C192.539 31.1406 193.219 30.6094 193.844 30.0625C194.484 29.5156 195 29.0547 195.391 28.6797C195.656 28.4297 195.953 28.3047 196.281 28.3047C196.562 28.3047 196.797 28.4141 196.984 28.6328C197.188 28.8359 197.289 29.1172 197.289 29.4766C197.289 29.8047 197.172 30.1797 196.938 30.6016C196.719 31.0234 196.336 31.4453 195.789 31.8672C194.664 32.8359 193.5 33.7578 192.297 34.6328C191.109 35.5078 189.906 36.2188 188.688 36.7656C187.484 37.3125 186.297 37.5859 185.125 37.5859C184.016 37.5859 183.125 37.3359 182.453 36.8359C181.781 36.3203 181.445 35.5156 181.445 34.4219C181.445 33.3438 181.688 32.3125 182.172 31.3281C182.672 30.3438 183.227 29.4297 183.836 28.5859C184.461 27.7422 184.961 27 185.336 26.3594C185.523 26.0938 185.664 25.8516 185.758 25.6328C185.867 25.3984 185.922 25.1484 185.922 24.8828C185.922 24.3516 185.664 24.0859 185.148 24.0859C183.93 24.0859 182.828 24.4688 181.844 25.2344C180.875 25.9844 179.992 26.9141 179.195 28.0234C178.414 29.1172 177.695 30.1797 177.039 31.2109C176.727 31.6953 176.398 32.2891 176.055 32.9922C175.711 33.6953 175.328 34.4141 174.906 35.1484C174.516 35.8359 174.086 36.4141 173.617 36.8828C173.148 37.3516 172.664 37.5859 172.164 37.5859ZM198.203 37.5859C197.672 37.5859 197.039 37.4375 196.305 37.1406C195.57 36.8438 194.922 36.3516 194.359 35.6641C193.812 34.9766 193.539 34.0547 193.539 32.8984C193.539 31.9297 193.758 30.7188 194.195 29.2656C194.633 27.8125 195.32 26.3828 196.258 24.9766C197.195 23.5391 198.391 22.3438 199.844 21.3906C201.312 20.4375 203.008 19.9609 204.93 19.9609C205.617 19.9609 206.219 20.0469 206.734 20.2188C207.25 20.3906 207.688 20.5781 208.047 20.7812C208.25 20.9062 208.438 21.0391 208.609 21.1797C208.797 21.3047 208.969 21.4453 209.125 21.6016L209.945 21.2031C210.18 21.0938 210.422 21 210.672 20.9219C210.938 20.8281 211.164 20.7812 211.352 20.7812C211.945 20.7812 212.43 20.9453 212.805 21.2734C213.18 21.6016 213.367 21.9609 213.367 22.3516C213.367 22.4766 213.359 22.5625 213.344 22.6094C213.234 23.0469 213.031 23.6484 212.734 24.4141C212.453 25.1797 212.148 26.0312 211.82 26.9688C211.492 27.875 211.211 28.75 210.977 29.5938C210.758 30.4375 210.648 31.1328 210.648 31.6797C210.648 32.1484 210.727 32.5391 210.883 32.8516C211.039 33.1484 211.305 33.2969 211.68 33.2969C212.133 33.2969 212.742 33.0391 213.508 32.5234C214.273 31.9922 215.062 31.3672 215.875 30.6484C216.312 30.2578 216.766 29.8438 217.234 29.4062C217.703 28.9531 218.18 28.4766 218.664 27.9766C218.914 27.7734 219.156 27.6719 219.391 27.6719C219.703 27.6719 219.961 27.8281 220.164 28.1406C220.383 28.4375 220.492 28.7734 220.492 29.1484C220.492 29.5859 220.344 29.9531 220.047 30.25C219.422 30.8281 218.781 31.4453 218.125 32.1016C217.469 32.7578 216.562 33.5625 215.406 34.5156C214.375 35.3594 213.312 36.0859 212.219 36.6953C211.125 37.2891 210.141 37.5859 209.266 37.5859C208.172 37.5859 207.375 37.1641 206.875 36.3203C206.375 35.4609 206.125 34.5469 206.125 33.5781C206.125 32.875 206.227 32.25 206.43 31.7031C205.789 32.5625 205.031 33.4531 204.156 34.375C203.281 35.2812 202.336 36.0469 201.32 36.6719C200.305 37.2812 199.266 37.5859 198.203 37.5859ZM200.078 33.4609C200.578 33.4609 201.203 33.1406 201.953 32.5C202.719 31.8594 203.453 31.1094 204.156 30.25C204.938 29.3125 205.555 28.4609 206.008 27.6953C206.461 26.9297 206.688 26.4141 206.688 26.1484C206.688 25.5547 206.344 25.0859 205.656 24.7422C204.969 24.3828 204.352 24.2031 203.805 24.2031C202.836 24.2031 201.914 24.5156 201.039 25.1406C200.18 25.7656 199.477 26.5703 198.93 27.5547C198.383 28.5234 198.109 29.5312 198.109 30.5781C198.109 31.1875 198.219 31.8203 198.438 32.4766C198.672 33.1328 199.219 33.4609 200.078 33.4609ZM217.305 37.5859C216.758 37.5859 216.328 37.4141 216.016 37.0703C215.703 36.7266 215.547 36.3047 215.547 35.8047C215.547 35.3984 215.781 34.6406 216.25 33.5312C216.719 32.4062 217.266 31.2031 217.891 29.9219C218.688 28.25 219.391 26.8047 220 25.5859C220.609 24.3516 221.062 23.4141 221.359 22.7734C221.672 22.1016 222.062 21.6016 222.531 21.2734C223 20.9453 223.461 20.7812 223.914 20.7812C224.289 20.7812 224.625 20.9219 224.922 21.2031C225.219 21.4688 225.367 21.8672 225.367 22.3984C225.367 22.6016 225.344 22.8203 225.297 23.0547C225.25 23.2891 225.164 23.5391 225.039 23.8047C225.523 23.1953 226.242 22.6016 227.195 22.0234C228.148 21.4297 229.18 20.9375 230.289 20.5469C231.398 20.1562 232.422 19.9609 233.359 19.9609C234.188 19.9609 234.875 20.1641 235.422 20.5703C235.984 20.9609 236.266 21.6328 236.266 22.5859C236.266 23.3984 236.086 24.2812 235.727 25.2344C235.367 26.1719 234.938 27.0781 234.438 27.9531C233.906 28.875 233.406 29.6875 232.938 30.3906C232.484 31.0781 232.133 31.6484 231.883 32.1016C231.68 32.3516 231.578 32.6406 231.578 32.9688C231.578 33.2812 231.742 33.4375 232.07 33.4375C232.18 33.4375 232.305 33.4297 232.445 33.4141C232.586 33.3828 232.758 33.2969 232.961 33.1562C234.133 32.7188 235.297 32.1641 236.453 31.4922C237.625 30.8203 238.695 30.125 239.664 29.4062C240.648 28.6875 241.438 28.0547 242.031 27.5078C242.281 27.3047 242.523 27.2031 242.758 27.2031C243.32 27.2031 243.602 27.5625 243.602 28.2812C243.602 28.7656 243.445 29.3047 243.133 29.8984C242.836 30.4922 242.359 31.0469 241.703 31.5625C240.562 32.375 239.492 33.1328 238.492 33.8359C237.508 34.5234 236.461 35.1484 235.352 35.7109C234.242 36.2734 232.922 36.7734 231.391 37.2109C230.594 37.4609 229.914 37.5859 229.352 37.5859C227.758 37.5859 226.961 36.7109 226.961 34.9609C226.961 34.8516 226.961 34.75 226.961 34.6562C226.977 34.5469 226.992 34.4297 227.008 34.3047C227.055 33.6016 227.305 32.7891 227.758 31.8672C228.211 30.9297 228.703 30.0078 229.234 29.1016C229.766 28.2266 230.242 27.4062 230.664 26.6406C231.086 25.875 231.297 25.3047 231.297 24.9297C231.297 24.3672 231.031 24.0859 230.5 24.0859C229.516 24.0859 228.57 24.375 227.664 24.9531C226.773 25.5312 225.93 26.2656 225.133 27.1562C224.352 28.0312 223.633 28.9531 222.977 29.9219C222.32 30.875 221.742 31.7422 221.242 32.5234C220.883 33.1172 220.531 33.8125 220.188 34.6094C219.859 35.4062 219.469 36.1016 219.016 36.6953C218.578 37.2891 218.008 37.5859 217.305 37.5859ZM243.414 50.9219C242.805 50.9219 242.32 50.7109 241.961 50.2891C241.617 49.8672 241.445 49.3594 241.445 48.7656C241.445 48.1406 241.594 47.4062 241.891 46.5625C242.203 45.7344 242.625 44.8438 243.156 43.8906C244.234 41.9688 245.734 39.8906 247.656 37.6562L250.562 33.9531C249.359 35.0625 248.219 35.8516 247.141 36.3203C246.062 36.7734 245.164 37 244.445 37C243.195 37 242.156 36.4531 241.328 35.3594C240.516 34.2656 240.109 32.8906 240.109 31.2344C240.109 29.5156 240.438 27.9609 241.094 26.5703C241.766 25.1797 242.625 23.9922 243.672 23.0078C244.703 22.0391 245.844 21.2891 247.094 20.7578C248.359 20.2266 249.594 19.9609 250.797 19.9609C251.484 19.9609 252.086 20.0469 252.602 20.2188C253.117 20.3906 253.555 20.5781 253.914 20.7812C254.117 20.9062 254.305 21.0391 254.477 21.1797C254.664 21.3047 254.836 21.4453 254.992 21.6016C255.242 21.4297 255.477 21.2969 255.695 21.2031C255.914 21.0938 256.156 21 256.422 20.9219C256.688 20.8281 256.953 20.7812 257.219 20.7812C257.906 20.7812 258.438 20.9219 258.812 21.2031C259.188 21.4844 259.375 21.8203 259.375 22.2109C259.375 22.4141 259.32 22.6172 259.211 22.8203L253.727 33.2031L254.172 32.8047C256.016 31.7266 257.531 30.8828 258.719 30.2734C259.906 29.6484 260.852 29.1875 261.555 28.8906C262.102 28.6562 262.555 28.4922 262.914 28.3984C263.273 28.2891 263.516 28.2344 263.641 28.2344C264 28.2344 264.273 28.375 264.461 28.6562C264.664 28.9219 264.766 29.2578 264.766 29.6641C264.766 30.1172 264.633 30.5781 264.367 31.0469C264.117 31.5156 263.727 31.8516 263.195 32.0547C262.273 32.5234 261.164 33.0469 259.867 33.625C258.586 34.1875 257.242 34.8516 255.836 35.6172C254.445 36.3672 253.125 37.2656 251.875 38.3125L247.328 46.5391C246.609 48.2578 245.969 49.4297 245.406 50.0547C244.891 50.6328 244.227 50.9219 243.414 50.9219ZM246.18 33.0625C246.664 33.0625 247.273 32.7656 248.008 32.1719C248.742 31.5625 249.445 30.8516 250.117 30.0391C250.805 29.2266 251.383 28.4531 251.852 27.7188C252.32 26.9844 252.555 26.4609 252.555 26.1484C252.555 25.4609 252.227 24.9453 251.57 24.6016C250.93 24.2578 250.375 24.0859 249.906 24.0859C248.922 24.0859 247.992 24.3984 247.117 25.0234C246.258 25.6328 245.555 26.4375 245.008 27.4375C244.477 28.4219 244.211 29.4688 244.211 30.5781C244.211 31.1094 244.32 31.6562 244.539 32.2188C244.758 32.7812 245.305 33.0625 246.18 33.0625Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_23_13">
<rect width="271" height="56" fill="white"/>
</clipPath>
</defs>
</svg>
`,Df=.7;function Of(e){e.onBeforeCompile=e=>{let t=Qs.lights_fragment_begin.replace(`#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )`,`#if ( 0 > 1 ) && defined( RE_Direct )`);e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_begin>`,t)}}function kf(e,t){let{toonGradientMap:n,doors:r,doorWidth:i,doorHeight:a,doorZ:o,facadeThickness:s,outerWallHalfWidth:c,roomHeight:l,facadeLightLayer:u,exteriorGroup:d}=t,f=.8,p=.3,m=.4,h=.07,g=m*.96,_=s/2+m,v=new xo({color:`#000000`,gradientMap:n});v.userData.outlineParameters={visible:!1},Of(v);let y=s+g,b=o+g/2;function x(){let e=i/2,t=[],n=-c;for(let i of r){let r=i.x-e;r>n&&t.push([n,r]),n=i.x+e}return n<c&&t.push([n,c]),t}for(let[e,t]of x()){let n=new qi(new eo(t-e,a,y),v);n.position.set((e+t)/2,a/2,b),n.layers.set(u),n.castShadow=!0,n.receiveShadow=!0,d.add(n)}let S=l*1.2-a,C=new qi(new eo(c*2,S,y),v);C.position.set(0,a+S/2,b),C.layers.set(u),C.castShadow=!0,C.receiveShadow=!0,d.add(C),m-g;let w=s/2+g;function T(e,t,n,r){let i=[],a=Math.max(1,Math.round((r-n)/p)),o=(r-n)/a,s=.12;for(let r=0;r<a;r++){let a=n+o*(r+.5),c=r%2==0?0:f/2,l=e;for(c>s&&(i.push({x:e+c/2,y:a,width:c}),l=e+c);l<t-s;){let e=Math.min(f,t-l);i.push({x:l+e/2,y:a,width:e}),l+=e}}return i}let E=[];for(let[e,t]of x())E.push(...T(e,t,0,a));E.push(...T(-c,c,a,a+S));let D=new eo(1,p-h,m),O=new xo({color:`#2d1625`,gradientMap:n});O.userData.outlineParameters={thickness:0},Of(O);let k=new ya(D,O,E.length);k.castShadow=!0,k.receiveShadow=!0,k.layers.set(u);let A=new X(O.color),j=new _r,M=new X;E.forEach(({x:e,y:t,width:n},r)=>{let i=w+(.8+Math.random()*.2)*.016000000000000014;j.position.set(e,t+(Math.random()-.5)*.01,o+i-m/2),j.scale.set(n-h,1,1),j.updateMatrix(),k.setMatrixAt(r,j.matrix),M.copy(A).offsetHSL((Math.random()-.5)*.03,(Math.random()-.5)*.15,(Math.random()-.5)*.12),k.setColorAt(r,M)}),k.instanceMatrix.needsUpdate=!0,k.instanceColor&&(k.instanceColor.needsUpdate=!0),d.add(k);let N=o+_+.1,P=a+1.6,F=new vr;F.position.set(0,P,N),d.add(F);let I=378/318,L=Cf(Tf,{width:6,height:I,color:`#ff36a8`,glowColor:`#ff36a8`});F.add(L);let ee=494/600,te=Cf(wf,{width:2,height:ee,color:`#ffffff`,glowColor:`#ff36a8`});I/2+.3+ee/2,te.position.set(0,1.306006289308176,0),te.material[4].color.setScalar(Df),F.add(te);let ne=1.45,re=ne*56/271,ie=Cf(Ef,{width:ne,height:re,color:`#ff36a8`,glowColor:`#ff36a8`}),R=P-I/2-.15-re/2;ie.position.set(0,R,N+.1),ie.material[4].color.setScalar(Df),d.add(ie);let ae=new gs(`#ff36a8`,1,7,2);return ae.position.set(0,a+.3,o+_+.25),ae.layers.set(u),ae.castShadow=!0,ae.shadow.mapSize.set(512,512),ae.shadow.bias=-.002,d.add(ae),{brickFrontLocalZ:_,wordmarkLogo:te,byline:ie,signGroup:F}}var Af=.65;function jf(e,t){return new X(e).lerp(new X(16777215),t)}function Mf(e,t,n){let{doorWidth:r,doorHeight:i,doorZ:a,facadeThickness:o,doorZoneColors:s,doorZoneColorsLight:c,neonPink:l,doorGradientMap:u,toonGradientMap:d,brickFrontLocalZ:f,facadeLightLayer:p,doorLabelAssets:m}=n;function h(t){let n=new vr;n.position.set(t.x-r/2,0,a),e.add(n);let h=s[t.label]??l,g=c[t.label]??l,_=new X(h),v=new xo({color:_,map:u,gradientMap:d});v.userData.outlineParameters={visible:!1},Of(v);let y=new qi(new eo(r,i,o),v);y.position.set(r/2,i/2,0),y.layers.set(p),y.castShadow=!0,y.receiveShadow=!0,n.add(y);let b=new vr;n.add(b);let x=m[t.label],S=Cf(x.svg,{width:x.width,height:x.height,color:g,glowColor:g,depthBiasUnits:-20});S.material[4].color.setScalar(Af),S.position.set(r/2,i*.62,o/2),b.add(S);let C=new xo({color:1710618,gradientMap:d});Of(C);let w=new no(.035,.035,.32,8);[.12,.5,.88].forEach(e=>{let t=new qi(w,C);t.position.set(0,i*e,o/2+.02),t.layers.set(p),t.receiveShadow=!0,b.add(t)});let T=new xo({color:jf(_,.07),gradientMap:d});Of(T);let E=new qi(new no(.04,.04,.14,8),T);E.rotation.x=Math.PI/2,E.position.set(r-.35,i*.5,o/2+.07),E.layers.set(p),b.add(E);let D=new qi(new so(.13,14,10),T);D.position.set(r-.35,i*.5,o/2+.17),D.layers.set(p),D.receiveShadow=!0,b.add(D);let O=jf(g,.4),k=f+.25,A=new Fi({color:O}),j=new Fi({color:O});j.userData.outlineParameters={visible:!1};let M=new qi(new no(.025,.1,k-o/2,6),j),N=.4;M.rotation.x=Math.PI/2,M.position.set(r/2,i+N,o/2),b.add(M);let P=new qi(new so(.15,12,8),A);P.position.set(r/2,i+N,k),b.add(P);let F=new gs(O,12,30,.9);F.position.set(r/2,i+N,k),F.layers.set(p),F.castShadow=!0,F.shadow.mapSize.set(1024,1024),F.shadow.camera.near=.05,F.shadow.bias=-.002,F.shadow.normalBias=.02,F.shadow.intensity=.5,b.add(F);let I=new Fi({color:O,transparent:!0,opacity:.3,depthWrite:!1,blending:2,side:2});I.userData.outlineParameters={visible:!1};let L=new qi(new to(3,28),I);L.rotation.x=-Math.PI/2,L.position.set(r/2,.016,k),b.add(L);let ee=i+N,te=.016,ne=ee-te,re=new Fi({color:O,transparent:!0,opacity:.05,depthWrite:!1,blending:2,side:2});re.userData.outlineParameters={visible:!1};let ie=new qi(new ro(3,ne,32,1,!0),re);ie.position.set(r/2,te+ne/2,k),b.add(ie);let R=new Fi({color:`#1f021a`});R.userData.outlineParameters={visible:!1};let ae=new qi(new oo(r*.8,.3),R);ae.rotation.x=-Math.PI/2,ae.position.set(t.x,.02,a),e.add(ae),t.hinge=n,n.userData.door=t,t.panelMaterial=v,t.baseColor=_,t.exteriorFixtures=b,t.threshold=ae,t.label=S}t.forEach(h)}function Nf(e){return((e+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI}function Pf(e,t){let n=(t-e)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),n}function Ff(e,t){return Math.atan2(e,t)}function If(e){return e*e*(3-2*e)}function Lf(e,t){for(let n of t)if(e<=n.maxDistance)return n;return t[t.length-1]}function Rf({ageMin:e,ageMax:t,halfDepth:n,roomDepth:r}){function i(i){return n-(i-e)/(t-e||1)*r}function a(i){let a=(n-i)/r;return Math.round(e+Math.min(1,Math.max(0,a))*(t-e))}return{ageToZ:i,zToAge:a}}function zf({doors:e,doorZ:t,doorWidth:n,facadeClearance:r,doorPassableOpenAmount:i}){function a(t){let r=e.find(e=>Math.abs(t-e.x)<n/2);return r?r.openAmount>i:!1}return function(e,n){return Math.abs(n-t)<r&&!a(e)&&(n=t+Math.sign(n-t||1)*r),n}}function Bf({zoneXs:e,halfDepth:t,facadeClearance:n,corridorWidth:r}){return function(i,a){let o=e.some(e=>Math.abs(i-e)<r/2);return Math.abs(a-t)<n&&!o&&(a=t+Math.sign(a-t||1)*n),a}}function Vf(e,t,n,r,i,a){r=Math.max(1e-4,r);let o=2/r,s=o*a,c=1/(1+s+.48*s*s+.235*s*s*s),l=t,u=i*r,d=Math.max(-u,Math.min(u,e-t)),f=e-d,p=(n+o*d)*a,m=(n-o*p)*c,h=f+(d+p)*c;return l-e>0==h>l&&(h=l,m=(h-l)/a),{value:h,velocity:m}}function Hf(e,t,{minFov:n=50,maxFov:r=120}={}){let i=2*Math.atan(Math.tan(e)/t);return Math.min(r,Math.max(n,i*180/Math.PI))}function Uf({container:e,getMode:t,getTargetCameraYaw:n,setTargetCameraYaw:r,getTargetCameraPitch:i,setTargetCameraPitch:a,walk:o,getCameraFov:s,dragLookRadiansPerSwipe:c,maxDragPitch:l,dragThresholdPx:u=6}){let d=null,f=null,p=null,m=null,h=null,g=null,_=!1,v=null,y=null,b=!1,x=!1,S=!1;function C(e){t()===`walk`&&(e.preventDefault(),o(e.deltaY))}function w(n){t()===`walk`&&(d=n.clientX,f=n.clientY,h=n.clientX,g=n.clientY,_=!1,e.style.cursor=`grab`)}function T(t){if(d===null)return;!_&&h!==null&&Math.hypot(t.clientX-h,t.clientY-g)>u&&(_=!0);let o=e.getBoundingClientRect(),s=(d-t.clientX)/o.width;r(Nf(n()+s*c)),d=t.clientX;let p=(t.clientY-f)/o.height;a(Math.max(-l,Math.min(l,i()+p*c))),f=t.clientY}function E(){d=null,f=null,e.style.cursor=`all-scroll`}function D(e){if(t()!==`walk`)return;let n=e.touches[0];n&&(v=n.clientX,y=n.clientY,h=n.clientX,g=n.clientY,_=!1,p=n.clientX,m=n.clientY,b=!1,x=!1,S=!1)}function O(t){let i=t.touches[0];if(i){if(t.preventDefault(),!b){let e=i.clientX-v,t=i.clientY-y;(Math.abs(e)>5||Math.abs(t)>5)&&(Math.abs(e)>Math.abs(t)?x=!0:S=!0,b=!0,_=!0)}if(b&&p!==null&&m!==null){let t=i.clientX-p,a=i.clientY-m,l=e.getBoundingClientRect();if(x){let e=-t/l.width;r(Nf(n()+e*c))}else if(S){let e=a/l.height,t=s()/60;o(e*300*t)}}p=i.clientX,m=i.clientY}}function k(){p=null,m=null,v=null,y=null,b=!1,x=!1,S=!1}function A(){e.style.cursor=`all-scroll`,e.addEventListener(`wheel`,C,{passive:!1}),e.addEventListener(`mousedown`,w),e.addEventListener(`mousemove`,T),window.addEventListener(`mouseup`,E),e.addEventListener(`touchstart`,D,{passive:!1}),e.addEventListener(`touchmove`,O,{passive:!1}),e.addEventListener(`touchend`,k),e.addEventListener(`touchcancel`,k)}function j(){e.removeEventListener(`wheel`,C),e.removeEventListener(`mousedown`,w),e.removeEventListener(`mousemove`,T),window.removeEventListener(`mouseup`,E),e.removeEventListener(`touchstart`,D),e.removeEventListener(`touchmove`,O),e.removeEventListener(`touchend`,k),e.removeEventListener(`touchcancel`,k)}return{attach:A,detach:j,get hasDragged(){return _}}}function Wf(e,t,n){let{toonGradientMap:r,outlineDefaultThickness:i,shadowRadius:a,pickModelForPerson:o}=n,s=Array(t.length),c=Array(t.length),l=Array(t.length),u=Array(t.length),d=Array(t.length),f=Array(t.length),p=Array(t.length);t.forEach((t,n)=>{let a=o(t),m=hd(a.scene),h=new xo({color:0,gradientMap:r,flatShading:!0,vertexColors:!0}),g=new xo({gradientMap:r,flatShading:!0,vertexColors:!0});if(h.userData.outlineParameters={thickness:i},g.userData.outlineParameters={thickness:i},m.traverse(e=>{if(e.isMesh){let t=e.material.name;e.material=t===`Body_skin`||t===`Hair`?h:g}}),c[n]=g,p[n]=h,f[n]=new X,e.add(m),s[n]=m,m.userData.personIndex=n,a.walkClip){let e=new Us(m),r=e.clipAction(a.walkClip);r.play();let i=e.clipAction(t.__armsCrossed?a.armsCrossedClip:a.idleClip);i.play(),e.update(t.__animOffsetFraction*a.walkClip.duration),l[n]=e,u[n]=r,d[n]=i}});let m=new to(a,8),h=new Fi({color:0});h.userData.outlineParameters={visible:!1};let g=new ya(m,h,t.length);return e.add(g),{personRoots:s,personBodyMaterials:c,personSkinMaterials:p,personBaseColors:f,personMixers:l,personWalkActions:u,personRestActions:d,shadows:g,placementHelper:new _r,flatRotation:new xn().setFromEuler(new er(-Math.PI/2,0,0))}}var Gf=1e-4;function Kf(e,t,n,r){let{ageToZ:i,zoneWidth:a,halfWidth:o,halfDepth:s,roomDepth:c}=r,l=.85,u=l,d=new Map;function f(e,t){return`${Math.floor(e/u)},${Math.floor(t/u)}`}function p(e,t){let n=Math.floor(e/u),r=Math.floor(t/u);for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++){let o=d.get(`${n+i},${r+a}`);if(o)for(let n of o){let r=n.x-e,i=n.z-t;if(r*r+i*i<l*l)return!1}}return!0}let m=1.5,h=a/2;function g(e,t){return e<0?[-o+t,-h]:e>0?[h,o-t]:[-h,h]}return e.map(e=>{let r=t(e),a=i(n(e)),o,l;for(let e=0;e<40;e++){let t=1+e/40,[n,i]=g(r,m/t);if(o=n+Math.random()*(i-n),l=Math.min(s-m,a+(Math.random()-.5)*(c/40)*t),p(o,l))break}let u=f(o,l);return d.has(u)||d.set(u,[]),d.get(u).push({x:o,z:l}),{x:o,z:l}})}function qf(e,t,n,r){return{waypoints:[{x:e,z:t},{x:n,z:r}],fractions:[0,1]}}function Jf({waypoints:e,fractions:t},n){for(let r=0;r<t.length-1;r++)if(n<=t[r+1]||r===t.length-2){let i=t[r],a=t[r+1],o=a>i?(n-i)/(a-i):0,s=e[r],c=e[r+1];return{x:s.x+(c.x-s.x)*o,z:s.z+(c.z-s.z)*o}}let r=e[e.length-1];return{x:r.x,z:r.z}}function Yf(e,t,n,r=0){e.forEach((e,i)=>{e.__xY1=t[i].x,e.__zY1=t[i].z,e.__xY2=n[i].x,e.__zY2=n[i].z,e.__blendPath=qf(e.__xY1,e.__zY1,e.__xY2,e.__zY2),e.__positionBlend=r;let a=Jf(e.__blendPath,r);e.__x=a.x,e.__z=a.z,e.__blendPathDistance=Math.hypot(e.__xY2-e.__xY1,e.__zY2-e.__zY1),e.__blendMoveActive=!1,e.__blendMoveStartBlend=r,e.__blendMoveStartTime=0,e.__blendMoveTarget=r,e.__offsetX=0,e.__offsetZ=0,e.__heightScale=1+Math.random()*.1,e.__widthScale=.7+Math.random()*.6,e.__facingYaw=Math.random()*Math.PI*2,e.__walkAmount=0,e.__walkSpeed=0,e.__wanderRadius=0+Math.random()*.5,e.__wanderX=0,e.__wanderZ=0,e.__moving=!1,e.__moveFromX=0,e.__moveFromZ=0,e.__moveToX=0,e.__moveToZ=0,e.__moveStart=0,e.__moveDuration=1,e.__nextMoveTime=2+Math.random()*20,e.__moveT=0,e.__animOffsetFraction=Math.random(),e.__breathPhase=Math.random()*Math.PI*2,e.__armsCrossed=Math.random()<.1,e.__voluntaryMoveDx=0,e.__voluntaryMoveDz=0})}function Xf({respondents:e,personRoots:t,personBodyMaterials:n,personSkinMaterials:r,personBaseColors:i,personMixers:a,personWalkActions:o,personRestActions:s,shadows:c,placementHelper:l,flatRotation:u,minimapX:d,minimapZ:f,getRenderWalkX:p,getRenderWalkZ:m,getTargetPositionBlend:h,positionTransitionSpeed:g,blendTurnTime:_,blendTurnGateAngle:v,blendMoveEaseSeconds:y,getClickedPersonIndex:b,getHoveredPersonIndex:x,lodColorBands:S,offsetReturnTime:C,facingTurnTime:w,walkAmountSmoothTime:T,walkSpeedSmoothTime:E,personCellSize:D,collisionRadius:O,pushStrength:k,personCollisionRadius:A,personPushStrength:j,maxOffset:M,faceCameraRadius:N,moveFacingEpsilonSq:P,renderCullDistance:F,walkerScaleCorrection:I,breathingSpeed:L,breathingAmplitude:ee,breathCyclesPerStride:te,walkBreathAmplitudeScale:ne,stepBackHoldFraction:re,minWalkTimescale:ie,maxWalkTimescale:R,walkAnimSpeed:ae,selectedPersonBrightness:oe,hoveredPersonBrightness:se,lodFreezeDistance:ce}){let le=new Map;function ue(e,t){if(e.__moving){let n=(t-e.__moveStart)/e.__moveDuration;if(n>=1)e.__wanderX=e.__moveToX,e.__wanderZ=e.__moveToZ,e.__moving=!1,e.__moveT=0,e.__nextMoveTime=t+Math.random()*20;else{let t=If(Math.max(0,n));e.__wanderX=e.__moveFromX+(e.__moveToX-e.__moveFromX)*t,e.__wanderZ=e.__moveFromZ+(e.__moveToZ-e.__moveFromZ)*t,e.__moveT=Math.max(0,Math.min(1,n))}}else if(t>=e.__nextMoveTime){let n=Math.random()*Math.PI*2,r=Math.random()*e.__wanderRadius;e.__moveFromX=e.__wanderX,e.__moveFromZ=e.__wanderZ,e.__moveToX=Math.cos(n)*r,e.__moveToZ=Math.sin(n)*r,e.__moveStart=t,e.__moveDuration=.7+Math.random()*.8,e.__moving=!0}return[e.__wanderX,e.__wanderZ]}function z(z,de){let fe=p(),pe=m(),me=h(),he=b(),ge=x(),_e=Math.exp(-z/C),ve=1-Math.exp(-z/w),ye=1-Math.exp(-z/T),be=1-Math.exp(-z/E);le.clear();for(let t=0;t<e.length;t++){let n=e[t],r=me-n.__positionBlend,i=Math.abs(r)>Gf;if(i){let e=r>0,t=n.__xY2-n.__xY1,i=n.__zY2-n.__zY1,a=Ff(e?t:-t,e?i:-i),o=1-Math.exp(-z/_);if(n.__facingYaw+=Pf(n.__facingYaw,a)*o,Math.abs(Pf(n.__facingYaw,a))<v){let t=+!!e;(!n.__blendMoveActive||n.__blendMoveTarget!==t)&&(n.__blendMoveActive=!0,n.__blendMoveStartBlend=n.__positionBlend,n.__blendMoveStartTime=de,n.__blendMoveTarget=t);let r=de-n.__blendMoveStartTime,i=Math.max(y,1e-6),a=r<i?g*r*r/(2*i):g*i/2+g*(r-i),o=n.__blendPathDistance>0?Math.min(1,a/n.__blendPathDistance):1;n.__positionBlend=n.__blendMoveStartBlend+(n.__blendMoveTarget-n.__blendMoveStartBlend)*o}}else n.__blendMoveActive=!1;let{x:a,z:o}=Jf(n.__blendPath,n.__positionBlend),s=n.__x+n.__wanderX,c=n.__z+n.__wanderZ;n.__x=a,n.__z=o,n.__offsetX*=_e,n.__offsetZ*=_e,ue(n,de);let l=n.__x+n.__wanderX-s,u=n.__z+n.__wanderZ-c,d=l*l+u*u>P;if(d&&!i){let e=Ff(l,u);n.__facingYaw+=Pf(n.__facingYaw,e)*ve}n.__voluntaryMoveDx=l,n.__voluntaryMoveDz=u,n.__walkAmount+=(+!!d-n.__walkAmount)*ye;let f=z>0?Math.hypot(l,u)/z:0;n.__walkSpeed+=(f-n.__walkSpeed)*be;let p=n.__x+n.__wanderX+n.__offsetX,m=n.__z+n.__wanderZ+n.__offsetZ,h=`${Math.floor(p/D)},${Math.floor(m/D)}`,b=le.get(h);b||le.set(h,b=[]),b.push(t)}for(let p=0;p<e.length;p++){let m=e[p],h=m.__wanderX,g=m.__wanderZ,_=m.__x+h+m.__offsetX,v=m.__z+g+m.__offsetZ,y=_-fe,b=v-pe,x=Math.hypot(y,b);if(x>0&&x<O){let e=(O-x)/O*k*z;m.__offsetX+=y/x*e,m.__offsetZ+=b/x*e}let C=Math.floor(_/D),w=Math.floor(v/D);for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){let r=le.get(`${C+t},${w+n}`);if(r)for(let t of r){if(t===p)continue;let n=e[t],r=n.__x+n.__wanderX+n.__offsetX,i=n.__z+n.__wanderZ+n.__offsetZ,a=_-r,o=v-i,s=Math.hypot(a,o);if(s>0&&s<A){let e=(A-s)/A*j*z;m.__offsetX+=a/s*e,m.__offsetZ+=o/s*e}}}let T=Math.hypot(m.__offsetX,m.__offsetZ);if(T>M){let e=M/T;m.__offsetX*=e,m.__offsetZ*=e}let E=m.__z+g+m.__offsetZ,ue=m.__x+h+m.__offsetX,me=m.__voluntaryMoveDx*m.__voluntaryMoveDx+m.__voluntaryMoveDz*m.__voluntaryMoveDz>P,_e=fe-ue,ye=pe-E,be=_e*_e+ye*ye;if(!me&&be<N*N&&be>P){let e=Ff(_e,ye);m.__facingYaw+=Pf(m.__facingYaw,e)*ve}let xe=m.__facingYaw,B=m.__heightScale,Se=m.__widthScale,Ce=me&&m.__voluntaryMoveDx*Math.sin(xe)+m.__voluntaryMoveDz*Math.cos(xe)<0,we=Math.sqrt(be),Te=Lf(we,S),Ee=we>ce&&!me&&!m.__blendMoveActive&&m.__walkAmount<=.01,V=n[p],De=r[p],H=p===he?oe:p===ge?se:Te.brightness;V.color.copy(i[p]).multiplyScalar(H),V.userData.outlineParameters.thickness=Te.outlineThickness,De.userData.outlineParameters.thickness=Te.outlineThickness;let Oe=a[p],U=o[p],W=Math.min(R,Math.max(ie,m.__walkSpeed/ae));if(Oe&&!Ee){let e=s[p];Ce?(U.paused=!0,U.time=U.getClip().duration*re,U.weight=1,e.weight=0):(U.paused=!1,U.timeScale=m.__walkAmount*W,U.weight=m.__walkAmount,e.weight=1-m.__walkAmount),Oe.update(z)}let ke=t[p];ke.visible=we<=F;let Ae=B*I,je=Se*I,Me=Math.sin(de*L+m.__breathPhase),Ne;if(Oe&&!Ee&&m.__walkAmount>.01){let e=U.getClip().duration,t=U.time/e*Math.PI*2*te,n=Math.sin(t),r=.7,i=r+(W-ie)/(R-ie)*(1.6-r);Ne=(Me*(1-m.__walkAmount)+n*m.__walkAmount*i*ne)*ee}else Ne=Me*ee;ke.position.set(ue,0,E),ke.rotation.y=xe,ke.scale.set(je,Ae*(1+Ne),je),l.quaternion.copy(u),l.position.set(ue,.015,E),l.scale.setScalar(Ee?0:Se),l.updateMatrix(),c.setMatrixAt(p,l.matrix),d[p]=ue,f[p]=E}c.instanceMatrix.needsUpdate=!0}return{update:z}}var Zf=`<svg width="58" height="48" viewBox="0 0 58 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_23_7)">
<path d="M6.5625 27.5859C6.01562 27.5859 5.58594 27.4141 5.27344 27.0703C4.96094 26.7266 4.80469 26.3047 4.80469 25.8047C4.80469 25.3984 5.03906 24.6406 5.50781 23.5312C5.97656 22.4062 6.52344 21.2031 7.14844 19.9219C7.94531 18.25 8.64844 16.8047 9.25781 15.5859C9.86719 14.3516 10.3203 13.4141 10.6172 12.7734C10.9297 12.1016 11.3203 11.6016 11.7891 11.2734C12.2578 10.9453 12.7188 10.7812 13.1719 10.7812C13.5469 10.7812 13.8828 10.9219 14.1797 11.2031C14.4766 11.4688 14.625 11.8672 14.625 12.3984C14.625 12.6016 14.6016 12.8203 14.5547 13.0547C14.5078 13.2891 14.4219 13.5391 14.2969 13.8047C14.7812 13.1953 15.5 12.6016 16.4531 12.0234C17.4062 11.4297 18.4375 10.9375 19.5469 10.5469C20.6562 10.1562 21.6797 9.96094 22.6172 9.96094C23.4453 9.96094 24.1328 10.1641 24.6797 10.5703C25.2422 10.9609 25.5234 11.6328 25.5234 12.5859C25.5234 13.3984 25.3438 14.2812 24.9844 15.2344C24.625 16.1719 24.1953 17.0781 23.6953 17.9531C23.1641 18.875 22.6641 19.6875 22.1953 20.3906C21.7422 21.0781 21.3906 21.6484 21.1406 22.1016C20.9375 22.3516 20.8359 22.6406 20.8359 22.9688C20.8359 23.2812 21 23.4375 21.3281 23.4375C21.4375 23.4375 21.5625 23.4297 21.7031 23.4141C21.8438 23.3828 22.0156 23.2969 22.2188 23.1562C23.3906 22.7188 24.5547 22.1641 25.7109 21.4922C26.8828 20.8203 27.9531 20.125 28.9219 19.4062C29.9062 18.6875 30.6953 18.0547 31.2891 17.5078C31.5391 17.3047 31.7812 17.2031 32.0156 17.2031C32.5781 17.2031 32.8594 17.5625 32.8594 18.2812C32.8594 18.7656 32.7031 19.3047 32.3906 19.8984C32.0938 20.4922 31.6172 21.0469 30.9609 21.5625C29.8203 22.375 28.75 23.1328 27.75 23.8359C26.7656 24.5234 25.7188 25.1484 24.6094 25.7109C23.5 26.2734 22.1797 26.7734 20.6484 27.2109C19.8516 27.4609 19.1719 27.5859 18.6094 27.5859C17.0156 27.5859 16.2188 26.7109 16.2188 24.9609C16.2188 24.8516 16.2188 24.75 16.2188 24.6562C16.2344 24.5469 16.25 24.4297 16.2656 24.3047C16.3125 23.6016 16.5625 22.7891 17.0156 21.8672C17.4688 20.9297 17.9609 20.0078 18.4922 19.1016C19.0234 18.2266 19.5 17.4062 19.9219 16.6406C20.3438 15.875 20.5547 15.3047 20.5547 14.9297C20.5547 14.3672 20.2891 14.0859 19.7578 14.0859C18.7734 14.0859 17.8281 14.375 16.9219 14.9531C16.0312 15.5312 15.1875 16.2656 14.3906 17.1562C13.6094 18.0312 12.8906 18.9531 12.2344 19.9219C11.5781 20.875 11 21.7422 10.5 22.5234C10.1406 23.1172 9.78906 23.8125 9.44531 24.6094C9.11719 25.4062 8.72656 26.1016 8.27344 26.6953C7.83594 27.2891 7.26562 27.5859 6.5625 27.5859ZM32.6016 27.5859C31.9766 27.5859 31.2656 27.4141 30.4688 27.0703C29.6875 26.7422 29.0078 26.2109 28.4297 25.4766C27.8516 24.7422 27.5625 23.7734 27.5625 22.5703C27.5625 21.6016 27.7891 20.4141 28.2422 19.0078C28.7109 17.6016 29.4219 16.2109 30.375 14.8359C31.3438 13.4453 32.5859 12.2891 34.1016 11.3672C35.6172 10.4297 37.375 9.96094 39.375 9.96094C40.1719 9.96094 41.0156 10.1094 41.9062 10.4062C42.8125 10.7031 43.5859 11.2031 44.2266 11.9062C44.8672 12.5938 45.1875 13.5469 45.1875 14.7656C45.1875 15.7656 44.9375 16.9297 44.4375 18.2578C44.7188 18.6016 45.1172 18.7734 45.6328 18.7734C46.1172 18.7734 46.6797 18.5781 47.3203 18.1875C47.9609 17.7969 48.5938 17.3203 49.2188 16.7578C49.8594 16.1953 50.4375 15.6328 50.9531 15.0703C51.4844 14.5078 51.8984 14.0547 52.1953 13.7109C52.3047 13.6016 52.4375 13.5469 52.5938 13.5469C52.9375 13.5469 53.1875 13.7656 53.3438 14.2031C53.5 14.6406 53.4688 15.1953 53.25 15.8672C53.0312 16.5234 52.5234 17.2031 51.7266 17.9062C51.2578 18.4062 50.6797 19.0234 49.9922 19.7578C49.3203 20.4766 48.5859 21.1172 47.7891 21.6797C47.0078 22.2266 46.2109 22.5 45.3984 22.5C44.5703 22.5 43.7891 22.2344 43.0547 21.7031C41.8984 23.5156 40.4297 24.9531 38.6484 26.0156C36.8672 27.0625 34.8516 27.5859 32.6016 27.5859ZM34.6406 23.4844C35.625 23.4844 36.5469 23.1562 37.4062 22.5C38.2656 21.8438 38.9609 21.0156 39.4922 20.0156C40.0234 19.0156 40.2891 17.9922 40.2891 16.9453C40.2891 16.5391 40.2422 16.1172 40.1484 15.6797C40.0703 15.2266 39.8828 14.8516 39.5859 14.5547C39.2891 14.2422 38.8125 14.0859 38.1562 14.0859C37.1875 14.0859 36.2734 14.3984 35.4141 15.0234C34.5547 15.6328 33.8516 16.4297 33.3047 17.4141C32.7734 18.3828 32.5078 19.3984 32.5078 20.4609C32.5078 20.8516 32.5547 21.2891 32.6484 21.7734C32.7422 22.2422 32.9375 22.6484 33.2344 22.9922C33.5469 23.3203 34.0156 23.4844 34.6406 23.4844Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_23_7">
<rect width="58" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`,Qf=`<svg width="129" height="48" viewBox="0 0 129 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_23_10)">
<path d="M8.53125 27.5859C7.51562 27.5859 6.60156 27.3438 5.78906 26.8594C4.99219 26.375 4.59375 25.4609 4.59375 24.1172C4.59375 24.0078 4.64062 23.6953 4.73438 23.1797C4.84375 22.6641 5.03125 22.0078 5.29688 21.2109C5.625 20.2266 6.14062 18.9453 6.84375 17.3672C7.54688 15.7891 8.53906 13.875 9.82031 11.625C10.1484 11.0312 10.5234 10.6094 10.9453 10.3594C11.3828 10.0938 11.8516 9.96094 12.3516 9.96094C12.8516 9.96094 13.3125 10.0859 13.7344 10.3359C14.1562 10.5703 14.3672 10.9141 14.3672 11.3672C14.3672 11.5234 14.3438 11.6719 14.2969 11.8125C14.1875 12.1719 13.8906 12.7266 13.4062 13.4766C12.9375 14.2266 12.4062 15.1094 11.8125 16.125C11.2344 17.0781 10.7109 18.1016 10.2422 19.1953C9.78906 20.2891 9.53906 21.3203 9.49219 22.2891C9.49219 22.5703 9.57031 22.8281 9.72656 23.0625C9.88281 23.2969 10.1406 23.4141 10.5 23.4141C11.5156 23.4141 12.4766 23.1406 13.3828 22.5938C14.3047 22.0312 15.1641 21.3281 15.9609 20.4844C16.7578 19.625 17.4688 18.7188 18.0938 17.7656C18.7188 16.8125 19.2422 15.9375 19.6641 15.1406C20.0547 14.4375 20.3984 13.6875 20.6953 12.8906C20.9922 12.0781 21.3438 11.3828 21.75 10.8047C22.1562 10.2266 22.7031 9.9375 23.3906 9.9375C23.9531 9.9375 24.3984 10.1172 24.7266 10.4766C25.0547 10.8359 25.2188 11.2656 25.2188 11.7656C25.2188 12.1719 24.9922 12.8281 24.5391 13.7344C24.1016 14.625 23.6094 15.5938 23.0625 16.6406C22.4844 17.7344 21.9766 18.8516 21.5391 19.9922C21.1172 21.1172 20.9062 22.1172 20.9062 22.9922C20.9062 23.5547 21.25 23.8359 21.9375 23.8359C22.9844 23.8359 24.3438 23.2969 26.0156 22.2188C26.7969 21.7188 27.5781 21.125 28.3594 20.4375C29.1562 19.75 29.8594 19.0078 30.4688 18.2109L30.7031 21.3984C29.6562 22.6016 28.3906 23.7188 26.9062 24.75C25.4375 25.7656 24.0078 26.5312 22.6172 27.0469C21.1797 27.5938 19.9766 27.7188 19.0078 27.4219C18.0391 27.125 17.5547 26.25 17.5547 24.7969C17.5547 24.0625 17.6797 23.2266 17.9297 22.2891C17.3984 23.0859 16.6875 23.8984 15.7969 24.7266C14.9062 25.5391 13.8516 26.2188 12.6328 26.7656C11.4297 27.3125 10.0625 27.5859 8.53125 27.5859ZM27.1875 27.5859C26.6406 27.5859 26.2109 27.4141 25.8984 27.0703C25.5859 26.7266 25.4297 26.3047 25.4297 25.8047C25.4297 25.3984 25.6641 24.6406 26.1328 23.5312C26.6016 22.4062 27.1484 21.2031 27.7734 19.9219C28.5703 18.25 29.2734 16.8047 29.8828 15.5859C30.4922 14.3516 30.9453 13.4141 31.2422 12.7734C31.5547 12.1016 31.9453 11.6016 32.4141 11.2734C32.8828 10.9453 33.3438 10.7812 33.7969 10.7812C34.1719 10.7812 34.5078 10.9219 34.8047 11.2031C35.1016 11.4688 35.25 11.8672 35.25 12.3984C35.25 12.6016 35.2266 12.8203 35.1797 13.0547C35.1328 13.2891 35.0469 13.5391 34.9219 13.8047C35.4062 13.1953 36.125 12.6016 37.0781 12.0234C38.0312 11.4297 39.0625 10.9375 40.1719 10.5469C41.2812 10.1562 42.3047 9.96094 43.2422 9.96094C44.0703 9.96094 44.7578 10.1641 45.3047 10.5703C45.8672 10.9609 46.1484 11.6328 46.1484 12.5859C46.1484 13.3984 45.9688 14.2812 45.6094 15.2344C45.25 16.1719 44.8203 17.0781 44.3203 17.9531C43.7891 18.875 43.2891 19.6875 42.8203 20.3906C42.3672 21.0781 42.0156 21.6484 41.7656 22.1016C41.5625 22.3516 41.4609 22.6406 41.4609 22.9688C41.4609 23.2812 41.625 23.4375 41.9531 23.4375C42.0625 23.4375 42.1875 23.4297 42.3281 23.4141C42.4688 23.3828 42.6406 23.2969 42.8438 23.1562C44.0156 22.7188 45.1797 22.1641 46.3359 21.4922C47.5078 20.8203 48.5781 20.125 49.5469 19.4062C50.5312 18.6875 51.3203 18.0547 51.9141 17.5078C52.1641 17.3047 52.4062 17.2031 52.6406 17.2031C53.2031 17.2031 53.4844 17.5625 53.4844 18.2812C53.4844 18.7656 53.3281 19.3047 53.0156 19.8984C52.7188 20.4922 52.2422 21.0469 51.5859 21.5625C50.4453 22.375 49.375 23.1328 48.375 23.8359C47.3906 24.5234 46.3438 25.1484 45.2344 25.7109C44.125 26.2734 42.8047 26.7734 41.2734 27.2109C40.4766 27.4609 39.7969 27.5859 39.2344 27.5859C37.6406 27.5859 36.8438 26.7109 36.8438 24.9609C36.8438 24.8516 36.8438 24.75 36.8438 24.6562C36.8594 24.5469 36.875 24.4297 36.8906 24.3047C36.9375 23.6016 37.1875 22.7891 37.6406 21.8672C38.0938 20.9297 38.5859 20.0078 39.1172 19.1016C39.6484 18.2266 40.125 17.4062 40.5469 16.6406C40.9688 15.875 41.1797 15.3047 41.1797 14.9297C41.1797 14.3672 40.9141 14.0859 40.3828 14.0859C39.3984 14.0859 38.4531 14.375 37.5469 14.9531C36.6562 15.5312 35.8125 16.2656 35.0156 17.1562C34.2344 18.0312 33.5156 18.9531 32.8594 19.9219C32.2031 20.875 31.625 21.7422 31.125 22.5234C30.7656 23.1172 30.4141 23.8125 30.0703 24.6094C29.7422 25.4062 29.3516 26.1016 28.8984 26.6953C28.4609 27.2891 27.8906 27.5859 27.1875 27.5859ZM53.8359 27.5859C52.1953 27.5859 50.7031 27.2188 49.3594 26.4844C48.0156 25.7344 47.1562 24.5547 46.7812 22.9453C46.75 22.7891 46.7344 22.6875 46.7344 22.6406C46.7344 22.2188 46.8828 21.8594 47.1797 21.5625C47.4766 21.25 47.8047 21.0938 48.1641 21.0938C48.3359 21.0938 48.5234 21.125 48.7266 21.1875C48.9453 21.25 49.1094 21.3906 49.2188 21.6094C49.625 22.3438 50.3203 22.9375 51.3047 23.3906C52.3047 23.8281 53.2812 24.0469 54.2344 24.0469C55.25 24.0469 56.1328 23.8516 56.8828 23.4609C57.6484 23.0703 58.0312 22.4297 58.0312 21.5391C58.0312 20.4453 57.7188 19.4766 57.0938 18.6328C56.4844 17.7891 55.7109 17.0312 54.7734 16.3594C53.8516 15.6719 52.9219 15.0391 51.9844 14.4609C51.9062 14.4141 51.7891 14.2812 51.6328 14.0625C51.4766 13.8281 51.3984 13.5938 51.3984 13.3594C51.3984 13.1719 51.4453 13.0234 51.5391 12.9141C52.0391 12.2422 52.6797 11.5859 53.4609 10.9453C54.2422 10.3047 55.1016 9.98438 56.0391 9.98438C56.7266 9.98438 57.2891 10.1562 57.7266 10.5C58.1797 10.8281 58.4062 11.1562 58.4062 11.4844C58.4062 11.9219 58.2031 12.3359 57.7969 12.7266C57.3906 13.1016 56.9688 13.4609 56.5312 13.8047C58.3906 14.7734 59.8672 16.0078 60.9609 17.5078C62.0547 18.9922 62.6016 20.4453 62.6016 21.8672C62.6016 23.0703 62.1641 24.1016 61.2891 24.9609C60.4297 25.8047 59.3281 26.4531 57.9844 26.9062C56.6562 27.3594 55.2734 27.5859 53.8359 27.5859ZM66.9375 27.5859C65.9219 27.5859 65.0078 27.3438 64.1953 26.8594C63.3984 26.375 63 25.4609 63 24.1172C63 24.0078 63.0469 23.6953 63.1406 23.1797C63.25 22.6641 63.4375 22.0078 63.7031 21.2109C64.0312 20.2266 64.5469 18.9453 65.25 17.3672C65.9531 15.7891 66.9453 13.875 68.2266 11.625C68.5547 11.0312 68.9297 10.6094 69.3516 10.3594C69.7891 10.0938 70.2578 9.96094 70.7578 9.96094C71.2578 9.96094 71.7188 10.0859 72.1406 10.3359C72.5625 10.5703 72.7734 10.9141 72.7734 11.3672C72.7734 11.5234 72.75 11.6719 72.7031 11.8125C72.5938 12.1719 72.2969 12.7266 71.8125 13.4766C71.3438 14.2266 70.8125 15.1094 70.2188 16.125C69.6406 17.0781 69.1172 18.1016 68.6484 19.1953C68.1953 20.2891 67.9453 21.3203 67.8984 22.2891C67.8984 22.5703 67.9766 22.8281 68.1328 23.0625C68.2891 23.2969 68.5469 23.4141 68.9062 23.4141C69.9219 23.4141 70.8828 23.1406 71.7891 22.5938C72.7109 22.0312 73.5703 21.3281 74.3672 20.4844C75.1641 19.625 75.875 18.7188 76.5 17.7656C77.125 16.8125 77.6484 15.9375 78.0703 15.1406C78.4609 14.4375 78.8047 13.6875 79.1016 12.8906C79.3984 12.0781 79.75 11.3828 80.1562 10.8047C80.5625 10.2266 81.1094 9.9375 81.7969 9.9375C82.3594 9.9375 82.8047 10.1172 83.1328 10.4766C83.4609 10.8359 83.625 11.2656 83.625 11.7656C83.625 12.1719 83.3984 12.8281 82.9453 13.7344C82.5078 14.625 82.0156 15.5938 81.4688 16.6406C80.8906 17.7344 80.3828 18.8516 79.9453 19.9922C79.5234 21.1172 79.3125 22.1172 79.3125 22.9922C79.3125 23.5547 79.6562 23.8359 80.3438 23.8359C81.3906 23.8359 82.75 23.2969 84.4219 22.2188C85.2031 21.7188 85.9844 21.125 86.7656 20.4375C87.5625 19.75 88.2656 19.0078 88.875 18.2109L89.1094 21.3984C88.0625 22.6016 86.7969 23.7188 85.3125 24.75C83.8438 25.7656 82.4141 26.5312 81.0234 27.0469C79.5859 27.5938 78.3828 27.7188 77.4141 27.4219C76.4453 27.125 75.9609 26.25 75.9609 24.7969C75.9609 24.0625 76.0859 23.2266 76.3359 22.2891C75.8047 23.0859 75.0938 23.8984 74.2031 24.7266C73.3125 25.5391 72.2578 26.2188 71.0391 26.7656C69.8359 27.3125 68.4688 27.5859 66.9375 27.5859ZM84.6094 27.5859C83.8281 27.5859 83.4375 27.1875 83.4375 26.3906C83.4375 26.2188 83.4609 26.0078 83.5078 25.7578C83.5703 25.4922 83.6875 25.2031 83.8594 24.8906C84.125 24.3906 84.4141 23.8047 84.7266 23.1328C85.0391 22.4453 85.3672 21.7344 85.7109 21C86.0859 20.2031 86.5156 19.2891 87 18.2578C87.5 17.2109 88.0859 16.0078 88.7578 14.6484C88.5391 14.4609 88.3516 14.2344 88.1953 13.9688C88.0547 13.6875 87.9844 13.3438 87.9844 12.9375C87.9844 12.2031 88.2656 11.6641 88.8281 11.3203C89.4062 10.9609 90.0938 10.7812 90.8906 10.7812C91.6719 10.7812 92.4297 10.9219 93.1641 11.2031C93.9141 11.4688 94.2891 11.875 94.2891 12.4219C94.2891 12.4844 94.2344 12.6328 94.125 12.8672C94.0312 13.0859 93.9844 13.2344 93.9844 13.3125C93.9844 13.3438 93.9922 13.3594 94.0078 13.3594H94.0312L94.0781 13.3359C95.2344 12.6172 96.4766 12.0078 97.8047 11.5078C99.1328 11.0078 100.227 10.7578 101.086 10.7578C101.789 10.7578 102.328 10.9297 102.703 11.2734C103.094 11.6016 103.289 12.1641 103.289 12.9609C103.289 13.1328 103.281 13.3203 103.266 13.5234C103.25 13.7109 103.219 13.9141 103.172 14.1328C103.062 14.7109 102.625 15.4609 101.859 16.3828C101.094 17.3047 100.281 18.1953 99.4219 19.0547C99.0312 19.4453 98.5625 19.9141 98.0156 20.4609C97.4688 20.9922 96.9922 21.4844 96.5859 21.9375C96.1797 22.375 95.9766 22.6719 95.9766 22.8281C95.9766 23.0469 96.0547 23.1562 96.2109 23.1562C97.3359 22.6719 98.6094 22.0781 100.031 21.375C101.453 20.6562 102.828 19.9375 104.156 19.2188C105.484 18.5 106.57 17.8984 107.414 17.4141C107.742 17.2266 108.023 17.1328 108.258 17.1328C108.914 17.1328 109.242 17.4766 109.242 18.1641C109.242 18.5234 109.086 18.9375 108.773 19.4062C108.477 19.8594 107.969 20.3359 107.25 20.8359C106.578 21.2578 105.656 21.8438 104.484 22.5938C103.328 23.3281 102.18 24.0234 101.039 24.6797C99.9141 25.3203 98.8359 25.8672 97.8047 26.3203C96.7891 26.7734 95.9375 27 95.25 27C94.1719 27 93.3594 26.7422 92.8125 26.2266C92.2812 25.7109 92.0156 25.0469 92.0156 24.2344C92.0156 24.0938 92.0234 24 92.0391 23.9531C92.2109 22.9531 92.5703 21.9844 93.1172 21.0469C93.6641 20.1094 94.2344 19.25 94.8281 18.4688C95.4219 17.7031 95.9453 16.9922 96.3984 16.3359C96.8672 15.6797 97.1016 15.1172 97.1016 14.6484C97.1016 14.4141 97.0156 14.2969 96.8438 14.2969C96.5938 14.2969 96.1406 14.4219 95.4844 14.6719C94.8281 14.9062 94.1797 15.2188 93.5391 15.6094C92.8984 16 92.4609 16.4141 92.2266 16.8516C91.9141 17.3984 91.5156 18.1641 91.0312 19.1484C90.5625 20.1172 90.0938 21.1094 89.625 22.125C89.1719 23.1406 88.7891 23.9844 88.4766 24.6562C88.1328 25.5156 87.5625 26.2188 86.7656 26.7656C85.9844 27.3125 85.2656 27.5859 84.6094 27.5859ZM109.805 27.5859C108.555 27.5859 107.484 27.2812 106.594 26.6719C105.719 26.0469 105.047 25.2344 104.578 24.2344C104.125 23.2188 103.898 22.1328 103.898 20.9766C103.898 19.9609 104.188 18.8281 104.766 17.5781C105.359 16.3125 106.203 15.1016 107.297 13.9453C108.391 12.7891 109.695 11.8359 111.211 11.0859C112.742 10.3203 114.406 9.9375 116.203 9.9375C117.5 9.9375 118.469 10.25 119.109 10.875C119.75 11.5 120.07 12.3672 120.07 13.4766C120.07 14.1328 119.898 14.8203 119.555 15.5391C119.211 16.2578 118.617 16.9844 117.773 17.7188C116.93 18.4688 115.797 19.2344 114.375 20.0156C112.969 20.7812 111.203 21.5547 109.078 22.3359C109.25 23.3047 110.031 23.7891 111.422 23.7891C112.5 23.7891 113.664 23.5703 114.914 23.1328C116.164 22.6797 117.367 22.1641 118.523 21.5859C119.68 21.0234 120.672 20.4922 121.5 19.9922C122.328 19.4922 122.82 19.2109 122.977 19.1484C123.117 19.0547 123.242 19 123.352 18.9844C123.477 18.9688 123.586 18.9609 123.68 18.9609C124.055 18.9609 124.312 19.1094 124.453 19.4062C124.609 19.6875 124.688 19.9219 124.688 20.1094C124.688 20.25 124.672 20.4219 124.641 20.625C124.609 20.8125 124.492 21.0312 124.289 21.2812C124.086 21.4844 123.492 21.9297 122.508 22.6172C121.523 23.3047 120.469 23.9688 119.344 24.6094C117.969 25.375 116.438 26.0625 114.75 26.6719C113.062 27.2812 111.414 27.5859 109.805 27.5859ZM108.727 19.6406C109.742 19.1094 110.773 18.4922 111.82 17.7891C112.883 17.0703 113.688 16.5469 114.234 16.2188C114.969 15.75 115.453 15.3359 115.688 14.9766C115.953 14.5859 116.086 14.2578 116.086 13.9922C116.086 13.7578 116.008 13.5703 115.852 13.4297C115.711 13.2891 115.547 13.2031 115.359 13.1719L115.148 13.1484H114.938C114.078 13.1484 113.281 13.3984 112.547 13.8984C111.828 14.3828 111.219 14.9922 110.719 15.7266C110.188 16.4922 109.758 17.2109 109.43 17.8828C109.117 18.5547 108.883 19.1406 108.727 19.6406Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_23_10">
<rect width="129" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`,$f=`<svg width="71" height="48" viewBox="0 0 71 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_23_3)">
<path d="M14.1562 40.8984C13.5312 40.8984 13.0234 40.6875 12.6328 40.2656C12.2422 39.8594 12.0469 39.3047 12.0469 38.6016C12.0469 37.9453 12.125 37.2891 12.2812 36.6328C12.4531 35.9922 12.75 35.2812 13.1719 34.5C13.5781 33.7188 14.1172 32.8438 14.7891 31.875C15.4766 30.9219 16.3359 29.7969 17.3672 28.5L22.0547 19.0078C19.7109 21.7891 17.5859 23.9141 15.6797 25.3828C13.7734 26.8516 11.9922 27.5859 10.3359 27.5859C9.80469 27.5859 9.35156 27.4609 8.97656 27.2109C8.60156 26.9766 8.41406 26.5781 8.41406 26.0156C8.41406 25.2344 8.60156 24.3516 8.97656 23.3672C9.28906 22.6016 9.61719 21.8906 9.96094 21.2344C10.3203 20.5625 10.6875 19.8594 11.0625 19.125C11.4531 18.3438 11.9062 17.3828 12.4219 16.2422C12.9375 15.1016 13.5078 13.7344 14.1328 12.1406C14.4453 11.5312 14.8516 11.0938 15.3516 10.8281C15.8516 10.5469 16.3359 10.4062 16.8047 10.4062C17.2891 10.4062 17.6953 10.5234 18.0234 10.7578C18.3672 10.9766 18.5391 11.2734 18.5391 11.6484C18.5391 11.8516 18.5078 12.0156 18.4453 12.1406L14.1562 21.0703C13.9375 21.5391 13.8281 21.8984 13.8281 22.1484C13.8281 22.3828 13.9219 22.5 14.1094 22.5C14.2812 22.5 14.5 22.4141 14.7656 22.2422C15.0312 22.0703 15.2812 21.875 15.5156 21.6562L25.1953 12.1406C25.9766 11.5156 26.5781 11.1328 27 10.9922C27.4219 10.8516 27.8359 10.7812 28.2422 10.7812C28.5703 10.7812 28.8047 10.9062 28.9453 11.1562C29.0859 11.3906 29.1562 11.6406 29.1562 11.9062C29.1562 12.1094 29.1172 12.3125 29.0391 12.5156L23.7891 23.4609C24.5391 22.8984 25.3984 22.3516 26.3672 21.8203C27.3359 21.2734 28.2812 20.7812 29.2031 20.3438C30.125 19.9062 30.9062 19.5625 31.5469 19.3125C32.1875 19.0469 32.5469 18.9141 32.625 18.9141C33.0156 18.9141 33.3594 19.0625 33.6562 19.3594C33.9531 19.6562 34.1016 20.0312 34.1016 20.4844C34.1016 20.8906 33.9453 21.3203 33.6328 21.7734C33.3359 22.2266 32.8047 22.6641 32.0391 23.0859C31.0547 23.6328 30.1172 24.1406 29.2266 24.6094C28.3516 25.0781 27.6172 25.4766 27.0234 25.8047L25.3594 26.7422C24.6094 27.1797 23.9141 27.6406 23.2734 28.125C22.6484 28.6094 22.0156 29.1484 21.375 29.7422C20.6875 31.5391 20.0391 33.125 19.4297 34.5C18.8359 35.875 18.4688 36.6953 18.3281 36.9609C17.0625 39.5859 15.6719 40.8984 14.1562 40.8984ZM36.1641 27.5859C34.9141 27.5859 33.8438 27.2812 32.9531 26.6719C32.0781 26.0469 31.4062 25.2344 30.9375 24.2344C30.4844 23.2188 30.2578 22.1328 30.2578 20.9766C30.2578 19.9609 30.5469 18.8281 31.125 17.5781C31.7188 16.3125 32.5625 15.1016 33.6562 13.9453C34.75 12.7891 36.0547 11.8359 37.5703 11.0859C39.1016 10.3203 40.7656 9.9375 42.5625 9.9375C43.8594 9.9375 44.8281 10.25 45.4688 10.875C46.1094 11.5 46.4297 12.3672 46.4297 13.4766C46.4297 14.1328 46.2578 14.8203 45.9141 15.5391C45.5703 16.2578 44.9766 16.9844 44.1328 17.7188C43.2891 18.4688 42.1562 19.2344 40.7344 20.0156C39.3281 20.7812 37.5625 21.5547 35.4375 22.3359C35.6094 23.3047 36.3906 23.7891 37.7812 23.7891C38.8594 23.7891 40.0234 23.5703 41.2734 23.1328C42.5234 22.6797 43.7266 22.1641 44.8828 21.5859C46.0391 21.0234 47.0312 20.4922 47.8594 19.9922C48.6875 19.4922 49.1797 19.2109 49.3359 19.1484C49.4766 19.0547 49.6016 19 49.7109 18.9844C49.8359 18.9688 49.9453 18.9609 50.0391 18.9609C50.4141 18.9609 50.6719 19.1094 50.8125 19.4062C50.9688 19.6875 51.0469 19.9219 51.0469 20.1094C51.0469 20.25 51.0312 20.4219 51 20.625C50.9688 20.8125 50.8516 21.0312 50.6484 21.2812C50.4453 21.4844 49.8516 21.9297 48.8672 22.6172C47.8828 23.3047 46.8281 23.9688 45.7031 24.6094C44.3281 25.375 42.7969 26.0625 41.1094 26.6719C39.4219 27.2812 37.7734 27.5859 36.1641 27.5859ZM35.0859 19.6406C36.1016 19.1094 37.1328 18.4922 38.1797 17.7891C39.2422 17.0703 40.0469 16.5469 40.5938 16.2188C41.3281 15.75 41.8125 15.3359 42.0469 14.9766C42.3125 14.5859 42.4453 14.2578 42.4453 13.9922C42.4453 13.7578 42.3672 13.5703 42.2109 13.4297C42.0703 13.2891 41.9062 13.2031 41.7188 13.1719L41.5078 13.1484H41.2969C40.4375 13.1484 39.6406 13.3984 38.9062 13.8984C38.1875 14.3828 37.5781 14.9922 37.0781 15.7266C36.5469 16.4922 36.1172 17.2109 35.7891 17.8828C35.4766 18.5547 35.2422 19.1406 35.0859 19.6406ZM52.5703 27.5859C50.9297 27.5859 49.4375 27.2188 48.0938 26.4844C46.75 25.7344 45.8906 24.5547 45.5156 22.9453C45.4844 22.7891 45.4688 22.6875 45.4688 22.6406C45.4688 22.2188 45.6172 21.8594 45.9141 21.5625C46.2109 21.25 46.5391 21.0938 46.8984 21.0938C47.0703 21.0938 47.2578 21.125 47.4609 21.1875C47.6797 21.25 47.8438 21.3906 47.9531 21.6094C48.3594 22.3438 49.0547 22.9375 50.0391 23.3906C51.0391 23.8281 52.0156 24.0469 52.9688 24.0469C53.9844 24.0469 54.8672 23.8516 55.6172 23.4609C56.3828 23.0703 56.7656 22.4297 56.7656 21.5391C56.7656 20.4453 56.4531 19.4766 55.8281 18.6328C55.2188 17.7891 54.4453 17.0312 53.5078 16.3594C52.5859 15.6719 51.6562 15.0391 50.7188 14.4609C50.6406 14.4141 50.5234 14.2812 50.3672 14.0625C50.2109 13.8281 50.1328 13.5938 50.1328 13.3594C50.1328 13.1719 50.1797 13.0234 50.2734 12.9141C50.7734 12.2422 51.4141 11.5859 52.1953 10.9453C52.9766 10.3047 53.8359 9.98438 54.7734 9.98438C55.4609 9.98438 56.0234 10.1562 56.4609 10.5C56.9141 10.8281 57.1406 11.1562 57.1406 11.4844C57.1406 11.9219 56.9375 12.3359 56.5312 12.7266C56.125 13.1016 55.7031 13.4609 55.2656 13.8047C57.125 14.7734 58.6016 16.0078 59.6953 17.5078C60.7891 18.9922 61.3359 20.4453 61.3359 21.8672C61.3359 23.0703 60.8984 24.1016 60.0234 24.9609C59.1641 25.8047 58.0625 26.4531 56.7188 26.9062C55.3906 27.3594 54.0078 27.5859 52.5703 27.5859Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_23_3">
<rect width="71" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`,Q=[`#ffb200`,`#ff6a5c`,`#9b4dff`,`#b7227e`,`#ff00aa`],ep=[`Demographics & Background`,`Well-Being & Life Satisfaction`,`Mental & Physical Health`,`Mental Health & Stress`,`Financial & Material Stability`,`Character & Virtue`,`Close Social Relationships`,`Religion & Spirituality`,`Childhood & Family Background`,`Personality Traits`,`Civic & Political Views`,`Health & Habits`],$=`#55505f`,tp=`#4a4550`,np={GENDER:{label:`Gender`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`female`,label:`Female`,color:Q[4],values:[`Female`]},{key:`male`,label:`Male`,color:Q[1],values:[`Male`]},{key:`other`,label:`Other`,color:Q[0],values:[`Other`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`,`Prefer not to answer`]}],columns:[`GENDER`]},MARITAL_STATUS:{label:`Marital Status`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`married_partnered`,label:`Married/Partnered`,color:Q[4],values:[`Married`,`Domestic partner`]},{key:`single`,label:`Single`,color:Q[2],values:[`Single/Never been married`]},{key:`divorced_separated`,label:`Divorced/Separated`,color:Q[1],values:[`Divorced`,`Separated`]},{key:`widowed`,label:`Widowed`,color:Q[0],values:[`Widowed`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`MARITAL_STATUS_Y1`,`MARITAL_STATUS_Y2`]},EDUCATION_3:{label:`Education Level`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`elementary_or_less`,label:`K8 or less`,color:Q[1],values:[`Completed elementary education or less (up to 8 years of basic education)`]},{key:`secondary_some_post_secondary`,label:`Some HS or college`,color:Q[2],values:[`Some secondary education, completed secondary education, or some post-secondary`]},{key:`completed_4_year_degree`,label:`4-year degree or more`,color:Q[4],values:[`Completed four years of education beyond high school and/or received a 4-year co`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`EDUCATION_3_Y1`,`EDUCATION_3_Y2`]},EMPLOYMENT:{label:`Employment Status`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`employed`,label:`Employed / Self-Employed`,color:Q[2],values:[`Employed for an employer`,`Self-employed`]},{key:`retired`,label:`Retired`,color:Q[4],values:[`Retired`]},{key:`homemaker`,label:`Homemaker`,color:Q[0],values:[`Homemaker`]},{key:`student`,label:`Student`,color:Q[1],values:[`Student`]},{key:`unemployed`,label:`Unemployed`,color:Q[3],values:[`Unemployed and looking for a job`]},{key:`other`,label:`Other`,color:Q[0],values:[`None of these/Other`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`EMPLOYMENT_Y1`,`EMPLOYMENT_Y2`]},INCOME_FEELINGS:{label:`Feelings About Household Income`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`comfortable`,label:`Comfortable / Getting By`,color:Q[4],values:[`Living comfortably on present income`,`Getting by on present income`]},{key:`struggling`,label:`Finding It Difficult`,color:Q[1],values:[`Finding it difficult on present income`,`Finding it very difficult on present income`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`INCOME_FEELINGS_Y1`,`INCOME_FEELINGS_Y2`]},NUM_CHILDREN:{label:`Number of Children in Household`,parent:`Demographics & Background`,type:`numeric`,valueMap:{None:0},ranges:[{key:`0`,label:`0`,color:Q[0],min:0,max:0},{key:`1_2`,label:`1–2`,color:Q[2],min:1,max:2},{key:`3_plus`,label:`3+`,color:Q[4],min:3,max:30}],columns:[`NUM_CHILDREN_Y1`,`NUM_CHILDREN_Y2`]},NUM_HOUSEHOLD:{label:`Number of Adults in Household`,parent:`Demographics & Background`,type:`numeric`,valueMap:{"96+":96},ranges:[{key:`1`,label:`1`,color:Q[0],min:1,max:1},{key:`2_3`,label:`2–3`,color:Q[2],min:2,max:3},{key:`4_plus`,label:`4+`,color:Q[4],min:4,max:100}],columns:[`NUM_HOUSEHOLD_Y1`]},URBAN_RURAL:{label:`Urban / Rural`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`urban`,label:`Urban (City / Suburb)`,color:Q[4],values:[`A large city`,`A suburb of a large city`]},{key:`rural`,label:`Rural / Small Town`,color:Q[1],values:[`A small town or village`,`A rural area or on a farm`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`URBAN_RURAL_Y1`,`URBAN_RURAL_Y2`]},BORN_COUNTRY:{label:`Born in This Country`,parent:`Demographics & Background`,type:`categorical`,categories:[{key:`born_here`,label:`Born Here`,color:Q[4],values:[`Born in this country`]},{key:`born_abroad`,label:`Born Abroad`,color:Q[1],values:[`Born in another country`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`BORN_COUNTRY_Y1`]},SELFID1:{label:`Race / Ethnicity / Nationality (First)`,parent:`Demographics & Background`,type:`categorical`,needsManualGrouping:!0,note:`101 raw values, each prefixed with country (e.g. "United States: White", "Kenya: Kikuyu") since categories are country-specific. Group by hand, likely per-country or into cross-country themes (e.g. "White", "Indigenous", "Asian").`,categories:[{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`,`Prefer not to answer`]}],columns:[`SELFID1`]},SELFID2:{label:`Race / Ethnicity / Nationality (Second)`,parent:`Demographics & Background`,type:`categorical`,needsManualGrouping:!0,note:`48 raw values, country-specific like SELFID1. "(No other response)" means the respondent gave only one identity (SELFID1).`,categories:[{key:`none`,label:`No Second Identity`,color:Q[2],values:[`(No other response)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`,`Prefer not to answer`]}],columns:[`SELFID2`]},POLITICAL_ID:{label:`Political Party Affiliation`,parent:`Civic & Political Views`,type:`categorical`,needsManualGrouping:!0,note:`172 raw values, each a country-specific party (e.g. "United States: Democratic Party", "Sweden: The Moderate Party"). Group by hand, e.g. per-country or by left/right/center lean.`,categories:[{key:`no_party`,label:`Do Not Feel Close to Any Party`,color:Q[2],values:[`Do not feel close to any party`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`,`Other`]}],columns:[`POLITICAL_ID_Y1`,`POLITICAL_ID_Y2`]},INCOME_DIFF:{label:`Govt. Should Reduce Income Differences`,parent:`Civic & Political Views`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Strongly disagree`,`Somewhat disagree`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Somewhat agree`,`Strongly agree`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`INCOME_DIFF_Y1`]},OBEY_LAW:{label:`The Law Should Always Be Obeyed`,parent:`Civic & Political Views`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Strongly disagree`,`Somewhat disagree`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Somewhat agree`,`Strongly agree`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`OBEY_LAW_Y1`]},SAY_IN_GOVT:{label:`People Like You Have a Say in Government`,parent:`Civic & Political Views`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SAY_IN_GOVT_Y1`,`SAY_IN_GOVT_Y2`]},DISCRIMINATED:{label:`Feel Discriminated Against`,parent:`Civic & Political Views`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Rarely`,color:Q[1],values:[`Never`,`Rarely`]},{key:`often`,label:`Often / Always`,color:Q[4],values:[`Often`,`Always`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`DISCRIMINATED_Y1`,`DISCRIMINATED_Y2`]},AFTER_DEATH:{label:`Believe in Life After Death`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`no`,label:`No`,color:Q[0],values:[`No`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]}],columns:[`AFTER_DEATH_Y1`,`AFTER_DEATH_Y2`]},ATTEND_SVCS:{label:`How Often You Attend Religious Services`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`rarely`,label:`Never / A Few Times a Year`,color:Q[0],values:[`Never`,`A few times a year`]},{key:`monthly`,label:`1–3 Times a Month`,color:Q[2],values:[`One to three times a month`]},{key:`weekly_plus`,label:`Weekly or More`,color:Q[4],values:[`Once a week`,`More than once a week`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`ATTEND_SVCS_Y1`,`ATTEND_SVCS_Y2`]},BELIEVE_GOD_BROAD:{label:`Belief in god(s)?`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`god_belief`,label:`One or more god(s)`,color:Q[2],values:[`One God`,`More than one god`]},{key:`impersonal_spiritual_force`,label:`Impersonal Spiritual Force`,color:Q[0],values:[`An impersonal spiritual force`]},{key:`unsure`,label:`Unsure`,color:Q[1],values:[`Unsure`]},{key:`none_of_these`,label:`No/No answer`,color:Q[3],values:[`None of these`,`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`BELIEVE_GOD_Y1`,`BELIEVE_GOD_Y2`]},BELIEVE_GOD:{label:`Specific belief about god(s)`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`one_god`,label:`One God`,color:Q[2],values:[`One God`]},{key:`more_than_one_god`,label:`More Than One God`,color:Q[4],values:[`More than one god`]},{key:`impersonal_spiritual_force`,label:`Impersonal Spiritual Force`,color:Q[0],values:[`An impersonal spiritual force`]},{key:`unsure`,label:`Unsure`,color:Q[1],values:[`Unsure`]},{key:`none_of_these`,label:`None of These`,color:Q[3],values:[`None of these`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`BELIEVE_GOD_Y1`,`BELIEVE_GOD_Y2`]},COMFORT_REL:{label:`Find Comfort in Religion/Spirituality`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`COMFORT_REL_Y1`,`COMFORT_REL_Y2`]},CONNECTED_REL:{label:`Feel Connected to Religion/Spirituality`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Rarely`,color:Q[1],values:[`Never`,`Rarely`]},{key:`often`,label:`Often / Always`,color:Q[4],values:[`Often`,`Always`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`CONNECTED_REL_Y1`,`CONNECTED_REL_Y2`]},CRITICAL:{label:`Religious Community is Critical of You`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`CRITICAL_Y1`,`CRITICAL_Y2`]},GOD_PUNISH:{label:`Feel God/Spiritual Force is Punishing You`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`GOD_PUNISH_Y1`,`GOD_PUNISH_Y2`]},GROUP_NOT_REL:{label:`Participate in Non-Religious Groups`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`rarely`,label:`Never / A Few Times a Year`,color:Q[0],values:[`Never`,`A few times a year`]},{key:`monthly`,label:`1–3 Times a Month`,color:Q[2],values:[`One to three times a month`]},{key:`weekly_plus`,label:`Weekly or More`,color:Q[4],values:[`Once a week`,`More than once a week`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`GROUP_NOT_REL_Y1`,`GROUP_NOT_REL_Y2`]},LIFE_APPROACH:{label:`Religion Lies Behind Your Approach to Life`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`LIFE_APPROACH_Y1`,`LIFE_APPROACH_Y2`]},LOVED_BY_GOD:{label:`Feel Loved by God/Spiritual Force`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`LOVED_BY_GOD_Y1`,`LOVED_BY_GOD_Y2`]},PRAY_MEDITATE:{label:`How Often You Pray or Meditate`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Sometimes`,color:Q[1],values:[`Never`,`Sometimes`]},{key:`daily`,label:`About Once a Day or More`,color:Q[4],values:[`About once a day`,`More than once a day`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`PRAY_MEDITATE_Y1`,`PRAY_MEDITATE_Y2`]},REL_EXPERIENC:{label:`Had a Profound Religious/Spiritual Experience`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL_EXPERIENC_Y1`,`REL_EXPERIENC_Y2`]},REL_IMPORTANT:{label:`Religion is Important in Your Daily Life`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL_IMPORTANT_Y1`]},REL1:{label:`Religion at Age Twelve`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`christianity`,label:`Christianity`,color:Q[2],values:[`Christianity`]},{key:`islam`,label:`Islam`,color:Q[4],values:[`Islam`]},{key:`hinduism`,label:`Hinduism`,color:Q[0],values:[`Hinduism`]},{key:`buddhism`,label:`Buddhism`,color:Q[1],values:[`Buddhism`]},{key:`judaism`,label:`Judaism`,color:Q[3],values:[`Judaism`]},{key:`none`,label:`No Religion / Atheist / Agnostic`,color:Q[0],values:[`No religion/Atheist/Agnostic`]},{key:`other`,label:`Other Religion`,color:Q[2],values:[`Some other religion`,`Primal, Animist, or Folk religion`,`Umbanda, Candomblé, and other African-derived religions`,`Taoism`,`Spiritism`,`Chinese folk/traditional religion`,`Sikhism`,`Shinto`,`Confucianism`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL1_Y1`]},REL2:{label:`Current Religion`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`christianity`,label:`Christianity`,color:Q[2],values:[`Christianity`]},{key:`islam`,label:`Islam`,color:Q[4],values:[`Islam`]},{key:`hinduism`,label:`Hinduism`,color:Q[0],values:[`Hinduism`]},{key:`buddhism`,label:`Buddhism`,color:Q[1],values:[`Buddhism`]},{key:`judaism`,label:`Judaism`,color:Q[3],values:[`Judaism`]},{key:`none`,label:`No Religion / Atheist / Agnostic`,color:Q[0],values:[`No religion/Atheist/Agnostic`]},{key:`other`,label:`Other Religion`,color:Q[2],values:[`Some other religion`,`Primal, Animist, or Folk religion`,`Umbanda, Candomblé, and other African-derived religions`,`Taoism`,`Spiritism`,`Chinese folk/traditional religion`,`Sikhism`,`Shinto`,`Confucianism`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL2_Y1`,`REL2_Y2`]},RELIGIOUS_AFFILIATION:{label:`Religiously Affiliated vs. Unaffiliated`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`unaffiliated`,label:`No Religion / Atheist / Agnostic`,color:Q[0],values:[`No religion/Atheist/Agnostic`]},{key:`affiliated`,label:`Religiously Affiliated`,color:Q[4],values:[`Christianity`,`Islam`,`Hinduism`,`Buddhism`,`Judaism`,`Some other religion`,`Primal, Animist, or Folk religion`,`Umbanda, Candomblé, and other African-derived religions`,`Taoism`,`Spiritism`,`Chinese folk/traditional religion`,`Sikhism`,`Shinto`,`Confucianism`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL2_Y1`,`REL2_Y2`]},REL3:{label:`Christian Denomination`,parent:`Religion & Spirituality`,type:`categorical`,needsManualGrouping:!0,note:`17 denominations (Catholic, Lutheran, Baptist, Pentecostal, etc). Only asked of Christians (REL2). Consider grouping into Catholic / Mainline Protestant / Evangelical-Pentecostal / Orthodox / Other.`,categories:[{key:`catholic`,label:`Catholic`,color:Q[2],values:[`Catholic`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL3_Y1`,`REL3_Y2`]},REL7:{label:`Atheist, Agnostic, or Neither`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`atheist`,label:`Atheist`,color:Q[2],values:[`Atheist – do not believe in any god`]},{key:`agnostic`,label:`Agnostic`,color:Q[4],values:[`Agnostic – unsure whether a God or gods exist`]},{key:`neither`,label:`Neither`,color:Q[0],values:[`Neither`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL7_Y1`]},REL8:{label:`Spiritual, Religious, Both, or Neither`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`religious`,label:`Religious`,color:Q[2],values:[`Religious`]},{key:`spiritual`,label:`Spiritual`,color:Q[4],values:[`Spiritual`]},{key:`both`,label:`Both`,color:Q[0],values:[`Both`]},{key:`neither`,label:`Neither`,color:Q[1],values:[`Neither`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`REL8_Y1`]},SACRED_TEXTS:{label:`Read or Listen to Sacred Texts`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Sometimes`,color:Q[1],values:[`Never`,`Sometimes`]},{key:`daily`,label:`About Once a Day or More`,color:Q[4],values:[`About once a day`,`More than once a day`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SACRED_TEXTS_Y1`,`SACRED_TEXTS_Y2`]},TELL_BELIEFS:{label:`Tell Others About Your Religion/Spirituality`,parent:`Religion & Spirituality`,type:`categorical`,categories:[{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree`]},{key:`unsure`,label:`Unsure`,color:Q[2],values:[`Unsure`]},{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree`]},{key:`not_relevant_not_religious`,label:`Not Relevant / Not Religious`,color:tp,values:[`Not relevant`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TELL_BELIEFS_Y1`,`TELL_BELIEFS_Y2`]},LIFE_SAT:{label:`Satisfaction With Life as a Whole`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Not at all satisfied with your life":0,"Completely satisfied with your life":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`LIFE_SAT_Y1`,`LIFE_SAT_Y2`]},HAPPY:{label:`How Happy You Usually Feel`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Extremely unhappy":0,"Extremely happy":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`HAPPY_Y1`,`HAPPY_Y2`]},WB_TODAY:{label:`Life Evaluation: Today`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Worst possible":0,"Best possible":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`WB_TODAY_Y1`,`WB_TODAY_Y2`]},WB_FIVEYRS:{label:`Life Evaluation: Five Years From Now`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Worst possible":0,"Best possible":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`WB_FIVEYRS_Y1`,`WB_FIVEYRS_Y2`]},CONTENT:{label:`Content With Friendships and Relationships`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`CONTENT_Y1`,`CONTENT_Y2`]},LIFE_PURPOSE:{label:`Understand Your Purpose in Life`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`LIFE_PURPOSE_Y1`,`LIFE_PURPOSE_Y2`]},WORTHWHILE:{label:`Things You Do Are Worthwhile`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Not at all worthwhile":0,"Completely worthwhile":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`WORTHWHILE_Y1`,`WORTHWHILE_Y2`]},PEACE:{label:`At Peace With Your Thoughts and Feelings`,parent:`Well-Being & Life Satisfaction`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Rarely`,color:Q[1],values:[`Never`,`Rarely`]},{key:`often`,label:`Often / Always`,color:Q[4],values:[`Often`,`Always`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`PEACE_Y1`,`PEACE_Y2`]},HOPE_FUTURE:{label:`Always Remain Hopeful About the Future`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`HOPE_FUTURE_Y1`,`HOPE_FUTURE_Y2`]},EXPECT_GOOD:{label:`Expect More Good Things Than Bad`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`EXPECT_GOOD_Y1`,`EXPECT_GOOD_Y2`]},CAPABLE:{label:`Feel Very Capable in Most Things You Do`,parent:`Well-Being & Life Satisfaction`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Rarely`,color:Q[1],values:[`Never`,`Rarely`]},{key:`often`,label:`Often / Always`,color:Q[4],values:[`Often`,`Always`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`CAPABLE_Y1`,`CAPABLE_Y2`]},FORGIVE:{label:`How Often You Have Forgiven Those Who Hurt You`,parent:`Character & Virtue`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Rarely`,color:Q[1],values:[`Never`,`Rarely`]},{key:`often`,label:`Often / Always`,color:Q[4],values:[`Often`,`Always`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`FORGIVE_Y1`,`FORGIVE_Y2`]},GIVE_UP:{label:`Give Up Happiness Now for Greater Happiness Later`,parent:`Character & Virtue`,type:`numeric`,valueMap:{"Not true of you at all":0,"Completely true of you":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`GIVE_UP_Y1`,`GIVE_UP_Y2`]},GRATEFUL:{label:`Long List of Things You Feel Grateful For`,parent:`Character & Virtue`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`GRATEFUL_Y1`,`GRATEFUL_Y2`]},PROMOTE_GOOD:{label:`Always Act to Promote Good`,parent:`Character & Virtue`,type:`numeric`,valueMap:{"Not true of you at all":0,"Completely true of you":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`PROMOTE_GOOD_Y1`,`PROMOTE_GOOD_Y2`]},HELP_STRANGER:{label:`Helped a Stranger in the Past Month`,parent:`Character & Virtue`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`HELP_STRANGER_Y1`,`HELP_STRANGER_Y2`]},DONATED:{label:`Donated Money to Charity in Past Month`,parent:`Character & Virtue`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`DONATED_Y1`,`DONATED_Y2`]},VOLUNTEERED:{label:`Volunteered Time in Past Month`,parent:`Character & Virtue`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`VOLUNTEERED_Y1`,`VOLUNTEERED_Y2`]},MENTAL_HEALTH:{label:`Self-Rated Mental Health`,parent:`Mental & Physical Health`,type:`numeric`,valueMap:{"Poor mental health":0,"Excellent mental health":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`MENTAL_HEALTH_Y1`,`MENTAL_HEALTH_Y2`]},PHYSICAL_HLTH:{label:`Self-Rated Physical Health`,parent:`Mental & Physical Health`,type:`numeric`,valueMap:{"Poor physical health":0,"Excellent physical health":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`PHYSICAL_HLTH_Y1`,`PHYSICAL_HLTH_Y2`]},HEALTH_PROB:{label:`Health Problems Limit Daily Activities`,parent:`Mental & Physical Health`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`HEALTH_PROB_Y1`,`HEALTH_PROB_Y2`]},BODILY_PAIN:{label:`Bodily Pain in Past 4 Weeks`,parent:`Mental & Physical Health`,type:`categorical`,categories:[{key:`low`,label:`None at All / Not Very Much`,color:Q[1],values:[`None at all`,`Not very much`]},{key:`high`,label:`Some / A Lot`,color:Q[4],values:[`Some`,`A lot`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`BODILY_PAIN_Y1`,`BODILY_PAIN_Y2`]},SUFFERING:{label:`The Extent to Which You Are Suffering`,parent:`Mental & Physical Health`,type:`categorical`,categories:[{key:`low`,label:`Not at All / Not Very Much`,color:Q[1],values:[`Not at all`,`Not very much`]},{key:`high`,label:`Some / A Lot`,color:Q[4],values:[`Some`,`A lot`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SUFFERING_Y1`,`SUFFERING_Y2`]},COVID_DEATH:{label:`Family/Friend Died From COVID-19`,parent:`Mental & Physical Health`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`COVID_DEATH_Y1`]},DEPRESSED:{label:`Feeling Down, Depressed, or Hopeless`,parent:`Mental Health & Stress`,type:`categorical`,categories:[{key:`low`,label:`Not at All / Several Days`,color:Q[1],values:[`Not at all`,`Several days`]},{key:`high`,label:`More Than Half the Days / Nearly Every Day`,color:Q[4],values:[`More than half the days`,`Nearly every day`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`DEPRESSED_Y1`,`DEPRESSED_Y2`]},FEEL_ANXIOUS:{label:`Feeling Nervous, Anxious, or on Edge`,parent:`Mental Health & Stress`,type:`categorical`,categories:[{key:`low`,label:`Not at All / Several Days`,color:Q[1],values:[`Not at all`,`Several days`]},{key:`high`,label:`More Than Half the Days / Nearly Every Day`,color:Q[4],values:[`More than half the days`,`Nearly every day`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`FEEL_ANXIOUS_Y1`,`FEEL_ANXIOUS_Y2`]},CONTROL_WORRY:{label:`Not Able to Stop or Control Worrying`,parent:`Mental Health & Stress`,type:`categorical`,categories:[{key:`low`,label:`Not at All / Several Days`,color:Q[1],values:[`Not at all`,`Several days`]},{key:`high`,label:`More Than Half the Days / Nearly Every Day`,color:Q[4],values:[`More than half the days`,`Nearly every day`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`CONTROL_WORRY_Y1`,`CONTROL_WORRY_Y2`]},LONELY:{label:`How Often You Feel Lonely`,parent:`Mental Health & Stress`,type:`numeric`,valueMap:{Never:0,Always:10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`LONELY_Y1`,`LONELY_Y2`]},THREAT_LIFE:{label:`Bothered by Biggest Threat to Life Witnessed`,parent:`Mental Health & Stress`,type:`categorical`,categories:[{key:`low`,label:`Not at All / Not Very Much`,color:Q[1],values:[`Not at all`,`Not very much`]},{key:`high`,label:`Some / A Lot`,color:Q[4],values:[`Some`,`A lot`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`THREAT_LIFE_Y1`,`THREAT_LIFE_Y2`]},EXPENSES:{label:`Worry About Meeting Monthly Expenses`,parent:`Financial & Material Stability`,type:`numeric`,valueMap:{"Do not ever worry":0,"Worry all of the time":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`EXPENSES_Y1`,`EXPENSES_Y2`]},WORRY_SAFETY:{label:`Worry About Safety, Food, or Housing`,parent:`Financial & Material Stability`,type:`numeric`,valueMap:{"Do not ever worry":0,"Worry all of the time":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`WORRY_SAFETY_Y1`,`WORRY_SAFETY_Y2`]},CIGARETTES:{label:`Cigarettes Smoked Per Day`,parent:`Health & Habits`,type:`numeric`,valueMap:{"None/Do not smoke":0},ranges:[{key:`0`,label:`None`,color:Q[0],min:0,max:0},{key:`1_19`,label:`1–19`,color:Q[2],min:1,max:19},{key:`20_plus`,label:`20+`,color:Q[4],min:20,max:100}],columns:[`CIGARETTES_Y1`,`CIGARETTES_Y2`]},DRINKS:{label:`Alcoholic Drinks in Past 7 Days`,parent:`Health & Habits`,type:`numeric`,valueMap:{"None/Do not drink alcoholic beverages":0,"97+":97},ranges:[{key:`0`,label:`None`,color:Q[0],min:0,max:0},{key:`1_7`,label:`1–7`,color:Q[2],min:1,max:7},{key:`8_plus`,label:`8+`,color:Q[4],min:8,max:100}],columns:[`DRINKS_Y1`,`DRINKS_Y2`]},DAYS_EXERCISE:{label:`Days Exercised in Past Week`,parent:`Health & Habits`,type:`numeric`,valueMap:{"0 days":0,"1 day":1,"2 days":2,"3 days":3,"4 days":4,"5 days":5,"6 days":6,"7 days/Every day":7},ranges:[{key:`0`,label:`0 Days`,color:Q[0],min:0,max:0},{key:`1_4`,label:`1–4 Days`,color:Q[2],min:1,max:4},{key:`5_7`,label:`5–7 Days`,color:Q[4],min:5,max:7}],columns:[`DAYS_EXERCISE_Y1`,`DAYS_EXERCISE_Y2`]},CLOSE_TO:{label:`Know One Special Person You Feel Close To`,parent:`Close Social Relationships`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`CLOSE_TO_Y1`,`CLOSE_TO_Y2`]},SAT_RELATNSHP:{label:`Relationships Are as Satisfying as You Want`,parent:`Close Social Relationships`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`SAT_RELATNSHP_Y1`,`SAT_RELATNSHP_Y2`]},SHOW_LOVE:{label:`Show Someone You Love or Care for Them`,parent:`Close Social Relationships`,type:`numeric`,valueMap:{Never:0,Always:10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`SHOW_LOVE_Y1`,`SHOW_LOVE_Y2`]},PEOPLE_HELP:{label:`Could Count on People to Help if in Trouble`,parent:`Close Social Relationships`,type:`numeric`,valueMap:{Never:0,Always:10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`PEOPLE_HELP_Y1`,`PEOPLE_HELP_Y2`]},BELONGING:{label:`Sense of Belonging in Your Country`,parent:`Close Social Relationships`,type:`numeric`,valueMap:{"Very weak":0,"Very strong":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`BELONGING_Y1`,`BELONGING_Y2`]},TRUST_PEOPLE:{label:`People in This Country Trust One Another`,parent:`Close Social Relationships`,type:`categorical`,categories:[{key:`low`,label:`None / Not Very Many`,color:Q[0],values:[`None`,`Not very many`]},{key:`medium`,label:`Some`,color:Q[2],values:[`Some`]},{key:`high`,label:`Most / All`,color:Q[4],values:[`Most`,`All`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRUST_PEOPLE_Y1`,`TRUST_PEOPLE_Y2`]},FATHER_LOVED:{label:`Felt Loved by Your Father Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`FATHER_LOVED_Y1`]},MOTHER_LOVED:{label:`Felt Loved by Your Mother Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`MOTHER_LOVED_Y1`]},FATHER_RELATN:{label:`Relationship With Your Father Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`good`,label:`Very Good / Somewhat Good`,color:Q[4],values:[`Very good`,`Somewhat good`]},{key:`bad`,label:`Somewhat Bad / Very Bad`,color:Q[1],values:[`Somewhat bad`,`Very bad`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`FATHER_RELATN_Y1`]},MOTHER_RELATN:{label:`Relationship With Your Mother Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`good`,label:`Very Good / Somewhat Good`,color:Q[4],values:[`Very good`,`Somewhat good`]},{key:`bad`,label:`Somewhat Bad / Very Bad`,color:Q[1],values:[`Somewhat bad`,`Very bad`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`MOTHER_RELATN_Y1`]},HEALTH_GROWUP:{label:`Your Health When Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`high`,label:`Excellent / Very Good`,color:Q[4],values:[`Excellent`,`Very good`]},{key:`medium`,label:`Good`,color:Q[2],values:[`Good`]},{key:`low`,label:`Fair / Poor`,color:Q[0],values:[`Fair`,`Poor`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`HEALTH_GROWUP_Y1`]},OUTSIDER:{label:`Felt Like an Outsider in Your Family Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`yes`,label:`Yes`,color:Q[4],values:[`Yes`]},{key:`no`,label:`No`,color:Q[1],values:[`No`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`OUTSIDER_Y1`]},INCOME_12YRS:{label:`Feelings About Household Income Growing Up`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`comfortable`,label:`Lived Comfortably / Got By`,color:Q[1],values:[`Lived comfortably`,`Got by`]},{key:`struggling`,label:`Found It Difficult / Very Difficult`,color:Q[4],values:[`Found it difficult`,`Found it very difficult`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`INCOME_12YRS_Y1`]},SVCS_12YRS:{label:`Religious Attendance at Age Twelve`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Less Than Once a Month`,color:Q[0],values:[`Never`,`Less than once a month`]},{key:`monthly`,label:`1–3 Times a Month`,color:Q[2],values:[`One to three times a month`]},{key:`weekly_plus`,label:`At Least Once a Week`,color:Q[4],values:[`At least once a week`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SVCS_12YRS_Y1`]},SVCS_FATHER:{label:`Father's Religious Attendance When You Were 12`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Less Than Once a Month`,color:Q[0],values:[`Never`,`Less than once a month`]},{key:`monthly`,label:`1–3 Times a Month`,color:Q[2],values:[`One to three times a month`]},{key:`weekly_plus`,label:`At Least Once a Week`,color:Q[4],values:[`At least once a week`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SVCS_FATHER_Y1`]},SVCS_MOTHER:{label:`Mother's Religious Attendance When You Were 12`,parent:`Childhood & Family Background`,type:`categorical`,categories:[{key:`rarely`,label:`Never / Less Than Once a Month`,color:Q[0],values:[`Never`,`Less than once a month`]},{key:`monthly`,label:`1–3 Times a Month`,color:Q[2],values:[`One to three times a month`]},{key:`weekly_plus`,label:`At Least Once a Week`,color:Q[4],values:[`At least once a week`]},{key:`not_applicable`,label:`Not Applicable`,color:tp,values:[`(Does not apply)`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`SVCS_MOTHER_Y1`]},TRAITS1:{label:`Trait Pair: Extroverted, Enthusiastic`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS1_Y1`]},TRAITS2:{label:`Trait Pair: Critical, Quarrelsome`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS2_Y1`]},TRAITS3:{label:`Trait Pair: Dependable, Self-Disciplined`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS3_Y1`]},TRAITS4:{label:`Trait Pair: Anxious, Easily Upset`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS4_Y1`]},TRAITS5:{label:`Trait Pair: Open to New Experiences, Complex`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS5_Y1`]},TRAITS6:{label:`Trait Pair: Reserved, Quiet`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS6_Y1`]},TRAITS7:{label:`Trait Pair: Sympathetic, Warm`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS7_Y1`]},TRAITS8:{label:`Trait Pair: Disorganized, Careless`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS8_Y1`]},TRAITS9:{label:`Trait Pair: Calm, Emotionally Stable`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS9_Y1`]},TRAITS10:{label:`Trait Pair: Conventional, Uncreative`,parent:`Personality Traits`,type:`categorical`,categories:[{key:`disagree`,label:`Disagree`,color:Q[0],values:[`Disagree strongly`,`Disagree moderately`,`Disagree a little`]},{key:`neutral`,label:`Neutral`,color:Q[2],values:[`Neither agree nor disagree`]},{key:`agree`,label:`Agree`,color:Q[4],values:[`Agree a little`,`Agree moderately`,`Agree strongly`]},{key:`no_answer`,label:`No Answer`,color:$,values:[`(Saw, skipped)`,`(Refused)`,`(DK)`]}],columns:[`TRAITS10_Y1`]},FREEDOM:{label:`Freedom to Pursue What's Important to You`,parent:`Well-Being & Life Satisfaction`,type:`numeric`,valueMap:{"Strongly disagree":0,"Strongly agree":10},ranges:[{key:`low`,label:`Low (0–3)`,color:Q[0],min:0,max:3},{key:`mid`,label:`Medium (4–6)`,color:Q[2],min:4,max:6},{key:`high`,label:`High (7–10)`,color:Q[4],min:7,max:10}],columns:[`FREEDOM_Y1`,`FREEDOM_Y2`]}};function rp(e){return np[e]?.columns??[]}function ip(e,t){let n=np[e];if(!n||n.type!==`numeric`||t==null)return null;if(typeof t==`number`)return t;if(t in n.valueMap)return n.valueMap[t];let r=Number(t);return Number.isFinite(r)?r:null}function ap(e,t){let n=np[e];if(!n||n.type!==`numeric`)return null;let r=ip(e,t);return r===null?null:n.ranges.find(e=>r>=e.min&&r<=e.max)??null}function op(e,t){let n=np[e];return!n||n.type!==`categorical`?null:n.categories.find(e=>e.values.includes(t))??null}function sp(){let e=new Map(ep.map(e=>[e,[]]));for(let[t,n]of Object.entries(np))e.has(n.parent)||e.set(n.parent,[]),e.get(n.parent).push({key:t,label:n.label});return ep.map(t=>({parent:t,options:e.get(t)??[]})).filter(e=>e.options.length>0)}var cp=O(`<div class="loading svelte-nzghuw"> </div>`),lp=O(`<option> </option>`),up=O(`<optgroup></optgroup>`),dp=O(`<div class="legend-row svelte-nzghuw"> </div>`),fp=O(`<div class="legend svelte-nzghuw"></div>`),pp=O(`<label class="field svelte-nzghuw"><select class="svelte-nzghuw"></select></label> <!> <div class="button-row svelte-nzghuw"><button>2022-23</button> <button>2024</button></div>`,1),mp=O(`<div><button class="minimap-toggle svelte-nzghuw"> </button></div>`),hp=O(`<div class="panel svelte-nzghuw"><!></div> <!>`,1);function gp(r,a){P(a,!0);let s=E(a,`selectedVariable`,15),c=E(a,`mode`,15),u=E(a,`positionMode`,15);E(a,`currentAge`,3,null);let f=E(a,`loadingMessage`,3,``),m=E(a,`hideMap`,3,!1),h=E(a,`panelHeight`,15,0),y;o(()=>{if(!y)return;let e=new ResizeObserver(()=>{h(y.offsetHeight)});return e.observe(y),()=>e.disconnect()});var b=hp(),x=g(b),C=_(x),D=e=>{var r=cp(),a=_(r,!0);I(r),i(()=>n(a,f())),t(e,r)},O=r=>{var o=pp(),c=g(o),f=_(c);e(f,21,()=>a.variableOptions,e=>e.parent,(r,a)=>{var o=up();e(o,21,()=>d(a).options,e=>e.key,(e,r)=>{var a=lp(),o=_(a,!0);I(a);var s={};i(()=>{n(o,d(r).label),s!==(s=d(r).key)&&(a.value=(a.__value=d(r).key)??``)}),t(e,a)}),I(o),i(()=>S(o,`label`,d(a).parent)),t(r,o)}),I(f),I(c);var m=v(c,2),h=r=>{var o=fp();e(o,21,()=>a.legendData.items,e=>e.label,(e,r)=>{var a=dp();let o;var s=_(a,!0);I(a),i(()=>{o=k(a,``,o,{background:d(r).color}),n(s,d(r).label)}),t(e,a)}),I(o),t(r,o)};p(m,e=>{a.legendData?.kind===`categorical`&&e(h)});var y=v(m,2),b=_(y);let x;var C=v(b,2);let w;I(y),i(()=>{x=T(b,1,`mode-toggle svelte-nzghuw`,null,x,{active:u()===`Y1`}),w=T(C,1,`mode-toggle svelte-nzghuw`,null,w,{active:u()===`Y2`})}),N(f,s),l(`click`,b,()=>u(`Y1`)),l(`click`,C,()=>u(`Y2`)),t(r,o)};p(C,e=>{f()?e(D):e(O,-1)}),I(x),F(x,e=>y=e,()=>y);var A=v(x,2),j=e=>{var r=mp();let a;var o=_(r),s=_(o,!0);I(o),I(r),i(()=>{a=T(r,1,`minimap svelte-nzghuw`,null,a,{"topdown-active":c()===`topdown`}),n(s,c()===`walk`?`Top-down view`:`Back to walk view`)}),l(`click`,o,()=>c(c()===`walk`?`topdown`:`walk`)),t(e,r)};p(A,e=>{!f()&&!m()&&e(j)}),t(r,b),w()}s([`click`]);var _p=O(`<span class="statValue svelte-1p42i08">None</span>`),vp=O(`<span class="pip pip--filled svelte-1p42i08"></span>`),yp=O(`<div class="pipRow svelte-1p42i08" role="img"></div>`),bp=O(`<span class="rangeBarValue rangeBarValue--inside svelte-1p42i08"> </span>`),xp=O(`<span class="rangeBarValue rangeBarValue--outside svelte-1p42i08"> </span>`),Sp=O(`<div class="rangeBar svelte-1p42i08" role="img"><div class="rangeBarFill svelte-1p42i08"><!></div> <!></div>`),Cp=O(`<span class="statValue svelte-1p42i08"> </span>`),wp=O(`<div class="stat svelte-1p42i08"><span class="statLabel svelte-1p42i08"> </span> <!></div>`),Tp=O(`<div class="waveHed svelte-1p42i08"> </div> <!>`,1),Ep=O(`<div class="wave-toggle-row svelte-1p42i08"><button>2022-23</button> <button>2024</button></div> <p class="narrative svelte-1p42i08"> </p> <div class="stat svelte-1p42i08"><span class="statLabel svelte-1p42i08"> </span> <span class="statValue svelte-1p42i08"> </span></div> <!>`,1),Dp=O(`<div role="dialog" aria-label="Respondent details" tabindex="-1"><button class="detailsClose svelte-1p42i08">Close panel</button> <div class="modalData svelte-1p42i08"><!></div> <div class="fixed_spacer svelte-1p42i08"></div></div>`);function Op(r,a){P(a,!0);let o=E(a,`wave`,15,`Y1`),s=D(()=>a.person!=null),u=sp();function f(e,t){let n=rp(e);return n.length<=1?n[0]??null:n.find(e=>e.endsWith(`_${t}`))??null}function m(e,t,n){let r=a.person?.[n];if(r==null||r===``)return`—`;if(t.type===`categorical`)return op(e,r)?.label??String(r);if(t.type===`numeric`){let t=ip(e,r);return String(t===null?r:t)}return String(r)}function h(e){let t=[...e.ranges].sort((e,t)=>e.min-t.min),n=t[t.length-1],r=t[t.length-2];return r&&n.max-n.min>(r.max-r.min||1)*3?n.min:n.max}function y(e){if(e.type!==`numeric`||!e.ranges?.length)return null;let t=Math.min(...e.ranges.map(e=>e.min)),n=h(e);return n>t?{min:t,max:n}:null}function x(e,t){return Math.max(0,Math.min(1,(e-t.min)/(t.max-t.min)))}function C(e,t){return t.parent===`Health & Habits`||e===`NUM_CHILDREN`||e===`NUM_HOUSEHOLD`}let O=D(()=>a.person?.[o()===`Y1`?`AGE_Y1`:`AGE_Y2`]??null),A=D(()=>o()===`Y1`?`2022-23`:`2024`);function j(e){return e===`Male`?`man`:e===`Female`?`woman`:`person`}function M(e,t){if(!e)return``;let n=j(e.GENDER),r=e[t===`Y1`?`AGE_Y1`:`AGE_Y2`],i=f(`MARITAL_STATUS`,t),a=i?op(`MARITAL_STATUS`,e[i])?.label:null,o=f(`EMPLOYMENT`,t),s=o?op(`EMPLOYMENT`,e[o])?.label:null,c=f(`AFTER_DEATH`,t),l=c?op(`AFTER_DEATH`,e[c])?.label:null,u=`This is a`;typeof r==`number`&&(u+=` ${r}-year-old`),u+=` ${n}`;let d=[a,s].filter(Boolean).map(e=>e.toLowerCase());return d.length>0&&(u+=` who is ${d.join(` and `)}`),u+=`.`,l&&(u+=` In ${t===`Y1`?`2022-23`:`2024`}, they ${l===`Yes`?`believe`:l===`No`?`do not believe`:`are unsure whether`} there is life after death.`),u}let N=D(()=>M(a.person,o()));var F=Dp();let ee;var te=_(F),ne=v(te,2),re=_(ne),ie=r=>{var s=Ep(),h=g(s),b=_(h);let w;var E=v(b,2);let j;I(h);var M=v(h,2),P=_(M,!0);I(M);var F=v(M,2),ee=_(F),te=_(ee);I(ee);var ne=v(ee,2),re=_(ne,!0);I(ne),I(F),e(v(F,2),17,()=>u,L,(r,s)=>{let l=D(()=>d(s).options.filter(({key:e})=>{let t=f(e,o());return t&&a.person[t]!=null&&a.person[t]!==``}));var u=c(),h=g(u),b=r=>{var u=Tp(),h=g(u),b=_(h,!0);I(h),e(v(h,2),17,()=>d(l),L,(r,s)=>{let l=()=>d(s).key,u=()=>d(s).label,h=D(()=>np[l()]),b=D(()=>f(l(),o())),w=D(()=>C(l(),d(h))),T=D(()=>d(w)?null:y(d(h))),E=D(()=>d(w)||d(T)?ip(l(),a.person[d(b)]):null);var O=wp(),A=_(O),j=_(A,!0);I(A);var M=v(A,2),N=n=>{var r=c(),a=g(r),o=e=>{t(e,_p())},s=n=>{var r=yp();e(r,21,()=>({length:d(E)}),L,(e,n)=>{t(e,vp())}),I(r),i(()=>S(r,`aria-label`,d(E))),t(n,r)};p(a,e=>{d(E)===0?e(o):e(s,-1)}),t(n,r)},P=e=>{let r=D(()=>x(d(E),d(T)));var a=Sp(),o=_(a),s=_(o),c=e=>{var r=bp(),a=_(r,!0);I(r),i(e=>n(a,e),[()=>m(l(),d(h),d(b))]),t(e,r)};p(s,e=>{d(r)>=.22&&e(c)}),I(o);var u=v(o,2),f=e=>{var a=xp(),o=_(a,!0);I(a),i(e=>{k(a,`left: ${d(r)*100}%`),n(o,e)},[()=>m(l(),d(h),d(b))]),t(e,a)};p(u,e=>{d(r)<.22&&e(f)}),I(a),i(e=>{S(a,`aria-label`,`${e??``} of ${d(T).min??``} to ${d(T).max??``}`),k(o,`width: ${d(r)*100}%`)},[()=>m(l(),d(h),d(b))]),t(e,a)},F=e=>{var r=Cp(),a=_(r,!0);I(r),i(e=>n(a,e),[()=>m(l(),d(h),d(b))]),t(e,r)};p(M,e=>{d(w)&&d(E)!==null?e(N):d(T)&&d(E)!==null?e(P,1):e(F,-1)}),I(O),i(()=>n(j,u())),t(r,O)}),i(()=>n(b,d(s).parent)),t(r,u)};p(h,e=>{d(l).length>0&&e(b)}),t(r,u)}),i(()=>{w=T(b,1,`wave-toggle svelte-1p42i08`,null,w,{active:o()===`Y1`}),j=T(E,1,`wave-toggle svelte-1p42i08`,null,j,{active:o()===`Y2`}),n(P,d(N)),n(te,`Age (${d(A)??``})`),n(re,d(O)??`—`)}),l(`click`,b,()=>o(`Y1`)),l(`click`,E,()=>o(`Y2`)),t(r,s)};p(re,e=>{a.person&&e(ie)}),I(ne),b(2),I(F),i(()=>ee=T(F,1,`shelf svelte-1p42i08`,null,ee,{shelfopen:d(s)})),l(`click`,F,e=>e.stopPropagation()),l(`mousedown`,F,e=>e.stopPropagation()),l(`keydown`,F,e=>e.stopPropagation()),l(`click`,te,function(...e){a.onclose?.apply(this,e)}),t(r,F),w()}s([`click`,`mousedown`,`keydown`]);var kp=O(`<canvas></canvas>`);function Ap(e,n){P(n,!0);let a=E(n,`mode`,15),s=E(n,`hidden`,3,!1),c=E(n,`panelClear`,3,0),u,d=.85,f=`rgba(255, 255, 255, 0.3)`;function p(e){return e===`topdown`?{left:22,top:16}:{left:0,top:0}}let m=null,h=0,g=1,_=1,v=null,y=null;function b(e){m=e;let t=e.halfDepth+e.exteriorDepth;h=-e.halfDepth;let n=t-h;g=120/e.roomWidth,_=240/n}function x(e){return(e+m.halfWidth)*g}function C(e){return(e-h)*_}function D({walkerX:e,walkerZ:t,walkerYaw:n,currentAge:r,minimapX:i,minimapZ:o,personColorCSS:s,respondentCount:c,selectedPersonIndex:l=null}){if(!m||!u)return;let{zoneWidth:h,ageMin:b,ageMax:S,ageToZ:w,bgColorCss:T}=m,E=u.getContext(`2d`),D=a()===`topdown`,{left:O,top:k}=p(a()),A=120+O+O+3,j=240+k+3+16,M=Math.min(u.width/A,u.height/j),N=(u.width-A*M)/2,P=(u.height-j*M)/2;E.setTransform(M,0,0,M,N,P),E.fillStyle=T,E.fillRect(0,0,A,j),E.save(),E.translate(3,3);let F=Math.max(13,Math.min(13,window.innerWidth/100)),I=e=>e*(u.width/u.clientWidth||1)/M,L=I(F),ee=I(1),te=D?I(1.5):2;E.strokeStyle=f,E.lineWidth=ee;let ne=Math.ceil(b/10)*10,re=Math.floor(S/10)*10;D&&(E.textAlign=`right`,E.textBaseline=`middle`,E.fillStyle=`rgba(255, 255, 255, 0.6)`,E.font=`${L}px monospace`);for(let e=ne;e<=re;e+=10){let t=k+C(w(e));E.beginPath(),E.moveTo(O,t),E.lineTo(O+120,t),E.stroke(),D&&E.fillText(String(e),O-5,t)}if(D){E.textAlign=`center`,E.textBaseline=`alphabetic`,E.fillStyle=`rgba(255, 255, 255, 0.85)`;let e=L*1.3;E.font=`${e}px monospace`;let t=g*h,n=Math.max(E.measureText(`No`).width,E.measureText(`Unsure`).width,E.measureText(`Yes`).width);n>t*.85&&(e*=t*.85/n,E.font=`${e}px monospace`);let r=k-3;E.fillText(`No`,O+x(-h),r),E.fillText(`Unsure`,O+x(0),r),E.fillText(`Yes`,O+x(h),r)}E.save(),E.translate(O,k),E.fillStyle=f;for(let e of[-h/2,h/2]){let t=x(e);E.fillRect(t-ee/2,0,ee,240)}for(let e=0;e<c;e++){let t=x(i[e]),n=C(o[e]);E.fillStyle=s[e],E.beginPath(),E.arc(t,n,d,0,Math.PI*2),E.fill()}if(y!==null&&y<c){let e=x(i[y]),t=C(o[y]);E.fillStyle=`rgba(255, 255, 255, 0.9)`,E.beginPath(),E.arc(e,t,d*2.2,0,Math.PI*2),E.fill(),E.fillStyle=s[y],E.beginPath(),E.arc(e,t,d*1.5,0,Math.PI*2),E.fill()}if(l!==null&&l<c){let e=x(i[l]),t=C(o[l]);E.strokeStyle=`#ffffff`,E.lineWidth=I(2),E.beginPath(),E.arc(e,t,d*2.8,0,Math.PI*2),E.stroke()}let ie=C(t);E.fillStyle=`#ffffff`,E.fillRect(0,ie-te/2,120,te);let R=x(e);if(n!==void 0){let e=Math.sin(n),t=-Math.cos(n),r=e*g,i=t*_,a=Math.hypot(r,i)||1;r/=a,i/=a;let o=R+r*26,s=ie+i*26,c=-i*10,l=r*10,u=E.createLinearGradient(R,ie,o,s);u.addColorStop(0,`rgba(255, 255, 255, 0.6)`),u.addColorStop(1,`rgba(255, 255, 255, 0)`),E.fillStyle=u,E.beginPath(),E.moveTo(R,ie),E.lineTo(o+c,s+l),E.lineTo(o-c,s-l),E.closePath(),E.fill()}if(E.fillStyle=`rgba(254, 253, 254,1)`,E.beginPath(),E.arc(R,ie,3,0,Math.PI*2),E.fill(),r!=null){E.font=`bold ${L*1.15}px monospace`,E.textAlign=`center`,E.textBaseline=`top`,E.lineJoin=`round`,E.strokeStyle=`rgba(0, 0, 0, 0.9)`,E.lineWidth=2,E.fillStyle=`rgba(255, 255, 255, 0.95)`;let e=ie+6,t=`Age ${r}`;E.strokeText(t,60,e),E.fillText(t,60,e)}E.restore(),E.restore(),v={scale:M,offsetX:N,offsetY:P,axisLeftMargin:O,axisTopMargin:k,minimapX:i,minimapZ:o,respondentCount:c}}function O(){let e=Math.min(window.devicePixelRatio,2),t=Math.round(u.clientWidth*e),n=Math.round(u.clientHeight*e);t===0||n===0||(u.width=t,u.height=n)}function k(){if(a()!==`topdown`){u.style.width=``,u.style.top=``,u.style.height=``,u.style.cursor=``,y=null;return}let{left:e,top:t}=p(`topdown`),r=(120+e*2+3)/(240+t+3+16),i=n.container.clientWidth,o=Math.max(0,n.container.clientHeight-c()-44),s=o*r,l=o;s>i&&(s=i,l=i/r),u.style.top=`${c()}px`,u.style.height=`${l}px`,u.style.width=`${s}px`}o(()=>{a(),c(),u&&n.container&&k()});function A(e,t){if(!v||!m)return null;let{scale:n,offsetX:r,offsetY:i,axisLeftMargin:a,axisTopMargin:o,minimapX:s,minimapZ:c,respondentCount:l}=v,d=u.getBoundingClientRect(),f=(e-d.left)/d.width*u.width,p=(t-d.top)/d.height*u.height,h=(f-r)/n-3-a,g=(p-i)/n-3-o,_=null,y=9;for(let e=0;e<l;e++){let t=x(s[e])-h,n=C(c[e])-g,r=t*t+n*n;r<y&&(y=r,_=e)}return _}function M(e){a()===`topdown`&&(y=A(e.clientX,e.clientY),u.style.cursor=y===null?`default`:`pointer`)}function N(){a()===`topdown`&&(y=null,u.style.cursor=`default`)}function I(e,t){let n=u.getBoundingClientRect();return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom}j(()=>{let e=new ResizeObserver(O);return e.observe(u),()=>e.disconnect()}),o(()=>{if(!n.container)return;let e=new ResizeObserver(k);return e.observe(n.container),()=>e.disconnect()});var L={init:b,draw:D,containsPoint:I},ee=kp();let te;return F(ee,e=>u=e,()=>u),i(()=>{te=T(ee,1,`minimap-canvas svelte-gvtsny`,null,te,{"topdown-active":a()===`topdown`}),S(ee,`hidden`,s())}),l(`click`,ee,e=>{if(a()!==`topdown`){a(`topdown`);return}let t=A(e.clientX,e.clientY);t!==null&&n.onPersonClick?.(t)}),l(`mousemove`,ee,M),r(`mouseleave`,ee,N),t(e,ee),w(L)}s([`click`,`mousemove`]);var jp=O(`<p></p>`),Mp=O(`<div></div>`),Np=O(`<div class="debug-panel svelte-1fv6f9y"><div> </div> <div> </div> <div> </div> <div> </div> <div> </div> <button type="button" class="svelte-1fv6f9y"> </button></div>`),Pp=O(`<div><!> <!> <!> <!></div> <!>`,1);function Fp(r,a){P(a,!0);let s=te(`/data/people.json`),c=te(`/assets/app/bodies_clothes/`),m=[c+`base_mesh_246_tri_walking_m_athletic_v1.glb`,c+`base_mesh_246_tri_walking_m_athletic_v2.glb`,c+`base_mesh_246_tri_walking_m_average_v1.glb`,c+`base_mesh_246_tri_walking_m_average_v2.glb`,c+`base_mesh_246_tri_walking_m_broad_v1.glb`,c+`base_mesh_246_tri_walking_m_broad_v2.glb`,c+`base_mesh_246_tri_walking_m_heavyset_v1.glb`,c+`base_mesh_246_tri_walking_m_heavyset_v2.glb`,c+`base_mesh_246_tri_walking_m_short_stocky_v1.glb`,c+`base_mesh_246_tri_walking_m_short_stocky_v2.glb`,c+`base_mesh_246_tri_walking_m_slim_v1.glb`,c+`base_mesh_246_tri_walking_m_slim_v2.glb`,c+`base_mesh_246_tri_walking_m_tall_lanky_v1.glb`,c+`base_mesh_246_tri_walking_m_tall_lanky_v2.glb`,c+`base_mesh_246_tri_walking_m_wiry_v1.glb`,c+`base_mesh_246_tri_walking_m_wiry_v2.glb`],y=[c+`base_mesh_246_tri_walking_f_athletic_v1.glb`,c+`base_mesh_246_tri_walking_f_athletic_v2.glb`,c+`base_mesh_246_tri_walking_f_curvy_v1.glb`,c+`base_mesh_246_tri_walking_f_curvy_v2.glb`,c+`base_mesh_246_tri_walking_f_heavyset_v1.glb`,c+`base_mesh_246_tri_walking_f_heavyset_v2.glb`,c+`base_mesh_246_tri_walking_f_pear_v1.glb`,c+`base_mesh_246_tri_walking_f_pear_v2.glb`,c+`base_mesh_246_tri_walking_f_petite_v1.glb`,c+`base_mesh_246_tri_walking_f_petite_v2.glb`,c+`base_mesh_246_tri_walking_f_slim_v1.glb`,c+`base_mesh_246_tri_walking_f_slim_v2.glb`,c+`base_mesh_246_tri_walking_f_stocky_v1.glb`,c+`base_mesh_246_tri_walking_f_stocky_v2.glb`,c+`base_mesh_246_tri_walking_f_tall_lanky_v1.glb`,c+`base_mesh_246_tri_walking_f_tall_lanky_v2.glb`],b=983053,x=`#${b.toString(16).padStart(6,`0`)}`,S={No:`rgb(69, 50, 7)`,Unsure:`#3e1f42`,Yes:`#53043d`},E={No:`rgb(255, 179, 1)`,Unsure:`#8c19c6`,Yes:`#fd08a8`},O=2.4,A=.6,N=A/2+.4,re=1.2,ie=Math.PI*.8,R=[{x:-6.666666666666666,label:`No`,openAmount:0},{x:0,label:`Unsure`,openAmount:0},{x:10-10/3,label:`Yes`,openAmount:0}],ae=1.6;function se(e,t,n){let r=t/n,i=1*r<=ae?1:ae/r;return{svg:e,width:i*r,height:i}}let ce={No:se(Zf,58,48),Unsure:se(Qf,129,48),Yes:se($f,71,48)},ue=2.7,de=.005,fe=[{maxDistance:5,brightness:1,outlineThickness:de},{maxDistance:12,brightness:.7,outlineThickness:de*.8},{maxDistance:26,brightness:.5,outlineThickness:de*.6},{maxDistance:1/0,brightness:.3,outlineThickness:de*.5}],me=2*Math.PI/5,he=2*.9,ge=Math.PI/2,_e=60*Math.PI/180,ve=typeof window<`u`&&window.innerWidth<=640?-4*Math.PI/180:2*Math.PI/180,ye=-6*Math.PI/180,be=.35,xe=Math.PI*.7,B=.4;-15+B,15-B;let Se=typeof window<`u`?new URLSearchParams(window.location.search):null,Ce=Se?.has(`debug`)??!1,we=Ce?Se.get(`variable`):null,Te=Ce?Se.get(`age`):null,Ee=Math.PI/9,V=M(`walk`),De=M(u(we??`AFTER_DEATH`)),H=M(`Y2`);o(()=>{let e=d(De),t=d(U);if(!Ce)return;let n=new URL(window.location.href);n.searchParams.set(`variable`,e),t!==null&&n.searchParams.set(`age`,t.toFixed(1)),window.history.replaceState({},``,n)});let Oe=M(null),U=M(null),W=M(u([])),ke=M(!1),Ae=M(!1),je=M(!1),Me=M(u({x:0,z:0,yawDeg:0,pitchDeg:0,fov:0,age:null,mode:``,insideRoom:!1,autoWalking:!1,selectedVariable:``})),Ne=M(!1);function Pe(e){return`x=${e.x.toFixed(2)} z=${e.z.toFixed(2)} yaw=${e.yawDeg.toFixed(1)} pitch=${e.pitchDeg.toFixed(1)} fov=${e.fov.toFixed(1)} age=${e.age?.toFixed(1)??`—`} mode=${e.mode} insideRoom=${e.insideRoom} autoWalking=${e.autoWalking} selectedVariable=${e.selectedVariable}`}async function Fe(){await navigator.clipboard.writeText(Pe(d(Me))),C(Ne,!0),setTimeout(()=>C(Ne,!1),1200)}let Ie=D(()=>d(ke)||!d(je)),Le=D(()=>d(Ae)||!d(je)),Re=M(0),ze=D(()=>d(Ie)?0:d(Re)),Be=M(`Loading people…`),Ve=M(null),He=M(null),Ue=null;o(()=>{d(V)===`topdown`&&(C(Ve,null),C(He,null))});let We=M(void 0),Ge,Ke=sp();j(()=>{let e=!1,t=()=>{};function n(e){return new Promise((t,n)=>{new _d().load(e,t,void 0,n)})}(async()=>{let[i,a,o]=await Promise.all([fetch(s),Promise.all(m.map(n)),Promise.all(y.map(n))]),c=await i.json(),l=c.rows.map(e=>{let t={};for(let n=0;n<c.columns.length;n++)t[c.columns[n]]=e[n];return t});if(e)return;let u=()=>{},d=h(()=>{u=r(l,a,o)});t=()=>{u(),d()},C(Be,``)})();function r(e,t,n){function r(e,t){return new Vo(`BindPose`,1,t.tracks.map(t=>{let n=t.name.lastIndexOf(`.`),r=e.getObjectByName(t.name.slice(0,n))[t.name.slice(n+1)],i=typeof r.toArray==`function`?r.toArray():[r];return new t.constructor(t.name,[0],i)}))}function i(e){e.computeBoundingBox();let t=e.boundingBox.min.y,n=e.boundingBox.max.y-t||1,r=e.attributes.position,i=new Float32Array(r.count*3);for(let e=0;e<r.count;e++){let a=Math.min(1,Math.max(0,(r.getY(e)-t)/n/2)),o=0+1*(a*a*(3-2*a));i[e*3]=o,i[e*3+1]=o,i[e*3+2]=o}e.setAttribute(`color`,new oi(i,3))}function a(e){e.scene.traverse(e=>{e.isMesh&&(e.geometry.deleteAttribute(`normal`),e.geometry.deleteAttribute(`uv`),e.geometry=pd(e.geometry),e.geometry.computeVertexNormals(),i(e.geometry))});let t=e.animations.find(e=>e.name===`Walk`)??e.animations[0],n=e.animations.find(e=>e.name===`Idle`)??(t&&r(e.scene,t)),a=n;return{scene:e.scene,walkClip:t,idleClip:n,armsCrossedClip:a}}let s=t.map(a),c=n.map(a),l=[...s,...c];function u(e){return e.GENDER===`Male`?s[Math.floor(Math.random()*s.length)]:e.GENDER===`Female`?c[Math.floor(Math.random()*c.length)]:l[Math.floor(Math.random()*l.length)]}let f=new Hr().setFromObject(l[0].scene).getSize(new J).y,p=f>0?2/f:1,m=e=>e===`No`||e===`Unsure`||e===`Yes`,h=e.filter(e=>m(e.AFTER_DEATH_Y1)&&typeof e.AGE_Y1==`number`&&m(e.AFTER_DEATH_Y2)&&typeof e.AGE_Y2==`number`),g=h.flatMap(e=>[e.AGE_Y1,e.AGE_Y2]),_=Math.min(...g)-1,v=Math.max(...g),{ageToZ:y,zToAge:w}=Rf({ageMin:_,ageMax:v,halfDepth:125,roomDepth:250});function T(){return Ft<-10/2?`no`:Ft>10/2?`yes`:`unsure`}let k=null;function j(){if(d(U)===null){C(W,[],!0),C(ke,!1),C(Ae,!1),k=null;return}let e=T(),t=[],n=!1,r=!1,i=null,a=e=>{for(let a of e??[])d(U)>=Number(a.age)&&d(U)<Number(a.age_end)&&(t.push(a.text),(a.hide_panel===`true`||a.hide_panel===!0)&&(n=!0),(a.hide_map===`true`||a.hide_map===!0)&&(r=!0),!i&&(a.var_color||a.wave)&&(i=a))};a(ne.all),a(ne[e]),C(W,t,!0),C(ke,n,!0),C(Ae,r,!0),i?i!==k&&(C(De,i.var_color||`AFTER_DEATH`,!0),C(H,i.wave===`1`?`Y1`:`Y2`,!0),k=i):(k&&(C(De,`AFTER_DEATH`),C(H,`Y2`)),k=null)}let M=e=>e===`No`?-1:+(e===`Yes`),P={ageToZ:y,zoneWidth:10,halfWidth:15,halfDepth:125,roomDepth:250};Yf(h,Kf(h,e=>M(e.AFTER_DEATH_Y1),e=>e.AGE_Y1,P),Kf(h,e=>M(e.AFTER_DEATH_Y2),e=>e.AGE_Y2,P),+(d(H)===`Y2`));let F=d(We).clientWidth,I=d(We).clientHeight,L=new Dr;L.background=new X(b),L.fog=new Er(b,5,50);let ee=new vr;L.add(ee);let te=Math.max(...R.map(e=>Math.abs(e.x)))+O/2,ae=Math.atan(te/12)*1.15,oe=e=>Hf(ae,e),se=oe(16/9);function B(e,t){let n=Math.tan(bn.degToRad(e/2))/Math.tan(bn.degToRad(se/2));return Math.min(n,t)}let Se=F/I,we=new fs(oe(Se),Se,.1,800);we.layers.enable(1);let Ne=new fd({antialias:!0});Ne.setPixelRatio(Math.min(window.devicePixelRatio,2)),Ne.setSize(F,I,!1),Ne.domElement.classList.add(`webgl-canvas`),Ne.shadowMap.enabled=!0,Ne.shadowMap.type=2,d(We).appendChild(Ne.domElement);let Pe=new vf(Ne,{defaultThickness:de,defaultColor:[0,0,0],defaultKeepAlive:!0}),Fe=new Float32Array(h.length),Ie=new Float32Array(h.length),Le=Array(h.length).fill(x);Ge.init({bgColorCss:x,roomWidth:30,halfWidth:15,zoneWidth:10,halfDepth:125,exteriorDepth:16,ageMin:_,ageMax:v,ageToZ:y});let Re=new bs(16777215,0);L.add(Re);let ze=new ys(16109488,4.8);ze.position.set(0,1,-1),L.add(ze),L.add(ze.target),ze.castShadow=!0,ze.shadow.mapSize.set(4096,4096),ze.shadow.radius=3,ze.shadow.bias=-.0015,ze.shadow.normalBias=.02;let Be=new J(0,1,-1).normalize(),Ke=ze.shadow.camera;Ke.left=-20,Ke.right=20,Ke.top=60,Ke.bottom=-60,Ke.near=1,Ke.far=120,Ke.updateProjectionMatrix();let qe=new ys(6969994,1.8);qe.position.set(.6,.4,1),L.add(qe);let Je=new gs(`#cbb8ff`,1.2,10,2);L.add(Je);let Ye=document.createElement(`canvas`);Ye.width=2,Ye.height=1;let Xe=Ye.getContext(`2d`);[15,215].forEach((e,t)=>{Xe.fillStyle=`rgb(${e}, ${e}, ${e})`,Xe.fillRect(t,0,1,1)});let Ze=new Xa(Ye);Ze.minFilter=z,Ze.magFilter=z,Ze.generateMipmaps=!1;function Qe(e,t){let n=document.createElement(`canvas`);n.width=1,n.height=128;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,0,n.height);i.addColorStop(0,e),i.addColorStop(1,t),r.fillStyle=i,r.fillRect(0,0,n.width,n.height);let a=new Xa(n);return a.wrapS=le,a.wrapT=le,a.colorSpace=Ot,a.generateMipmaps=!1,a.minFilter=pe,a.magFilter=pe,a}let $e=Qe(`rgb(255, 255, 255)`,`rgb(110, 110, 110)`),et=Qe(`rgb(255, 255, 255)`,`rgb(150, 150, 150)`),tt=R.map(e=>e.x),nt=new vr;nt.name=`exterior`,L.add(nt);let{backWall:rt,leftWall:it,rightWall:at,innerWallMeshes:ot}=xf(L,ee,{toonGradientMap:Ze,wallGradientMap:$e,roomWidth:30,roomHeight:50,roomDepth:250,halfWidth:15,halfDepth:125,outerWallHalfWidth:15,exteriorDepth:16,zoneWidth:10,wallThickness:.5,facadeThickness:A,corridorWidth:ue,zoneXs:tt,ageMin:_,ageMax:v,ageToZ:y,exteriorGroup:nt}),{brickFrontLocalZ:st,wordmarkLogo:ct,byline:lt,signGroup:ut}=kf(L,{toonGradientMap:Ze,doors:R,doorWidth:O,doorHeight:4,doorZ:125,facadeThickness:A,outerWallHalfWidth:15,roomHeight:50,facadeLightLayer:1,exteriorGroup:nt});Mf(L,R,{doorWidth:O,doorHeight:4,doorZ:125,facadeThickness:A,doorZoneColors:S,doorZoneColorsLight:E,neonPink:`#ff8dce`,doorGradientMap:et,toonGradientMap:Ze,brickFrontLocalZ:st,facadeLightLayer:1,doorLabelAssets:ce});function dt(){let e=B(we.fov,1.5),t=B(we.fov,1.2);ut.scale.set(e,e,1),lt.scale.set(e,e,1);for(let e of R)e.label.scale.set(t,t,1)}dt();function ft(e){let t=1-Math.exp(-e/.35);for(let e of R){let n=Ft-e.x,r=It-125,i=n*n+r*r<re*re;e.openAmount+=(+!!i-e.openAmount)*t,e.hinge.rotation.y=e.openAmount*ie}}let pt=.02;function mt(){let e=R.every(e=>e.openAmount<pt);nt.visible=!(d(je)&&e);for(let e of R){let t=d(je)&&e.openAmount<pt;e.exteriorFixtures.visible=!t,e.threshold.visible=!t}}function ht(){!Lt&&It<=125&&(Lt=!0,zt=!1)}let gt=zf({doors:R,doorZ:125,doorWidth:O,facadeClearance:N,doorPassableOpenAmount:.5}),_t=Bf({zoneXs:tt,halfDepth:125,facadeClearance:N,corridorWidth:ue}),{personRoots:vt,personBodyMaterials:yt,personSkinMaterials:bt,personBaseColors:xt,personMixers:St,personWalkActions:Ct,personRestActions:wt,shadows:Tt,placementHelper:Et,flatRotation:Dt}=Wf(ee,h,{toonGradientMap:Ze,outlineDefaultThickness:de,shadowRadius:.4,pickModelForPerson:u}),kt=Xf({respondents:h,personRoots:vt,personBodyMaterials:yt,personSkinMaterials:bt,personBaseColors:xt,personMixers:St,personWalkActions:Ct,personRestActions:wt,shadows:Tt,placementHelper:Et,flatRotation:Dt,minimapX:Fe,minimapZ:Ie,getRenderWalkX:()=>Ft,getRenderWalkZ:()=>It,getTargetPositionBlend:()=>d(wn),positionTransitionSpeed:3,blendTurnTime:.06,blendTurnGateAngle:Ee,blendMoveEaseSeconds:.2,getClickedPersonIndex:()=>d(He),getHoveredPersonIndex:()=>un,lodColorBands:fe,offsetReturnTime:.6,facingTurnTime:.8,walkAmountSmoothTime:.4,walkSpeedSmoothTime:.05,personCellSize:.8,collisionRadius:1.1,pushStrength:12,personCollisionRadius:.8,personPushStrength:3,maxOffset:1.6,faceCameraRadius:3.5,moveFacingEpsilonSq:1e-6,renderCullDistance:50,walkerScaleCorrection:p,breathingSpeed:me,breathingAmplitude:.022,breathCyclesPerStride:2,walkBreathAmplitudeScale:.6,stepBackHoldFraction:.15,minWalkTimescale:.8,maxWalkTimescale:8,walkAnimSpeed:.54,selectedPersonBrightness:4,hoveredPersonBrightness:1.8,lodFreezeDistance:5});function At(e){let t=rp(e);return t.find(e=>e.endsWith(`_${d(H)}`))??t[0]}function jt(e){let t=np[e],n=At(e),r=new X(`#cccccc`),i=`#${r.getHexString()}`,a=t.type===`numeric`?t=>ap(e,t[n]):t=>op(e,t[n]);C(Oe,{kind:`categorical`,items:(t.type===`numeric`?t.ranges:t.categories).map(e=>({label:e.label,color:e.color}))},!0);for(let e=0;e<h.length;e++){let t=a(h[e]);t?(xt[e].set(t.color),Le[e]=t.color):(xt[e].copy(r),Le[e]=i)}}o(()=>{jt(d(De))});let Mt=Te!==null&&Te!==``?y(Number(Te)):null,Nt=0,Pt=Mt??(Ce?122:137),Ft=Nt,It=Pt,Lt=Mt!==null,Rt=null,zt=!1,Bt=0,Vt=0,Ht=0,G=ve,K=0,Ut=ve,Wt=0;function Gt(e,t,n){if(d(V)!==`walk`||!Lt)return;let r=Math.max(-45,Math.min(45,n))*.02;Nt=Math.min(14.6,Math.max(-14.6,Nt+e*r)),Pt=Math.min(138,Math.max(-122,Pt+t*r)),Pt=gt(Nt,Pt),Pt=_t(Nt,Pt)}function Kt(e){Gt(Math.sin(Ht),-Math.cos(Ht),e)}function qt(e){Gt(Math.cos(Ht),Math.sin(Ht),e)}let Jt=new Gs,Yt=new q,Xt=[rt,it,at,...ot,...R.map(e=>e.hinge)];function Zt(e){return Ge.containsPoint(e.clientX,e.clientY)}function Qt(e){Nt=e.x,Rt=121,zt=!0,Bt=0,Vt=0}function $t(e){if(d(je)||d(V)!==`walk`||xn.hasDragged||Zt(e))return;let t=d(We).getBoundingClientRect();Yt.x=(e.clientX-t.left)/t.width*2-1,Yt.y=-((e.clientY-t.top)/t.height)*2+1,Jt.setFromCamera(Yt,we);let n=Jt.intersectObjects(R.map(e=>e.hinge),!0);if(n.length===0)return;let r=n[0].object;for(;r&&!r.userData.door;)r=r.parent;let i=r&&r.userData.door;i&&Qt(i)}function en(e){C(Ve,h[e],!0),C(He,e,!0)}Ue=en;function tn(e){if(d(V)!==`walk`||!d(je)||xn.hasDragged||Zt(e))return;let t=d(We).getBoundingClientRect();Yt.x=(e.clientX-t.left)/t.width*2-1,Yt.y=-((e.clientY-t.top)/t.height)*2+1,Jt.setFromCamera(Yt,we);let n=Jt.intersectObjects([...vt.filter(e=>e.visible),...Xt],!0);if(n.length===0)return;let r=n[0].object;for(;r&&r.userData.personIndex===void 0;)r=r.parent;let i=r?.userData.personIndex;i!==void 0&&en(i)}function nn(e){let t=d(We).getBoundingClientRect();Yt.x=(e.clientX-t.left)/t.width*2-1,Yt.y=-((e.clientY-t.top)/t.height)*2+1,Jt.setFromCamera(Yt,we);let n=Jt.intersectObjects([ct,lt],!0);if(n.length===0)return null;let r=n[0].object;for(;r&&r!==ct&&r!==lt;)r=r.parent;return r===ct||r===lt?r:null}function rn(e){if(d(V)!==`walk`||xn.hasDragged||Zt(e))return;let t=nn(e);t===ct?window.open(`https://pudding.cool/`,`_blank`,`noopener,noreferrer`):t===lt&&window.open(`https://pudding.cool/author/alvin-chang/`,`_blank`,`noopener,noreferrer`)}function an(e){if(d(V)!==`topdown`)return;let t=Ne.domElement.getBoundingClientRect();e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom&&C(V,`walk`)}let on=null;function sn(e){on!==e&&(on&&on.material[4].color.setScalar(Df),on=e,on&&on.material[4].color.setScalar(1))}let cn=null;function ln(e){cn!==e&&(cn&&cn.label.material[4].color.setScalar(Af),cn=e,cn&&cn.label.material[4].color.setScalar(2.4))}let un=null;function dn(e){if(pn=-1,d(V)!==`walk`||e.buttons!==0||Zt(e)){sn(null),ln(null),un=null,d(We).style.cursor=`all-scroll`;return}let t=nn(e);if(sn(t),t){ln(null),un=null,d(We).style.cursor=`pointer`;return}let n=d(We).getBoundingClientRect();if(Yt.x=(e.clientX-n.left)/n.width*2-1,Yt.y=-((e.clientY-n.top)/n.height)*2+1,Jt.setFromCamera(Yt,we),!d(je)){un=null;let e=Jt.intersectObjects(R.map(e=>e.hinge),!0)[0]?.object??null;for(;e&&!e.userData.door;)e=e.parent;ln(e?.userData.door??null),d(We).style.cursor=e?.userData.door?`pointer`:`all-scroll`;return}ln(null);let r=Jt.intersectObjects([...vt.filter(e=>e.visible),...Xt],!0)[0]?.object??null;for(;r&&r.userData.personIndex===void 0;)r=r.parent;let i=r?.userData.personIndex;un=i===void 0?null:i,d(We).style.cursor=i===void 0?`all-scroll`:`pointer`}let fn=[...R,ct,lt],pn=-1;function mn(){let e=fn[pn];e===ct||e===lt?(ln(null),sn(e??null)):(sn(null),ln(e??null))}function hn(){let e=fn[pn];e&&(e===ct?window.open(`https://pudding.cool/`,`_blank`,`noopener,noreferrer`):e===lt?window.open(`https://pudding.cool/author/alvin-chang/`,`_blank`,`noopener,noreferrer`):Qt(e))}let gn=new Set;function _n(e){if(e.key===`Tab`&&!d(je)&&d(V)===`walk`){e.preventDefault();let t=e.shiftKey?-1:1;pn=(pn+t+fn.length)%fn.length,mn();return}if(e.key===`Enter`&&pn!==-1){e.preventDefault(),hn();return}if(e.key.startsWith(`Arrow`))e.preventDefault(),!d(je)&&d(V)===`walk`&&!e.repeat&&(e.key===`ArrowRight`||e.key===`ArrowDown`?(pn=(pn+1+fn.length)%fn.length,mn()):(e.key===`ArrowLeft`||e.key===`ArrowUp`)&&(pn=(pn-1+fn.length)%fn.length,mn())),gn.add(e.key);else if(e.key===` `){if(e.preventDefault(),e.repeat)return;C(V,d(V)===`walk`?`topdown`:`walk`,!0)}}function vn(e){e.key.startsWith(`Arrow`)&&gn.delete(e.key)}function yn(){gn.clear()}let xn=Uf({container:d(We),getMode:()=>d(V),getTargetCameraYaw:()=>Ht,setTargetCameraYaw:e=>{Ht=e},getTargetCameraPitch:()=>G,setTargetCameraPitch:e=>{G=e},walk:Kt,getCameraFov:()=>we.fov,dragLookRadiansPerSwipe:ge,maxDragPitch:_e});xn.attach(),d(We).addEventListener(`click`,$t),d(We).addEventListener(`click`,tn),d(We).addEventListener(`click`,rn),d(We).addEventListener(`click`,an),d(We).addEventListener(`mousemove`,dn),window.addEventListener(`keydown`,_n),window.addEventListener(`keyup`,vn),window.addEventListener(`blur`,yn);let Sn=new fs;function Cn(){let e=K,t=Ut,n=new J(Math.sin(e)*Math.cos(t),Math.sin(t),-Math.cos(e)*Math.cos(t));return Sn.position.set(Ft,he,It),Sn.up.set(0,1,0),Sn.lookAt(Ft+n.x,he+n.y,It+n.z),{position:Sn.position.clone(),quaternion:Sn.quaternion.clone()}}function Y(){ze.target.position.set(Ft,0,It),ze.position.copy(Be).multiplyScalar(-60).add(ze.target.position);let e=Cn();we.position.copy(e.position),we.quaternion.copy(e.quaternion),Je.position.copy(we.position)}let wn=D(()=>+(d(H)===`Y2`));function Tn(){let e=Ne.domElement.clientWidth,t=Ne.domElement.clientHeight;e===0||t===0||(we.aspect=e/t,d(V)===`walk`&&!Lt&&(we.fov=oe(e/t),dt()),we.updateProjectionMatrix(),Ne.setSize(e,t,!1),Pe.setSize(e,t,!1))}let En=new ResizeObserver(Tn);En.observe(Ne.domElement),kt.update(0,0);let Dn,On=performance.now(),kn=0;function An(){Dn=requestAnimationFrame(An);let e=performance.now(),t=Math.min(.1,(e-On)/1e3);On=e,kn+=t;let n=250*t;if(gn.has(`ArrowUp`)&&Kt(n),gn.has(`ArrowDown`)&&Kt(-n),gn.has(`ArrowRight`)&&qt(n),gn.has(`ArrowLeft`)&&qt(-n),Rt!==null&&Math.abs(Ft-Nt)<.4&&(Pt=Rt,Rt=null,Ht=0),zt){let e=Vf(Ft,Nt,Bt,be,9,t),n=Vf(It,Pt,Vt,be,9,t);Ft=e.value,It=n.value,Bt=e.velocity,Vt=n.velocity;let r=Math.sign(Pf(K,Ht))*Math.min(Math.abs(Pf(K,Ht)),xe*t);K=Nf(K+r)}else{let e=1-Math.exp(-t/.1);Ft+=(Nt-Ft)*e,It+=(Pt-It)*e,K=Ht}let r=1-Math.exp(-t/.6);Wt+=((It<=125?ye:0)-Wt)*r,Ut=G+Wt,ht(),kt.update(t,kn),Y(),ft(t),C(U,w(It),!0),!d(je)&&It<=125&&pn!==-1&&(pn=-1,mn()),C(je,It<=125),Ce&&C(Me,{x:Ft,z:It,yawDeg:bn.radToDeg(K),pitchDeg:bn.radToDeg(Ut),fov:we.fov,age:d(U),mode:d(V),insideRoom:d(je),autoWalking:zt,selectedVariable:d(De)},!0),mt(),j(),zt?Ne.render(L,we):Pe.render(L,we),Ge.draw({walkerX:Ft,walkerZ:It,walkerYaw:K,currentAge:d(U),minimapX:Fe,minimapZ:Ie,personColorCSS:Le,respondentCount:h.length,selectedPersonIndex:d(He)})}function jn(){let e=new Hr().setFromObject(ct),t=new J((e.min.x+e.max.x)/2,e.max.y,(e.min.z+e.max.z)/2);function n(e){let n=new J(Math.sin(K)*Math.cos(e),Math.sin(e),-Math.cos(K)*Math.cos(e));return we.position.set(Ft,he,It),we.up.set(0,1,0),we.lookAt(Ft+n.x,he+n.y,It+n.z),we.updateMatrixWorld(!0),(1-t.clone().project(we).y)/2*I}if(n(Ut)>=0)return;let r=Ut,i=Ut+Math.PI/3;for(let e=0;e<20&&n(i)<20;e++)i+=Math.PI/12;for(let e=0;e<30;e++){let e=(r+i)/2;n(e)<20?r=e:i=e}G=i,Ut=i}return jn(),An(),()=>{cancelAnimationFrame(Dn),En.disconnect(),xn.detach(),d(We).removeEventListener(`click`,$t),d(We).removeEventListener(`click`,tn),d(We).removeEventListener(`click`,rn),d(We).removeEventListener(`click`,an),d(We).removeEventListener(`mousemove`,dn),window.removeEventListener(`keydown`,_n),window.removeEventListener(`keyup`,vn),window.removeEventListener(`blur`,yn),Ne.dispose(),L.traverse(e=>{Array.isArray(e.material)?e.material.forEach(e=>e.dispose?.()):e.material&&e.material.dispose?.(),e.geometry&&e.geometry.dispose?.()}),d(We).removeChild(Ne.domElement)}}return()=>{e=!0,t()}});var qe=Pp(),Je=g(qe);let Ye;var Xe=_(Je),Ze=e=>{gp(e,{get variableOptions(){return Ke},get legendData(){return d(Oe)},get currentAge(){return d(U)},get loadingMessage(){return d(Be)},get hideMap(){return d(Le)},get selectedVariable(){return d(De)},set selectedVariable(e){C(De,e,!0)},get mode(){return d(V)},set mode(e){C(V,e,!0)},get positionMode(){return d(H)},set positionMode(e){C(H,e,!0)},get panelHeight(){return d(Re)},set panelHeight(e){C(Re,e,!0)}})};p(Xe,e=>{d(Ie)||e(Ze)});var Qe=v(Xe,2),$e=n=>{var r=Mp();let a;e(r,21,()=>d(W),L,(e,n)=>{var r=jp();f(r,()=>d(n),!0),I(r),t(e,r)}),I(r),i(()=>a=T(r,1,`story-overlay`,null,a,{no_map:d(Le)})),ee(3,r,()=>oe),t(n,r)};p(Qe,e=>{d(W).length>0&&e($e)});var et=v(Qe,2);F(Ap(et,{get container(){return d(We)},get hidden(){return d(Le)},get panelClear(){return d(ze)},onPersonClick:e=>Ue?.(e),get mode(){return d(V)},set mode(e){C(V,e,!0)}}),e=>Ge=e,()=>Ge);var tt=v(et,2),nt=e=>{var r=Np(),a=_(r),o=_(a);I(a);var s=v(a,2),c=_(s);I(s);var u=v(s,2),f=_(u);I(u);var p=v(u,2),m=_(p);I(p);var h=v(p,2),g=_(h);I(h);var y=v(h,2),b=_(y,!0);I(y),I(r),i((e,t,r,i,a,s)=>{n(o,`x: ${e??``}  z: ${t??``}`),n(c,`yaw: ${r??``}°  pitch: ${i??``}°`),n(f,`fov: ${a??``}  age: ${s??``}`),n(m,`mode: ${d(Me).mode??``}  inside: ${d(Me).insideRoom??``}  autoWalk: ${d(Me).autoWalking??``}`),n(g,`variable: ${d(Me).selectedVariable??``}`),n(b,d(Ne)?`Copied!`:`Copy`)},[()=>d(Me).x.toFixed(2),()=>d(Me).z.toFixed(2),()=>d(Me).yawDeg.toFixed(1),()=>d(Me).pitchDeg.toFixed(1),()=>d(Me).fov.toFixed(1),()=>d(Me).age?.toFixed(1)??`—`]),l(`click`,y,Fe),t(e,r)};p(tt,e=>{Ce&&e(nt)}),I(Je),F(Je,e=>C(We,e),()=>d(We)),Op(v(Je,2),{get person(){return d(Ve)},onclose:()=>{C(Ve,null),C(He,null)},get wave(){return d(H)},set wave(e){C(H,e,!0)}}),i(e=>{Ye=T(Je,1,`lifedeath-room svelte-1fv6f9y`,null,Ye,{"topdown-active":d(V)===`topdown`}),k(Je,`--bg-color: ${x}; --click-cursor-url: url(${e??``});`)},[()=>te(`/assets/app/click.svg`)]),t(r,qe),w()}s([`click`]),O(`<div class="info svelte-q10ak8"><p class="id svelte-q10ak8"> </p> <p class="month svelte-q10ak8"> </p></div>`),O(`<span class="icon--play svelte-q10ak8"></span>`),O(`<div><!> <a rel="external" target="_blank" class="inner svelte-q10ak8"><div class="screenshot svelte-q10ak8"><img loading="lazy" alt="thumbnail for story" class="svelte-q10ak8"/> <!></div> <div class="text svelte-q10ak8"><h3 class="short svelte-q10ak8"><strong></strong></h3> <p class="tease svelte-q10ak8"></p></div></a></div>`),O(`<li class="svelte-1sr6y3t"><!></li>`),O(`<section class="images svelte-1sr6y3t"><ul class="svelte-1sr6y3t"></ul></section>`),O(`<a target="_blank" rel="noreferrer" class="svelte-1sr6y3t"> </a>,&nbsp;`,1),O(`<section class="text svelte-1sr6y3t">We’ve published <strong> </strong> awesome stories such
						as <!>and more.</section>`),O(`<li class="svelte-1sr6y3t"><a class="svelte-1sr6y3t"> </a></li>`),O(`<li class="svelte-1sr6y3t"><a class="svelte-1sr6y3t"> </a></li>`),O(`<footer class="svelte-1sr6y3t"><div class="c svelte-1sr6y3t"><div class="top svelte-1sr6y3t"><!></div> <div class="bottom svelte-1sr6y3t"><div class="cta-wrapper svelte-1sr6y3t"><section class="donate svelte-1sr6y3t"><div class="img-wrapper svelte-1sr6y3t"><a href="https://patreon.com/thepudding" class="svelte-1sr6y3t"><img alt="donate sticker" class="svelte-1sr6y3t"/></a></div> <div class="text-wrapper svelte-1sr6y3t"><p class="svelte-1sr6y3t"><a href="https://patreon.com/thepudding" class="svelte-1sr6y3t">Support us on Patreon</a> <span class="arrow svelte-1sr6y3t"></span></p> <p class="svelte-1sr6y3t">We pour our heart into these stories, but they take time and
							money. For just $2/month, you can help support us. Join our
							growing community of data-driven enthusiasts.</p></div></section> <section class="subscribe svelte-1sr6y3t"><div class="img-wrapper svelte-1sr6y3t"><a href="https://pudding.cool/subscribe" class="svelte-1sr6y3t"><img alt="donate sticker" class="svelte-1sr6y3t"/></a></div> <div class="text-wrapper svelte-1sr6y3t"><p class="svelte-1sr6y3t"><a href="https://pudding.cool/subscribe" class="svelte-1sr6y3t">Subscribe to our newsletter</a> <span class="arrow svelte-1sr6y3t"></span></p> <p class="svelte-1sr6y3t">Get all our latest stories in your inbox. Plus get links to some
							of our favorite projects from around the web.</p></div></section></div> <section class="links svelte-1sr6y3t"><a class="img-wrapper svelte-1sr6y3t" href="https://pudding.cool"><span class="wordmark svelte-1sr6y3t"></span></a> <div class="inner svelte-1sr6y3t"><div class="about svelte-1sr6y3t"><p class="title svelte-1sr6y3t">About Us</p> <ul class="svelte-1sr6y3t"></ul></div> <div class="follow svelte-1sr6y3t"><p class="title svelte-1sr6y3t">Follow Us</p> <ul class="svelte-1sr6y3t"></ul></div></div></section></div></div></footer>`);function Ip(e){var n=c();x(g(n),{onerror:e=>console.error(e)},e=>{Fp(e,{})}),t(e,n)}console.log(`--- --- --- --- --- ---`),console.log(`svelte-starter: 6.25.1`),console.log(`build: 2026-08-07-11:48`),console.log(`--- --- --- --- --- ---`);var Lp=O(`<!> <!>`,1);function Rp(e,n){P(n,!0);let r=[`https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2`,`https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2`,`https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2`,`https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2`],{title:i,description:a,url:o,keywords:s}=ne;A(`copy`,ne),A(`data`,n.data);var c=Lp(),l=g(c);R(l,{get title(){return i},get description(){return a},get url(){return o},get preloadFont(){return r},get keywords(){return s}}),Ip(v(l,2),{}),t(e,c),w()}export{Rp as component};