import { Container } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AuthPage } from '@/components/sections/auth/AuthPage';
import { ReactElement } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { NextPageContext } from 'next';

export const getServerSideProps = async (ctx: NextPageContext) => {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  if (zustandStore.accessToken !== '') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
};

Auth.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default function Auth() {
  return <AuthPage />;
}
