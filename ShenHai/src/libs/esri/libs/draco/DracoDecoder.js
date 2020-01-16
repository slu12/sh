// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/has","../../core/promiseUtils","./draco_decoder"],function(f,a,k,c,l){function g(){return!!k("esri-wasm")}function m(){return f.toUrl("./draco_decoder.wasm")}Object.defineProperty(a,"__esModule",{value:!0});(function(b){for(var d in b)a.hasOwnProperty(d)||(a[d]=b[d])})(l);a.isSupported=g;a.getDecoderModule=function(){if(!g())return c.reject(Error("Draco decompression not available, missing WebAssembly support"));e||(e=c.create(function(b){return f(["./draco_decoder"],
function(a){h=a({locateFile:m});b(h)})}).catch(function(a){return c.reject(a)}));return e};var e,h});