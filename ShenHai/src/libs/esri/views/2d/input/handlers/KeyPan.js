// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(c,f,g,h){Object.defineProperty(f,"__esModule",{value:!0});c=function(c){function a(k,d,a){var e,b=c.call(this,!0)||this;b.view=k;b.keys=d;b._pressed=!1;b._keyMap=(e={},e[d.left]="left",e[d.right]="right",e[d.up]="up",e[d.down]="down",e);b.registerIncoming("key-down",a,function(a){return b._handleKeyDown(a)});b.registerIncoming("key-up",a,function(a){return b._handleKeyUp(a)});b.registerIncoming("blur",
a,function(){return b._handleBlur()});return b}g(a,c);a.prototype._handleKeyDown=function(a){a.data.repeat||this._handleKey(a,!0)};a.prototype._handleKeyUp=function(a){this._handleKey(a,!1)};a.prototype._handleBlur=function(){this._pressed&&(this._pressed=!1,this.view.mapViewNavigation.stop())};a.prototype._handleKey=function(a,d){var c=this._keyMap[a.data.key];if(this._pressed=null!=c){if(d)switch(this.view.mapViewNavigation.begin(),c){case "left":this.view.mapViewNavigation.continousPanLeft();break;
case "right":this.view.mapViewNavigation.continousPanRight();break;case "up":this.view.mapViewNavigation.continousPanUp();break;case "down":this.view.mapViewNavigation.continousPanDown()}else this._pressed=!1,this.view.mapViewNavigation.stop();a.stopPropagation()}};return a}(h.InputHandler);f.KeyPan=c});