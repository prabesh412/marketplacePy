import { useStore } from '@/zustand/store';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import {
  getDefaultHomeStore,
  getDefaultStore,
} from '@/components/utils/PageDefaults';
import { ReactElement } from 'react';
import { Page } from '@/components/ui/common';
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

  await queryClient.prefetchQuery(
    getCategoryListQueryKey(),
    () => categoryList(),
    {},
  );

  await queryClient.prefetchQuery(
    getListingsListQueryKey({ page: 1 }),
    () => listingsList({ page: 1 }),
    {},
  );
  const zustandStore = await getDefaultHomeStore(ctx, queryClient);

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
