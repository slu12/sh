// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/decorateHelper ../../core/tsSupport/declareExtendsHelper ../../Color ../../core/lang ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType ./ColorRamp".split(" "),function(m,n,c,k,e,f,b,g,l){return function(h){function a(a){a=h.call(this,a)||this;a.algorithm=null;a.fromColor=null;a.toColor=null;a.type="algorithmic";return a}k(a,h);d=a;a.prototype.clone=function(){return new d({fromColor:f.clone(this.fromColor),toColor:f.clone(this.toColor),
algorithm:this.algorithm})};var d;c([b.enumeration.serializable()({esriCIELabAlgorithm:"cie-lab",esriHSVAlgorithm:"hsv",esriLabLChAlgorithm:"lab-lch"})],a.prototype,"algorithm",void 0);c([b.property({type:e,json:{type:[g.Integer],write:!0}})],a.prototype,"fromColor",void 0);c([b.property({type:e,json:{type:[g.Integer],write:!0}})],a.prototype,"toColor",void 0);c([b.property({type:["algorithmic"]})],a.prototype,"type",void 0);return a=d=c([b.subclass("esri.tasks.support.AlgorithmicColorRamp")],a)}(b.declared(l))});