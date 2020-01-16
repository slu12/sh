// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper ../../../../../core/Handles ../../../../../core/has ../../../../../core/maybe ../../../../../core/watchUtils ../../../../../core/libs/gl-matrix-2/mat4 ../../../../../core/libs/gl-matrix-2/mat4f64 ../../../../../core/libs/gl-matrix-2/vec3 ../../../../../core/libs/gl-matrix-2/vec3f64 ../../Manipulator3D ../../manipulatorUtils ../../dragUtils/projectScreenToMap ./graphicTransform3DToolConfig ../../../support/stack ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/GeometryUtil ../../../webgl-engine/materials/ColorMaterial ../../../../interactive/dragUtils/dragActions ../../../../interactive/dragUtils/dragHandlers ../../../../interactive/dragUtils/screenDragToMap".split(" "),
function(m,n,I,J,K,L,v,w,h,p,e,x,q,r,y,t,z,f,k,A,u,B,C,D,E){function F(b){return"local"===b.viewingMode?!0:b.scale<f.ALIGN_ARROWS_SCALE_THRESHOLD}Object.defineProperty(n,"__esModule",{value:!0});var l;(function(b){b.Highlighted=512;b.Visible=1024})(l||(l={}));m=function(){function b(a){this._handles=new v;this.arrowManipulatorInfos=[];this.tool=a.tool}b.prototype.destroy=function(){this._clear()};b.prototype._clear=function(){var a=this;this._handles.removeAll();this.arrowManipulatorInfos.forEach(function(g){a.tool.manipulators.remove(g.manipulator)});
this.arrowManipulatorInfos=[]};Object.defineProperty(b.prototype,"focused",{get:function(){return this.arrowManipulatorInfos.some(function(a){return a.manipulator.focused})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"dragging",{get:function(){return this.arrowManipulatorInfos.some(function(a){return a.manipulator.dragging})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"arrowRotationAngle",{get:function(){return"local"===this.tool.view.viewingMode||this.tool.view.scale<
f.ALIGN_ARROWS_SCALE_THRESHOLD?this.tool.symbolRotationAngle:0},enumerable:!0,configurable:!0});b.prototype.createDragAction=function(){var a=this,g=C.createGraphicDragAction(this.tool.graphic);return function(c){"start"===c.action&&a.tool.emit("graphic-translate-start",{graphic:a.tool.graphic});g(c);switch(c.action){case "update":a.tool.emit("graphic-translate",{graphic:a.tool.graphic,dx:c.deltaX,dy:c.deltaY,dz:c.deltaZ,type:"translate"});break;case "end":a.tool.emit("graphic-translate-stop",{graphic:a.tool.graphic})}}};
b.prototype.recreateManipulators=function(){var a=this;this._clear();for(var g=[],c=0;4>c;c++){var d=this.createArrowManipulator(c);g.push(d);this.tool.manipulators.add(d.manipulator);var b=this.createDragAction(),b=D.createManipulatorDragHandler(d.manipulator,this.createDragEventMappingFunction(c),b);this._handles.add(b);this._handles.add([d.manipulator.events.on("focus",function(){a.tool.updateManipulators()}),d.manipulator.events.on("immediate-click",function(a){a.stopPropagation()})])}this.arrowManipulatorInfos=
g;this.arrowManipulatorInfos.forEach(function(c){t.placeManipulatorAtGraphic(c.manipulator,a.tool.graphic)});this._handles.add([p.init(this.tool.graphic,"geometry",function(){a.arrowManipulatorInfos.forEach(function(c){t.placeManipulatorAtGraphic(c.manipulator,a.tool.graphic)})}),p.init(this.tool.graphic,["visible","layer.visible"],function(){var c=a.tool.graphic.visible&&a.tool.graphic.layer.visible;a.arrowManipulatorInfos.forEach(function(a){a.manipulator.visible=c})})])};b.prototype.updateManipulators=
function(a,b,c){var d=this.tool.symbolRotationAngle,g=e.mat4.identity(k.sm4d.get());0!==d&&e.mat4.rotate(g,g,d,r.vec3f64.fromValues(0,0,1));var d=e.mat4.multiply(k.sm4d.get(),a,g),f=F(this.tool.view)?d:a,H=this.dragging,h=b||w("esri-mobile")?l.Visible:0;this.arrowManipulatorInfos.forEach(function(a){var b=e.mat4.multiply(k.sm4d.get(),f,a.transform);a.manipulator.state=H?h|(a.manipulator.dragging?l.Highlighted:0):h|(a.manipulator.focused&&c?l.Highlighted:0);a.manipulator.modelTransform=b})};b.prototype.createArrowManipulator=
function(a){var b=Math.sqrt(f.DISC_TRANSLATE_ARROW_SIZE*f.DISC_TRANSLATE_ARROW_SIZE*3/4),c=u.createExtrudedTriangle(b,f.DISC_TRANSLATE_ARROW_SIZE/2,f.DISC_TRANSLATE_ARROW_SIZE/2,f.DISC_HEIGHT);u.transformInPlace(c,e.mat4.fromTranslation(k.sm4d.get(),q.vec3.set(k.sv3d.get(),0,-b/3,0)));var c=new A(c,"graphic-transform-disc-arrow"+a),d=this.createMaterial(),h=this.createMaterial(.5),G=this.createMaterial(0),b=new y.Manipulator3D({view:this.tool.view,renderObjects:[{geometry:c,material:d,stateMask:l.Visible|
l.Highlighted},{geometry:c,material:h,stateMask:l.Visible},{geometry:c,material:G,stateMask:0}],autoScaleRenderObjects:!1,radius:b,focusMultiplier:1,touchMultiplier:1,elevationInfo:{mode:"on-the-ground",offset:0},collisionType:{type:"disc",direction:r.vec3f64.fromValues(0,0,1)}}),c=e.mat4.identity(k.sm4d.get());e.mat4.fromZRotation(c,a*Math.PI/2);a=e.mat4.identity(k.sm4d.get());e.mat4.fromTranslation(a,q.vec3.set(k.sv3d.get(),0,f.DISC_TRANSLATE_ARROW_OFFSET,0));d=x.mat4f64.create();e.mat4.multiply(d,
c,a);return{manipulator:b,transform:d}};b.prototype.createMaterial=function(a){void 0===a&&(a=1);var b=f.HANDLE_COLOR.concat([a]);a=new B({color:b,transparent:1!==a,cullFace:2},"graphic-transform");a.renderOccluded=2;return a};b.prototype.createDragEventMappingFunction=function(a){var b=this;return function(c){var d=b.arrowRotationAngle,d=[Math.cos(d),Math.sin(d),0],f=[-d[1],d[0],0],e=E.createMapAxisConstrainedScreenToMapDrag(z.createForGraphicAtLocation(b.tool.view,b.tool.graphic,c.elevationAlignedLocation),
0===a%2?f:d,h.expect(b.tool.graphic.geometry).spatialReference);return h.isNone(e)?null:function(a){a=e(a);return h.isNone(a)?null:a}}};return b}();n.GraphicXYAxisTransform=m});