// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/mathUtils ../../../core/maybe ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../core/libs/gl-matrix-2/vec4 ../../../geometry/support/aaBoundingBox ../support/earthUtils ../support/buffer/BufferPool ../support/buffer/InterleavedLayout ./ElevationData ./TerrainConst ../webgl-engine/lib/Util ../webgl-engine/materials/internal/MaterialUtil".split(" "),function(na,J,ga,ha,Q,U,V,W,O,ia,ja,X,M,Y,ka){function Z(b,c,l,e){var N=0<(l&2),
F=c+(e?1024:0)+(N?2048:0),n=R.get(F);if(!n){var n=c-1,y=c-1,w=c*c,a=2*n+2*y,r=n*y*6,t=6*a,z=6*(2*n+y-1);e&&(r*=2,t*=2,z*=2);for(var a=65536<w+a?new Uint32Array(r+t):new Uint16Array(r+t),q=0,u=0,g=r,v,k,f,p,m=0,h=0;h<=y;h++){N&&(m=0===h?z:h===y?-z:0);for(var g=g+m,d=0;d<=n;d++)f=S(d,h,n,y),-1<f&&(p=0===h&&d!==n?1:d===n&&h!==y?n+1:h===y&&0!==d?-1:0===d&&0!==h?-(n+1):0,0!==p&&(v=q,k=w+f,f=w+(0===d&&1===h?0:f+1),p=q+p,e?(a[g+0]=v,a[g+1]=k,a[g+2]=k,a[g+3]=f,a[g+4]=f,a[g+5]=v,a[g+6]=f,a[g+7]=p,a[g+8]=p,
a[g+9]=v,a[g+10]=v,a[g+11]=f,g+=12):(a[g+0]=v,a[g+1]=k,a[g+2]=f,a[g+3]=f,a[g+4]=p,a[g+5]=v,g+=6))),++q,d<n&&h<y&&(v=h*(n+1)+d,k=v+1,f=k+(n+1),p=f-1,e?(a[u+0]=v,a[u+1]=k,a[u+2]=k,a[u+3]=f,a[u+4]=f,a[u+5]=v,a[u+6]=f,a[u+7]=p,a[u+8]=p,a[u+9]=v,a[u+10]=v,a[u+11]=f,u+=12):(a[u+0]=v,a[u+1]=k,a[u+2]=f,a[u+3]=f,a[u+4]=p,a[u+5]=v,u+=6));g-=m}n={values:a,numSurfaceIndices:r,numSkirtIndices:t};R.set(F,n)}b.indices=n.values;b.numSurfaceIndices=n.numSurfaceIndices;b.numSkirtIndices=n.numSkirtIndices;b.numWithoutSkirtIndices=
b.numSurfaceIndices+(l?6*(c-1)*(e?2:1):0)}function T(b,c,l,e){b<e[0]&&(e[0]=b);b>e[3]&&(e[3]=b);c<e[1]&&(e[1]=c);c>e[4]&&(e[4]=c);l<e[2]&&(e[2]=l);l>e[5]&&(e[5]=l)}function aa(b,c){var l=c>b?1:0;return 2+4*l+(1-2*l)*(b+c)}function S(b,c,l,e){return 0===c?b:b===l?l+c:c===e?l+e+(l-b):0===b&&0<c?2*l+e+(e-c):-1}Object.defineProperty(J,"__esModule",{value:!0});var la=ja.newLayout().vec3f(Y.VertexAttrConstants.POSITION).vec2f(Y.VertexAttrConstants.UV0),P=new ia.BufferPool(function(b){return la.createBuffer(b)},
function(b){return b.count});J.clearCaches=function(){P.clear();R.clear()};J.releaseGeometry=function(b){P.release(b.vertexAttributes);b.vertexAttributes=null;b.indices=null};J.createSphericalGlobePatch=function(b,c,l,e,q,F,n){var y=q[0],w=q[1],a=q[2];q=q[3];var r=.1*O.earthRadius*(q-w),t=b.numVertsPerRow-1,z=b.numVertsPerRow-1,N=b.numVertsPerRow*b.numVertsPerRow,u=P.acquire(N+(2*t+2*z)),g=u.position.typedBuffer,v=u.uv0.typedBuffer,k=e.geometryInfo.boundingBox;W.empty(k);var f=c[2]-c[0],p=c[3]-c[1],
m=a-y,a=l[0],h=l[1];l=l[2];for(var d=0;d<=t;d++){var C=d/t,A=y+C*m;ba[d]=Math.sin(A);ca[d]=Math.cos(A);da[d]=C;ea[d]=c[0]+C*f}y=F&&!!(n&1);f=F&&!!(n&2);for(A=m=0;A<=z;A++){var D=A/z,d=ga.lerp(w,q,D),H=Math.cos(d),K=Math.sin(d),I=void 0;F?(I=O.halfEarthRadius*Math.log((1+K)/(1-K)),D=(I-c[1])/p):I=180*d/Math.PI;for(d=0;d<=t;d++){var C=da[d],x=ba[d],L=ca[d],G=O.earthRadius;b.samplerData&&(G+=X.ElevationData.sample(ea[d],I,b.samplerData)||0);L=L*H*G-a;x=x*H*G-h;G=K*G-l;T(L,x,G,k);var E=M.GEOMETRY_VERTEX_STRIDE*
m;g[E+0]=L;g[E+1]=x;g[E+2]=G;v[E+0]=C;v[E+1]=D;E=S(d,A,t,z);if(-1<E){var E=M.GEOMETRY_VERTEX_STRIDE*(N+E),B=y&&0===A?-1:f&&A===z?1:0,L=0===B?L:-a,x=0===B?x:-h,G=0===B?G:O.earthRadius*B-l;g[E+0]=L;g[E+1]=x;g[E+2]=G;v[E+0]=0===B?aa(C,D):C;v[E+1]=0===B?r:D;0!==B&&T(L,x,G,k)}++m}}e.geometryInfo.numVertsPerRow=b.numVertsPerRow;e.geometryInfo.vertexAttributes=u;e.geometryInfo.skirtLength=r;V.vec4.set(e.geometryInfo.uvOffsetAndScale,0,0,1,1);Z(e.geometryInfo,b.numVertsPerRow,F?n:0,b.wireframe)};J.createPlanarGlobePatch=
function(b,c,l,e){var q=c[0],F=c[1],n=c[2]-q,y=c[3]-F,w=b.clippingArea,a=w?Math.max(0,(w[0]-c[0])/n):0,r=w?Math.max(0,(w[1]-c[1])/y):0,t=w?Math.min(1,(w[2]-c[0])/n):1;c=w?Math.min(1,(w[3]-c[1])/y):1;var z=t>a?1/(t-a):1,J=c>r?1/(c-r):1,u=-a*z,g=-r*J,v=.1*n,k=b.numVertsPerRow-1,f=b.numVertsPerRow-1,p=b.numVertsPerRow*b.numVertsPerRow,m=P.acquire(p+(2*k+2*f)),h=m.position.typedBuffer,d=m.uv0.typedBuffer,C=e.geometryInfo.boundingBox;W.empty(C);for(var A=0,D=0;D<=f;D++){var H=D/f,K=g+H*J,H=F+H*y;w&&(H<
w[1]?(H=w[1],K=0):H>w[3]&&(H=w[3],K=1));for(var I=0;I<=k;I++){var x=I/k,L=u+x*z,x=q+x*n;w&&(x<w[0]?(x=w[0],L=0):x>w[2]&&(x=w[2],L=1));var G=b.samplerData?X.ElevationData.sample(x,H,b.samplerData)||0:0,x=x-l[0],E=H-l[1],G=G-l[2];T(x,E,G,C);var B=M.GEOMETRY_VERTEX_STRIDE*A;h[B+0]=x;h[B+1]=E;h[B+2]=G;d[B+0]=L;d[B+1]=K;B=S(I,D,k,k);-1<B&&(B=M.GEOMETRY_VERTEX_STRIDE*(p+B),h[B+0]=x,h[B+1]=E,h[B+2]=G,d[B+0]=aa(L,K),d[B+1]=v);++A}}e.geometryInfo.numVertsPerRow=b.numVertsPerRow;e.geometryInfo.vertexAttributes=
m;e.geometryInfo.skirtLength=v;V.vec4.set(e.geometryInfo.uvOffsetAndScale,a,r,t-a,c-r);Z(e.geometryInfo,b.numVertsPerRow,0,b.wireframe)};var R=new Map,fa=Math.pow(2,-52);J.intersectSkirts=function(b,c,l,e,J,F,n,y,w){var a,r,t,z=F.position;F=F.uv0;var M=b[0],u=b[1];b=b[2];var g=c[0]-M,v=c[1]-u;c=c[2]-b;e*=3;for(l*=3;l<e;l+=3){var k=J[l],f=J[l+1],p=J[l+2],m=z.get(k,0),h=z.get(k,1);a=z.get(k,2);var d=z.get(f,0),C=z.get(f,1);r=z.get(f,2);var A=z.get(p,0),D=z.get(p,1);t=z.get(p,2);k=F.get(k,0);f=F.get(f,
0);p=F.get(p,0);2<=k&&(Q.vec3.set(q,m,h,a),n(q),m+=q[0],h+=q[1],a+=q[2]);2<=f&&(Q.vec3.set(q,d,C,r),n(q),d+=q[0],C+=q[1],r+=q[2]);2<=p&&(Q.vec3.set(q,A,D,t),n(q),A+=q[0],D+=q[1],t+=q[2]);ha.isSome(y)&&(a=y.applyToVertex(m,h,a),m=a[0],h=a[1],a=a[2],r=y.applyToVertex(d,C,r),d=r[0],C=r[1],r=r[2],t=y.applyToVertex(A,D,t),A=t[0],D=t[1],t=t[2]);d-=m;C-=h;r-=a;A-=m;D-=h;t-=a;var k=v*t-D*c,f=c*A-t*g,H=g*D-A*v,p=d*k+C*f+r*H,m=M-m,K=u-h,I=b-a,h=K*r-C*I;a=I*d-r*m;var x=m*C-d*K;if(p>fa){m=m*k+K*f+I*H;if(0>m||
m>p)continue;k=g*h+v*a+c*x;if(0>k||m+k>p)continue}else if(p<-fa){m=m*k+K*f+I*H;if(0<m||m<p)continue;k=g*h+v*a+c*x;if(0<k||m+k<p)continue}else continue;h=(A*h+D*a+t*x)/p;0<=h&&(a=ka.computeNormal(d,C,r,A,D,t,ma),w(h,a))}};var ba=Array(M.MAX_PATCH_TESSELATION+1),ca=Array(M.MAX_PATCH_TESSELATION+1),da=Array(M.MAX_PATCH_TESSELATION+1),ea=Array(M.MAX_PATCH_TESSELATION+1),q=U.vec3f64.create(),ma=U.vec3f64.create()});