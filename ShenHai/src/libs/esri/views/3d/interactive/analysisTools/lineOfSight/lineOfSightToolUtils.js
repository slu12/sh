// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../3d/interactive/Manipulator3D ../../manipulatorUtils ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/GeometryUtil ../../../webgl-engine/materials/RibbonLineMaterial".split(" "),function(q,e,r,k,l,m,n,h,p){function f(b,a,c){return{geometry:new m(h.createSphereGeometry(b,32,32),"manipulator"),material:l.createManipulatorMaterial(g(a),a.a),stateMask:c}}function g(b,a){return null!=
a?[b.r/255,b.g/255,b.b/255,a]:[b.r/255,b.g/255,b.b/255]}Object.defineProperty(e,"__esModule",{value:!0});e.createPolylineMaterial=function(b,a,c,d){b=new p({width:b,color:g(a,a.a),stipplePattern:c,stippleOffColor:d&&[d.r,d.g,d.b,d.a]},"line-of-sight-line");b.renderOccluded=4;return b};e.createPolylineGeometry=function(b,a,c){return new n(h.createPolylineGeometry([b,a]),"line-of-sight-line-"+c)};e.createSphereManipulator=function(b,a){var c=[];a.customColor1&&c.push(f(a.size,a.customColor1,16));a.customColor2&&
c.push(f(a.size,a.customColor2,32));a.customColor3&&c.push(f(a.size,a.customColor3,64));a.color&&c.push(f(a.size,a.color));b=new k.Manipulator3D({view:b,renderObjects:c,elevationInfo:{mode:"absolute-height",offset:0},hideOnGrab:!0});for(var d in a)b[d]=a[d];return b};e.colorToArray=g});