// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../webgl/programUtils"],function(c,a,b){Object.defineProperty(a,"__esModule",{value:!0});a.glslifyGlobalOptions=function(a){return b.glslifyDefineMap({VIEWING_MODE:{value:a.viewingMode,options:{global:"VIEWING_MODE_GLOBAL",local:"VIEWING_MODE_LOCAL"}}})}});