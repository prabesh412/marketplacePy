import { AppProps } from 'next/app';
import { MantineProvider, MantineThemeOverride, Paper } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import StoreProvider from '../../components/store/StoreProvider';
import Background from '../../components/common/Background';
import { NextPage } from 'next';

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
