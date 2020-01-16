// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/decorateHelper ../../../../core/Accessor ../../../../core/Handles ../../../../core/mathUtils ../../../../core/maybe ../../../../core/PooledArray ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../core/libs/gl-matrix-2/vec2f64 ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../../../core/libs/gl-matrix-2/vec4f64 ../../../../geometry/support/aaBoundingRect ./deconflictorDebug ../../support/debugFlags ../../support/earthUtils ../../support/geometryUtils ../../support/geometryUtils/sphere ../../webgl-engine/lib/screenSizePerspectiveUtils ../../webgl-engine/lib/Util ../../webgl-engine/materials/HUDMaterial ../../webgl-engine/materials/internal/MaterialUtil ../../../support/index".split(" "),
function(G,H,P,Q,D,R,S,I,T,k,U,t,V,y,J,v,u,w,W,X,z,Y,Z,K,aa,B,E){function ba(h){var b,a,c,e,f,d;return Q(this,function(g){switch(g.label){case 0:if(!Map.prototype.entries)return[3,5];b=h.entries();a=b.next();g.label=1;case 1:return a.done?[3,4]:[4,a.value[1]];case 2:g.sent(),g.label=3;case 3:return a=b.next(),[3,1];case 4:return[3,9];case 5:c=Array(h.size),e=0,h.forEach(function(a){return c[e++]=a}),f=0,d=c,g.label=6;case 6:if(!(f<d.length))return[3,9];a=d[f];return[4,a];case 7:g.sent(),g.label=8;
case 8:return f++,[3,6];case 9:return[2]}})}Object.defineProperty(H,"__esModule",{value:!0});var L=v.vec4f64.create(),A=v.vec4f64.create(),M=v.vec4f64.create(),ca=v.vec4f64.create(),N=z.sphere.create(),C=z.ray.create(),O=J.vec3f64.create(),da=u.create(),ea=u.create(),fa=function(){return function(){this.posView=this.yMax=this.yMin=this.xMax=this.xMin=0;this.pooled=this.visible=this.culled=!1}}(),ga=function(){return function(h,b,a){void 0===a&&(a={});this.graphics3DGraphic=h;this.slicePlaneEnabled=
b;this.info=a}}(),ha=function(){return function(h,b){void 0===b&&(b=new Map);this.graphics3DCore=h;this.graphics=b}}();G=function(h){function b(){var a,c,e=null!==h&&h.apply(this,arguments)||this;e.handles=new S;e.dirty=!1;e.state=0;e.contexts=[];e.graphics=(a={},a[0]={active:new Map,visible:new k,remove:new k},a[1]={active:new Map,visible:new k,remove:new k},a);e.iterators=(c={},c[0]={active:null,visible:null,remove:null,sort:null},c[1]={active:null,visible:null,remove:null,sort:null},c);e.accBinsNumX=
15;e.accBinsNumY=20;e.accBinsSizeX=0;e.accBinsSizeY=0;e.accBins=null;e.accNumTests=0;e._iconMarginFactor=-.1;e.slicePlaneViewSpace=null;return e}P(b,h);Object.defineProperty(b.prototype,"iconMarginFactor",{get:function(){return this._iconMarginFactor},set:function(a){this._iconMarginFactor=a;this.setDirty()},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;this.handles.add([this.view.watch("state.camera",function(){a.updateSlicePlane();a.setDirtyUrgent()}),this.view.watch("map.ground.opacity",
function(c,e){1!==c&&1!==e||a.setDirtyUrgent()}),U.init(this.view,"slicePlane",function(){return a.updateSlicePlane()})]);this.frameWorker=this.view.resourceController.scheduler.registerTask(E.Task.DECONFLICTOR_DELAYED,function(c){return a.run(c)},function(){return a.needsUpdate()})};b.prototype.updateSlicePlane=function(){var a=this.view&&this.view.slicePlane;a?(this.slicePlaneViewSpace||(this.slicePlaneViewSpace=z.boundedPlane.create()),z.boundedPlane.transform(a,this.view.state.camera.viewMatrix,
this.slicePlaneViewSpace),this.slicePlaneChanged()):this.slicePlaneViewSpace&&(this.slicePlaneViewSpace=null,this.slicePlaneChanged())};b.prototype.slicePlaneChanged=function(){for(var a=0,c=this.contexts;a<c.length;a++)if(c[a].graphics3DCore.symbolCreationContext.slicePlaneEnabled){this.setDirty();break}};b.prototype.destroy=function(){this.handles.destroy();this.handles=null;this.frameWorker&&(this.frameWorker.remove(),this.frameWorker=null);this.iterators=this.graphics=null};b.prototype.addGraphicsOwner=
function(a){var c=this,e=this.findDeconflictionContext(a),b;-1!==e?b=this.contexts[e]:(b=new ha(a),this.contexts.push(b),this.setDirtyUrgent());return{addGraphic:function(a){return c.addGraphic(b,a)},removeGraphic:function(a){return c.removeGraphic(b,a)},labelingInfoChange:function(){return c.globalLabelingInfoChanged(b)},visibilityInfoChange:function(){},featureReductionChange:function(){return c.globalFeatureReductionChanged(b)},slicePlaneEnabledChange:function(){return c.globalSlicePlaneEnabledChanged(b)},
clear:function(){return b.graphics.forEach(function(a){return c.removeGraphic(b,a.graphics3DGraphic)})}}};b.prototype.removeGraphicsOwner=function(a){var c=this;a=this.findDeconflictionContext(a);if(-1!==a){var e=this.contexts.splice(a,1)[0];e.graphics.forEach(function(a){return c.removeGraphic(e,a.graphics3DGraphic)});this.setDirtyUrgent()}};b.prototype.setInitialIconVisibilityFlag=function(a,c){a=!(this.graphicSupportsDeconfliction(c)&&this.isFeatureReductionEnabled(a));c.setVisibilityFlag(3,a,
0)};b.prototype.setDirtyUrgent=function(){!this.dirty&&0<this.contexts.length&&(this.dirty=!0,this.notifyChange("updating"));this.frameWorker.task=E.Task.DECONFLICTOR_IMMEDIATE};b.prototype.setDirty=function(){!this.dirty&&0<this.contexts.length&&(this.dirty=!0,this.notifyChange("updating"),this.frameWorker.task=E.Task.DECONFLICTOR_DELAYED)};Object.defineProperty(b.prototype,"updating",{get:function(){return 0!==this.state||this.dirty},enumerable:!0,configurable:!0});b.prototype.needsUpdate=function(){return this.view.ready&&
null!=this.view.state&&this.updating};b.prototype.run=function(a){switch(this.state){case 0:w.prepare(this.view),this.dirty=!1,this.camera=this.view.state.camera,this.initBins(this.camera.fullWidth,this.camera.fullHeight),this.resetIterators(),a.madeProgress();case 1:if(this.state=1,!this.processActiveGraphics(0,a))break;case 3:if(this.state=3,!this.cleanVisibleGraphics(0,a))break;case 5:if(this.state=5,!this.sortVisibleGraphics(0,a))break;case 7:this.state=7;if(!this.deconflictVisibleGraphics(0,
a))break;w.drawAccelerationStruct(this,this.graphics[0].visible);case 2:if(this.state=2,!this.processActiveGraphics(1,a))break;case 4:if(this.state=4,!this.cleanVisibleGraphics(1,a))break;case 6:if(this.state=6,!this.sortVisibleGraphics(1,a))break;case 8:this.state=8;if(!this.deconflictVisibleGraphics(1,a))break;w.drawAccelerationStruct(this,this.graphics[1].visible);default:this.state=0,this.notifyChange("updating")}};b.prototype.findDeconflictionContext=function(a){for(var c=0;c<this.contexts.length;c++)if(this.contexts[c].graphics3DCore===
a)return c;return-1};b.prototype.globalFeatureReductionChanged=function(a){var c=this.isFeatureReductionEnabled(a.graphics3DCore);c||this.clearVisibilityFlags(a);this.modifyGraphics(a,c,0)};b.prototype.globalLabelingInfoChanged=function(a){this.modifyGraphics(a,a.graphics3DCore.labelsEnabled,1)};b.prototype.globalSlicePlaneEnabledChanged=function(a){var c=a.graphics3DCore.symbolCreationContext.slicePlaneEnabled;a.graphics.forEach(function(a){a.slicePlaneEnabled=c});this.setDirtyUrgent()};b.prototype.modifyGraphics=
function(a,c,b){var e=this;c?a.graphics.forEach(function(a){return e.addToActiveGraphics(a,b)}):a.graphics.forEach(function(a){return e.removeFromActiveGraphics(a,b)});this.setDirtyUrgent()};b.prototype.graphicSupportsDeconfliction=function(a){var c=a._graphics;if(!c||!c.length||a.isDraped())return!1;for(a=0;a<c.length;a++)if(this.graphics3DGraphicsLayerSupportsDeconfliction(c[a]))return!0;return!1};b.prototype.graphics3DGraphicsLayerSupportsDeconfliction=function(a){if(T.isNone(a)||"object3d"!==
a.type)return!1;a=a.stageObject;return 1===(a?a.getNumGeometryRecords():0)&&a.getGeometryRecord(0).material instanceof aa?!0:!1};b.prototype.addGraphic=function(a,c){var b=c.graphic.uid;c=new ga(c,a.graphics3DCore.symbolCreationContext.slicePlaneEnabled);a.graphics.set(b,c);this.isFeatureReductionEnabled(a.graphics3DCore)&&this.addToActiveGraphics(c,0);a.graphics3DCore.labelsEnabled&&this.addToActiveGraphics(c,1);this.setDirty()};b.prototype.removeGraphic=function(a,c){c=c.graphic.uid;var b=a.graphics.get(c);
b&&(this.removeFromActiveGraphics(b,0),this.removeFromActiveGraphics(b,1),a.graphics.delete(c),this.setDirty())};b.prototype.addToActiveGraphics=function(a,c){a.info[c]=new fa;this.graphics[c].active.set(a.graphics3DGraphic.graphic.uid,a)};b.prototype.removeFromActiveGraphics=function(a,c){this.removeFromVisibleGraphics(a,c);this.clearGraphicVisibility(a,c);delete a.info[c];this.graphics[c].active.delete(a.graphics3DGraphic.graphic.uid)};b.prototype.addToVisibleGraphics=function(a,c){var b=a.info[c];
b&&!b.pooled&&(this.graphics[c].visible.push(a),b.pooled=!0)};b.prototype.removeFromVisibleGraphics=function(a,c){var b=a.info[c];b&&b.pooled&&(this.graphics[c].remove.push(a),b.pooled=!1)};b.prototype.processActiveGraphics=function(a,c){for(var b=this.getOrCreateActiveGraphicsIterator(a),f="global"===this.view.viewingMode&&1===this.view.map.ground.opacity&&this.camera&&0<this.camera.relativeElevation;!c.done;){c.madeProgress();var d=b.next();if(d.done)return this.resetActiveGraphicsIterator(a),!0;
var g=(d=d.value)&&d.info[a];g&&(this.collectGraphics3DGraphics(d,a,f),g.culled?this.removeFromVisibleGraphics(d,a):this.addToVisibleGraphics(d,a))}return!1};b.prototype.cleanVisibleGraphics=function(a,c){for(var b=this.graphics[a],f=this.ensureRemoveGraphicsIterator(a);!c.done;){var d=f.next();c.madeProgress();if(d.done)return b.remove.clear(),this.resetRemoveGraphicsIterator(a),!0}return!1};b.prototype.sortVisibleGraphics=function(a,c){for(var b=this.ensureSortGraphicsIterator(a,function(c,b){return c.info[a]&&
b.info[a]?b.info[a].posView-c.info[a].posView:Number.MAX_VALUE});!c.done;){var f=b.next();c.madeProgress();if(f.done)return this.resetSortGraphicsIterator(a),!0}return!1};b.prototype.deconflictVisibleGraphics=function(a,c){for(var b=this.getOrCreateVisibleGraphicsIterator(a),f=1===a;!c.done;){c.madeProgress();var d=b.next();if(d.done)return this.resetVisibleGraphicsIterator(a),!0;var d=d.value,g=d.info[a];if(g&&!g.culled){var q=d.graphics3DGraphic,q=!(f&&!q.isVisible())&&!this.doesIntersectExistingPoly(d,
a);(g.visible=q)&&this.addToBins(d,a);this.setGraphicVisibility(d,a,q);w.drawPoly(g,q)}}return!1};b.prototype.resetIterators=function(){this.iterators[0].active=null;this.iterators[0].visible=null;this.iterators[0].remove=null;this.iterators[0].sort=null;this.iterators[1].active=null;this.iterators[1].visible=null;this.iterators[1].remove=null;this.iterators[1].sort=null};b.prototype.getOrCreateActiveGraphicsIterator=function(a){var c=this.graphics[a];a=this.iterators[a];a.active||(a.active=ba(c.active));
return a.active};b.prototype.resetActiveGraphicsIterator=function(a){this.iterators[a].active=null};b.prototype.getOrCreateVisibleGraphicsIterator=function(a){var c=this.graphics[a];a=this.iterators[a];a.visible||(a.visible=c.visible.iterableForEach());return a.visible};b.prototype.resetVisibleGraphicsIterator=function(a){this.iterators[a].visible=null};b.prototype.ensureRemoveGraphicsIterator=function(a){var c=this.graphics[a];a=this.iterators[a];a.remove||(a.remove=c.visible.iterableRemoveMany(c.remove));
return a.remove};b.prototype.resetRemoveGraphicsIterator=function(a){this.iterators[a].remove=null};b.prototype.ensureSortGraphicsIterator=function(a,c){var b=this.graphics[a];a=this.iterators[a];a.sort||(a.sort=b.visible.iterableSort(c));return a.sort};b.prototype.resetSortGraphicsIterator=function(a){this.iterators[a].sort=null};b.prototype.collectGraphics3DGraphics=function(a,c,b){var e=a.graphics3DGraphic;if(!e.destroyed){var d=a.info[c];if(e.isVisible(0,3)){e=(c=1===c)?e._labelGraphics:e._graphics;
c=c?0:this.iconMarginFactor;for(var g=u.empty(da),q,l,h=0;h<e.length;h++){var p=e[h];if(this.graphics3DGraphicsLayerSupportsDeconfliction(p)){var r=p.stageObject,x=r.getGeometryRecord(0),m=x.material,n=this.camera,k=x.geometry.data.getVertexAttr();if(b&&(N.radius=X.earthRadius,y.vec3.sub(C.direction,r.getCenter(),this.camera.eye),y.vec3.copy(C.origin,this.camera.eye),Y.intersectRay(N,C,O))){var t=1-Math.abs(Math.tan(y.vec3.angle(r.getCenter(),C.direction)))/this.view.width,t=Math.pow(t,4),v=y.vec3.sqrDist(this.camera.eye,
O),w=y.vec3.sqrDist(this.camera.eye,r.getCenter());if(t*w>v){d.culled=!0;return}}if(!l){l=r.getCenter();x=x.origin.vec3;B.transformToWorld(l,x,L);B.transformToView(L,x,n.viewMatrix,A);m.applyVerticalOffsetTransformation(A,k[K.VertexAttrConstants.NORMAL].data,r.objectTransformation,n,F);if(a.slicePlaneEnabled&&this.slicePlaneViewSpace&&z.boundedPlane.extrusionContainsPoint(this.slicePlaneViewSpace,A)){d.culled=!0;return}r=k[K.VertexAttrConstants.AUXPOS1].data;k="screen"!==m.getParameters().centerOffsetUnits;
B.transformToProjection(A,n.projectionMatrix,k?r:J.vec3f64.ZEROS,M);l=B.transformToNDC(M,ca);k||(l[0]+=r[0]/n.fullWidth*2,l[1]+=r[1]/n.fullHeight*2);if(-1>l[0]||-1>l[1]||-1>l[2]||1<=l[0]||1<=l[1])break;q=A[2];!W.DISABLE_DECONFLICTOR_VISIBILITY_OFFSET&&d.visible&&(q*=.7)}p=p.getScreenSize(ia);p[0]*=n.pixelRatio;p[1]*=n.pixelRatio;Z.applyPrecomputedScaleFactorVec2(p,F.factor,p);m=u.offset(m.calculateRelativeScreenBounds(p,F.factorAlignment.scale,ea),I.lerp(0,n.fullWidth,.5+.5*l[0]),I.lerp(0,n.fullHeight,
.5+.5*l[1]));0!==c&&(n=c*Math.min(u.width(m),u.height(m)),m[0]-=n,m[1]-=n,m[2]+=n,m[3]+=n);u.expand(g,m)}}null==q?d.culled=!0:(d.xMin=g[0],d.yMin=g[1],d.xMax=g[2],d.yMax=g[3],d.posView=q,d.culled=!1)}else d.culled=!0}};b.prototype.doesIntersectExistingPoly=function(a,c){var b=a.graphics3DGraphic.graphic.uid;a=a.info[c];for(var f=Math.floor(a.xMin/this.accBinsSizeX);f<=Math.floor(a.xMax/this.accBinsSizeX);f++)if(!(0>f||f>=this.accBinsNumX))for(var d=Math.floor(a.yMin/this.accBinsSizeY);d<=Math.floor(a.yMax/
this.accBinsSizeY);d++)if(!(0>d||d>=this.accBinsNumY))for(var g=this.accBins[f][d],h=0;h<g.length;h++){var l=g.data[h],k=l.info[c];if(k&&k.visible&&l.graphics3DGraphic.graphic.uid!==b&&(this.accNumTests++,!(k.xMin>a.xMax||k.xMax<a.xMin||k.yMin>a.yMax||k.yMax<a.yMin)))return!0}return!1};b.prototype.initBins=function(a,c){if(null==this.accBins){this.accBins=[];for(var b=0;b<this.accBinsNumX;b++){this.accBins.push([]);for(var f=this.accBins[this.accBins.length-1],d=0;d<this.accBinsNumY;d++)f.push(new k)}}for(b=
0;b<this.accBinsNumX;b++)for(d=0;d<this.accBinsNumY;d++)this.accBins[b][d].clear();this.accBinsSizeX=a/this.accBinsNumX;this.accBinsSizeY=c/this.accBinsNumY;this.accNumTests=0};b.prototype.addToBins=function(a,c){c=a.info[c];for(var b=Math.floor(c.xMin/this.accBinsSizeX);b<=Math.floor(c.xMax/this.accBinsSizeX);b++)if(!(0>b||b>=this.accBinsNumX))for(var f=Math.floor(c.yMin/this.accBinsSizeY);f<=Math.floor(c.yMax/this.accBinsSizeY);f++)0>f||f>=this.accBinsNumY||this.accBins[b][f].push(a)};b.prototype.isFeatureReductionEnabled=
function(a){a=a.layer;return!(!a||!a.featureReduction||"selection"!==a.featureReduction.type)};b.prototype.clearVisibilityFlags=function(a){(a=a.graphics3DCore.graphics3DGraphics)&&a.forEach(function(a){return a.clearVisibilityFlag(3)})};b.prototype.setGraphicVisibility=function(a,b,e){a=a.graphics3DGraphic;a.destroyed||(a.setVisibilityFlag(3,e,b),1===b&&this.view.labeler.setLabelGraphicVisibility(a,e))};b.prototype.clearGraphicVisibility=function(a,b){a=a.graphics3DGraphic;a.destroyed||a.clearVisibilityFlag(3,
b)};D([t.property({constructOnly:!0})],b.prototype,"view",void 0);D([t.property({type:Boolean,readOnly:!0})],b.prototype,"updating",null);return b=D([t.subclass("esri.views.3d.layers.graphics.Deconflictor")],b)}(t.declared(R));H.Deconflictor=G;var F={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}},ia=V.vec2f64.create()});