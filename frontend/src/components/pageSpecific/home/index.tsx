import HomepageSearchArea from '@/components/ui/home/search-area/HomepageSearchArea';
import FeaturedHomepaeSection from '@/components/ui/featured/FeaturedHomepaeSection';
import HomepageCarousel from '@/components/ui/carousel/HomepageCarousel';
import CategoryMarquee from '@/components/ui/category-display/CategoryMarquee';

const HomeSection = () => {
  return (
    <>
      <HomepageCarousel />

      <HomepageSearchArea />
      {/* <HomepageCarousel /> */}
      <CategoryMarquee />
      <FeaturedHomepaeSection />
    </>
  );
};

export default HomeSection;
