// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../layers/support/layerSourceUtils","../../layers/support/layerUtils"],function(m,e,k,l){Object.defineProperty(e,"__esModule",{value:!0});e.findToFindRESTParameters=function(b){b=b.toJSON();var f=b.dynamicLayers,d=b.layerDefinitions,g=b.layerIds,a=b.outSR,c=b.searchFields;b={contains:b.contains,returnGeometry:b.returnGeometry,geometryPrecision:b.geometryPrecision,maxAllowableOffset:b.maxAllowableOffset,searchText:b.searchText};g&&(b.layers=g.join(","));c&&(b.searchFields=
c.join(","));a&&(b.sr=a.wkid||JSON.stringify(a));if(d){c=[];for(a=0;a<d.length;a++){var e=d[a];c[e.id]=e.definitionExpression}b.layerDefs=l.serializeLayerDefinitions(c)}if(f&&f.length){for(var h=[],c=function(b){var a=f[b],c=a.id;!a.subLayerIds&&g&&-1!==g.indexOf(c)&&(b={id:c},b.source=a.source&&k.sourceToJSON(a.source),a=null,d&&d.length&&(a=(a=d.filter(function(a){return a.id===c})[0])&&a.definitionExpression),a&&(b.definitionExpression=a),h.push(b))},a=0;a<f.length;a++)c(a);a=JSON.stringify(h);
"[]"===a&&(a="[{}]");b.dynamicLayers=a}return b}});