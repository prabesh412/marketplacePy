import { AppProps } from 'next/app';
import { MantineProvider, MantineThemeOverride, Paper } from '@mantine/core';
import { IconBell, IconHeart } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '../../components/common/Navbar';
import { SideNav } from '../../components/common/SideNav';
import { useRouter } from 'next/router';
import { routes } from '../../components/utils/routes';
import StoreProvider from '../../components/store/StoreProvider';
import Background from '../../components/common/Background';

const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'cyan',
  primaryShade: 5,
};

const links = [
  {
    link: '/',
    iconArg: <IconBell />,
  },

  {
    link: '/contact',
    iconArg: <IconHeart />,
  },
];

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const shouldRenderSideNav = router.pathname !== routes.login;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
      <StoreProvider {...pageProps.initialZustandState}>
        <QueryClientProvider client={new QueryClient()}>
          <Background>
            <Navbar links={links} />
            <Component {...pageProps} />
            {shouldRenderSideNav && <SideNav />}
          </Background>
        </QueryClientProvider>
      </StoreProvider>
    </MantineProvider>
  );
}
