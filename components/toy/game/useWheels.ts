import {
  BodyProps,
  CompoundBodyProps,
  Triplet,
  WheelInfoOptions,
  useCompoundBody,
} from '@react-three/cannon';
import { Ref, useRef } from 'react';
import { Object3D, Object3DEventMap } from 'three/src/core/Object3D';
declare type GetByIndex<T extends BodyProps> = (index: number) => T;

export const useWheels = (width, height, front, radius) => {
  const wheels: Ref<Object3D<Object3DEventMap>>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0] as Triplet,
    axleLocal: [1, 0, 0] as Triplet,
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 4,
    dampingRelaxation: 4.3,
    dampingCompression: 4.3,
    maxSuspensionForce: 100000,
    rollInfluence: 0.05,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos: WheelInfoOptions[] = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];

  const propsFunc: GetByIndex<CompoundBodyProps> = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: 'Cylinder',
      },
    ],
    type: 'Kinematic',
  });

  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};
