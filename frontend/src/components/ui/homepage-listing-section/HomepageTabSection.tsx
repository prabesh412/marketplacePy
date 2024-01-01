import React, { useRef, useState } from 'react';
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
import { PaginatedListingsList } from '../../../../orval/model';
import HorizontalCard from '../listing/HorizontalCard';

const HomepageTabSection = () => {
  const theme = useMantineTheme();

  const { data: latestListing } = useListingsList({
    order: ['created_at'],
  });
  const secondTabRef = useRef<HTMLButtonElement>(null);
  const { data: ssrPage } = useListingsList({ page: 1 });
  const [featuredListing, setFeaturedListings] = useState(
    ssrPage as PaginatedListingsList,
  );
  const urlSearchParams = new URLSearchParams(
    featuredListing?.next?.split('?')[1] || '',
  );
  const pageNumber = parseInt(urlSearchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageNumber - 1);
  const {
    data: listing,
    status,
    error,
    isFetching,
  } = useListingsList({ page: page + 1 });

  const fetchMoreData = () => {
    if (status === 'loading' || error || isFetching || isProductAllFetched())
      return;
    else {
      setPage(page + 1);
      setFeaturedListings((prevFeaturedListing) => ({
        ...prevFeaturedListing,
        results: [
          ...(prevFeaturedListing?.results || []),
          ...(listing?.results || []),
        ],
      }));
    }
  };
  const isProductAllFetched = () => {
    const totalProductCount = featuredListing?.count ?? 0;
    const totalFetchedProducts = featuredListing?.results?.length || 0;
    return totalFetchedProducts >= totalProductCount;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Tabs variant="pills" w={'100%'} defaultValue="featured-listing">
        <Tabs.List mb={rem(5)}>
          <Group w={'100%'} position="apart">
            <Group>
              <Tabs.Tab
                icon={<IconStarFilled size={'1em'} />}
                value="featured-listing"
              >
                Featured
              </Tabs.Tab>
              <Tabs.Tab
                icon={<IconClockFilled size={'1em'} />}
                value="latest-listing"
                ref={secondTabRef}
              >
                Latest uploads
              </Tabs.Tab>
            </Group>
            <Group spacing={3}>
              <Text pb={rem(2)} c={'dimmed'}>
                Sort by
              </Text>
              <IconAdjustments color="gray" size={'1.2em'} />
            </Group>
          </Group>
        </Tabs.List>
        <Divider c={'dimmed'} size={1} />
        <Tabs.Panel value="featured-listing">
          <div>
            <Grid mb={'sm'} mt={'sm'}>
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
        </Tabs.Panel>
        <Tabs.Panel value="latest-listing">
          <div>
            {latestListing?.results?.map((listing) => (
              <div style={{ marginTop: theme.spacing.lg }} key={listing?.slug}>
                <HorizontalCard listing={listing} />
              </div>
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default HomepageTabSection;
