import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import {
  getListingsListQueryKey,
  getListingsRetrieveQueryKey,
  listingsList,
  listingsRetrieve,
  useListingsRetrieve,
} from '../../../../orval/listings/listings';

import ListingDetailLayout from '@/components/layouts/ListingDetail';
import {
  categoryList,
  getCategoryListQueryKey,
} from '../../../../orval/category/category';

import SeoElement from '@/components/global/SeoElement';
import ListingDetailWrapper from '@/components/pageSpecific/Listing-detail';
import { Listings } from '../../../../orval/model';

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsRetrieveQueryKey(slug as string),
    () => listingsRetrieve(slug as string),
    {
      staleTime: Infinity,
    },
  );
  const listingDetail: Listings | undefined = await queryClient.getQueryData(
    getListingsRetrieveQueryKey(slug as string),
  );
  if (!listingDetail) {
    return { notFound: true };
  }
  await queryClient.prefetchQuery(
    getListingsListQueryKey({
      user__username: listingDetail?.user?.username as string,
    }),
    () =>
      listingsList({ user__username: listingDetail?.user?.username as string }),
    {
      staleTime: Infinity,
    },
  );
  await queryClient.prefetchQuery(
    getListingsListQueryKey({
      category: listingDetail?.category?.id as number,
    }),
    () =>
      listingsList({
        category: listingDetail?.category?.id as number,
      }),
    {
      staleTime: Infinity,
    },
  );
  await queryClient.prefetchQuery(
    getCategoryListQueryKey(),
    () => categoryList(),
    {},
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
ListingDetail.getLayout = (page: ReactElement) => (
  <ListingDetailLayout>{page}</ListingDetailLayout>
);

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: listingDetail } = useListingsRetrieve(slug as string);

  return (
    <>
      <SeoElement
        title={`Listing Detail - ${listingDetail?.title} | Doshrodeal`}
        description={
          listingDetail?.description ||
          'Check out this amazing listing on Doshrodeal, the premier platform for buying and selling in Nepal.'
        }
        url={`https://www.doshrodeal.com/listing/listing-detail/${slug}`}
        image={listingDetail?.images[0].image || ''}
        keywords={`Buy, Sell, Listing, ${listingDetail?.category
          ?.name}, Doshrodeal, Nepal, Second-hand, Pre-owned, ${listingDetail?.title}, Online Marketplace, Buy and Sell in Nepal, Used Goods, Second-hand Electronics, Pre-loved Items, Nepal Online Shop, ${
          listingDetail?.listing_features || 'Brand'
        }, ${
          listingDetail?.location || 'Kathmandu'
        }, Affordable Prices, Best Deals, Quick Sell, Easy Buy, Gently Used, Almost New, Certified Pre-owned, Authentic, Cash on Delivery, Secure Payment, Free Delivery, Nationwide Shipping, Eco-friendly Shopping, Sustainable Shopping, Recycle, Quality Second-hand, Top Brands, Vintage, Antique, Fashion, Tech Gadgets, Furniture, Vehicles, Clothing, Books, Home Appliances, Kathmandu, Pokhara, Lalitpur, Bhaktapur, Local Marketplace, Trusted Sellers, Online Bazar, Eco-conscious, Environmentally Friendly`}
      />
      <ListingDetailWrapper listingDetail={listingDetail} />
    </>
  );
}
