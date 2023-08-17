import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDjRestAuthLoginCreate } from '../../orval/dj-rest-auth/dj-rest-auth';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';
import { routes } from '../utils/routes';

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
  const postLogin = useDjRestAuthLoginCreate();
  const setToken = useStore((state) => state.setAccessToken);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length === 10 ? null : 'invalid number'),
    },
  });

  const login = (values: { username: string; password: string }) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    postLogin.mutate(
      { data },
      {
        onSuccess: (data) => {
          setToken(data.key);
          router.push(routes.home);
        },
      },
    );
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            label="username or number"
            placeholder="9837372722"
            size="md"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </form>
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
