// Caustics-style background shader for Act VI (Archive)
// Renders refracted light patterns on a fullscreen plane

uniform float uTime;
uniform vec3 uAccentColor;
uniform float uIntensity;  // 0 → 1, driven by act progress

varying vec2 vUv;

// --- Noise helpers ---
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

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// Caustics pattern: the signature of light refracted through glass
float caustics(vec2 uv, float t) {
  vec2 p = uv * 3.0;
  p += vec2(
    fbm(p + t * 0.12),
    fbm(p.yx + t * 0.09)
  );
  float n = fbm(p + t * 0.08);
  // Sharp, bright ridges
  return pow(max(0.0, 1.0 - abs(sin(n * 8.0) * 0.5 + 0.5 - 0.85) * 8.0), 2.0);
}

void main() {
  vec2 uv = vUv;

  float t = uTime * 0.4;

  // Two overlapping caustic layers for depth
  float c1 = caustics(uv, t);
  float c2 = caustics(uv * 1.3 + vec2(0.4, 0.1), t * 0.7);
  float pattern = (c1 * 0.6 + c2 * 0.4);

  // Tint with accent color
  vec3 color = uAccentColor * pattern * 0.35;

  // Vignette — fade at edges so it sits naturally on the page
  vec2 centered = uv - 0.5;
  float vignette = 1.0 - dot(centered, centered) * 2.0;
  color *= max(0.0, vignette);

  gl_FragColor = vec4(color, pattern * uIntensity * 0.25);
}
