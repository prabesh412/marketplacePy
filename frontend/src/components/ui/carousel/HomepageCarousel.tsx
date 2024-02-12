import { Carousel } from '@mantine/carousel';
import { Image, useMantineTheme } from '@mantine/core';
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
          src={
            'https://static.vecteezy.com/system/resources/previews/015/706/698/non_2x/kathmandu-nepal-background-vector.jpg'
          }
          alt="banner"
          fit="cover"
          height={'20vh'}
        />
      </Carousel>
    </div>
  );
};

export default HomepageCarousel;
