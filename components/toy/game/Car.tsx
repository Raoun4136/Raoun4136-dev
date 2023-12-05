import {
  Triplet,
  WheelInfoOptions,
  useBox,
  useRaycastVehicle,
} from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
import { Ref, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useWheels } from './useWheels';
import { Object3D, Object3DEventMap } from 'three/src/core/Object3D';
import WheelDebug from './WheelDebug';
import { useControls } from './useControls';
import { Quaternion, Vector3 } from 'three';

const Car = ({ thirdPerson }) => {
  const result = useLoader(GLTFLoader, '/car-game/models/car.glb').scene;
  const position = [-4.7, 0.5, 1.45] as Triplet;
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2] as Triplet;
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      rotation: [0, -Math.PI / 2, 0],
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: wheelInfos as WheelInfoOptions[],
      wheels: wheels as Ref<Object3D<Object3DEventMap>>[],
    }),
    useRef(null)
  );

  useControls(vehicle, vehicleApi, chassisBody, chassisApi, wheels);

  useFrame((state) => {
    if (!thirdPerson) return;

    const position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    const quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    const wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    const cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wDir.add(new Vector3(0, 0.8, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    if (!result) return;

    const mesh = result;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.7} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={result}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
