// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,f){Object.defineProperty(f,"__esModule",{value:!0});e=function(){function d(b,c,a,d,g){void 0===a&&(a=0);this.TypedArrayConstructor=b;this.elementCount=16;b=this.TypedArrayConstructor;void 0===d&&(d=16*b.BYTES_PER_ELEMENT);var e=0===c.byteLength?0:a;this.typedBuffer=null==g?new b(c,e):new b(c,e,(g-a)/b.BYTES_PER_ELEMENT);this.typedBufferStride=d/b.BYTES_PER_ELEMENT;this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride);this.stride=this.typedBufferStride*
this.TypedArrayConstructor.BYTES_PER_ELEMENT}d.prototype.getMat=function(b,c){b*=this.typedBufferStride;for(var a=0;16>a;a++)c[a]=this.typedBuffer[b+a];return c};d.prototype.setMat=function(b,c){b*=this.typedBufferStride;for(var a=0;16>a;a++)this.typedBuffer[b+a]=c[a]};d.prototype.get=function(b,c){return this.typedBuffer[b*this.typedBufferStride+c]};d.prototype.set=function(b,c,a){this.typedBuffer[b*this.typedBufferStride+c]=a};d.prototype.copyFrom=function(b,c,a){var d=this.typedBuffer,e=c.typedBuffer;
b*=this.typedBufferStride;c=a*c.typedBufferStride;for(a=0;16>a;++a)d[b+a]=e[c+a]};Object.defineProperty(d.prototype,"buffer",{get:function(){return this.typedBuffer.buffer},enumerable:!0,configurable:!0});d.ElementCount=16;return d}();f.BufferViewMat4Impl=e});