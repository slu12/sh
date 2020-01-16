// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/assignHelper ../../../core/tsSupport/decorateHelper ../../../Color ../../../core/Accessor ../../../core/maybe ../../../core/ObjectPool ../../../core/PooledArray ../../../core/accessorSupport/decorators ../../../core/libs/gl-matrix-2/mat4 ../../../core/libs/gl-matrix-2/mat4f64 ../../../core/libs/gl-matrix-2/vec2f64 ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../core/libs/gl-matrix-2/vec4 ../../../core/libs/gl-matrix-2/vec4f64 ../../../geometry/support/aaBoundingBox ../support/imageUtils ../support/buffer/BufferView ./PatchGeometryFactory ./PatchRenderData ./TileRenderer ./tileUtils ../webgl-engine/core/shaderLibrary/ShaderOutputOptions ../webgl-engine/lib/glUtil3D ../webgl-engine/lib/intersectorUtils ../webgl-engine/lib/screenSizePerspectiveUtils ../webgl-engine/lib/tracer ../webgl-engine/materials/internal/MaterialUtil ../webgl-engine/shaders/TerrainTechnique".split(" "),
function(N,ma,V,na,p,W,X,I,O,C,v,Y,P,Z,r,w,Q,u,J,aa,ba,R,ca,da,z,ea,fa,S,ga,K,E,L){var M=Z.vec2f64.create(),F=J.create(),x=u.vec4f64.create(),y=u.vec4f64.create(),T=u.vec4f64.create(),ha=function(){return function(){this.extent=u.vec4f64.create();this.maxLevel=this.minLevel=0;this.callback=null}}();N=function(u){function b(a){a=u.call(this,a)||this;a.type="Terrain";a.tileSize=256;a.rctx=null;a.renderDataPool=new O(ca.PatchRenderData);a.patchGroups=new C({allocator:function(a){return a||{root:null,
origin:null,patches:new C}},deallocator:function(a){a.root=null;a.origin=null;a.patches.clear();return a}});a.patchGroupsDirty=!0;a.patchGroupsMap=new Map;a.tileIterator=new z.IteratorPreorder;a.highestVisibleLODTile=null;a.visible=!0;a._opaque=!0;a._skirtScale=1;a._renderingDisabled=!1;a._renderOrder=1;a._velvetOvergroundEnabled=!0;a._wireframeEnabled=!1;a.castShadows=!0;a.emptyTex=null;a.tileRenderer=null;a.tileBackgroundInitialized=!1;a.tileBackgroundUpdating=!1;a.stencilEnabledLayerExtents=[];
a.numTrianglesRendered=0;a.numTilesRendered=0;a.numTilesCulled=0;a.numOriginsRendered=0;a.clippingExtent=null;a.needsHighlight=!1;a.visibleScaleRangeQueries=new C({initialSize:10});a.visibleScaleRangeQueriesInvPtr=0;a.visibleScaleRangeQueryQueue=new C({initialSize:30});a.visibleScaleRangeQueryPool=new O(ha,!1);return a}V(b,u);b.prototype.destroy=function(){R.clearCaches()};b.prototype.install=function(a){a.addRenderPlugin([3,8],this);this.drapedRenderer=a.renderView.getDrapedRenderer()};b.prototype.uninstall=
function(a){a.removeRenderPlugin(this)};Object.defineProperty(b.prototype,"updating",{get:function(){return!this.tileBackgroundInitialized||this.tileBackgroundUpdating},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"canRender",{get:function(){return this.visible&&!!this.rootTiles&&this.tileBackgroundInitialized&&!this._renderingDisabled},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hasOverlays",{get:function(){return this.shaderTechniqueConfig.hasOverlays},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"renderingDisabled",{set:function(a){this._renderingDisabled=!!a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"opaque",{get:function(){return this._opaque&&!this.shaderTechniqueConfig.slice},set:function(a){this._opaque!==a&&(this._opaque=a,this.setNeedsRender())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"skirtScale",{set:function(a){this._skirtScale=a;this.setNeedsRender()},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"renderPatchBorders",{set:function(a){this.shaderTechniqueConfig.tileBorders!==a&&(this.shaderTechniqueConfig.tileBorders=a,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"cullBackFaces",{set:function(a){this.shaderTechniqueConfig.backfaceCullingEnabled!==a&&(this.shaderTechniqueConfig.backfaceCullingEnabled=a,this._updateAllProgramsAndPipelines(),this.setNeedsRender())},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"renderOrder",{get:function(){return this._renderOrder},set:function(a){this._renderOrder=a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"velvetOvergroundEnabled",{set:function(a){this._velvetOvergroundEnabled!==a&&(this._velvetOvergroundEnabled=a,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"intersectionHandlerId",{get:function(){return S.TERRAIN_ID},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"slicePlaneEnabled",{get:function(){return this.shaderTechniqueConfig.slice},set:function(a){this.shaderTechniqueConfig.slice!==a&&(this.shaderTechniqueConfig.slice=a,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0});b.prototype.setDebugScreenSizePerspective=function(a){this.shaderTechniqueConfig.screenSizePerspective!==a&&(this.shaderTechniqueConfig.screenSizePerspective=a,this._updateAllProgramsAndPipelines())};
b.prototype.setRootTiles=function(a){this.rootTiles=a;this.setNeedsRender()};b.prototype.setNeedsHighlight=function(a){this.needsHighlight=a;this.setNeedsRender()};b.prototype.setStencilEnabledLayerExtents=function(a){this.stencilEnabledLayerExtents=a;this.setNeedsRender()};b.prototype.setTileSize=function(a){this.tileSize=a;this.tileRenderer&&(this.tileRenderer.tileSize=a);this.setNeedsRender()};b.prototype.loadTile=function(a){a.renderData||(a.renderData=this.renderDataPool.acquire(),a.renderData.init(a),
a.renderData.localOrigin=this._getLocalOriginOfTile(a));this.updateTileGeometry(a);this.updateTileTexture(a)};b.prototype.queryVisibleLevelRange=function(a,c,g,b){var f=this.visibleScaleRangeQueryPool.acquire();Q.vec4.copy(f.extent,a);f.minLevel=c?c:-Number.MAX_VALUE;f.maxLevel=null!=g?g:Number.MAX_VALUE;f.callback=b;this.visibleScaleRangeQueryQueue.push(f);this.setNeedsRender()};b.prototype.updateTileTexture=function(a){this.tileRenderer&&this.tileBackgroundInitialized&&(this.tileRenderer.updateTileTexture(a),
a.resetPendingUpdate(32))};b.prototype.updateTileGeometry=function(a){for(var c=0,g=a.layerInfo[0];c<g.length;c++)g[c].pendingUpdates&=-17;a.resetPendingUpdate(16);a.renderData.updateGeometry(this.rctx,this._wireframeEnabled)&&this.setNeedsRender()};b.prototype.unloadTile=function(a){a.renderData&&(a.renderData.releaseTexture(),this.releaseTileGeometry(a.renderData),a.renderData=null,a.setMemoryDirty(),this.setNeedsRender())};b.prototype._getLocalOriginOfTile=function(a){var c=Math.max(0,7*Math.floor((a.lij[0]-
3)/7));if("spherical"===this.manifold&&0===c)return w.vec3f64.ZEROS;for(;a.parent&&a.lij[0]>c;)a=a.parent;return a.centerAtSeaLevel};b.prototype.setVisibility=function(a){this.visible=a;this.setNeedsRender()};b.prototype.getStats=function(){return{numTilesRendered:this.numTilesRendered,numTilesCulled:this.numTilesCulled,numTrianglesRendered:this.numTrianglesRendered,numOriginsRendered:this.numOriginsRendered}};b.prototype.setWireframe=function(a){var c=this;this._wireframeEnabled!==a&&(this._wireframeEnabled=
a,this.rootTiles&&(z.traverseTilesPreorder(this.rootTiles,function(g){g.renderData&&g.renderData.updateGeometry(c.rctx,a)}),this.setNeedsRender()))};b.prototype.setNeedsRender=function(a){void 0===a&&(a=1);this.patchGroupsDirty=!0;this.initContext.requestRender(a)};b.prototype.setTileBackground=function(a){this.tileBackground=a;this._updateTileBackground()};b.prototype.initializeRenderContext=function(a){var c=this;this.initContext=a;this.rctx=a.rctx;this.shaderTechniqueRep=a.shaderTechniqueRep;this.shaderTechniqueConfig=
new L.TerrainTechniqueConfiguration;this._updateAllProgramsAndPipelines();this.shaderTechniqueRep=a.shaderTechniqueRep;this.tileRenderer=new da(this.rctx,this.tileSize,this.shaderTechniqueRep,function(){return c.setNeedsRender()});this.tileBackground&&this._updateTileBackground();this.emptyTex=fa.createEmptyTexture(this.rctx)};b.prototype.uninitializeRenderContext=function(){null!=this.emptyTex&&(this.emptyTex.dispose(),this.emptyTex=null);this.tileRenderer&&(this.tileRenderer.dispose(),this.tileRenderer=
null)};b.prototype.intersect=function(a,c,g,b){if(this.rootTiles&&(!a.options.selectOpaqueTerrainOnly||!a.options.selectionMode||this._opaque)){var f=ia,e=ja;r.vec3.subtract(f,b,g);r.vec3.set(e,1/f[0],1/f[1],1/f[2]);var l=a.results.min,h=a.results.max,n=a.results.terrain,w=0===a.options.store,q=null,u=this.clippingExtent,m=this.tileIterator;m.reset(this.rootTiles);for(var t=I.isSome(a.options.verticalOffset)?a.options.verticalOffset.terrain:null,k=function(){var d=m.next();if(null===d.renderData)return"continue";
if(a.options.invisibleTerrain){if(!d.visible&&u&&!d.intersectsExtent(u))return"continue"}else if(!d.visible)return"continue";var k=d.renderData.geometryInfo,A=d.renderData.localOrigin,B=-v._skirtScale*k.skirtLength;J.set(F,k.boundingBox);I.isSome(t)&&(t.localOrigin=A,t.applyToAABB(F));if(0!==B){var D=d.up;J.expandWithOffset(F,B*D[0],B*D[1],B*D[2])}r.vec3.subtract(G,g,A);if(!E.intersectAabbInvDirBefore(F,G,e,a.tolerance,w&&null!=l.dist?l.dist:Infinity))return"continue";var p=function(a,c,g,b){a.set(void 0,
z.tile2str(c),g,b,P.mat4f64.IDENTITY,void 0);a.intersector=ka;a.target={type:"external",metadata:{tile:c}}},D=function(e,k){0<=e&&(a.options.backfacesTerrain||0>r.vec3.dot(k,f))&&(a.options.invisibleTerrain||!a.options.selectionMode||null==c||c(g,b,e))&&((null==n.dist||e<n.dist)&&p(n,d,e,k),a.options.storeTerrainResults&&(2===a.options.store&&(I.isNone(q)?(q=new S.IntersectorResult(a.ray),p(q,d,e,k),a.results.all.push(q)):e<q.dist&&p(q,d,e,k)),(null==l.dist||e<l.dist)&&p(l,d,e,k),0!==a.options.store&&
(null==h.dist||e>h.dist)&&p(h,d,e,k)))},x=la;r.vec3.subtract(x,b,A);var A=k.indices,y=k.vertexAttributes,C={data:y.getField("position",ba.BufferViewVec3f).typedBuffer,size:3,offsetIdx:0,strideIdx:y.stride/4},k=k.numWithoutSkirtIndices/3;E.intersectTriangles(G,x,0,k,A,C,null,t,D);0!==B&&R.intersectSkirts(G,x,k,A.length/3,A,y,"spherical"===v.manifold?function(a){return r.vec3.scale(a,a,B/r.vec3.length(a))}:function(a){return r.vec3.set(a,0,0,B)},t,D)},v=this;!m.done;)k()}};b.prototype.render=function(a){if(a.slot!==
(this.opaque?3:8))return!1;K.trace("# BEGIN RENDER TERRAIN");var c=a.pass,g=1===a.scenelightingData.globalFactor,b=this._updatePatchGroups();n.overlayEnabled=!1;n.used=!0;switch(c){case 0:n.overlayEnabled=!0;n.used=!1;c=a.shadowMap&&a.shadowMap.enabled;this.shaderTechniqueConfig.receiveShadows!==c&&(this.shaderTechniqueConfig.receiveShadows=c,this._updateAllProgramsAndPipelines());c=!this.drapedRenderer.isEmpty();this.shaderTechniqueConfig.hasOverlays!==c&&(this.shaderTechniqueConfig.hasOverlays=
c,this._updateAllProgramsAndPipelines());this._renderMaterialPass(a,0,b,n);break;case 3:this.castShadows&&g&&this._renderAuxiliaryPass(a,3,b,n);break;case 1:this._renderAuxiliaryPass(a,1,b,n);break;case 2:this._renderAuxiliaryPass(a,2,b,n);break;case 4:this.needsHighlight&&(n.overlayEnabled=!0,this._renderAuxiliaryPass(a,4,b,n),a.rctx.clearSafe(256))}K.trace("# END RENDER TERRAIN");0!==this.visibleScaleRangeQueryQueue.length&&this.setNeedsRender();return!0};b.prototype._renderMaterialPass=function(a,
c,b,e){var g=this,d=a.rctx,l=a.camera;this._setTerrainTechnique(c);var h=this.shaderTechnique.program;a.rctx.bindProgram(h);d.bindProgram(h);a.shadowMap&&a.shadowMap.bind(h);a.ssaoHelper&&a.ssaoHelper.setUniforms(h);h.setUniform1i("tex",0);this._bindOverlayUniforms(h);h.setUniformMatrix4fv("viewNormal",l.viewInverseTransposeMatrix);h.setUniformMatrix4fv("proj",l.projectionMatrix);a.scenelightingData.setUniforms(h,!0);c=l.viewMatrix;r.vec3.set(H,c[12],c[13],c[14]);r.vec3.normalize(H,H);h.setUniform3fv("viewDirection",
H);this.numOriginsRendered=this.numTrianglesRendered=this.numTilesCulled=this.numTilesRendered=0;this._prepareScaleRangeQueries();this.opaque?this._renderPatchGroups(a,h,b,e):a.offscreenRenderingHelper.renderToTargets(function(){return g._renderPatchGroups(a,h,b,e)},a.offscreenRenderingHelper.tmpColor,a.offscreenRenderingHelper.mainDepth,[0,0,0,0]);this._processScaleRangeQueries()};b.prototype._renderAuxiliaryPass=function(a,c,b,e){this._setTerrainTechnique(c);c=this.shaderTechnique.program;a.rctx.bindProgram(c);
if(4===a.pass){var g=a.offscreenRenderingHelper;a.rctx.bindTexture(g.depthTexture,5);c.setUniform1i("depthTex",5);c.setUniform4f("highlightViewportPixelSz",0,0,1/g.width,1/g.height)}else if(c.setUniformMatrix4fv("viewNormal",a.camera.viewInverseTransposeMatrix),1===a.pass||3===a.pass)M[0]=a.camera.near,M[1]=a.camera.far,c.setUniform2fv("nearFar",M);this._renderPatchGroupsAuxiliary(a,c,b,e)};b.prototype._updateTileBackground=function(){var a=this;if(this.tileRenderer){this.tileBackgroundUpdating=!0;
var c=function(){a.tileBackgroundInitialized=!0;a.tileBackgroundUpdating=!1;a.rootTiles&&z.traverseTilesPreorder(a.rootTiles,function(c){return a.tileRenderer.updateTileTexture(c)});a.setNeedsRender()};if("string"===typeof this.tileBackground){var b=this.tileBackground;aa.requestImage(b).then(function(g){b===a.tileBackground&&a.tileRenderer&&(a.tileRenderer.setBackground(g),c())})}else{var e=this.tileBackground?W.toUnitRGBA(this.tileBackground):[0,0,0,0];this.tileRenderer.setBackground(e);c()}}};
b.prototype._updatePatchGroups=function(){var a=this,c=this.patchGroups;if(!this.patchGroupsDirty)return c;this.highestVisibleLODTile=null;this._renderCollectOrigins(c);if(0!==this.renderOrder){for(var b=0;b<c.length;b++)z.sortTiles(this.renderOrder,c.data[b].patches);c.sort(function(c,b){var g=a.renderOrder;c=0===c.patches.length?-g:0===b.patches.length?g:z.compareTiles(c.patches.data[0],b.patches.data[0],g);return c})}this.patchGroupsDirty=!1;return c};b.prototype._renderCollectOrigins=function(a){var c=
this.rootTiles,b="spherical"===this.manifold;a.clear();for(var e=0;e<c.length;e++){var f=c[e],d=a.pushNew();d.root=f;d.origin=b?w.vec3f64.ZEROS:f.centerAtSeaLevel;d.patches.clear();this._renderCollectOriginsForRoot(a,d)}a.filterInPlace(function(a){return 0<a.patches.length})};b.prototype._renderCollectOriginsForRoot=function(a,c){var b=this.tileIterator;b.resetOne(c.root);var e=this.patchGroupsMap;e.clear();for(e.set(c.origin,c);!b.done;){c=b.next();var f=c.renderData;if(f&&!c.visible)this.numTilesCulled++,
b.skipSubtree();else{if(0===c.lij[0]%7){var d=a.pushNew();d.root=c;d.origin=c.centerAtSeaLevel;e.set(c.centerAtSeaLevel,d);d.patches.clear()}if(!c.rendered)this.numTilesCulled++;else if(f){(d=e.get(f.localOrigin))&&d.patches.push(c);if(!this.highestVisibleLODTile||c.vlevel>this.highestVisibleLODTile.vlevel)this.highestVisibleLODTile=c;b.skipSubtree()}}}};b.prototype._scaleQueriesForTile=function(a){var c=a.extent;a=a.lij[0];for(var b=0;b<this.visibleScaleRangeQueriesInvPtr;){var e=this.visibleScaleRangeQueries.data[b],
f=e.extent;a>=e.minLevel&&a<=e.maxLevel&&f[0]<=c[2]&&f[2]>=c[0]&&f[1]<=c[3]&&f[3]>=c[1]?(this.visibleScaleRangeQueries.swapElements(b,this.visibleScaleRangeQueriesInvPtr-1),this.visibleScaleRangeQueriesInvPtr--):b++}};b.prototype._tileIntersectsStencilEnabledLayer=function(a){for(var c=this.stencilEnabledLayerExtents,b=0;b<c.length;b++)if(a.intersectsExtent(c[b]))return!0;return!1};b.prototype._renderPatchGroupsAuxiliary=function(a,c,b,e){this.shaderTechnique.bindPipelineState(a.rctx);var g=0<this.stencilEnabledLayerExtents.length;
c.setUniformMatrix4fv("proj",a.camera.projectionMatrix);c.setUniform1f("skirtScale",this._skirtScale);e.overlayEnabled&&this._bindOverlayUniforms(c);for(var d=0;d<b.length;d++){var l=b.data[d];this._bindViewForPatchGroup(c,l,a.camera.eye,a.camera.viewMatrix);for(var h=0;h<l.patches.length;h++)this._renderPatch(a.rctx,c,l.patches.data[h],4,g,e)}a.rctx.bindVAO(null)};b.prototype._renderPatchGroups=function(a,c,b,e){var g=a.rctx,d=a.camera,l=d.viewMatrix;this.shaderTechnique.bindPipelineState(g);if(this.shaderTechniqueConfig.screenSizePerspective&&
this.pointsOfInterest){var h=ga.getSettings("spherical"===this.manifold?"global":"local");h.update({distance:this.pointsOfInterest.centerOnSurfaceFrequent.distance,fovY:d.fovY});E.bindScreenSizePerspective(h,c,"screenSizePerspective")}h=0<this.stencilEnabledLayerExtents.length;c.setUniform1f("skirtScale",this._skirtScale);for(var n=this._wireframeEnabled?1:4,p=0;p<b.length;p++){var q=b.data[p],r=q.patches;if(0!==r.length){this._bindViewForPatchGroup(c,q,d.eye,l);var m=a.sliceHelper&&a.sliceHelper.plane;
m&&E.bindSlicePlane(q.origin,m,c);a.shadowMap&&a.shadowMap.bindView(c,q.origin);this.numOriginsRendered++;for(q=0;q<r.length;q++){m=r.data[q];K.trace("# RENDER TILE "+z.tile2str(m)+", screenDepth:"+m.screenDepth);var t=m.renderData.geometryInfo.uvOffsetAndScale,k=m.renderData.texOffsetAndScale;Q.vec4.set(T,t[0]*k[2]+k[0],t[1]*k[3]+k[1],t[2]*k[2],t[3]*k[3]);c.setUniform4fv("texOffsetAndScale",T);g.bindTexture(m.renderData.textureReference,0);c.setUniform1f("opacity",m.renderData.opacity);t=this._renderPatch(g,
c,m,n,h,e);m.renderOrder=this.numTilesRendered;this.numTilesRendered++;this.numTrianglesRendered+=t/3;this._scaleQueriesForTile(m)}}}g.bindVAO(null)};b.prototype._renderPatch=function(a,c,b,e,f,d){d.overlayEnabled&&(this._bindOverlayTextures(c,b.renderData.overlays,d.used),c.setUniform1f("overlayOpacity",b.renderData.overlayOpacity));f&&(this._tileIntersectsStencilEnabledLayer(b)?this.stencilShaderTechnique.bindPipelineState(a):this.shaderTechnique.bindPipelineState(a));f=0===this._skirtScale?b.renderData.geometryInfo.numWithoutSkirtIndices:
b.renderData.vao.indexBuffer.size;a.bindVAO(b.renderData.vao);c.assertCompatibleVertexAttributeLocations(b.renderData.vao);a.drawElements(e,f,b.renderData.vao.indexBuffer.indexType,0);return f};b.prototype._bindViewForPatchGroup=function(a,c,b,e){a.setUniform3fv("origin",c.origin);Y.mat4.translate(U,e,c.origin);a.setUniformMatrix4fv("view",U);a.setUniform3f("camPos",b[0]-c.origin[0],b[1]-c.origin[1],b[2]-c.origin[2])};b.prototype._bindOverlayUniforms=function(a){a.setUniform1i("ovInnerColorTex",1);
a.setUniform1i("ovOuterColorTex",2);a.setUniform1i("ovInnerWaterTex",3);a.setUniform1i("ovOuterWaterTex",4)};b.prototype._bindOverlayTextures=function(a,b,g){for(var c=0;2>c;c++){var f=2*c,d=b[c],l=g?d.highlightRenderTargetId:d.renderTargetId;l?(x[f]=d.texOffset[0],x[f+1]=d.texOffset[1],y[f]=d.texScale[0],y[f+1]=d.texScale[1],f=this.drapedRenderer.getRenderTargetTexture(l),this.rctx.bindTexture(f,1+c),(d=d.waterMaskRenderTargetId)?(d=this.drapedRenderer.getRenderTargetTexture(d),this.rctx.bindTexture(d,
3+c)):this.rctx.bindTexture(this.emptyTex,3+c)):(x[f]=0,x[f+1]=0,y[f]=0,y[f+1]=0,this.rctx.bindTexture(this.emptyTex,1+c),this.rctx.bindTexture(this.emptyTex,3+c))}a.setUniform4fv("overlayTexOffset",x);a.setUniform4fv("overlayTexScale",y)};b.prototype._setTerrainTechnique=function(a){this.shaderTechniqueConfig.output=a;switch(a){case 0:a="spherical"===this.manifold;this.shaderTechniqueConfig.hasOverlays=this.hasOverlays;this.shaderTechniqueConfig.atmosphere=a&&this._velvetOvergroundEnabled;break;
case 2:this.shaderTechniqueConfig.alphaZero=!0;break;case 1:this.shaderTechniqueConfig.shadowMap=!1;break;case 3:this.shaderTechniqueConfig.shadowMap=!0}this.shaderTechniqueConfig.stencilEnabled=!1;this.shaderTechnique=this.shaderTechniqueRep.acquireAndReleaseExisting(L.TerrainTechnique,this.shaderTechniqueConfig,this.shaderTechnique);this.shaderTechniqueConfig.stencilEnabled=!0;this.stencilShaderTechnique=this.shaderTechniqueRep.acquireAndReleaseExisting(L.TerrainTechnique,this.shaderTechniqueConfig,
this.stencilShaderTechnique)};b.prototype._updateAllProgramsAndPipelines=function(){var a=this;ea.ShaderOutputTypes.forEach(function(c){0!==c&&1!==c&&3!==c&&2!==c&&4!==c||a._setTerrainTechnique(c)});this.setNeedsRender()};b.prototype.releaseTileGeometry=function(a){a.releaseGeometry()&&this.setNeedsRender();this.renderDataPool.release(a)};b.prototype._prepareScaleRangeQueries=function(){for(var a=this.visibleScaleRangeQueries,c=this.visibleScaleRangeQueryQueue;a.length<a.data.length&&0<c.length;){var b=
c.pop();a.push(b)}this.visibleScaleRangeQueriesInvPtr=a.length};b.prototype._processScaleRangeQueries=function(){for(var a=this.visibleScaleRangeQueries,c=this.visibleScaleRangeQueryPool,b=0;b<a.length;b++){var e=a.data[b];c.release(e);e.callback(b>=this.visibleScaleRangeQueriesInvPtr);e.callback=null}a.clear()};Object.defineProperty(b.prototype,"test",{get:function(){return{tileRenderer:this.tileRenderer}},enumerable:!0,configurable:!0});p([v.property()],b.prototype,"tileBackgroundInitialized",void 0);
p([v.property()],b.prototype,"tileBackgroundUpdating",void 0);p([v.property({constructOnly:!0})],b.prototype,"manifold",void 0);p([v.property({readOnly:!0,dependsOn:["tileBackgroundInitialized","tileBackgroundUpdating"]})],b.prototype,"updating",null);return b=p([v.subclass("esri.views.3d.terrain.TerrainRenderer")],b)}(v.declared(X));var n={overlayEnabled:!1,used:!0},U=P.mat4f64.create(),H=w.vec3f64.create(),ia=w.vec3f64.create(),ja=w.vec3f64.create(),G=w.vec3f64.create(),la=w.vec3f64.create(),ka=
"TerrainRenderer";return N});