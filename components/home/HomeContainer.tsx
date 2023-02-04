import React from 'react';
import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

import { ParentContainer, Main, InnerContainer } from './HomeContainer.style';
import { useRouter } from 'next/router';

const HomeContainer = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <ParentContainer>
      <InnerContainer>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale = 1"
          />
        </Head>
        <Header />
        <Main>
          <div className="contents">{children}</div>
        </Main>
        <Footer />
      </InnerContainer>
    </ParentContainer>
  );
};

export default HomeContainer;
