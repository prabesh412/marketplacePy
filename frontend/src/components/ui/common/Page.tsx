import { ReactNode } from 'react';
import Head from 'next/head';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title> Doroso Bazaar</title>
        {/*  TODO : add meta tags  */}
      </Head>
      {children}
    </>
  );
};

export default Page;
