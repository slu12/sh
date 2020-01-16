// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Error ../../core/HandleOwner ../../core/Logger ../../core/throttle ../../core/accessorSupport/decorators ./engine".split(" "),function(d,f,h,e,k,l,m,n,p,c,g){Object.defineProperty(f,"__esModule",{value:!0});var q=n.getLogger("esri.views.2d.layers.labels.LabelManager");d=function(d){function a(b){b=d.call(this,b)||this;b._applyVisibilityPassThrottled=p.throttle(b._applyVisibilityPass,
64,b);b.lastUpdateId=-1;b.updateRequested=!1;b.view=null;return b}h(a,d);a.prototype.initialize=function(){var b=this;this.collisionEngine=new g.CollisionEngine(this.view.featuresTilingScheme);this._layerViewSorter=new g.LayerViewSorter(function(a,c){b.collisionEngine.registerLayerView(a,c);(c=a.tileRenderer)&&c.forEachTile(function(c){c.isDirty=!0;b.addTile(a,c)});b.requestUpdate()},function(a){b.collisionEngine.unregisterLayerView(a);b.requestUpdate()});this.handles.add(this.view.allLayerViews.on("change",
function(a){b._layerViewSorter.update(a)}))};a.prototype.destroy=function(){this._layerViewSorter.destroy();this.collisionEngine=this._layerViewSorter=null;this._applyVisibilityPassThrottled.remove()};Object.defineProperty(a.prototype,"updating",{get:function(){return this.updateRequested},enumerable:!0,configurable:!0});a.prototype.update=function(b){this._applyVisibilityPassThrottled(b)};a.prototype.viewChange=function(){this.requestUpdate()};a.prototype.requestUpdate=function(){this.updateRequested||
(this.updateRequested=!0,this.view.requestUpdate(this))};a.prototype.processUpdate=function(b){this._set("updateParameters",b);this.updateRequested&&(this.update(b),this.updateRequested=!1)};a.prototype.addTile=function(b,a){this.collisionEngine.addTile(b,a)};a.prototype.removeTile=function(b,a){this.collisionEngine.removeTile(b,a)};a.prototype._applyVisibilityPass=function(a){try{var b=this.view.featuresTilingScheme.getClosestInfoForScale(a.state.scale).level;this.collisionEngine.run(a,b)}catch(r){q.error(new l("mapview-labeling",
"Encountered an error during label decluttering",r))}};e([c.property()],a.prototype,"updateRequested",void 0);e([c.property({readOnly:!0})],a.prototype,"updateParameters",void 0);e([c.property({dependsOn:["updateRequested"]})],a.prototype,"updating",null);e([c.property()],a.prototype,"view",void 0);return a=e([c.subclass("esri.views.2d.layers.labels.LabelManager")],a)}(c.declared(m.HandleOwnerMixin(k)));f.default=d});