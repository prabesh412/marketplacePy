import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import {
  getListingsListQueryKey,
  listingsList,
  useListingsList,
} from '../../../orval/listings/listings';

import SearchLayout from '@/components/layouts/SearchLayout';
import RecentListingCard from '@/components/pageSpecific/search/SearchProductCard';
import { Divider, createStyles } from '@mantine/core';
import AdvertisementImage from '@/components/miscellanous/AdvertisementImage';

const useStyles = createStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },

  sideNav: {
    position: 'sticky',
    top: 0,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  mainContent: {
    marginLeft: theme.spacing.md,
    flex: 2,
    marginRight: theme.spacing.md,
    '@media (max-width: 576px)': {
      marginRight: 0,
      marginLeft: 0,
    },
  },

  divider: {
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  bannerContainer: {
    position: 'sticky',
    top: 0,
    maxWidth: '300px',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
}));

export async function getServerSideProps(ctx: NextPageContext) {
  const slug = ctx.query;
  if (!slug || !slug.title__icontains) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsListQueryKey(slug),
    () => listingsList(slug),
    {
      staleTime: Infinity,
    },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
Search.getLayout = (page: ReactElement) => <SearchLayout>{page}</SearchLayout>;

export default function Search() {
  const router = useRouter();
  const slug = router.query;
  const { data: listingDetail } = useListingsList(slug);
  const { classes } = useStyles();
  return (
    <div className={classes.parent}>
      <div className={classes.sideNav}></div>
      <div className={classes.mainContent}>
        <div>
          {listingDetail?.results && listingDetail.results.length > 0 ? (
            listingDetail?.results?.map((listing) => (
              <RecentListingCard
                title={listing.title}
                image={listing.title}
                price={listing.price}
                user={listing.user}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>
              No results found for {slug.title__icontains || 'your query'}
            </p>
          )}
        </div>
      </div>
      <Divider className={classes.divider} orientation="vertical" />
      <div className={classes.bannerContainer}>
        <AdvertisementImage
          imageUrl={
            'https://cdn02.hamrobazaar.com/feature_ads/suzuki/new_designs/250x250.gif'
          }
        />
      </div>
    </div>
  );
}
