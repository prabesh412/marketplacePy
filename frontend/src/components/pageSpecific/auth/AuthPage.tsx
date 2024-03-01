import { Anchor, Card, createStyles, Paper, rem, Text } from '@mantine/core';
import { useState } from 'react';
import Banner from '../../../../public/login-banner.png';
import Login from './sign-in/Login';
import Register from './sign-up/Register';
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    maxWidth: '1200px',
    margin: 'auto',
    minHeight: '100vh',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    backgroundColor: theme.colors.lime[8],
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: rem(20),
    maxWidth: rem(480),

    borderRight: `1px solid ${theme.colors.gray[4]}`,
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      padding: rem(10),
      borderRight: 'none',
    },
  },
  imageContainer: {
    flex: 1,
    backgroundImage: `url(${Banner.src})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'white',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
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

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0}>
        <Card className={classes.card} radius={'md'} p={'lg'} shadow="lg">
          <Text c={'white'} size={20} fw={'bold'}>
            Find your next deal!
          </Text>
          <Text c={'white'} fw={340}>
            Start your journey of real deals now.
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

      <div className={classes.imageContainer}></div>
    </div>
  );
}
