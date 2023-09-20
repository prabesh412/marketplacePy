import { Container } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AuthPage } from '@/sections/auth/AuthPage';
import { ReactElement } from 'react';
import AuthLayout from '@/layouts/AuthLayout';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Auth.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default function Auth() {
  return (
    <Container fluid>
      <AuthPage />
    </Container>
  );
}
