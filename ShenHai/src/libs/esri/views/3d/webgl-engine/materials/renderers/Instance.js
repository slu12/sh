// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64"],function(n,p,b,c){return function(){return function(d,e,f,g,h,a,k,l,m){this.name=d;this.from=e;this.to=f;this.displayedIndexRange=g;this.highlightedIndexRanges=h;this.transformation=a;this.instanceParameters=k;this.idx=l;this.dataId=m;null!=a&&(this.transformationNormal=c.mat4f64.clone(a),b.mat4.invert(this.transformationNormal,this.transformationNormal),b.mat4.transpose(this.transformationNormal,
this.transformationNormal))}}()});