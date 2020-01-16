// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/Handles ../../../../core/watchUtils ../../state/controllers/GamepadKeyboardController ../../../input/InputHandler".split(" "),function(e,f,h,k,l,g,m){Object.defineProperty(f,"__esModule",{value:!0});e=function(d){function c(b){var a=d.call(this,!0)||this;a.view=b;a.watchHandles=new k;a.handle=a.registerIncoming("gamepad",function(b){return a.handleEventGamepad(b)});a.handle.pause();return a}h(c,d);c.prototype.onInstall=
function(b){var a=this;d.prototype.onInstall.call(this,b);this.watchHandles.add([l.init(this.view.navigation.gamepad,"enabled",function(b){b?a.handle.resume():(a.handle.pause(),a.cameraControllerGamepad&&(a.cameraControllerGamepad.finishController(),a.cameraControllerGamepad=null))}),this.view.navigation.gamepad.watch("device",function(b){a.cameraControllerGamepad&&b&&a.cameraControllerGamepad.gamepadDevice!==b&&(a.cameraControllerGamepad.finishController(),a.cameraControllerGamepad=null)})])};c.prototype.onUninstall=
function(){this.watchHandles.removeAll();d.prototype.onUninstall.call(this)};c.prototype.handleEventGamepad=function(b){var a=this.view.navigation.gamepad.device;if(!a||b.data.device===a)if((a=this.cameraControllerGamepad&&this.cameraControllerGamepad.active)||g.GamepadKeyboardController.activatesFor(this.view,b.data))a||(a=new g.GamepadKeyboardController(this.view,b.data.device),this.view.state.switchCameraController(a)&&(this.cameraControllerGamepad=a)),this.cameraControllerGamepad&&this.cameraControllerGamepad.active&&
this.cameraControllerGamepad.gamepadDevice===b.data.device&&this.cameraControllerGamepad.handleEventGamepad(b.data)};return c}(m.InputHandler);f.GamepadNavigation=e});