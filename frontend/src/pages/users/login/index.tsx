import { Container } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AuthPage } from '@/components/AuthPage';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Login = () => {
  return (
    <Container fluid>
      <AuthPage />
    </Container>
  );
};

export default Login;
