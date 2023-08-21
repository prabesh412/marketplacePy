import { AppProps } from 'next/app';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from '@/zustand/StoreProvider';
import Background from '@/components/Background';
import Head from 'next/head';

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'cyan',
  primaryShade: 5,
};

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
