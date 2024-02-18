import { Paper, createStyles } from '@mantine/core';

const Background = (props: any) => {
  const { classes } = useStyles();

  return (
    <Paper
      style={{ minHeight: '100vh' }}
      className={classes.padding}
      radius={0}
    >
      {props.children}
    </Paper>
  );
};

export default Background;
const useStyles = createStyles((theme) => ({
  padding: {
    backgroundColor:
      theme.colorScheme == 'light'
        ? theme.colors.gray[2]
        : theme.colors.dark[4],
    minHeight: '100vh',
    '@media (max-width: 576px)': {
      paddingBottom: 75,
    },
  },
}));
