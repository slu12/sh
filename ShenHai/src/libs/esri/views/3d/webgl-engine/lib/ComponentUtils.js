// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/arrayUtils","../../../../core/maybe"],function(q,e,D,v){function w(a,b){if(null!=a){var c=a.isVisibleBit,d=a.data,f=8*d.BYTES_PER_ELEMENT;return b<d.length*f?x(c,d,b,f):!a.isVisibleBit}return!0}function y(a){return v.isSome(a.component)?a.component:-1}function z(a,b,c,d,f){w(b,d)&&A(a,c[d],c[d+1]-1,f)}function A(a,b,c,d){var f=0<a.length?a[a.length-1]:null,g=f?f.range[1]:-1,e=f?f.options:null;g>=b||(g+1===b&&e===d?f.range[1]=c:a.push({range:[b,c],options:d}))}
function n(a){void 0===a&&(a=!0);return{isVisibleBit:!a,data:new Uint32Array(0)}}function B(a,b){return C(a,b,!0)}function r(a,b){return C(a,b,!1)}function C(a,b,c){var d=!1;a=a||E;d=a.isVisibleBit;a=a.data;b=p(b);var f=8*a.BYTES_PER_ELEMENT,g=a.length*f;c=c===d;if(0===a.length||0===b)d=!c;else if(g<b&&!c)d=!0;else{for(var e=t[f],g=t[0],h=0;h<a.length-1;h++)if(d=!c&&a[h]!==e||c&&a[h]!==g)return d;d=a.length-1;b=t[(b-1)%f+1];d=!c&&(a[d]&b)!==b||c&&(a[d]&b)!==g}return d}function u(a){return 0<a.length}
function x(a,b,c,d){var f=c/d|0;return 0!==(b[f]&1<<c-f*d)===a}function p(a){return Math.max(0,a.length-1)}Object.defineProperty(e,"__esModule",{value:!0});e.updateVisibility=function(a,b,c,d){if(c<p(b)){null==a&&(a=n());var f=a.isVisibleBit,g=a.data,e=8*g.BYTES_PER_ELEMENT,h=c/e|0,k=c-e*h;b=(p(b)-1)/e|0;var l=g;d=d===f;c<l.length*e||!d||(c=Math.max(h+1,Math.ceil(1.5*l.length)),c=Math.min(c,b+1),g=new Uint32Array(c),g.set(l));h<g.length&&(g[h]=g[h]&~(1<<k)|(d?1:0)<<k);a.data=g}return a};e.updateVisibilityWithCount=
function(a,b,c,d){if(c<b){null==a&&(a=n());var f=a.data,e=8*f.BYTES_PER_ELEMENT,m=c/e|0,h=c-e*m,k=f;d=d===a.isVisibleBit;c<k.length*e||!d||(c=Math.max(m+1,Math.ceil(1.5*k.length)),c=Math.min(c,((b-1)/e|0)+1),f=new Uint32Array(c),f.set(k));m<f.length&&(f[m]=f[m]&~(1<<h)|(d?1:0)<<h);a.data=f}return a};e.getVisibility=w;e.hideAllComponents=function(a){if(null==a)a=n(!1);else{a.isVisibleBit=!0;for(var b=0;b<a.data.length;b++)a.data[b]=0}return a};e.unhideAllComponents=function(a){var b;if(null!=a)for(b=
a,b.isVisibleBit=!1,a=0;a<b.data.length;a++)b.data[a]=0;return b};e.generateVisibleIndexRanges=function(a,b){var c;if(a)if(u(b))if(0===a.data.length)c=[],b=[[b[0],b[b.length-1]-1]],c=a.isVisibleBit?c:b;else{c=[];for(var d=a.isVisibleBit,e=a.data,g=8*e.BYTES_PER_ELEMENT,m=e.length*g,h=p(b),k=!1,l=0;l<m&&l<h;l++){var n=x(d,e,l,g);if(n!==k){var q=b[l];n?c.push([q,0]):(k=c[c.length-1],k[1]=q-1);k=n}}a=!a.isVisibleBit;h>m&&a&&!k?c.push([b[m],b[h]-1]):k&&(k=c[c.length-1],k[1]=b[a?h:Math.min(h,m)]-1)}else c=
[],c=a.isVisibleBit?c:null;else c=null;return c};e.addHighlight=function(a,b,c,d){a=a||[];b={component:b,options:c,id:d};a.push(b);c=y(b);for(d=a.length-1;0<d&&c<y(a[d-1]);)b=[a[d],a[d-1]],a[d-1]=b[0],a[d]=b[1],--d;return a};e.removeHighlight=function(a,b){if(!a)return a;a=a.filter(function(a){return a.id!==b});return 0===a.length?null:a};e.generateHighlightedIndexRanges=function(a,b,c){if(!b)return null;if(!u(c))return a&&a.isVisibleBit?null:b.map(function(a){return{range:null,options:a.options}});
for(var d=c[0],e=c[c.length-1]-1,g=[],m=!r(a,c),h=0;h<b.length;++h){var k=b[h].options,l=b[h].component;if(v.isSome(l))z(g,a,c,l,k);else if(m)A(g,d,e,k);else for(l=0;l<p(c);++l)z(g,a,c,l,k)}return 0<g.length?g:null};e.hasHighlights=function(a,b,c){if(!b)return!1;if(!u(c))return a&&a.isVisibleBit?!1:0<b.length;a=!r(a,c);for(var d=0;d<b.length;d++)if(v.isSome(b[d].component)||a||0<p(c))return!0;return!1};e.defaultVisibilities=n;e.isAllVisible=function(a,b){return!r(a,b)};e.isAllHidden=function(a,b){return!B(a,
b)};e.hasVisible=B;e.hasHidden=r;var E=n();e.createOffsets=function(a){return a instanceof Uint32Array?a:new Uint32Array(a)};e.hasComponent=function(a,b){return b<p(a)};e.hasComponents=u;var t=[];for(q=0;65>q;q++)t.push(Math.pow(2,q)-1);e.componentCount=p;e.componentFind=function(a,b){a=D.binaryIndexOf(a,b,!0);return 0<=a?a:null}});