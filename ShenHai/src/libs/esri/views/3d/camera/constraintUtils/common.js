// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/vec3"],function(k,c,g,e){Object.defineProperty(c,"__esModule",{value:!0});c.hasConstraintType=function(c,b){return 0!==(c&b)};c.adjustRangeForInteraction=function(c,b,e,d,f,a){0!==c&&(e?(a.min=Math.min(a.min,b),a.max=Math.max(a.max,b)):null!=d?(a.min-=Math.max(0,(b-a.min)*(1-d)),a.max+=Math.max(0,(b-a.max)*(1-d))):f&&(a.min-=Math.max(0,b-a.min-f),a.max+=Math.max(0,b-a.max-f)))};c.defaultApplyOptions={selection:0,
interactionType:0,interactionFactor:0,interactionStartCamera:null,interactionDirection:null,tiltMode:0};c.interactionDirectionTowardsConstraintMinimization=function(c,b,h,d){b=b||c.viewForward;e.vec3.copy(d,b);e.vec3.scale(d,d,g.sign(e.vec3.dot(b,h)));return d}});