import { Paper } from '@mantine/core';
import { useStore } from '@/zustand/store';

const Background = (props: any) => {
  return (
    <Paper style={{ minHeight: '90vh' }} sx={(theme) => ({})} radius={0}>
      {props.children}
    </Paper>
  );
};

export default Background;
