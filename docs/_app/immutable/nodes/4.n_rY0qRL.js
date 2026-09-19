import{$ as e,A as t,B as n,C as r,D as i,F as a,I as o,J as s,O as c,P as l,Q as u,S as d,T as f,Z as p,a as m,at as h,bt as g,et as _,f as v,g as y,ht as b,i as x,it as S,j as C,k as w,mt as T,nt as E,o as D,ot as O,p as k,q as A,s as j,u as M,w as N,x as P,xt as F,y as I,yt as L}from"../chunks/CWQ-BRZE.js";import{a as R}from"../chunks/BFm2826G.js";import"../chunks/CT0T0Gak.js";import"../chunks/DnsWOCDb.js";import{n as z,t as ee}from"../chunks/Bggawh9V.js";var te=C(`<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p> <p><a href="ui">BitsUI styled components</a></p></section>`);function B(e){w(e,te())}var V=C(`<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-b56t42"/> <p>background image</p> <div class="svelte-b56t42"></div></section>`);function H(e){w(e,V())}var U=C(`<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>`);function W(r){let i=[{tag:`h3`,text:`I am a h3 tag.`},{tag:`p`,text:`I am p tag.`}];var a=U();N(e(p(a),2),17,()=>i,f,(e,r)=>{let i=()=>n(r).tag,a=()=>n(r).text;var o=t();I(u(o),i,!1,(e,t)=>{var n=l();A(()=>c(n,a())),w(t,n)}),w(e,o)}),g(a),w(r,a)}var G=C(`<p> </p>`);function K(e,t){var n=G(),r=p(n);g(n),A(()=>c(r,`I am component A and my favorite number is ${t.number??``}.`)),w(e,n)}var q=C(`<p> </p>`);function J(e,t){var n=q(),r=p(n);g(n),A(()=>c(r,`I am component B and my name is ${t.name??``}.`)),w(e,n)}var Y=C(`<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>`);function X(r){let i={A:K,B:J},a=[{component:`A`,number:42},{component:`B`,name:`Russell`}];var o=Y();N(e(p(o),2),17,()=>a,f,(e,r)=>{let a=O(()=>i[n(r).component]);var o=t();P(u(o),()=>n(a),(e,t)=>{t(e,D(()=>n(r)))}),w(e,o)}),g(o),w(r,o)}var Z=C(`<div><!></div>`);function Q(e,t){b(t,!0);let n=x(t,`root`,3,null),r=x(t,`top`,3,0),i=x(t,`bottom`,3,0),a=x(t,`increments`,3,100),o=x(t,`value`,15,void 0),c=[],l=[],u=[],f=[],m;function h(){let e=0,t=0;for(let n=0;n<c.length;n++)c[n]>e&&(e=c[n],t=n);o(e>0?t:void 0)}function _(e,t){let a=e=>{e[0].isIntersecting,c[t]=e[0].intersectionRatio,h()},o=`${r()?r()*-1:0}px 0px ${i()?i()*-1:0}px 0px`,s={root:n(),rootMargin:o,threshold:l};f[t]&&f[t].disconnect();let u=new IntersectionObserver(a,s);u.observe(e),f[t]=u}function v(){u.length&&u.forEach(_)}s(()=>{for(let e=0;e<a()+1;e++)l.push(e/a());u=m.querySelectorAll(`:scope > *:not(iframe)`),v()}),s(()=>{r(),i(),v()});var y=Z();d(p(y),()=>t.children??F),g(y),j(y,e=>m=e,()=>m),w(e,y),T()}var ne=C(`<div><p class="svelte-1sxgmm9"> </p></div>`),re=C(`<section id="scrolly"><h2 class="svelte-1sxgmm9">Scrolly <span> </span></h2> <div class="spacer svelte-1sxgmm9"></div> <!> <div class="spacer svelte-1sxgmm9"></div></section>`);function ie(r){let i=S(void 0);var a=re(),o=p(a),s=e(p(o)),l=p(s,!0);g(s),g(o),Q(e(o,4),{get value(){return n(i)},set value(e){E(i,e,!0)},children:(e,r)=>{var a=t();N(u(a),16,()=>[0,1,2,3,4],f,(e,t,r)=>{let a=O(()=>n(i)===r);var o=ne();let s;var l=p(o),u=p(l,!0);g(l),g(o),A(()=>{s=y(o,1,`step svelte-1sxgmm9`,null,s,{active:n(a)}),c(u,t)}),w(e,o)}),w(e,a)},$$slots:{default:!0}}),L(2),g(a),A(()=>c(l,n(i)||`-`)),w(r,a)}var ae=`{
  "hed": "life after death?",
  "all": [
    {
      "id": "null",
      "age": "16",
      "age_end": "18",
      "hide_panel": "true",
      "hide_map": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "<div class=\\"hints click\\">Click on a door</div>"
    },
    {
      "id": "1",
      "age": "20",
      "age_end": "22",
      "hide_panel": "true",
      "hide_map": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "The thousands of people here answered a question about the afterlife as part of the [Global Flourishing Study](https://globalflourishingstudy.com/). Keep walking!\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "id": "2",
      "age": "24",
      "age_end": "25",
      "hide_year": "true",
      "hide_map": "true",
      "wave": "1",
      "text": "As you explore, you can click on a person to learn more about them.\\r\\n\\r\\n\\r\\n<div class=\\"hints click\\">Click on a person</div>"
    },
    {
      "id": "3",
      "age": "25",
      "age_end": "26",
      "hl_minimap": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "Here in the front are younger people. As you walk to the back, you’ll encounter older people.\\r\\n\\r\\n\\r\\n<div class=\\"hints click\\">Click the minimap</div>"
    },
    {
      "id": "4",
      "age": "26",
      "age_end": "27",
      "wave": "1",
      "hide_year": "true",
      "text": "Young people are most likely to have malleable beliefs about the afterlife. Between the two rounds of surveys, 18 months apart, lots of people in this part of the room changed their answer."
    },
    {
      "id": "5",
      "age": "27",
      "age_end": "28",
      "var_color": "CHANGE_ANSWER",
      "wave": "2",
      "hide_year": "true",
      "text": "Here’s who <span class=hl-changed>changed their answer</span>. The most entrenched 20-somethings are people who believe in an afterlife—but even a quarter of that group moved."
    },
    {
      "id": "6",
      "age": "28",
      "age_end": "30",
      "var_color": "CHANGE_ANSWER",
      "wave": "2",
      "hide_year": "true",
      "text": ">> CHANGE_BELIEF-AGE-LINE"
    },
    {
      "id": "7",
      "age": "30",
      "age_end": "31",
      "var_color": "RELIGIOUS_AFFILIATION",
      "wave": "2",
      "hide_year": "true",
      "text": "As expected, belief in an afterlife is [closely correlated](https://www.nature.com/articles/s41598-024-83541-x) to whether they’re <span class=hl-affiliated>affiliated with a religion</span>."
    },
    {
      "id": "8",
      "age": "31",
      "age_end": "32",
      "var_color": "REL_IMPORTANT",
      "wave": "2",
      "hide_year": "true",
      "text": "Just as strong of a predictor is whether people say religion is important in their lives. But in [Europe](https://onlinelibrary.wiley.com/doi/full/10.1111/jssr.12901) and the [U.S.](https://academic.oup.com/sf/article/104/1/366/8002178), it’s quite common for young people to believe in an afterlife but say that religion is <span class=hl-rel_important-group_2>not important</span>."
    },
    {
      "id": "10",
      "age": "32",
      "age_end": "40",
      "var_color": "REL_IMPORTANT",
      "wave": "2",
      "hide_year": "true",
      "show_panels": "true",
      "text": ">> BELIEF-WITHOUT-RELIGION-LINE | Afterlife believers who say religion isn't important in their lives"
    },
    {
      "id": "11",
      "age": "40",
      "age_end": "41",
      "wave": "2",
      "hide_year": "true",
      "text": "Scholars long believed that the rise of science knowledge would create an increasingly secular world. But that [hasn’t been the case](https://www.cambridge.org/core/books/sacred-and-secular/5CE209CE245D444D40BB44D0DDD78F43). From the 1980s to mid-2000s, religion exploded—particularly in former Soviet countries, as well as China, Mexico, Brazil, and the U.S."
    },
    {
      "id": "12",
      "age": "41",
      "age_end": "42",
      "wave": "2",
      "hide_year": "true",
      "var_color": "THREAT_LIFE",
      "text": "Since then, religious belief has fallen in most countries—especially in the U.S., but also other wealthier countries. One theory is that when people face constant <span class=hl-threat_life-group_4>threats to their lives</span>, religion encourages them to have more children so their community survives. But as life becomes safer, religion fades generation by generation."
    },
    {
      "id": "13",
      "age": "42",
      "age_end": "43",
      "var_color": "THREAT_LIFE",
      "wave": "2",
      "hide_year": "true",
      "text": "Still today, people who have faced a <span class=hl-threat_life-group_4>life-threatening situation</span> are more likely to change their afterlife belief. To no one’s surprise, afterlife belief helps some people [cope](https://pmc.ncbi.nlm.nih.gov/articles/PMC10704099/) with the anxiety of death."
    },
    {
      "id": "14",
      "age": "43",
      "age_end": "50",
      "var_color": "THREAT_LIFE",
      "wave": "2",
      "hide_year": "true",
      "show_panels": "true",
      "text": ">> CHANGE-THREAT-LINE|Changing afterlife belief, by life-threatening situations experienced"
    },
    {
      "id": "15",
      "age": "50",
      "age_end": "51",
      "var_color": "ATTEND_SVCS",
      "wave": "2",
      "hide_year": "true",
      "text": "When people hit their 50s, their afterlife beliefs start to solidify, especially for people who <span class=hl-attend_svcs-group_4>regularly attend</span> religious services."
    },
    {
      "id": "16",
      "age": "51",
      "age_end": "52",
      "var_color": "ATTEND_SVCS",
      "wave": "2",
      "hide_year": "true",
      "text": "People in their 50s who believe in an afterlife rarely change their answer and cross into the “no” part of the room. This includes people who have <span class=hl-attend_svcs-group_1>never set foot</span> in a religious service."
    },
    {
      "id": "17",
      "age": "52",
      "age_end": "53",
      "var_color": "ATTEND_SVCS",
      "wave": "2",
      "hide_year": "true",
      "text": "There are some regional differences. In sub-Saharan Africa and South Asia, belief stays high at every age group. But in the U.S. and Europe, older believers get less and less likely to move."
    },
    {
      "id": "17-5",
      "age": "53",
      "age_end": "60",
      "var_color": "ATTEND_SVCS",
      "wave": "2",
      "hide_year": "true",
      "show_panels": "true",
      "text": ">> CHANGE-ATTEND_SVCS-LINE|Changing afterlife belief, by regular church attendance"
    },
    {
      "id": "18",
      "age": "60",
      "age_end": "61",
      "wave": "2",
      "hide_year": "true",
      "text": "People in their 60s who are <span class=hl-unsure>unsure</span> are more likely to move toward the belief that everyone around them holds. In fact, if they’re skeptics but a regular church attender, they are far more likely to move toward belief."
    },
    {
      "id": "19",
      "age": "61",
      "age_end": "62",
      "var_color": "DEPRESSED",
      "wave": "2",
      "hide_year": "true",
      "text": "But people who are <span class=hl-depressed-group_4>frequently depressed</span> continue to change their answers at a higher rate, even late in their lives."
    },
    {
      "id": "20",
      "age": "62",
      "age_end": "70",
      "var_color": "DEPRESSED",
      "wave": "2",
      "hide_year": "true",
      "show_panels": "true",
      "text": ">> CHANGE-DEPRESSED-LINE|Changing afterlife belief, by depression levels"
    },
    {
      "id": "21",
      "age": "70",
      "age_end": "71",
      "wave": "2",
      "hide_year": "true",
      "text": "In younger cohorts, being <span class=hl-unsure>unsure</span> is a sort of “still exploring” signal. But people in their 70s will likely hold this uncertainty for the rest of their life."
    },
    {
      "id": "22",
      "age": "71",
      "age_end": "72",
      "wave": "2",
      "hide_year": "true",
      "text": "At this age, if <span class=hl-unsure>unsure</span> people change their mind, they are slightly more likely to settle on <span class=hl-no>no afterlife</span>."
    },
    {
      "id": "23",
      "age": "72",
      "age_end": "80",
      "wave": "2",
      "hide_year": "true",
      "show_panels": "true",
      "text": ">> UNSURE-CHANGE-LINE|WHERE UNSURE PEOPLE MOVE"
    },
    {
      "id": "24",
      "age": "80",
      "age_end": "81",
      "wave": "2",
      "hide_year": "true",
      "text": "What we believe probably doesn’t change whether there is an afterlife or not. But exploring this mystery helps us make sense of our lives—and the anxiety of the fact that it will end."
    },
    {
      "id": "25",
      "age": "81",
      "age_end": "82",
      "wave": "2",
      "hide_year": "true",
      "text": "For many of us, knowing that there is something better in the <span class=hl-yes>afterlife</span> has helped us cope with the brutal nature of our lives. We often explore this belief together with shared stories and rituals."
    },
    {
      "id": "26",
      "age": "82",
      "age_end": "83",
      "wave": "2",
      "hide_year": "true",
      "text": "For many of us, it’s <span class=hl-no>hard to believe</span> that there’s anything after the end—either because there is no evidence of it, or because our experiences have nudged us to disbelief."
    },
    {
      "id": "27",
      "age": "83",
      "age_end": "84",
      "wave": "2",
      "hide_year": "true",
      "text": "When we encounter people in another part of this room, we sometimes [see them as not one of us](https://doi.org/10.1016/j.paid.2023.112352). After all, if they don’t share our beliefs about the afterlife, doesn’t that mean they live in an entirely different reality than we do?"
    },
    {
      "id": "28",
      "age": "84",
      "age_end": "85",
      "wave": "2",
      "hide_year": "true",
      "text": "We come into this world alone—and the unstoppable forces of time push us forward in this room. At the end, we leave this world alone—and we’re cursed to never know what’s on the other side."
    },
    {
      "id": "29",
      "age": "85",
      "age_end": "86",
      "wave": "2",
      "hide_year": "true",
      "text": "But when we’re here, we can move side to side—and explore this huge mystery together."
    }
  ],
  "no": [
    {
      "id": "no1",
      "age": "18",
      "age_end": "20",
      "hide_map": "true",
      "hide_panel": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "You’re among people who <span class=no_belief>do not believe</span> in an afterlife. You heretic! (Just kidding.)\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "id": "no2",
      "age": "22",
      "age_end": "24",
      "hide_map": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "To your immediate right are people who are <span class=unsure>unsure</span> there is an afterlife. On the far right are people who <span class=belief>believe</span> in an afterlife.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to rotate</div>"
    }
  ],
  "unsure": [
    {
      "id": "unsure1",
      "age": "18",
      "age_end": "20",
      "hide_map": "true",
      "hide_panel": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "You’re among people who are <span class=unsure>unsure</span> if there’s an afterlife. You have plenty of fence-sitters here with you here.\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "id": "unsure2",
      "age": "22",
      "age_end": "24",
      "hide_map": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "To your left are people who <span class=no_belief>don’t believe</span> in an afterlife. To your right are people who do <span class=belief>believe</span>.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to rotate</div>"
    }
  ],
  "yes": [
    {
      "id": "yes1",
      "age": "18",
      "age_end": "20",
      "hide_map": "true",
      "hide_year": "true",
      "hide_panel": "true",
      "wave": "1",
      "text": "You’re among people who <span class=belief>believe</span> there is life after death. This is the most populous part of the room.\\r\\n\\r\\n\\r\\n<div class=\\"hints scroll\\">Scroll to walk</div>"
    },
    {
      "id": "yes2",
      "age": "22",
      "age_end": "24",
      "hide_map": "true",
      "hide_year": "true",
      "wave": "1",
      "text": "To your immediate left are people who are <span class=unsure>unsure</span> if there is an afterlife. On the far left are people who <span class=no_belief>don’t believe</span> in an afterlife.\\r\\n\\r\\n\\r\\n<div class=\\"hints pan\\">Drag to rotate</div>"
    }
  ],
  "info": "This piece was made by [Alvin Chang](https://alvinschang.com/) using data from the [Global Flourish Study](https://globalflourishingstudy.com/). The survey data includes nearly 130,000 respondents from 23 countries that completed both waves of the survey in 2022-23 and 2024. The room includes a representative sample of 1,500 respondents. The broad historical and cohort findings are from the [Integrated Values Surveys](https://www.worldvaluessurvey.org/WVSNewsShow.jsp?ID=442), which combines the World Values Survey and the European Values Study. Percentages are included in the charts, but what drives the findings and the overarching story is the broad comparisons and the direction of change.\\r\\n\\r\\n\\r\\nOne thing that isn’t included in this piece is that the worldwide belief and religiosity numbers have stayed relatively steady. Researchers Pippa Norris and Ronald Inglehart have [found](https://www.cambridge.org/core/books/sacred-and-secular/5CE209CE245D444D40BB44D0DDD78F43) that this is because of two phenomena that cut against each other: One is that people in wealthier countries faced a decreasing amount of existential threats—and,  in turn, religiosity and fertility rates dropped. The other is that people in poorer countries still face existential threats, and religion continues to provide security and predictability; fertility rates in those countries have stayed high. As a result, belief has stayed steady worldwide, even though belief within countries has changed rapidly.\\r\\n\\r\\n\\r\\nThe two songs are original compositions, named “Sunday” and “Monday,” created in Ableton Live.\\r\\n\\r\\n\\r\\nTo read more about how this piece was made and to keep up with Alvin’s work, subscribe to [this newsletter](https://buttondown.com/charthead/)."
}`,oe=C(`<p></p>`),se=C(`<details><summary></summary> <div class="content"><!></div></details>`);function ce(a,o){let s=O(()=>typeof o.content==`string`),c=O(()=>o.open===`true`);var l=se(),d=p(l);r(d,()=>o.summary,!0),g(d);var m=e(d,2),h=p(m),_=e=>{var n=t();r(u(n),()=>o.content),w(e,n)},y=e=>{var i=t();N(u(i),17,()=>o.content,f,(e,t)=>{let i=()=>n(t).value;var a=oe();r(a,i,!0),g(a),w(e,a)}),w(e,i)};i(h,e=>{n(s)?e(_):e(y,-1)}),g(m),g(l),A(()=>{l.open=n(c),v(l,`name`,o.name)}),w(a,l)}var le=C(`<li></li>`),ue=C(`<ul></ul>`);function de(e,t){var i=ue();N(i,21,()=>t.li,f,(e,t)=>{var i=le();r(i,()=>n(t),!0),g(i),w(e,i)}),g(i),w(e,i)}var fe=C(`<li></li>`),pe=C(`<ol></ol>`);function me(e,t){var i=pe();N(i,21,()=>t.li,f,(e,t)=>{var i=fe();r(i,()=>n(t),!0),g(i),w(e,i)}),g(i),w(e,i)}var he=C(`<p></p>`),ge=C(`<section><!></section>`);function _e(e,a){b(a,!0);let o={details:ce,ul:de,ol:me},s=x(a,`components`,19,()=>({})),c=x(a,`body`,19,()=>[]);var l=t();N(u(l),17,c,f,(e,a)=>{let c=()=>n(a).section,l=()=>n(a).content,d=O(()=>c().toLowerCase().replace(/[^a-z0-9]/g,``)),m=O(()=>s()[c()]);var h=ge(),_=p(h),y=e=>{var r=t();P(u(r),()=>n(m),(e,t)=>{t(e,D(l))}),w(e,r)},b=e=>{var a=t();N(u(a),17,l,f,(e,a,c,l)=>{let d=()=>n(a).type,f=()=>n(a).value,p=O(()=>s()[d()]||o[d()]),m=O(()=>typeof f()==`string`);var h=t(),_=u(h),v=e=>{var r=t();P(u(r),()=>n(p),(e,t)=>{t(e,D(f))}),w(e,r)},y=e=>{var t=he();r(t,f,!0),g(t),w(e,t)},b=e=>{var n=t();I(u(n),d,!1,(e,n)=>{var i=t();r(u(i),f),w(n,i)}),w(e,n)},x=e=>{var n=t();I(u(n),d,!1,(e,t)=>{M(e,()=>({...f()}))}),w(e,n)};i(_,e=>{n(p)?e(v):d()===`text`?e(y,1):n(m)?e(b,2):e(x,-1)}),w(e,h)}),w(e,a)};i(_,e=>{n(m)?e(y):e(b,-1)}),g(h),A(()=>v(h,`id`,n(d))),w(e,h)}),w(e,l),T()}var ve=C(`<p> </p> <progress max="100"></progress>`,1);function ye(t,n){let r=x(n,`label`,3,`A`),i=x(n,`value`,3,0);var a=ve(),o=u(a),s=p(o,!0);g(o);var l=e(o,2);A(()=>{c(s,r()),k(l,i())}),w(t,a)}var be=C(`<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>`);function xe(t,n){b(n,!0);let{body:r}=ee,i={Test:ye};var a=be(),o=e(p(a),2),s=p(o),l=p(s,!0);g(s),g(o),_e(e(o,2),{get components(){return i},get body(){return r}}),g(a),A(e=>c(l,e),[()=>ae.replace(/\t/g,` `)]),w(t,a),T()}var Se=(t,n=F)=>{var r=Ce(),i=p(r),a=p(i,!0);g(i);var o=e(i,2),s=p(o,!0);g(o),g(r),A(()=>{c(a,n().name),c(s,n().age)}),w(t,r)},Ce=C(`<div class="person svelte-q3gttf"><p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p></div>`),we=C(`<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-q3gttf">count++</button> <p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p> <p class="svelte-q3gttf"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-q3gttf">Random</button>  <h3>Snippets</h3> <div class="people svelte-q3gttf"></div>`,1);function Te(t,r){b(r,!0),x(r,`age`,3,30),m(r,[`$$slots`,`$$events`,`$$legacy`,`name`,`age`,`renamed`,`value`,`children`,`random`]);let i=[{name:`John`,age:30},{name:`Jill`,age:45}],a=S(0),l=O(()=>n(a)*2),_=O(()=>n(a)*2),v=S(0);s(()=>{E(v,n(a)*2)});var y=we(),C=e(u(y),4),D=e(C,2),k=p(D);g(D);var j=e(D,2),M=p(j);g(j);var P=e(j,2),I=p(P);g(P);var L=e(P,4);d(p(L),()=>r.children??F),g(L);var R=e(L,4),z=e(R,4);N(z,21,()=>i,f,(e,t)=>{Se(e,()=>n(t))}),g(z),A(()=>{c(k,`${n(a)??``} doubled is ${n(l)??``} (derived)`),c(M,`${n(a)??``} doubled is ${n(_)??``} (derived by)`),c(I,`${n(a)??``} doubled is ${n(v)??``} ($effect)`)}),o(`click`,C,()=>h(a)),o(`click`,R,()=>r.random(Math.floor(Math.random()*10))),w(t,y),T()}a([`click`]);var Ee=(e,t)=>{let r=S(_(e)),i=S(null),a=S(!0),o=S(void 0),c=(e=!0)=>{E(a,e,!0),e===!0&&(E(o,null),E(i,null))},l=async()=>{try{let e=await fetch(n(r),t);if(!e.ok)throw Error(`Unexpected error occurred (status ${e.status})`);let i;return i=n(r).includes(`.csv`)?z(await e.text()):await e.json(),[null,i]}catch(e){let{errorMessage:t=`Unexpected error eccurred`}=e;return[t,null]}},u=async e=>{c(!0);let[t,a]=await l();if(e===n(r)){if(t){c(!1),E(o,t,!0);return}c(!1),E(i,a,!0)}};return s(()=>{u(n(r))}),{get data(){return n(i)},get loading(){return n(a)},get error(){return n(o)},get url(){return n(r)},set url(e){n(r)!==e&&E(r,e,!0)}}},De=C(`<p>loading data...</p>`),$=C(`<p> </p>`),Oe=C(`<p>data loaded</p> <pre> </pre>`,1),ke=C(`<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>`);function Ae(t,n){b(n,!0);let r=Ee(`${R}/assets/demo/test.csv`);s(()=>{});var a=ke(),o=e(p(a),2),l=p(o),d=e=>{w(e,De())},f=e=>{var t=$(),n=p(t);g(t),A(()=>c(n,`error: ${r.error??``}`)),w(e,t)},m=t=>{var n=Oe(),i=e(u(n),2),a=p(i,!0);g(i),A(e=>c(a,e),[()=>JSON.stringify(r.data,null,2)]),w(t,n)};i(l,e=>{r.loading?e(d):r.error?e(f,1):e(m,-1)}),g(o),g(a),w(t,a),T()}var je=C(`<div id="demo" class="svelte-15aotx7"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>`);function Me(t){let r=S(0);function i(e){console.log(e)}var a=je(),o=e(p(a),2);B(o,{});var s=e(o,2);H(s,{});var c=e(s,2);W(c,{});var l=e(c,2);X(l,{});var u=e(l,2);xe(u,{});var d=e(u,2);Ae(d,{});var f=e(d,2);ie(f,{}),Te(e(f,2),{random:i,get value(){return n(r)},set value(e){E(r,e,!0)}}),g(a),w(t,a)}function Ne(e){Me(e,{})}export{Ne as component};