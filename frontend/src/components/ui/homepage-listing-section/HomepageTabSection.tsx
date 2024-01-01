import React, { useEffect, useRef, useState } from 'react';
import {
  Group,
  Text,
  Col,
  Grid,
  Button,
  Tabs,
  Divider,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAdjustments,
  IconClockFilled,
  IconStarFilled,
} from '@tabler/icons-react';
import FeaturedCard from '../featured/FeaturedCard';
import { useListingsList } from '../../../../orval/listings/listings';
import {
  ListingsListOrderItem,
  PaginatedListingsList,
} from '../../../../orval/model';
import HorizontalCard from '../listing/HorizontalCard';

const HomepageTabSection = () => {
  const theme = useMantineTheme();

  const { data: latestListing } = useListingsList({
    order: ListingsListOrderItem[
      '-created_at'
    ] as unknown as ListingsListOrderItem[],
  });
  const secondTabRef = useRef<HTMLButtonElement>(null);

  const [page, setPage] = useState(1);

  const {
    data: listing,
    status,
    error,
    isFetching,
  } = useListingsList({ page: page });
  const [featuredListing, setFeaturedListing] = useState(
    listing as PaginatedListingsList,
  );
  useEffect(() => {
    console.log('on');
    if (listing && status === 'success' && !isFetching && listing.previous) {
      setFeaturedListing((prevFeaturedListing) => ({
        ...listing,
        results: [
          ...(prevFeaturedListing.results || []),
          ...(listing.results || []),
        ],
      }));
    }
  }, [page, listing, status, isFetching]);

  const fetchMoreData = () => {
    if (status === 'loading' || error || isFetching || isProductAllFetched())
      return;
    else {
      setPage(page + 1);
    }
  };
  const isProductAllFetched = () => {
    const totalProductCount = featuredListing?.count ?? 0;
    const totalFetchedProducts = featuredListing?.results?.length || 0;
    return totalFetchedProducts >= totalProductCount;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Group>
        <Group w={'100%'} position="right">
          <Group spacing={3}>
            <Text c={'dimmed'}>Sort by</Text>
            <IconAdjustments color="gray" size={'1.2em'} />
          </Group>
        </Group>

        <div>
          <Grid mb={'sm'}>
            {featuredListing?.results?.map((listings, index) => (
              <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
                <FeaturedCard listing={listings} />
              </Col>
            ))}
          </Grid>
          {!isProductAllFetched() ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => fetchMoreData()}
                loading={status === 'loading'}
                mb={'md'}
              >
                Load more
              </Button>
            </div>
          ) : (
            <Text align="center" pb={'md'} c={'dimmed'}>
              You have reached to the end
            </Text>
          )}
        </div>

        {/* <Tabs.Panel value="latest-listing">
          <div>
            {latestListing?.results?.map((listing) => (
              <div style={{ marginTop: theme.spacing.lg }} key={listing?.slug}>
                <HorizontalCard listing={listing} />
              </div>
            ))}
          </div>
        </Tabs.Panel> */}
      </Group>
    </div>
  );
};

export default HomepageTabSection;
