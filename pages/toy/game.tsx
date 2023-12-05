import { NextSeo } from 'next-seo';
import metadata from 'data/metadata';
import { Container } from 'components';
import { Suspense, useEffect } from 'react';
import { User, getAuth } from 'firebase/auth';
import firebase_app from '../../firebase/firebaseClient';
import { getApps } from 'firebase/app';
import { Canvas } from '@react-three/fiber';
import Scene from 'components/toy/game/Scene';
import { Physics } from '@react-three/cannon';
import ControlDesc from 'components/toy/game/ControlDesc';

export default function Game(): JSX.Element {
  // const auth = getAuth(firebase_app);
  // console.log(getApps());
  // auth.onAuthStateChanged((user: User | null) => {
  //   console.log(auth);
  //   if (user) {
  //     console.log(user);
  //   } else {
  //     console.log('no user');
  //   }
  // });
  return (
    <>
      <NextSeo
        title="Game"
        description="컴겜설 게임"
        canonical={`${metadata.meta.url}/toy/game`}
        openGraph={{ url: `${metadata.meta.url}/toy/game` }}
      />
      <Canvas style={{ height: '100vh' }}>
        <Physics broadphase="SAP" gravity={[0, -4.81, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      <ControlDesc />
    </>
  );
}
