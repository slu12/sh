// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/declareExtendsHelper ../../../core/accessorSupport/decorators ./ClipArea".split(" "),function(h,k,c,f,b,g){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.type="rect";a.left=null;a.right=null;a.top=null;a.bottom=null;return a}f(a,d);e=a;a.prototype.clone=function(){return new e({left:this.left,right:this.right,top:this.top,bottom:this.bottom})};Object.defineProperty(a.prototype,"version",
{get:function(){return(this._get("version")||0)+1},enumerable:!0,configurable:!0});var e;c([b.property({type:[Number,String],json:{write:!0}})],a.prototype,"left",void 0);c([b.property({type:[Number,String],json:{write:!0}})],a.prototype,"right",void 0);c([b.property({type:[Number,String],json:{write:!0}})],a.prototype,"top",void 0);c([b.property({type:[Number,String],json:{write:!0}})],a.prototype,"bottom",void 0);c([b.property({readOnly:!0,dependsOn:["left","right","top","bottom"]})],a.prototype,
"version",null);return a=e=c([b.subclass("esri.views.layers.support.ClipRect")],a)}(b.declared(g))});