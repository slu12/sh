// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../Color ../../../core/JSONSupport ../../../core/screenUtils ../../../core/accessorSupport/decorators ../../../core/accessorSupport/ensureType".split(" "),function(m,n,f,c,g,h,k,b,l){return function(e){function a(a){a=e.call(this,a)||this;a.color=null;a.label=null;a.size=null;a.value=null;return a}f(a,e);d=a;a.prototype.writeValue=function(a,b,c){b[c]=null==a?0:a};a.prototype.clone=function(){return new d({color:this.color,
label:this.label,size:this.size,value:this.value})};var d;c([b.property({type:g,json:{type:[l.Integer],write:!0}})],a.prototype,"color",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"label",void 0);c([b.property({type:Number,cast:k.toPt,json:{write:!0}})],a.prototype,"size",void 0);c([b.property({type:Number,json:{write:{allowNull:!0}}})],a.prototype,"value",void 0);c([b.writer("value")],a.prototype,"writeValue",null);return a=d=c([b.subclass("esri.renderers.visualVariables.support.ColorSizeStop")],
a)}(b.declared(h.JSONSupport))});