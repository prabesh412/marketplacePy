import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';

const Dashboard = () => {
  return (
    <div>
      <h1>Authenticated</h1>
    </div>
  );
};
// FOR PROTECTED ROUTES
export async function getServerSideProps(ctx: NextPageContext) {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  if (zustandStore.accessToken === '') {
    return {
      redirect: {
        destination: '/users/auth',
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
}

export default Dashboard;
