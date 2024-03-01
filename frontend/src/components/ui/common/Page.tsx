import Head from 'next/head';
import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title>Doshro Deal</title>
        {/*  TODO : add meta tags  */}
      </Head>
      {children}
    </>
  );
};

export default Page;
