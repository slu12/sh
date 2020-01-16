// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/generatorHelper ../../../core/tsSupport/awaiterHelper ../../../Viewpoint ../../../core/Accessor ../../../core/now ../../../core/accessorSupport/decorators ../../../geometry/Point ../viewpointUtils ./ZoomBox ./actions/Pan ./actions/Pinch ./actions/Rotate".split(" "),function(g,q,v,e,m,k,w,x,r,d,y,h,z,A,B,C){Object.defineProperty(q,"__esModule",{value:!0});var D=new w({targetGeometry:new y}),
p=[0,0];g=function(g){function a(b){b=g.call(this,b)||this;b._endTimer=null;b.animationManager=null;return b}v(a,g);a.prototype.initialize=function(){this.pan=new A({navigation:this});this.rotate=new C({navigation:this});this.pinch=new B({navigation:this});this.zoomBox=new z({view:this.view,navigation:this})};a.prototype.destroy=function(){this.zoomBox.destroy();this.animationManager=this.zoomBox=null};a.prototype.begin=function(){this._set("interacting",!0)};a.prototype.end=function(){this._lastEventTimestamp=
r();this._startTimer(250)};a.prototype.zoom=function(b,c){void 0===c&&(c=this._getDefaultAnchor());return k(this,void 0,void 0,function(){return m(this,function(a){this.stop();this.begin();if(this.view.constraints.snapToZoom&&this.view.constraints.effectiveLODs)return 1>b?[2,this.zoomIn(c)]:[2,this.zoomOut(c)];this.setViewpoint(c,b,0,[0,0]);return[2]})})};a.prototype.zoomIn=function(b){return k(this,void 0,void 0,function(){var c,a;return m(this,function(t){c=this.view;a=c.constraints.snapToNextScale(c.scale);
return[2,this._zoomToScale(a,b)]})})};a.prototype.zoomOut=function(b){return k(this,void 0,void 0,function(){var c,a;return m(this,function(t){c=this.view;a=c.constraints.snapToPreviousScale(c.scale);return[2,this._zoomToScale(a,b)]})})};a.prototype.setViewpoint=function(b,c,a,f){this.begin();this.view.state.viewpoint=this._scaleRotateTranslateViewpoint(this.view.viewpoint,b,c,a,f);this.end()};a.prototype.setViewpointImmediate=function(b,c,a,f){void 0===c&&(c=0);void 0===a&&(a=[0,0]);void 0===f&&
(f=this._getDefaultAnchor());this.view.state.viewpoint=this._scaleRotateTranslateViewpoint(this.view.viewpoint,f,b,c,a)};a.prototype.continousRotateClockwise=function(){var b=this.get("view.viewpoint");this.animationManager.animateContinous(b,function(c){h.rotateBy(c,c,-1)})};a.prototype.continousRotateCounterclockwise=function(){var b=this.get("view.viewpoint");this.animationManager.animateContinous(b,function(c){h.rotateBy(c,c,1)})};a.prototype.resetRotation=function(){this.view.rotation=0};a.prototype.continousPanLeft=
function(){var b=this.get("view.viewpoint");this.animationManager.animateContinous(b,function(c){h.translateBy(c,c,[-10,0])})};a.prototype.continousPanRight=function(){var b=this.get("view.viewpoint");this.animationManager.animateContinous(b,function(c){h.translateBy(c,c,[10,0])})};a.prototype.continousPanUp=function(){var b=this.get("view.viewpoint");this.animationManager.animateContinous(b,function(c){h.translateBy(c,c,[0,10])})};a.prototype.continousPanDown=function(){var b=this.get("view.viewpoint");
this.animationManager.animateContinous(b,function(c){h.translateBy(c,c,[0,-10])})};a.prototype.stop=function(){this.pan.stopMomentumNavigation();this.animationManager.stop();this.end();null!==this._endTimer&&(clearTimeout(this._endTimer),this._endTimer=null,this._set("interacting",!1))};a.prototype._startTimer=function(b){var c=this;return null!==this._endTimer?this._endTimer:this._endTimer=setTimeout(function(){c._endTimer=null;var b=r()-c._lastEventTimestamp;250>b?c._endTimer=c._startTimer(b):c._set("interacting",
!1)},b)};a.prototype._getDefaultAnchor=function(){var b=this.view,c=b.size,b=b.padding,a=b.top,f=b.bottom;p[0]=.5*(c[0]-b.right+b.left);p[1]=.5*(c[1]-f+a);return p};a.prototype._zoomToScale=function(b,c){void 0===c&&(c=this._getDefaultAnchor());return k(this,void 0,void 0,function(){var a,f,d,u,e,g,l,n;return m(this,function(t){a=this.view;f=a.constraints;d=a.scale;u=a.viewpoint;e=a.size;g=a.padding;l=f.canZoomInTo(b);n=f.canZoomOutTo(b);return b<d&&!l||b>d&&!n?[2]:[2,a.goTo(h.padAndScaleAndRotateBy(D,
u,b/d,0,c,e,g),{animate:!0})]})})};a.prototype._scaleRotateTranslateViewpoint=function(a,c,d,f,e){var b=this.view,g=b.size,m=b.padding,l=b.constraints,n=b.viewpoint,k=b.scale*d,b=l.canZoomInTo(k),l=l.canZoomOutTo(k);if(1>d&&!b||1<d&&!l)d=1;h.translateBy(n,n,e);return h.padAndScaleAndRotateBy(a,n,d,f,c,g,m)};e([d.property()],a.prototype,"animationManager",void 0);e([d.property({type:Boolean,readOnly:!0})],a.prototype,"interacting",void 0);e([d.property()],a.prototype,"pan",void 0);e([d.property()],
a.prototype,"pinch",void 0);e([d.property()],a.prototype,"rotate",void 0);e([d.property()],a.prototype,"view",void 0);e([d.property()],a.prototype,"zoomBox",void 0);return a=e([d.subclass("esri.views.2d.navigation.MapViewNavigation")],a)}(d.declared(x));q.default=g});