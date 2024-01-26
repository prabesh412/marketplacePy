import React, { useEffect, useRef, useState } from 'react';
import {
  Divider,
  useMantineTheme,
  Badge,
  Paper,
  rem,
  ThemeIcon,
  Group,
  Text,
  Card,
} from '@mantine/core';
import {
  getListingsListQueryKey,
  useListingsListInfinite,
} from '../../../../orval/listings/listings';
import {
  ListingsListOrderItem,
  ListingsListParams,
} from '../../../../orval/model';
import { useInView } from 'react-intersection-observer';
import HorizontalCard from '../listing/HorizontalCard';
import HorizontalCardSkeleton from '../listing/HorizontalCardSkeleton';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';

const RecentListings = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: ' 30px  30px 30px  30px',
  });
  const [page, setPage] = useState(1);
  const theme = useMantineTheme();

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
    if (
      inView &&
      !latestFetching &&
      !latestError &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      setPage((prev) => prev + 1);
      setTimeout(() => fetchNextPage({ pageParam: pageNumber }), 1000);
    }
  }, [inView, hasNextPage]);

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <div>
        <Divider
          label={<Badge radius={'xl'}>Browse Recent Listings</Badge>}
          labelPosition="center"
          c={'dimmed'}
          mt={'sm'}
          size={3}
          orientation="horizontal"
        />

        {data?.pages ? (
          data?.pages?.map((listing, i) => (
            <React.Fragment key={i}>
              {listing?.results?.map((listings, index) => (
                <div key={index} style={{ marginTop: 10 }}>
                  <HorizontalCard listing={listings} />
                </div>
              ))}
            </React.Fragment>
          ))
        ) : (
          <div style={{ marginTop: 10 }}>
            <HorizontalCardSkeleton repeat={12} />
          </div>
        )}

        {inView && latestFetching && (
          <div
            style={{
              marginTop: 10,
            }}
          >
            <HorizontalCardSkeleton repeat={1} />
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && !latestError && (
          <div
            style={{
              marginTop: 10,
            }}
            ref={ref}
          >
            <HorizontalCardSkeleton repeat={1} />
          </div>
        )}
        {!isFetchingNextPage && !hasNextPage && latestStatus !== 'loading' && (
          <Paper
            radius="md"
            withBorder
            shadow="xl"
            style={{
              position: 'relative',
              overflow: 'visible',
              padding: theme.spacing.xs,
              paddingTop: rem(20),
            }}
            mt={25}
          >
            <Group position="center">
              <ThemeIcon
                style={{
                  position: 'absolute',
                  top: rem(-20),
                  left: 50 % -rem(30),
                }}
                size={60}
                radius={60}
              >
                <IconCircleCheck
                  style={{ width: rem(35), height: rem(35) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Group>
            <Text truncate ta="center" mt={'xl'} c={'dimmed'}>
              You have seen all the latest listings!
            </Text>
            <Group spacing={3} position="center">
              <Text pb={rem(2)} c="green" ta="center" size={'sm'} fw={600}>
                Find more
              </Text>
              <IconArrowRight size={'1em'} color="green" />
            </Group>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default RecentListings;
