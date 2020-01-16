// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/Error ../../../../../../core/Logger ../../../../../../core/screenUtils ../../../../../../core/libs/gl-matrix-2/mat2d ../../../../../../core/libs/gl-matrix-2/mat2df32 ../../../../../../core/libs/gl-matrix-2/vec2 ../../../../../../core/libs/gl-matrix-2/vec2f32 ../../../../../../symbols/cim/enums ../../color ../../number ../../materialKey/MaterialKey ./util ./WGLBaseMarkerTemplate ./WGLDynamicMeshTemplate ../../util/Result".split(" "),
function(v,y,D,E,F,p,z,G,m,B,H,r,h,C,e,I,J,K){Object.defineProperty(y,"__esModule",{value:!0});var L=3.14159265359/180,b=B.vec2f32.create(),l=G.mat2df32.create(),M=F.getLogger("esri.views.2d.engine.webgl.WGLDynamicMarkerTemplate");v=function(v){function n(b,c,h){var f=v.call(this,c)||this;f._cimMarkerLayer=c;var a=0;e.isFunction(c.color)||(a=r.premultiplyAlphaRGBA(c.color));f._dynamicPropertyMap.set("_fillColor",function(b,A,d){return e.isFunction(c.color)?r.premultiplyAlphaRGBA(c.color(b,A,d)):a});
var l=0;e.isFunction(c.outlineColor)||(l=r.premultiplyAlphaRGBA(c.outlineColor));f._dynamicPropertyMap.set("_outlineColor",function(a,b,d){return e.isFunction(c.outlineColor)?r.premultiplyAlphaRGBA(c.outlineColor(a,b,d)):l});var t;e.isFunction(c.size)||(t=p.pt2px(c.size));f._dynamicPropertyMap.set("_size",function(a,b,d){return e.isFunction(c.size)?p.pt2px(c.size(a,b,d)):t});var u;e.isFunction(c.scaleX)||(u=c.scaleX);f._dynamicPropertyMap.set("_scaleX",function(a,b,d){return e.isFunction(c.scaleX)?
c.scaleX(a,b,d):u});var g;e.isFunction(c.offsetX)||(g=p.pt2px(c.offsetX));f._dynamicPropertyMap.set("xOffset",function(a,b,d){return e.isFunction(c.offsetX)?p.pt2px(c.offsetX(a,b,d)):g});var q;e.isFunction(c.offsetY)||(q=p.pt2px(c.offsetY));f._dynamicPropertyMap.set("yOffset",function(a,b,d){return e.isFunction(c.offsetY)?p.pt2px(c.offsetY(a,b,d)):q});var m;e.isFunction(c.outlineWidth)||(m=p.pt2px(c.outlineWidth));f._dynamicPropertyMap.set("_outlineWidth",function(a,b,d){return e.isFunction(c.outlineWidth)?
p.pt2px(c.outlineWidth(a,b,d)):m});var w;e.isFunction(c.rotation)||(w=c.rotation);f._dynamicPropertyMap.set("_angle",function(a,b,d){return e.isFunction(c.rotation)?c.rotation(a,b,d):w});var k=1;e.isFunction(h)||(k=h);f._dynamicPropertyMap.set("_scaleFactor",function(a,c,b){return e.isFunction(h)?h(a,c,b):k});f._bitSet=(c.alignment===H.Alignment.MAP?1:0)|(c.colorLocked?1:0)<<1|(c.scaleSymbolsProportionally?1:0)<<3;f._materialKey=C.createMaterialKey(f.geometryType,b,!1);return f}D(n,v);n.fromCIMMarker=
function(b,c,e){return new n(b,c,e)};n.prototype.bindFeature=function(e,c,v){var f=this,a=this._dynamicPropertyMap;a&&a.forEach(function(a,b){f[b]=a(e,c,v)});a=this._cimMarkerLayer.materialHash;a="function"===typeof a?a(e,c,v):a;if((a=this._materialCache.get(a))&&K.ok(a.spriteMosaicItem)&&a.spriteMosaicItem){var a=a.spriteMosaicItem,n=this._cimMarkerLayer.sizeRatio,t=a.width/a.height*this._scaleX,u=this._cimMarkerLayer.rotateClockwise?this._angle:-this._angle,g=this._size,q=g*t,r=this.xOffset*this._scaleFactor,
w=this.yOffset*this._scaleFactor,k=this._cimMarkerLayer.scaleSymbolsProportionally&&this._cimMarkerLayer.frameHeight?this._size/p.pt2px(this._cimMarkerLayer.frameHeight):1,y=this._outlineWidth*k,A=p.pt2px(this._cimMarkerLayer.referenceSize),d=0,k=0,x=this._cimMarkerLayer.anchorPoint;x&&(this._cimMarkerLayer.isAbsoluteAnchorPoint?this._size&&(d=-x.x/(this._size*t),k=x.y/this._size):(d=x.x,k=x.y));this._sizeOutlineWidth=h.i8888to32(Math.round(Math.sqrt(256*q)),Math.round(Math.sqrt(256*g)),Math.round(Math.sqrt(256*
y)),Math.round(Math.sqrt(256*A)));z.mat2d.identity(l);z.mat2d.translate(l,l,B.vec2f32.fromValues(r,-w));u&&z.mat2d.rotate(l,l,L*u);t=a.rect.x;u=a.rect.y;r=t+a.rect.width;w=u+a.rect.height;d=.5-((.5+d)*a.width+1)/a.rect.width;k=.5-((.5+k)*a.height+1)/a.rect.height;q=q*n*this._scaleFactor;g=g*n*this._scaleFactor;n=Math.round(64*n);q*=a.rect.width/a.width;g*=a.rect.height/a.height;d=(d-.5)*q;k=(k-.5)*g;this._bitestAndDistRatio=h.i8888to32(0,0,this._bitSet,n);m.vec2.set(b,d,k);m.vec2.transformMat2d(b,
b,l);this._offsetUpperLeft=h.i1616to32(16*b[0],16*b[1]);this._texUpperLeft=h.i1616to32(t,u);m.vec2.set(b,d+q,k);m.vec2.transformMat2d(b,b,l);this._offsetUpperRight=h.i1616to32(16*b[0],16*b[1]);this._texUpperRight=h.i1616to32(r,u);m.vec2.set(b,d,k+g);m.vec2.transformMat2d(b,b,l);this._offsetBottomLeft=h.i1616to32(16*b[0],16*b[1]);this._texBottomLeft=h.i1616to32(t,w);m.vec2.set(b,d+q,k+g);m.vec2.transformMat2d(b,b,l);this._offsetBottomRight=h.i1616to32(16*b[0],16*b[1]);this._texBottomRight=h.i1616to32(r,
w);g=C.MarkerMaterialKey.load(this._materialKey);g.sdf=a.sdf;g.pattern=!0;g.textureBinding=a.textureBinding;this._materialKey=g.data}else M.error(E("mapview-cim","Encountered an error when binding feature"))};return n}(I.default(J.default));y.default=v});