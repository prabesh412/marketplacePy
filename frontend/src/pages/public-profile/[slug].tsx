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

import SeoElement from '@/components/global/SeoElement';
import HomeLayout from '@/components/layouts/HomeLayout';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import ProfileCard from '@/components/ui/profile/ProfileCard';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../../orval/category/category';
import { User } from '../../../orval/model';
import {
  getUsersRetrieveQueryKey,
  useUsersRetrieve,
  usersRetrieve,
} from '../../../orval/users/users';

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getUsersRetrieveQueryKey(slug as string),
    () => usersRetrieve(slug as string),
    {},
  );
  const user: User | undefined = await queryClient.getQueryData(
    getUsersRetrieveQueryKey(slug as string),
  );
  if (!user) return { notFound: true };
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
      <SeoElement
        title={`${userData?.username || 'User'}'s Public Profile | Doshrodeal`}
        description={`${
          userData?.username || 'This user'
        }'s profile on Doshrodeal showcases a unique selection of listings ranging from electronics to home goods, all available in Nepal. Connect, explore, and discover the best deals from our community members.`}
        url={`https://www.doshrodeal.com/public-profile/${slug}`}
        image={''}
        keywords={`Public Profile, ${userData?.username},doshrodeal ${userData?.username}, Doshrodeal ${userData?.username}  User Listings, Doshrodeal, Nepal, Online Marketplace, Buy and Sell, Community, Electronics, Home Goods, Second-hand, Pre-loved, Deals,'Shopping, Selling'}`}
      />
      <div style={{ paddingBottom: '15px' }}>
        {userData && <ProfileCard user={userData} isPublic={true} />}
      </div>
      {listingsData?.results &&
        listingsData?.results.map((listing) => (
          <div key={listing.slug} style={{ paddingBottom: '15px' }}>
            <HorizontalCard listing={listing} />
          </div>
        ))}
    </>
  );
}
