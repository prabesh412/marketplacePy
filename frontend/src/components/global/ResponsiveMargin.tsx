import React, { ReactNode } from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  margin: {
    margin: '0 6em',

    '@media (max-width: 767px)': {
      margin: '0 0.4em',
    },
    '@media (min-width: 768px) and (max-width: 1279px)': {
      margin: '0 2em',
    },
    '@media (min-width: 1920px)': {
      margin: '0 10em',
    },
  },
}));
interface ResponsiveMarginProps {
  children: ReactNode;
}

const ResponsiveMargin = ({ children }: ResponsiveMarginProps) => {
  const { classes } = useStyles();
  return <div className={classes.margin}>{children}</div>;
};

export default ResponsiveMargin;
