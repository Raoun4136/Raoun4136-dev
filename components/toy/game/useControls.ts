import { useEffect, useState } from 'react';
import { Euler, Matrix4, Object3D, Vector3 } from 'three';

const speed = 80;

const e = new Euler();
const m = new Matrix4();
const o = new Object3D();
const v = new Vector3();

export const useControls = (
  vehicle,
  vehicleApi,
  chassisBody,
  chassisApi,
  wheels
) => {
  const [controls, setControls] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
    r: false,
    shift: false,
  });

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener('keydown', keyDownPressHandler);
    window.addEventListener('keyup', keyUpPressHandler);
    return () => {
      window.removeEventListener('keydown', keyDownPressHandler);
      window.removeEventListener('keyup', keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.applyEngineForce(speed, 2);
      vehicleApi.applyEngineForce(speed, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-speed, 2);
      vehicleApi.applyEngineForce(-speed, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.25, 2);
      vehicleApi.setSteeringValue(0.25, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.25, 2);
      vehicleApi.setSteeringValue(-0.25, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -2.5, 0], [-0.25, 0, 0]);
    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -2.5, 0], [+0.25, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-4.7, 0.5, 1.45);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, -Math.PI / 2, 0);
    }

    if (controls.shift) {
      const index = 0;
      const count = 500;
      e.setFromRotationMatrix(m.extractRotation(chassisBody.current.matrix));
      vehicleApi.sliding = true;
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
