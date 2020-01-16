// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/has ../../../../core/maybe ../../../../core/now ../../../../core/libs/gl-matrix-2/mat4f64 ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../support/geometryUtils ./intersectorUtils".split(" "),function(u,v,w,p,x,r,q,g,h,n){return function(){function a(c){this.options=new n.IntersectorOptions;this.results=new n.IntersectorResults;this.transform=new n.IntersectorTransform;this.performanceInfo={queryDuration:0,numObjectsTested:0};
this.tolerance=1E-5;this._ray={origin:g.vec3f64.create(),direction:g.vec3f64.create()};this._rayEndPoint=g.vec3f64.create();this._rayStartPointTransformed=g.vec3f64.create();this._rayEndPointTransformed=g.vec3f64.create();this.viewingMode=c||"global"}Object.defineProperty(a.prototype,"ray",{get:function(){return this._ray},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"rayBeginPoint",{get:function(){return this._ray.origin},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"rayEndPoint",{get:function(){return this._rayEndPoint},enumerable:!0,configurable:!0});a.prototype.reset=function(c,b){this.resetWithRay(h.ray.fromPoints(c,b,this._ray))};a.prototype.resetWithRay=function(c){c!==this._ray&&h.ray.copy(c,this._ray);q.vec3.add(this._rayEndPoint,this._ray.origin,this._ray.direction);this._numObjectsTested=0;this.results.init(this._ray)};a.prototype.intersect=function(c,b,a,l,f,k){var g=this;this.point=b;this.camera=a;this.filterPredicate=f;this.tolerance=null==l?1E-5:
l;b=p.isSome(this.options.verticalOffset)?this.options.verticalOffset.object3D:null;a=k?function(b){k(b)&&g.intersectObject(b)}:function(b){g.intersectObject(b)};if(c&&0<c.length)for(l=0;l<c.length;l++){f=c[l];var e=f.getSpatialQueryAccelerator?f.getSpatialQueryAccelerator():void 0;if(e)b?e.forEachAlongRayWithVerticalOffset(this._ray.origin,this._ray.direction,a,b):e.forEachAlongRay(this._ray.origin,this._ray.direction,a),this.options.selectionMode&&this.options.hud&&e.forEachDegenerateObject(a);
else for(e=0,f=f.getObjects();e<f.length;e++)a(f[e])}this.sortResults()};a.prototype.intersectObject=function(c){var b=this;this._numObjectsTested++;var a=c.geometryRecords;if(a)for(var l=c.id,f=c.objectTransformation,g,h=p.isSome(this.options.verticalOffset)?this.options.verticalOffset.object3D:null,e=function(a){var e=a.geometry,m=a.material,k=a.instanceParameters;if(k.hidden)return"continue";g=e.id;d.transform.setAndInvalidateLazyTransforms(f,a.getShaderTransformation());q.vec3.transformMat4(d._rayStartPointTransformed,
d._ray.origin,d.transform.inverse);q.vec3.transformMat4(d._rayEndPointTransformed,d._rayEndPoint,d.transform.inverse);var t=d.transform.transform;p.isSome(h)&&(h.objectTransform=d.transform);m.intersect(e,k,d.transform.transform,d,d._rayStartPointTransformed,d._rayEndPointTransformed,function(a,d,e,f,h,k){0<=a&&(null==b.filterPredicate||b.filterPredicate(b._ray.origin,b._rayEndPoint,a))&&(h?(null==b.results.hud.dist||a<b.results.hud.dist)&&b.results.hud.set(c,l,a,d,r.mat4f64.IDENTITY,f,k,g,e):(h=
function(b){return b.set(c,l,a,d,t,f,null,g,e)},(null==b.results.min.drapedLayerOrder||f>=b.results.min.drapedLayerOrder)&&(null==b.results.min.dist||a<b.results.min.dist)&&h(b.results.min),0!==b.options.store&&(null==b.results.max.drapedLayerOrder||f<b.results.max.drapedLayerOrder)&&(null==b.results.max.dist||a>b.results.max.dist)&&h(b.results.max),2===b.options.store&&(k=new n.IntersectorResult(b._ray),h(k),b.results.all.push(k))))},a.shaderTransformation)},d=this,m=0;m<a.length;m++)e(a[m])};a.prototype.sortResults=
function(){this.results.all.sort(function(a,b){return a.dist!==b.dist?a.dist-b.dist:a.drapedLayerOrder!==b.drapedLayerOrder?(void 0!==a.drapedLayerOrder?a.drapedLayerOrder:Number.MAX_VALUE)-(void 0!==b.drapedLayerOrder?b.drapedLayerOrder:Number.MAX_VALUE):(void 0!==b.drapedLayerGraphicOrder?b.drapedLayerGraphicOrder:Number.MIN_VALUE)-(void 0!==a.drapedLayerGraphicOrder?a.drapedLayerGraphicOrder:Number.MIN_VALUE)})};a.DEFAULT_TOLERANCE=1E-5;return a}()});