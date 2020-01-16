// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","../../core/jsonMap","../../geometry/support/jsonUtils"],function(c,f,e){var g=new f.JSONMap({esriGeometryRelationCross:"cross",esriGeometryRelationDisjoint:"disjoint",esriGeometryRelationIn:"in",esriGeometryRelationInteriorIntersection:"interior-intersection",esriGeometryRelationIntersection:"intersection",esriGeometryRelationLineCoincidence:"line-coincidence",esriGeometryRelationLineTouch:"line-touch",esriGeometryRelationOverlap:"overlap",esriGeometryRelationPointTouch:"point-touch",
esriGeometryRelationTouch:"touch",esriGeometryRelationWithin:"within",esriGeometryRelationRelation:"relation"});return c.createSubclass({declaredClass:"esri.tasks.support.RelationParameters",properties:{geometries1:null,geometries2:null,relation:null,relationParameter:null},toJSON:function(){var a=(this.geometries1||[]).map(function(a){return a.toJSON()}),c=(this.geometries2||[]).map(function(a){return a.toJSON()}),b={},d=this.geometries1;d&&0<d.length&&(b.geometries1=JSON.stringify({geometryType:e.getJsonType(d[0]),
geometries:a}),a=this.geometries1[0].spatialReference,b.sr=a.wkid?a.wkid:JSON.stringify(a.toJSON()));(a=this.geometries2)&&0<a.length&&(b.geometries2=JSON.stringify({geometryType:e.getJsonType(a[0]),geometries:c}));this.relation&&(b.relation=g.toJSON(this.relation));this.relationParameter&&(b.relationParam=this.relationParameter);return b}})});