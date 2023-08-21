import {
  Button,
  Checkbox,
  createStyles,
  PasswordInput,
  rem,
  TextInput,
  Title,
} from '@mantine/core';
import { useDjRestAuthLoginCreate } from '../../../orval/dj-rest-auth/dj-rest-auth';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { useStore } from '@/zustand/store';
import { PATH_APP } from '@/routes';

const useStyles = createStyles((theme) => ({
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
}));
const Login = () => {
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
          router.push(PATH_APP.root);
        },
      }
    );
  };
  return (
    <>
      <div>
        <Title order={2} ta="center" mt="md" mb={50}>
          Login to DoshroBazar
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
      </div>
    </>
  );
};
export default Login;
