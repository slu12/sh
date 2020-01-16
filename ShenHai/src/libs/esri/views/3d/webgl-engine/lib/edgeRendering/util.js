// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../../core/arrayUtils","../../../../../core/maybe","../../../../../core/typedArrayUtil"],function(n,d,m,h,k){function f(a){return 0<a.size*a.color[3]*a.opacity}function l(a,c){var b=m.binaryIndexOf(a,c,!0);return-1===b?c<a[0]?0:a.length:b}Object.defineProperty(d,"__esModule",{value:!0});d.determineRendererType=function(a){for(var c=null,b=0;b<a.length;b++){var e=a[b],d=e.type;if(f(e))if(h.isNone(c))c=d;else if(c!==d)return"uber"}return h.isSome(c)?c:"solid"};
d.determineEdgeTransparency=function(a){for(var c=0,b=0;b<a.length;b++){var e=a[b].material;if(f(e)){if(1>e.color[3]*e.opacity)return 1;c=2}}return c};d.determineObjectTransparency=function(a){for(var c=0,b=0;b<a.length;b++){var e=a[b].material;if(f(e)){switch(e.objectTransparency){case 1:case 0:return 1}c=2}}return c};d.cloneIndices=function(a){if(Uint16Array.from)return k.isUint16Array(a)?Uint16Array.from(a):Uint32Array.from(a);for(var c=k.isUint16Array(a)?new Uint16Array(a.length):new Uint32Array(a.length),
b=0;b<a.length;b++)c[b]=a[b];return c};d.estimateLengthAtDistance=function(a,c,b,e){return e/a*b*2*Math.tan(.5*c)};d.findLowerBoundIndex=l;d.computeEdgeCount=function(a,c,b){return a.length-l(a,c*b.minimumEdgeLength)};d.fillComponenBufferIndices=function(a,c,b,e){for(var d=0;d<a.length;d++){var f=a[d].index,g=c[d],h=c[d+1];if(e)for(;g<h;g++)b.set(e[g],f);else for(;g<h;g++)b.set(g,f)}}});