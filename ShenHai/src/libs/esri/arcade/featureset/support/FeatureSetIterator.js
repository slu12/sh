// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/promiseUtils"],function(m,n,e){return function(){function h(a,b){this._lastId=-1;this._progress=b;this._parent=a}h.prototype.reset=function(){this._lastId=-1};h.prototype.nextBatch=function(a){var b=this;if(null!==this._parent._mainSetInUse)return this._parent._mainSetInUse.then(function(c){return b.nextBatch(a)},function(c){return b.nextBatch(a)});var c=null,g=!1,l=[],c=e.create(function(c,k){b._parent._getSet(b._progress).then(function(f){var d=f._known.length-
1;"GETPAGES"===f._known[f._known.length-1]&&--d;if(b._lastId+a<d&&0<f._known.length&&"GETPAGES"===f._known[f._known.length-1])b._parent._expandPagedSet(f,b._parent._maxQueryRate(),0,0,b._progress).then(function(c){g=!0;b._parent._mainSetInUse=null;return b.nextBatch(a)},function(a){g=!0;b._parent._mainSetInUse=null;k(a)});else if(d>=b._lastId+a||0===f._candidates.length){for(d=0;d<a;d++){var e=d+b._lastId+1;if(e>=f._known.length)break;l[d]=f._known[e]}b._lastId+=l.length;0===l.length&&(g=!0,b._parent._mainSetInUse=
null,c([]));b._parent._getFeatureBatch(l,b._progress).then(function(a){g=!0;b._parent._mainSetInUse=null;c(a)},function(a){g=!0;b._parent._mainSetInUse=null;k(a)})}else b._parent._refineSetBlock(f,b._parent._maxProcessingRate(),b._progress).then(function(){g=!0;b._parent._mainSetInUse=null;b.nextBatch(a).then(c,k)},function(a){g=!0;b._parent._mainSetInUse=null;k(a)})},function(a){g=!0;b._parent._mainSetInUse=null;k(a)})});!1===g&&(this._parent._mainSetInUse=c,g=!0);return c};h.prototype.next=function(){var a=
this;if(null!==this._parent._mainSetInUse)return this._parent._mainSetInUse.then(function(b){return a.next()},function(b){return a.next()});var b=null,c=!1,b=e.create(function(b,e){a._parent._getSet(a._progress).then(function(d){a._lastId<d._known.length-1?"GETPAGES"===d._known[a._lastId+1]?a._parent._expandPagedSet(d,a._parent._maxQueryRate(),0,0,a._progress).then(function(b){c=!0;a._parent._mainSetInUse=null;return a.next()}).then(b,e):(a._lastId+=1,a._parent._getFeature(d,d._known[a._lastId],a._progress).then(function(d){c=
!0;a._parent._mainSetInUse=null;b(d)},function(b){c=!0;a._parent._mainSetInUse=null;e(b)})):0<d._candidates.length?a._parent._refineSetBlock(d,a._parent._maxProcessingRate(),a._progress).then(function(){c=!0;a._parent._mainSetInUse=null;a.next().then(b,e)},function(b){c=!0;a._parent._mainSetInUse=null;e(b)}):(c=!0,a._parent._mainSetInUse=null,b(null))},function(b){c=!0;a._parent._mainSetInUse=null;e(b)})});!1===c&&(this._parent._mainSetInUse=b,c=!0);return b};h.prototype.count=function(){var a=this;
return-1!==this._parent._totalCount?e.resolve(this._parent._totalCount):this._parent._getSet(this._progress).then(function(b){return a._refineAllSets(b)}).then(function(b){a._parent._totalCount=b._known.length;return e.resolve(a._parent._totalCount)})};h.prototype._refineAllSets=function(a){var b=this;return 0<a._known.length&&"GETPAGES"===a._known[a._known.length-1]?this._parent._expandPagedSet(a,this._parent._maxQueryRate(),0,1,this._progress).then(function(c){return b._refineAllSets(a)}).then(function(a){return e.resolve(a)}):
0<a._candidates.length?"GETPAGES"===a._known[a._candidates.length-1]?this._parent._expandPagedSet(a,this._parent._maxQueryRate(),0,2,this._progress).then(function(c){return b._refineAllSets(a)}).then(function(a){return e.resolve(a)}):this._parent._refineSetBlock(a,this._parent._maxProcessingRate(),this._progress).then(function(a){return 0<a._candidates.length?b._refineAllSets(a):e.resolve(a)}):e.resolve(a)};return h}()});