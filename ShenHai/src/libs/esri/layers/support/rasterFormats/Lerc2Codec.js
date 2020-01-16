// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define([],function(){var A={unstuff:function(a,b,f,d,c,h,l,m){var e=(1<<f)-1,n=0,p,g=0,k,q;a[a.length-1]<<=8*(4*a.length-Math.ceil(f*d/8));if(c)for(p=0;p<d;p++)0===g&&(q=a[n++],g=32),g>=f?(k=q>>>g-f&e,g-=f):(g=f-g,k=(q&e)<<g&e,q=a[n++],g=32-g,k+=q>>>g),b[p]=c[k];else for(c=Math.ceil((m-h)/l),p=0;p<d;p++)0===g&&(q=a[n++],g=32),g>=f?(k=q>>>g-f&e,g-=f):(g=f-g,k=(q&e)<<g&e,q=a[n++],g=32-g,k+=q>>>g),b[p]=k<c?h+k*l:m},unstuffLUT:function(a,b,f,d,c,h){var l=(1<<b)-1,m=0,e=0,n=0,p=n=0,g,k=[];a[a.length-1]<<=
8*(4*a.length-Math.ceil(b*f/8));for(var q=Math.ceil((h-d)/c),e=0;e<f;e++)0===n&&(g=a[m++],n=32),n>=b?(p=g>>>n-b&l,n-=b):(n=b-n,p=(g&l)<<n&l,g=a[m++],n=32-n,p+=g>>>n),k[e]=p<q?d+p*c:h;k.unshift(d);return k},unstuff2:function(a,b,f,d,c,h,l,m){var e=(1<<f)-1,n=0,p,g=0,k=0,q,u,r;if(c)for(p=0;p<d;p++)0===g&&(u=a[n++],g=32,k=0),g>=f?(q=u>>>k&e,g-=f,k+=f):(r=f-g,q=u>>>k&e,u=a[n++],g=32-r,q|=(u&(1<<r)-1)<<f-r,k=r),b[p]=c[q];else for(c=Math.ceil((m-h)/l),p=0;p<d;p++)0===g&&(u=a[n++],g=32,k=0),g>=f?(q=u>>>
k&e,g-=f,k+=f):(r=f-g,q=u>>>k&e,u=a[n++],g=32-r,q|=(u&(1<<r)-1)<<f-r,k=r),b[p]=q<c?h+q*l:m;return b},unstuffLUT2:function(a,b,f,d,c,h){for(var l=(1<<b)-1,m=0,e=0,n=0,p=0,g=0,k=0,q,u=[],r=Math.ceil((h-d)/c),e=0;e<f;e++)0===p&&(q=a[m++],p=32,k=0),p>=b?(g=q>>>k&l,p-=b,k+=b):(n=b-p,g=q>>>k&l,q=a[m++],p=32-n,g|=(q&(1<<n)-1)<<b-n,k=n),u[e]=g<r?d+g*c:h;u.unshift(d);return u},originalUnstuff:function(a,b,f,d){var c=(1<<f)-1,h=0,l,m=0,e,n;a[a.length-1]<<=8*(4*a.length-Math.ceil(f*d/8));for(l=0;l<d;l++)0===
m&&(n=a[h++],m=32),m>=f?(e=n>>>m-f&c,m-=f):(m=f-m,e=(n&c)<<m&c,n=a[h++],m=32-m,e+=n>>>m),b[l]=e;return b},originalUnstuff2:function(a,b,f,d){var c=(1<<f)-1,h=0,l,m=0,e=0,n,p,g;for(l=0;l<d;l++)0===m&&(p=a[h++],m=32,e=0),m>=f?(n=p>>>e&c,m-=f,e+=f):(g=f-m,n=p>>>e&c,p=a[h++],m=32-g,n|=(p&(1<<g)-1)<<f-g,e=g),b[l]=n;return b}},x={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(a){for(var b=65535,f=65535,d=a.length,c=Math.floor(d/2),h=0;c;){var l=359<=c?359:c,c=c-l;do b+=a[h++]<<8,f+=b+=a[h++];
while(--l);b=(b&65535)+(b>>>16);f=(f&65535)+(f>>>16)}d&1&&(f+=b+=a[h]<<8);return((f&65535)+(f>>>16)<<16|(b&65535)+(b>>>16))>>>0},readHeaderInfo:function(a,b){var f=b.ptr,d=new Uint8Array(a,f,6),c={};c.fileIdentifierString=String.fromCharCode.apply(null,d);if(0!==c.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+c.fileIdentifierString;var f=f+6,d=new DataView(a,f,8),h=d.getInt32(0,!0);c.fileVersion=h;f+=4;3<=h&&(c.checksum=d.getUint32(4,!0),f+=
4);d=new DataView(a,f,12);c.height=d.getUint32(0,!0);c.width=d.getUint32(4,!0);f+=8;4<=h?(c.numDims=d.getUint32(8,!0),f+=4):c.numDims=1;d=new DataView(a,f,40);c.numValidPixel=d.getUint32(0,!0);c.microBlockSize=d.getInt32(4,!0);c.blobSize=d.getInt32(8,!0);c.imageType=d.getInt32(12,!0);c.maxZError=d.getFloat64(16,!0);c.zMin=d.getFloat64(24,!0);c.zMax=d.getFloat64(32,!0);f+=40;b.headerInfo=c;b.ptr=f;if(3<=h&&(a=this.computeChecksumFletcher32(new Uint8Array(a,f-(4<=h?52:48),c.blobSize-14)),a!==c.checksum))throw"Checksum failed.";
return!0},checkMinMaxRanges:function(a,b){var f=b.headerInfo,d=this.getDataTypeArray(f.imageType),c=f.numDims*this.getDataTypeSize(f.imageType),h=this.readSubArray(a,b.ptr,d,c);a=this.readSubArray(a,b.ptr+c,d,c);b.ptr+=2*c;c=!0;for(b=0;b<f.numDims;b++)if(h[b]!==a[b]){c=!1;break}f.minValues=h;f.maxValues=a;return c},readSubArray:function(a,b,f,d){if(f===Uint8Array)a=new Uint8Array(a,b,d);else{var c=new ArrayBuffer(d);(new Uint8Array(c)).set(new Uint8Array(a,b,d));a=new f(c)}return a},readMask:function(a,
b){var f=b.ptr,d=b.headerInfo,c=d.width*d.height,h=d.numValidPixel,l=new DataView(a,f,4),d={};d.numBytes=l.getUint32(0,!0);f+=4;if((0===h||c===h)&&0!==d.numBytes)throw"invalid mask";if(0===h)h=new Uint8Array(Math.ceil(c/8)),d.bitset=h,l=new Uint8Array(c),b.pixels.resultMask=l,f+=d.numBytes;else if(0<d.numBytes){h=new Uint8Array(Math.ceil(c/8));l=new DataView(a,f,d.numBytes);a=l.getInt16(0,!0);var m=2,e=0,n=0;do{if(0<a)for(;a--;)h[e++]=l.getUint8(m++);else for(n=l.getUint8(m++),a=-a;a--;)h[e++]=n;
a=l.getInt16(m,!0);m+=2}while(m<d.numBytes);if(-32768!==a||e<h.length)throw"Unexpected end of mask RLE encoding";l=new Uint8Array(c);for(m=m=a=0;m<c;m++)m&7?(a=h[m>>3],a<<=m&7):a=h[m>>3],a&128&&(l[m]=1);b.pixels.resultMask=l;d.bitset=h;f+=d.numBytes}b.ptr=f;b.mask=d;return!0},readDataOneSweep:function(a,b,f){var d=b.ptr,c=b.headerInfo,h=c.numDims,l=c.width*c.height,c=c.numValidPixel*x.getDataTypeSize(c.imageType)*h,m=b.pixels.resultMask;if(f===Uint8Array)a=new Uint8Array(a,d,c);else{var e=new ArrayBuffer(c);
(new Uint8Array(e)).set(new Uint8Array(a,d,c));a=new f(e)}if(a.length===l*h)b.pixels.resultPixels=a;else{b.pixels.resultPixels=new f(l*h);var n=e=f=0,p=0;if(1<h)for(n=0;n<h;n++)for(p=n*l,e=0;e<l;e++)m[e]&&(b.pixels.resultPixels[p+e]=a[f++]);else for(e=0;e<l;e++)m[e]&&(b.pixels.resultPixels[e]=a[f++])}b.ptr=d+c;return!0},readHuffmanTree:function(a,b){var f=this.HUFFMAN_LUT_BITS_MAX,d=new DataView(a,b.ptr,16);b.ptr+=16;if(2>d.getInt32(0,!0))throw"unsupported Huffman version";var c=d.getInt32(4,!0),
h=d.getInt32(8,!0),d=d.getInt32(12,!0);if(h>=d)return!1;var l=new Uint32Array(d-h);x.decodeBits(a,b,l);var m=[],e,n,p;for(e=h;e<d;e++)n=e-(e<c?0:c),m[n]={first:l[e-h],second:null};e=a.byteLength-b.ptr;l=new ArrayBuffer(4*Math.ceil(e/4));(new Uint8Array(l)).set(new Uint8Array(a,b.ptr,e));a=new Uint32Array(l);b=0;var g,l=0;g=a[0];for(e=h;e<d;e++)n=e-(e<c?0:c),p=m[n].first,0<p&&(m[n].second=g<<b>>>32-p,32-b>=p?(b+=p,32===b&&(b=0,l++,g=a[l])):(b+=p-32,l++,g=a[l],m[n].second|=g>>>32-b));var k=g=0,q=new I;
for(e=0;e<m.length;e++)void 0!==m[e]&&(g=Math.max(g,m[e].first));var k=g>=f?f:g,f=[],u,r;for(e=h;e<d;e++)if(n=e-(e<c?0:c),p=m[n].first,0<p)if(h=[p,n],p<=k)for(n=m[n].second<<k-p,u=1<<k-p,p=0;p<u;p++)f[n|p]=h;else for(n=m[n].second,u=q,--p;0<=p;p--)(r=n>>>p&1)?(u.right||(u.right=new I),u=u.right):(u.left||(u.left=new I),u=u.left),0!==p||u.val||(u.val=h[1]);return{decodeLut:f,numBitsLUTQick:k,numBitsLUT:g,tree:q,stuffedData:a,srcPtr:l,bitPos:b}},readHuffman:function(a,b,f){var d=b.headerInfo,c=d.numDims,
h=b.headerInfo.height,l=b.headerInfo.width,m=l*h,e=this.readHuffmanTree(a,b);a=e.decodeLut;var n=e.tree,p=e.stuffedData,g=e.srcPtr,k=e.bitPos,q=e.numBitsLUTQick,e=e.numBitsLUT,u=0===b.headerInfo.imageType?128:0,r,v,y=b.pixels.resultMask,x,A,C,t,z,w,B=0;0<k&&(g++,k=0);var D=p[g],L=1===b.encodeMode,K=new f(m*c),G=K,E;for(E=0;E<d.numDims;E++){1<c&&(G=new f(K.buffer,m*E,m),B=0);if(b.headerInfo.numValidPixel===l*h)for(C=z=0;C<h;C++)for(t=0;t<l;t++,z++){v=0;r=x=D<<k>>>32-q;32-k<q&&(r=x|=p[g+1]>>>64-k-q);
if(a[r])v=a[r][1],k+=a[r][0];else for(r=x=D<<k>>>32-e,32-k<e&&(r=x|=p[g+1]>>>64-k-e),r=n,w=0;w<e;w++)if(r=(A=x>>>e-w-1&1)?r.right:r.left,!r.left&&!r.right){v=r.val;k=k+w+1;break}32<=k&&(k-=32,g++,D=p[g]);v-=u;L?(v=0<t?v+B:0<C?v+G[z-l]:v+B,v&=255,B=G[z]=v):G[z]=v}else for(C=z=0;C<h;C++)for(t=0;t<l;t++,z++)if(y[z]){v=0;r=x=D<<k>>>32-q;32-k<q&&(r=x|=p[g+1]>>>64-k-q);if(a[r])v=a[r][1],k+=a[r][0];else for(r=x=D<<k>>>32-e,32-k<e&&(r=x|=p[g+1]>>>64-k-e),r=n,w=0;w<e;w++)if(r=(A=x>>>e-w-1&1)?r.right:r.left,
!r.left&&!r.right){v=r.val;k=k+w+1;break}32<=k&&(k-=32,g++,D=p[g]);v-=u;L?(v=0<t&&y[z-1]?v+B:0<C&&y[z-l]?v+G[z-l]:v+B,v&=255,B=G[z]=v):G[z]=v}b.ptr=b.ptr+4*(g+1)+(0<k?4:0)}b.pixels.resultPixels=K},decodeBits:function(a,b,f,d,c){var h=b.headerInfo,l=h.fileVersion,m=0,e=new DataView(a,b.ptr,5<=a.byteLength-b.ptr?5:a.byteLength-b.ptr),n=e.getUint8(0);m++;var p=n>>6,g=0===p?4:3-p,k=0<(n&32)?!0:!1,p=n&31,n=0;if(1===g)n=e.getUint8(m),m++;else if(2===g)n=e.getUint16(m,!0),m+=2;else if(4===g)n=e.getUint32(m,
!0),m+=4;else throw"Invalid valid pixel count type";var g=2*h.maxZError,q,u;c=1<h.numDims?h.maxValues[c]:h.zMax;if(k){b.counter.lut++;k=e.getUint8(m);m++;h=Math.ceil((k-1)*p/8);q=Math.ceil(h/4);q=new ArrayBuffer(4*q);u=new Uint8Array(q);b.ptr+=m;u.set(new Uint8Array(a,b.ptr,h));m=new Uint32Array(q);b.ptr+=h;for(e=0;k-1>>>e;)e++;h=Math.ceil(n*e/8);q=Math.ceil(h/4);q=new ArrayBuffer(4*q);u=new Uint8Array(q);u.set(new Uint8Array(a,b.ptr,h));a=new Uint32Array(q);b.ptr+=h;b=3<=l?A.unstuffLUT2(m,p,k-1,
d,g,c):A.unstuffLUT(m,p,k-1,d,g,c);3<=l?A.unstuff2(a,f,e,n,b):A.unstuff(a,f,e,n,b)}else b.counter.bitstuffer++,e=p,b.ptr+=m,0<e&&(h=Math.ceil(n*e/8),q=Math.ceil(h/4),q=new ArrayBuffer(4*q),u=new Uint8Array(q),u.set(new Uint8Array(a,b.ptr,h)),a=new Uint32Array(q),b.ptr+=h,3<=l?null==d?A.originalUnstuff2(a,f,e,n):A.unstuff2(a,f,e,n,!1,d,g,c):null==d?A.originalUnstuff(a,f,e,n):A.unstuff(a,f,e,n,!1,d,g,c))},readTiles:function(a,b,f){var d=b.headerInfo,c=d.width,h=d.height,l=d.microBlockSize,m=d.imageType,
e=x.getDataTypeSize(m),n=Math.ceil(c/l),p=Math.ceil(h/l);b.pixels.numBlocksY=p;b.pixels.numBlocksX=n;for(var g=b.pixels.ptr=0,k=0,q=0,u=0,r=0,v=0,y=0,A=0,J=0,C=0,t=0,z=0,w=0,y=w=y=0,B,D=new f(l*l),L=h%l||l,K=c%l||l,G=d.numDims,E,H=b.pixels.resultMask,F=b.pixels.resultPixels,I=5<=d.fileVersion?14:15,M=d.zMax,q=0;q<p;q++)for(r=q!==p-1?l:L,u=0;u<n;u++)for(v=u!==n-1?l:K,t=q*c*l+u*l,z=c-v,E=0;E<G;E++){1<G?(w=F,t=q*c*l+u*l,F=new f(b.pixels.resultPixels.buffer,c*h*E*e,c*h),M=d.maxValues[E]):w=null;y=a.byteLength-
b.ptr;g=new DataView(a,b.ptr,Math.min(10,y));k={};y=0;A=g.getUint8(0);y++;B=5<=d.fileVersion?A&4:0;J=A>>6&255;C=A>>2&I;if(C!==(u*l>>3&I))throw"integrity issue";if(B&&0===E)throw"integrity issue";A&=3;if(3<A)throw b.ptr+=y,"Invalid block encoding ("+A+")";if(2===A){if(B)if(H)for(g=0;g<r;g++)for(k=0;k<v;k++)H[t]&&(F[t]=w[t]),t++;else for(g=0;g<r;g++)for(k=0;k<v;k++)F[t]=w[t],t++;b.counter.constant++;b.ptr+=y}else if(0===A){if(B)throw"integrity issue";b.counter.uncompressed++;b.ptr+=y;w=r*v*e;y=a.byteLength-
b.ptr;w=w<y?w:y;y=new ArrayBuffer(0===w%e?w:w+e-w%e);B=new Uint8Array(y);B.set(new Uint8Array(a,b.ptr,w));y=new f(y);w=0;if(H)for(g=0;g<r;g++){for(k=0;k<v;k++)H[t]&&(F[t]=y[w++]),t++;t+=z}else for(g=0;g<r;g++){for(k=0;k<v;k++)F[t++]=y[w++];t+=z}b.ptr+=w*e}else if(J=x.getDataTypeUsed(B&&6>m?5:m,J),C=x.getOnePixel(k,y,J,g),y+=x.getDataTypeSize(J),3===A)if(b.ptr+=y,b.counter.constantoffset++,H)for(g=0;g<r;g++){for(k=0;k<v;k++)H[t]&&(F[t]=B?Math.min(M,w[t]+C):C),t++;t+=z}else for(g=0;g<r;g++){for(k=0;k<
v;k++)F[t]=B?Math.min(M,w[t]+C):C,t++;t+=z}else if(b.ptr+=y,x.decodeBits(a,b,D,C,E),y=0,B)if(H)for(g=0;g<r;g++){for(k=0;k<v;k++)H[t]&&(F[t]=D[y++]+w[t]),t++;t+=z}else for(g=0;g<r;g++){for(k=0;k<v;k++)F[t]=D[y++]+w[t],t++;t+=z}else if(H)for(g=0;g<r;g++){for(k=0;k<v;k++)H[t]&&(F[t]=D[y++]),t++;t+=z}else for(g=0;g<r;g++){for(k=0;k<v;k++)F[t++]=D[y++];t+=z}}},formatFileInfo:function(a){return{fileIdentifierString:a.headerInfo.fileIdentifierString,fileVersion:a.headerInfo.fileVersion,imageType:a.headerInfo.imageType,
height:a.headerInfo.height,width:a.headerInfo.width,numValidPixel:a.headerInfo.numValidPixel,microBlockSize:a.headerInfo.microBlockSize,blobSize:a.headerInfo.blobSize,maxZError:a.headerInfo.maxZError,pixelType:x.getPixelType(a.headerInfo.imageType),eofOffset:a.eofOffset,mask:a.mask?{numBytes:a.mask.numBytes}:null,pixels:{numBlocksX:a.pixels.numBlocksX,numBlocksY:a.pixels.numBlocksY,maxValue:a.headerInfo.zMax,minValue:a.headerInfo.zMin,noDataValue:a.noDataValue}}},constructConstantSurface:function(a){var b=
a.headerInfo.zMax,f=a.headerInfo.numDims,d=a.headerInfo.height*a.headerInfo.width,c=0,h=0,l=0,m=a.pixels.resultMask,e=a.pixels.resultPixels;if(m)if(1<f)for(c=0;c<f;c++)for(l=c*d,b=a.headerInfo.maxValues[c],h=0;h<d;h++)m[h]&&(e[l+h]=b);else for(h=0;h<d;h++)m[h]&&(e[h]=b);else if(1<f)for(c=0;c<f;c++)for(l=c*d,b=a.headerInfo.maxValues[c],h=0;h<d;h++)e[l+h]=b;else for(h=0;h<d;h++)e[h]=b},getDataTypeArray:function(a){switch(a){case 0:a=Int8Array;break;case 1:a=Uint8Array;break;case 2:a=Int16Array;break;
case 3:a=Uint16Array;break;case 4:a=Int32Array;break;case 5:a=Uint32Array;break;case 6:a=Float32Array;break;case 7:a=Float64Array;break;default:a=Float32Array}return a},getPixelType:function(a){switch(a){case 0:a="S8";break;case 1:a="U8";break;case 2:a="S16";break;case 3:a="U16";break;case 4:a="S32";break;case 5:a="U32";break;case 6:a="F32";break;case 7:a="F64";break;default:a="F32"}return a},isValidPixelValue:function(a,b){if(null==b)return!1;switch(a){case 0:a=-128<=b&&127>=b;break;case 1:a=0<=
b&&255>=b;break;case 2:a=-32768<=b&&32767>=b;break;case 3:a=0<=b&&65536>=b;break;case 4:a=-2147483648<=b&&2147483647>=b;break;case 5:a=0<=b&&4294967296>=b;break;case 6:a=-3.4027999387901484E38<=b&&3.4027999387901484E38>=b;break;case 7:a=4.9E-324<=b&&1.7976931348623157E308>=b;break;default:a=!1}return a},getDataTypeSize:function(a){var b=0;switch(a){case 0:case 1:b=1;break;case 2:case 3:b=2;break;case 4:case 5:case 6:b=4;break;case 7:b=8;break;default:b=a}return b},getDataTypeUsed:function(a,b){var f=
a;switch(a){case 2:case 4:f=a-b;break;case 3:case 5:f=a-2*b;break;case 6:f=0===b?a:1===b?2:1;break;case 7:f=0===b?a:a-2*b+1;break;default:f=a}return f},getOnePixel:function(a,b,f,d){a=0;switch(f){case 0:a=d.getInt8(b);break;case 1:a=d.getUint8(b);break;case 2:a=d.getInt16(b,!0);break;case 3:a=d.getUint16(b,!0);break;case 4:a=d.getInt32(b,!0);break;case 5:a=d.getUInt32(b,!0);break;case 6:a=d.getFloat32(b,!0);break;case 7:a=d.getFloat64(b,!0);break;default:throw"the decoder does not understand this pixel type";
}return a}},I=function(a,b,f){this.val=a;this.left=b;this.right=f};return{decode:function(a,b){b=b||{};var f=b.noDataValue,d=0,c={};c.ptr=b.inputOffset||0;c.pixels={};if(x.readHeaderInfo(a,c)){var d=c.headerInfo,h=d.fileVersion,l=x.getDataTypeArray(d.imageType);if(5<h)throw"unsupported lerc version 2."+h;x.readMask(a,c);d.numValidPixel===d.width*d.height||c.pixels.resultMask||(c.pixels.resultMask=b.maskData);var m=d.width*d.height;c.pixels.resultPixels=new l(m*d.numDims);c.counter={onesweep:0,uncompressed:0,
lut:0,bitstuffer:0,constant:0,constantoffset:0};if(0!==d.numValidPixel)if(d.zMax===d.zMin)x.constructConstantSurface(c);else if(4<=h&&x.checkMinMaxRanges(a,c))x.constructConstantSurface(c);else{var e=new DataView(a,c.ptr,2),n=e.getUint8(0);c.ptr++;if(n)x.readDataOneSweep(a,c,l);else if(1<h&&1>=d.imageType&&1E-5>Math.abs(d.maxZError-.5)){e=e.getUint8(1);c.ptr++;c.encodeMode=e;if(2<e||4>h&&1<e)throw"Invalid Huffman flag "+e;e?x.readHuffman(a,c,l):x.readTiles(a,c,l)}else x.readTiles(a,c,l)}c.eofOffset=
c.ptr;b.inputOffset?(a=c.headerInfo.blobSize+b.inputOffset-c.ptr,1<=Math.abs(a)&&(c.eofOffset=b.inputOffset+c.headerInfo.blobSize)):(a=c.headerInfo.blobSize-c.ptr,1<=Math.abs(a)&&(c.eofOffset=c.headerInfo.blobSize));a={width:d.width,height:d.height,pixelData:c.pixels.resultPixels,minValue:d.zMin,maxValue:d.zMax,validPixelCount:d.numValidPixel,dimCount:d.numDims,dimStats:{minValues:d.minValues,maxValues:d.maxValues},maskData:c.pixels.resultMask};if(c.pixels.resultMask&&x.isValidPixelValue(d.imageType,
f)){h=c.pixels.resultMask;for(d=0;d<m;d++)h[d]||(a.pixelData[d]=f);a.noDataValue=f}c.noDataValue=f;b.returnFileInfo&&(a.fileInfo=x.formatFileInfo(c));return a}},getBandCount:function(a){for(var b=0,f=0,d={ptr:0,pixels:{}};f<a.byteLength-58;)x.readHeaderInfo(a,d),f+=d.headerInfo.blobSize,b++,d.ptr=f;return b}}});