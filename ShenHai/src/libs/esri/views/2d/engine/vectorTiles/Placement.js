// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","./Conflict","./GeometryUtils","../webgl/Geometry"],function(H,r,D,h,x){Object.defineProperty(r,"__esModule",{value:!0});H=function(){return function(h,a,l,b,k){void 0===l&&(l=0);void 0===b&&(b=-1);void 0===k&&(k=C);this.x=h;this.y=a;this.angle=l;this.segment=b;this.minzoom=k}}();r.Anchor=H;var O=function(){return function(c,a,l,b,k,d,n){void 0===k&&(k=!1);void 0===d&&(d=C);void 0===n&&(n=h.C_INFINITY);this.anchor=c;this.labelAngle=a;this.glyphAngle=l;this.page=b;this.upsideDown=
k;this.minzoom=d;this.maxzoom=n}}(),P=function(){return function(h,a,l,b,k,d,n,t,w,B){this.tl=h;this.tr=a;this.bl=l;this.br=b;this.mosaicRect=k;this.labelAngle=d;this.anchor=n;this.minzoom=t;this.maxzoom=w;this.page=B}}();r.PlacedSymbol=P;var Q=function(){return function(h,a){this.footprint=h;this.shapes=a}}();r.Placement=Q;var C=.5;H=function(){function c(){this.mapAngle=0;this._conflictEngine=new D.ConflictEngine}c.prototype.reset=function(){this._conflictEngine.reset()};c.prototype.setAngle=function(a){this.mapAngle=
a};c.prototype.getIconPlacement=function(a,l,b,k,d){var n=b.width/b.pixelRatio,t=b.height/b.pixelRatio,w=d.offset[0]-n/2,B=d.offset[1]-t/2,n=w+n,t=B+t,c=b.rect,u=2/b.pixelRatio,e=w-u,f=B-u,g=e+c.width/b.pixelRatio,p=f+c.height/b.pixelRatio;b=new x.Point(e,f);u=new x.Point(g,p);e=new x.Point(e,p);f=new x.Point(g,f);g=d.rotate*h.C_DEG_TO_RAD;p=1===d.rotationAlignment;0<=a.segment&&!p&&(g+=a.angle);if(0!==g){var q=Math.cos(g),m=Math.sin(g);b.rotate(q,m);u.rotate(q,m);e.rotate(q,m);f.rotate(q,m)}q=8*
d.padding;m=new x.Point(a.x,a.y);a=new D.Footprint(this.mapAngle,q,p);a.addBox(m,new D.Box(w,B,n,t),k,g,l,C,h.C_INFINITY);l=new P(b,f,e,u,c,0,m,C,h.C_INFINITY,0);l=new Q(a,[l]);k=C;d.allowOverlap||(k=this._conflictEngine.getMinZoom(l.footprint,k));a.minzoom=k;return l};c.prototype.getTextPlacement=function(a,l,b,k,d,n,c){for(var w=new x.Point(a.x,a.y),B=c.rotate*h.C_DEG_TO_RAD,t=0===c.rotationAlignment,u=c.keepUpright,e=C,f=!t,g=f?0:a.angle,p=0<=a.segment&&t,f=new D.Footprint(this.mapAngle,8*c.padding,
f),q=[],m=!p,E=Number.POSITIVE_INFINITY,F=Number.NEGATIVE_INFINITY,r=E,J=F,H=p?u:t&&u,R,S=0;S<k.length;S++){var z=k[S],v=z.glyphMosaicItem;if(v&&!v.rect.isEmpty){var T=v.rect,G=v.metrics,A=v.page;m&&(R&&R!==z.y&&(f.addBox(w,new D.Box(E,r,F,J),d,B,l,C,h.C_INFINITY),E=Number.POSITIVE_INFINITY,F=Number.NEGATIVE_INFINITY,r=E,J=F),R=z.y);var I=[];if(p){if(v=(b.x+z.x+G.left-4+.5*v.metrics.width)*d,e=this._placeGlyph(a,e,v,n,a.segment,1,A,I),u&&(e=this._placeGlyph(a,e,v,n,a.segment,-1,A,I)),2<=e)break}else I.push(new O(w,
g,g,A)),t&&u&&I.push(new O(w,g+h.C_PI,g+h.C_PI,A,!0));for(var A=z.x+b.x+G.left,z=z.y+b.y-G.top,v=A+G.width,G=z+G.height,K=new x.Point(A-4,z-4),U=new x.Point(K.x+T.width,K.y+T.height),ca=new x.Point(K.x,U.y),da=new x.Point(U.x,K.y),V=0;V<I.length;V++){var y=I[V],Y=K.clone(),Z=ca.clone(),aa=da.clone(),ba=U.clone(),W=z,X=G,L=y.glyphAngle+B;if(0!==L){var M=Math.cos(L),N=Math.sin(L);Y.rotate(M,N);ba.rotate(M,N);Z.rotate(M,N);aa.rotate(M,N)}q.push(new P(Y,aa,Z,ba,T,y.labelAngle,y.anchor,y.minzoom,y.maxzoom,
y.page));if(!H||this._legible(y.labelAngle))m?(A<E&&(E=A),W<r&&(r=W),v>F&&(F=v),X>J&&(J=X)):2>y.minzoom&&f.addBox(y.anchor,new D.Box(A,W,v,X),d,L,l,y.minzoom,y.maxzoom)}}}if(2<=e)return null;m&&f.addBox(w,new D.Box(E,r,F,J),d,B,l,C,h.C_INFINITY);a=new Q(f,q);c.allowOverlap||(e=this._conflictEngine.getMinZoom(a.footprint,e));f.minzoom=e;return a};c.prototype.add=function(a){this._conflictEngine.add(a.footprint)};c.prototype._legible=function(a){a=h.radToByte(a);return 65>a||193<=a};c.prototype._placeGlyph=
function(a,l,b,k,d,c,t,w){var n=0>c?h.positiveMod(a.angle+h.C_PI,h.C_2PI):a.angle,r=this._legible(n),u=0;0>b&&(c*=-1,b*=-1,u=h.C_PI);0<c&&++d;a=new x.Point(a.x,a.y);var e=k[d],f=h.C_INFINITY;if(k.length<=d)return f;for(;;){var g=e.x-a.x,p=e.y-a.y,q=Math.sqrt(g*g+p*p),m=Math.max(b/q,l),g=h.positiveMod(Math.atan2(p/q,g/q)+u,h.C_2PI);w.push(new O(a,n,g,t,r,m,f));if(m<=l)return m;a=e.clone();do{d+=c;if(k.length<=d||0>d)return m;e=k[d]}while(a.isEqual(e));f=e.x-a.x;g=e.y-a.y;p=Math.sqrt(f*f+g*g);f*=q/
p;g*=q/p;a.x-=f;a.y-=g;f=m}};return c}();r.PlacementEngine=H});