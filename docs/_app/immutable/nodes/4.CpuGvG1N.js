import{C as e,D as t,E as n,G as r,K as i,M as a,N as o,O as s,P as c,Q as l,R as u,S as d,T as f,X as p,Y as m,Z as h,_t as g,a as _,b as v,d as y,et as b,f as x,ft as S,h as C,i as w,it as T,k as E,l as D,nt as O,o as k,pt as A,rt as j,s as M,v as N,vt as P,w as F,x as I,yt as L}from"../chunks/CJCU64uk.js";import{a as R}from"../chunks/CDUc7RJ8.js";import"../chunks/CT0T0Gak.js";import{t as z}from"../chunks/BOh7yNxE.js";import"../chunks/xkGGZbdb.js";var B={},V={},H=34,U=10,W=13;function G(e){return Function(`d`,`return {`+e.map(function(e,t){return JSON.stringify(e)+`: d[`+t+`] || ""`}).join(`,`)+`}`)}function ee(e,t){var n=G(e);return function(r,i){return t(n(r),i,e)}}function K(e){var t=Object.create(null),n=[];return e.forEach(function(e){for(var r in e)r in t||n.push(t[r]=r)}),n}function q(e,t){var n=e+``,r=n.length;return r<t?Array(t-r+1).join(0)+n:n}function te(e){return e<0?`-`+q(-e,6):e>9999?`+`+q(e,6):q(e,4)}function J(e){var t=e.getUTCHours(),n=e.getUTCMinutes(),r=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?`Invalid Date`:te(e.getUTCFullYear(),4)+`-`+q(e.getUTCMonth()+1,2)+`-`+q(e.getUTCDate(),2)+(i?`T`+q(t,2)+`:`+q(n,2)+`:`+q(r,2)+`.`+q(i,3)+`Z`:r?`T`+q(t,2)+`:`+q(n,2)+`:`+q(r,2)+`Z`:n||t?`T`+q(t,2)+`:`+q(n,2)+`Z`:``)}function Y(e){var t=RegExp(`["`+e+`
\r]`),n=e.charCodeAt(0);function r(e,t){var n,r,a=i(e,function(e,i){if(n)return n(e,i-1);r=e,n=t?ee(e,t):G(e)});return a.columns=r||[],a}function i(e,t){var r=[],i=e.length,a=0,o=0,s,c=i<=0,l=!1;e.charCodeAt(i-1)===U&&--i,e.charCodeAt(i-1)===W&&--i;function u(){if(c)return V;if(l)return l=!1,B;var t,r=a,o;if(e.charCodeAt(r)===H){for(;a++<i&&e.charCodeAt(a)!==H||e.charCodeAt(++a)===H;);return(t=a)>=i?c=!0:(o=e.charCodeAt(a++))===U?l=!0:o===W&&(l=!0,e.charCodeAt(a)===U&&++a),e.slice(r+1,t-1).replace(/""/g,`"`)}for(;a<i;){if((o=e.charCodeAt(t=a++))===U)l=!0;else if(o===W)l=!0,e.charCodeAt(a)===U&&++a;else if(o!==n)continue;return e.slice(r,t)}return c=!0,e.slice(r,i)}for(;(s=u())!==V;){for(var d=[];s!==B&&s!==V;)d.push(s),s=u();t&&(d=t(d,o++))==null||r.push(d)}return r}function a(t,n){return t.map(function(t){return n.map(function(e){return u(t[e])}).join(e)})}function o(t,n){return n??=K(t),[n.map(u).join(e)].concat(a(t,n)).join(`
`)}function s(e,t){return t??=K(e),a(e,t).join(`
`)}function c(e){return e.map(l).join(`
`)}function l(t){return t.map(u).join(e)}function u(e){return e==null?``:e instanceof Date?J(e):t.test(e+=``)?`"`+e.replace(/"/g,`""`)+`"`:e}return{parse:r,parseRows:i,format:o,formatBody:s,formatRows:c,formatRow:l,formatValue:u}}var X=Y(`,`),Z=X.parse;X.parseRows,X.format,X.formatBody,X.formatRows,X.formatRow,X.formatValue;var Q=E(`<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p> <p><a href="ui">BitsUI styled components</a></p></section>`);function ne(e){t(e,Q())}var re=E(`<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-b56t42"/> <p>background image</p> <div class="svelte-b56t42"></div></section>`);function ie(e){t(e,re())}var ae=E(`<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>`);function oe(i){let o=[{tag:`h3`,text:`I am a h3 tag.`},{tag:`p`,text:`I am p tag.`}];var c=ae();e(h(m(c),2),17,()=>o,F,(e,i)=>{let o=()=>u(i).tag,c=()=>u(i).text;var l=s();N(p(l),o,!1,(e,i)=>{var o=a();r(()=>n(o,c())),t(i,o)}),t(e,l)}),P(c),t(i,c)}var se=E(`<p> </p>`);function ce(e,i){var a=se(),o=m(a);P(a),r(()=>n(o,`I am component A and my favorite number is ${i.number??``}.`)),t(e,a)}var le=E(`<p> </p>`);function ue(e,i){var a=le(),o=m(a);P(a),r(()=>n(o,`I am component B and my name is ${i.name??``}.`)),t(e,a)}var de=E(`<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>`);function fe(n){let r={A:ce,B:ue},i=[{component:`A`,number:42},{component:`B`,name:`Russell`}];var a=de();e(h(m(a),2),17,()=>i,F,(e,n)=>{let i=T(()=>r[u(n).component]);var a=s();v(p(a),()=>u(i),(e,t)=>{t(e,k(()=>u(n)))}),t(e,a)}),P(a),t(n,a)}var pe=E(`<div><!></div>`);function me(e,n){A(n,!0);let r=w(n,`root`,3,null),a=w(n,`top`,3,0),o=w(n,`bottom`,3,0),s=w(n,`increments`,3,100),c=w(n,`value`,15,void 0),l=[],u=[],d=[],f=[],p;function h(){let e=0,t=0;for(let n=0;n<l.length;n++)l[n]>e&&(e=l[n],t=n);c(e>0?t:void 0)}function g(e,t){let n=e=>{e[0].isIntersecting,l[t]=e[0].intersectionRatio,h()},i=`${a()?a()*-1:0}px 0px ${o()?o()*-1:0}px 0px`,s={root:r(),rootMargin:i,threshold:u};f[t]&&f[t].disconnect();let c=new IntersectionObserver(n,s);c.observe(e),f[t]=c}function _(){d.length&&d.forEach(g)}i(()=>{for(let e=0;e<s()+1;e++)u.push(e/s());d=p.querySelectorAll(`:scope > *:not(iframe)`),_()}),i(()=>{a(),o(),_()});var v=pe();I(m(v),()=>n.children??L),P(v),M(v,e=>p=e,()=>p),t(e,v),S()}var he=E(`<div><p class="svelte-1sxgmm9"> </p></div>`),ge=E(`<section id="scrolly"><h2 class="svelte-1sxgmm9">Scrolly <span> </span></h2> <div class="spacer svelte-1sxgmm9"></div> <!> <div class="spacer svelte-1sxgmm9"></div></section>`);function _e(i){let a=O(void 0);var o=ge(),c=m(o),l=h(m(c)),d=m(l,!0);P(l),P(c),me(h(c,4),{get value(){return u(a)},set value(e){b(a,e,!0)},children:(i,o)=>{var c=s();e(p(c),16,()=>[0,1,2,3,4],F,(e,i,o)=>{let s=T(()=>u(a)===o);var c=he();let l;var d=m(c),f=m(d,!0);P(d),P(c),r(()=>{l=C(c,1,`step svelte-1sxgmm9`,null,l,{active:u(s)}),n(f,i)}),t(e,c)}),t(i,c)},$$slots:{default:!0}}),g(2),P(o),r(()=>n(d,u(a)||`-`)),t(i,o)}var ve=`{
  "hed": "life after death?",
  "all": [
    {
      "age": "16",
      "age_end": "18",
      "hide_panel": "true",
      "hide_map": "true",
      "text": "<div class=\\"hints click\\">Click on a door.</div>"
    },
    {
      "age": "18",
      "age_end": "19",
      "hide_panel": "true",
      "hide_map": "true",
      "text": "This room is filled with thousands of people who answered questions about whether they believe in life after death.\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "age": "23",
      "age_end": "25",
      "text": "On the bottom-right is a mini-map to guide you."
    },
    {
      "age": "25",
      "age_end": "29",
      "text": "The people are organized by age — here in the front are younger people, in the back are older people."
    },
    {
      "age": "29",
      "age_end": "33",
      "var_color": "RELIGIOUS_AFFILIATION",
      "wave": "2",
      "text": "You might assume that belief in an afterlife is dictated by our religious affiliation. There’s a strong correlation — but it’s not always the case. \\r\\n\\r\\n\\r\\n<div class=\\"hints click\\">Click on a person to learn more</div>"
    },
    {
      "age": "33",
      "age_end": "37",
      "var_color": "BELIEVE_GOD_BROAD",
      "wave": "2",
      "text": "And you might assume that you have to believe in a higher power to believe in an afterlife. There’s a strong correlation, but that’s not always true either.\\r\\n\\r\\n\\r\\n<div class=\\"hints click\\">Click on a person to learn more</div>"
    }
  ],
  "no": [
    {
      "age": "19",
      "age_end": "21",
      "hide_map": "true",
      "hide_panel": "true",
      "text": "You’re among people who <span class=no_belief>do not believe</span> in an afterlife. You heretic! (Just kidding.)\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "age": "21",
      "age_end": "23",
      "hide_map": "true",
      "text": "To your immediate right are people who are <span class=unsure>unsure</span> there is an afterlife. On the far right are people who <span class=belief>believe</span> in an afterlife.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to pan</div>"
    }
  ],
  "unsure": [
    {
      "age": "19",
      "age_end": "21",
      "hide_map": "true",
      "hide_panel": "true",
      "text": "You’re among people who are <span class=unsure>unsure</span> if there’s an afterlife. You have plenty of fence-sitters with you here.\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "age": "21",
      "age_end": "23",
      "hide_map": "true",
      "text": "To your left are people who <span class=no_belief>don’t believe</span> in an afterlife. To your right are people who do <span class=belief>believe</span>.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to pan</div>"
    }
  ],
  "yes": [
    {
      "age": "19",
      "age_end": "21",
      "hide_map": "true",
      "hide_panel": "true",
      "text": "You’re among people who <span class=belief>believe</span> there is life after death. Most other people in the world agree with you.\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "age": "21",
      "age_end": "23",
      "hide_map": "true",
      "text": "To your immediate left are people who are <span class=unsure>unsure</span> after an afterlife. On the far left are people who <span class=no_belief>don’t believe</span> in an afterlife.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to pan</div>"
    }
  ]
}`,ye=E(`<p></p>`),be=E(`<details><summary></summary> <div class="content"><!></div></details>`);function xe(n,i){let a=T(()=>typeof i.content==`string`),o=T(()=>i.open===`true`);var c=be(),l=m(c);d(l,()=>i.summary,!0),P(l);var g=h(l,2),_=m(g),v=e=>{var n=s();d(p(n),()=>i.content),t(e,n)},b=n=>{var r=s();e(p(r),17,()=>i.content,F,(e,n)=>{let r=()=>u(n).value;var i=ye();d(i,r,!0),P(i),t(e,i)}),t(n,r)};f(_,e=>{u(a)?e(v):e(b,-1)}),P(g),P(c),r(()=>{c.open=u(o),y(c,`name`,i.name)}),t(n,c)}var Se=E(`<li></li>`),Ce=E(`<ul></ul>`);function we(n,r){var i=Ce();e(i,21,()=>r.li,F,(e,n)=>{var r=Se();d(r,()=>u(n),!0),P(r),t(e,r)}),P(i),t(n,i)}var Te=E(`<li></li>`),Ee=E(`<ol></ol>`);function De(n,r){var i=Ee();e(i,21,()=>r.li,F,(e,n)=>{var r=Te();d(r,()=>u(n),!0),P(r),t(e,r)}),P(i),t(n,i)}var Oe=E(`<p></p>`),ke=E(`<section><!></section>`);function Ae(n,i){A(i,!0);let a={details:xe,ul:we,ol:De},o=w(i,`components`,19,()=>({})),c=w(i,`body`,19,()=>[]);var l=s();e(p(l),17,c,F,(n,i)=>{let c=()=>u(i).section,l=()=>u(i).content,h=T(()=>c().toLowerCase().replace(/[^a-z0-9]/g,``)),g=T(()=>o()[c()]);var _=ke(),b=m(_),x=e=>{var n=s();v(p(n),()=>u(g),(e,t)=>{t(e,k(l))}),t(e,n)},S=n=>{var r=s();e(p(r),17,l,F,(e,n,r,i)=>{let c=()=>u(n).type,l=()=>u(n).value,m=T(()=>o()[c()]||a[c()]),h=T(()=>typeof l()==`string`);var g=s(),_=p(g),y=e=>{var n=s();v(p(n),()=>u(m),(e,t)=>{t(e,k(l))}),t(e,n)},b=e=>{var n=Oe();d(n,l,!0),P(n),t(e,n)},x=e=>{var n=s();N(p(n),c,!1,(e,n)=>{var r=s();d(p(r),l),t(n,r)}),t(e,n)},S=e=>{var n=s();N(p(n),c,!1,(e,t)=>{D(e,()=>({...l()}))}),t(e,n)};f(_,e=>{u(m)?e(y):c()===`text`?e(b,1):u(h)?e(x,2):e(S,-1)}),t(e,g)}),t(n,r)};f(b,e=>{u(g)?e(x):e(S,-1)}),P(_),r(()=>y(_,`id`,u(h))),t(n,_)}),t(n,l),S()}var je=E(`<p> </p> <progress max="100"></progress>`,1);function Me(e,i){let a=w(i,`label`,3,`A`),o=w(i,`value`,3,0);var s=je(),c=p(s),l=m(c,!0);P(c);var u=h(c,2);r(()=>{n(l,a()),x(u,o())}),t(e,s)}var Ne=E(`<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>`);function Pe(e,i){A(i,!0);let{body:a}=z,o={Test:Me};var s=Ne(),c=h(m(s),2),l=m(c),u=m(l,!0);P(l),P(c),Ae(h(c,2),{get components(){return o},get body(){return a}}),P(s),r(e=>n(u,e),[()=>ve.replace(/\t/g,` `)]),t(e,s),S()}var Fe=(e,i=L)=>{var a=Ie(),o=m(a),s=m(o,!0);P(o);var c=h(o,2),l=m(c,!0);P(c),P(a),r(()=>{n(s,i().name),n(l,i().age)}),t(e,a)},Ie=E(`<div class="person svelte-q3gttf"><p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p></div>`),Le=E(`<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-q3gttf">count++</button> <p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-q3gttf">Random</button>  <h3>Snippets</h3> <div class="people svelte-q3gttf"></div>`,1);function Re(a,o){A(o,!0),w(o,`age`,3,30),_(o,[`$$slots`,`$$events`,`$$legacy`,`name`,`age`,`renamed`,`value`,`children`,`random`]);let s=[{name:`John`,age:30},{name:`Jill`,age:45}],l=O(0),d=T(()=>u(l)*2),f=T(()=>u(l)*2),g=O(0);i(()=>{b(g,u(l)*2)});var v=Le(),y=h(p(v),4),x=h(y,2),C=m(x);P(x);var E=h(x,2),D=m(E);P(E);var k=h(E,2),M=m(k);P(k);var N=h(k,4);I(m(N),()=>o.children??L),P(N);var R=h(N,4),z=h(R,4);e(z,21,()=>s,F,(e,t)=>{Fe(e,()=>u(t))}),P(z),r(()=>{n(C,`${u(l)??``} doubled is ${u(d)??``} (derived)`),n(D,`${u(l)??``} doubled is ${u(f)??``} (derived by)`),n(M,`${u(l)??``} doubled is ${u(g)??``} ($effect)`)}),c(`click`,y,()=>j(l)),c(`click`,R,()=>o.random(Math.floor(Math.random()*10))),t(a,v),S()}o([`click`]);var ze=(e,t)=>{let n=O(l(e)),r=O(null),a=O(!0),o=O(void 0),s=(e=!0)=>{b(a,e,!0),e===!0&&(b(o,null),b(r,null))},c=async()=>{try{let e=await fetch(u(n),t);if(!e.ok)throw Error(`Unexpected error occurred (status ${e.status})`);let r;return r=u(n).includes(`.csv`)?Z(await e.text()):await e.json(),[null,r]}catch(e){let{errorMessage:t=`Unexpected error eccurred`}=e;return[t,null]}},d=async e=>{s(!0);let[t,i]=await c();if(e===u(n)){if(t){s(!1),b(o,t,!0);return}s(!1),b(r,i,!0)}};return i(()=>{d(u(n))}),{get data(){return u(r)},get loading(){return u(a)},get error(){return u(o)},get url(){return u(n)},set url(e){u(n)!==e&&b(n,e,!0)}}},Be=E(`<p>loading data...</p>`),Ve=E(`<p> </p>`),$=E(`<p>data loaded</p> <pre> </pre>`,1),He=E(`<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>`);function Ue(e,a){A(a,!0);let o=ze(`${R}/assets/demo/test.csv`);i(()=>{});var s=He(),c=h(m(s),2),l=m(c),u=e=>{t(e,Be())},d=e=>{var i=Ve(),a=m(i);P(i),r(()=>n(a,`error: ${o.error??``}`)),t(e,i)},g=e=>{var i=$(),a=h(p(i),2),s=m(a,!0);P(a),r(e=>n(s,e),[()=>JSON.stringify(o.data,null,2)]),t(e,i)};f(l,e=>{o.loading?e(u):o.error?e(d,1):e(g,-1)}),P(c),P(s),t(e,s),S()}var We=E(`<div id="demo" class="svelte-15aotx7"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>`);function Ge(e){let n=O(0);function r(e){console.log(e)}var i=We(),a=h(m(i),2);ne(a,{});var o=h(a,2);ie(o,{});var s=h(o,2);oe(s,{});var c=h(s,2);fe(c,{});var l=h(c,2);Pe(l,{});var d=h(l,2);Ue(d,{});var f=h(d,2);_e(f,{}),Re(h(f,2),{random:r,get value(){return u(n)},set value(e){b(n,e,!0)}}),P(i),t(e,i)}function Ke(e){Ge(e,{})}export{Ke as component};