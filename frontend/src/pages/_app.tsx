import { AppProps } from 'next/app';
<<<<<<< HEAD
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from '@/zustand/StoreProvider';
import Background from '@/components/Background';
import Head from 'next/head';
=======
import { MantineProvider, MantineThemeOverride, Paper } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import StoreProvider from '../../components/store/StoreProvider';
import Background from '../../components/common/Background';
import { NextPage } from 'next';
>>>>>>> prashant

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'cyan',
  primaryShade: 5,
};

<<<<<<< HEAD
const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  // @ts-ignore
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
        <StoreProvider {...pageProps.initialZustandState}>
          <QueryClientProvider client={new QueryClient()}>
            {/*<ProgressBar />*/}
            <Background>{getLayout(<Component {...pageProps} />)}</Background>
          </QueryClientProvider>
        </StoreProvider>
      </MantineProvider>
    </>
=======
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
>>>>>>> prashant
  );
};

export default App;

// TODO : select the proper type

App.getInitialProps = async (appContext: any) => {
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps };
};
