// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Logger ../../core/unitFormatUtils ../../core/unitUtils ../../core/unitUtils ../../core/accessorSupport/decorators ./DistanceMeasurement2DTool ../support/commonProperties ../support/InteractiveToolViewModel".split(" "),function(t,u,l,d,m,e,n,f,c,g,p,q){var r={handleWidth:8,handleColor:[255,128,0,.5],pathWidth:5,pathPrimaryColor:[255,128,0,1],pathSecondaryColor:[255,255,255,1]},h=m.getLogger("esri.widgets.DistanceMeasurement2D.DistanceMeasurement2DViewModel");
return function(k){function b(a){a=k.call(this,a)||this;a.supportedViewType="2d";a.geodesicDistanceThreshold=1E5;a.measurement=null;a.palette=r;a.tool=null;return a}l(b,k);Object.defineProperty(b.prototype,"measurementLabel",{get:function(){if(!this.measurement)return null;switch(this.unit){case "metric":return e.formatMetricLength(this.measurement.length,"meters");case "imperial":return e.formatImperialLength(this.measurement.length,"meters");default:var a=n.convertUnit(this.measurement.length,"meters",
this.unit);return e.formatDecimal(a,this.unit)}},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"state",{get:function(){return this.isDisabled||g.isProjectionEngineRequired(this.view)&&!g.isProjectionEngineSupported()?"disabled":this.tool?this.measurement?this.tool.active?"measuring":"measured":"ready":"ready"},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"unit",{get:function(){return this._validateUnit(this.defaultUnit)},set:function(a){void 0===a?this._clearOverride("unit"):
this._override("unit",this._validateUnit(a))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"unitOptions",{get:function(){return f.measurementLengthUnits},set:function(a){void 0===a?this._clearOverride("unitOptions"):this._override("unitOptions",this._validateUnits(a))},enumerable:!0,configurable:!0});b.prototype.newMeasurement=function(){this.createTool()};b.prototype.clearMeasurement=function(){this.removeTool()};b.prototype.createToolParams=function(){return{toolConstructor:g,
constructorArguments:{viewModel:this}}};b.prototype.logUnsupportedError=function(){h.error("DistanceMeasurement2D widget is not implemented for SceneView")};b.prototype.logError=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];h.error.apply(h,a)};b.prototype._validateUnit=function(a){return-1!==this.unitOptions.indexOf(a)?a:-1!==this.unitOptions.indexOf(this.defaultUnit)?this.defaultUnit:this.unitOptions[0]};b.prototype._validateUnits=function(a){void 0===a&&(a=[]);a=a.filter(function(a){return-1!==
f.measurementLengthUnits.indexOf(a)});return 0===a.length?f.measurementLengthUnits.slice():a};d([c.property(p.defaultUnitPropertyMetadata)],b.prototype,"defaultUnit",void 0);d([c.property({type:Number})],b.prototype,"geodesicDistanceThreshold",void 0);d([c.property()],b.prototype,"measurement",void 0);d([c.property({dependsOn:["measurement","unit","geodesicDistanceThreshold"],readOnly:!0})],b.prototype,"measurementLabel",null);d([c.property()],b.prototype,"palette",void 0);d([c.property({dependsOn:["isDisabled",
"measurement","tool.active","view.spatialReference"],readOnly:!0})],b.prototype,"state",null);d([c.property({constructOnly:!0,readOnly:!0})],b.prototype,"tool",void 0);d([c.property({type:String,dependsOn:["unitOptions","defaultUnit"]})],b.prototype,"unit",null);d([c.property({type:[String]})],b.prototype,"unitOptions",null);return b=d([c.subclass("esri.widgets.DistanceMeasurement2D.DistanceMeasurement2DViewModel")],b)}(c.declared(q.InteractiveToolViewModel))});