import {
  Group,
  Loader,
  Paper,
  Text,
  ThemeIcon,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
interface InfiniteScrollProps {
  fetchMoreData: () => void;
  isProductAllFetched: () => boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchMoreData,
  isProductAllFetched,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (!isProductAllFetched() && !loading) {
      if (scrollTop + clientHeight >= scrollHeight - 700 && !loading) {
        setLoading(true);
        setTimeout(() => {
          fetchMoreData();
          setLoading(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMoreData, isProductAllFetched, loading]);

  return (
    <div
      ref={scrollContainerRef}
      style={{ overflowY: 'auto', maxHeight: '500px' }}
    >
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Loader mb={'md'} />
        </div>
      )}

      {isProductAllFetched() && (
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
          mt={19}
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
  );
};

export default React.memo(InfiniteScroll);
