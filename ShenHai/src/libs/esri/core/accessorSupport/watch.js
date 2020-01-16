// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../ArrayPool ../lang ../ReentrantObjectPool ../scheduling ./get ./utils ./wire".split(" "),function(E,f,z,r,A,B,k,n,t){function u(a){l.has(a)?d.splice(d.indexOf(a),1):l.add(a);d.push(a);p||(p=B.schedule(v))}function w(a){if(!a.removed){var g=a.callback,b=a.path,c=a.oldValue,d=a.target,e=k.valueOf(d,a.propertyPath,!0);r.equals(c,e)||(a.oldValue=e,g.call(d,e,c,b,d))}}function v(){for(var a=10;p&&a--;){p=null;var g=d;d=h.acquire();l.clear();for(var b=h.acquire(),c=0,m=g;c<m.length;c++){var e=
m[c],f=e.uid;w(e);f===e.uid&&e.removed&&b.push(e)}for(c=0;c<d.length;c++)e=d[c],e.removed&&(b.push(e),l.delete(e),d.splice(c,1),--c);for(c=0;c<b.length;c++)x.pool.release(b[c]);h.release(g);h.release(b);q.forEach(function(a){return a()})}}function C(a,g,b){var c=n.parse(a,g,b,function(a,b,g){var d=k.valueOf(a,b,!0),e,f,m=t.wire(a,b,function(a,b){a.__accessor__.destroyed||e&&e.uid!==f?c.remove():(e||(e=x.pool.acquire(a,b,d,g),f=e.uid,d=null),u(e))});return{remove:n.once(function(){m.remove();e&&(e.uid!==
f||e.removed||(e.removed=!0,u(e)),e=null);c=m=d=null})}});return c}function D(a,g,b){var c=n.parse(a,g,b,function(a,b,g){var e=k.valueOf(a,b,!0),d=!1;return t.wire(a,b,function(a,b){if(a.__accessor__.destroyed)c.remove();else if(!d){d=!0;var f=k.valueOf(a,b,!0);r.equals(e,f)||g.call(a,f,e,b,a);e=k.valueOf(a,b,!0);d=!1}})});return c}function y(a,d,b,c){void 0===c&&(c=!1);return!a.__accessor__||a.__accessor__.destroyed?{remove:function(){}}:c?D(a,d,b):C(a,d,b)}Object.defineProperty(f,"__esModule",{value:!0});
var x=function(){function a(d,b,c,f){this.target=d;this.path=b;this.oldValue=c;this.callback=f;this.uid=0;this.removed=!1;this.propertyPath=n.pathToStringOrArray(b);this.uid=++a.uid}a.prototype.release=function(){this.target=this.path=this.propertyPath=this.callback=this.oldValue=null;this.uid=++a.uid;this.removed=!0};a.pool=new A.ReentrantObjectPool(a,!0);a.uid=0;return a}(),h=new z,l=new Set,d=h.acquire(),p;f.dispatchTarget=function(a){for(var g=h.copy(d),b=0;b<g.length;b++){var c=g[b];c.target===
a&&(w(c),l.delete(c),d.splice(d.indexOf(c),1))}};f.removeTarget=function(a){for(var g=0;g<d.length;g++){var b=d[g];b.target===a&&(b.removed=!0)}};f.dispatch=v;var q=new Set;f.afterDispatch=function(a){q.add(a);return{remove:function(){q.delete(a)}}};f.watch=y;f.isValueInUse=function(a){return d.some(function(d){return d.oldValue===a})};f.default=y});