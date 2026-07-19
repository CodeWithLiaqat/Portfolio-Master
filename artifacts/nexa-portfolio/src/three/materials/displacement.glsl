// Displacement + RGB-shift fragment shader for gallery image planes
// Used by GalleryPlanes scene on Portfolio page hover

uniform sampler2D uTexture;
uniform float uHover;       // 0 → 1 on hover
uniform vec2 uMouse;        // normalized mouse in [-1, 1]
uniform float uTime;

varying vec2 vUv;

// Simplex-noise hash
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = vUv;

  // Displacement from noise + hover intensity
  float n = noise(uv * 4.0 + uTime * 0.1);
  float disp = uHover * n * 0.04;

  // Subtle ripple from mouse proximity
  float dist = length(uv - (uMouse * 0.5 + 0.5));
  float ripple = uHover * max(0.0, 1.0 - dist * 3.0) * sin(dist * 30.0 - uTime * 5.0) * 0.012;

  uv += vec2(disp + ripple);

  // RGB micro-shift (chromatic aberration on hover)
  float shift = uHover * 0.007;
  float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
  float a = texture2D(uTexture, uv).a;

  gl_FragColor = vec4(r, g, b, a);
}
