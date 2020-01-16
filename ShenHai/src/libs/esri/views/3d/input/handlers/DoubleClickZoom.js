// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/screenUtils ../../state/controllers/global/ZoomStepController ../../state/controllers/local/ZoomStepController ../../../input/InputHandler ../../../input/handlers/support".split(" "),function(a,e,f,g,h,k,l,m){Object.defineProperty(e,"__esModule",{value:!0});a=function(a){function d(n,c){var b=a.call(this,!0)||this;b.view=n;b.registerIncoming("double-click",c,function(a){return b.handleDoubleClick(a)});return b}f(d,a);
d.prototype.handleDoubleClick=function(a){var c=a.data;if(m.eventMatchesPointerAction(c,"primary")){var b=this.view.state.isGlobal?new h.ZoomStepController(this.view,"animation"):new k.ZoomStepController(this.view,"animation");this.view.state.switchCameraController(b);b.zoomStep(Math.log(.5)/Math.log(.6),g.createScreenPointArray(c.x,c.y));a.stopPropagation()}};return d}(l.InputHandler);e.DoubleClickZoom=a});