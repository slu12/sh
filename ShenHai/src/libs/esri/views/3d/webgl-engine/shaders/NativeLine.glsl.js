// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/makeTemplateObjectHelper ../core/shaderLibrary/Slice.glsl ../core/shaderLibrary/Transform.glsl ../core/shaderLibrary/attributes/VertexColor.glsl ../core/shaderLibrary/shading/HighlightData.glsl ../core/shaderLibrary/shading/LineStipple.glsl ../core/shaderModules/interfaces ../core/shaderModules/ShaderBuilder".split(" "),function(u,e,c,f,n,p,q,r,d,t){Object.defineProperty(e,"__esModule",{value:!0});e.build=function(b){var a=new t.ShaderBuilder;a.include(n.Transform,
{linearDepth:!1});a.include(p.VertexColor,b);a.include(r.LineStipple,b);a.vertex.uniforms.add("proj","mat4").add("view","mat4").add("model","mat4");a.attributes.add("position","vec3");a.varyings.add("vpos","vec3");a.vertex.code.add(d.glsl(g||(g=c(["\n    void main(void) {\n      vpos \x3d (model * vec4(position, 1.0)).xyz;\n      forwardNormalizedVertexColor();\n      gl_Position \x3d transformPosition(proj, view, vpos);\n  "],["\n    void main(void) {\n      vpos \x3d (model * vec4(position, 1.0)).xyz;\n      forwardNormalizedVertexColor();\n      gl_Position \x3d transformPosition(proj, view, vpos);\n  "]))));
b.stippleEnabled&&(a.attributes.add("auxpos1","vec3"),a.vertex.uniforms.add("ndcToPixel","vec2"),a.vertex.code.add(d.glsl(h||(h=c(["\n    vec4 vpos2 \x3d transformPosition(proj, view, (model * vec4(auxpos1, 1.0)).xyz);\n    float lineSegmentPixelSize \x3d length((vpos2.xy / vpos2.w - gl_Position.xy / gl_Position.w) * ndcToPixel);\n\n    stipplePatternUv \x3d lineSegmentPixelSize * stipplePatternPixelSizeInv;\n    ","\n\n    // Cancel out perspective correct interpolation because we want this length the really represent\n    // the screen distance\n    stipplePatternUv *\x3d gl_Position.w;\n    "],
["\n    vec4 vpos2 \x3d transformPosition(proj, view, (model * vec4(auxpos1, 1.0)).xyz);\n    float lineSegmentPixelSize \x3d length((vpos2.xy / vpos2.w - gl_Position.xy / gl_Position.w) * ndcToPixel);\n\n    stipplePatternUv \x3d lineSegmentPixelSize * stipplePatternPixelSizeInv;\n    ","\n\n    // Cancel out perspective correct interpolation because we want this length the really represent\n    // the screen distance\n    stipplePatternUv *\x3d gl_Position.w;\n    "])),b.stippleIntegerRepeatsEnabled?
"stipplePatternUv \x3d floor(stipplePatternUv + 0.5);":"")));a.vertex.code.add(d.glsl(k||(k=c(["\n  }\n  "],["\n  }\n  "]))));0===b.output&&(a.include(f.Slice,b),a.fragment.uniforms.add("constantColor","vec4").add("alphaCoverage","float"),a.fragment.code.add(d.glsl(l||(l=c(["\n    void main() {\n      discardBySlice(vpos);\n\n      vec4 color \x3d ",";\n\n      float stippleAlpha \x3d getStippleAlpha();\n      discardByStippleAlpha(stippleAlpha, STIPPLE_ALPHA_COLOR_DISCARD);\n\n      gl_FragColor \x3d highlightSlice(blendStipple(vec4(color.rgb, color.a * alphaCoverage), stippleAlpha), vpos);\n    }\n    "],
["\n    void main() {\n      discardBySlice(vpos);\n\n      vec4 color \x3d ",";\n\n      float stippleAlpha \x3d getStippleAlpha();\n      discardByStippleAlpha(stippleAlpha, STIPPLE_ALPHA_COLOR_DISCARD);\n\n      gl_FragColor \x3d highlightSlice(blendStipple(vec4(color.rgb, color.a * alphaCoverage), stippleAlpha), vpos);\n    }\n    "])),b.attributeColor?"vcolor":"constantColor")));4===b.output&&(a.include(f.Slice,b),a.include(q.HighlightData),a.fragment.uniforms.add("depthTex","sampler2D"),a.fragment.uniforms.add("highlightViewportPixelSz",
"vec4"),a.fragment.code.add(d.glsl(m||(m=c(["\n    void main() {\n      discardBySlice(vpos);\n\n      discardByStippleAlpha(getStippleAlpha(), STIPPLE_ALPHA_HIGHLIGHT_DISCARD);\n\n      gl_FragColor \x3d highlightData(gl_FragCoord, depthTex, highlightViewportPixelSz);\n    }\n    "],["\n    void main() {\n      discardBySlice(vpos);\n\n      discardByStippleAlpha(getStippleAlpha(), STIPPLE_ALPHA_HIGHLIGHT_DISCARD);\n\n      gl_FragColor \x3d highlightData(gl_FragCoord, depthTex, highlightViewportPixelSz);\n    }\n    "])))));
return a};var g,h,k,l,m});