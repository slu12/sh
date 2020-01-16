// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../geometry/support/aaBoundingRect","../../../geometry/support/boundsUtils","../../../geometry/support/coordsUtils"],function(y,m,v,w,t){function p(a,e,f,b){null==b||a.hasZ||(b=void 0);if("point"===a.type)return a.x+=e,a.y+=f,a.hasZ&&null!=b&&(a.z+=b),a;if("multipoint"===a.type){for(var c=a.points,d=0;d<c.length;d++)c[d]=x(c[d],e,f,b);return a}if("extent"===a.type)return a.xmin+=e,a.xmax+=e,a.ymin+=f,a.ymax+=f,null!=b&&(a.zmin+=b,a.zmax+=b),a;for(var c=t.geometryToCoordinates(a),
k="polyline"===a.type?a.paths:a.rings,g=0;g<c.length;g++)for(var h=c[g],d=0;d<h.length;d++)h[d]=x(h[d],e,f,b);"paths"in a?a.paths=k:a.rings=k;return a}function x(a,e,f,b){return q(a,a[0]+e,a[1]+f,null!=a[2]&&null!=b?a[2]+b:void 0)}function q(a,e,f,b){e=[e,f];2<a.length&&e.push(null!=b?b:a[2]);3<a.length&&e.push(a[3]);return e}Object.defineProperty(m,"__esModule",{value:!0});m.move=p;m.cloneMove=function(a,e,f,b,c){a=a.clone();var d=b.resolution;if("point"===a.type){if(c)p(a,e*d,-f*d);else{c=b.state.transform;
b=b.state.inverseTransform;var k=c[0]*a.x+c[2]*a.y+c[4],g=c[1]*a.x+c[3]*a.y+c[5];a.x=b[0]*(k+e)+b[2]*(g+f)+b[4];a.y=b[1]*(k+e)+b[3]*(g+f)+b[5]}return a}if("multipoint"===a.type){if(c)p(a,e*d,-f*d);else{d=a.points;c=b.state.transform;b=b.state.inverseTransform;for(var h=0;h<d.length;h++){var l=d[h],g=c[0]*l[0]+c[2]*l[1]+c[4],r=c[1]*l[0]+c[3]*l[1]+c[5],k=b[0]*(g+e)+b[2]*(r+f)+b[4],g=b[1]*(g+e)+b[3]*(r+f)+b[5];d[h]=q(l,k,g,void 0)}}return a}if("extent"===a.type){if(c)p(a,e*d,-f*d);else{c=b.state.transform;
b=b.state.inverseTransform;var d=c[0]*a.xmin+c[2]*a.ymin+c[4],n=c[1]*a.xmin+c[3]*a.ymin+c[5],k=c[0]*a.xmax+c[2]*a.ymax+c[4];c=c[1]*a.xmax+c[3]*a.ymax+c[5];a.xmin=b[0]*(d+e)+b[2]*(n+f)+b[4];a.ymin=b[1]*(d+e)+b[3]*(n+f)+b[5];a.xmax=b[0]*(k+e)+b[2]*(c+f)+b[4];a.ymax=b[1]*(k+e)+b[3]*(c+f)+b[5]}return a}if(c)p(a,e*d,-f*d);else{n=t.geometryToCoordinates(a);d="polyline"===a.type?a.paths:a.rings;c=b.state.transform;b=b.state.inverseTransform;for(var m=0;m<n.length;m++)for(var u=n[m],h=0;h<u.length;h++)l=
u[h],g=c[0]*l[0]+c[2]*l[1]+c[4],r=c[1]*l[0]+c[3]*l[1]+c[5],k=b[0]*(g+e)+b[2]*(r+f)+b[4],g=b[1]*(g+e)+b[3]*(r+f)+b[5],u[h]=q(l,k,g,void 0);"paths"in a?a.paths=d:a.rings=d}return a};m.scale=function(a,e,f,b){if("point"===a.type){var c=a.x,d=a.y,k=b?b[0]:c;b=b?b[1]:d;a=a.clone();a.x=(c-k)*e+k;a.y=(d-b)*f+b;return a}if("multipoint"===a.type){var d=t.geometryToCoordinates(a),k=v.create(),g=w.getRingsOrPathsBounds(k,[d]),k=g[0],d=g[1],c=g[2],g=g[3],k=b?b[0]:(k+c)/2,g=b?b[1]:(g+d)/2,h=a.clone(),l=h.points;
for(a=0;a<l.length;a++)b=l[a],c=b[0],d=b[1],c=(c-k)*e+k,d=(d-g)*f+g,l[a]=q(b,c,d,void 0);return h}if("extent"===a.type)return d=a.xmin,k=a.xmax,c=a.ymin,g=a.ymax,h=b?b[0]:(d+k)/2,b=b?b[1]:(g+c)/2,a=a.clone(),a.xmin=(d-h)*e+h,a.ymax=(g-b)*f+b,a.xmax=(k-h)*e+h,a.ymin=(c-b)*f+b,a.xmin>a.xmax&&(e=a.xmin,a.xmin=a.xmax,a.xmax=e),a.ymin>a.ymax&&(e=a.ymin,a.ymin=a.ymax,a.ymax=e),a;for(var k=t.geometryToCoordinates(a),d=v.create(),h=w.getRingsOrPathsBounds(d,k),c=h[0],d=h[1],g=h[2],h=h[3],g=b?b[0]:(c+g)/2,
h=b?b[1]:(h+d)/2,l=a.clone(),m="polyline"===l.type?l.paths:l.rings,n=0;n<k.length;n++){var p=k[n];for(a=0;a<p.length;a++)b=p[a],c=b[0],d=b[1],c=(c-g)*e+g,d=(d-h)*f+h,m[n][a]=q(b,c,d,void 0)}"paths"in l?l.paths=m:l.rings=m;return l};m.getScaleRatio=function(a,e,f,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-e)*(d-e))/Math.sqrt((f-a)*(f-a)+(b-e)*(b-e))};m.getRotationAngle=function(a,e,f,b,c,d){return 180*Math.atan2(e-d,a-c)/Math.PI-180*Math.atan2(e-b,a-f)/Math.PI}});