// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Error ../../../core/promiseUtils ../../../core/accessorSupport/decorators ../../../geometry/Extent ../../../layers/support/ExportWMSImageParameters ./DynamicLayerView3D ../../layers/WMSLayerView".split(" "),function(q,r,g,f,h,k,c,l,m,n,p){return function(d){function a(){return null!==d&&d.apply(this,arguments)||this}g(a,d);a.prototype.initialize=function(){var a=this;this.layer.supportsSpatialReference(this.view.spatialReference)||
this.addResolvingPromise(k.reject(new h("layerview:spatial-reference-incompatible","The spatial references supported by this WMS layer are incompatible with the spatial reference of the view")));this._exportWMSImageParameters=new m({layer:this.layer,view:this.view});this.updatingHandles.add(this._exportWMSImageParameters,"version",function(){a.updatingHandles.addPromise(a.refreshDebounced())})};a.prototype.destroy=function(){this._exportWMSImageParameters&&(this._exportWMSImageParameters.layer=null,
this._exportWMSImageParameters.destroy(),this._exportWMSImageParameters=null)};a.prototype.createFetchPopupFeaturesQuery=function(a){var e=this.findExtentInfoAt(a),b=e.extent,b=new l(b[0],b[1],b[2],b[3],e.spatialReference),e=e.imageSize,c=e.width,d=b.width/c;return{extent:b,width:c,height:e.height,x:Math.round((a.x-b.xmin)/d),y:Math.round((b.ymax-a.y)/d)}};f([c.property({dependsOn:["view.spatialReference","layer.spatialReferences"]})],a.prototype,"suspended",void 0);return a=f([c.subclass("esri.views.3d.layers.WMSLayerView3D")],
a)}(c.declared(p.WMSLayerView(n)))});