import SeoElement from '@/components/global/SeoElement';
import SearchLayout from '@/components/layouts/SearchLayout';
import AddListingFreeBanner from '@/components/ui/common/AddListingFreeBanner';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { Card, Center, Pagination, Text, useMantineTheme } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  getListingsListQueryKey,
  listingsList,
  useListingsList,
} from '../../../orval/listings/listings';
import { ListingsListOrderItem } from '../../../orval/model';
import { Listings } from '../../../orval/model/listings';

export async function getServerSideProps(ctx: NextPageContext) {
  const page = ctx.query.page || 1;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsListQueryKey({
      page: parseInt(page as string),
      order: ListingsListOrderItem[
        '-created_at'
      ] as unknown as ListingsListOrderItem[],
    }),
    () =>
      listingsList({
        page: parseInt(page as string),
        order: ListingsListOrderItem[
          '-created_at'
        ] as unknown as ListingsListOrderItem[],
      }),
    {},
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
Latest.getLayout = (page: ReactElement) => <SearchLayout>{page}</SearchLayout>;

export default function Latest() {
  const router = useRouter();
  const page = parseInt(router.query.page as string);
  const { data: listingDetail } = useListingsList({
    page: page || 1,
    order: ListingsListOrderItem[
      '-created_at'
    ] as unknown as ListingsListOrderItem[],
  });
  const theme = useMantineTheme();

  const handlePaginationChange = (newPage: number) => {
    const existingParams = new URLSearchParams(window.location.search);
    existingParams.set('page', newPage.toString());
    router.push(`/latest?${existingParams}`);
  };
  return (
    <>
      <SeoElement
        description={`Discover Latest listings on Doshrodeal. Explore a wide range of items from electronics to home goods in Nepal's emerging online marketplace.`}
        title={`Latest listings | Doshrodeal`}
        url={`https://www.doshrodeal.com/latest&page=${page}`}
        image={''}
        keywords={`Search, Listings, Doshrodeal, Online Marketplace, Nepal, Buy and Sell, Electronics, Home Goods, Second-hand, Deals`}
      />
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <AddListingFreeBanner />
        {listingDetail?.results && listingDetail.results.length > 0 ? (
          <React.Fragment>
            {listingDetail.results.map((listing: Listings, key: number) => (
              <div
                style={{
                  marginTop: theme.spacing.sm,
                  marginBottom: theme.spacing.sm,
                }}
                key={listing.slug}
              >
                <HorizontalCard listing={listing} />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <Text mt={'xs'} align="center" c={'dimmed'}>
            No results found
          </Text>
        )}

        {listingDetail?.count !== 0 && (
          <Card w={'100%'} radius={'md'}>
            <Center>
              <Pagination
                total={
                  listingDetail?.count ? Math.ceil(listingDetail.count / 12) : 0
                }
                value={page || 1}
                onChange={handlePaginationChange}
                size="md"
                radius="md"
              />
            </Center>
          </Card>
        )}
      </div>
    </>
  );
}
