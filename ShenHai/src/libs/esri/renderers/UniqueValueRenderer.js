// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper ../core/tsSupport/generatorHelper ../core/tsSupport/awaiterHelper ../core/tsSupport/assignHelper ../symbols ../symbols ../core/arrayUtils ../core/Error ../core/lang ../core/Logger ../core/maybe ../core/promiseUtils ../core/urlUtils ../core/accessorSupport/decorators ../core/accessorSupport/diffUtils ../core/accessorSupport/ensureType ../layers/support/fieldUtils ../portal/Portal ./Renderer ./mixins/VisualVariablesMixin ./support/LegendOptions ./support/UniqueValueInfo ../support/arcadeOnDemand ../symbols/support/jsonUtils ../symbols/support/styleUtils".split(" "),
function(N,O,E,d,P,q,r,x,v,l,y,F,m,G,k,z,A,e,H,B,t,w,I,J,K,u,C,n,L){var g=G.getLogger("esri.renderers.UniqueValueRenderer"),M=B.ensureType(u.default);return function(D){function a(b){b=D.call(this,b)||this;b._valueInfoMap={};b._isDefaultSymbolDerived=!1;b.type="unique-value";b.backgroundFillSymbol=null;b.field=null;b.field2=null;b.field3=null;b.valueExpression=null;b.valueExpressionTitle=null;b.legendOptions=null;b.defaultLabel=null;b.fieldDelimiter=null;b.portal=null;b.styleOrigin=null;b.diff={uniqueValueInfos:function(b,
f){if(b||f){if(!b||!f)return{type:"complete",oldValue:b,newValue:f};for(var c=!1,a={type:"collection",added:[],removed:[],changed:[],unchanged:[]},e=function(h){var d=y.find(b,function(b){return b.value===f[h].value});d?H.diff(d,f[h])?(a.changed.push({type:"complete",oldValue:d,newValue:f[h]}),c=!0):a.unchanged.push({oldValue:d,newValue:f[h]}):(a.added.push(f[h]),c=!0)},d=0;d<f.length;d++)e(d);e=function(h){y.find(f,function(c){return c.value===b[h].value})||(a.removed.push(b[h]),c=!0)};for(d=0;d<
b.length;d++)e(d);return c?a:void 0}}};b._set("uniqueValueInfos",[]);return b}E(a,D);p=a;Object.defineProperty(a.prototype,"_cache",{get:function(){return{compiledFunc:null}},enumerable:!0,configurable:!0});a.prototype.writeBackgroundFillSymbolWebScene=function(b,c,f,a){n.writeTarget(b,c,f,a)};a.prototype.castField=function(b){return null==b||"function"===typeof b?b:B.ensureString(b)};a.prototype.writeField=function(b,c,f,a){"string"===typeof b?c[f]=b:a&&a.messages?a.messages.push(new F("property:unsupported",
"UniqueValueRenderer.field set to a function cannot be written to JSON")):g.error(".field: cannot write field to JSON since it's not a string value")};Object.defineProperty(a.prototype,"defaultSymbol",{set:function(b){this._isDefaultSymbolDerived=!1;this._set("defaultSymbol",b)},enumerable:!0,configurable:!0});a.prototype.readDefaultSymbol=function(b,c,f){return n.read(b,c,f)};a.prototype.writeDefaultSymbolWebScene=function(b,c,f,a){this._isDefaultSymbolDerived||n.writeTarget(b,c,f,a)};a.prototype.writeDefaultSymbol=
function(b,c,a,h){this._isDefaultSymbolDerived||n.writeTarget(b,c,a,h)};a.prototype.readPortal=function(b,c,a){return a.portal||w.getDefault()};a.prototype.readStyleOrigin=function(b,c,a){if(c.styleName)return Object.freeze({styleName:c.styleName});if(c.styleUrl)return b=A.fromJSON(c.styleUrl,a),Object.freeze({styleUrl:b})};a.prototype.writeStyleOrigin=function(b,c,a,h){b.styleName?c.styleName=b.styleName:b.styleUrl&&(c.styleUrl=A.toJSON(b.styleUrl,h))};Object.defineProperty(a.prototype,"uniqueValueInfos",
{set:function(b){this.styleOrigin?g.error("#uniqueValueInfos\x3d","Cannot modify unique value infos of a UniqueValueRenderer created from a web style"):(this._set("uniqueValueInfos",b),this._updateValueInfoMap())},enumerable:!0,configurable:!0});a.prototype.addUniqueValueInfo=function(b,c){this.styleOrigin?g.error("#addUniqueValueInfo()","Cannot modify unique value infos of a UniqueValueRenderer created from a web style"):(b="object"===typeof b?M(b):new u.default({value:b,symbol:l.ensureType(c)}),
this.uniqueValueInfos.push(b),this._valueInfoMap[b.value]=b)};a.prototype.removeUniqueValueInfo=function(b){if(this.styleOrigin)g.error("#removeUniqueValueInfo()","Cannot modify unique value infos of a UniqueValueRenderer created from a web style");else for(var c=0;c<this.uniqueValueInfos.length;c++)if(this.uniqueValueInfos[c].value===b+""){delete this._valueInfoMap[b];this.uniqueValueInfos.splice(c,1);break}};a.prototype.getUniqueValueInfo=function(b,c){return r(this,void 0,void 0,function(){var a,
h,d;return q(this,function(f){switch(f.label){case 0:a=c;if(!this.valueExpression||!k.isNone(c)&&!k.isNone(c.arcade))return[3,2];h=[{},a];d={};return[4,C.loadArcade()];case 1:a=x.apply(void 0,h.concat([(d.arcade=f.sent(),d)])),f.label=2;case 2:return[2,this._getUniqueValueInfo(b,a)]}})})};a.prototype.getSymbol=function(b,c){if(this.valueExpression&&(k.isNone(c)||k.isNone(c.arcade)))g.error("#getSymbol()","Please use getSymbolAsync if valueExpression is used");else return(b=this._getUniqueValueInfo(b,
c))&&b.symbol||this.defaultSymbol};a.prototype.getSymbolAsync=function(b,c){return r(this,void 0,void 0,function(){var a,h,d,e;return q(this,function(f){switch(f.label){case 0:a=c;if(!this.valueExpression||!k.isNone(a)&&!k.isNone(a.arcade))return[3,2];h=[{},a];d={};return[4,C.loadArcade()];case 1:a=x.apply(void 0,h.concat([(d.arcade=f.sent(),d)])),f.label=2;case 2:return e=this._getUniqueValueInfo(b,a),[2,e&&e.symbol||this.defaultSymbol]}})})};a.prototype.getSymbols=function(){for(var b=[],c=0,a=
this.uniqueValueInfos;c<a.length;c++){var d=a[c];d.symbol&&b.push(d.symbol)}this.defaultSymbol&&b.push(this.defaultSymbol);return b};a.prototype.getAttributeHash=function(){return this.visualVariables&&this.visualVariables.reduce(function(b,c){return b+c.getAttributeHash()},"")};a.prototype.getMeshHash=function(){var b=JSON.stringify(this.backgroundFillSymbol),c=JSON.stringify(this.defaultSymbol),a=this.uniqueValueInfos.reduce(function(b,c){return b+c.getMeshHash()},"");return b+"."+c+"."+a+"."+(this.field+
"."+this.field2+"."+this.field3+"."+this.fieldDelimiter)+"."+this.valueExpression};a.prototype.clone=function(){var b=new p({field:this.field,field2:this.field2,field3:this.field3,defaultLabel:this.defaultLabel,defaultSymbol:m.clone(this.defaultSymbol),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,fieldDelimiter:this.fieldDelimiter,visualVariables:m.clone(this.visualVariables),legendOptions:m.clone(this.legendOptions),authoringInfo:this.authoringInfo&&this.authoringInfo.clone(),
backgroundFillSymbol:m.clone(this.backgroundFillSymbol)});this._isDefaultSymbolDerived&&(b._isDefaultSymbolDerived=!0);b._set("portal",this.portal);var c=m.clone(this.uniqueValueInfos);this.styleOrigin&&(b._set("styleOrigin",Object.freeze(m.clone(this.styleOrigin))),Object.freeze(c));b._set("uniqueValueInfos",c);b._updateValueInfoMap();return b};Object.defineProperty(a.prototype,"arcadeRequired",{get:function(){return this.arcadeRequiredForVisualVariables||!!this.valueExpression},enumerable:!0,configurable:!0});
a.prototype.collectRequiredFields=function(b,c){return r(this,void 0,void 0,function(){var a;return q(this,function(f){switch(f.label){case 0:return a=[this.collectVVRequiredFields(b,c),this.collectSymbolFields(b,c)],[4,z.all(a)];case 1:return f.sent(),[2]}})})};a.prototype.collectSymbolFields=function(b,c){return r(this,void 0,void 0,function(){var a;return q(this,function(f){switch(f.label){case 0:return a=this.getSymbols().map(function(a){return a.collectRequiredFields(b,c)}).concat([t.collectArcadeFieldNames(b,
c,this.valueExpression)]),t.collectField(b,c,this.field),t.collectField(b,c,this.field2),t.collectField(b,c,this.field3),[4,z.all(a)];case 1:return f.sent(),[2]}})})};a.prototype.populateFromStyle=function(){var b=this;return L.fetchStyle(this.styleOrigin,{portal:this.portal}).then(function(c){var a=[];b._valueInfoMap={};c&&c.data&&Array.isArray(c.data.items)&&c.data.items.forEach(function(f){var d=new v.WebStyleSymbol({styleUrl:c.styleUrl,styleName:c.styleName,portal:b.portal,name:f.name});b.defaultSymbol||
f.name!==c.data.defaultItem||(b.defaultSymbol=d,b._isDefaultSymbolDerived=!0);d=new u.default({value:f.name,symbol:d});a.push(d);b._valueInfoMap[f.name]=d});b._set("uniqueValueInfos",Object.freeze(a));!b.defaultSymbol&&b.uniqueValueInfos.length&&(b.defaultSymbol=b.uniqueValueInfos[0].symbol,b._isDefaultSymbolDerived=!0);return b})};a.prototype._updateValueInfoMap=function(){var b=this;this._valueInfoMap={};this.uniqueValueInfos.forEach(function(a){return b._valueInfoMap[a.value+""]=a})};a.prototype._getUniqueValueInfo=
function(b,a){return this.valueExpression?this._getUnqiueValueInfoForExpression(b,a):this._getUnqiueValueInfoForFields(b)};a.prototype._getUnqiueValueInfoForExpression=function(b,a){var c=k.unwrapOr(a,{});a=c.viewingMode;var d=c.scale,e=c.spatialReference,g=this._cache.compiledFunc,c=k.expect(c.arcade).arcadeUtils;g||(g=c.createSyntaxTree(this.valueExpression),g=c.createFunction(g),this._cache.compiledFunc=g);b=c.executeFunction(g,c.createExecContext(b,c.getViewInfo({viewingMode:a,scale:d,spatialReference:e})));
return this._valueInfoMap[b+""]};a.prototype._getUnqiueValueInfoForFields=function(b){var a=this.field,d=b.attributes,e;if("function"!==typeof a&&this.field2){b=this.field2;e=this.field3;var g=[];a&&g.push(d[a]);b&&g.push(d[b]);e&&g.push(d[e]);e=g.join(this.fieldDelimiter||"")}else"function"===typeof a?e=a(b):a&&(e=d[a]);return this._valueInfoMap[e+""]};a.fromPortalStyle=function(b,a){var c=new p(a&&a.properties);c._set("styleOrigin",Object.freeze({styleName:b}));c._set("portal",a&&a.portal||w.getDefault());
a=c.populateFromStyle();a.catch(function(a){g.error("#fromPortalStyle('"+b+"'[, ...])","Failed to create unique value renderer from style name",a)});return a};a.fromStyleUrl=function(b,a){a=new p(a&&a.properties);a._set("styleOrigin",Object.freeze({styleUrl:b}));a=a.populateFromStyle();a.catch(function(a){g.error("#fromStyleUrl('"+b+"'[, ...])","Failed to create unique value renderer from style URL",a)});return a};var p;d([e.property({readOnly:!0,dependsOn:["valueExpression"]})],a.prototype,"_cache",
null);d([e.enumeration.serializable()({uniqueValue:"unique-value"})],a.prototype,"type",void 0);d([e.property({types:{base:v.BaseSymbol,key:"type",typeMap:{"simple-fill":l.symbolTypesRenderer.typeMap["simple-fill"],"picture-fill":l.symbolTypesRenderer.typeMap["picture-fill"],"polygon-3d":l.symbolTypesRenderer.typeMap["polygon-3d"]}},json:{read:n.read,write:n.writeTarget}})],a.prototype,"backgroundFillSymbol",void 0);d([e.writer("web-scene","backgroundFillSymbol",{backgroundFillSymbol:{type:v.PolygonSymbol3D}})],
a.prototype,"writeBackgroundFillSymbolWebScene",null);d([e.property({json:{type:String,read:{source:"field1"},write:{target:"field1"}}})],a.prototype,"field",void 0);d([e.cast("field")],a.prototype,"castField",null);d([e.writer("field")],a.prototype,"writeField",null);d([e.property({type:String,json:{write:!0}})],a.prototype,"field2",void 0);d([e.property({type:String,json:{write:!0}})],a.prototype,"field3",void 0);d([e.property({type:String,json:{write:!0}})],a.prototype,"valueExpression",void 0);
d([e.property({type:String,json:{write:!0}})],a.prototype,"valueExpressionTitle",void 0);d([e.property({type:K.default,json:{write:!0}})],a.prototype,"legendOptions",void 0);d([e.property({type:String,json:{write:!0}})],a.prototype,"defaultLabel",void 0);d([e.property({types:l.symbolTypesRenderer})],a.prototype,"defaultSymbol",null);d([e.reader("defaultSymbol")],a.prototype,"readDefaultSymbol",null);d([e.writer("web-scene","defaultSymbol",{defaultSymbol:{types:l.symbolTypesRenderer3D}})],a.prototype,
"writeDefaultSymbolWebScene",null);d([e.writer("defaultSymbol")],a.prototype,"writeDefaultSymbol",null);d([e.property({type:String,json:{write:!0}})],a.prototype,"fieldDelimiter",void 0);d([e.property({type:w,readOnly:!0})],a.prototype,"portal",void 0);d([e.reader("portal",["styleName"])],a.prototype,"readPortal",null);d([e.property({readOnly:!0,json:{write:{enabled:!1,overridePolicy:function(){return{enabled:!0}}}}})],a.prototype,"styleOrigin",void 0);d([e.reader("styleOrigin",["styleName","styleUrl"])],
a.prototype,"readStyleOrigin",null);d([e.writer("styleOrigin",{styleName:{type:String},styleUrl:{type:String}})],a.prototype,"writeStyleOrigin",null);d([e.property({type:[u.default],json:{write:{overridePolicy:function(){return this.styleOrigin?{enabled:!1}:{enabled:!0}}}}})],a.prototype,"uniqueValueInfos",null);return a=p=d([e.subclass("esri.renderers.UniqueValueRenderer")],a)}(e.declared(J.VisualVariablesMixin(I)))});