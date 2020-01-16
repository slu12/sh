// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/generatorHelper ../../../core/tsSupport/awaiterHelper ../../../core/Error ../../../core/promiseUtils ../../../geometry/support/contains ../../../geometry/support/intersects ../../../geometry/support/jsonUtils ../../../geometry/support/spatialReferenceUtils ../contains ../featureConversionUtils ../OptimizedGeometry ./projectionSupport ./utils".split(" "),function(r,d,t,u,g,e,l,v,f,m,n,p,q,w,h){function k(){return e.create(function(a){return r(["../../../geometry/geometryEngine"],
a)})}Object.defineProperty(d,"__esModule",{value:!0});var x={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},y={esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,
esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},z={esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},A={esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1};d.importGeometryEngine=k;d.getGeodesicBufferOperator=function(){return k().then(function(a){return a.geodesicBuffer})};
d.getSpatialQueryOperator=function(a,c,b){if(f.isPolygon(c)&&"esriGeometryPoint"===b.geometryType&&("esriSpatialRelIntersects"===a||"esriSpatialRelContains"===a)){var d=p.convertFromPolygon(new q.default,c,!1,!1);return e.resolve(function(a){return n.polygonContainsPoint(d,!1,!1,a)})}if(f.isPolygon(c)&&"esriGeometryMultipoint"===b.geometryType){var B=p.convertFromPolygon(new q.default,c,!1,!1);if("esriSpatialRelContains"===a)return e.resolve(function(a){return n.polygonContainsMultipoint(B,!1,!1,
a,b.hasZ,b.hasM)})}if(f.isExtent(c)&&"esriGeometryPoint"===b.geometryType&&("esriSpatialRelIntersects"===a||"esriSpatialRelContains"===a))return e.resolve(function(a){return l.extentContainsPoint(c,h.getGeometry(b,a))});if(f.isExtent(c)&&"esriGeometryMultipoint"===b.geometryType&&"esriSpatialRelContains"===a)return e.resolve(function(a){return l.extentContainsMultipoint(c,h.getGeometry(b,a))});if(f.isExtent(c)&&"esriSpatialRelIntersects"===a){var g=v.getExtentIntersector(b.geometryType);return e.resolve(function(a){return g(c,
h.getGeometry(b,a))})}return k().then(function(d){var f=d[x[a]].bind(null,c);return function(a){return f(h.getGeometry(b,a))}})};d.checkSpatialQuerySupport=function(a,c,b){return u(this,void 0,void 0,function(){var d,e;return t(this,function(h){d=a.spatialRel;e=a.geometry;if(!e)return[2];if(!0!==y[d])throw new g("feature-store:unsupported-query","Unsupported query spatial relationship",{query:a});if(!m.isValid(e.spatialReference)||!m.isValid(b))return[2];if(!0!==z[f.getJsonType(e)])throw new g("feature-store:unsupported-query",
"Unsupported query geometry type",{query:a});if(!0!==A[c])throw new g("feature-store:unsupported-query","Unsupported layer geometry type",{query:a});return a.outSR?[2,w.checkProjectionSupport(a.geometry&&a.geometry.spatialReference,a.outSR)]:[2]})})};d.canQueryWithRBush=function(a){if(f.isExtent(a))return!0;if(f.isPolygon(a)){var c=0;for(a=a.rings;c<a.length;c++){var b=a[c];if(5!==b.length||b[0][0]!==b[1][0]||b[0][0]!==b[4][0]||b[2][0]!==b[3][0]||b[0][1]!==b[3][1]||b[0][1]!==b[4][1]||b[1][1]!==b[2][1])return!1}return!0}return!1}});