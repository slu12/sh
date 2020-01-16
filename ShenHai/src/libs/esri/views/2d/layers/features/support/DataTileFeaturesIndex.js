// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../../core/SetPool","../../../../../layers/graphics/data/FeatureStore","./Tile"],function(k,l,g,n,m){Object.defineProperty(l,"__esModule",{value:!0});var f=[],h=new Set;k=function(){function d(){this._tileById=new Map;this._tilesToFeatures=new Map;this._featureToTiles=new Map}d.prototype.destroy=function(){this.clear()};d.prototype.add=function(a){var c=this;this.has(a.id)||(this._tileById.set(a.id,a),this._tilesToFeatures.set(a,g.default.acquire()),this._tilesToFeatures.forEach(function(e,
b){a!==b&&(m.isParentOf(a,b)?e.forEach(function(b){c._link(a,b)}):m.isChildOf(a,b)&&c.featureStore.forEachInBounds(a.bounds,function(b){e.has(b.objectId)&&c._link(a,b.objectId)}))}))};d.prototype.clear=function(){this._tilesToFeatures.forEach(function(a){return g.default.release(a)});this._tilesToFeatures.clear();this._featureToTiles.forEach(function(a){return g.default.release(a)});this._featureToTiles.clear();this._tileById.clear()};d.prototype.delete=function(a){var c=this,e=this.get(a.id);f.length=
0;this._tilesToFeatures.get(e).forEach(function(a){var b=c._featureToTiles.get(a);b.has(e)&&1===b.size?f.push(a):c._unlink(e,a)});for(a=0;a<f.length;a++)this._unlink(e,f[a]);this.featureStore.removeManyById(f);this._tilesToFeatures.delete(e);this._tileById.delete(e.id);f.length=0};d.prototype.forEach=function(a,c){return this._tileById.forEach(a,c)};d.prototype.get=function(a){return this._tileById.get(a)};d.prototype.has=function(a){return this._tileById.has(a)};d.prototype.setTileFeatures=function(a,
c){var e=this,b=this.get(a.id);this._tilesToFeatures.has(b)||(this._tileById.set(b.id,b),this._tilesToFeatures.set(b,g.default.acquire()));for(a=0;a<c.length;a++)h.add(c[a].objectId);f.length=0;this._tilesToFeatures.get(b).forEach(function(a){if(!h.has(a)){var c=e._featureToTiles.get(a);c.has(b)&&1===c.size?f.push(a):e._unlink(b,a)}});for(a=0;a<f.length;a++)this._unlink(b,f[a]);this.featureStore.removeManyById(f);this.featureStore.addMany(c);h.forEach(function(a){e._link(b,a)});h.clear();f.length=
0};d.prototype.addOrUpdateFeatures=function(a){for(var c=this,e=new Set,b=new n.default({geometryType:this.featureStore.geometryType,hasM:this.featureStore.hasM,hasZ:this.featureStore.hasZ}),d=0,f=this.deleteFeaturesById(a.map(function(a){return a.objectId}));d<f.length;d++)e.add(f[d]);b.addMany(a);this._tileById.forEach(function(a){b.forEachInBounds(a.bounds,function(b){c._link(a,b.objectId);e.add(a)})});this.featureStore.addMany(a);var g=[];e.forEach(function(a){return g.push(a)});return g};d.prototype.deleteFeaturesById=
function(a){for(var c=this,e=new Set,b=function(a){var b=d._featureToTiles.get(a);b&&(b.forEach(function(b){e.add(b);c._tilesToFeatures.get(b).delete(a)}),g.default.release(b),d._featureToTiles.delete(a))},d=this,f=0;f<a.length;f++)b(a[f]);this.featureStore.removeManyById(a);var h=[];e.forEach(function(a){return h.push(a)});return h};d.prototype._link=function(a,c){this._featureToTiles.get(c)||this._featureToTiles.set(c,g.default.acquire());this._featureToTiles.get(c).add(a);this._tilesToFeatures.get(a).add(c)};
d.prototype._unlink=function(a,c){this._featureToTiles.get(c).delete(a);this._tilesToFeatures.get(a).delete(c);0===this._featureToTiles.get(c).size&&(g.default.release(this._featureToTiles.get(c)),this._featureToTiles.delete(c))};return d}();l.default=k});