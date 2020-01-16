// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../tsSupport/generatorHelper ../tsSupport/awaiterHelper ../Error ../has ../promiseUtils ./Connection ./RemoteClient ./WorkerOwner".split(" "),function(w,a,r,k,x,f,h,y,z,A){function t(){return k(this,void 0,void 0,function(){var a,b,e;return r(this,function(c){if(d)return[2,d];l=h.createAbortController();a=[];b=function(b){var c=A.create(b).then(function(a){return g[b]=a});a.push(c)};for(e=0;e<p;e++)b(e);d=h.all(a);return[2,d]})})}Object.defineProperty(a,"__esModule",{value:!0});
a.Connection=y;a.RemoteClient=z;var p=f("esri-workers-debug")?1:f("host-browser")?navigator.hardwareConcurrency-1:0;p||(p=f("safari")&&f("mac")||f("trident")?7:2);var u=0,g=[];a.initialize=function(){t()};a.openWithPorts=function(c,b){return new a.Connection(c.map(function(c){return new a.RemoteClient(c,b,{})}))};a.open=function(c,b){void 0===b&&(b={});return k(this,void 0,void 0,function(){var e,d,q,k,n,l,v;return r(this,function(m){switch(m.label){case 0:if("string"!==typeof c)throw new x("workers:undefined-module",
"modulePath is missing");e=b.signal;d=b.strategy||"distributed";f("host-webworker")&&!f("esri-workers")&&(d="local");return"local"!==d?[3,2]:[4,h.create(function(a){return w([c],a)})];case 1:return q=m.sent(),h.throwIfAborted(e),k=b.client||q,n=a.RemoteClient.connect(q),[2,new a.Connection([new a.RemoteClient(n,k,b)])];case 2:return[4,t()];case 3:m.sent();h.throwIfAborted(e);if("dedicated"!==d)return[3,5];l=u++;u%=p;return[4,g[l].open(c,b)];case 4:return n=m.sent(),[2,new a.Connection([new a.RemoteClient(n,
b.client,b)])];case 5:return[4,h.all(g.map(function(a){return a.open(c,b)}))];case 6:return v=m.sent(),[2,new a.Connection(v.map(function(c){return new a.RemoteClient(c,b.client,b)}))]}})})};a.terminate=function(){d&&(l.abort(),d=null);for(var a=0;a<g.length;a++)g[a]&&g[a].terminate();g.length=0};var d=null,l});