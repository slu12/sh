// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/Logger ../../../../../../core/screenUtils ../../../../../../symbols/cim/enums ../../color ../../number ../../Utils ../../materialKey/MaterialKey ./util ./WGLBaseLineTemplate ./WGLMeshTemplate".split(" "),function(g,w,B,C,t,x,y,u,z,A,D,E,F){Object.defineProperty(w,"__esModule",{value:!0});var G=C.getLogger("esri.views.2d.engine.webgl.WGLLineTemplate");g=function(g){function h(d,b,a,f,h,e,k,r,n,p,l,q,m,v,t,
u){var c=g.call(this)||this;d=A.LineMaterialKey.load(A.createMaterialKey(c.geometryType,d,m));b&&(d.sdf=b.sdf,d.pattern=!0,d.textureBinding=b.textureBinding);c._capType=f;c._joinType=h;c._miterLimitCosine=D.getLimitCosine(e);c.tessellationProperties._fillColor=k;c.tessellationProperties._tl=r;c.tessellationProperties._br=n;c._hasPattern=p;c._isDashed=l;c._joinOnUTurn=u;c._isColorLocked=q;c._isOutline=m;c._zOrder=t;c._materialKey=d.data;c.tessellationProperties._bitset=q?1:0;c.tessellationProperties._halfWidth=
.5*a;c.tessellationProperties._halfReferenceWidth=.5*v;c._initializeTessellator(!1);return c}B(h,g);h.fromCIMLine=function(d,b,a,f,g,e){var k=b.color,r=b.isDashed,n=b.cap;r&&n===x.CapType.ROUND&&(n=x.CapType.SQUARE);var p=b.join;e*=t.pt2px(b.width);var l=t.pt2px(b.referenceWidth),q=t.pt2px(b.miterLimit),k=k&&y.premultiplyAlphaRGBA(k)||0;if(!a)return new h(d,a,e,n,p,q,k,0,0,!1,r,b.colorLocked,f,l,b.zOrder,g);var m=a.rect,v=m.x+1+a.width,w=m.y+1+a.height,m=u.i1616to32(m.x+1,m.y+1),v=u.i1616to32(v,w);
return new h(d,a,e,n,p,q,k,m,v,!0,r,b.colorLocked,f,l,b.zOrder,g)};h.fromSimpleLine=function(d,b,a,f,g){var e=a.color,k="solid"!==a.style&&"none"!==a.style,r=z.getCapType(a.cap||"round",k),n=z.getJoinType(a.join||"round"),e=e&&"none"!==a.style&&y.premultiplyAlphaRGBA(e)||0;"none"===a.style&&(e=0);var p=t.pt2px(a.width);a=a.miterLimit;if(!f)return new h(d,f,p,r,n,a,e,0,0,!1,k,!1,b,p,0,g);var l=f.rect,q=l.x+1+f.width,m=l.y+1+f.height,l=u.i1616to32(l.x+1,l.y+1),q=u.i1616to32(q,m);return new h(d,f,p,
r,n,a,e,l,q,!0,k,!1,b,p,0,g)};h.fromPictureLineSymbol=function(d,b,a,f){G.error("PictureLineSymbol support does not exist!");return null};return h}(E.default(F.default));w.default=g});