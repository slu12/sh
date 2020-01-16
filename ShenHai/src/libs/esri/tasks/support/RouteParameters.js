// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../geometry ../../core/jsonMap ../../core/JSONSupport ../../core/accessorSupport/decorators".split(" "),function(p,q,l,c,m,d,n,b){var e=new d.JSONMap({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"}),f=new d.JSONMap({esriNAUCentimeters:"centimeters",esriNAUDecimalDegrees:"decimal-degrees",
esriNAUDecimeters:"decimeters",esriNAUFeet:"feet",esriNAUInches:"inches",esriNAUKilometers:"kilometers",esriNAUMeters:"meters",esriNAUMiles:"miles",esriNAUMillimeters:"millimeters",esriNAUNauticalMiles:"nautical-miles",esriNAUPoints:"points",esriNAUYards:"yards"}),g=new d.JSONMap({esriNFSBAllowBacktrack:"allow-backtrack",esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"}),h=new d.JSONMap({esriDOTComplete:"complete",
esriDOTCompleteNoEvents:"complete-no-events",esriDOTInstructionsOnly:"instructions-only",esriDOTStandard:"standard",esriDOTSummaryOnly:"summary-only"}),k=new d.JSONMap({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"});return function(d){function a(a){a=
d.call(this,a)||this;a.accumulateAttributes=null;a.attributeParameterValues=null;a.barriers=null;a.directionsLanguage=null;a.directionsLengthUnits=null;a.directionsOutputType=null;a.directionsStyleName=null;a.directionsTimeAttribute=null;a.doNotLocateOnRestrictedElements=!0;a.findBestSequence=null;a.ignoreInvalidLocations=null;a.impedanceAttribute=null;a.outputGeometryPrecision=null;a.outputGeometryPrecisionUnits=null;a.outputLines="true-shape";a.outSpatialReference=null;a.pointBarriers=null;a.polygonBarriers=
null;a.polylineBarriers=null;a.preserveFirstStop=null;a.preserveLastStop=null;a.restrictionAttributes=null;a.restrictUTurns=null;a.returnBarriers=!1;a.returnDirections=!1;a.returnPolygonBarriers=!1;a.returnPolylineBarriers=!1;a.returnRoutes=!0;a.returnStops=!1;a.returnZ=!0;a.startTime=null;a.startTimeIsUTC=!0;a.stops=null;a.travelMode=null;a.useHierarchy=null;a.useTimeWindows=null;return a}l(a,d);a.prototype.readStartTime=function(a,b){return null!=b.startTime?new Date(b.startTime):null};a.prototype.writeStartTime=
function(a,b){b.startTime=a?a.getTime():null};c([b.property({type:[String],json:{write:!0}})],a.prototype,"accumulateAttributes",void 0);c([b.property({json:{write:!0}})],a.prototype,"attributeParameterValues",void 0);c([b.property({aliasOf:"pointBarriers"})],a.prototype,"barriers",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"directionsLanguage",void 0);c([b.property({type:f.apiValues,json:{read:f.read,write:f.write}})],a.prototype,"directionsLengthUnits",void 0);c([b.property({type:h.apiValues,
json:{read:h.read,write:h.write}})],a.prototype,"directionsOutputType",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"directionsStyleName",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"directionsTimeAttribute",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"doNotLocateOnRestrictedElements",void 0);c([b.property({json:{write:!0}})],a.prototype,"findBestSequence",void 0);c([b.property({json:{write:!0}})],a.prototype,"ignoreInvalidLocations",
void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"impedanceAttribute",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"outputGeometryPrecision",void 0);c([b.property({type:k.apiValues,json:{read:k.read,write:k.write}})],a.prototype,"outputGeometryPrecisionUnits",void 0);c([b.property({type:e.apiValues,json:{read:e.read,write:e.write}})],a.prototype,"outputLines",void 0);c([b.property({type:m.SpatialReference,json:{write:!0}})],a.prototype,"outSpatialReference",void 0);
c([b.property({json:{write:!0}})],a.prototype,"pointBarriers",void 0);c([b.property({json:{write:!0}})],a.prototype,"polygonBarriers",void 0);c([b.property({json:{write:!0}})],a.prototype,"polylineBarriers",void 0);c([b.property({json:{write:!0}})],a.prototype,"preserveFirstStop",void 0);c([b.property({json:{write:!0}})],a.prototype,"preserveLastStop",void 0);c([b.property({type:[String],json:{write:!0}})],a.prototype,"restrictionAttributes",void 0);c([b.property({type:g.apiValues,json:{read:g.read,
write:g.write}})],a.prototype,"restrictUTurns",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnBarriers",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnDirections",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnPolygonBarriers",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnPolylineBarriers",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnRoutes",void 0);c([b.property({type:Boolean,
json:{write:!0}})],a.prototype,"returnStops",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"returnZ",void 0);c([b.property({type:Date,json:{type:Number,write:!0}})],a.prototype,"startTime",void 0);c([b.reader("startTime")],a.prototype,"readStartTime",null);c([b.writer("startTime")],a.prototype,"writeStartTime",null);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"startTimeIsUTC",void 0);c([b.property({json:{write:!0}})],a.prototype,"stops",void 0);c([b.property({json:{write:!0}})],
a.prototype,"travelMode",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"useHierarchy",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"useTimeWindows",void 0);return a=c([b.subclass("esri.tasks.support.RouteParameters")],a)}(b.declared(n.JSONSupport))});