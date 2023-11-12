import { useTrimesh } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Ramp() {
  const result = useLoader(GLTFLoader, '/car-game/models/ramp.glb');

  const calGeoMetry = () => {
    let g;
    result.scene.children[0].traverse((child) => {
      if (child.type === 'Mesh') {
        const _child = child as THREE.Mesh;
        g = _child.geometry as THREE.BufferGeometry;
      }
      return g;
    });
    return g;
  };

  const geometry = calGeoMetry();

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: 'Static',
    }),
    useRef(null)
  );

  return <></>;
}
