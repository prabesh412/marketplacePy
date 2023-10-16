import { Carousel } from '@mantine/carousel';
import React from 'react';
import { FeaturedCarouselCard } from '../FeaturedCarouselCard';
import { useMediaQuery } from '@mantine/hooks';
import { useListingsList } from '../../../../orval/listings/listings';

const FeaturedCarousel = () => {
  const mobile = useMediaQuery(`(max-width: 768px)`);
  const { data: listing } = useListingsList();

  return (
    <Carousel
      slideSize="10%"
      slideGap="md"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {listing?.results?.map((item) => (
        <Carousel.Slide key={item.id}>
          <FeaturedCarouselCard
            id={item.id}
            title={item.title}
            condition={item.created_at}
            price={item.price}
            image={item.images}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
export default React.memo(FeaturedCarousel);
