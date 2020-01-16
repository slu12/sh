// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/tsSupport/assignHelper ../../core/tsSupport/generatorHelper ../../core/tsSupport/awaiterHelper ../../Graphic ../../intl ../../core/Error ../../core/Handles ../../core/lang ../../core/Logger ../../core/promiseUtils ../../core/string ../../core/throttle ../../core/watchUtils ../../core/accessorSupport/decorators ../../intl/date ../../intl/number ../../layers/support/fieldUtils ../../popup/content/TextContent ../../popup/content/support/ChartMediaInfoValueSeries ../../popup/support/FieldInfoFormat ../../tasks/support/AttachmentQuery ./support/featureUtils ./support/RelatedFeatures ../support/widget".split(" "),
function(I,aa,J,p,r,x,y,K,u,L,M,q,N,g,O,P,Q,l,R,E,S,T,U,V,W,t,X,F){function Y(){return y(this,void 0,void 0,function(){return x(this,function(l){return[2,g.create(function(d){I(["../../support/arcadeUtils"],function(a){d(a)})})]})})}function z(g){var d=/(\n)/gi;return"string"===typeof g?g.replace(d,'\x3cbr class\x3d"esri-text-new-line" /\x3e'):g}function B(g,d){return g&&"function"===typeof g.getField?g.getField(d):null}function C(g){return g.replace(/[\u00A0-\u9999<>\&]/gim,function(d){return"\x26#"+
d.charCodeAt(0)+";"})}var Z=["$datastore","$map","$layer"],A=N.getLogger("esri.widgets.FeatureViewModel"),H=/^\s*expression\//i,D=R.convertDateFormatToIntlOptions("short-date-short-time");return function(G){function d(a){var b=G.call(this,a)||this;b._handles=new M;b._featureAbortController=null;b._graphicChangedThrottled=P.throttle(b._graphicChanged,1,b);b._effectivePopupTemplate=null;b._contentResponse=null;b._graphic=null;b._fieldInfoMap=null;b.content=null;b.defaultPopupTemplateEnabled=!1;b.formattedAttributes=
null;b.graphic=null;b.lastEditInfo=null;b.title="";b.view=null;b._handles.add(Q.init(b,"graphic graphic.sourceLayer.popupTemplate.title graphic.sourceLayer.popupTemplate.content graphic.sourceLayer.popupTemplate.fieldInfos graphic.sourceLayer.popupTemplate.lastEditInfoEnabled graphic.popupTemplate.title graphic.popupTemplate.content graphic.popupTemplate.fieldInfos graphic.popupTemplate.lastEditInfoEnabled".split(" "),function(){return b._graphicChangedThrottled()}));return b}J(d,G);d.prototype.destroy=
function(){this._clear();this._cancelFeatureQuery();this._handles.destroy();this._graphic=this.graphic=this._handles=null};Object.defineProperty(d.prototype,"spatialReference",{get:function(){return this.get("view.spatialReference")||null},set:function(a){void 0===a?this._clearOverride("spatialReference"):this._override("spatialReference",a)},enumerable:!0,configurable:!0});Object.defineProperty(d.prototype,"map",{get:function(){return this.get("view.map")||null},set:function(a){void 0===a?this._clearOverride("map"):
this._override("map",a)},enumerable:!0,configurable:!0});Object.defineProperty(d.prototype,"waitingForContent",{get:function(){return!!this._featureAbortController},enumerable:!0,configurable:!0});d.prototype._clear=function(){this._set("title","");this._set("content",null);this._set("formattedAttributes",null)};d.prototype._graphicChanged=function(){return y(this,void 0,void 0,function(){var a,b,c,e;return x(this,function(f){switch(f.label){case 0:this._cancelFeatureQuery();this._clear();this._graphic=
b=(a=this.graphic)?a.clone():null;if(!b)return[2];this._featureAbortController=c=g.createAbortController();f.label=1;case 1:return f.trys.push([1,3,,4]),[4,this._queryFeature({signal:c.signal})];case 2:return f.sent(),[3,4];case 3:return e=f.sent(),A.error("error","error loading template",e),[3,4];case 4:return this._featureAbortController=null,[2]}})})};d.prototype._cancelFeatureQuery=function(){var a=this._featureAbortController;a&&a.abort();this._featureAbortController=null};d.prototype._compileContent=
function(a,b){var c=this;if(a&&(a.nodeName||a&&F.isWidgetBase(a)||F.isWidget(a)))return a;if(this._graphic){if("string"===typeof a)return this._compileText(new T({text:a})).text;if(Array.isArray(a))return a.map(function(a,f){f=(f=b&&b[f])&&f.value;if("attachments"===a.type)return c._compileAttachments(a,f);if("fields"===a.type)return c._compileFields(a);if("media"===a.type)return c._compileMedia(a);if("text"===a.type)return c._compileText(a)});a&&A.warn("invalid content type.")}};d.prototype._compileFields=
function(a){var b=this,c=this._effectivePopupTemplate;a=q.clone(a);var e=c&&c.expressionInfos,c=a.fieldInfos?void 0:c&&c.fieldInfos,c=a.fieldInfos||q.clone(c),f=[];c&&c.forEach(function(a){var c=a.fieldName.toLowerCase();if(!a.hasOwnProperty("visible")||a.visible)c=b._isExpressionField(c)?b._getExpressionInfo(e,c):null,a.label=c?c.title:a.label,f.push(a)});a.fieldInfos=f;return a};d.prototype._setImageValue=function(a){var b=a.value,c=a.formattedAttributes;a=a.layer;var e=b.linkURL,f=b.sourceURL;
f&&(f=this._fixTokens(f,a),b.sourceURL=this._substituteAttributes(c,f));e&&(a=this._fixTokens(e,a),b.linkURL=this._substituteAttributes(c,a))};d.prototype._compileMedia=function(a){var b=this,c=this._graphic;a=q.clone(a);var e=a.mediaInfos,f=c.attributes,d=t.getSourceLayer(c),k=this.formattedAttributes.global,g=r({},k,f);a.mediaInfos=e&&e.map(function(a){if(a=q.clone(a)){var c=a.title?b._processFieldsInLinks(a.title,g):"",e=a.caption?b._processFieldsInLinks(a.caption,g):"";a.title=c?b._substituteAttributes(k,
c):"";a.caption=e?b._substituteAttributes(k,e):"";if("image"===a.type)return c=a.value,b._setImageValue({value:c,formattedAttributes:k,layer:d}),a.value.sourceURL?a:void 0;if("pie-chart"===a.type||"line-chart"===a.type||"column-chart"===a.type||"bar-chart"===a.type)return c=a.value,b._setChartValue({value:c,chartType:a.type,attributes:f,formattedAttributes:k,layer:d}),a}}).filter(Boolean);return a};d.prototype._normalizeTemplateFields=function(a){var b=this._fieldInfoMap.get(a.toLowerCase());return"{"+
(b&&b.fieldName||a)+"}"};d.prototype._substituteAttributes=function(a,b){var c=this;return(""+this._removeEmptyHref(u.substitute(O.replace(b,function(a){return c._normalizeTemplateFields(a)}),a))).trim()};d.prototype._compileText=function(a){if((a=q.clone(a))&&a.text){var b=this.formattedAttributes.global,c=this._processFieldsInLinks(a.text,r({},b,this._graphic.attributes));a.text=this._substituteAttributes(b,c)}return a};d.prototype._formatEditInfo=function(a,b){var c=a.creatorField,e=a.creationDateField,
f=a.editorField;if(b){a=b[a.editDateField];if("number"===typeof a)return b=b[f],c=u.formatDate(a,D),{type:"edit",date:c,user:b};e=b[e];if("number"===typeof e)return b=b[c],c=u.formatDate(e,D),{type:"create",date:c,user:b}}};d.prototype._compileLastEditInfo=function(){var a=this._effectivePopupTemplate,b=this._graphic;if(a){var a=a.lastEditInfoEnabled,c=b.get("sourceLayer.editFieldsInfo");if(a&&c)return this._formatEditInfo(c,b.attributes)}};d.prototype._compileTitle=function(){var a=this._effectivePopupTemplate,
b=this._graphic,c=a&&a.title,e=b.attributes,a=this.formattedAttributes.global,b="function"===typeof c?c.call(null,{graphic:b}):c;return"string"===typeof b&&b?(b=this._processFieldsInLinks(b,r({},a,e)),this._substituteAttributes(a,b)):""};d.prototype._getExpressionInfo=function(a,b){if(this._isExpressionField(b)){var c=b.replace(H,"").toLowerCase(),e;a.some(function(a){return a.name.toLowerCase()===c?(e=a,!0):!1});return e}};d.prototype._fixTokens=function(a,b){return a.replace(/(\{([^\{\r\n]+)\})/g,
function(a,e,f){return(a=B(b,f))?"{"+a.name+"}":e})};d.prototype._encodeAttributes=function(a){var b=a?q.clone(a):{};Object.keys(b).forEach(function(a){var c=b[a];"string"===typeof c&&(c=encodeURIComponent(c).replace(/\'/g,"\x26apos;"),b[a]=c)});return b};d.prototype._createfieldInfoMap=function(a,b){var c=this,e=new Map;a&&a.forEach(function(a){var f=c._getFixedFieldName(a.fieldName,b);a.fieldName=f;e.set(f.toLowerCase(),a)});return e};d.prototype._formatAttributeValue=function(a){var b=a.value,
c=a.fieldName,e=a.fieldInfos,f=a.fieldInfoMap;a=a.layer;if(null==b)return b;var d=this._getDomainName(c,b);return d||(d=this._getTypeName(c))?d:f.get(c.toLowerCase())?this._formatValueToFieldInfo(b,{fieldInfos:e,fieldName:c,layer:a}):(e=a&&a.fieldsIndex)&&e.isDateField(c)?u.formatDate(b,D):z(b)};d.prototype._formatAttributes=function(a){var b=this,c=this._graphic,e=t.getSourceLayer(c),f=q.clone(c.attributes);this.addRelatedFeatureAttributes(f);var d=this._createfieldInfoMap(a,e);this._fieldInfoMap=
d;Object.keys(f).forEach(function(c){f[c]=b._formatAttributeValue({fieldName:c,fieldInfos:a,fieldInfoMap:d,layer:e,value:f[c]})});return f};d.prototype._formatValueToFieldInfo=function(a,b){var c=b.fieldName,e=this._getFieldInfo(b.fieldInfos,c),f=q.clone(e),e=b.preventPlacesFormatting;(b=B(b.layer,c))&&"date"===b.type&&(b=f.format||new V,b.dateFormat=b.dateFormat||"short-date-short-time",f.format=b);f=f&&f.format;return"string"===typeof a||null==a||null==f?a:e?E.formatNumber(a,r({},E.convertNumberFormatToIntlOptions(f),
{minimumFractionDigits:0,maximumFractionDigits:20})):f.format(a)};d.prototype._getDomainName=function(a,b){if(this.isRelatedField(a))return null;var c=this._graphic,e=t.getSourceLayer(c);return e&&"function"===typeof e.getFieldDomain?(a=e.getFieldDomain(a,{feature:c}))&&"coded-value"===a.type?a.getName(b):null:null};d.prototype._getFieldInfo=function(a,b){if(a&&a.length&&b){var c=b.toLowerCase(),e=void 0;a.some(function(a){return a.fieldName&&a.fieldName.toLowerCase()===c?(e=a,!0):!1});return e}};
d.prototype._getTypeName=function(a){if(this.isRelatedField(a))return null;var b=this._graphic,c=t.getSourceLayer(b);if(!c||"function"!==typeof c.getFeatureType)return null;var e=c.typeIdField;return e&&a===e?(a=c.getFeatureType(b))?a.name:null:null};d.prototype._removeEmptyHref=function(a){return a.replace(/href=(""|'')/gi,"")};d.prototype._processFieldsInLinks=function(a,b){var c=this.get("_graphic.layer");a=this._fixTokens(a,c);var e=this._encodeAttributes(b),c=/href\s*=\s*(?:\"([^\"]+)\"|\'([^\']+)\')/gi;
return a?a.replace(c,function(a,c,d){c=(""+(c||d)).trim();return u.substitute(a,c&&"{"===c[0]?b:e)}):a};d.prototype._compileAttachments=function(a,b){a=q.clone(a);if(!b||b&&0===b.length)return a;a.attachmentInfos=b;return a};d.prototype._queryAttachments=function(){var a=this._graphic,b=t.getSourceLayer(a);if(!b)return g.resolve([]);if((b="scene"===b.type&&b.associatedLayer?b.associatedLayer:b)&&"function"===typeof b.queryAttachments){var c=b.objectIdField,e=(a=a.attributes)&&a[c],a=new W({objectIds:[e],
returnMetadata:!0});return b.queryAttachments(a).then(function(a){return a[e]||[]})}return g.resolve([])};d.prototype._queryContentElements=function(a){var b=this;if(!Array.isArray(a))return g.resolve();var c={};a.forEach(function(a,f){"attachments"===a.type&&(a=b._queryAttachments())&&(c[f]=a)});return Object.keys(c).length?g.eachAlways(c):g.resolve()};d.prototype._getContent=function(){var a=this._effectivePopupTemplate,b=this._graphic,a=a&&a.content,b="function"===typeof a?a.call(null,{graphic:b}):
a;return g.isPromiseLike(b)?b:g.resolve(b)};d.prototype._querySourceLayer=function(a,b){var c=a.layer,e=a.outFields;a=a.objectIds;if("function"!==typeof c.queryFeatures||!a)return b=new L("query-required-fields","Could not query required fields for the specified layer. Some fields will not be available.",{outFields:e,objectIds:a}),A.warn("query-required-fields","Could not query required fields for the specified layer. Some fields will not be available."),g.reject(b);var f=c.createQuery();f.objectIds=
a;f.outFields=e;f.returnGeometry=!0;return c.queryFeatures(f,b).then(function(a){return a.features[0]})};d.prototype._queryRequiredFieldsFeature=function(a){var b=this,c=this._graphic,e=this._effectivePopupTemplate,f=c.sourceLayer;return f&&e?("function"===typeof f.load?f.load(a):g.resolve()).then(function(){var d=c.attributes[f.objectIdField],k="number"===typeof d?[d]:void 0;return e.getRequiredFields(f.fields).then(function(e){return S.featureHasFields(e,c)?null:b._querySourceLayer({layer:f,outFields:e,
objectIds:k},a)})}):g.resolve(null)};d.prototype._queryFeature=function(a){var b=this,c=this._featureAbortController,e=this._graphic;this._effectivePopupTemplate=e&&e.getEffectivePopupTemplate(this.defaultPopupTemplateEnabled);return this._getContent().then(function(f){if(c===b._featureAbortController&&e){var d=b._checkForRelatedFeatures(f,a),k=b._createFormattedExpressions().then(function(a){e.attributes=r({},e.attributes,a)}),w=b._queryContentElements(f).then(function(a){return b._contentResponse=
a}),m=b._queryRequiredFieldsFeature(a).then(function(a){a&&(e.geometry=a.geometry,e.attributes=r({},e.attributes,a.attributes))});return g.eachAlways([d,k,w,m]).then(function(){if(c===b._featureAbortController&&e){b._set("formattedAttributes",b._createFormattedAttributes(f));b._set("title",b._compileTitle());var a=b._compileLastEditInfo();b._set("lastEditInfo",a||null);a=b._compileContent(f,b._contentResponse);b._set("content",a||null);return a}})}})};d.prototype._isExpressionField=function(a){return H.test(a)};
d.prototype._formatArcadeArray=function(a){return'\x3cul class\x3d"esri-widget__list"\x3e'+a.map(function(a){return"\x3cli\x3e"+("string"===typeof a?z(C(a)):a)+"\x3c/li\x3e"}).join("")+"\x3c/ul\x3e"};d.prototype._formatArcadeDictionary=function(a){return'\x3ctable class\x3d"esri-widget__table"\x3e'+a.keys().map(function(b){var c=a.field(b),c="string"===typeof c?z(C(c)):c;return"\x3ctr\x3e\x3cth\x3e"+b+"\x3c/th\x3e\x3ctd\x3e"+c+"\x3c/td\x3e\x3c/tr\x3e"}).join("")+"\x3c/table\x3e"};d.prototype._createFormattedExpressions=
function(){return y(this,void 0,void 0,function(){var a,b,c,e,f,d,k,w,m,h,n,l=this;return x(this,function(v){switch(v.label){case 0:return a=this,b=a._effectivePopupTemplate,c=a._graphic,e=b&&b.expressionInfos,f=[],d={},e&&e.length?[4,Y()]:[2,d];case 1:k=v.sent();w=function(a){var b="expression/"+a.name,e=k.createSyntaxTree(a.expression),g=Z.filter(function(a){return k.hasVariable(e,a)});a=k.loadScriptDependencies(e,!0,g).then(function(){return y(l,void 0,void 0,function(){var a,f,h,v,m=this;return x(this,
function(w){a=this.spatialReference;f=k.getViewInfo({spatialReference:a});h=k.createExecContext(c,f);h.useAsync=!0;this._addVarsToContext(k,g,h,f);v=k.createFunction(e,h);return[2,k.executeAsyncFunction(v,h).then(function(a){d[b]="string"===typeof a?z(C(a)):Array.isArray(a)?m._formatArcadeArray(a):a&&"esri.arcade.Dictionary"===a.declaredClass?m._formatArcadeDictionary(a):a},function(a){return A.error("arcade-execution-error",a)})]})})});f.push(a)};m=0;for(h=e;m<h.length;m++)n=h[m],w(n);return[2,g.eachAlways(f).then(function(){return d})]}})})};
d.prototype._addVarsToContext=function(a,b,c,e){var f=this.graphic,d=this.map;b.forEach(function(b){b=b.toLowerCase();var g={map:d,spatialReference:e.sr};"$map"===b&&(c.vars[b]=a.convertMapToFeatureSetCollection(g));"$layer"===b&&(c.vars[b]=a.convertFeatureLayerToFeatureSet(f.sourceLayer,e.sr));"$datastore"===b&&(c.vars[b]=a.convertServiceUrlToWorkspace(f.sourceLayer.url,e.sr))})};d.prototype._createFormattedAttributes=function(a){var b=this,c=this._effectivePopupTemplate,e={global:this._formatAttributes(c&&
c.fieldInfos),content:[]};Array.isArray(a)&&a.forEach(function(a,c){"fields"===a.type&&a.fieldInfos&&(e.content[c]=b._formatAttributes(a.fieldInfos))});return e};d.prototype._getAllFieldInfos=function(a){var b=this._effectivePopupTemplate,c=[];(b=b&&b.fieldInfos)&&c.push.apply(c,b);if(!a||!Array.isArray(a))return c;a.forEach(function(a){"fields"===a.type&&c.push.apply(c,a&&a.fieldInfos)});return c};d.prototype._checkForRelatedFeatures=function(a,b){var c=this._graphic;a=this._getAllFieldInfos(a);
return this.queryRelatedInfos(c,a,b)};d.prototype._getTooltip=function(a){var b=a.label;return"pie-chart"===a.chartType?b:b+":\n"+a.value};d.prototype._getChartOption=function(a){var b=a.value,c=a.attributes,e=a.formattedAttributes,d=a.fieldName,g=a.relatedFieldName,k=a.fieldInfos,l=a.chartType,m=a.index;a=t.getSourceLayer(this._graphic);var h=b.normalizeField,b=b.tooltipField,h=h?this.isRelatedField(h)?c[this.getRelatedFieldInfo(h).fieldName]:c[h]:null,n=g&&void 0!==c[g]?c[g]:void 0!==c[d]?c[d]:
e[d],n=void 0===n?null:n&&h?n/h:n,m=new U({x:m,y:n});if(this.isRelatedField(d))return e=this.getRelatedFieldInfo(d),d=(d=this.getRelatedFieldInfo(b))?d.fieldName:null,k=this._formatValueToFieldInfo(n,{fieldInfos:k,fieldName:g,layer:a,preventPlacesFormatting:!!h}),g=e?e.label||e.fieldName:g,m.tooltip=this._getTooltip({label:d&&void 0!==c[d]?c[d]:g,chartType:l,value:k}),m;c=this._getFieldInfo(k,d);g=this._getFixedFieldName(d,a);c=c?c.label||c.fieldName:d;m.tooltip=this._getTooltip({label:b&&void 0!==
e[b]?e[b]:c,chartType:l,value:e[g]});return m};d.prototype._getFixedFieldName=function(a,b){return(b=B(b,a))?b.name:a};d.prototype._getFixedFieldNames=function(a,b){var c=this;return a&&a.map(function(a){return c._getFixedFieldName(a,b)})};d.prototype._setChartValue=function(a){var b=this,c=a.value,d=a.attributes,f=a.formattedAttributes,g=a.chartType;a=a.layer;var k=this._effectivePopupTemplate,l=this.relatedInfoCount,m=c.fields,h=c.normalizeField;c.fields=this._getFixedFieldNames(m,a);h&&(c.normalizeField=
this._getFixedFieldName(h,a));if(m.some(function(a){return!!(null!=f[a]||b.isRelatedField(a)&&l)})){var n=k&&k.fieldInfos;m.forEach(function(a,e){b.isRelatedField(a)?c.series=c.series.concat(b._getRelatedChartInfos({fieldInfos:n,fieldName:a,formattedAttributes:f,chartType:g,value:c})):(a=b._getChartOption({value:c,index:e,attributes:d,chartType:g,formattedAttributes:f,fieldName:a,fieldInfos:n}),c.series.push(a))})}};d.prototype._getRelatedChartInfos=function(a){var b=this,c=a.fieldInfos,d=a.fieldName,
f=a.formattedAttributes,g=a.chartType,k=a.value,l=[];a=this.getRelatedFieldInfo(d);var m=a.fieldName,h=this.getRelatedInfo(a.layerId);if(!h)return l;a=h.relatedFeatures;h=h.relation;if(!h||!a)return l;h=h.cardinality;a.forEach(function(a,e){var h=a.attributes;h&&Object.keys(h).forEach(function(a){a===m&&l.push(b._getChartOption({value:k,index:e,attributes:h,formattedAttributes:f,fieldName:d,chartType:g,relatedFieldName:a,fieldInfos:c}))})});return"one-to-many"===h||"many-to-many"===h?l:[l[0]]};p([l.property()],
d.prototype,"_featureAbortController",void 0);p([l.property({readOnly:!0})],d.prototype,"content",void 0);p([l.property({type:Boolean})],d.prototype,"defaultPopupTemplateEnabled",void 0);p([l.property({readOnly:!0})],d.prototype,"formattedAttributes",void 0);p([l.property({type:K})],d.prototype,"graphic",void 0);p([l.property({readOnly:!0})],d.prototype,"lastEditInfo",void 0);p([l.property({dependsOn:["view"]})],d.prototype,"spatialReference",null);p([l.property({readOnly:!0})],d.prototype,"title",
void 0);p([l.property({dependsOn:["view"]})],d.prototype,"map",null);p([l.property({readOnly:!0,dependsOn:["_featureAbortController"]})],d.prototype,"waitingForContent",null);p([l.property()],d.prototype,"view",void 0);return d=p([l.subclass("esri.widgets.FeatureViewModel")],d)}(l.declared(X))});