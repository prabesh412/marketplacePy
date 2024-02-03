import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import {
  getListingsListQueryKey,
  listingsList,
  useListingsList,
} from '../../../orval/listings/listings';

import HomeLayout from '@/components/layouts/HomeLayout';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import ProfileCard from '@/components/ui/profile/ProfileCard';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../../orval/category/category';
import {
  getUsersRetrieveQueryKey,
  useUsersRetrieve,
  usersRetrieve,
} from '../../../orval/users/users';

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  console.log(slug);
  await queryClient.prefetchQuery(
    getUsersRetrieveQueryKey(slug as string),
    () => usersRetrieve(slug as string),
    {},
  );

  await queryClient.prefetchQuery(
    getListingsListQueryKey({ user__username: slug as string }),
    () => listingsList({ user__username: slug as string }),
    {},
  );

  await queryClient.prefetchQuery(
    getCategoryListQueryKey(),
    () => categoryList(),
    {},
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
PublicProfile.getLayout = (page: ReactElement) => (
  <HomeLayout>{page}</HomeLayout>
);

export default function PublicProfile() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: userData } = useUsersRetrieve(slug as string);
  const { data: listingsData } = useListingsList({
    user__username: slug as string,
  });

  return (
    <>
      {userData && <ProfileCard user={userData} />}
      {listingsData?.results &&
        listingsData?.results.map((listing) => (
          <div key={listing.slug} style={{ paddingBottom: '15px' }}>
            <HorizontalCard listing={listing} />
          </div>
        ))}
    </>
  );
}
