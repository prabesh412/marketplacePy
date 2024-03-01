import SeoElement from '@/components/global/SeoElement';
import AuthLayout from '@/components/layouts/AuthLayout';
import { AuthPage } from '@/components/pageSpecific/auth/AuthPage';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';

export const getServerSideProps = async (ctx: NextPageContext) => {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  if (zustandStore.accessToken !== '') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
};

Auth.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export default function Auth() {
  return (
    <>
      <SeoElement
        title={`Login or Register | Doshrodeal`}
        description={`Join Doshrodeal, Nepal's emerging online marketplace. Sign in to your account to discover, buy, and sell a wide range of items from electronics to home goods across Nepal.`}
        url={`https://www.doshrodeal.com/users/auth`}
        image=""
        keywords={`Doshrodeal, Login, Register, Online Marketplace, Nepal, Buy, Sell, Electronics, Home Goods, Account, Sign In, User Dashboard, Secure Shopping, Personalized Experience, Wishlist, Manage Listings, Discover Deals, Exclusive Offers, Quick Checkout, Secure Payment, Member Benefits, Shop Online Nepal, Trusted Sellers, Marketplace Nepal, E-commerce Nepal, Second-hand, Pre-loved Items, Kathmandu Shopping, Pokhara Deals, Easy Returns, Customer Support, Seller Account, Buyer Account, Marketplace Account, Join Community`}
      />
      <AuthPage />
    </>
  );
}
