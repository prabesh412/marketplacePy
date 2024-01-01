import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { NextPageContext } from 'next';
import HomeLayout from '@/components/layouts/HomeLayout';
import ProfilePage from '@/components/ui/profile/ProfilePage';
import {
  getListingsMeRetrieveQueryKey,
  listingsMeRetrieve,
} from '../../../../orval/listings/listings';
import {
  getUsersMeRetrieveQueryKey,
  usersMeRetrieve,
} from '../../../../orval/users/users';
import { bookmarksProfileRetrieve, getBookmarksProfileRetrieveQueryKey } from '../../../../orval/bookmarks/bookmarks';

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
  await queryClient.prefetchQuery(
    getUsersMeRetrieveQueryKey(),
    () => usersMeRetrieve(),
    {},
  );
  await queryClient.prefetchQuery(
    getBookmarksProfileRetrieveQueryKey(),
    () => bookmarksProfileRetrieve(),
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
