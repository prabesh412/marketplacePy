import { AppProps } from 'next/app';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import StoreProvider from '@/zustand/StoreProvider';
import Background from '@/components/global/Background';
import { NextPage } from 'next';
import { ReactNode, useState } from 'react';
import { RouterTransition } from '@/components/global/RouterTransition';

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'green',
  primaryShade: 9,
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
            <Notifications />
            <Background>{getLayout(<Component {...pageProps} />)}</Background>
          </MantineProvider>
        </Hydrate>
      </QueryClientProvider>
    </StoreProvider>
  );
}
