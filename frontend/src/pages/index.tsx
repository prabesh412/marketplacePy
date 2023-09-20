import { useStore } from '@/zustand/store';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { getDefaultStore } from '@/utils/PageDefaults';
import { ReactElement } from 'react';
import { Page } from '@/ui';
import HomeSection from '@/sections/Home';
import HomeLayout from '@/layouts/homeLayout';

export async function getServerSideProps(ctx: NextPageContext) {
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}

HomePage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default function HomePage() {
  const store = useStore((state) => state.accessToken);

  return (
    <Page title={'Home'}>
      <HomeSection />
    </Page>
  );
}
