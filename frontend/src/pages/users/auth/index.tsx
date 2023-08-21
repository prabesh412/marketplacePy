import { Container, Tabs } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { AuthPage } from '../../../../components/page-specifics/auth/AuthPage';

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
