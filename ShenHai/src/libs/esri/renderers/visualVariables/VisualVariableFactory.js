// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/jsonMap ../../core/Logger ../../core/Warning ../../core/accessorSupport/decorators ./ColorVariable ./OpacityVariable ./RotationVariable ./SizeVariable".split(" "),function(z,A,k,h,l,m,n,p,f,q,r,t,u){var v=n.getLogger("esri.renderers.visualVariables.VisualVariableFactory"),w={color:q,size:u,opacity:r,rotation:t},x=new m.default({colorInfo:"color",transparencyInfo:"opacity",
rotationInfo:"rotation",sizeInfo:"size"}),y=/^\[([^\]]+)\]$/i;return function(g){function d(){var a=null!==g&&g.apply(this,arguments)||this;a.colorVariables=null;a.opacityVariables=null;a.rotationVariables=null;a.sizeVariables=null;return a}k(d,g);Object.defineProperty(d.prototype,"visualVariables",{set:function(a){this._resetVariables();if((a=a&&a.filter(function(a){return!!a}))&&a.length){for(var c=0,e=a;c<e.length;c++){var b=e[c];switch(b.type){case "color":this.colorVariables.push(b);break;case "opacity":this.opacityVariables.push(b);
break;case "rotation":this.rotationVariables.push(b);break;case "size":this.sizeVariables.push(b)}}this.sizeVariables.length&&this.sizeVariables.some(function(a){return!!a.target})&&a.sort(function(a,b){var c=null;return c=a.target===b.target?0:a.target?1:-1});for(c=0;c<a.length;c++)b=a[c],b.index=c}this._set("visualVariables",a)},enumerable:!0,configurable:!0});d.prototype.readVariables=function(a,c,e){var b=c.rotationExpression;c=c.rotationType;if(b=(b=b&&b.match(y))&&b[1])a||(a=[]),a.push({type:"rotationInfo",
rotationType:c,field:b});if(a)return a.map(function(a){var b=x.read(a.type),c=w[b];c||(v.warn("Unknown variable type: "+b),e&&e.messages&&e.messages.push(new p("visual-variable:unsupported","visualVariable of type '"+b+"' is not supported",{definition:a,context:e})));b=new c;b.read(a,e);return b})};d.prototype.writeVariables=function(a,c){for(var e=[],b=0;b<a.length;b++){var d=a[b].toJSON(c);d&&e.push(d)}return e};d.prototype._resetVariables=function(){this.colorVariables=[];this.opacityVariables=
[];this.rotationVariables=[];this.sizeVariables=[]};h([f.property()],d.prototype,"visualVariables",null);return d=h([f.subclass("esri.renderers.visualVariables.VisualVariableFactory")],d)}(f.declared(l))});