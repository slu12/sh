// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ./tsSupport/generatorHelper ./tsSupport/awaiterHelper ./asyncUtils ./Collection ./Loadable".split(" "),function(r,a,k,l,n,p,q){function g(a,m){return l(this,void 0,void 0,function(){return k(this,function(d){switch(d.label){case 0:return[4,a.load()];case 1:return d.sent(),[2,e(a,m)]}})})}function e(a,m){return l(this,void 0,void 0,function(){var d,h,f,g=this;return k(this,function(e){switch(e.label){case 0:return d=[],h=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=
arguments[b];for(b=0;b<a.length;b++){var c=a[b];c&&(Array.isArray(c)?h.apply(void 0,c):p.isCollection(c)?c.forEach(function(a){return h(a)}):q.isLoadable(c)&&d.push(c))}},m(h),f=null,[4,n.map(d,function(a){return l(g,void 0,void 0,function(){var b;return k(this,function(c){switch(c.label){case 0:return[4,n.result("loadAll"in a&&"function"===typeof a.loadAll?a.loadAll():a.load())];case 1:return b=c.sent(),!1!==b.ok||f||(f=a),[2]}})})})];case 1:e.sent();if(f)throw f.loadError;return[2,a]}})})}Object.defineProperty(a,
"__esModule",{value:!0});a.loadAll=g;a.loadAllChildren=e;a.default=g});