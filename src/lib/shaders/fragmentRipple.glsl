export default `
uniform sampler2D uDisplacement;
uniform sampler2D uTexture;
uniform sampler2D tDiffuse;
varying vec2 vUv;
float PI = 3.141592653589;
void main() {
  vec2 uv = vUv;
  vec4 disp = texture2D(uDisplacement, uv);
  float theta = disp.r * 2.0 * PI;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.01; //0.005
  vec4 color = texture2D(tDiffuse, uv);
  
  gl_FragColor = color;

  // gl_FragColor = texture2D(u_displacement, v_uv);
}`