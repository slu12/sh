// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper ../core/tsSupport/generatorHelper ../core/tsSupport/awaiterHelper ../core/tsSupport/assignHelper ../symbols ../symbols ../core/jsonMap ../core/lang ../core/Logger ../core/maybe ../core/promiseUtils ../core/accessorSupport/decorators ../core/accessorSupport/ensureType ../layers/support/fieldUtils ./Renderer ./mixins/VisualVariablesMixin ./support/ClassBreakInfo ./support/LegendOptions ../support/arcadeOnDemand ../symbols/support/jsonUtils".split(" "),
function(J,K,C,e,L,m,n,x,y,l,D,p,E,g,z,f,u,v,F,G,q,H,A,h){var r=E.getLogger("esri.renderers.ClassBreaksRenderer"),t=new D.default({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",esriNormalizeByField:"field"}),I=u.ensureType(q.ClassBreakInfo);return function(B){function a(b){b=B.call(this,b)||this;b.backgroundFillSymbol=null;b.classBreakInfos=null;b.defaultLabel=null;b.defaultSymbol=null;b.field=null;b.isMaxInclusive=!0;b.legendOptions=null;b.normalizationField=null;b.normalizationTotal=
null;b.type="class-breaks";b.valueExpression=null;b.valueExpressionTitle=null;b._set("classBreakInfos",[]);return b}C(a,B);w=a;Object.defineProperty(a.prototype,"_cache",{get:function(){return{compiledFunc:null}},enumerable:!0,configurable:!0});a.prototype.readClassBreakInfos=function(b,d,c){if(Array.isArray(b)){var a=d.minValue;return b.map(function(b){var d=new q.ClassBreakInfo;d.read(b,c);null==d.minValue&&(d.minValue=a);null==d.maxValue&&(d.maxValue=d.minValue);a=d.maxValue;return d})}};a.prototype.writeClassBreakInfos=
function(b,d,c,a){b=b.map(function(b){return b.write({},a)});this._areClassBreaksConsecutive()&&b.forEach(function(b){return delete b.classMinValue});d[c]=b};a.prototype.readDefaultSymbol=function(b,d,c){return h.read(b,d,c)};a.prototype.writeDefaultSymbolWebScene=function(b,d,c,a){h.writeTarget(b,d,c,a)};a.prototype.writeDefaultSymbol=function(b,d,c,a){h.writeTarget(b,d,c,a)};a.prototype.castField=function(b){return null==b?b:"function"===typeof b?(r.error(".field: field must be a string value"),
null):u.ensureString(b)};Object.defineProperty(a.prototype,"minValue",{get:function(){return this.classBreakInfos&&this.classBreakInfos[0]&&this.classBreakInfos[0].minValue||0},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"normalizationType",{get:function(){var b=this._get("normalizationType"),d=!!this.normalizationField,c=null!=this.normalizationTotal;if(d||c)b=d&&"field"||c&&"percent-of-total"||null,d&&c&&r.warn("warning: both normalizationField and normalizationTotal are set!");
else if("field"===b||"percent-of-total"===b)b=null;return b},set:function(b){this._set("normalizationType",b)},enumerable:!0,configurable:!0});a.prototype.addClassBreakInfo=function(b,d,c){var a=null,a="number"===typeof b?new q.ClassBreakInfo({minValue:b,maxValue:d,symbol:l.ensureType(c)}):I(p.clone(b));this.classBreakInfos.push(a);1===this.classBreakInfos.length&&this.notifyChange("minValue")};a.prototype.removeClassBreakInfo=function(b,d){for(var c=this.classBreakInfos.length,a=0;a<c;a++){var f=
[this.classBreakInfos[a].minValue,this.classBreakInfos[a].maxValue];if(f[0]===b&&f[1]===d){this.classBreakInfos.splice(a,1);break}}};a.prototype.getBreakIndex=function(b,d){this.valueExpression&&(g.isNone(d)||g.isNone(d.arcade))&&r.warn("");return this.valueExpression?this._getBreakIndexForExpression(b,d):this._getBreakIndexForField(b)};a.prototype.getClassBreakInfo=function(b,d){return n(this,void 0,void 0,function(){var a,f,e,k;return m(this,function(c){switch(c.label){case 0:a=d;if(!this.valueExpression||
!g.isNone(d)&&!g.isNone(d.arcade))return[3,2];f=[{},a];e={};return[4,A.loadArcade()];case 1:a=x.apply(void 0,f.concat([(e.arcade=c.sent(),e)])),c.label=2;case 2:return k=this.getBreakIndex(b,a),[2,-1!==k?this.classBreakInfos[k]:null]}})})};a.prototype.getSymbol=function(b,a){if(this.valueExpression&&(g.isNone(a)||g.isNone(a.arcade)))r.error("#getSymbol()","Please use getSymbolAsync if valueExpression is used");else return b=this.getBreakIndex(b,a),-1<b?this.classBreakInfos[b].symbol:this.defaultSymbol};
a.prototype.getSymbolAsync=function(b,a){return n(this,void 0,void 0,function(){var d,f,e,k;return m(this,function(c){switch(c.label){case 0:d=a;if(!this.valueExpression||!g.isNone(a)&&!g.isNone(a.arcade))return[3,2];f=[{},d];e={};return[4,A.loadArcade()];case 1:d=x.apply(void 0,f.concat([(e.arcade=c.sent(),e)])),c.label=2;case 2:return k=this.getBreakIndex(b,d),[2,-1<k?this.classBreakInfos[k].symbol:this.defaultSymbol]}})})};a.prototype.getSymbols=function(){var b=[];this.classBreakInfos.forEach(function(a){a.symbol&&
b.push(a.symbol)});this.defaultSymbol&&b.push(this.defaultSymbol);return b};a.prototype.getAttributeHash=function(){return this.visualVariables&&this.visualVariables.reduce(function(b,a){return b+a.getAttributeHash()},"")};a.prototype.getMeshHash=function(){var b=JSON.stringify(this.backgroundFillSymbol),a=JSON.stringify(this.defaultSymbol),c=this.normalizationField+"."+this.normalizationType+"."+this.normalizationTotal,f=this.classBreakInfos.reduce(function(b,a){return b+a.getMeshHash()},"");return b+
"."+a+"."+f+"."+c+"."+this.field+"."+this.valueExpression};Object.defineProperty(a.prototype,"arcadeRequired",{get:function(){return this.arcadeRequiredForVisualVariables||!!this.valueExpression},enumerable:!0,configurable:!0});a.prototype.clone=function(){return new w({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,
classBreakInfos:p.clone(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:p.clone(this.visualVariables),legendOptions:p.clone(this.legendOptions),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})};a.prototype.collectRequiredFields=function(b,a){return n(this,void 0,void 0,function(){var c;return m(this,function(d){switch(d.label){case 0:return c=
[this.collectVVRequiredFields(b,a),this.collectSymbolFields(b,a)],[4,z.all(c)];case 1:return d.sent(),[2]}})})};a.prototype.collectSymbolFields=function(b,a){return n(this,void 0,void 0,function(){var c;return m(this,function(d){switch(d.label){case 0:return c=this.getSymbols().map(function(c){return c.collectRequiredFields(b,a)}).concat([v.collectArcadeFieldNames(b,a,this.valueExpression)]),v.collectField(b,a,this.field),v.collectField(b,a,this.normalizationField),[4,z.all(c)];case 1:return d.sent(),
[2]}})})};a.prototype._getBreakIndexForExpression=function(b,a){var c=g.unwrapOr(a,{});a=c.viewingMode;var d=c.scale,f=c.spatialReference,e=this._cache.compiledFunc,c=g.expect(c.arcade).arcadeUtils;e||(e=c.createSyntaxTree(this.valueExpression),e=c.createFunction(e),this._cache.compiledFunc=e);b=c.executeFunction(e,c.createExecContext(b,c.getViewInfo({viewingMode:a,scale:d,spatialReference:f})));return this._getBreakIndexfromInfos(b)};a.prototype._getBreakIndexForField=function(b){var a=b.attributes;
b=this.normalizationType;var c=parseFloat(a[this.field]);if(b){var e=this.normalizationTotal,a=parseFloat(a[this.normalizationField]);if("log"===b)c=Math.log(c)*Math.LOG10E;else if("percent-of-total"===b&&!isNaN(e))c=c/e*100;else if("field"===b&&!isNaN(a)){if(isNaN(c)||isNaN(a))return-1;c/=a}}return this._getBreakIndexfromInfos(c)};a.prototype._getBreakIndexfromInfos=function(a){var b=this.isMaxInclusive;if(null!=a&&"number"===typeof a&&!isNaN(a))for(var c=0;c<this.classBreakInfos.length;c++){var e=
[this.classBreakInfos[c].minValue,this.classBreakInfos[c].maxValue];if(e[0]<=a&&(b?a<=e[1]:a<e[1]))return c}return-1};a.prototype._areClassBreaksConsecutive=function(){for(var a=this.classBreakInfos,d=a.length,c=1;c<d;c++)if(a[c-1].maxValue!==a[c].minValue)return!1;return!0};var w;e([f.property({readOnly:!0,dependsOn:["valueExpression"]})],a.prototype,"_cache",null);e([f.property({types:{base:y.BaseSymbol,key:"type",typeMap:{"simple-fill":l.symbolTypesRenderer.typeMap["simple-fill"],"picture-fill":l.symbolTypesRenderer.typeMap["picture-fill"],
"polygon-3d":l.symbolTypesRenderer.typeMap["polygon-3d"]}},json:{origins:{"web-scene":{type:y.PolygonSymbol3D,read:h.read,write:h.writeTarget}},read:h.read,write:h.writeTarget}})],a.prototype,"backgroundFillSymbol",void 0);e([f.property({type:[q.ClassBreakInfo]})],a.prototype,"classBreakInfos",void 0);e([f.reader("classBreakInfos")],a.prototype,"readClassBreakInfos",null);e([f.writer("classBreakInfos")],a.prototype,"writeClassBreakInfos",null);e([f.property({type:String,json:{write:!0}})],a.prototype,
"defaultLabel",void 0);e([f.property({types:l.symbolTypesRenderer})],a.prototype,"defaultSymbol",void 0);e([f.reader("defaultSymbol")],a.prototype,"readDefaultSymbol",null);e([f.writer("web-scene","defaultSymbol",{defaultSymbol:{types:l.symbolTypesRenderer3D}})],a.prototype,"writeDefaultSymbolWebScene",null);e([f.writer("defaultSymbol")],a.prototype,"writeDefaultSymbol",null);e([f.property({type:String,json:{write:!0}})],a.prototype,"field",void 0);e([f.cast("field")],a.prototype,"castField",null);
e([f.property({type:Boolean})],a.prototype,"isMaxInclusive",void 0);e([f.property({type:H.default,json:{write:!0}})],a.prototype,"legendOptions",void 0);e([f.property({type:Number,readOnly:!0,value:null,dependsOn:["classBreakInfos"],json:{read:!1,write:{overridePolicy:function(){return 0!==this.classBreakInfos.length&&this._areClassBreaksConsecutive()?{enabled:!0}:{enabled:!1}}}}})],a.prototype,"minValue",null);e([f.property({type:String,json:{write:!0}})],a.prototype,"normalizationField",void 0);
e([f.property({type:Number,cast:function(a){return u.ensureNumber(a)},json:{write:!0}})],a.prototype,"normalizationTotal",void 0);e([f.property({type:t.apiValues,value:null,dependsOn:["normalizationField","normalizationTotal"],json:{type:t.jsonValues,read:t.read,write:t.write}})],a.prototype,"normalizationType",null);e([f.enumeration.serializable()({classBreaks:"class-breaks"})],a.prototype,"type",void 0);e([f.property({type:String,json:{write:!0}})],a.prototype,"valueExpression",void 0);e([f.property({type:String,
json:{write:!0}})],a.prototype,"valueExpressionTitle",void 0);return a=w=e([f.subclass("esri.renderers.ClassBreaksRenderer")],a)}(f.declared(G.VisualVariablesMixin(F)))});