// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/assignHelper ../core/tsSupport/generatorHelper ../core/tsSupport/awaiterHelper ../core/accessorSupport/decorators ./Layer ./mixins/ScaleRangeLayer ../support/GraphicsCollection ../symbols/support/ElevationInfo".split(" "),function(m,n,g,d,p,q,r,c,h,k,e,l){return function(f){function b(a){a=f.call(this,a)||this;a.elevationInfo=null;a.graphics=new e.default;a.screenSizePerspectiveEnabled=
!0;a.type="graphics";return a}g(b,f);b.prototype.destroy=function(){this.removeAll()};b.prototype.add=function(a){this.graphics.add(a);return this};b.prototype.addMany=function(a){this.graphics.addMany(a);return this};b.prototype.removeAll=function(){this.graphics.removeAll();return this};b.prototype.remove=function(a){this.graphics.remove(a)};b.prototype.removeMany=function(a){this.graphics.removeMany(a)};b.prototype.on=function(a,b){return this.inherited(arguments,[a,b])};b.prototype.graphicChanged=
function(a){this.emit("graphic-update",a)};d([c.property({type:l})],b.prototype,"elevationInfo",void 0);d([c.property(e.graphicsCollectionProperty)],b.prototype,"graphics",void 0);d([c.property({type:["show","hide"]})],b.prototype,"listMode",void 0);d([c.property()],b.prototype,"screenSizePerspectiveEnabled",void 0);d([c.property({readOnly:!0})],b.prototype,"type",void 0);return b=d([c.subclass("esri.layers.GraphicsLayer")],b)}(c.declared(k.ScaleRangeLayer(h)))});