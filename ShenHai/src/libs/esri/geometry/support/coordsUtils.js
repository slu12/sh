// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define(["require","exports","./spatialReferenceUtils"],function(u,c,t){function n(a,b){var d=b[0]-a[0],e=b[1]-a[1];return 2<a.length&&2<b.length?(a=a[2]-b[2],Math.sqrt(d*d+e*e+a*a)):Math.sqrt(d*d+e*e)}function p(a,b,d){var e=a[0]+d*(b[0]-a[0]),f=a[1]+d*(b[1]-a[1]);return 2<a.length&&2<b.length?[e,f,a[2]+d*(b[2]-a[2])]:[e,f]}function q(a,b,d){for(var e=a.length,f=0,g=0,k=0,m=0;m<e;m++){var h=a[m],c=a[(m+1)%e],l=2,f=f+(h[0]*c[1]-c[0]*h[1]);2<h.length&&2<c.length&&d&&(g+=h[0]*c[2]-c[0]*h[2],l=3);h.length>
l&&c.length>l&&b&&(k+=h[0]*c[l]-c[0]*h[l])}return 0>=f&&0>=g&&0>=k}function r(a,b){if(b=t.getInfo(b)){var d=b.valid[0],e=b.valid[1],f=e-d;b=function(a){var b=Infinity,g=-Infinity;a.forEach(function(a){for(var c=a[0];c<d;)c+=f;for(;c>e;)c-=f;b=Math.min(b,c);g=Math.max(g,c);a[0]=c});var c=g-b;f-c<c&&a.forEach(function(a){0>a[0]&&(a[0]+=f)})};for(var g=0;g<a.length;g++)b(a[g])}}Object.defineProperty(c,"__esModule",{value:!0});c.geometryToCoordinates=function(a){if(!a)return null;if(Array.isArray(a))return a;
var b=a.hasZ,d=a.hasM;if("point"===a.type)return d&&b?[a.x,a.y,a.z,a.m]:b?[a.x,a.y,a.z]:d?[a.x,a.y,a.m]:[a.x,a.y];if("polygon"===a.type)return a.rings.slice(0);if("polyline"===a.type)return a.paths.slice(0);if("multipoint"===a.type)return a.points.slice(0);if("extent"===a.type){a=a.clone().normalize();if(!a)return null;var e=!1,c=!1;a.forEach(function(a){a.hasZ&&(e=!0);a.hasM&&(c=!0)});return a.map(function(a){var b=[[a.xmin,a.ymin],[a.xmin,a.ymax],[a.xmax,a.ymax],[a.xmax,a.ymin],[a.xmin,a.ymin]];
if(e&&a.hasZ)for(var d=.5*(a.zmax-a.zmin),f=0;f<b.length;f++)b[f].push(d);if(c&&a.hasM)for(a=.5*(a.mmax-a.mmin),f=0;f<b.length;f++)b[f].push(a);return b})}return null};c.getLength=n;c.getMidpoint=function(a,b){return p(a,b,.5)};c.getPathLength=function(a){for(var b=a.length,d=0,e=0;e<b-1;++e)d+=n(a[e],a[e+1]);return d};c.getPointOnPath=function(a,b){if(0>=b)return a[0];for(var d=a.length,e=0,c=0;c<d-1;++c){var g=n(a[c],a[c+1]);if(b-e<g)return p(a[c],a[c+1],(b-e)/g);e+=g}return a[d-1]};c.isClockwise=
q;c.closeRingsAndFixWinding=function(a){if("rings"in a){for(var b=0,d=a.rings;b<d.length;b++){var e=d[b];3>e.length||e[0][0]===e[e.length-1][0]&&e[0][1]===e[e.length-1][1]||e.push([e[0][0],e[0][1]])}if(0<a.rings.length&&!q(a.rings[0],a.hasM,a.hasZ))for(b=0;b<a.rings.length;++b)a.rings[b]=a.rings[b].reverse()}};c.closeRings=function(a){if("rings"in a){var b=0;for(a=a.rings;b<a.length;b++){var d=a[b];3>d.length||d[0][0]===d[d.length-1][0]&&d[0][1]===d[d.length-1][1]||d.push([d[0][0],d[0][1]])}}};c.getRingArea=
function(a){for(var b=a.length,d=0,e=0;e<b;e++)var c=a[e],g=a[(e+1)%b],d=d+(c[0]*g[1]-g[0]*c[1]);return d};c.unnormalizeGeometryOnDatelineCrossing=function(a){if("polygon"!==a.type&&"polyline"!==a.type)return a;r("polygon"===a.type?a.rings:a.paths,a.spatialReference);return a};c.unnormalizeVerticesOnDatelineCrossing=r;c.computeUnnormalizedVertexPositionsOnDateLineCrossing=function(a,b,c,e){var d=Infinity,g=-Infinity;a.forEach(function(a){for(var f=a.pos[0];f<b;)f+=e;for(;f>c;)f-=e;d=Math.min(d,f);
g=Math.max(g,f);a.unnormalizedPos[0]=f;a.unnormalizedPos[1]=a.pos[1];2<a.pos.length&&(a.unnormalizedPos[2]=a.pos[2]);3<a.pos.length&&(a.unnormalizedPos[3]=a.pos[3])});var k=g-d;e-k<k&&a.forEach(function(a){0>a.unnormalizedPos[0]&&(a.unnormalizedPos[0]+=e)})}});