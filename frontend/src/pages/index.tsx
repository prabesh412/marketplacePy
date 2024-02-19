import SeoElement from '@/components/global/SeoElement';
import HomeLayout from '@/components/layouts/HomeLayout';
import HomeSection from '@/components/pageSpecific/home';
import { getDefaultHomeStore } from '@/components/utils/PageDefaults';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../orval/category/category';
import {
  getListingsListQueryKey,
  listingsList,
} from '../../orval/listings/listings';

export async function getServerSideProps(ctx: NextPageContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getCategoryListQueryKey(),
    () => categoryList(),
    {},
  );

  await queryClient.prefetchQuery(
    getListingsListQueryKey({ page: 1 }),
    () => listingsList({ page: 1 }),
    {},
  );

  const zustandStore = await getDefaultHomeStore(ctx, queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}

HomePage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default function HomePage() {
  return (
    <>
      <SeoElement
        description={`Explore Doshrodeal, the ultimate destination for buying and selling a wide range of products in Nepal. From electronics, fashion, home goods, to unique local finds, discover the best deals and a seamless online shopping experience.`}
        title={`Doshrodeal: An Emerging Online Marketplace in Nepal`}
        url={`https://www.doshrodeal.com`}
        image={''}
        keywords={`Doshrodeal, Buy Online Nepal, Sell Online Nepal, Online Marketplace Nepal, E-commerce Nepal, Best Deals Nepal, Online Shopping Kathmandu, Pokhara Online Market, Lalitpur E-commerce, Secure Shopping Nepal, Trusted Marketplace Nepal, Electronics Sale Nepal, Fashion Marketplace Nepal, Home Decor Nepal, Second-hand Marketplace Nepal, New Products Nepal, Local Crafts Nepal, Handmade Goods Nepal, Tech Gadgets Nepal, Outdoor Gear Nepal, Sports Equipment Nepal, Vehicle Marketplace Nepal, Property Listings Nepal, Job Portal Nepal, Online Bookstore Nepal, Kids and Baby Products Nepal, Beauty and Personal Care Nepal, Groceries Online Nepal, Digital Products Nepal, Services Marketplace Nepal, Community Buy and Sell Nepal, Sustainable Products Nepal, Eco-friendly Shopping Nepal, Art and Collectibles Nepal, Books and Stationary Nepal, Educational Materials Nepal, Agricultural Products Nepal, Quick Delivery Nepal, Cash on Delivery Nepal, Online Payment Nepal, Shop Local Nepal, Support Local Businesses Nepal, Discover Unique Items Nepal, Affordable Prices Nepal, Premium Brands Nepal, Wholesale Shopping Nepal, Retail Online Shopping Nepal, Fashion Trends Nepal, Electronic Devices Nepal, Home Appliances Nepal, Kitchenware Online Nepal, Furniture Online Nepal, Home Improvement Products Nepal, Health and Wellness Nepal, Fitness Equipment Nepal `}
      />
      <HomeSection />
    </>
  );
}
