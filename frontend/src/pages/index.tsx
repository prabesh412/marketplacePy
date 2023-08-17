import Head from 'next/head';
import { initializeStore, useStore } from '../../components/store/store';
import { useEffect } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { getDefaultStore } from '../../components/utils/PageDefaults';

export async function getServerSideProps(ctx: NextPageContext) {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  return {
    props: {
      // the "stringify and then parse again" piece is required as next.js
      // isn't able to serialize it to JSON properly
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}

export default function Home() {
  const store = useStore((state) => state.accessToken);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
