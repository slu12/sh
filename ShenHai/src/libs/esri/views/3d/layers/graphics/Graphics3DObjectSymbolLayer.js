// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../core/tsSupport/assignHelper ../../../../Color ../../../../core/lang ../../../../core/maybe ../../../../core/screenUtils ../../../../core/libs/gl-matrix-2/mat4 ../../../../core/libs/gl-matrix-2/mat4f64 ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../../../core/libs/gl-matrix-2/vec4f64 ../../../../geometry/support/aaBoundingBox ../../../../symbols/support/ObjectSymbol3DLayerResource ./ElevationAligners ./Graphics3DLodInstanceGraphicLayer ./Graphics3DSymbolCommonCode ./Graphics3DSymbolLayer ./graphicUtils ./lodResourceUtils ./objectResourceUtils ./primitiveObjectSymbolUtils ./symbolComplexity ../support/FastSymbolUpdates ../../support/projectionUtils ../../webgl-engine/lib/Util ../../webgl-engine/lib/lodRendering/LodRenderer ../../webgl-engine/lib/lodRendering/LodResources ../../webgl-engine/materials/DefaultMaterial ../../webgl-engine/materials/internal/MaterialUtil".split(" "),
function(B,C,S,H,I,T,D,J,m,K,v,L,g,h,p,q,U,V,W,k,X,u,M,Y,E,Z,x,N,aa,ba,y,ca,da){Object.defineProperty(C,"__esModule",{value:!0});B=function(w){function c(b,a,d,e){b=w.call(this,b,a,d,e)||this;b._optionalFields=[];b._instanceIndexToGraphicUid=new Map;return b}S(c,w);c.prototype.getCachedSize=function(){var b=this._symbolSize;return{width:b[0],depth:b[1],height:b[2]}};c.prototype.doLoad=function(b){return I(this,void 0,void 0,function(){var a,d,e,f;return H(this,function(c){switch(c.label){case 0:a=
this._getIdHint("_objectmat");if(!this._drivenProperties.size&&(d=u.validateSymbolLayerSize(this.symbolLayer)))throw Error();e=this.symbolLayer;return this.isByResource?[4,this._prepareModelResources(e.resource.href,b)]:[3,2];case 1:return c.sent(),[3,3];case 2:f=e.resource?e.resource.primitive:U.defaultPrimitive,this._preparePrimitiveResources(f,a),c.label=3;case 3:return[2]}})})};Object.defineProperty(c.prototype,"isByResource",{get:function(){return!(!this.symbolLayer.resource||!this.symbolLayer.resource.href)},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"lodRenderer",{get:function(){return this._lodRenderer},enumerable:!0,configurable:!0});c.prototype.setMaterialTransparencyParams=function(b,a){void 0===a&&(a=m.get(this.symbolLayer,"material","color"));a=this._getCombinedOpacity(a);b.transparent=1>a||this.needsDrivenTransparentPass;b.opacity=a;return b};c.prototype._preparePrimitiveResources=function(b,a){if(!E.isValidPrimitive(b))throw Error("Unknown object symbol primitive: "+b);
var d=this.symbolLayer;this._resourceBoundingBox=q.create(E.primitiveBoundingBox(b));this._resourceSize=h.vec3f64.fromArray(q.size(this._resourceBoundingBox));this._symbolSize=h.vec3f64.fromArray(u.computeSizeWithResourceSize(this._resourceSize,d));this._isWosr=this._isEsriSymbolResource=!1;var e=T({},da.getDefaultPBRMaterialParameters(this._context.physicalBasedRenderingEnabled),{specular:[0,0,0],instanced:["transformation"],ambient:h.vec3f64.ONES,diffuse:h.vec3f64.ONES,slicePlaneEnabled:this._context.slicePlaneEnabled,
sliceHighlightDisabled:!0,castShadows:this.symbolLayer.castShadows,offsetTransparentBackfaces:this.symbolLayer.isPrimitive});this.setMaterialTransparencyParams(e);var f=this.symbol;if("point-3d"===f.type&&f.verticalOffset){var f=f.verticalOffset,c=f.minWorldLength,l=f.maxWorldLength;e.verticalOffset={screenLength:K.pt2px(f.screenLength),minWorldLength:c||0,maxWorldLength:null!=l?l:Infinity};e.castShadows=!1}this._context.screenSizePerspectiveEnabled&&(e.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings);
this._drivenProperties.color?e.externalColor=p.vec4f64.ONES:(d=m.isSome(d.material)&&d.material.color,d=m.isSome(d)?D.toUnitRGBA(d):p.vec4f64.ONES,e.externalColor=d);this._fastUpdates=x.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions());this._fastUpdates.enabled?(J.mixin(e,this._fastUpdates.materialParameters),e.instanced.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(e.instanced.push("color"),this._optionalFields.push("color"));
e=new ca(e,a);this._lodResources=E.primitiveLodResources(b,e,a);this._originalOpacities=y.materialsFromLodResources(this._lodResources).map(function(){return 1});if(!this._lodResources)throw Error("Unknown object symbol primitive: "+b);this._finalizeSymbolResources();this._initializeLodRenderer();this.complexity=this.computeComplexity()};c.prototype._prepareModelResources=function(b,a){return I(this,void 0,void 0,function(){var d,e,f,c,l,g,P,n,k,z,F,Q,p,t,v,w,r,A=this;return H(this,function(O){switch(O.label){case 0:return d=
["transformation"],e={instanced:d,slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},f={materialParamsMixin:e,streamDataRequester:this._context.streamDataRequester},this._fastUpdates=x.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(J.mixin(f.materialParamsMixin,this._fastUpdates.materialParameters),d.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&
(d.push("color"),this._optionalFields.push("color")),c=this.symbol,"point-3d"===c.type&&c.verticalOffset&&(l=c.verticalOffset,g=l.screenLength,P=l.minWorldLength,n=l.maxWorldLength,f.materialParamsMixin.verticalOffset={screenLength:K.pt2px(g),minWorldLength:P||0,maxWorldLength:null!=n?n:Infinity},f.materialParamsMixin.castShadows=!1),f.signal=a,f.usePBR=this._context.physicalBasedRenderingEnabled,[4,Y.fetch(b,f)];case 1:return k=O.sent(),this._isEsriSymbolResource=k.isEsriSymbolResource,this._isWosr=
k.isWosr,z=M.makeLodResources(k.lods),M.fillEstimatedMinScreenSpaceRadius(z),z.levels.sort(function(a,b){return a.minScreenSpaceRadius-b.minScreenSpaceRadius}),z.levels[0].minScreenSpaceRadius=Math.min(2,z.levels[0].minScreenSpaceRadius),this._lodResources=z,F=this._context,Q=this.symbolLayer.material,p=this._getExternalColorParameters(Q),t=m.get(this.symbolLayer,"material","color"),v=this._getCombinedOpacity(t,{hasIntrinsicColor:!0}),w=this.needsDrivenTransparentPass,r=y.materialsFromLodResources(this._lodResources),
this._originalOpacities=r.map(function(a){return a.getParameters().opacity||1}),r.forEach(function(a){var b=a.getParameters();a.setParameterValues(p);var d=b.opacity*v;a.setParameterValues({opacity:d,transparent:1>d||w||b.transparent});F.screenSizePerspectiveEnabled&&a.setParameterValues({screenSizePerspective:F.sharedResources.screenSizePerspectiveSettings})}),this._resourceBoundingBox=k.referenceBoundingBox,this._resourceSize=h.vec3f64.fromArray(q.size(this._resourceBoundingBox)),this._pivotOffset=
h.vec3f64.fromArray(this._lodResources.levels[0].pivotOffset),this._symbolSize=h.vec3f64.fromArray(u.computeSizeWithResourceSize(this._resourceSize,this.symbolLayer)),x.updateFastSymbolUpdatesState(this._fastUpdates,this._context.renderer,this._fastVisualVariableConvertOptions())&&r.forEach(function(a){return a.setParameterValues(A._fastUpdates.materialParameters)}),this._finalizeSymbolResources(),this._initializeLodRenderer(),this.complexity=this.computeComplexity(),[2]}})})};c.prototype._finalizeSymbolResources=
function(){var b=this._context.stage;this._materials=y.materialsFromLodResources(this._lodResources);this._materials.forEach(function(a){b.add(3,a)});this._textures=y.texturesFromLodResources(this._lodResources);this._textures.forEach(function(a){b.add(4,a)});this._geometries=y.geometriesFromLodResources(this._lodResources);this._geometries.forEach(function(a){b.add(2,a)})};c.prototype._initializeLodRenderer=function(){var b=this,a=this._context.stage;this._lodRenderer=new ba.LodRenderer(this._lodResources,
this._optionalFields,{layerUid:this._context.layer.uid,graphicUid:function(a){return b._instanceIndexToGraphicUid.get(a)}},this._fastUpdates.enabled?{applyTransform:function(a,e,c){a.getFeatureAttribute(e,r);v.mat4.copy(c,x.evaluateModelTransform(b._fastUpdates.materialParameters,r,c))},scaleFactor:function(a,e,c){e.getFeatureAttribute(c,r);return x.evaluateModelTransformScale(a,b._fastUpdates.materialParameters,r)}}:null);this._lodRenderer.slicePlaneEnabled=this._context.slicePlaneEnabled;a.addRenderPlugin(this._lodRenderer.slots,
this._lodRenderer)};c.prototype._getExternalColorParameters=function(b){var a={};this._drivenProperties.color?a.externalColor=p.vec4f64.ONES:m.isSome(b)&&m.isSome(b.color)?a.externalColor=D.toUnitRGBA(b.color):(a.externalColor=p.vec4f64.ONES,a.colorMixMode="ignore");return a};c.prototype.destroy=function(){w.prototype.destroy.call(this);var b=this._context.stage;this._lodRenderer&&(b.removeRenderPlugin(this._lodRenderer),this._lodRenderer.destroy());this._materials&&this._materials.forEach(function(a){return b.remove(3,
a.id)});this._textures&&this._textures.forEach(function(a){return b.remove(4,a.id)});this._geometries&&this._geometries.forEach(function(a){return b.remove(2,a.id)})};c.prototype.createGraphics3DGraphic=function(b){var a=b.graphic;if(!this._validateGeometry(a.geometry))return null;var d=k.placePointOnGeometry(a.geometry);if(m.isNone(d))return this.logger.warn("unsupported geometry type for icon symbol: "+a.geometry.type),null;var e=this.getGraphicElevationContext(a);return this._createAs3DShape(a,
d,b.renderingInfo,e,a.uid)};c.prototype.notifyDestroyGraphicLayer=function(b){this._instanceIndexToGraphicUid.delete(b.instanceIndex)};c.prototype.graphicLayerToGraphicId=function(){return 0};c.prototype.layerOpacityChanged=function(){var b=this,a=this._drivenProperties.opacity,d=this.isByResource;this._materials.forEach(function(e,c){var f=m.get(b.symbolLayer,"material","color");c=b._getCombinedOpacity(f,{hasIntrinsicColor:d})*b._originalOpacities[c];e.setParameterValues({opacity:c,transparent:1>
c||a})});return!0};c.prototype.layerElevationInfoChanged=function(b,a){return this.updateGraphics3DGraphicElevationInfo(b,a,k.needsElevationUpdates3D)};c.prototype.slicePlaneEnabledChanged=function(){var b=this;this._lodRenderer.slicePlaneEnabled=this._context.slicePlaneEnabled;this._materials.forEach(function(a){a.setParameterValues({slicePlaneEnabled:b._context.slicePlaneEnabled})});return!0};c.prototype.physicalBasedRenderingChanged=function(){var b=this;this._materials.forEach(function(a){b.isByResource?
b._isEsriSymbolResource&&!b._isWosr&&a.setParameterValues({usePBR:b._context.physicalBasedRenderingEnabled}):a.setParameterValues({usePBR:b._context.physicalBasedRenderingEnabled})});return!0};c.prototype.pixelRatioChanged=function(){return!0};c.prototype.applyRendererDiff=function(b,a){var d=this,e;for(e in b.diff)switch(e){case "visualVariables":if(x.updateFastSymbolUpdatesState(this._fastUpdates,a,this._fastVisualVariableConvertOptions()))this._materials.forEach(function(a){return a.setParameterValues(d._fastUpdates.materialParameters)}),
this._lodRenderer.notifyShaderTransformationChanged();else return!1;break;default:return!1}return!0};c.prototype.computeComplexity=function(){if(!this._lodResources)return w.prototype.computeComplexity.call(this);var b=y.geometriesFromLodLevelResources(this._lodResources.levels[0]).reduce(function(a,b){return a+b.data.getIndices(aa.VertexAttrConstants.POSITION).length},0)/3,a=Z.defaultSymbolLayerMemoryComplexity(this.symbol,this.symbolLayer);return{primitivesPerFeature:b,primitivesPerCoordinate:0,
estimated:!1,memory:a}};c.prototype._createAs3DShape=function(b,a,d,e,c){b=this.getFastUpdateAttrValues(b);var f=!this._fastUpdates.enabled&&this._hasPerInstanceColor()?u.mixinColorAndOpacity(d.color,d.opacity):null,l=this._context.clippingExtent;N.pointToVector(a,t,this._context.elevationProvider.spatialReference);if(l&&!k.pointInBox2D(t,l))return null;var l=this._requiresTerrainElevation(e),h=this._computeGlobalTransform(a,e,G,l?A:null);d=this._computeLocalTransform(this.symbolLayer,d,R);var g=
this._lodRenderer.instanceData,n=g.addInstance();this._instanceIndexToGraphicUid.set(n,c);g.setLocalTransform(n,d,!1);g.setGlobalTransform(n,h);b&&g.setFeatureAttribute(n,b);f&&g.setColor(n,f);c=new W(this,n,V.perLodInstanceElevationAligner,e);l&&(c.alignedTerrainElevation=A.terrainElevation);c.needsElevationUpdates=k.needsElevationUpdates3D(e.mode);k.extendPointGraphicElevationContext(c,a,this._context.elevationProvider);return c};c.prototype._computeGlobalTransform=function(b,a,d,c){a=k.computeElevation(this._context.elevationProvider,
b,a,this._context.renderCoordsHelper,c);t[0]=b.x;t[1]=b.y;t[2]=a;N.computeLinearTransformation(b.spatialReference,t,d,this._context.renderSpatialReference);return d};c.prototype._computeLocalTransform=function(b,a,d){v.mat4.identity(d);this._applyObjectRotation(a,!1,d);this._applyObjectRotation(b,!0,d);this._applyObjectScale(a,d);this._applyAnchor(b,d);return d};c.prototype._applyObjectScale=function(b,a){this._fastUpdates.enabled&&this._fastUpdates.requiresShaderTransformation||(b=u.computeObjectScale(this._drivenProperties.size&&
b.size?b.size:this._symbolSize,this._symbolSize,this._resourceSize,this._context.renderCoordsHelper.unitInMeters),1===b[0]&&1===b[1]&&1===b[2]||v.mat4.scale(a,a,b))};c.prototype.prepareSymbolLayerPatch=function(b){if("partial"===b.diff.type){var a=b.diff.diff;this._preparePatchTransform(b,a);this._preparePatchColor(b,a)}};c.prototype.updateGeometry=function(b,a){var d=a&&k.placePointOnGeometry(a);if(m.isNone(d))return!1;a=this.getGeometryElevationMode(a);if(b.elevationContext.mode!==a)return!1;a=
this._requiresTerrainElevation(b.elevationContext);this._computeGlobalTransform(d,b.elevationContext,G,a?A:null);a&&(b.alignedTerrainElevation=A.terrainElevation);this._lodRenderer.instanceData.setGlobalTransform(b.instanceIndex,G,!0);k.extendPointGraphicElevationContext(b,d,this._context.elevationProvider);return!0};c.prototype._preparePatchTransform=function(b,a){var d=this;if(a.heading||a.tilt||a.roll||a.width||a.height||a.depth||a.anchor||a.anchorPosition){var c=function(a,b,c){return(null!=a&&
"complete"===a.type?a.newValue:b)||c},f=c(a.heading,this.symbolLayer.heading,0),g=c(a.tilt,this.symbolLayer.tilt,0),l=c(a.roll,this.symbolLayer.roll,0),k=c(a.width,this.symbolLayer.width,void 0),m=c(a.height,this.symbolLayer.height,void 0),n=c(a.depth,this.symbolLayer.depth,void 0),p=c(a.anchor,this.symbolLayer.anchor,void 0),c=c(a.anchorPosition,this.symbolLayer.anchorPosition,void 0);delete a.heading;delete a.tilt;delete a.roll;delete a.width;delete a.height;delete a.depth;delete a.anchor;delete a.anchorPosition;
var q={heading:f,tilt:g,roll:l,anchor:p,anchorPosition:c};1===this.loadStatus&&b.symbolLayerStatePatches.push(function(){d._symbolSize=h.vec3f64.fromArray(u.computeSizeWithResourceSize(d._resourceSize,{width:k,height:m,depth:n,isPrimitive:d.symbolLayer.isPrimitive}))});b.graphics3DGraphicPatches.push(function(a,b){b=d._computeLocalTransform(q,b,R);d._lodRenderer.instanceData.setLocalTransform(a.instanceIndex,b,!0)})}};c.prototype._preparePatchColor=function(b,a){var c=this;if(a.material&&"partial"===
a.material.type&&(a=a.material.diff,a.color&&"complete"===a.color.type&&null!=a.color.newValue&&null!=a.color.oldValue)){var e=a.color.newValue,f=m.isSome(e)?D.toUnitRGBA(e):p.vec4f64.ONES;delete a.color;b.graphics3DGraphicPatches.push(function(a){c._hasPerInstanceColor()?(c._lodRenderer.instanceData.setColor(a.instanceIndex,f),a=c.setMaterialTransparencyParams({},e)):a=c.setMaterialTransparencyParams({externalColor:f},e);for(var b=0,d=c._materials;b<d.length;b++)d[b].setParameterValues(a)})}};c.prototype._requiresTerrainElevation=
function(b){return"absolute-height"!==b.mode};c.prototype._applyObjectRotation=function(b,a,c){if(!(this._fastUpdates.enabled&&this._fastUpdates.requiresShaderTransformation&&a))return u.computeObjectRotation(b.heading,b.tilt,b.roll,c)};c.prototype._computeAnchor=function(b){var a=h.vec3f64.create();switch(b.anchor){case "center":g.vec3.copy(a,q.center(this._resourceBoundingBox));g.vec3.negate(a,a);break;case "top":var c=q.center(this._resourceBoundingBox);g.vec3.set(a,-c[0],-c[1],-this._resourceBoundingBox[5]);
break;case "bottom":c=q.center(this._resourceBoundingBox);g.vec3.set(a,-c[0],-c[1],-this._resourceBoundingBox[2]);break;case "relative":var c=q.center(this._resourceBoundingBox),e=q.size(this._resourceBoundingBox);b=(b=b.anchorPosition)?h.vec3f64.fromValues(b.x,b.y,b.z):h.vec3f64.ZEROS;g.vec3.multiply(a,e,b);g.vec3.add(a,a,c);g.vec3.negate(a,a);break;default:this._pivotOffset?g.vec3.negate(a,this._pivotOffset):g.vec3.copy(a,h.vec3f64.ZEROS)}return a};c.prototype._applyAnchor=function(b,a){this._fastUpdates.enabled&&
this._fastUpdates.requiresShaderTransformation||(b=this._computeAnchor(b))&&v.mat4.translate(a,a,b)};c.prototype._hasPerInstanceColor=function(){return this._drivenProperties.color||this._drivenProperties.opacity};c.prototype._fastVisualVariableConvertOptions=function(){var b=this._resourceBoundingBox?h.vec3f64.fromArray(q.size(this._resourceBoundingBox)):h.vec3f64.ONES,a=this._resourceBoundingBox?this._computeAnchor(this.symbolLayer):h.vec3f64.ZEROS,c=this._context.renderCoordsHelper.unitInMeters,
e=u.computeObjectScale(this._symbolSize,this._symbolSize,this._resourceSize,c),f=h.vec3f64.fromValues(this.symbolLayer.tilt||0,this.symbolLayer.roll||0,this.symbolLayer.heading||0);return{modelSize:b,symbolSize:this._symbolSize||h.vec3f64.ONES,unitInMeters:c,transformation:{anchor:a,scale:e,rotation:f}}};return c}(X.default);C.Graphics3DObjectSymbolLayer=B;var t=h.vec3f64.create(),R=L.mat4f64.create(),G=L.mat4f64.create(),r=p.vec4f64.create(),A={verticalDistanceToGround:0,terrainElevation:0};C.default=
B});