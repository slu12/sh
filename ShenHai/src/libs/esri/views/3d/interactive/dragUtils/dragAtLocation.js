// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/assignHelper ../../../../core/mathUtils ../../../../core/maybe ../../../../core/screenUtils".split(" "),function(p,c,l,g,e,m){Object.defineProperty(c,"__esModule",{value:!0});c.dragAtLocation=function(d,c,n){if(e.isNone(c))return null;var a=null,h=0,k=0;return function(b){"start"===b.action&&(a=d.toScreen(n),0>a.x||a.x>d.width||0>a.y||a.y>d.height?a=null:(h=b.start.x-a.x,k=b.start.y-a.y));if(null==a)return null;var f=g.clamp(b.screenPoint.x-h,0,d.width),
e=g.clamp(b.screenPoint.y-k,0,d.height),f=m.createScreenPoint(f,e);return c(l({},b,{start:a,screenPoint:f}))}}});