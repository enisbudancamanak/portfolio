import { Vector2 } from 'three'

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const CustomPass = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    scale: { value: 1 },
    progress: { value: 0 },
    tSize: { value: new Vector2(256, 256) },
    center: { value: new Vector2(0.5, 0.5) },
    angle: { value: 1.57 },
    scale: { value: 1.0 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
    uniform float time;
    uniform float progress;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {
            vec2 newUV = vUv;

            // newUV = vUv + 0.1* vec2( sin(10.*vUv.x), sin(10.*vUv.y));

            // vec2 p = 2.* vUv - vec2(1.);
        
            // p += 0.1 * cos(scale * 2.*p.yx + time + vec2(1.2,3.4));
            // p += 0.1 * cos(scale * 3.*p.yx + 1.4*time + vec2(2.2,3.4));
            // p += 0.1 * cos(scale * 5.*p.yx + 2.6*time + vec2(4.2,1.4));
            // p += 0.1 * cos(scale * 7.*p.yx + 3.6*time + vec2(10.2,3.4));

            // // newUV.y = 0.; 
            // // newUV.x = length(centeredUV);

            // newUV.x = mix(vUv.x, length(p), progress);
            // newUV.y = mix(vUv.y, 0.5, progress);

            vec2 uv = vUv;

            vec2 p = 2.0 * vUv - 1.0; // -1 ~ 1
            p += 0.1 * cos(scale * 3.7 * p.yx + 1.4 * time + vec2(2.2, 3.4));
            p += 0.1 * cos(scale * 3.0 * p.yx + 1.0 * time + vec2(1.2, 3.4));
            p += 0.3 * cos(scale * 5.0 * p.yx + 2.6 * time + vec2(4.2, 1.4));
            p += 0.3 * cos(scale * 7.5 * p.yx + 3.6 * time + vec2(12.2, 3.4));
            uv.x = mix(vUv.x, length(p), progress);
            uv.y = mix(vUv.y, 0.5 * length(p) + 0.15, progress);

			vec4 color = texture2D( tDiffuse, uv );
            
            gl_FragColor = color;
			// gl_FragColor = vec4(length(p), 0., 0., 1.);

		}`,
}

export { CustomPass }
