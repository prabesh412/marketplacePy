import HomeLayout from '@/components/layouts/HomeLayout';
import HomeSection from '@/components/pageSpecific/home';
import { Page } from '@/components/ui/common';
import { getDefaultHomeStore } from '@/components/utils/PageDefaults';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../orval/category/category';
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
    <Page>
      {/* <AddListingFloatButton /> */}
      <HomeSection />
    </Page>
  );
}
