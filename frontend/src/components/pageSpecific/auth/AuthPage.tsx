import { Anchor, Card, createStyles, Paper, rem, Text } from '@mantine/core';
import { useState } from 'react';
import Login from './sign-in/Login';
import Register from './sign-up/Register';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',

    backgroundImage:
      'url(https://hamrobazaar.blr1.cdn.digitaloceanspaces.com/Assets/Search.gif)',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(550),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[1],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function AuthPage() {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Card h={100} radius={'md'} p={'lg'}>
          <Text size={20} fw={'bold'}>
            Make a deal
          </Text>
          <Text fw={'lighter'} c={'dimmed'}>
            Welcome to DoshroDeal 🤝
          </Text>
        </Card>
        {activeTab === 'login' ? <Login /> : <Register />}
        {activeTab === 'login' ? (
          <Text size={'md'} mt="md">
            Don&apos;t have an account?{' '}
            <Anchor<'a'>
              href="#"
              weight={300}
              onClick={() => handleTabChange('register')}
            >
              Register Here
            </Anchor>
          </Text>
        ) : (
          <Text size={'md'} mt="md">
            Already have an account?{' '}
            <Anchor<'a'>
              href="#"
              weight={300}
              onClick={() => handleTabChange('login')}
            >
              {''}Login
            </Anchor>
          </Text>
        )}
      </Paper>
    </div>
  );
}
