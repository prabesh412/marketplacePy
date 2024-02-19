import SeoElement from '@/components/global/SeoElement';
import AddListingLayout from '@/components/layouts/AddListing';
import AddListingPage from '@/components/pageSpecific/listing-add/AddListingPage';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import { useMantineTheme } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';

export const getServerSideProps = async (ctx: NextPageContext) => {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  if (zustandStore.accessToken === '') {
    return {
      redirect: {
        destination: '/users/auth',
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

AddListing.getLayout = (page: ReactElement) => (
  <AddListingLayout>{page}</AddListingLayout>
);

export default function AddListing() {
  const theme = useMantineTheme();
  return (
    <>
      <SeoElement
        description={
          "Discover the premier destination for selling your second-hand items in Nepal with doshrodeal.com's Add Listing page. Whether you're looking to declutter your home, find new owners for your pre-loved electronics, or simply make some extra cash, our platform offers the easiest and most trusted way to sell online in Nepal. From creating your product listings to connecting with buyers across the country, doshrodeal.com is your go-to online marketplace for used goods. Sell everything from electronics to household items in just a few clicks. Join Nepal's top site for selling products online and turn your used items into cash today!"
        }
        title={'Add Listing - doshrodeal.com'}
        url={'https://www.doshrodeal.com/listing/listing-add'}
        image={''}
        keywords={
          "Sell second-hand items in Nepal, Best platform for selling online in Nepal, Online marketplace for used goods in Nepal, Add product listings in Nepal, Sell your stuff online in Nepal, Second-hand marketplace Nepal, Where to sell used items in Nepal, Nepal's top site for selling products online, Create listings to sell products online in Nepal, Buy and sell pre-owned products Nepal, Trusted site for selling second-hand goods in Nepal, Easy listing site for used items in Nepal, Online selling site in Nepal, Sell used electronics Nepal, Best place to list second-hand products Nepal, How to sell online in Nepal, Online classifieds for selling goods in Nepal, E-commerce platform for second-hand items Nepal, Quick sell items online Nepal, Nepal's marketplace for selling and buying used goods"
        }
      />
      <div style={{ marginTop: theme.spacing.md }}>
        <AddListingPage />
      </div>
    </>
  );
}
