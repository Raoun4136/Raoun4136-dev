import React from 'react';
import Head from 'next/head';
import { Footer, Header } from 'components';
import { ParentContainer, Main, InnerContainer } from './Container.style';

const Container = ({ children }: { children?: React.ReactNode }) => {
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

export default Container;
