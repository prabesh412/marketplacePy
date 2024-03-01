import HomepageCarousel from '@/components/ui/carousel/HomepageCarousel';
import CategoryMarquee from '@/components/ui/category-display/CategoryMarquee';
import AddListingFreeBanner from '@/components/ui/common/AddListingFreeBanner';
import HomepageSearchArea from '@/components/ui/home/search-area/HomepageSearchArea';
import FeaturedHomepageSection from '@/components/ui/homepage-listing-section/FeaturedListings';
import RecentListings from '@/components/ui/homepage-listing-section/RecentListings';

const HomeSection = () => {
  return (
    <>
      <HomepageCarousel />
      <HomepageSearchArea />
      <CategoryMarquee />
      <FeaturedHomepageSection />
      <AddListingFreeBanner />
      <RecentListings />
    </>
  );
};

export default HomeSection;
