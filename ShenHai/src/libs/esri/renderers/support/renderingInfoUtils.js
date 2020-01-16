// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/generatorHelper ../../core/tsSupport/awaiterHelper ../../Color ../../core/maybe ../visualVariables/support/visualVariableUtils".split(" "),function(A,f,y,n,u,z,k,v){function p(c,b){if(!c||c.symbol)return null;b=b&&b.renderer;return c&&k.isSome(b)&&b.getObservationRenderer?b.getObservationRenderer(c):b}function w(c,b){if(k.isSome(c.symbol))return c.symbol;var a=p(c,b);return k.isSome(a)?a.getSymbol(c,b):null}function x(c,
b){return u(this,void 0,void 0,function(){var a;return n(this,function(e){if(k.isSome(c.symbol))return[2,c.symbol];a=p(c,b);return[2,k.isSome(a)&&a.getSymbolAsync(c,y({},b,{abortOptions:{signal:b.signal}}))]})})}Object.defineProperty(f,"__esModule",{value:!0});f.getRenderer=p;f.getSymbol=w;f.getRenderingInfo=function(c,b){var a=p(c,b),e=w(c,b);if(!e)return null;e={renderer:a,symbol:e};if(k.isNone(a)||!("visualVariables"in a)||!a.visualVariables)return e;var d=["proportional","proportional","proportional"],
f=0;for(c=v.getVisualVariableValues(a,c,b);f<c.length;f++)switch(a=c[f],b=a.variable,a=a.value,b.type){case "color":e.color=a.toRgba();break;case "size":if("outline"===b.target)e.outlineSize=a;else switch(a=b.useSymbolValue?"symbolValue":a,b.axis){case "width":d[0]=a;break;case "depth":d[1]=a;break;case "height":d[2]=a;break;case "width-and-depth":d[0]=d[1]=a;break;default:d[0]=d[1]=d[2]=a}break;case "opacity":e.opacity=a;break;case "rotation":switch(b.axis){case "tilt":e.tilt=a;break;case "roll":e.roll=
a;break;default:e.heading=a}}if(isFinite(d[0])||isFinite(d[1])||isFinite(d[2]))e.size=d;return e};f.getSymbolAsync=x;f.getRenderingInfoAsync=function(c,b){return u(this,void 0,void 0,function(){var a,e,d,f,g,k,r,t,h,l,q,m;return n(this,function(n){switch(n.label){case 0:return a=p(c,b),[4,x(c,b)];case 1:e=n.sent();if(!e)return[2,null];d={renderer:a,symbol:e};if(!(a&&"visualVariables"in a&&a.visualVariables))return[2,d];f=v.getVisualVariableValues(a,c,b);g=["proportional","proportional","proportional"];
k=0;for(r=f;k<r.length;k++)t=r[k],h=t.variable,l=t.value,"color"===h.type?d.color=z.toUnitRGBA(l):"size"===h.type?"outline"===h.target?d.outlineSize=l:(q=h.axis,m=h.useSymbolValue?"symbolValue":l,"width"===q?g[0]=m:"depth"===q?g[1]=m:"height"===q?g[2]=m:g[0]="width-and-depth"===q?g[1]=m:g[1]=g[2]=m):"opacity"===h.type?d.opacity=l:"rotation"===h.type&&"tilt"===h.axis?d.tilt=l:"rotation"===h.type&&"roll"===h.axis?d.roll=l:"rotation"===h.type&&(d.heading=l);if(isFinite(g[0])||isFinite(g[1])||isFinite(g[2]))d.size=
g;return[2,d]}})})};f.getDriverAxisSizeValue=function(c,b){void 0===b&&(b=0);c=c[b];return"number"===typeof c&&isFinite(c)?c:null}});