import { Paper } from '@mantine/core';
import { useStore } from '@/zustand/store';

const Background = (props: any) => {
  return (
    <Paper
      style={{ minHeight: '100vh' }}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme == 'light'
            ? theme.colors.gray[2]
            : theme.colors.dark[4],
        minHeight: '100vh',
      })}
      radius={0}
    >
      {props.children}
    </Paper>
  );
};

export default Background;
