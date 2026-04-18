"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "@/components/providers/theme-provider";
import { themePalette } from "@/lib/theme";

type NetworkPoint = [number, number, number];

function createNetworkData() {
  let seed = 7.813;

  const random = () => {
    seed = Math.sin(seed * 43758.5453) * 43758.5453;
    return seed - Math.floor(seed);
  };

  const points: NetworkPoint[] = [];

  for (let index = 0; index < 18; index += 1) {
    const radius = 1.4 + random() * 1.8;
    const theta = random() * Math.PI * 2;
    const y = (random() - 0.5) * 2.2;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius * 0.62;

    points.push([x, y, z]);
  }

  const connections: Array<[NetworkPoint, NetworkPoint]> = [];

  points.forEach((point, index) => {
    const sorted = points
      .map((candidate, candidateIndex) => ({
        candidate,
        candidateIndex,
        distance:
          (point[0] - candidate[0]) ** 2 +
          (point[1] - candidate[1]) ** 2 +
          (point[2] - candidate[2]) ** 2
      }))
      .filter((entry) => entry.candidateIndex !== index)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, 2);

    sorted.forEach((entry) => {
      if (index < entry.candidateIndex) {
        connections.push([point, entry.candidate]);
      }
    });
  });

  return { points, connections };
}

const network = createNetworkData();
const connectionPositions = new Float32Array(network.connections.length * 6);

network.connections.forEach((connection, index) => {
  const base = index * 6;
  const [start, end] = connection;

  connectionPositions[base] = start[0];
  connectionPositions[base + 1] = start[1];
  connectionPositions[base + 2] = start[2];
  connectionPositions[base + 3] = end[0];
  connectionPositions[base + 4] = end[1];
  connectionPositions[base + 5] = end[2];
});

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uSecondary;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float time = uTime * 0.14;

  vec2 flow = uv;
  flow.x += sin(uv.y * 4.0 + time * 4.0) * 0.14;
  flow.y += cos(uv.x * 3.2 - time * 3.0) * 0.12;

  float field = fbm(flow * 2.8 + time);
  float streamA = smoothstep(0.75, 0.97, sin((uv.x + field * 0.46 + time * 0.32) * 18.0) * 0.5 + 0.5);
  float streamB = smoothstep(0.76, 0.99, sin((uv.y * 1.5 - field * 0.82 - time * 0.24) * 22.0) * 0.5 + 0.5);
  float grid = smoothstep(0.96, 1.0, sin(uv.x * 34.0) * sin(uv.y * 34.0));
  float vignette = smoothstep(1.75, 0.12, dot(uv, uv));

  vec3 color = mix(uSecondary, uColor, streamA);
  color += uColor * streamB * 0.68;
  color += uColor * grid * 0.16;

  float alpha = (streamA * 0.55 + streamB * 0.32 + grid * 0.12) * vignette * 0.7;

  gl_FragColor = vec4(color, alpha);
}
`;

function EnergyField({
  primary,
  secondary
}: {
  primary: string;
  secondary: string;
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uColor.value = new THREE.Color(primary);
    materialRef.current.uniforms.uSecondary.value = new THREE.Color(secondary);
  }, [primary, secondary]);

  useFrame(({ clock }) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -3.6]} scale={[14, 8.5, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(primary) },
          uSecondary: { value: new THREE.Color(secondary) }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function NodeCloud({
  primary,
  secondary
}: {
  primary: string;
  secondary: string;
}) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.36,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.24,
      0.04
    );
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connectionPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={secondary} transparent opacity={0.34} />
      </lineSegments>

      {network.points.map((point, index) => (
        <mesh key={`node-${index}`} position={point}>
          <sphereGeometry args={[0.055, 18, 18]} />
          <meshStandardMaterial
            color={primary}
            emissive={primary}
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroNetworkCanvas() {
  const { theme } = useTheme();
  const palette = themePalette[theme];

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#000000", 4, 11]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[2.5, 3, 4]} intensity={8} color={palette.primary} />
        <pointLight
          position={[-3, -2, 2]}
          intensity={5}
          color={palette.secondary}
        />
        <EnergyField primary={palette.primary} secondary={palette.secondary} />
        <NodeCloud primary={palette.primary} secondary={palette.muted} />
      </Canvas>
    </div>
  );
}
