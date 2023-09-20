import Banner from '@/components/Banner';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { FeaturedSectionHead } from '@/components/FeaturedSectionHead';
import { HeroCarousel } from '@/components/HeroCarousel';

const HomeSection = () => {
  return (
    <>
      <HeroCarousel />
      <FeaturedSectionHead />
      <FeaturedCarousel />
    </>
  );
};

export default HomeSection;
