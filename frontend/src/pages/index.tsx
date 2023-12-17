import { useStore } from '@/zustand/store';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { ReactElement } from 'react';
import { Page } from '@/components/ui';
import HomeSection from '@/components/pageSpecific/home';
import HomeLayout from '@/components/layouts/HomeLayout';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../orval/category/category';
import AddListingFloatButton from '@/components/ui/add-listing/AddListingFloatButton';
import {
  getListingsListQueryKey,
  listingsList,
} from '../../orval/listings/listings';

export async function getServerSideProps(ctx: NextPageContext) {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getCategoryListQueryKey(),
    () => categoryList(),
    {},
  );

  await queryClient.prefetchQuery(
    getListingsListQueryKey(),
    () => listingsList({ page: 1 }),
    {},
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}

HomePage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default function HomePage() {
  return (
    <Page title={'Home'}>
      <AddListingFloatButton />
      <HomeSection />
    </Page>
  );
}
