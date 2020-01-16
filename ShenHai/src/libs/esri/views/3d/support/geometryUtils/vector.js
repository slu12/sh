// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/vec3"],function(g,c,f,d){function e(a,b){return d.vec3.dot(a,b)/d.vec3.length(a)}Object.defineProperty(c,"__esModule",{value:!0});c.projectPoint=function(a,b,c){b=e(a,b);return d.vec3.scale(c,a,b)};c.projectPointSignedLength=e;c.angle=function(a,b){a=d.vec3.dot(a,b)/(d.vec3.length(a)*d.vec3.length(b));return-f.acosClamped(a)}});