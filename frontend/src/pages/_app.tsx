import { AppProps } from 'next/app';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from '@/zustand/StoreProvider';
import Background from '@/components/Background';
import Head from 'next/head';
import { NextPage } from 'next';
import { ReactNode } from 'react';

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'cyan',
  primaryShade: 5,
};

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
      <StoreProvider {...pageProps.initialZustandState}>
        <QueryClientProvider client={new QueryClient()}>
          <Background>{getLayout(<Component {...pageProps} />)}</Background>
        </QueryClientProvider>
      </StoreProvider>
    </MantineProvider>
  );
}
