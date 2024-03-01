import SeoElement from '@/components/global/SeoElement';
import HomeLayout from '@/components/layouts/HomeLayout';
import ProfilePage from '@/components/ui/profile/ProfilePage';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import {
  bookmarksProfileRetrieve,
  getBookmarksProfileRetrieveQueryKey,
} from '../../../../orval/bookmarks/bookmarks';
import {
  getListingsMeRetrieveQueryKey,
  listingsMeRetrieve,
} from '../../../../orval/listings/listings';
import {
  getUsersMeRetrieveQueryKey,
  usersMeRetrieve,
} from '../../../../orval/users/users';

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
  return (
    <>
      <SeoElement
        title={'My Profile | Doshrodeal'}
        description={
          'View and manage your profile on Doshrodeal. Access your listings, bookmarks, and account settings to personalize your Doshrodeal experience.'
        }
        url={`https://www.doshrodeal.com/users/profile`}
        image=""
        keywords={`Doshrodeal, My Profile, User Account, Listings, Bookmarks, Account Settings, Personalize, Online Marketplace, Nepal, Buy, Sell, User Dashboard`}
      />
      <ProfilePage />
    </>
  );
}
