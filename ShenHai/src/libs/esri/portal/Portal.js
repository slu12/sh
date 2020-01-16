// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/awaiterHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/generatorHelper ../core/tsSupport/paramHelper dojo/_base/kernel ../config ../kernel ../request ../core/Error ../core/JSONSupport ../core/lang ../core/Loadable ../core/maybe ../core/promiseUtils ../core/accessorSupport/decorators ../core/accessorSupport/ensureType ../geometry/Extent ./PortalQueryParams ./PortalQueryResult ./PortalUser @dojo/framework/shim/Promise".split(" "),
function(f,L,n,h,B,d,l,M,x,t,p,C,q,D,E,F,G,e,c,H,I,u,J,K){var r,z={PortalGroup:function(){return e.create(function(c){return f(["./PortalGroup"],c)})},PortalItem:function(){return e.create(function(c){return f(["./PortalItem"],c)})},PortalUser:function(){return e.create(function(c){return f(["./PortalUser"],c)})}};return function(y){function b(a){a=y.call(this,a)||this;a.access=null;a.allSSL=!1;a.authMode="auto";a.authorizedCrossOriginDomains=null;a.basemapGalleryGroupQuery=null;a.bingKey=null;a.canListApps=
!1;a.canListData=!1;a.canListPreProvisionedItems=!1;a.canProvisionDirectPurchase=!1;a.canSearchPublic=!0;a.canShareBingPublic=!1;a.canSharePublic=!1;a.canSignInArcGIS=!1;a.canSignInIDP=!1;a.colorSetsGroupQuery=null;a.commentsEnabled=!1;a.created=null;a.culture=null;a.customBaseUrl=null;a.defaultBasemap=null;a.defaultExtent=null;a.defaultVectorBasemap=null;a.description=null;a.eueiEnabled=!1;a.featuredGroups=null;a.featuredItemsGroupQuery=null;a.galleryTemplatesGroupQuery=null;a.livingAtlasGroupQuery=
null;a.hasCategorySchema=!1;a.helperServices=null;a.homePageFeaturedContent=null;a.homePageFeaturedContentCount=null;a.httpPort=null;a.httpsPort=null;a.id=null;a.ipCntryCode=null;a.isPortal=!1;a.isReadOnly=!1;a.layerTemplatesGroupQuery=null;a.maxTokenExpirationMinutes=null;a.modified=null;a.name=null;a.portalHostname=null;a.portalMode=null;a.portalProperties=null;a.region=null;a.rotatorPanels=null;a.showHomePageDescription=!1;a.sourceJSON=null;a.supportsHostedServices=!1;a.symbolSetsGroupQuery=null;
a.templatesGroupQuery=null;a.units=null;a.url=t.portalUrl;a.urlKey=null;a.user=null;a.useStandardizedQuery=!1;a.useVectorBasemaps=!1;a.vectorBasemapGalleryGroupQuery=null;return a}B(b,y);g=b;b.prototype.normalizeCtorArgs=function(a){return"string"===typeof a?{url:a}:a};b.prototype.destroy=function(){this._esriId_credentialCreateHandle&&(this._esriId_credentialCreateHandle.remove(),this._esriId_credentialCreateHandle=null)};b.prototype.readAuthorizedCrossOriginDomains=function(a){if(a)for(var b=0;b<
a.length;b++){var c=a[b];-1===t.request.trustedServers.indexOf(c)&&t.request.trustedServers.push(c)}return a};b.prototype.readDefaultBasemap=function(a){return a?(a=r.fromJSON(a),a.portalItem={portal:this},a):null};b.prototype.readDefaultVectorBasemap=function(a){return a?(a=r.fromJSON(a),a.portalItem={portal:this},a):null};Object.defineProperty(b.prototype,"extraQuery",{get:function(){var a=!(this.user&&this.user.orgId)||this.canSearchPublic;return this.id&&!a?" AND orgid:"+this.id:null},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"isOrganization",{get:function(){return!!this.access},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"restUrl",{get:function(){var a=this.url;if(a)var b=a.indexOf("/sharing"),a=0<b?a.substring(0,b):this.url.replace(/\/+$/,""),a=a+"/sharing/rest";return a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"thumbnailUrl",{get:function(){var a=this.restUrl,b=this.thumbnail;return a&&b?this._normalizeSSL(a+"/portals/self/resources/"+
b):null},enumerable:!0,configurable:!0});b.prototype.readUrlKey=function(a){return a?a.toLowerCase():a};b.prototype.readUser=function(a){var b=null;a&&(b=K.fromJSON(a),b.portal=this);return b};b.prototype.load=function(a){var b=this,c=e.create(function(a){return f(["../Basemap"],a)}).then(function(b){e.throwIfAborted(a);r=b}).then(function(){return b.sourceJSON?b.sourceJSON:b._fetchSelf(b.authMode,!1,a)}).then(function(a){if(p.id){var c=p.id;b.credential=c.findCredential(b.restUrl);b.credential||
b.authMode!==g.AUTH_MODE_AUTO||(b._esriId_credentialCreateHandle=c.on("credential-create",function(){c.findCredential(b.restUrl)&&b._signIn()}))}b.sourceJSON=a;b.read(a)});this.addResolvingPromise(c);return this.when()};b.prototype.createClosestFacilityTask=function(){return h(this,void 0,void 0,function(){var a,b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperServiceUrl("closestFacility"),[4,new Promise(function(a,b){f(["../tasks/ClosestFacilityTask"],
a,b)})];case 2:return b=c.sent(),[2,new b(a)]}})})};b.prototype.createElevationLayers=function(){return h(this,void 0,void 0,function(){var a,b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperService("defaultElevationLayers"),[4,new Promise(function(a,b){f(["../layers/ElevationLayer"],a,b)})];case 2:return b=c.sent(),[2,a?a.map(function(a){return new b({id:a.id,url:a.url})}):[]]}})})};b.prototype.createGeometryService=function(){return h(this,
void 0,void 0,function(){var a,b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperServiceUrl("geometry"),[4,new Promise(function(a,b){f(["../tasks/GeometryService"],a,b)})];case 2:return b=c.sent(),[2,new b(a)]}})})};b.prototype.createPrintTask=function(){return h(this,void 0,void 0,function(){var a,b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperServiceUrl("printTask"),[4,
new Promise(function(a,b){f(["../tasks/PrintTask"],a,b)})];case 2:return b=c.sent(),[2,new b(a)]}})})};b.prototype.createRouteTask=function(){return h(this,void 0,void 0,function(){var a,b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperServiceUrl("route"),[4,new Promise(function(a,b){f(["../tasks/RouteTask"],a,b)})];case 2:return b=c.sent(),[2,new b(a)]}})})};b.prototype.createServiceAreaTask=function(){return h(this,void 0,void 0,function(){var a,
b;return l(this,function(c){switch(c.label){case 0:return[4,this.load()];case 1:return c.sent(),a=this._getHelperServiceUrl("serviceArea"),[4,new Promise(function(a,b){f(["../tasks/ServiceAreaTask"],a,b)})];case 2:return b=c.sent(),[2,new b(a)]}})})};b.prototype.fetchBasemaps=function(a,b){var c=new u;c.query=a||(this.useVectorBasemaps?this.vectorBasemapGalleryGroupQuery:this.basemapGalleryGroupQuery);c.disableExtraQuery=!0;return this.queryGroups(c,b).then(function(a){c.num=100;c.query='type:"Web Map" -type:"Web Application"';
return a.total?(a=a.results[0],c.sortField=a.sortField||"name",c.sortOrder=a.sortOrder||"desc",a.queryItems(c,b)):null}).then(function(a){return a&&a.total?a.results.filter(function(a){return"Web Map"===a.type}).map(function(a){return new r({portalItem:a})}):[]})};b.prototype.fetchCategorySchema=function(a){return this.hasCategorySchema?this._request(this.restUrl+"/portals/self/categorySchema",a).then(function(a){return a.categorySchema}):e.isAborted(a)?e.reject(e.createAbortError()):e.resolve([])};
b.prototype.fetchFeaturedGroups=function(a){var b=this.featuredGroups,c=new u;c.num=100;c.sortField="title";if(b&&b.length){for(var d=[],w=0;w<b.length;w++){var m=b[w];d.push('(title:"'+m.title+'" AND owner:'+m.owner+")")}c.query=d.join(" OR ");return this.queryGroups(c,a).then(function(a){return a.results})}return e.isAborted(a)?e.reject(e.createAbortError()):e.resolve([])};b.prototype.fetchRegions=function(a){return this._request(this.restUrl+"/portals/regions",n({},a,{query:{culture:this.user&&
this.user.culture||this.culture||x.locale}}))};b.getDefault=function(){if(!g._default||g._default.destroyed)g._default=new g;return g._default};b.prototype.queryGroups=function(a,b){return this._queryPortal("/community/groups",a,"PortalGroup",b)};b.prototype.queryItems=function(a,b){return this._queryPortal("/search",a,"PortalItem",b)};b.prototype.queryUsers=function(a,b){a.sortField||(a.sortField="username");return this._queryPortal("/community/users",a,"PortalUser",b)};b.prototype.toJSON=function(){throw new q("internal:not-yet-implemented",
"Portal.toJSON is not yet implemented");};b.fromJSON=function(a){if(!a)return null;if(a.declaredClass)throw Error("JSON object is already hydrated");return new g({sourceJSON:a})};b.prototype._getHelperService=function(a){var b=this.helperServices&&this.helperServices[a];if(!b)throw new q("portal:service-not-found",'The `helperServices` do not include an entry named "'+a+'"');return b};b.prototype._getHelperServiceUrl=function(a){var b=this._getHelperService(a);if(!b.url)throw new q("portal:service-url-not-found",
'The `helperServices` entry "'+a+'" does not include a `url` value');return b.url};b.prototype._fetchSelf=function(a,b,c){void 0===a&&(a=this.authMode);void 0===b&&(b=!1);var d=this.restUrl+"/portals/self";a=n({authMode:a,query:{culture:x.locale}},c);"auto"===a.authMode&&(a.authMode="no-prompt");b&&(a.query.default=!0);return this._request(d,a)};b.prototype._queryPortal=function(a,b,c,d){var k=this,v=H.ensureType(u,b),A=function(b){return k._request(k.restUrl+a,n({},v.toRequestOptions(k),d)).then(function(a){var c=
v.clone();c.start=a.nextStart;return new J({nextQueryParams:c,queryParams:v,total:a.total,results:g._resultsToTypedArray(b,{portal:k},a,d)})}).then(function(a){return e.all(a.results.map(function(b){return"function"===typeof b.when?b.when():a})).then(function(){return a},function(b){e.throwIfAbortError(b);return a})})};return c&&z[c]?z[c]().then(function(a){e.throwIfAborted(d);return A(a)}):A()};b.prototype._signIn=function(){var a=this;if(this.authMode===g.AUTH_MODE_ANONYMOUS)return e.reject(new q("portal:invalid-auth-mode",
'Current "authMode"\' is "'+this.authMode+'"'));if("failed"===this.loadStatus)return e.reject(this.loadError);var b=function(b){return e.resolve().then(function(){if("not-loaded"===a.loadStatus)return b||(a.authMode="immediate"),a.load().then(function(){return null});if("loading"===a.loadStatus)return a.load().then(function(){if(a.credential)return null;a.credential=b;return a._fetchSelf("immediate")});if(a.user&&a.credential===b)return null;a.credential=b;return a._fetchSelf("immediate")}).then(function(b){b&&
(a.sourceJSON=b,a.read(b))})};return p.id?p.id.getCredential(this.restUrl).then(function(a){return b(a)}):b(this.credential)};b.prototype._normalizeSSL=function(a){return a.replace(/^http:/i,"https:").replace(":7080",":7443")};b.prototype._normalizeUrl=function(a){var b=this.credential&&this.credential.token;return this._normalizeSSL(b?a+(-1<a.indexOf("?")?"\x26":"?")+"token\x3d"+b:a)};b.prototype._requestToTypedArray=function(a,b,c){var d=this,k=function(c){return d._request(a,b).then(function(a){var b=
g._resultsToTypedArray(c,{portal:d},a);return e.all(b.map(function(b){return"function"===typeof b.when?b.when():a})).then(function(){return b},function(){return b})})};return c?e.create(function(a){return f(["./"+c],a)}).then(function(a){return k(a)}):k()};b.prototype._request=function(a,b){void 0===b&&(b={});var c=n({f:"json"},b.query),d=b.authMode,e=b.body,m=b.cacheBust,f=b.method,h=b.responseType;b={authMode:void 0===d?this.authMode===g.AUTH_MODE_ANONYMOUS?"anonymous":"auto":d,body:void 0===e?
null:e,cacheBust:void 0===m?!1:m,method:void 0===f?"auto":f,query:c,responseType:void 0===h?"json":h,timeout:0,signal:b.signal};return C(this._normalizeSSL(a),b).then(function(a){return a.data})};b._resultsToTypedArray=function(a,b,c,d){if(c){var e=G.isSome(d)?d.signal:null;c=c.listings||c.notifications||c.userInvitations||c.tags||c.items||c.groups||c.comments||c.provisions||c.results||c.relatedItems||c;if(a||b)c=c.map(function(c){c=E.mixin(a?a.fromJSON(c):c,b);"function"===typeof c.load&&c.load(e);
return c})}else c=[];return c};var g;b.AUTH_MODE_ANONYMOUS="anonymous";b.AUTH_MODE_AUTO="auto";b.AUTH_MODE_IMMEDIATE="immediate";d([c.property()],b.prototype,"access",void 0);d([c.property()],b.prototype,"allSSL",void 0);d([c.property()],b.prototype,"authMode",void 0);d([c.property()],b.prototype,"authorizedCrossOriginDomains",void 0);d([c.reader("authorizedCrossOriginDomains")],b.prototype,"readAuthorizedCrossOriginDomains",null);d([c.property()],b.prototype,"basemapGalleryGroupQuery",void 0);d([c.property()],
b.prototype,"bingKey",void 0);d([c.property()],b.prototype,"canListApps",void 0);d([c.property()],b.prototype,"canListData",void 0);d([c.property()],b.prototype,"canListPreProvisionedItems",void 0);d([c.property()],b.prototype,"canProvisionDirectPurchase",void 0);d([c.property()],b.prototype,"canSearchPublic",void 0);d([c.property()],b.prototype,"canShareBingPublic",void 0);d([c.property()],b.prototype,"canSharePublic",void 0);d([c.property()],b.prototype,"canSignInArcGIS",void 0);d([c.property()],
b.prototype,"canSignInIDP",void 0);d([c.property()],b.prototype,"colorSetsGroupQuery",void 0);d([c.property()],b.prototype,"commentsEnabled",void 0);d([c.property({type:Date})],b.prototype,"created",void 0);d([c.property()],b.prototype,"credential",void 0);d([c.property()],b.prototype,"culture",void 0);d([c.property()],b.prototype,"currentVersion",void 0);d([c.property()],b.prototype,"customBaseUrl",void 0);d([c.property()],b.prototype,"defaultBasemap",void 0);d([c.reader("defaultBasemap")],b.prototype,
"readDefaultBasemap",null);d([c.property({type:I})],b.prototype,"defaultExtent",void 0);d([c.property()],b.prototype,"defaultVectorBasemap",void 0);d([c.reader("defaultVectorBasemap")],b.prototype,"readDefaultVectorBasemap",null);d([c.property()],b.prototype,"description",void 0);d([c.property()],b.prototype,"eueiEnabled",void 0);d([c.property({dependsOn:["user","id","canSearchPublic"],readOnly:!0})],b.prototype,"extraQuery",null);d([c.property()],b.prototype,"featuredGroups",void 0);d([c.property()],
b.prototype,"featuredItemsGroupQuery",void 0);d([c.property()],b.prototype,"galleryTemplatesGroupQuery",void 0);d([c.property()],b.prototype,"livingAtlasGroupQuery",void 0);d([c.property()],b.prototype,"hasCategorySchema",void 0);d([c.property()],b.prototype,"helpBase",void 0);d([c.property()],b.prototype,"helperServices",void 0);d([c.property()],b.prototype,"helpMap",void 0);d([c.property()],b.prototype,"homePageFeaturedContent",void 0);d([c.property()],b.prototype,"homePageFeaturedContentCount",
void 0);d([c.property()],b.prototype,"httpPort",void 0);d([c.property()],b.prototype,"httpsPort",void 0);d([c.property()],b.prototype,"id",void 0);d([c.property()],b.prototype,"ipCntryCode",void 0);d([c.property({dependsOn:["access"],readOnly:!0})],b.prototype,"isOrganization",null);d([c.property()],b.prototype,"isPortal",void 0);d([c.property()],b.prototype,"isReadOnly",void 0);d([c.property()],b.prototype,"layerTemplatesGroupQuery",void 0);d([c.property()],b.prototype,"maxTokenExpirationMinutes",
void 0);d([c.property({type:Date})],b.prototype,"modified",void 0);d([c.property()],b.prototype,"name",void 0);d([c.property()],b.prototype,"portalHostname",void 0);d([c.property()],b.prototype,"portalMode",void 0);d([c.property()],b.prototype,"portalProperties",void 0);d([c.property()],b.prototype,"region",void 0);d([c.property({dependsOn:["url"],readOnly:!0})],b.prototype,"restUrl",null);d([c.property()],b.prototype,"rotatorPanels",void 0);d([c.property()],b.prototype,"showHomePageDescription",
void 0);d([c.property()],b.prototype,"sourceJSON",void 0);d([c.property()],b.prototype,"staticImagesUrl",void 0);d([c.property()],b.prototype,"stylesGroupQuery",void 0);d([c.property()],b.prototype,"supportsHostedServices",void 0);d([c.property()],b.prototype,"symbolSetsGroupQuery",void 0);d([c.property()],b.prototype,"templatesGroupQuery",void 0);d([c.property()],b.prototype,"thumbnail",void 0);d([c.property({dependsOn:["restUrl","thumbnail"],readOnly:!0})],b.prototype,"thumbnailUrl",null);d([c.property()],
b.prototype,"units",void 0);d([c.property()],b.prototype,"url",void 0);d([c.property()],b.prototype,"urlKey",void 0);d([c.reader("urlKey")],b.prototype,"readUrlKey",null);d([c.property()],b.prototype,"user",void 0);d([c.reader("user")],b.prototype,"readUser",null);d([c.property()],b.prototype,"useStandardizedQuery",void 0);d([c.property()],b.prototype,"useVectorBasemaps",void 0);d([c.property()],b.prototype,"vectorBasemapGalleryGroupQuery",void 0);return b=g=d([c.subclass("esri.portal.Portal")],b)}(c.declared(D.JSONSupportMixin(F)))});