import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 p = vUv;
    
    // Liquid ripple displacement
    float wx = sin(p.y * 10.0 + uTime * 2.0) * 0.02 * uHover;
    float wy = cos(p.x * 10.0 + uTime * 2.0) * 0.02 * uHover;
    
    vec2 displaced = p + vec2(wx, wy);
    
    vec4 tex = texture2D(uTexture, displaced);
    
    // Mix full color with a slight brightness boost on hover
    vec3 color = mix(tex.rgb, tex.rgb * vec3(1.1, 1.1, 1.15), uHover * 0.5);
    
    gl_FragColor = vec4(color, tex.a);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uHover;

void main() {
    vUv = uv;
    
    vec3 pos = position;
    // Slight bulge effect on hover
    float dist = distance(uv, vec2(0.5));
    pos.z += sin(dist * 3.14) * 0.1 * uHover;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function LiquidImage({ url }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Create a default transparent data URI for when no URL is provided
  const fallbackUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const textureUrl = url || fallbackUrl;
  
  const texture = useTexture(textureUrl);
  
  const uniforms = {
    uTexture: { value: texture },
    uHover: { value: 0 },
    uTime: { value: 0 }
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      const targetHover = hovered ? 1 : 0;
      meshRef.current.material.uniforms.uHover.value += (targetHover - meshRef.current.material.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderImage({ url, className }) {
  return (
    <div className={`w-full h-full relative cursor-none ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 1.2], fov: 75 }}>
        <LiquidImage url={url} />
      </Canvas>
    </div>
  );
}
