// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","./deprecate","./Logger","./promiseUtils"],function(l,c,e,f,g){function d(a,b){e.deprecatedFunction(h,"when",{moduleName:"requireUtils",replacement:"Use `promiseUtils.create()` instead.",version:"4.10",warnOnce:!0});return Array.isArray(b)?g.create(function(k){a(b,function(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];k(b)})}):d(a,[b]).then(function(a){return a[0]})}Object.defineProperty(c,"__esModule",{value:!0});var h=f.getLogger("esri.core.requireUtils");
c.when=d;c.getAbsMid=function(a,b,c){return b.toAbsMid?b.toAbsMid(a):c.id.replace(/\/[^\/]*$/gi,"/")+a}});