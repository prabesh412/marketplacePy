import { Paper } from '@mantine/core';
import { useStore } from '@/zustand/store';

const Background = (props: any) => {
  return (
    <Paper style={{ height: '100vh' }} sx={(theme) => ({})}>
      {props.children}
    </Paper>
  );
};

export default Background;
