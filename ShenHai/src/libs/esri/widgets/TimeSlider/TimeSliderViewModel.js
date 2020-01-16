// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../TimeExtent ../../TimeInterval ../../core/Accessor ../../core/compilerUtils ../../core/mathUtils ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType ../../layers/support/timeUtils".split(" "),function(t,u,m,e,f,h,n,p,q,d,k,r){return function(l){function c(a){a=l.call(this,a)||this;a.fullTimeExtent=null;a.loop=!0;a.mode="time-window";a.stops={count:10};a.timerId=null;a.view=
null;return a}m(c,l);c.prototype.destroy=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)};Object.defineProperty(c.prototype,"effectiveStops",{get:function(){var a=this.fullTimeExtent,b=this.stops;if(!b)return[];if("dates"in b){b=b.dates;if(null==b||0===b.length)return null;b=b.sort(function(a,b){return a.getTime()-b.getTime()});return a?b.filter(function(b){var c=a.start,g=a.end;return!(b.getTime()<c.getTime()||b.getTime()>g.getTime())}):b}if("count"in b){var c=b.timeExtent||
a;return this._divideTimeExtentByCount(c,b.count)}return"interval"in b?(c=b.timeExtent||a,this._divideTimeExtentByInterval(c,b.interval)):[]},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"playRate",{set:function(a){0>=a||36E5<a||("playing"===this.state&&this._startAnimation(),this._set("playRate",a))},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"state",{get:function(){return this.values&&this.fullTimeExtent?this.timerId?"playing":"ready":"disabled"},enumerable:!0,
configurable:!0});Object.defineProperty(c.prototype,"timeExtent",{get:function(){var a=this.mode,b=this.values;if(!b||0===b.length)return null;switch(a){case "instant":return new f({start:b[0],end:b[0]});case "time-window":return 1<b.length?new f({start:b[0],end:b[1]}):null;case "cumulative-from-start":return new f({start:null,end:b[0]});case "cumulative-from-end":return new f({start:b[0],end:null});default:p.neverReached(a)}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"values",
{set:function(a){var b=this.fullTimeExtent,c=this.view;if(b){var g=b.end,d=b.start.getTime(),e=g.getTime();a=a&&a.filter(function(a){return a}).map(function(a){a=a.getTime();a=q.clamp(a,d,e);return new Date(a)})}c&&(c.timeExtent=this._toTimeExtent(a));this._set("values",a)},enumerable:!0,configurable:!0});c.prototype.next=function(){this.values&&this.fullTimeExtent&&this._step(!0)};c.prototype.play=function(){this._clearAnimation();this._startAnimation()};c.prototype.previous=function(){this._step(!1)};
c.prototype.stop=function(){this._clearAnimation()};c.prototype._clearAnimation=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)};c.prototype._startAnimation=function(){var a=this;this._step();this.timerId=setInterval(function(){a._step()},this.playRate)};c.prototype._step=function(a){void 0===a&&(a=!0);var b=this.effectiveStops,c=this.values;if(c&&0!==c.length&&!(c.length>b.length)){var g=b.map(function(a){return a.getTime()}).sort(function(a,b){return a-b}),b=c.map(function(a){return a.getTime()}).map(function(a){var b=
g.indexOf(a);if(-1!==b)return b;b=g.reduce(function(b,c){return Math.abs(c-a)<Math.abs(b-a)?c:b});return g.indexOf(b)}),c=b.map(function(b){return b+=a?1:-1}),d=c.some(function(a){return 0>a||a>g.length-1}),e=this.loop,f=this.state;if(d)if(e){var h=Math.min.apply(Math,b),k=Math.max.apply(Math,b);this.values=(a?b.map(function(a){return a-h}):b.map(function(a){return a+(g.length-1-k)})).map(function(a){return new Date(g[a])})}else"playing"===f&&this.stop();else this.values=c.map(function(a){return new Date(g[a])})}};
c.prototype._divideTimeExtentByCount=function(a,b){void 0===b&&(b=10);if(!a||!b)return[];var c=a.start,d=a.end;if(!c||!d)return[];b=Math.floor((d.getTime()-c.getTime())/b);b=new h({value:b});return this._divideTimeExtentByInterval(a,b)};c.prototype._divideTimeExtentByInterval=function(a,b,c){void 0===c&&(c=1E4);if(!a||!b)return[];var d=a.start,e=a.end;if(!d||!e)return[];var f=e.getTime()-d.getTime(),h=b.toMilliseconds();if(f/h>c)return this._divideTimeExtentByCount(a);a=[];c=b.value;for(b=b.unit;d.getTime()<=
e.getTime();)a.push(new Date(d.getTime())),d=r.offsetDate(d,c,b);return a};c.prototype._toTimeExtent=function(a){if(!a||0===a.length)return null;var b=a[0];a=1<a.length?a[1]:a[0];switch(this.mode){case "instant":case "time-window":return new f({start:b,end:a});case "cumulative-from-start":return new f({start:null,end:b});case "cumulative-from-end":return new f({start:b,end:null});default:return null}};e([d.property({dependsOn:["stops","fullTimeExtent"],readOnly:!0})],c.prototype,"effectiveStops",
null);e([d.property({type:f})],c.prototype,"fullTimeExtent",void 0);e([d.property({nonNullable:!0})],c.prototype,"loop",void 0);e([d.property({nonNullable:!0})],c.prototype,"mode",void 0);e([d.property({nonNullable:!0,value:1E3})],c.prototype,"playRate",null);e([d.property({dependsOn:["fullTimeExtent","timerId","values"],readOnly:!0})],c.prototype,"state",null);e([d.property({cast:function(a){if(!a)return null;"interval"in a&&(a.interval=k.ensureType(h,a.interval));"timeExtent"in a&&(a.timeExtent=
k.ensureType(f,a.timeExtent));return a}})],c.prototype,"stops",void 0);e([d.property({dependsOn:["values"],readOnly:!0})],c.prototype,"timeExtent",null);e([d.property()],c.prototype,"timerId",void 0);e([d.property({value:null})],c.prototype,"values",null);e([d.property()],c.prototype,"view",void 0);e([d.property()],c.prototype,"next",null);e([d.property()],c.prototype,"play",null);e([d.property()],c.prototype,"previous",null);e([d.property()],c.prototype,"stop",null);return c=e([d.subclass("esri.widgets.TimeSlider.TimeSliderViewModel")],
c)}(d.declared(n))});