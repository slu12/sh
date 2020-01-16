// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(c,d){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function a(b){this.gain=b}a.prototype.update=function(b){if(this.hasLastValue){var a=this.computeDelta(b);this.updateDelta(a)}this.lastValue=b};a.prototype.reset=function(){this.filteredDelta=this.lastValue=void 0};Object.defineProperty(a.prototype,"hasLastValue",{get:function(){return void 0!==this.lastValue},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"hasFilteredDelta",
{get:function(){return void 0!==this.filteredDelta},enumerable:!0,configurable:!0});a.prototype.computeDelta=function(a){return a-this.lastValue};a.prototype.updateDelta=function(a){this.filteredDelta=this.hasFilteredDelta?(1-this.gain)*this.filteredDelta+this.gain*a:a};return a}();d.FilteredFiniteDifference=c});