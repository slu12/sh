// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/tsSupport/assignHelper ../../engine ../../engine/BitmapContainer".split(" "),function(c,h,k,l,m,n){Object.defineProperty(h,"__esModule",{value:!0});c=function(c){function d(b){var a=c.call(this,null)||this;a.requestRender=a.requestRender.bind(a);a._layerView=b;a._canvas=document.createElement("canvas");a._context=a._canvas.getContext("2d");a._bitmap=new m.Bitmap;a._bitmap.stage=a.stage;a.addChild(a._bitmap);return a}
k(d,c);d.prototype.doRender=function(b){var a=b.state,d=this._createCustomRenderParams(b),e=this._canvas,f=this._bitmap,g=window.devicePixelRatio;e.width=a.size[0]*g;e.height=a.size[1]*g;f.resolution=a.resolution;e=a.clone();e.pixelRatio=g;f.pixelRatio=g;d.state=e;f.x=a.viewpoint.targetGeometry.x-a.extent.width/2;f.y=a.viewpoint.targetGeometry.y+a.extent.height/2;this._layerView.render(d);f.source=this._canvas;f.rotation=a.rotation;c.prototype.doRender.call(this,l({},b,{state:e}))};d.prototype._createCustomRenderParams=
function(b){return{globalOpacity:b.globalOpacity,state:b.state,stationary:b.stationary,pixelRatio:window.devicePixelRatio,context:this._context}};return d}(n.BitmapContainer);h.Display=c;h.default=c});