import {
  Badge,
  Group,
  Paper,
  Text,
  ThemeIcon,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCircleCheck,
  IconClockFilled,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  getListingsListQueryKey,
  useListingsListInfinite,
} from '../../../../orval/listings/listings';
import {
  ListingsListOrderItem,
  ListingsListParams,
} from '../../../../orval/model';
import HorizontalCard from '../listing/HorizontalCard';
import HorizontalCardSkeleton from '../listing/HorizontalCardSkeleton';

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
        <Group position="center">
          <Badge
            size="lg"
            radius={'sm'}
            style={{
              borderBottomLeftRadius: '30px',
              borderBottomRightRadius: '30px',
            }}
            variant="light"
            mt={-3}
          >
            <Group spacing={2}>
              <IconClockFilled style={{ marginTop: 1 }} size={'1.2em'} />{' '}
              <Text>Browse Recent Listings</Text>
            </Group>
          </Badge>
        </Group>

        {data?.pages ? (
          data?.pages?.map((listing, i) => (
            <React.Fragment key={i}>
              {listing?.results?.map((listings, index) => (
                <div key={index} style={{ marginTop: 10 }}>
                  <HorizontalCard currentPage={page} listing={listings} />
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
