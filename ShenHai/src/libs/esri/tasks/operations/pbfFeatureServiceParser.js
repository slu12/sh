// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/Error ../../core/Logger ../../core/pbf ./pbfDehydratedFeatureSet ./pbfOptimizedFeatureSet".split(" "),function(G,k,m,n,p,q,r){function t(a,b,c){for(c=b.createPointGeometry(c);a.next();)switch(a.tag()){case 3:for(var e=a.getUInt32(),e=a.pos()+e,d=0;a.pos()<e;)b.addCoordinatePoint(c,a.getSInt64(),0,d++);break;default:a.skip()}return c}function u(a,b,c){var e=b.createGeometry(c);for(c=2+(c.hasZ?1:0)+(c.hasM?1:0);a.next();)switch(a.tag()){case 2:for(var d=a.getUInt32(),
d=a.pos()+d,g=0;a.pos()<d;)b.addLength(e,a.getUInt32(),g++);break;case 3:for(var d=a.getUInt32(),d=a.pos()+d,f=g=0;a.pos()<d;)b.addCoordinate(e,a.getSInt64(),f,g),g++,g===c&&(f++,g=0);break;default:a.skip()}return e}function v(a){for(;a.next();)switch(a.tag()){case 1:return a.getString();case 2:return a.getFloat();case 3:return a.getDouble();case 4:return a.getSInt32();case 5:return a.getUInt32();case 6:return a.getInt64();case 7:return a.getUInt64();case 8:return a.getSInt64();case 9:return a.getBool();
default:return a.skip(),null}return null}function w(a){for(var b={type:0>=f.length?null:f[0]};a.next();)switch(a.tag()){case 1:b.name=a.getString();break;case 2:var c=a.getEnum();b.type=c>=f.length?null:f[c];break;case 3:b.alias=a.getString();break;case 4:c=a.getEnum();c=c>=l.length?null:l[c];b.sqlType=c;break;default:a.skip()}return b}function x(a,b,c,e){for(var d=b.createFeature(c),g=0;a.next();)switch(a.tag()){case 1:var f=e[g++].name;d.attributes[f]=a.processMessage(v);break;case 2:d.geometry=
a.processMessageWithArgs(u,b,c);break;case 4:d.centroid=a.processMessageWithArgs(t,b,c);break;default:a.skip()}return d}function y(a){for(var b=[1,1,1,1];a.next();)switch(a.tag()){case 1:b[0]=a.getDouble();break;case 2:b[1]=a.getDouble();break;case 4:b[2]=a.getDouble();break;case 3:b[3]=a.getDouble();break;default:a.skip()}return b}function z(a){for(var b=[0,0,0,0];a.next();)switch(a.tag()){case 1:b[0]=a.getDouble();break;case 2:b[1]=a.getDouble();break;case 4:b[2]=a.getDouble();break;case 3:b[3]=
a.getDouble();break;default:a.skip()}return b}function A(a){for(var b={originPosition:0>=h.length?null:h[0]};a.next();)switch(a.tag()){case 1:var c=a.getEnum();b.originPosition=c>=h.length?null:h[c];break;case 2:b.scale=a.processMessage(y);break;case 3:b.translate=a.processMessage(z);break;default:a.skip()}return b}function B(a){for(var b={};a.next();)switch(a.tag()){case 1:b.shapeAreaFieldName=a.getString();break;case 2:b.shapeLengthFieldName=a.getString();break;case 3:b.units=a.getString();break;
default:a.skip()}return b}function C(a,b){for(b=b.createSpatialReference();a.next();)switch(a.tag()){case 1:b.wkid=a.getUInt32();break;case 5:b.wkt=a.getString();break;default:a.skip()}return b}function D(a,b){var c=b.createFeatureResult();c.geometryType=0>=b.geometryTypes.length?null:b.geometryTypes[0];for(var e=!1;a.next();)switch(a.tag()){case 1:c.objectIdFieldName=a.getString();break;case 3:c.globalIdFieldName=a.getString();break;case 4:c.geohashFieldName=a.getString();break;case 5:c.geometryProperties=
a.processMessage(B);break;case 7:var d=a.getEnum();c.geometryType=d>=b.geometryTypes.length?null:b.geometryTypes[d];break;case 8:c.spatialReference=a.processMessageWithArgs(C,b);break;case 10:c.hasZ=a.getBool();break;case 11:c.hasM=a.getBool();break;case 12:c.transform=a.processMessage(A);break;case 9:d=a.getBool();c.exceededTransferLimit=d;break;case 13:b.addField(c,a.processMessage(w));break;case 15:e||(b.prepareFeatures(c),e=!0);b.addFeature(c,a.processMessageWithArgs(x,b,c,c.fields));break;default:a.skip()}b.finishFeatureResult(c);
return c}function E(a,b){for(var c={};a.next();)switch(a.tag()){case 1:c.featureResult=a.processMessageWithArgs(D,b);break;default:a.skip()}return c}Object.defineProperty(k,"__esModule",{value:!0});var F=n.getLogger("esri.tasks.operations.pbfFeatureServiceParser"),f="esriFieldTypeSmallInteger esriFieldTypeInteger esriFieldTypeSingle esriFieldTypeDouble esriFieldTypeString esriFieldTypeDate esriFieldTypeOID esriFieldTypeGeometry esriFieldTypeBlob esriFieldTypeRaster esriFieldTypeGUID esriFieldTypeGlobalID esriFieldTypeXML".split(" "),
l="sqlTypeBigInt sqlTypeBinary sqlTypeBit sqlTypeChar sqlTypeDate sqlTypeDecimal sqlTypeDouble sqlTypeFloat sqlTypeGeometry sqlTypeGUID sqlTypeInteger sqlTypeLongNVarchar sqlTypeLongVarbinary sqlTypeLongVarchar sqlTypeNChar sqlTypeNVarchar sqlTypeOther sqlTypeReal sqlTypeSmallInt sqlTypeSqlXml sqlTypeTime sqlTypeTimestamp sqlTypeTimestamp2 sqlTypeTinyInt sqlTypeVarbinary sqlTypeVarchar".split(" "),h=["upperLeft","lowerLeft"];k.parseFeatureQuery=function(a,b){b=b&&"dehydrated"===b.type?new q.Context(b):
new r.Context;try{var c=new p(new Uint8Array(a),new DataView(a));for(a={};c.next();)switch(c.tag()){case 2:a.queryResult=c.processMessageWithArgs(E,b);break;default:c.skip()}return a}catch(e){return c=new m("query:parsing-pbf","Error while parsing FeatureSet PBF payload",{error:e}),F.error(c),{queryResult:{featureResult:b.createFeatureResult()}}}}});