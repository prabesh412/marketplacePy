import { ReactNode } from 'react';
import Head from 'next/head';

interface PageProps {
  children: ReactNode;
  title: string;
}

const Page = ({ children, title }: PageProps) => {
  return (
    <>
      <Head>
        <title>{title} || Doroso Bazaar</title>
        {/*  TODO : add meta tags  */}
      </Head>
      {children}
    </>
  );
};

export default Page;
