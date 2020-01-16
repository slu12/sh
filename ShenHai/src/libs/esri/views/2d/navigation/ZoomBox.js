// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/screenUtils ../../../core/accessorSupport/decorators".split(" "),function(q,r,m,k,n,p,g){return function(l){function b(a){a=l.call(this,a)||this;a._container=null;a._overlay=null;a._backgroundShape=null;a._boxShape=null;a._box={x:0,y:0,width:0,height:0};a._redraw=a._redraw.bind(a);return a}m(b,l);b.prototype.destroy=function(){this.view=null};Object.defineProperty(b.prototype,
"view",{set:function(a){var d=this;this._handles&&this._handles.forEach(function(a){a.remove()});this._handles=null;this._destroyOverlay();this._set("view",a);a&&(a.on("drag",["Shift"],function(a){return d._handleDrag(a,1)}),a.on("drag",["Shift","Ctrl"],function(a){return d._handleDrag(a,-1)}))},enumerable:!0,configurable:!0});b.prototype._start=function(){this._createContainer();this._createOverlay();this.navigation.begin()};b.prototype._update=function(a,d,c,e){this._box.x=a;this._box.y=d;this._box.width=
c;this._box.height=e;this._rafId||(this._rafId=requestAnimationFrame(this._redraw))};b.prototype._end=function(a,d,c,e,b){var f=this.view;a=f.toMap(p.createScreenPoint(a+.5*c,d+.5*e));c=Math.max(c/f.width,e/f.height);-1===b&&(c=1/c);this._destroyOverlay();this.navigation.end();f.goTo({center:a,scale:f.scale*c})};b.prototype._updateBox=function(a,d,c,e){var f=this._boxShape;f.setAttributeNS(null,"x",""+a);f.setAttributeNS(null,"y",""+d);f.setAttributeNS(null,"width",""+c);f.setAttributeNS(null,"height",
""+e);f.setAttributeNS(null,"class","esri-zoom-box__outline")};b.prototype._updateBackground=function(a,d,c,e){this._backgroundShape.setAttributeNS(null,"d",this._toSVGPath(a,d,c,e,this.view.width,this.view.height))};b.prototype._createContainer=function(){var a=document.createElement("div");a.className="esri-zoom-box__container";this.view.root.appendChild(a);this._container=a};b.prototype._createOverlay=function(){var a=this.view.width,d=this.view.height,c=document.createElementNS("http://www.w3.org/2000/svg",
"path");c.setAttributeNS(null,"d","M 0 0 L "+a+" 0 L "+a+" "+d+" L 0 "+d+" Z");c.setAttributeNS(null,"class","esri-zoom-box__overlay-background");a=document.createElementNS("http://www.w3.org/2000/svg","rect");d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");d.setAttributeNS(null,"class","esri-zoom-box__overlay");d.appendChild(c);d.appendChild(a);this._container.appendChild(d);this._backgroundShape=
c;this._boxShape=a;this._overlay=d};b.prototype._destroyOverlay=function(){this._container&&this._container.parentNode&&this._container.parentNode.removeChild(this._container);this._container=this._backgroundShape=this._boxShape=this._overlay=null};b.prototype._toSVGPath=function(a,d,c,e,f,b){c=a+c;e=d+e;return"M 0 0 L "+f+" 0 L "+f+" "+b+" L 0 "+b+" ZM "+a+" "+d+" L "+a+" "+e+" L "+c+" "+e+" L "+c+" "+d+" Z"};b.prototype._handleDrag=function(a,d){var c=a.x,e=a.y,b=a.origin.x,g=a.origin.y,h;c>b?(h=
b,b=c-b):(h=c,b-=c);e>g?(c=g,e-=g):(c=e,e=g-e);switch(a.action){case "start":this._start();break;case "update":this._update(h,c,b,e);break;case "end":this._end(h,c,b,e,d)}a.stopPropagation()};b.prototype._redraw=function(){if(this._rafId&&(this._rafId=null,this._overlay)){var a=this._box,b=a.x,c=a.y,e=a.width,a=a.height;this._updateBox(b,c,e,a);this._updateBackground(b,c,e,a);this._rafId=requestAnimationFrame(this._redraw)}};k([g.property()],b.prototype,"navigation",void 0);k([g.property()],b.prototype,
"view",null);return b=k([g.subclass("esri.views.2d.navigation.ZoomBox")],b)}(g.declared(n))});