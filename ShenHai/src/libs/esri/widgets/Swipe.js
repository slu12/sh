// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/assignHelper dojo/i18n!./Swipe/nls/Swipe ../core/events ../core/accessorSupport/decorators ../core/libs/pep/pep ./Widget ./Swipe/SwipeViewModel ./support/widget".split(" "),function(w,x,q,d,r,k,t,c,u,v,m,e){var n={handle:!0,divider:!0};return function(p){function b(a){a=p.call(this,a)||this;a.direction=null;a.disabled=!1;a.dragLabel=k.dragLabel;a.iconClass="esri-icon-up-down-arrows";a.label=
k.widgetLabel;a.leadingLayers=null;a.position=null;a.trailingLayers=null;a.view=null;a.viewModel=new m;a._pointerOffset=null;a._container=null;a._onContainerPointerDown=a._onContainerPointerDown.bind(a);a._onContainerPointerMove=a._onContainerPointerMove.bind(a);a._onContainerPointerUp=a._onContainerPointerUp.bind(a);return a}q(b,p);Object.defineProperty(b.prototype,"visibleElements",{get:function(){return this._get("visibleElements")||n},set:function(a){this._set("visibleElements",r({},n,a))},enumerable:!0,
configurable:!0});b.prototype.renderHandle=function(){var a,l=this.viewModel.direction,b=this.visibleElements,l=(a={},a["esri-icon-drag-horizontal"]="vertical"===l,a["esri-icon-drag-vertical"]="horizontal"===l,a);a=this.classes("esri-swipe__handle",!b.handle&&"esri-swipe__handle--hidden");return e.tsx("div",{key:"handle",role:"presentation",class:a},e.tsx("span",{"aria-hidden":"true",class:this.classes("esri-swipe__handle-icon",l)}))};b.prototype.renderDivider=function(){var a=this.visibleElements;
return a&&a.divider?e.tsx("div",{key:"divider",role:"presentation",class:"esri-swipe__divider"}):null};b.prototype.renderContent=function(){return[this.renderDivider(),this.renderHandle()]};b.prototype.renderContainer=function(){var a=this.disabled,l=this.dragLabel,b=this.viewModel,f=b.max,c=b.min,d=b.direction,b=b.position,g=b+"%",h={top:"vertical"===d?g:null,left:"vertical"===d?null:g},k=this.renderContent();return a?e.tsx("div",{key:"container",role:"presentation",styles:h,class:"esri-swipe__container"},
k):e.tsx("div",{tabIndex:0,key:"container",bind:this,afterCreate:this._afterContainerCreate,onkeydown:this._onContainerKeyDown,"touch-action":"none",role:"slider",title:l,"aria-label":l,"aria-orientation":d,"aria-valuemax":""+f,"aria-valuemin":""+c,"aria-valuenow":""+b,"aria-valuetext":g,styles:h,class:"esri-swipe__container"},k)};b.prototype.render=function(){var a,b=this.viewModel,d=b.state,b=b.direction,f="disabled"===d||this.disabled,b=(a={},a["esri-disabled"]=f,a["esri-swipe--disabled"]=f,a["esri-swipe--vertical"]=
"vertical"===b,a["esri-swipe--horizontal"]="horizontal"===b,a);return e.tsx("div",{class:this.classes("esri-swipe","esri-widget",b)},"disabled"===d?null:this.renderContainer())};b.prototype._afterContainerCreate=function(a){u.applyLocal(a);this._container=a;a.addEventListener("pointerdown",this._onContainerPointerDown)};b.prototype._calculatePointerOffset=function(a){var b=this.direction,d=a.target,f=("vertical"===b?d.clientHeight:d.clientWidth)/2,c=d.getBoundingClientRect(),d=a.clientX-c.left;a=
a.clientY-c.top;this._pointerOffset="vertical"===b?a-f:d-f};b.prototype._onContainerPointerDown=function(a){a.preventDefault();this._container&&document.activeElement!==this.container&&this._container.focus();this._calculatePointerOffset(a);document.addEventListener("pointerup",this._onContainerPointerUp);document.addEventListener("pointermove",this._onContainerPointerMove)};b.prototype._onContainerPointerUp=function(a){a.preventDefault();document.removeEventListener("pointerup",this._onContainerPointerUp);
document.removeEventListener("pointermove",this._onContainerPointerMove)};b.prototype._onContainerPointerMove=function(a){a.preventDefault();var b=this._pointerOffset,d=this.direction,f=a.clientX;a=a.clientY;var c=this.container.getBoundingClientRect(),e=c.top,g=c.left,h=c.width,c=c.height;this.position=("vertical"===d?a-e-b:f-g-b)/("vertical"===d?c:h)*100};b.prototype._getKeyPosition=function(a){var b=t.eventKey(a),d=this.position,c=this.viewModel,e=c.max,k=c.min,g=c.step,h=c.direction,c=g*c.stepMultiplier;
-1<"ArrowUp ArrowDown ArrowLeft ArrowRight Home End PageUp PageDown".split(" ").indexOf(b)&&(a.preventDefault(),a.stopPropagation());return("vertical"===h?"ArrowDown"===b||"ArrowRight"===b:"ArrowUp"===b||"ArrowRight"===b)?(a=a.shiftKey?c:g,d+a):("vertical"===h?"ArrowUp"===b||"ArrowLeft"===b:"ArrowDown"===b||"ArrowLeft"===b)?(a=a.shiftKey?c:g,d-a):"Home"===b?k:"End"===b?e:("vertical"===h?"PageDown"===b:"PageUp"===b)?d+c:("vertical"===h?"PageUp"===b:"PageDown"===b)?d-c:null};b.prototype._onContainerKeyDown=
function(a){a=this._getKeyPosition(a);"number"===typeof a&&(this.position=a)};d([c.aliasOf("viewModel.direction")],b.prototype,"direction",void 0);d([c.property(),e.renderable()],b.prototype,"disabled",void 0);d([c.property(),e.renderable()],b.prototype,"dragLabel",void 0);d([c.property()],b.prototype,"iconClass",void 0);d([c.property()],b.prototype,"label",void 0);d([c.aliasOf("viewModel.leadingLayers")],b.prototype,"leadingLayers",void 0);d([c.aliasOf("viewModel.position")],b.prototype,"position",
void 0);d([c.aliasOf("viewModel.trailingLayers")],b.prototype,"trailingLayers",void 0);d([c.aliasOf("viewModel.view"),e.renderable()],b.prototype,"view",void 0);d([c.property({type:m}),e.renderable(["viewModel.state","viewModel.position","viewModel.direction"])],b.prototype,"viewModel",void 0);d([c.property(),e.renderable()],b.prototype,"visibleElements",null);return b=d([c.subclass("esri.widgets.Swipe")],b)}(c.declared(v))});