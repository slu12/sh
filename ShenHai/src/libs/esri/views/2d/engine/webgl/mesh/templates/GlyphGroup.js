// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/Error ../../../../../../core/Logger ../../../../../../core/mathUtils ../../../../../../core/libs/gl-matrix-2/mat2d ../../../../../../core/libs/gl-matrix-2/mat2df32 ../../definitions ../../materialKey/MaterialKey ./ComputedGlyph ./util".split(" "),function(y,G,K,L,B,H,I,M,N,C,J){Object.defineProperty(G,"__esModule",{value:!0});var O=L.getLogger("esri.views.2d.engine.webgl.GlyphGroup");y=function(){function f(a,c,d,h,b,k,p,g,q,e){void 0===d&&(d=0);void 0===
h&&(h=-1);void 0===b&&(b=-1);void 0===k&&(k=-1);void 0===p&&(p=-1);void 0===g&&(g=-1);void 0===q&&(q=0);void 0===e&&(e=-1);this.x=a;this.y=c;this.t=d;this.i=h;this.j=b;this.segmentPosX=k;this.segmentPosY=p;this.segmentLen=g;this.pathLen=q;this.order=e;this._glyphs=new Map;this.minZoom=0}Object.defineProperty(f.prototype,"glyphs",{get:function(){return this._glyphs},enumerable:!0,configurable:!0});f.prototype.add=function(a,c){var d=this._glyphs.get(c);d?d.push(a):this._glyphs.set(c,[a])};f.prototype.clear=
function(){this._glyphs.clear()};f.prototype.place=function(a,c,d,h,b,k,p,g,q,e,x){var f=a.x,t=a.y,l=a.codePoint,A=a.glyphMosaicItem;b=N.MaterialKeyBase.load(b);b.textureBinding=a.glyphMosaicItem.textureBinding;switch(c){case "esriGeometryPoint":case "esriGeometryPolygon":a=C.default.from(f,t,this.x,this.y,-1,e,x,A,l,b.data,h,k,p);this.add(a,0);break;case "esriGeometryPolyline":c=d.geometry;this._placeGlyphAlongLine(a,b.data,c,h,g,k,p,q,e,x,-1);this._placeGlyphAlongLine(a,b.data,c,h,g,k,p,q,e,x,1);
break;case "esriGeometryMultipoint":case "esriGeometryEnvelope":a=void 0,void 0===a&&(a="mapview-labeling"),O.error(K(a,"Cannot place for unsupported geometryType: "+c))}};f.prototype._findLabelTheta=function(a,c,d,h){c*=h;a=Math.acos((0*c+-1*h*-a)/(1*d));0<c&&(a=2*Math.PI-a);return a};f.prototype._placeGlyphAlongLine=function(a,c,d,h,b,k,p,g,q,e,f){d=d.paths[this.i];var z=d[this.j],t=z[0],l=z[1],z=a.x,A=a.y,x=a.glyphMosaicItem,y=a.codePoint,u=a.glyphMosaicItem.metrics,u=(a.x+u.left+u.width/2)*k/
24;a=f*B.sign(u)||1;var u=Math.abs(u),m=J.len(t,l),D=this._findLabelTheta(t,l,m,f),n=(a+1)/2,m=-a*(-1*n+this.t)*m,v=H.mat2d.rotate(I.mat2df32.create(),h,-D),r=48<b.height;b=0===m?e:Math.max(Math.max(g+B.log2(Math.abs(u/m)),0),q);r&&(b=q);e=C.default.from(z,A,this.x,this.y,D,b,e,x,y,c,v,k,p,r||b<=g&&e>=g&&1===f);this.add(e,this.j);if(!r)for(e=this.segmentPosX+n*t,t=this.segmentPosY+n*l,v=b,l=this.j+a;0<l&&l<d.length;l+=a){var E=e,F=t,n=d[l];b=n[0];var n=n[1],w=J.len(b,n),r=this._findLabelTheta(b,n,
w,f),r=H.mat2d.rotate(I.mat2df32.create(),h,-r),E=E+-a*b/w*m,F=F+-a*n/w*m,m=m+w,w=v-.1,v=0===m?w:Math.max(Math.max(g+B.log2(Math.abs(u/m)),0),q),r=C.default.from(z,A,E,F,D,v,w,x,y,c,r,k,p,v<=g&&w>=g&&1===f);this.add(r,l);if(v<g-M.COLLISION_MAX_ZOOM_DELTA){this.minZoom=Math.max(v,this.minZoom);break}e+=a*b;t+=a*n}};return f}();G.default=y});