// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../Color ../core/lang ../core/screenUtils ../core/accessorSupport/decorators ./Font ./Symbol".split(" "),function(p,q,m,c,f,e,g,d,k,n){return function(l){function b(a,b,d){a=l.call(this,a)||this;a.backgroundColor=null;a.borderLineColor=null;a.borderLineSize=null;a.font=new k;a.horizontalAlignment="center";a.kerning=!0;a.haloColor=null;a.haloSize=null;a.rightToLeft=null;a.rotated=!1;a.text="";a.type="text";
a.verticalAlignment=null;a.xoffset=0;a.yoffset=0;a.angle=0;a.width=null;return a}m(b,l);h=b;b.prototype.normalizeCtorArgs=function(a,b,d){if(a&&"string"!==typeof a)return a;var c={};a&&(c.text=a);b&&(c.font=b);d&&(c.color=d);return c};b.prototype.clone=function(){return new h({angle:this.angle,backgroundColor:e.clone(this.backgroundColor),borderLineColor:e.clone(this.borderLineColor),borderLineSize:this.borderLineSize,color:e.clone(this.color),font:this.font&&this.font.clone(),haloColor:e.clone(this.haloColor),
haloSize:this.haloSize,horizontalAlignment:this.horizontalAlignment,kerning:this.kerning,rightToLeft:this.rightToLeft,rotated:this.rotated,text:this.text,verticalAlignment:this.verticalAlignment,width:this.width,xoffset:this.xoffset,yoffset:this.yoffset})};var h;c([d.property({type:f,json:{write:!0}})],b.prototype,"backgroundColor",void 0);c([d.property({type:f,json:{write:!0}})],b.prototype,"borderLineColor",void 0);c([d.property({type:Number,json:{write:!0}})],b.prototype,"borderLineSize",void 0);
c([d.property({type:k,json:{write:!0}})],b.prototype,"font",void 0);c([d.property({type:["left","right","center","justify"],json:{write:!0}})],b.prototype,"horizontalAlignment",void 0);c([d.property({type:Boolean,json:{write:!0}})],b.prototype,"kerning",void 0);c([d.property({type:f,json:{write:!0}})],b.prototype,"haloColor",void 0);c([d.property({type:Number,cast:g.toPt,json:{write:!0}})],b.prototype,"haloSize",void 0);c([d.property({type:Boolean,json:{write:!0}})],b.prototype,"rightToLeft",void 0);
c([d.property({type:Boolean,json:{write:!0}})],b.prototype,"rotated",void 0);c([d.property({type:String,json:{write:!0}})],b.prototype,"text",void 0);c([d.property({type:String,readOnly:!0})],b.prototype,"type",void 0);c([d.property({type:["baseline","top","middle","bottom"],json:{write:!0}})],b.prototype,"verticalAlignment",void 0);c([d.property({type:Number,cast:g.toPt,json:{write:!0}})],b.prototype,"xoffset",void 0);c([d.property({type:Number,cast:g.toPt,json:{write:!0}})],b.prototype,"yoffset",
void 0);c([d.property({type:Number,json:{read:function(a){return a&&-1*a},write:function(a,b){return b.angle=a&&-1*a}}})],b.prototype,"angle",void 0);c([d.property({type:Number,json:{write:!0}})],b.prototype,"width",void 0);return b=h=c([d.subclass("esri.symbols.TextSymbol")],b)}(d.declared(n))});