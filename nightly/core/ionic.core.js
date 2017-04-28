/*! (C) Ionic https://ionicframework.com - Mit License */
(function(t){"use-strict";function q(a){return void 0!==a&&null!==a}function J(a){return"string"===typeof a||"number"===typeof a}function aa(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})}function ba(a){return a.replace(/([A-Z])/g,function(a){return"-"+a[0].toLowerCase()})}function P(){}function ca(a,b){if("child"===b)return a.firstElementChild;if("parent"===b){if(a.parentElement)return a.parentElement;if(a.parentNode&&a.parentNode.host)return a.parentNode.host}return"body"===b?a.ownerDocument.body:
"document"===b?a.ownerDocument:"window"===b?a.ownerDocument.defaultView:a}function da(a){return"enter"===a?13:"escape"===a?27:"space"===a?32:"tab"===a?9:null}function K(a,b,c,e,f){return{c:a,b:b,i:c,f:e,a:f,o:void 0===b?void 0:b.key}}function Q(a,b,c){a.Z="http://www.w3.org/2000/svg";if("foreignObject"!==c&&void 0!==b)for(a=0;a<b.length;++a)c=b[a].b,void 0!==c&&Q(c,b[a].i,b[a].c)}function L(a,b,c){var e={},f,d,g=void 0;a.nodeType&&(g=a);void 0!==c?(e=b,c&&c.constructor===Array?f=c:J(c)?d=c:c&&c.c&&
(f=[c])):void 0!==b&&(b&&b.constructor===Array?f=b:J(b)?d=b:b&&b.c?f=[b]:e=b);if(f&&f.constructor===Array)for(b=0;b<f.length;++b)J(f[b])&&(f[b]=K(void 0,void 0,void 0,f[b]));"s"!==a[0]||"v"!==a[1]||"g"!==a[2]||3!==a.length&&"."!==a[3]&&"#"!==a[3]||Q(e,f,a);return K(a,e,f,d,g)}function ea(a,b,c,e){if(a&&a.$meta){var f=a.$meta.listeners;if(f)for(var d=a.h=a.h||{},g=Object.keys(f),h=0;h<g.length;h++){var l=g[h],n=f[l];if(n.B===b){c&&!d[b]?d[b]=R(a.$el,e?e+":"+b:b,a[l].bind(a),n):!c&&d[b]&&(d[b](),delete a.h[b]);
break}}}}function R(a,b,c,e){if(!a)return P;null===M&&(M=fa(a));var f=M?{capture:!!e.capture,passive:!!e.passive}:!!e.capture;e=b.split(":");1<e.length&&(a=ca(a,e[0]),b=e[1]);e=b.split(".");if(1<e.length){b=e[0];var d=da(e[1]);if(null!==d){var g=c;c=function(a){a.keyCode===d&&g(a)}}}a.addEventListener(b,c,f);return function(){a&&a.removeEventListener(b,c,f)}}function fa(a){var b=!1;try{var c=Object.defineProperty({},"passive",{get:function(){b=!0}});a.addEventListener("test",null,c)}catch(e){}return b}
function S(a,b){var c,e,f=b.a;a=a.b.attrs;var d=b.b.attrs;if((a||d)&&a!==d){a=a||{};d=d||{};for(c in d)b=d[c],e=a[c],e!==b&&(T[c]?b?f.setAttribute(c,""):f.removeAttribute(c):120!==c.charCodeAt(0)?f.setAttribute(c,b):58===c.charCodeAt(3)?f.setAttributeNS("http://www.w3.org/XML/1998/namespace",c,b):58===c.charCodeAt(5)?f.setAttributeNS("http://www.w3.org/1999/xlink",c,b):f.setAttribute(c,b));for(c in a)c in d||f.removeAttribute(c)}}function U(a,b){var c,e=b.a;a=a.b["class"];var f=b.b["class"];if((a||
f)&&a!==f){a=a||{};f=f||{};for(c in a)f[c]||e.classList.remove(c);for(c in f)if(b=f[c],b!==a[c])e.classList[b?"add":"remove"](c)}}function V(a,b,c){if("function"===typeof a)a.call(b,c,b);else if("object"===typeof a)if("function"===typeof a[0])if(2===a.length)a[0].call(b,a[1],c,b);else{var e=a.slice(1);e.push(c);e.push(b);a[0].apply(b,e)}else for(b=0;b<a.length;b++)V(a[b])}function ga(){return function b(c){var e=b.aa,f=c.type,d=e.b.on;d&&d[f]&&V(d[f],e,c)}}function N(a,b){var c=a.b.on,e=a.listener,
f=a.a,d=b&&b.b.on,g=b&&b.a,h;if(c!==d){if(c&&e)if(d)for(h in c)d[h]||f.removeEventListener(h,e,!1);else for(h in c)f.removeEventListener(h,e,!1);if(d)if(a=b.listener=a.listener||ga(),a.aa=b,c)for(h in d)c[h]||g.addEventListener(h,a,!1);else for(h in d)g.addEventListener(h,a,!1)}}function W(a,b){var c,e,f=b.a;a=a.b.props;var d=b.b.props;if((a||d)&&a!==d){a=a||{};d=d||{};for(c in a)d[c]||delete f[c];for(c in d)b=d[c],e=a[c],e===b||"value"===c&&f[c]===b||(f[c]=b)}}function H(a,b){return a.o===b.o&&a.c===
b.c}function O(a){var b,c;if(void 0!==a.b&&(N(a),void 0!==a.i))for(c=0;c<a.i.length;++c)b=a.i[c],null==b||"string"===typeof b||O(b)}function X(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},e=c["class"]=c["class"]||{},f=a.mode,d=a.color;e[b]=!0;f&&(e[b+"-"+f]=!0,d&&(e[b+"-"+d]=e[b+"-"+f+"-"+d]=!0));return c}function ha(a,b,c,e){if("function"!==typeof a.CustomEvent){var f=function(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var d=document.createEvent("CustomEvent");d.initCustomEvent(a,
b.bubbles,b.cancelable,b.detail);return d};f.prototype=a.Event.prototype;a.CustomEvent=f}return{theme:X,emit:function(d,c){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};void 0===e.composed&&(e.composed=!0);b&&(c=b(c));d&&d.$el&&d.$el.dispatchEvent(new a.CustomEvent(c,e))},listener:{enable:ea},controllers:{},dom:e,config:c}}function Y(a){switch(a){case "0":return"default";case "1":return"ios";case "2":return"md";case "3":return"wp"}return a}function ia(a,b,c,e,f,d,g,h){var l={};Object.keys(g).forEach(function(n){function w(){return l[n]}
function m(d){l[n]!==d&&(l[n]=d,k&&k(d),Z(a,b,c,e,f))}var k=h[n]?d[h[n].V].bind(d):null;l[n]=ja(b,e,d,g[n].type,n);Object.defineProperty(e,n,{configurable:!0,get:w,set:m});Object.defineProperty(d,n,{configurable:!0,get:w,set:m})})}function ja(a,b,c,e,f){return void 0!==b[f]?b[f]:void 0!==c[f]?c[f]:0===e?a.getBoolean(f):1===e?a.getNumber(f):a.get(f)}function Z(a,b,c,e,f){e.J||(e.J=!0,a.nextTick(function(){var d=a.W(f),g=!1,h=e.u;h||(h=e.u=new d.U,h.$el=e,h.$meta=d,ia(a,b,c,e,f,h,d.props,d.L),a.M(e,
d,h),g=!0);if(d.C){var l=h,n=h.l?h.l:e,w=h.w,m=h,k=d.X,p=m.render&&m.render();p?p.a=w:p=L(w,L("div",X(m,k),L("slot")));delete p.c;l.l=c(n,p)}else g&&h.render&&(l=h.render(),l.a=e,c(e,l,!0));if(g){d=d.listeners;g=h;l=Object.keys(d);for(n=0;n<l.length;n++)w=l[n],m=d[w],!1!==m.enabled&&(g.h=g.h||{},g.h[m.B]=R(g.$el,m.B,g[w].bind(g),m));h.ionViewDidLoad&&h.ionViewDidLoad()}e.J=!1}))}function ka(a,b,c,e,f){a.nextTick(function(){var d=f.tag,g=f.j[la(a,b,e)];g||(g=f.j.default);a.Y(g.T,function(){Z(a,b,c,
e,d)})})}function la(a,b,c){var e=c.mode;if(q(e))return e;e=a.R(c,"mode");return q(e)?e:b.get("mode","md")}function C(a,b,c,e,f){var d;d="ionicplatform".replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");if(a=(a=(new RegExp("[\\?&]"+d+"=([^&#]*)")).exec(a))?decodeURIComponent(a[1].replace(/\+/g," ")):null)return a===c;b=b.toLowerCase();for(c=0;c<e.length;c++)if(-1<b.indexOf(e[c])){for(e=0;e<f.length;e++)if(-1<b.indexOf(f[e]))return!1;return!0}return!1}for(var M=null,r="allowfullscreen async autofocus autoplay checked controls disabled draggable enabled formnovalidate hidden multiple noresize readonly required selected spellcheck".split(" "),
T=Object.create(null),x=0,ma=r.length;x<ma;x++)T[r[x]]=!0;var I=K("",{},[],void 0,void 0),r=t.Ionic=t.Ionic||{};r.DomCtrl=function(a){function b(){f=!0;a.requestAnimationFrame(function(a){var d,h,l;try{for(d=performance.now();h=c.shift();)h(a);for(;(h=e.shift())&&!(h(a),8<performance.now()-d););}catch(n){l=n}f=!1;(c.length||e.length)&&b();if(l)throw l;})}var c=[],e=[],f=!1;return{read:function(a){c.push(a);f||b()},write:function(a){e.push(a);f||b()},raf:a.requestAnimationFrame.bind(a)}}(t);r.NextTickCtrl=
function(a){function b(){e=!1;for(var a=c.slice(0),b=c.length=0;b<a.length;b++)a[b]()}var c=[],e=!1,f=void 0,d=/iphone|ipad|ipod|ios/.test(a.navigator.userAgent.toLowerCase());if("undefined"!==typeof Promise&&-1!==Promise.toString().indexOf("[native code]"))var g=Promise.resolve(),h=function(a){console.error(a)},f=function(){g.then(b).catch(h);d&&setTimeout(P)};else f=function(){setTimeout(b,0)};return{nextTick:function(a){c.push(a);e||(e=!0,f())}}}(t);r.ConfigCtrl=function(a,b){function c(c){var e=
1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(void 0!==a[c])return a[c];for(var d=0;d<b.length;d++)if(void 0!==b[d].settings[c])return b[d].settings[c];return e}a=a||{};return{get:c,getBoolean:function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!1,d=c(a);return null===d?b:"string"===typeof d?"true"===d:!!d},getNumber:function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:NaN,d=parseFloat(c(a));return isNaN(d)?b:d}}}(r.config,function(a,b,c,e){var f=
c.filter(function(d){return d.isMatch&&d.isMatch(a,b)});f.length||(f=c.filter(function(a){return a.name===e}));return f}(t.location.href,t.navigator.userAgent,[{name:"ipad",settings:{keyboardHeight:500},isMatch:function(a,b){return C(a,b,"ipad",["ipad"],["windows phone"])}},{name:"iphone",isMatch:function(a,b){return C(a,b,"iphone",["iphone"],["windows phone"])}},{name:"ios",settings:{autoFocusAssist:"delay",hoverCSS:!1,inputBlurring:!0,inputCloning:!0,keyboardHeight:300,mode:"ios",scrollAssist:!0,
statusbarPadding:!1,swipeBackEnabled:!0,tapPolyfill:!1,virtualScrollEventAssist:!1,disableScrollAssist:!0},isMatch:function(a,b){return C(a,b,"ios",["iphone","ipad","ipod"],["windows phone"])}},{name:"android",settings:{activator:"ripple",autoFocusAssist:"immediate",inputCloning:!0,scrollAssist:!0,hoverCSS:!1,keyboardHeight:300,mode:"md"},isMatch:function(a,b){return C(a,b,"android",["android","silk"],["windows phone"])}},{name:"windows",settings:{mode:"wp",autoFocusAssist:"immediate",hoverCSS:!1},
isMatch:function(a,b){return C(a,b,"windows",["windows phone"],[])}},{name:"core",settings:{mode:"md",keyboardHeight:290}}],"core"));x=function(a,b,c,e){function f(a){function c(){clearTimeout(f);e.onerror=e.onload=null;e.parentNode.removeChild(e);delete n[a]}n[a]=!0;var e=d("script");e.charset="utf-8";e.async=!0;e.src=a;var f=setTimeout(c,12E4);e.onerror=e.onload=c;b.head.appendChild(e)}function d(a){return b.createElement(a)}var g={},h={},l={},n={},w={},m={},k=!(a.ShadyDOM&&a.ShadyDOM.inUse),p=
ha(a,c.eventNameFn,c.ConfigCtrl,c.DomCtrl);c.loadComponents=function(a){for(var b=arguments,d=1;d<b.length;d++){var c,e=w,f=L,v=p,n=b[d],m,k=g[n[0]];k.listeners={};for(m=0;m<n[2].length;m++)c=n[2][m],k.listeners[c[0]]={B:c[1],capture:!!c[2],passive:!!c[3],enabled:!!c[4]};k.L={};for(m=0;m<n[3].length;m++)c=n[3][m],k.L[c[0]]={V:c[1]};k.C=!!n[4];"string"===typeof n[6]&&(m=k.j[Y(n[5].toString())])&&(m.F=n[6]);n[7](e,f,v);k.U=e[n[1]];if(e=l[a]){f=0;for(v=e.length;f<v;f++)e[f]();delete l[a]}h[a]=!0}};return{$:function(a,
b){var d=b[0];b=b[1];var c={color:{},mode:{}};if(b)for(var e=0;e<b.length;e++)c[b[e][0]]={type:b[e][1]};a=g[a]={tag:a,j:{},props:c,K:[]};b=Object.keys(d);for(c=0;c<b.length;c++)a.j[Y(b[c].toString())]={T:d[b[c]]};b=a.tag.split("-");b.shift();a.X=b.join("-");b=Object.keys(a.props);for(c=0;c<b.length;c++)a.K.push(ba(b[c]));return a},W:function(a){return g[a]},Y:function(a,b){h[a]?b():(l[a]?l[a].push(b):l[a]=[b],a=c.staticDir+"bundles/ionic."+a+".js",n[a]||f(a))},fa:function(a){return 1===a.nodeType},
ga:function(a){return 3===a.nodeType},ea:function(a){return 8===a.nodeType},nextTick:e.nextTick.bind(e),O:d,P:function(a,c){return b.createElementNS(a,c)},G:function(a){return b.createTextNode(a)},N:function(a){return b.createComment(a)},g:function(a,b,c){a.insertBefore(b,c)},v:function(a,b){a.removeChild(b)},s:function(a,b){a.appendChild(b)},I:function(a){return a.parentNode},H:function(a){return a.nextSibling},S:function(a){return(a.tagName||"").toLowerCase()},A:function(a,b){a.textContent=b},ba:function(a){return a.textContent},
R:function(a,b){return a.getAttribute(b)},M:function(a,c,e){c.C&&(e.w=a.attachShadow({mode:"open"}));(a=c.j[e.mode]||c.j.default)&&a.F&&(c.C&&k?(a.D||(a.D=d("style"),a.D.innerHTML=a.F),e.w.appendChild(a.D.cloneNode(!0))):(c=c.tag+"."+e.mode,m[c]||(e=d("style"),e.dataset.cmpId=c,e.innerHTML=a.F.replace(/\:host\-context\((.*?)\)|:host\((.*?)\)|\:host/g,"__h"),b.head.appendChild(e),m[c]=!0)))}}}(t,t.document,r,r.NextTickCtrl);(function(a,b,c,e,f){Object.keys(f||{}).forEach(function(d){class g extends HTMLElement {}
var h=c.$(d,f[d]);g.prototype.connectedCallback=function(){ka(c,e,b,this,h)};g.prototype.attributeChangedCallback=function(a,b,c){b!==c&&(a=aa(a),(b=h.props[a])&&(this[a]=0===b.type?null===c||"false"===c?!1:!0:1===b.type?parseFloat(c):c))};g.prototype.disconnectedCallback=function(){if(this){var a=this.u;if(a){a.ionViewWillUnload&&a.ionViewWillUnload();var b=a.h;if(b){for(var c=Object.keys(b),d=0;d<c.length;d++)b[c[d]]();a.h=null}a.l&&O(a.l);this.u=a.$el=a.$meta=a.w=a.l=null}}};g.observedAttributes=
h.K;a.customElements.define(d,g)})})(t,function(a){function b(b){return function(){a.v(a.I(b),b)}}function c(b,e,f,l){var d=void 0,g=b.b;void 0!==g&&q(d=g.m)&&q(d=d.ca)&&(d(b),g=b.b);var h=b.i,k=b.c;if("!"===k)void 0===b.f&&(b.f=""),b.a=a.N(b.f);else if(l&&"slot"===k)for(;e=l.shift();){a.v(e.parentNode,e);if(0===l.length)return e;a.s(f,e)}else if(void 0!==k){var p=k.indexOf("#");f=k.indexOf(".",p);var v=0<p?p:k.length,u=0<f?f:k.length,p=-1!==p||-1!==f?k.slice(0,Math.min(v,u)):k,g=b.a=q(g)&&q(d=g.Z)?
a.P(d,p):a.O(p);v<u&&g.setAttribute("id",k.slice(v+1,u));0<f&&g.setAttribute("class",k.slice(u+1).replace(/\./g," "));S(I,b);U(I,b);N(I,b);W(I,b);if(h&&h.constructor===Array)for(d=0;d<h.length;++d)k=h[d],null!=k&&a.s(g,c(k,e,g,l));else J(b.f)&&a.s(g,a.G(b.f));d=b.b.m;q(d)&&(d.create&&d.create(I,b),d.da&&e.push(b))}else b.a=a.G(b.f);return b.a}function e(c,e,f,l){for(;f<=l;++f){var d=void 0,g,h=e[f];null!=h&&(q(h.c)?(O(h),g=b(h.a),q(d=h.b)&&q(d=d.m)&&q(d=d.remove)?d(h,g):g()):a.v(c,h.a))}}function f(b,
g,h,l){if(l||"slot"!==b.c){var d=void 0,w=void 0;q(d=g.b)&&q(w=d.m)&&q(d=w.ia)&&d(b,g);var m=g.a=b.a,k=b.i,p=g.i;if(b!==g){void 0!==g.b&&(S(b,g),U(b,g),N(b,g),W(b,g),d=g.b.m,q(d)&&q(d=d.update)&&d(b,g));if(void 0===g.f)if(q(k)&&q(p)){if(k!==p){var v=l?[]:null;if(l)for(var u=g.a.childNodes,y=0;y<u.length;y++)v.push(u[y]);for(var m=m.shadowRoot||m,r=0,y=0,t=k.length-1,z=k[0],B=k[t],u=p.length-1,A=p[0],D=p[u],E=void 0,x,F;r<=t&&y<=u;)if(null==z)z=k[++r];else if(null==B)B=k[--t];else if(null==A)A=p[++y];
else if(null==D)D=p[--u];else if(H(z,A))f(z,A,h,l),z=k[++r],A=p[++y];else if(H(B,D))f(B,D,h,l),B=k[--t],D=p[--u];else if(H(z,D))f(z,D,h,l),a.g(m,z.a,a.H(B.a)),z=k[++r],D=p[--u];else{if(H(B,A))f(B,A,h,l),a.g(m,B.a,z.a),B=k[--t];else{if(void 0===E){var G;x=k;F=t;for(var C={},E=r;E<=F;++E)G=x[E],null!=G&&(G=G.o,void 0!==G&&(C[G]=E));E=C}x=E[A.o];void 0===x?a.g(m,c(A,h,m,v),z.a):(F=k[x],F.c!==A.c?a.g(m,c(A,h,m,v),z.a):(f(F,A,h,l),k[x]=void 0,a.g(m,F.a,z.a)))}A=p[++y]}if(r>t)for(l=null==p[u+1]?null:p[u+
1].a,k=y;k<=u;++k)y=p[k],null!=y&&a.g(m,c(y,h,m,v),l);else y>u&&e(m,k,r,t)}}else if(q(p))for(q(b.f)&&a.A(m,""),v=0,l=p.length-1;v<=l;++v)k=p[v],null!=k&&a.g(m,c(k,h,m,null),null);else q(k)?e(m,k,0,k.length-1):q(b.f)&&a.A(m,"");else b.f!==g.f&&a.A(m,g.f);q(w)&&q(d=w.ha)&&d(b,g)}}}return function(b,g,h){var d,n=[];void 0!==b.c||void 0!==b.a||(b=K(a.S(b)+(b.id?"#"+b.id:"")+(b.className?"."+b.className.split(" ").join("."):""),{},[],void 0,b));g.a||H(b,g)?f(b,g,n,h):(h=b.a,d=a.I(h),c(g,n,d,[]),null!==
d&&(a.g(d,g.a,a.H(h)),e(d,[b],0,0)));return g}}(x),x,r.ConfigCtrl,r.components)})(window);
