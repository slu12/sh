// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/jsonMap ../../core/JSONSupport ../../core/Logger ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType ./support/VisualVariableLegendOptions".split(" "),function(p,q,f,c,g,h,k,b,l,m){var n=k.getLogger("esri.renderers.visualVariables.VisualVariable"),d=new g.default({colorInfo:"color",transparencyInfo:"opacity",rotationInfo:"rotation",sizeInfo:"size"});return function(e){function a(a){a=
e.call(this,a)||this;a.index=null;a.type=null;a.field=null;a.valueExpression=null;a.valueExpressionTitle=null;a.legendOptions=null;return a}f(a,e);a.prototype.castField=function(a){return null==a?a:"function"===typeof a?(n.error(".field: field must be a string value"),null):l.ensureString(a)};Object.defineProperty(a.prototype,"arcadeRequired",{get:function(){return!!this.valueExpression},enumerable:!0,configurable:!0});a.prototype.clone=function(){};a.prototype.getAttributeHash=function(){return this.type+
"-"+this.field+"-"+this.valueExpression};c([b.property()],a.prototype,"index",void 0);c([b.property({type:d.apiValues,readOnly:!0,json:{read:d.read,write:d.write}})],a.prototype,"type",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"field",void 0);c([b.cast("field")],a.prototype,"castField",null);c([b.property({type:String,json:{write:!0}})],a.prototype,"valueExpression",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"valueExpressionTitle",void 0);c([b.property({readOnly:!0,
dependsOn:["valueExpression"]})],a.prototype,"arcadeRequired",null);c([b.property({type:m,json:{write:!0}})],a.prototype,"legendOptions",void 0);return a=c([b.subclass("esri.renderers.visualVariables.VisualVariable")],a)}(b.declared(h.JSONSupport))});