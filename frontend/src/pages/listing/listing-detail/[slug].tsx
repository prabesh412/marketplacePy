import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  getListingsListQueryKey,
  getListingsRetrieveQueryKey,
  listingsList,
  listingsRetrieve,
  useListingsList,
  useListingsRetrieve,
} from '../../../../orval/listings/listings';

import ListingDetailLayout from '@/components/layouts/ListingDetail';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../../../orval/category/category';

import ListingDetailWrapper from '@/components/pageSpecific/Listing-detail';
import { Listings } from '../../../../orval/model';

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsRetrieveQueryKey(slug as string),
    () => listingsRetrieve(slug as string),
    {
      staleTime: Infinity,
    },
  );
  const listingDetail: Listings | undefined = await queryClient.getQueryData(
    getListingsRetrieveQueryKey(slug as string),
  );
  if (!listingDetail) {
    return { notFound: true };
  }
  await queryClient.prefetchQuery(
    getListingsListQueryKey({
      user__username: listingDetail?.user?.username as string,
    }),
    () =>
      listingsList({ user__username: listingDetail?.user?.username as string }),
    {
      staleTime: Infinity,
    },
  );
  await queryClient.prefetchQuery(
    getListingsListQueryKey({
      category: listingDetail?.category?.id as number,
    }),
    () =>
      listingsList({
        category: listingDetail?.category?.id as number,
      }),
    {
      staleTime: Infinity,
    },
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
ListingDetail.getLayout = (page: ReactElement) => (
  <ListingDetailLayout>{page}</ListingDetailLayout>
);

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: listingDetail } = useListingsRetrieve(slug as string);

  return <ListingDetailWrapper listingDetail={listingDetail} />;
}
