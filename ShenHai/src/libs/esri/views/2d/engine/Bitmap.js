// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/libs/gl-matrix-2/mat3 ../../../core/libs/gl-matrix-2/mat3f32 ../../../core/libs/gl-matrix-2/vec2f32 ../../webgl ./DisplayObject ./ImageryBitmapSource".split(" "),function(f,l,r,e,t,g,u,v,w){function x(b){var a=document.createElement("canvas");a.width=b.width;a.height=b.height;b.render(a.getContext("2d"));return a}function m(b,a,d){var h={target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071};a&&d&&
(h.width=a,h.height=d);return new u.Texture(b,h)}function n(b){p.has(b)&&(q.splice(q.indexOf(b),1),p.delete(b))}Object.defineProperty(l,"__esModule",{value:!0});var q=[],p=new Set;f=function(b){function a(d,a){void 0===d&&(d=null);void 0===a&&(a=function(){return null});var c=b.call(this)||this;c.stencilRef=0;c.coordScale=[1,1];c._height=void 0;c.pixelRatio=1;c.resolution=0;c.rotation=0;c._source=null;c._width=void 0;c.x=0;c.y=0;c.transforms={dvs:t.mat3f32.create()};c.source=d;c.requestRender=a;return c}
r(a,b);Object.defineProperty(a.prototype,"isSourceScaled",{get:function(){return this.width!==this.sourceWidth||this.height!==this.sourceHeight},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"height",{get:function(){return void 0!==this._height?this._height:this.sourceHeight},set:function(d){this._height=d},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"source",{get:function(){return this._source},set:function(d){this._source=d;this.invalidateTexture()},enumerable:!0,
configurable:!0});Object.defineProperty(a.prototype,"sourceHeight",{get:function(){return this._source instanceof HTMLImageElement?this._source.naturalHeight:this._source.height},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"sourceWidth",{get:function(){return this._source instanceof HTMLImageElement?this._source.naturalWidth:this._source.width},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"width",{get:function(){return void 0!==this._width?this._width:this.sourceWidth},
set:function(d){this._width=d},enumerable:!0,configurable:!0});a.prototype.attach=function(){this.updateTexture();return!0};a.prototype.detach=function(){this._texture.dispose();this._texture=null;n(this)};a.prototype.invalidateTexture=function(){this.attached?this.updateTexture():n(this)};a.prototype.setTransform=function(d){var a=e.mat3.identity(this.transforms.dvs),c=d.toScreenNoRotation([0,0],this.x,this.y),b=this.resolution/this.pixelRatio/d.resolution,k=b*this.width,b=b*this.height,f=Math.PI*
this.rotation/180;e.mat3.translate(a,a,g.vec2f32.fromValues(c[0],c[1]));e.mat3.translate(a,a,g.vec2f32.fromValues(k/2,b/2));e.mat3.rotate(a,a,-f);e.mat3.translate(a,a,g.vec2f32.fromValues(-k/2,-b/2));e.mat3.scaleByVec2(a,a,g.vec2f32.fromValues(k,b));e.mat3.multiply(this.transforms.dvs,d.displayViewMat3,a)};a.prototype.updateTexture=function(){this._texture||(this._texture=this.source?m(this.stage.context,this.sourceWidth,this.sourceHeight):m(this.stage.context));var a=this.source;a?(this._texture.resize(this.sourceWidth,
this.sourceHeight),a&&"render"in a?a instanceof w.default?(a=a.getRenderedRasterPixels(),this._texture.setData(a.renderedRasterPixels)):this._texture.setData(x(a)):!a||"render"in a||this._texture.setData(a),this.ready(),this.requestRender()):this._texture.setData(null)};a.prototype.setSamplingProfile=function(a){this._texture&&(a.mips&&!this._texture.descriptor.hasMipmap&&this._texture.generateMipmap(),this._texture.setSamplingMode(a.samplingMode))};a.prototype.bind=function(a){this._texture&&this.stage.context.bindTexture(this._texture,
a)};return a}(v.DisplayObject);l.Bitmap=f});