import { Paper } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useStore } from '../store/store';
import App, { AppProps } from 'next/app';
import { useUsersMeRetrieve } from '../../orval/users/users';

const Background = (props: any) => {
  const axiosRun = useStore((state) => state.axiosRun);
  const accessToken = useStore((state) => state.accessToken);
  const setProfile = useStore((state) => state.setProfile);
  const { data } = useUsersMeRetrieve({
    query: { enabled: Boolean(accessToken) },
  });
  useEffect(() => {
    if (typeof window !== 'undefined' && accessToken !== null) {
      axiosRun(accessToken);
    }
  }, []);
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);
  return (
    <Paper style={{ height: '100vh' }} sx={(theme) => ({})}>
      {props.children}
    </Paper>
  );
};

export default Background;
