// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/Collection ../core/lang ../core/accessorSupport/decorators ./LineSymbol3DLayer ./PathSymbol3DLayer ./Symbol3D".split(" "),function(p,q,l,e,b,f,c,g,h,m){var k=b.ofType({base:null,key:"type",typeMap:{line:g,path:h}}),n=b.ofType({base:null,key:"type",typeMap:{line:g,path:h}});return function(b){function a(a){a=b.call(this,a)||this;a.symbolLayers=new k;a.type="line-3d";return a}l(a,b);d=a;a.prototype.clone=
function(){return new d({styleOrigin:f.clone(this.styleOrigin),symbolLayers:f.clone(this.symbolLayers),thumbnail:f.clone(this.thumbnail)})};a.fromSimpleLineSymbol=function(a){return new d({symbolLayers:[g.fromSimpleLineSymbol(a)]})};var d;e([c.property({type:k,json:{type:n}})],a.prototype,"symbolLayers",void 0);e([c.enumeration.serializable()({LineSymbol3D:"line-3d"})],a.prototype,"type",void 0);return a=d=e([c.subclass("esri.symbols.LineSymbol3D")],a)}(c.declared(m))});