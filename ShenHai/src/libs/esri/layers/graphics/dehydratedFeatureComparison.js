// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/compilerUtils","../../core/maybe"],function(q,g,m,h){function k(a,b){if(a===b)return!0;if(null==a||null==b||a.length!==b.length)return!1;for(var c=0;c<a.length;c++){var e=a[c],d=b[c];if(e.length!==d.length)return!1;for(var f=0;f<e.length;f++)if(e[f]!==d[f])return!1}return!0}function l(a,b){if(a===b)return!0;if(null==a||null==b||a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(!k(a[c],b[c]))return!1;return!0}function d(a,b){return a===b||a&&b&&a.equals(b)}
function n(a,b){if(a===b)return!0;if(h.isNone(a)||h.isNone(b)||a.type!==b.type)return!1;switch(a.type){case "point":return a=d(a.spatialReference,b.spatialReference)?a.x===b.x&&a.y===b.y&&a.z===b.z&&a.m===b.m:!1,a;case "extent":return a=a.hasZ!==b.hasZ||a.hasM!==b.hasM?!1:d(a.spatialReference,b.spatialReference)?a.xmin===b.xmin&&a.ymin===b.ymin&&a.zmin===b.zmin&&a.xmax===b.xmax&&a.ymax===b.ymax&&a.zmax===b.zmax:!1,a;case "polyline":return a=a.hasZ!==b.hasZ||a.hasM!==b.hasM?!1:d(a.spatialReference,
b.spatialReference)?l(a.paths,b.paths):!1,a;case "polygon":return a=a.hasZ!==b.hasZ||a.hasM!==b.hasM?!1:d(a.spatialReference,b.spatialReference)?l(a.rings,b.rings):!1,a;case "multipoint":return a=a.hasZ!==b.hasZ||a.hasM!==b.hasM?!1:d(a.spatialReference,b.spatialReference)?k(a.points,b.points):!1,a;case "mesh":return!1;default:m.neverReached(a)}}function p(a,b){if(a===b)return!0;if(!a||!b)return!1;var c=Object.keys(a),e=Object.keys(b);if(c.length!==e.length)return!1;for(e=0;e<c.length;e++){var d=c[e];
if(a[d]!==b[d])return!1}return!0}Object.defineProperty(g,"__esModule",{value:!0});g.equals=function(a,b){return a===b?!0:null!=a&&null!=b&&a.objectId===b.objectId&&n(a.geometry,b.geometry)&&p(a.attributes,b.attributes)?!0:!1}});