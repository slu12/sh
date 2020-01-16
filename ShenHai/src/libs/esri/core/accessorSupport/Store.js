// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../arrayUtils"],function(c,d,e){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function a(){this._values=new Map}a.prototype.get=function(b){return this._values.get(b)};a.prototype.originOf=function(){return 6};a.prototype.keys=function(){return e.keysOfMap(this._values)};a.prototype.set=function(b,a){this._values.set(b,a)};a.prototype.delete=function(a){this._values.delete(a)};a.prototype.has=function(a){return this._values.has(a)};a.prototype.forEach=
function(a){this._values.forEach(a)};return a}();d.Store=c});