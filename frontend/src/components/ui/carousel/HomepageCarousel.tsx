import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import React from 'react';

const HomepageCarousel = () => {
  return (
    <Carousel
      slideSize="100%"
      maw={'1200px'}
      height={'auto'}
      align={'start'}
      mt={'md'}
      slideGap="md"
      w={'100%'}
      m={'auto'}
      controlsOffset="xs"
      controlSize={25}
      dragFree
      withControls={false}
    >
      <Image
        fit="contain"
        w={'100%'}
        src="https://assets-cdn.kantipurdaily.com/uploads/source/ads/emi520x120-0882023070419.gif"
        alt="hero-promotion"
      />
    </Carousel>
  );
};

export default HomepageCarousel;
