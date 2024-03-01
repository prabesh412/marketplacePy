import Background from '@/components/global/Background';
import { RouterTransition } from '@/components/global/RouterTransition';
import AffixButton from '@/components/ui/common/AffixButton';
import BottomAppBar from '@/components/ui/navigation/MobileBottomAppBar';
import StoreProvider from '@/zustand/StoreProvider';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'lime',
  primaryShade: 8,
};

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <StoreProvider {...pageProps.initialZustandState}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={customTheme}
          >
            <RouterTransition />
            <Notifications limit={4} />
            <AffixButton />
            <BottomAppBar />

            <Background>{getLayout(<Component {...pageProps} />)}</Background>
          </MantineProvider>
        </Hydrate>
      </QueryClientProvider>
    </StoreProvider>
  );
}
