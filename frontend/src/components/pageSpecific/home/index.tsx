import HomepageSearchArea from '@/components/ui/home/search-area/HomepageSearchArea';
import FeaturedHomepaeSection from '@/components/ui/homepage-listing-section/FeaturedListings';
import HomepageCarousel from '@/components/ui/carousel/HomepageCarousel';
import CategoryMarquee from '@/components/ui/category-display/CategoryMarquee';
import RecentListings from '@/components/ui/homepage-listing-section/RecentListings';

const HomeSection = () => {
  return (
    <>
      <HomepageCarousel />
      <HomepageSearchArea />
      <CategoryMarquee />
      <FeaturedHomepaeSection />
      <RecentListings />
    </>
  );
};

export default HomeSection;
