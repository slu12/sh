// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper ../../../../../core/tsSupport/assignHelper ../../../../../core/Handles ../../../../../core/mathUtils ../../../../../core/maybe ../../../../../core/scheduling ../../../../../core/screenUtils ../../../../../core/watchUtils ../../../../../core/libs/gl-matrix-2/mat4 ../../../../../core/libs/gl-matrix-2/mat4f64 ../../../../../core/libs/gl-matrix-2/vec3 ../../../../../core/libs/gl-matrix-2/vec3f64 ../../../../../core/libs/gl-matrix-2/math/common ../../Manipulator3D ../../manipulatorUtils ../../manipulatorUtils ./dragUtils ./graphicTransform3DToolConfig ../../../support/geometryUtils ../../../support/mathUtils ../../../support/stack ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/GeometryUtil ../../../webgl-engine/materials/ColorMaterial".split(" "),
function(B,C,Y,Z,aa,ba,D,J,E,t,K,F,G,u,L,h,y,M,N,O,P,H,d,v,Q,n,I,A,R){function S(b,a){var f=b.allLayerViews.find(function(f){return f.layer===a.layer});if(t.isNone(a.symbol))return null;var d=a.symbol;return{symbolLayers:d.symbolLayers.map(function(a){var b=null,l=null;"object"===a.type&&(b=a.heading);l=f.getSymbolLayerSize(d,a);return{heading:b,size:l}}).toArray()}}function T(b,a,f,d){b.symbolLayers.forEach(function(b,c){var l=a.symbolLayers[c];c=l.heading;l=l.size;"object"===b.type&&(b.heading=
(t.isSome(c)?c:0)-M.toDegree(f),t.isSome(l)&&"width"in l&&(b.width=l.width*d,b.depth=l.depth*d,b.height=l.height*d))})}function z(b,a,f){b=a.projectPoint(b,F.castRenderScreenPointArray(U));a=a.renderToScreen(b,V);return h.vec3.set(f,a[0],a[1],0)}function W(b){var a=null,f=1,c=function(){return f};return{start:function(){f=b.getScale();a=b.getScale;b.getScale=c},update:function(a){f+=((f+1)/2-f)*Math.min(a*d.RING_RESET_ANIMATION_SPEED_FACTOR,1);b.tool.updateManipulators();return.01>Math.abs(f-1)?1:
0},destroy:function(){b.getScale=a;b.tool.updateManipulators()}}}function X(b){var a=0,f=null,c=function(){return!1};return{start:function(){f=b.getFocused;b.getFocused=c;a=0},update:function(f){a+=f;return!b.ringManipulator.focused||a>d.RING_INDICATOR_DELAY_MS?1:0},destroy:function(){b.getFocused=f;b.tool.updateManipulators()}}}Object.defineProperty(C,"__esModule",{value:!0});var c;(function(b){b.ScaleIn=32;b.ScaleOut=64;b.RotateLeft=128;b.RotateRight=256;b.Highlighted=512;b.Unlocked=1024;b.TouchInput=
32768})(c||(c={}));B=function(){function b(a){var b=this;this.mode=null;this._handles=new J;this._activeAnimation=this._scaleRotateDragData=null;this.getFocused=function(){return b.ringManipulator.focused};this.getScale=function(){return t.isSome(b._scaleRotateDragData)&&"scale"===b._scaleRotateDragData.mode?b._scaleRotateDragData.scale:1};this.tool=a.tool;this.mode=a.mode}b.prototype.destroy=function(){this._clear()};b.prototype._clear=function(){t.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),
this._activeAnimation=null);this._handles.removeAll();this.tool.manipulators.remove(this.ringManipulator);this.ringManipulator=null};Object.defineProperty(b.prototype,"dragging",{get:function(){return this.ringManipulator.dragging},enumerable:!0,configurable:!0});b.prototype.startAnimation=function(a){var b=this;this.cancelActiveAnimation();a.start();var d=K.addFrameTask({update:function(d){a.update(d.deltaTime)&&b.cancelActiveAnimation()}});this._activeAnimation=D({},a,{frameTask:d})};b.prototype.cancelActiveAnimation=
function(){t.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),this._activeAnimation.destroy(),this._activeAnimation=null)};b.prototype.recreateManipulators=function(){var a=this;this._clear();this.ringManipulator=this.createRingManipulator();this.tool.manipulators.add(this.ringManipulator);H.createDragHandler(this.ringManipulator,function(b){a._scaleRotateDragData=null;var f=y.vec3f64.fromValues(a.ringManipulator.modelTransform[8],a.ringManipulator.modelTransform[9],a.ringManipulator.modelTransform[10]),
c=y.vec3f64.clone(a.ringManipulator.renderLocation),r=v.plane.fromPositionAndNormal(c,f),u=H.createCartesianPlaneDrag(b,a.tool.view,r);if(t.isNone(u))return null;b=S(a.tool.view,a.tool.graphic);if(t.isNone(b))return null;var g={mode:"none",origin:c,angle:0,startAngle:a.tool.symbolRotationAngle,angleDir:0,scale:1,scaleDir:0,startSymbolData:b};a._scaleRotateDragData=g;return function(b){var f=u(b),e=O.calculateInputRotationTransform(f.start,f.end,g.origin,r),c=Q.cyclicalPI.shortestSignedDiff(g.angle,
e);g.angleDir=E.clamp(g.angleDir+c,-d.ROTATE_INDICATOR_DIRECTION_BUFFER,d.ROTATE_INDICATOR_DIRECTION_BUFFER);g.angle=e;c=h.vec3.subtract(n.sv3d.get(),f.start,g.origin);e=h.vec3.subtract(n.sv3d.get(),f.end,g.origin);c=h.vec3.length(c);e=h.vec3.length(e);e=0===c?0:e/c;g.scaleDir=E.clamp(g.scaleDir+(e-g.scale),-d.SCALE_INDICATOR_DIRECTION_BUFFER,d.SCALE_INDICATOR_DIRECTION_BUFFER);g.scale=e;if("none"===g.mode){if(!(e=a.mode)){var l=g.origin,k=a.tool.view.state.camera,q=f.start,e=f.end,c=z(q,k,n.sv3d.get()),
e=z(e,k,n.sv3d.get());if(h.vec3.squaredDistance(c,e)<d.DRAG_THRESHOLD_PX*d.DRAG_THRESHOLD_PX)e=null;else var p=h.vec3.subtract(n.sv3d.get(),q,l),p=h.vec3.cross(n.sv3d.get(),p,r),q=h.vec3.add(n.sv3d.get(),q,p),l=z(l,k,n.sv3d.get()),k=z(q,k,n.sv3d.get()),q=h.vec3.subtract(n.sv3d.get(),k,c),k=h.vec3.subtract(n.sv3d.get(),c,l),c=v.ray.wrap(c,q),k=v.ray.wrap(l,k),e=v.ray.distance2(c,e)<v.ray.distance2(k,e)?"rotate":"scale"}if(t.isSome(e)){switch(e){case "rotate":a.tool.emit("graphic-rotate-start",{graphic:a.tool.graphic});
break;case "scale":a.tool.emit("graphic-scale-start",{graphic:a.tool.graphic})}g.mode=e}}else{if(t.isSome(a.tool.graphic.symbol)){e=a.tool.graphic.symbol.clone();c=0;k=1;switch(g.mode){case "scale":k=g.scale;break;case "rotate":c=g.angle}T(e,g.startSymbolData,c,k);a.tool.graphic.symbol=e}if("update"===b.action)switch(g.mode){case "rotate":a.tool.emit("graphic-rotate",{graphic:a.tool.graphic,angle:g.angle,type:"rotate"});break;case "scale":a.tool.emit("graphic-scale",{graphic:a.tool.graphic,scale:g.scale,
type:"scale"})}}if("end"===b.action){switch(g.mode){case "rotate":a.tool.emit("graphic-rotate-stop",{graphic:a.tool.graphic});break;case "scale":a.tool.emit("graphic-scale-stop",{graphic:a.tool.graphic})}a.startAnimation(W(a));a._scaleRotateDragData=null}a.tool.updateManipulators();return D({},f,g)}},function(a){});this._handles.add([G.init(this.tool.graphic,"geometry",function(){P.placeManipulatorAtGraphic(a.ringManipulator,a.tool.graphic)}),this.ringManipulator.events.on("focus",function(b){"focus"===
b.action?a.startAnimation(X(a)):a.tool.updateManipulators()}),this.ringManipulator.events.on("immediate-click",function(a){a.stopPropagation()}),G.init(this.tool.graphic,["visible","layer.visible"],function(){a.ringManipulator.visible=a.tool.graphic.visible&&a.tool.graphic.layer.visible})])};b.prototype.updateManipulators=function(a,b){var d=u.mat4.identity(n.sm4d.get()),f=this.tool.symbolRotationAngle;0!==f&&u.mat4.rotate(d,d,f,y.vec3f64.fromValues(0,0,1));var f=this.getScale(),f=u.mat4.fromScaling(n.sm4d.get(),
h.vec3.set(n.sv3d.get(),f,f,f)),r=u.mat4.identity(n.sm4d.get());u.mat4.multiply(r,a,f);u.mat4.multiply(r,r,d);this.ringManipulator.modelTransform=r;this.ringManipulator.state=0;this.ringManipulator.state|=!0===b?c.Highlighted:0;this.ringManipulator.state|=t.isSome(this._scaleRotateDragData)&&"none"!==this._scaleRotateDragData.mode?0:c.Unlocked;if(t.isSome(this._scaleRotateDragData))switch(this._scaleRotateDragData.mode){case "rotate":this.ringManipulator.state|=0>this._scaleRotateDragData.angleDir?
c.RotateLeft:c.RotateRight;break;case "scale":this.ringManipulator.state|=0>this._scaleRotateDragData.scaleDir?c.ScaleIn:c.ScaleOut}};b.prototype.createRingManipulator=function(){for(var a=function(a,b,c){for(var e=[],f=Math.ceil(d.GEOMETRY_SEGMENTS*(b-a)/(2*Math.PI)),g=0;g<f+1;g++){var h=a+g*(b-a)/f;e.push(y.vec3f64.fromValues(c*Math.cos(h),c*Math.sin(h),0))}return e},b=function(b){return a(0,2*Math.PI,b)},q=function(a,b){return new I(A.createPathExtrusionGeometry([[-b/2,0],[b/2,0],[b/2,d.RING_HEIGHT/
2],[-b/2,d.RING_HEIGHT/2]],a,[],[],!1),"graphic-transform-ring")},l=b(d.RING_RADIUS),r=q(l,d.RING_THICKNESS),n=[],g=[],t=[],h=0;2>h;h++){var e=h*Math.PI-Math.PI/4,m=Math.PI/2-d.ROTATE_INDICATOR_ARC_LENGTH,w=e+m,e=e+Math.PI/2-m,m=a(w,e,d.INNER_INDICATOR_RADIUS),k=q(m,d.INDICATOR_THICKNESS);t.push(m);n.push(k);g.push(k);for(k=0;2>k;k++){var v=0===k,p=L.mat4f64.create();if(v){u.mat4.scale(p,p,[1,-1,1]);u.mat4.rotate(p,p,-w,[0,0,1]);var x=Math.round(d.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE*(m.length-
1))}else u.mat4.rotate(p,p,e,[0,0,1]),x=Math.round((1-d.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE)*(m.length-1));p[12]=m[x][0];p[13]=m[x][1];p[14]=m[x][2];x=A.createExtrudedTriangle(d.ROTATE_INDICATOR_ARROW_TIP_LENGTH,0,d.ROTATE_INDICATOR_ARROW_TIP_RADIUS,d.RING_HEIGHT);A.transformInPlace(x,p);p=new I(x,"graphic-transform-ring-rotate");(v?n:g).push(p)}}k=[];for(h=0;2>h;h++)e=h*Math.PI-Math.PI/4,m=Math.PI/2-d.SCALE_INDICATOR_ARC_LENGTH,w=e+m,e=e+Math.PI/2-m,m=a(w,e,d.OUTER_INDICATOR_RADIUS),k.push(q(m,
d.INDICATOR_THICKNESS));h=b(d.RING_RADIUS+d.SCALE_INDICATOR_OFFSET1);w=b(d.RING_RADIUS+d.SCALE_INDICATOR_OFFSET2);h=q(h,d.INDICATOR_THICKNESS);w=q(w,d.INDICATOR_THICKNESS);e=b(d.RING_RADIUS-d.SCALE_INDICATOR_OFFSET1);m=b(d.RING_RADIUS-d.SCALE_INDICATOR_OFFSET2);b=q(e,d.INDICATOR_THICKNESS);q=q(m,d.INDICATOR_THICKNESS);e=this.createMaterial();m=this.createMaterial(.66);p=this.createMaterial(.5);v=this.createMaterial(.33);r=[{geometry:r,material:e,stateMask:c.Highlighted},{geometry:r,material:p}];this.mode&&
"scale"!==this.mode||(r=r.concat([{geometry:k,material:e,stateMask:c.Highlighted|c.Unlocked},{geometry:h,material:m,stateMask:c.Highlighted|c.ScaleIn},{geometry:w,material:v,stateMask:c.Highlighted|c.ScaleIn},{geometry:b,material:m,stateMask:c.Highlighted|c.ScaleOut},{geometry:q,material:v,stateMask:c.Highlighted|c.ScaleOut}]));this.mode&&"rotate"!==this.mode||(r=r.concat([{geometry:g,material:e,stateMask:c.Highlighted|c.Unlocked},{geometry:n,material:e,stateMask:c.Highlighted|c.RotateLeft},{geometry:g,
material:e,stateMask:c.Highlighted|c.RotateRight}]));l=[l].concat(t);return new N.Manipulator3D({view:this.tool.view,renderObjects:r,autoScaleRenderObjects:!1,radius:d.RING_THICKNESS,focusMultiplier:1,touchMultiplier:1.5,elevationInfo:{mode:"on-the-ground",offset:0},collisionType:{type:"ribbon",paths:l,direction:y.vec3f64.fromValues(0,0,1)}})};b.prototype.createMaterial=function(a){void 0===a&&(a=1);var b=d.HANDLE_COLOR.concat([a]);a=new R({color:b,transparent:1!==a,cullFace:2},"graphic-transform");
a.renderOccluded=2;return a};return b}();C.GraphicScaleRotateTransform=B;var U=y.vec3f64.create(),V=F.createScreenPointArray()});