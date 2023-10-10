export default `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform float uOffset;
uniform vec2 pixels;
uniform float uSpeed;
float PI = 3.141592653589793238;


vec3 deformationCurve(vec3 position, vec2 uv, float offset){
  position.x = position.x + (sin(uv.x * PI) * offset);
  position.y = position.y + (sin(uv.y * PI) * offset);
  return position;
}

void main() {
  vUv = uv;
  // vec3 newPosition = deformationCurve(position, uv, uOffset);

  vec3 pos = position;
  pos.y -= sin(uv.x * PI) * -uOffset * 1.2;
  pos.z += sin(uv.y * 40.) * -uOffset * 0.2;
  pos.x -= sin(uv.x * 40.) * -uOffset * 0.2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
`