// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/tsSupport/generatorHelper ../../core/tsSupport/awaiterHelper ../../core/Accessor ../../core/accessorSupport/decorators".split(" "),function(u,v,n,h,p,q,r,d){function l(c,a){var f=t,b=f.length,g=[],k,m=c;c=0<=c?c:0;a=0<a?a:f[b-1].minScale;for(var e=0;e<b;e++){var d=Math.min(f[e].minScale,a);k=Math.min(d,a);c<=d&&m<a&&g.push({id:f[e].id,maxScale:Math.max(m,c),minScale:k});m=k+1}g.reverse();
0!==g.length&&(c=g[0],a=g[g.length-1],c.minScale===c.maxScale&&(g.shift(),c.minScale+=1),a.minScale===a.maxScale&&(g.pop(),--a.maxScale));return g}var t=[{id:"room",minScale:100},{id:"rooms",minScale:400},{id:"smallBuilding",minScale:800},{id:"building",minScale:1999},{id:"buildings",minScale:3999},{id:"street",minScale:7499},{id:"streets",minScale:14999},{id:"neighborhood",minScale:29999},{id:"town",minScale:59999},{id:"city",minScale:119999},{id:"cities",minScale:249999},{id:"metropolitanArea",
minScale:499999},{id:"county",minScale:999999},{id:"counties",minScale:1999999},{id:"stateProvince",minScale:3999999},{id:"statesProvinces",minScale:6999999},{id:"countriesSmall",minScale:14999999},{id:"countriesBig",minScale:34999999},{id:"continent",minScale:99999999},{id:"world",minScale:147914382}];return function(c){function a(){var b=null!==c&&c.apply(this,arguments)||this;b.ranges=[];return b}n(a,c);f=a;a.fromScaleRange=function(b){return new f({ranges:l(b.maxScale,b.minScale)})};a.fromLayer=
function(b){return q(this,void 0,void 0,function(){var a,k,c,e;return p(this,function(g){switch(g.label){case 0:return[4,b.when()];case 1:return g.sent(),(a=b.get("tileInfo.lods"))?(c=a[a.length-1].scale,e=a[0].scale,k=l(c,e)):k=l(0,0),[2,new f({ranges:k})]}})})};Object.defineProperty(a.prototype,"firstRange",{get:function(){return this.ranges[0]},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"lastRange",{get:function(){var a=this.ranges;return a[a.length-1]},enumerable:!0,configurable:!0});
Object.defineProperty(a.prototype,"length",{get:function(){return this.ranges.length},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"maxScale",{get:function(){return this.lastRange.maxScale},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"minScale",{get:function(){return this.firstRange.minScale},enumerable:!0,configurable:!0});a.prototype.isMinScaleEdge=function(a){var b=this.firstRange,c=f.RecommendedScales[b.id]||b.maxScale;return a<=b.minScale&&a>=c};a.prototype.isMaxScaleEdge=
function(a){var b=this.lastRange,c=b.maxScale;return a<=(f.RecommendedScales[b.id]||b.minScale)&&a>=c};a.prototype.findScaleRange=function(a){var b=this.ranges,c;if(a>=b[0].maxScale)return b[0];if(a<=b[b.length-1].minScale)return b[b.length-1];for(var d=0;d<b.length;d++){var e=b[d];if(a>=e.maxScale&&a<=e.minScale){c=e;break}}return c};a.prototype.findScaleRangeByIndex=function(a){return this.ranges[this._clampScaleRangeIndex(a)]};a.prototype.scaleToRangeIndex=function(a){return this.ranges.indexOf(this.findScaleRange(a))};
a.prototype.clampScale=function(a){return Math.min(this.minScale,Math.max(this.maxScale,a))};a.prototype.clampMinScale=function(a){return 0===a?this.minScale:this.clampScale(a)};a.prototype.clampMaxScale=function(a){return this.clampScale(a)};a.prototype.contains=function(a){for(var b=this.ranges,c=!1,d=0;d<b.length;d++){var e=b[d],f=e.minScale;if(a>=e.maxScale&&a<=f){c=!0;break}}return c};a.prototype._clampScaleRangeIndex=function(a){if(0>=a)return 0;var b=this.ranges.length-1;return a>b?b:Math.floor(a)};
var f;a.RecommendedScales=Object.freeze({world:147914382,continent:5E7,countriesBig:25E6,countriesSmall:12E6,statesProvinces:6E6,stateProvince:3E6,counties:15E5,county:75E4,metropolitanArea:32E4,cities:16E4,city:8E4,town:4E4,neighborhood:2E4,streets:1E4,street:5E3,buildings:2500,building:1250,smallBuilding:800,rooms:400,room:100});h([d.property({dependsOn:["ranges"]})],a.prototype,"firstRange",null);h([d.property({dependsOn:["ranges"]})],a.prototype,"lastRange",null);h([d.property({dependsOn:["ranges"]})],
a.prototype,"length",null);h([d.property({dependsOn:["lastRange"]})],a.prototype,"maxScale",null);h([d.property({dependsOn:["firstRange"]})],a.prototype,"minScale",null);h([d.property()],a.prototype,"ranges",void 0);return a=f=h([d.subclass("esri.widgets.ScaleRangeSlider.ScaleRanges")],a)}(d.declared(r))});