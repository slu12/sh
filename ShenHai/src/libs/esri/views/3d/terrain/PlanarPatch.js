// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/mathUtils ../../../geometry/support/aaBoundingBox ../support/geometryUtils ./PatchGeometryFactory ./Tile".split(" "),function(b,e,g,f,h,k,l,m){Object.defineProperty(e,"__esModule",{value:!0});b=function(d){function a(c,n,p){var b=d.call(this,a.NumSubdivisionsAtLevel)||this;void 0!==c&&b.init(c,n,p);return b}g(a,d);a.prototype.init=function(c,a,b){d.prototype.init.call(this,c,a,b);this._edgeLen=this.extent[2]-this.extent[0];
this._edgeLen2=this._edgeLen*this._edgeLen;this.centerAtSeaLevel[0]=f.lerp(this.extent[0],this.extent[2],.5);this.centerAtSeaLevel[1]=f.lerp(this.extent[1],this.extent[3],.5);this.centerAtSeaLevel[2]=0;this.updateRadiusAndCenter()};a.prototype.updateRadiusAndCenter=function(){this._updateCenter();var a=(this.extent[2]-this.extent[0])*Math.SQRT1_2,b=.5*(this.elevationBounds[0]-this.elevationBounds[1]);this._radius=Math.sqrt(a*a+b*b)};a.prototype._isVisible=function(){return this.intersectsClippingArea&&
k.frustum.intersectsAABB(this.surface.frustum.planes,h.wrap(this.extent[0],this.extent[1],this.elevationBounds[0],this.extent[2],this.extent[3],this.elevationBounds[1]))};a.prototype.createGeometry=function(a,b){l.createPlanarGlobePatch(a,this.extent,b,this.renderData);this.setMemoryDirty()};a.NumSubdivisionsAtLevel=[2,2,2,2,2,2,2,2];return a}(m.Tile);e.PlanarPatch=b});