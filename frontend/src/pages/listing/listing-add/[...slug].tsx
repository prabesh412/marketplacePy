import { Container } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { NextPageContext } from 'next';
import AddListingLayout from '@/components/layouts/AddListing';
import AddListingPage from '@/components/pageSpecific/listing-add/AddListingPage';

export const getServerSideProps = async (ctx: NextPageContext) => {
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
};

AddListing.getLayout = (page: ReactElement) => (
  <AddListingLayout>{page}</AddListingLayout>
);

export default function AddListing() {
  return (
    <Container mb={'xl'} mt={'xl'} fluid>
      <AddListingPage />
    </Container>
  );
}
