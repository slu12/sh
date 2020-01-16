// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../../../core/mathUtils ../../../../../core/screenUtils ../../../../../core/libs/gl-matrix-2/vec3 ../../../../../core/libs/gl-matrix-2/vec3f64 ../../../camera/constraintUtils ../../../input/util ../InteractiveController ../momentum/PanPlanarMomentumController ../momentum/RotationMomentumController ../momentum/ZoomPlanarMomentumController ../../utils/navigationUtils ../../../support/geometryUtils ../../../webgl-engine/lib/Camera ../../../../navigation/PanPlanarMomentumEstimator ../../../../navigation/RotationMomentumEstimator ../../../../navigation/ZoomMomentumEstimator".split(" "),
function(t,h,w,x,q,m,c,n,u,y,z,A,B,k,l,C,D,E,F){Object.defineProperty(h,"__esModule",{value:!0});var r;(function(c){c[c.Vertical=0]="Vertical";c[c.Horizontal=1]="Horizontal"})(r=h.PanMode||(h.PanMode={}));var v=c.vec3f64.fromValues(0,0,1),G=16/180*Math.PI;t=function(h){function p(a,d){var b=h.call(this)||this;b.view=a;b.intersectionHelper=d;b.rotationValueSmooth=new u.ExponentialFalloff(.05);b.scalingValueSmooth=new u.ExponentialFalloff(.05);b.planeHorizontal=l.plane.create();b.planeVertical=l.plane.create();
b.rotationMomentumEstimator=new E.RotationMomentumEstimator;b.panMomentumEstimator=new D.PanPlanarMomentumEstimator(300,12,.9);b.zoomMomentumEstimator=new F.ZoomMomentumEstimator;b.beginCenter=c.vec3f64.create();b.tmpPoints=[];b.beginCenterScreen=q.createScreenPointArray();b.tmpCentroid3d=c.vec3f64.create();b.tmpCentroid2d=q.createScreenPointArray();b.tmp2d=q.createScreenPointArray();b.constraintOptions={selection:15,interactionType:0,interactionFactor:0,interactionStartCamera:new C.default,interactionDirection:null,
tiltMode:0};return b}w(p,h);p.prototype.begin=function(a){if(this.active){var d=this.view.navigation.momentumEnabled;this.zoomMomentumEstimator.enabled=d;this.rotationMomentumEstimator.enabled=d;this.panMomentumEstimator.enabled=d;this.beginRadius=a.radius;this.pointerCount=a.pointers.size;this.beginAngle=a.angle;this.rotationValueSmooth.reset();this.scalingValueSmooth.reset();q.screenPointObjectToArray(a.center,this.beginCenterScreen);l.plane.fromNormalAndOffset(v,0,this.planeHorizontal);d=c.vec3f64.create();
this.intersectionHelper.intersectScreenFreePointFallback(this.beginCenterScreen,d);var b=c.vec3f64.create();m.vec3.negate(b,this.beginCamera.viewForward);var e=c.vec3f64.create();m.vec3.copy(e,v);var g=m.vec3.dot(b,e);this.panMode=x.asinClamped(0>g?-g:g)>=G?r.Horizontal:r.Vertical;l.plane.setOffsetFromPoint(this.planeHorizontal,d,this.planeHorizontal);this.beginCamera.aboveGround||l.plane.negate(this.planeHorizontal,this.planeHorizontal);this.panMode===r.Vertical?(m.vec3.scale(e,e,g),m.vec3.subtract(this.planeVertical,
b,e),m.vec3.normalize(this.planeVertical,this.planeVertical),l.plane.setOffsetFromPoint(this.planeVertical,d,this.planeVertical),this.computePlanePoints(a.pointers,this.planeVertical,this.beginCamera,this.tmpPoints)):this.computePlanePoints(a.pointers,this.planeHorizontal,this.beginCamera,this.tmpPoints);k.centroid(this.tmpPoints,this.beginCenter);this.constraintOptions.interactionStartCamera.copyFrom(this.beginCamera)}};p.prototype.update=function(a){if(this.active){this.currentCamera.copyFrom(this.beginCamera);
var d=1<a.pointers.size,b=this.panMode===r.Horizontal?this.planeHorizontal:this.planeVertical,e=this.beginCenter;if(d){var c=this.beginRadius/a.radius,f=.001875*Math.min(Math.max(a.radius,40),120);this.scalingValueSmooth.gain=f;this.scalingValueSmooth.update(c);k.applyZoomToPoint(this.currentCamera,e,this.scalingValueSmooth.value,this.view.state.constraints.minimumPoiDistance);this.zoomMomentumEstimator.add(this.scalingValueSmooth.value,.001*a.timestamp);this.constraintOptions.interactionType=1;this.constraintOptions.interactionFactor=
n.pixelDistanceToInteractionFactor(Math.abs(a.radius-this.beginRadius));n.applyAll(this.view,this.currentCamera,this.constraintOptions)}this.computePlanePoints(a.pointers,b,this.currentCamera,this.tmpPoints);k.centroid(this.tmpPoints,this.tmpCentroid3d);q.screenPointObjectToArray(a.center,this.tmpCentroid2d);k.applyPanPlanar(this.currentCamera,e,this.tmpCentroid3d);this.panMomentumEstimator.add(this.tmpCentroid2d,this.tmpCentroid3d,.001*a.timestamp);this.constraintOptions.interactionType=4;this.constraintOptions.interactionFactor=
n.pixelDistanceToInteractionFactor(this.beginCenterScreen,this.tmpCentroid2d);n.applyAll(this.view,this.currentCamera,this.constraintOptions);d&&(d=this.planeHorizontal,b=this.rotationValueSmooth.value,c=k.normalizeRotationDelta(a.angle-b),f=.00125*Math.min(Math.max(a.radius,40),120),this.rotationValueSmooth.gain=f,this.rotationValueSmooth.update(b+c),f=this.rotationValueSmooth.value-this.beginAngle,this.rotationMomentumEstimator.add(f,.001*a.timestamp),k.applyRotation(this.currentCamera,e,l.axisAngle.wrapAxisAngle(d,
f)),this.constraintOptions.interactionType=2,this.constraintOptions.interactionFactor=n.pixelDistanceToInteractionFactor(Math.abs(a.radius*f)),n.applyAll(this.view,this.currentCamera,this.constraintOptions));this.currentCamera.markViewDirty()}};p.prototype.end=function(a){a.pointers.size===this.pointerCount&&this.update(a);this.finishController();return(a=this.zoomMomentumEstimator.evaluateMomentum())?new B.ZoomPlanarMomentumController(this.view,a,this.beginCenter):(a=this.rotationMomentumEstimator.evaluateMomentum())?
new A.RotationMomentumController(this.view,a,this.beginCenter,this.planeHorizontal):(a=this.panMomentumEstimator.evaluateMomentum())?new z.PanPlanarMomentumController(this.view,a):null};p.prototype.computePlanePoints=function(a,d,b,e){e.length=a.size;var g=this.tmp2d,f=0;a.forEach(function(a){g[0]=a.x;g[1]=a.y;void 0===e[f]&&(e[f]=c.vec3f64.create());k.intersectPlaneFromScreenPoint(d,b,g,e[f]);f+=1});return e};return p}(y.InteractiveController);h.PinchAndPanController=t});