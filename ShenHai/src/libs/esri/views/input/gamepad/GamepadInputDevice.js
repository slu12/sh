// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/accessorSupport/decorators".split(" "),function(l,m,f,d,g,c){var h=/^(3dconnexion|space(mouse|navigator|pilot|explorer))/i,k={standard:.15,spacemouse:.025,unknown:0};return function(e){function a(a){var b=e.call(this)||this;b.nativeIndex=null;b._detectedDeviceType="unknown";"standard"===a.mapping?b._detectedDeviceType="standard":h.test(a.id)?b._detectedDeviceType=
"spacemouse":b._detectedDeviceType="unknown";b.nativeIndex=a.index;return b}f(a,e);Object.defineProperty(a.prototype,"native",{get:function(){return(navigator.getGamepads?navigator.getGamepads():[])[this.nativeIndex]},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"deviceType",{get:function(){return this._detectedDeviceType},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"axisThreshold",{get:function(){return k[this.deviceType]},enumerable:!0,configurable:!0});
d([c.property({nonNullable:!0,readOnly:!0})],a.prototype,"nativeIndex",void 0);d([c.property({type:String,readOnly:!0})],a.prototype,"deviceType",null);d([c.property({type:Number,readOnly:!0})],a.prototype,"axisThreshold",null);return a=d([c.subclass("esri.views.input.gamepad.GamepadInputDevice")],a)}(c.declared(g))});