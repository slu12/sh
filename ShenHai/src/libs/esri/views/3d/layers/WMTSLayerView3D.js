// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/generatorHelper ../../../core/tsSupport/awaiterHelper ../../../core/Error ../../../core/Logger ../../../core/watchUtils ../../../core/accessorSupport/decorators ./LayerView3D ./TiledLayerView3D ../../layers/LayerView ../../layers/RefreshableLayerView".split(" "),function(w,x,k,e,l,m,n,p,q,c,r,t,u,v){var h=p.getLogger("esri.views.3d.layers.WMTSLayerView3d");return function(f){function a(){return null!==
f&&f.apply(this,arguments)||this}k(a,f);a.prototype.initialize=function(){var b=this,a=q.whenTrueOnce(this.view,"basemapTerrain.tilingSchemeDone").then(function(){var a=function(){return new n("layerview:no-compatible-tiling-scheme","None of the tiling schemes supported by the service are compatible with the scene.")};if(!b.view.basemapTerrain.tilingSchemeLocked)throw a();var g=b.view.basemapTerrain.tilingScheme,c=b.layer.activeLayer,d;if(c&&c.tileMatrixSet){if(d=c.tileMatrixSet,a=d.tileInfo,g=b._getTileInfoSupportError(a,
d.fullExtent)||b._getTileInfoCompatibilityError(a,g))throw g;}else{d=b._getCompatibleTileMatrixSet();if(!d)throw a();c.tileMatrixSetId=d.id}b._set("tileInfo",d.tileInfo);b._set("fullExtent",d.fullExtent);b.layer.fullExtent=d.fullExtent});this.addResolvingPromise(a);this.when(function(){return b._initialized()})};a.prototype.refresh=function(){this.emit("data-changed")};a.prototype.canResume=function(){if(!this.inherited(arguments))return!1;var b=this.layer.activeLayer.tileMatrixSet;return b&&!this._getTileInfoError(b.tileInfo,
b.fullExtent)};a.prototype.doRefresh=function(){return m(this,void 0,void 0,function(){return l(this,function(b){if(this.suspended)return[2];this.emit("data-changed");return[2]})})};a.prototype._initialized=function(){var b=this;this.updatingHandles.add(this,"layer.activeLayer.styleId",function(){return b.refresh()});this.updatingHandles.add(this,"tileMatrixSet",function(){return b.refresh()});this.updatingHandles.add(this.layer,"activeLayer",function(a){var c=a.tileMatrixSet;if(c){if(a=b._getTileInfoError(c.tileInfo,
c.fullExtent))h.error("The selected tile matrix set is not compatible with the view",a),c=null}else(c=b._getCompatibleTileMatrixSet())?a.tileMatrixSetId=c.id:h.error("The layer does not provide a tiling scheme that is compatible with the view");b.notifyChange("suspended");b.canResume()&&b.refresh()})};a.prototype._getCompatibleTileMatrixSet=function(){var b=this;return this.layer.activeLayer.tileMatrixSets.find(function(a){return!b._getTileInfoError(a.tileInfo,a.fullExtent)})};a.prototype._getTileInfoError=
function(a,c){return this._getTileInfoSupportError(a,c)||this._getTileInfoCompatibilityError(a,this.view.basemapTerrain.tilingScheme)};e([c.property()],a.prototype,"fullExtent",void 0);e([c.property()],a.prototype,"layer",void 0);e([c.property({dependsOn:["layer.activeLayer"]})],a.prototype,"suspended",void 0);e([c.property()],a.prototype,"tileInfo",void 0);return a=e([c.subclass("esri.views.3d.layers.WMTSLayerView3D")],a)}(c.declared(v.RefreshableLayerView(t.TiledLayerView3D(r.LayerView3D(u)))))});