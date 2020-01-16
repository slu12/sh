// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper ../../../../../core/Handles ../../../../../core/maybe ../../../../../core/watchUtils ../../manipulatorUtils ../manipulatorUtils ../../../../interactive/dragUtils/dragActions ../../../../interactive/dragUtils/dragHandlers".split(" "),function(f,g,q,r,t,u,l,c,h,m,k,n,p){Object.defineProperty(g,
"__esModule",{value:!0});f=function(){function b(a){this._handles=new l;this.zManipulator=null;this.tool=a.tool}b.prototype.destroy=function(){this._clear()};b.prototype._clear=function(){this._handles.removeAll();c.isSome(this.zManipulator)&&this.tool.manipulators.remove(this.zManipulator);this.zManipulator=null};Object.defineProperty(b.prototype,"dragging",{get:function(){return c.isSome(this.zManipulator)&&this.zManipulator.dragging},enumerable:!0,configurable:!0});b.prototype.recreateManipulators=
function(){var a=this;this._clear();this.zManipulator=k.createGraphicMoveZManipulator({view:this.tool.view,graphic:this.tool.graphic,worldOriented:!1});if(c.isSome(this.zManipulator)){this.tool.manipulators.add(this.zManipulator);var b=this.createDragEventMappingFunction(),e=n.createGraphicDragAction(this.tool.graphic),b=p.createManipulatorDragHandler(this.zManipulator,b,e);this._handles.add(b);this._handles.add([h.init(this.tool.graphic,"geometry",function(){c.isSome(a.zManipulator)&&m.placeManipulatorAtGraphic(a.zManipulator,
a.tool.graphic)}),this.zManipulator.events.on("immediate-click",function(a){a.stopPropagation()}),h.init(this.tool.graphic,["visible","layer.visible"],function(){c.isSome(a.zManipulator)&&(a.zManipulator.visible=a.tool.graphic.visible&&a.tool.graphic.layer.visible)})])}};b.prototype.updateManipulators=function(a){c.isSome(this.zManipulator)&&(this.zManipulator.modelTransform=a)};b.prototype.createDragEventMappingFunction=function(){var a=this;return function(b){var e=k.createGraphicMoveZScreenDragToMap(a.tool.view,
b);return c.isNone(e)?null:function(b){var d=e(b);if(c.isNone(d))return null;switch(b.action){case "start":a.tool.emit("graphic-translate-start",{graphic:a.tool.graphic});break;case "update":a.tool.emit("graphic-translate",{graphic:a.tool.graphic,dx:d.deltaX,dy:d.deltaY,dz:d.deltaZ});break;case "end":a.tool.emit("graphic-translate-stop",{graphic:a.tool.graphic})}return d}}};return b}();g.GraphicZTransform=f});