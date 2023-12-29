import React, { useState } from 'react';
import { Group, Text, Col, Grid, Button } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import FeaturedCard from './FeaturedCard';
import { useListingsList } from '../../../../orval/listings/listings';
import { useStore } from '@/zustand/store';
import InfiniteScroll from './InfinteScroll';

const FeaturedHomepaeSection = () => {
  const setFeaturedListings = useStore((state) => state.setFeaturedListings);
  const featuredListingsGlobal = useStore((state) => state.featuredListings);
  const urlSearchParams = new URLSearchParams(
    featuredListingsGlobal?.next?.split('?')[1] || '',
  );
  const pageNumber = parseInt(urlSearchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageNumber - 1);
  const { data: listing, status, error } = useListingsList({ page: page + 1 });

  const fetchMoreData = () => {
    if (status === 'loading' || error || isProductAllFetched()) return;
    else {
      setPage(page + 1);
      setFeaturedListings(listing || {});
    }
  };
  const isProductAllFetched = () => {
    const totalProductCount = featuredListingsGlobal?.count ?? 0;
    const totalFetchedProducts = featuredListingsGlobal?.results?.length || 0;
    return totalFetchedProducts >= totalProductCount;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Group position="apart">
        <Text fw={500} size={'xl'}>
          Featured Listing
        </Text>
        <Group spacing={5}>
          <Text c="dimmed">Sort by</Text>
          <IconAdjustments color="grey" size="1.5em" />
        </Group>
      </Group>
      <div>
        <Grid mb={'xl'} mt={'sm'}>
          {featuredListingsGlobal?.results?.map((listings, index) => (
            <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
              <FeaturedCard listing={listings} />
            </Col>
          ))}
        </Grid>
        <InfiniteScroll
          isProductAllFetched={isProductAllFetched}
          fetchMoreData={fetchMoreData}
        />
      </div>
    </div>
  );
};

export default FeaturedHomepaeSection;
