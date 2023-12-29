import { Container } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AuthPage } from '@/components/pageSpecific/auth/AuthPage';
import { ReactElement } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { NextPageContext } from 'next';
import HomeLayout from '@/components/layouts/HomeLayout';
import ProfilePage from '@/components/ui/profile/ProfilePage';
import {
  getListingsMeRetrieveQueryKey,
  listingsMeRetrieve,
} from '../../../../orval/listings/listings';

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
  await queryClient.prefetchQuery(
    getListingsMeRetrieveQueryKey(),
    () => listingsMeRetrieve(),
    {},
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
};

Profile.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default function Profile() {
  return <ProfilePage />;
}
