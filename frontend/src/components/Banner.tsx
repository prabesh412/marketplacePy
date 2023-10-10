import { createStyles, getStylesRef } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import FeaturedCarousel from './FeaturedCarousel';

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));
const Banner = () => {
  return <FeaturedCarousel />;
};

export default Banner;
