import { Image } from '@mantine/core';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import Banner from '../../../../public/carousel-banner.png';
const HomepageCarousel = () => {
  const router = useRouter();
  return (
    <Image
      mt={'xs'}
      maw={'1200px'}
      mah={'auto'}
      mx="auto"
      radius="md"
      fit="cover"
      src={Banner.src}
      onClick={() => router.push('/')}
      alt="hero-promotion"
    />
  );
};

export default HomepageCarousel;
