// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/lang ../../core/accessorSupport/decorators ./PointCloudFilter".split(" "),function(k,l,g,c,e,b,h){return function(f){function a(a){a=f.call(this,a)||this;a.requiredClearBits=null;a.requiredSetBits=null;a.type="bitfield";return a}g(a,f);d=a;a.prototype.clone=function(){return new d({field:this.field,requiredClearBits:e.clone(this.requiredClearBits),requiredSetBits:e.clone(this.requiredSetBits)})};
var d;c([b.property({type:[Number],json:{write:{enabled:!0,overridePolicy:function(){return{enabled:!0,isRequired:!this.requiredSetBits}}}}})],a.prototype,"requiredClearBits",void 0);c([b.property({type:[Number],json:{write:{enabled:!0,overridePolicy:function(){return{enabled:!0,isRequired:!this.requiredClearBits}}}}})],a.prototype,"requiredSetBits",void 0);c([b.property({type:["bitfield"],json:{type:["pointCloudBitfieldFilter"]}})],a.prototype,"type",void 0);return a=d=c([b.subclass("esri.layers.pointCloudFilters.PointCloudBitfieldFilter")],
a)}(b.declared(h))});