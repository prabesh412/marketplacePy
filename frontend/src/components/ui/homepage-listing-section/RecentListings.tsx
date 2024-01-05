import React, { useEffect, useRef, useState } from 'react';
import { Divider, useMantineTheme, Badge } from '@mantine/core';
import {
  getListingsListQueryKey,
  useListingsList,
  useListingsListInfinite,
} from '../../../../orval/listings/listings';
import {
  ListingsListOrderItem,
  ListingsListParams,
} from '../../../../orval/model';
import { useInView } from 'react-intersection-observer';
import HorizontalCard from '../listing/HorizontalCard';
import { useCustomListingsListInfinite } from '@/components/hooks/UseCustomListingInfinte';

const RecentListings = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);

  const {
    status: latestStatus,
    data,
    error: latestError,
    isFetching: latestFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useListingsListInfinite(
    {
      page: page,
      order: ListingsListOrderItem[
        '-created_at'
      ] as unknown as ListingsListOrderItem[],
    },
    {
      query: {
        queryKey: getListingsListQueryKey(
          'infinite-query' as ListingsListParams,
        ),
        getNextPageParam: ({ next, results }) =>
          !!results && next ? next : undefined,
      },
    },
  );

  const params = new URLSearchParams(data?.pages?.[0]?.next as string);
  const pageNumber = params.get('page');

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage({ pageParam: pageNumber });
    }
  }, [inView]);

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

        {data?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group?.results?.map((project) => (
              <HorizontalCard listing={project} />
            ))}
          </React.Fragment>
        ))}
        {!isFetchingNextPage && !hasNextPage && <p>Caught up</p>}
      </div>
      <div ref={ref}>aasd</div>
    </div>
  );
};

export default RecentListings;
