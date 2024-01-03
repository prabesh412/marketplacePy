import React, { useEffect, useRef, useState } from 'react';
import { Divider, useMantineTheme, Badge } from '@mantine/core';
import { useListingsList } from '../../../../orval/listings/listings';
import {
  ListingsListOrderItem,
  PaginatedListingsList,
} from '../../../../orval/model';
import HorizontalCard from '../listing/HorizontalCard';
import InfiniteScroll from '../common/InfinteScroll';

const RecentListings = () => {
  const [page, setPage] = useState(1);
  
  const {
    data: listing,
    status,
    error,
    isFetching,
  } = useListingsList({
    page: page,
    order: ListingsListOrderItem[
      '-created_at'
    ] as unknown as ListingsListOrderItem[],
  });
  const [featuredListing, setFeaturedListing] = useState(
    listing as PaginatedListingsList,
  );
  console.log(listing);
  useEffect(() => {
    if (listing && status === 'success' && !isFetching) {
      setFeaturedListing((prevFeaturedListing) => ({
        ...listing,
        results: [
          ...(prevFeaturedListing?.results || []),
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
      <div>
        <Divider
          label={<Badge radius={'sm'}>Browse Recent Listings</Badge>}
          labelPosition="center"
          c={'dimmed'}
          mb={15}
          size={3}
          orientation="horizontal"
        />
        {featuredListing?.results?.map((listing, index) => (
          <div key={listing.slug} style={{ marginBottom: 10 }}>
            <HorizontalCard listing={listing} />
          </div>
        ))}
      </div>
      <InfiniteScroll
        fetchMoreData={fetchMoreData}
        isProductAllFetched={isProductAllFetched}
      />
    </div>
  );
};

export default React.memo(RecentListings);
