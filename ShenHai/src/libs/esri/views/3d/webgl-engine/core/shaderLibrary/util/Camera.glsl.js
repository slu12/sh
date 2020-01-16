// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(c,a){Object.defineProperty(a,"__esModule",{value:!0});(function(a){a.bindUniforms=function(a,b){a.setUniform3f("camPos",b.viewInvTransp[3]-b.origin[0],b.viewInvTransp[7]-b.origin[1],b.viewInvTransp[11]-b.origin[2])}})(a.Camera||(a.Camera={}))});