// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/events ../../../core/accessorSupport/decorators ../../Slider ../../support/widget".split(" "),function(l,m,h,e,f,c,k,d){return function(g){function b(a){a=g.call(this,a)||this;a.items=null;a.currentIndex=0;a.buttonTooltip="";a.showDropDown=!0;a.open=!1;a._rootNode=null;return a}h(b,g);Object.defineProperty(b.prototype,"currentItem",{get:function(){return null!==this.items&&null!==
this.currentIndex&&this.currentIndex<this.items.length?this.items[this.currentIndex]:null},enumerable:!0,configurable:!0});b.prototype.renderThumbLabel=function(){var a=this,b,c=(b={},b["esri-slider-with-dropdown__box--drop-down-on"]=this.showDropDown,b["esri-slider-with-dropdown__box--drop-down-off"]=!this.showDropDown,b);return d.tsx("div",{class:this.classes("esri-slider-with-dropdown__box","esri-slider__label",c)},this.inherited(arguments),this.showDropDown?d.tsx("div",{afterCreate:d.storeNode,
class:"esri-slider-with-dropdown__dropdown-root",bind:this,"data-node-ref":"_rootNode"},d.tsx("button",{class:this.classes("esri-interactive"," esri-widget__anchor esri-slider-with-dropdown__anchor",this.open?"esri-slider-with-dropdown__anchor--open":"esri-slider-with-dropdown__anchor--closed"),bind:this,onclick:this._onAnchorClick,onpointerdown:this._killEvent,"aria-label":this.buttonTooltip,title:this.buttonTooltip,"aria-expanded":this.open,"aria-haspopup":"listbox"},this.currentItem?this.currentItem.name+
" ":""),this.open?d.tsx("ol",{class:this.classes("esri-slider-with-dropdown__list"),onpointerdown:this._killEvent,onblur:this._onDropdownBlur,bind:this,tabindex:"-1","aria-label":this.buttonTooltip,role:"listbox",onkeydown:this._onOlKeyDown,afterCreate:function(a){return a.firstChild.focus()}},this.items.map(function(b,c){return d.tsx("li",{class:c===a.currentIndex?a.classes("esri-interactive","esri-slider-with-dropdown__list-item","esri-slider-with-dropdown__list-item--selected"):a.classes("esri-interactive",
"esri-slider-with-dropdown__list-item"),bind:a,onclick:a._onDropdownItemClick,"data-result":c,"aria-label":b.label.join(" "),role:"option","aria-selected":c===a.currentIndex,onkeydown:a._onLiKeyDown,onblur:a._onDropdownBlur,tabindex:"0"},b.label.map(function(b){return d.tsx("span",{bind:a},b)}))})):null):null)};b.prototype._onAnchorClick=function(){this.open=!this.open;return!0};b.prototype._onDropdownItemClick=function(a){this.currentIndex=a.currentTarget["data-result"];this._close()};b.prototype._onDropdownBlur=
function(a){a=a.relatedTarget;null===a&&(a=document.activeElement);this._rootNode.contains(a)||a===this._rootNode.parentElement||a===this._rootNode.parentElement.parentElement||this._close()};b.prototype._killEvent=function(a){a.stopPropagation();return!0};b.prototype._onOlKeyDown=function(a){event.stopPropagation();"Escape"===f.eventKey(a)&&this._close()};b.prototype._onLiKeyDown=function(a){var b=event.target;switch(f.eventKey(a)){case "ArrowUp":b.previousElementSibling&&b.previousElementSibling.focus();
break;case "ArrowDown":b.nextElementSibling&&b.nextElementSibling.focus();break;case "Enter":b.click()}};b.prototype._close=function(){this.open=!1};e([c.property(),d.renderable()],b.prototype,"items",void 0);e([c.property(),d.renderable()],b.prototype,"currentIndex",void 0);e([c.property({dependsOn:["currentIndex","items"]}),d.renderable()],b.prototype,"currentItem",null);e([c.property(),d.renderable()],b.prototype,"buttonTooltip",void 0);e([c.property(),d.renderable()],b.prototype,"showDropDown",
void 0);e([c.property(),d.renderable()],b.prototype,"open",void 0);return b=e([c.subclass("esri.widgets.Daylight.SliderWithDropdown")],b)}(c.declared(k))});