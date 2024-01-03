import { Carousel } from '@mantine/carousel';
import { Image, useMantineTheme } from '@mantine/core';
import React from 'react';

const HomepageCarousel = () => {
  const theme = useMantineTheme();
  return (
    <div>
      <Carousel
        slideSize="100%"
        maw={'1200px'}
        style={{ borderRadius: theme.radius.md, overflow: 'hidden' }}
        height={'20vh'}
        align={'start'}
        mt={'xs'}
        slideGap={'xs'}
        w={'100%'}
        m={'auto'}
        controlsOffset="xs"
        dragFree
        withControls={false}
      >
        <Image
          fit="fill"
          w={'100%'}
          height={'20vh'}
          src="https://assets-cdn.kantipurdaily.com/uploads/source/ads/emi520x120-0882023070419.gif"
          alt="hero-promotion"
          radius={'md'}
        />
      </Carousel>
    </div>
  );
};

export default HomepageCarousel;
