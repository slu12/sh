// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(c,d){return function(){function b(){this._databaseTypeMetaData={};this._layerInfo={}}b.prototype.clearDatabaseType=function(a){void 0===this._databaseTypeMetaData[a]&&delete this._databaseTypeMetaData[a]};b.prototype.getDatabaseType=function(a){return"MUSTBESET"===a||void 0===this._databaseTypeMetaData[a]?null:this._databaseTypeMetaData[a]};b.prototype.setDatabaseType=function(a,b){this._databaseTypeMetaData[a]=b};b.prototype.getLayerInfo=function(a){return void 0===
this._layerInfo[a]?null:this._layerInfo[a]};b.prototype.setLayerInfo=function(a,b){this._layerInfo[a]=b};b.prototype.clearLayerInfo=function(a){void 0!==this._layerInfo[a]&&delete this._layerInfo[a]};b.applicationCache=null;return b}()});