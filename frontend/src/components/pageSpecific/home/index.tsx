import HomepageSearchArea from '@/components/ui/home/search-area/HomepageSearchArea';
import FeaturedHomepageSection from '@/components/ui/homepage-listing-section/FeaturedListings';
import HomepageCarousel from '@/components/ui/carousel/HomepageCarousel';
import CategoryMarquee from '@/components/ui/category-display/CategoryMarquee';
import RecentListings from '@/components/ui/homepage-listing-section/RecentListings';

const HomeSection = () => {
  return (
    <>
      <HomepageCarousel />
      <HomepageSearchArea />
      <CategoryMarquee />
      <FeaturedHomepageSection />
      <RecentListings />
    </>
  );
};

export default HomeSection;
