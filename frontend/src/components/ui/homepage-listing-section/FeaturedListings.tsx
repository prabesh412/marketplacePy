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
  Card,
  Paper,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAdjustments,
  IconArrowRight,
  IconChevronDown,
  IconCircleCheck,
} from '@tabler/icons-react';
import FeaturedCard from '../featured/FeaturedCard';
import { useListingsList } from '../../../../orval/listings/listings';
import { PaginatedListingsList } from '../../../../orval/model';

const FeaturedListings = () => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);

  const {
    data: listing,
    status,
    error,
    isFetching,
  } = useListingsList({ page: page });
  const [isLoading, setIsLoading] = useState(false);
  const [featuredListing, setFeaturedListing] = useState(
    listing as PaginatedListingsList,
  );
  useEffect(() => {
    if (listing && status === 'success' && !isFetching && listing.previous) {
      setFeaturedListing((prevFeaturedListing) => ({
        ...listing,
        results: [
          ...(prevFeaturedListing.results || []),
          ...(listing.results || []),
        ],
      }));
      setIsLoading(false);
    }
  }, [page, listing, status, isFetching]);

  const fetchMoreData = () => {
    setIsLoading(true);
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
      <div style={{ marginTop: 10 }}>
        <Grid mb={rem(2)} mt={rem(1)}>
          {featuredListing?.results?.map((listings, index) => (
            <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
              <FeaturedCard listing={listings} />
            </Col>
          ))}
        </Grid>
        {!isProductAllFetched() && (
          <Card radius={'md'}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                size="sm"
                radius={'xl'}
                onClick={() => fetchMoreData()}
                loading={isLoading}
                rightIcon={!isLoading && <IconArrowRight />}
                mb={rem(4)}
              >
                {isLoading === false ? 'Load more' : 'Loading...'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeaturedListings;
