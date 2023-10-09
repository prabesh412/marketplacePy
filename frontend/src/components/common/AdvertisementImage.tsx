import { Image, createStyles } from '@mantine/core';
import React from 'react';

interface AdvertisementImage {
  imageUrl: string;
}
const useStyles = createStyles((theme) => ({
  banner: {
    width: '100%',
    maxW: '100%',
  },
}));
const AdvertisementImage = ({ imageUrl }: AdvertisementImage) => {
  const { classes } = useStyles();
  return (
    <Image
      h="50%"
      ml={'md'}
      mr={'md'}
      mb={'md'}
      w="100%"
      src={imageUrl}
      withPlaceholder
      radius="md"
      alt="side-promotion"
      className={classes.banner}
    />
  );
};

export default AdvertisementImage;
