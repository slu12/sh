// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../core/libs/gl-matrix-2/mat4f64 ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../../../geometry/support/aaBoundingBox ./featureExpressionInfoUtils ./Graphics3DGraphicElevationContext ./graphicUtils ../../webgl-engine/lib/HighlightUtils".split(" "),function(p,H,I,y,z,A,q,m,h,B,C,D,E){p=function(){function b(a,
c,b,d){this.type="lod-instance";this.alignedTerrainElevation=0;this.needsElevationUpdates=this.isElevationSource=!1;this.graphics3DSymbolLayer=a;this.instanceIndex=c;this.elevationAligner=b;this.elevationContext=new C(d)}b.prototype.initialize=function(){};b.prototype.setVisibility=function(a){var c=this.lodRenderer.instanceData;return a!==c.getVisible(this.instanceIndex)?(c.setVisible(this.instanceIndex,a),!0):!1};b.prototype.destroy=function(){null!=this.instanceIndex&&(this.lodRenderer.instanceData.removeInstance(this.instanceIndex),
this.graphics3DSymbolLayer.notifyDestroyGraphicLayer(this))};b.prototype.alignWithElevation=function(a,c,b){this.elevationAligner&&(B.setContextFeature(this.elevationContext.featureExpressionInfoContext,b),a=this.elevationAligner(this,this.elevationContext,a,c),null!=a&&(this.alignedTerrainElevation=a))};b.prototype.getBSRadius=function(){var a=this.lodRenderer;return a.baseBoundingSphere.radius*a.instanceData.getCombinedMaxScaleFactor(this.instanceIndex)};b.prototype.getCenterObjectSpace=function(a){void 0===
a&&(a=m.vec3f64.create());this.lodRenderer.instanceData.getCombinedLocalTransform(this.instanceIndex,f);return q.vec3.transformMat4(a,this.lodRenderer.baseBoundingSphere.center,f)};b.prototype.getBoundingBoxObjectSpace=function(a){void 0===a&&(a=h.create());this.lodRenderer.instanceData.getCombinedLocalTransform(this.instanceIndex,f);var c=this.lodRenderer.baseBoundingBox;h.empty(a);for(var b=0;8>b;++b)q.vec3.set(d,0===(b&1)?c[0]:c[3],0===(b&2)?c[1]:c[4],0===(b&4)?c[2]:c[5]),q.vec3.transformMat4(d,
d,f),h.expandPointInPlace(a,d);return a};b.prototype.computeAttachmentOrigin=function(a){this.lodRenderer.instanceData.getGlobalTransform(this.instanceIndex,f);a.render.origin[0]+=f[12];a.render.origin[1]+=f[13];a.render.origin[2]+=f[14];a.render.num++};b.prototype.getProjectedBoundingBox=function(a,b,F,m,p){return z(this,void 0,void 0,function(){var c,v,r,e,t,u,g,n,x;return y(this,function(l){switch(l.label){case 0:c=this.getBoundingBoxObjectSpace(p);v=G;r=h.isPoint(c)?1:v.length;this.lodRenderer.instanceData.getGlobalTransform(this.instanceIndex,
f);for(e=0;e<r;e++)t=v[e],d[0]=c[t[0]],d[1]=c[t[1]],d[2]=c[t[2]],q.vec3.transformMat4(d,d,f),k[3*e+0]=d[0],k[3*e+1]=d[1],k[3*e+2]=d[2];if(!a(k,0,r))return[2,null];h.empty(c);u=null;this.calculateRelativeScreenBounds&&(u=this.calculateRelativeScreenBounds());for(e=0;e<3*r;e+=3){for(g=0;3>g;g++)c[g]=Math.min(c[g],k[e+g]),c[g+3]=Math.max(c[g+3],k[e+g]);u&&F.push({location:k.slice(e,e+3),screenSpaceBoundingRect:u})}if(!b)return[3,5];h.center(c,w);if("absolute-height"===this.elevationContext.mode)return[3,
5];n=void 0;x=D.demResolutionForBoundingBox(c,b);l.label=1;case 1:return l.trys.push([1,3,,4]),[4,b.service.queryElevation(w[0],w[1],m,x)];case 2:return n=l.sent(),[3,4];case 3:return l.sent(),n=null,[3,4];case 4:null!=n&&h.offset(c,0,0,-this.alignedTerrainElevation+n),l.label=5;case 5:return[2,c]}})})};b.prototype.addHighlight=function(a){var c=this,b=E.generateHighlightId();this.addHighlightId(b);a.addExternal(function(a){c.removeHighlightId(a)},b)};b.prototype.removeHighlight=function(a){this.highlights&&
this.highlights.forEach(function(b){return a.remove(b)})};b.prototype.addHighlightId=function(a){this.highlights=this.highlights||new Set;this.highlights.add(a);this.lodRenderer.instanceData.setHighlight(this.instanceIndex,!0)};b.prototype.removeHighlightId=function(a){this.highlights&&(this.highlights.delete(a),this.lodRenderer.instanceData.setHighlight(this.instanceIndex,0<this.highlights.size),0===this.highlights.size&&(this.highlights=null))};Object.defineProperty(b.prototype,"lodRenderer",{get:function(){return this.graphics3DSymbolLayer.lodRenderer},
enumerable:!0,configurable:!0});return b}();var k=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],d=m.vec3f64.create(),w=m.vec3f64.create(),G=[[0,1,2],[3,1,2],[0,4,2],[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]],f=A.mat4f64.create();return p});