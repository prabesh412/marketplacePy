import { Paper } from '@mantine/core';
import { useEffect } from 'react';
import { useStore } from '@/zustand/store';
import { useUsersMeRetrieve } from '../../orval/users/users';

const Background = (props: any) => {
  const axiosRun = useStore((state) => state.axiosRun);
  const accessToken = useStore((state) => state.accessToken);

  return (
    <Paper style={{ height: '100vh' }} sx={(theme) => ({})}>
      {props.children}
    </Paper>
  );
};

export default Background;
