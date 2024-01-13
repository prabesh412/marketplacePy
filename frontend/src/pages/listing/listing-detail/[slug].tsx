import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  getListingsRetrieveQueryKey,
  listingsRetrieve,
  useListingsRetrieve,
} from '../../../../orval/listings/listings';

import ListingDetailLayout from '@/components/layouts/ListingDetail';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../../../orval/category/category';
import SmallScreenProductDetail from '@/components/ui/listing/SmallScreenProductDetail';
import LargeScreenProductDetail from '@/components/ui/listing/LargeScreenProductDetail';
import { createStyles } from '@mantine/core';

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
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.smallScreen}>
        <SmallScreenProductDetail listing={listingDetail} />
      </div>
      <div className={classes.largeScreen}>
        <LargeScreenProductDetail listing={listingDetail} />
      </div>
    </>
  );
}
const useStyles = createStyles((theme) => ({
  smallScreen: {
    display: 'block',
    [`@media (min-width: 950px)`]: {
      display: 'none',
    },
  },
  largeScreen: {
    display: 'none',

    [`@media (min-width: 950px)`]: {
      display: 'block',
    },
  },
}));
