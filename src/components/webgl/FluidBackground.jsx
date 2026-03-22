import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

// Random noise function
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Basic noise
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// Fractional Brownian Motion
#define OCTAVES 3
float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Mouse influence
    vec2 mouse = uMouse;
    float dist = distance(st, mouse);
    float mouseEffect = smoothstep(0.4, 0.0, dist);

    // Dynamic distortion
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.02 * uTime);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.05 * uTime + mouseEffect * 0.5);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.05 * uTime - mouseEffect * 0.5);

    float f = fbm(st + r);

    // Light theme palette
    vec3 color = mix(
        vec3(0.019, 0.043, 0.078), // #050B14 Midnight Blue
        vec3(0.145, 0.388, 0.921), // #2563EB Royal Blue
        clamp((f * f) * 1.5, 0.0, 1.0)
    );

    // Add noise grain
    float grain = random(st * uTime) * 0.03;
    color -= grain;

    // Final glow (#00D4FF cursor glow)
    color = mix(color, vec3(0.000, 0.831, 1.000), mouseEffect * 0.08 * f);

    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef();
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(-1, -1) },
    }),
    [size]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
      
      // Map mouse from normalized device coordinates (-1 to +1) to screen space normalized (0 to 1)
      const targetX = (state.pointer.x + 1) / 2 * (size.width / size.height);
      const targetY = (state.pointer.y + 1) / 2;
      
      // Lerp for smooth trailing mouse effect
      meshRef.current.material.uniforms.uMouse.value.x += (targetX - meshRef.current.material.uniforms.uMouse.value.x) * 0.05;
      meshRef.current.material.uniforms.uMouse.value.y += (targetY - meshRef.current.material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Plane covering the whole visible frustum exactly */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
