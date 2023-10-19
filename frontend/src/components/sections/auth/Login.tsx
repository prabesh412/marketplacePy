import {
  Button,
  Checkbox,
  createStyles,
  PasswordInput,
  rem,
  TextInput,
  Title,
  Container,
  Text,
  Paper,
  Anchor,
} from '@mantine/core';

import { useDjRestAuthLoginCreate } from '../../../../orval/dj-rest-auth/dj-rest-auth';
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
    
      <Paper shadow="xl" radius="sm" p="xl" style ={{ 
        backgroundColor:'#878585',borderRadius:'8px',position:'relative'
        }}>
      <Text fz="xl" lh="lg" color='#000000' weight={750} >For existing user</Text>
      <Text fz="sm" lh="md" color='#C3BFBF' weight={600}>
        Login to DoshroBazar 
      </Text>
    </Paper>
      
      <Container style={{ 
        background: 'black', padding: '20px', borderRadius: '8px' ,position:'relative',top:'40px'
        }}>
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            label="Username or number"
            placeholder="9800000000"
            size="md" 
            {...form.getInputProps('username')}
            styles={{
              label: { fontWeight: 700 },
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'teal', deg: 90 }}>
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;