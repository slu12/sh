// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Collection ../../core/lang ../../core/accessorSupport/decorators ./BuildingFilterAuthoringInfo ./BuildingFilterAuthoringInfoBlock".split(" "),function(n,p,f,c,g,h,b,k,l){var m=g.ofType(l);return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.type="checkbox";return a}f(a,d);e=a;a.prototype.clone=function(){return new e({filterBlocks:h.clone(this.filterBlocks)})};
var e;c([b.property({type:["checkbox"]})],a.prototype,"type",void 0);c([b.property({type:m,json:{write:!0}})],a.prototype,"filterBlocks",void 0);return a=e=c([b.subclass("esri.layers.support.BuildingFilterAuthoringInfoCheckbox")],a)}(b.declared(k))});