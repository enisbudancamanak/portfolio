export default `
uniform float time;
uniform sampler2D uTexture;
uniform sampler2D displacement;
uniform float uOffset;
uniform float opacity;
// uniform float uAlpha;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

vec3 rgbShift(sampler2D textureImage, vec2 uv, float offset) {
   float r = texture2D(textureImage, uv + offset).r;
   vec2 gb = texture2D(textureImage, uv).gb;
   return vec3(r,gb);
 }

void main()	{

  vec4 displace = texture2D(displacement, vUv.yx);

  vec2 displacedUV = vec2(vUv.x, vUv.y);

  displacedUV.y = mix(vUv.y, displace.r - 0.2, 5.* uOffset);

  vec4 color = texture2D(uTexture, displacedUV);

  color.r = texture2D(uTexture, displacedUV + vec2(0.,5.* 0.005) * 20.* uOffset).r;
  color.g = texture2D(uTexture, displacedUV + vec2(0.,20.* 0.01) * 3.* uOffset).g;
  // color.b = texture2D(uTexture, displacedUV + vec2(0.,30.* 0.002) * 5.*uOffset).b;


  color *= opacity;
  gl_FragColor = color;
  //  vec3 color = rgbShift(uTexture,vUv,uOffset);
  //  gl_FragColor = vec4(color,1.);

  // gl_FragColor = texture2D(uTexture, vUv);
}`