// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../core/tsSupport/extendsHelper","./ImmutableArray","../geometry/Point"],function(l,m,h,k,d){return function(g){function c(a,b,c,e,f,d){a=g.call(this,a)||this;a._lazyPt=[];a._hasZ=!1;a._hasM=!1;a._spRef=b;a._hasZ=c;a._hasM=e;a._cacheId=f;a._partId=d;return a}h(c,g);c.prototype.get=function(a){if(void 0===this._lazyPt[a]){var b=this._elements[a];if(void 0===b)return;var c=this._hasZ,e=this._hasM,f=null,f=c&&!e?new d(b[0],b[1],b[2],void 0,this._spRef):e&&c?new d(b[0],b[1],
void 0,b[2],this._spRef):c&&e?new d(b[0],b[1],b[2],b[3],this._spRef):new d(b[0],b[1],this._spRef);f.cache._arcadeCacheId=this._cacheId.toString()+"-"+this._partId.toString()+"-"+a.toString();this._lazyPt[a]=f}return this._lazyPt[a]};c.prototype.equalityTest=function(a){return a===this?!0:null===a||!1===a instanceof c?!1:a.getUniqueHash()===this.getUniqueHash()};c.prototype.getUniqueHash=function(){return this._cacheId.toString()+"-"+this._partId.toString()};return c}(k)});