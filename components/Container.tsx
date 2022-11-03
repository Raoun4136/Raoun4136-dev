import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import Profile from './Profile';

import { ParentContainer, Main } from './Container.style';

const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ParentContainer>
      <Head>
        <meta
          content="width=device-width, initial-scale = 1"
          name="viewpoint"
        />
      </Head>
      <Header />
      <Main>
        <Profile />
        <div>{children}</div>
      </Main>
      <Footer />
    </ParentContainer>
  );
};

export default Container;
