// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/tsSupport/assignHelper ../../core/lang ../../core/accessorSupport/decorators ../../tasks/Locator ./SearchSource ./support/locatorUtils".split(" "),function(p,q,m,d,g,h,b,k,n,l){return function(e){function a(){var c=null!==e&&e.apply(this,arguments)||this;c.categories=null;c.countryCode=null;c.defaultZoomScale=null;c.locator=null;c.locationType=null;c.name="";c.placeholder="";c.searchTemplate=
"";c.singleLineFieldName=null;c.suggestionsEnabled=null;c.zoomScale=null;c.getResults=function(a,b){return l.getResults(g({source:c},a),b)};c.getSuggestions=function(a,b){return l.getSuggestions(g({source:c},a),b)};return c}m(a,e);f=a;a.prototype.readLocator=function(a,b){return(a=b.url)?new k({url:a}):null};a.prototype.writeLocator=function(a,b){b.url=a?a.url:null};a.prototype.clone=function(){return new f({autoNavigate:this.autoNavigate,filter:this.filter,maxResults:this.maxResults,maxSuggestions:this.maxSuggestions,
minSuggestCharacters:this.minSuggestCharacters,outFields:this.outFields?h.clone(this.outFields):null,placeholder:this.placeholder,popupEnabled:this.popupEnabled,prefix:this.prefix,resultGraphicEnabled:this.resultGraphicEnabled,resultSymbol:this.resultSymbol?this.resultSymbol.clone():null,searchExtent:this.searchExtent?this.searchExtent.clone():null,suggestionsEnabled:this.suggestionsEnabled,suffix:this.suffix,withinViewEnabled:this.withinViewEnabled,categories:this.categories?h.clone(this.categories):
null,countryCode:this.countryCode,locationType:this.locationType,locator:this.locator,searchTemplate:this.searchTemplate,singleLineFieldName:this.singleLineFieldName,zoomScale:this.zoomScale})};var f;d([b.property()],a.prototype,"categories",void 0);d([b.property()],a.prototype,"countryCode",void 0);d([b.property({json:{write:!0}})],a.prototype,"defaultZoomScale",void 0);d([b.property({type:k})],a.prototype,"locator",void 0);d([b.reader("locator",["url"])],a.prototype,"readLocator",null);d([b.writer("locator")],
a.prototype,"writeLocator",null);d([b.property()],a.prototype,"locationType",void 0);d([b.property({json:{write:!0}})],a.prototype,"name",void 0);d([b.property({json:{write:!0}})],a.prototype,"placeholder",void 0);d([b.property()],a.prototype,"searchTemplate",void 0);d([b.property({json:{write:!0}})],a.prototype,"singleLineFieldName",void 0);d([b.property({json:{read:{source:"suggest"},write:{target:"suggest"}}})],a.prototype,"suggestionsEnabled",void 0);d([b.property({json:{write:!0}})],a.prototype,
"zoomScale",void 0);return a=f=d([b.subclass("esri.widgets.Search.LocatorSearchSource")],a)}(b.declared(n))});