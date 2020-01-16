// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/assignHelper ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/tsSupport/generatorHelper ../../../../../../core/tsSupport/awaiterHelper ../../../../../../core/promiseUtils ../../../../engine ../../../../engine/FeatureContainer ../../../../engine/webgl/enums".split(" "),function(f,g,n,k,p,q,l,d,m,h){Object.defineProperty(g,"__esModule",{value:!0});f=function(e){function c(a,b,c){a=e.call(this,a,b.clips)||this;a._pointToCallbacks=
new Map;a._layer=c;a._layerView=b;return a}k(c,e);c.prototype.renderChildren=function(a){this.hasAnimation&&a.painter.effects.integrate.draw(a,a.attributeView);e.prototype.renderChildren.call(this,a)};c.prototype.hitTest=function(a,b){a=[a,b];b=l.createResolver();this._pointToCallbacks.set(a,b);this.requestRender();return b.promise};c.prototype.doRender=function(a){var b=this._layer,c=b.maxScale,d=a.state.scale;d<=(b.minScale||Infinity)&&d>=c&&e.prototype.doRender.call(this,a)};Object.defineProperty(c.prototype,
"hasAnimation",{get:function(){return this.hasLabels},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"hasLabels",{get:function(){return!(!this._layer.labelingInfo||!this._layer.labelingInfo.length)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelsVisible",{get:function(){return this._layer.labelsVisible},enumerable:!0,configurable:!0});c.prototype.prepareRenderPasses=function(a){var b=this,c=a.registerRenderPass({name:"label",brushes:[d.brushes.Label],target:function(){return b._layer.labelsVisible?
b.children:null},drawPhase:h.WGLDrawPhase.LABEL|h.WGLDrawPhase.LABEL_ALPHA}),f=a.registerRenderPass({name:"geometry",brushes:[d.brushes.Fill,d.brushes.Line,d.brushes.Marker,d.brushes.Text],target:function(){return b.children},effects:[{apply:a.effects.highlight,enable:function(){return!!b._layerView.hasHighlight()}},{apply:a.effects.hittest,enable:function(){return!!b._pointToCallbacks.size},args:function(){return b._pointToCallbacks}}]});return e.prototype.prepareRenderPasses.call(this,a).concat([f,
c])};return c}(m.FeatureContainer);g.WGLFeatureView=f});