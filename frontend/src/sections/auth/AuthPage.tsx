import { Anchor, createStyles, Paper, rem, Text } from '@mantine/core';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function AuthPage() {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        {activeTab === 'login' ? <Login /> : <Register />}
        {activeTab === 'login' ? (
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor<'a'> href="#" weight={700} onClick={() => handleTabChange('register')}>
              Register
            </Anchor>
          </Text>
        ) : (
          <Text ta="center" mt="md">
            Already have an account?
            <Anchor<'a'> href="#" weight={700} onClick={() => handleTabChange('login')}>
              Login
            </Anchor>
          </Text>
        )}
      </Paper>
    </div>
  );
}
