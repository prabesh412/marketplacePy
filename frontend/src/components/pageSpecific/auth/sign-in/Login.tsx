import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { useDjRestAuthLoginCreate } from '../../../../../orval/dj-rest-auth/dj-rest-auth';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { useStore } from '@/zustand/store';
import { PATH_APP } from '@/components/routes';
import { notifications } from '@mantine/notifications';

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
  const setUser = useStore((state) => state.setProfile);
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
    notifications.show({
      id: 'login',
      title: `Logging you up`,
      message: `Please wait while we Log you in`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    postLogin.mutate(
      { data },
      {
        onSuccess: (data) => {
          setToken(data.key);
          setUser(data.key);
          router.push(PATH_APP.root);
          notifications.update({
            id: 'login',
            title: `Login Success`,
            color: 'green',
            message: 'Logged in successfully',
            loading: false,
            autoClose: true,

            withCloseButton: true,
          });
        },
        onError: (error: any) => {
          notifications.update({
            id: 'login',
            title: `Login Failed`,
            color: 'red',
            message: `${
              error['response']['data']['email'] ||
              error['response']['data']['username'] ||
              error['response']['data']['non_field_errors'] ||
              error['response']['data']['password1']
            }`,
            loading: false,
            autoClose: true,
            withCloseButton: true,
          });
        },
      },
    );
  };
  return (
    <>
      <div>
        <Title order={3} mt="xl" mb={'md'}>
          Login
        </Title>
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            placeholder="Phone Number"
            size="lg"
            radius={'lg'}
            pb={'xl'}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            placeholder="Password"
            size="lg"
            radius={'lg'}
            mb={'xl'}
            {...form.getInputProps('password')}
          />
          <Divider size={3} mt={'xl'} />
          {/* <Checkbox
            mt={'xl'}
            label={`I hereby accept the Terms and Condition of Doshrodeal.`}
            size="sm"
          /> */}
          <Button
            radius={'lg'}
            fullWidth
            mt="xl"
            size="lg"
            type="submit"
            loading={postLogin.isLoading}
            disabled={postLogin.isLoading}
          >
            Log in
          </Button>
          <Text mt={'xl'} size={'xs'} c={'dimmed'}>
            Forgot your passsword?
          </Text>
          <Divider size={1} c={'dimmed'} mt={'xl'} />
        </form>
      </div>
    </>
  );
};
export default Login;
