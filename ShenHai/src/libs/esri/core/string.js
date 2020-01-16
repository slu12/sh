// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","./object","@dojo/framework/shim/string"],function(g,a,e,d){Object.defineProperty(a,"__esModule",{value:!0});var f=/\{([^\}]+)\}/g;a.endsWith=d.endsWith;a.startsWith=d.startsWith;a.replace=function(a,b){return a.replace(f,"object"===typeof b?function(a,c){return e.getDeepValue(c,b)}:function(a,c){return b(c)})};a.escapeRegExpString=function(a){return a.replace(/([\.$?*|{}\(\)\[\]\\\/\+\-^])/g,function(a){return"\\"+a})};a.numericHash=function(a){for(var b=0,c=0;c<a.length;c++)b=
(b<<5)-b+a.charCodeAt(c),b|=0;return b}});