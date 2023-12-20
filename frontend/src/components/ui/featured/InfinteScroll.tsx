import { Loader, Text } from '@mantine/core';
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

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (!isProductAllFetched()) {
      if (scrollTop + clientHeight >= scrollHeight - 300 && !loading) {
        setLoading(true);
        setTimeout(() => {
          fetchMoreData();
          setLoading(false);
        }, 2000);
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
      {loading && <Loader />}
      {isProductAllFetched() && (
        <Text mb={'md'} align="center">
          Yay! you have caught up all.
        </Text>
      )}
    </div>
  );
};

export default InfiniteScroll;
