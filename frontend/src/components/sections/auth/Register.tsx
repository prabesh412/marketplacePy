import {
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
  Title,
  Paper,
  Text,
  Container,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useDjRestAuthRegisterCreate } from '../../../../orval/dj-rest-auth/dj-rest-auth';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import OtpCard from './OtpCard';
import { notifications } from '@mantine/notifications';

const Register = () => {
  const [step, setStep] = useState<Boolean>(false);
  const [pNumber, setpNumber] = useState<string>('');

  const postRegister = useDjRestAuthRegisterCreate();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      name: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length === 10 ? null : 'invalid number'),
    },
  });

  const handleRegister = (values: {
    username: string;
    password: string;
    name: string;
  }) => {
    setpNumber(values.username);
    const data = {
      username: values.username,
      name: values.name,
      password: values.password,
    };
    /* notifications.show({
      id: 'register',
      title: `Signing you up`,
      message: `Please wait while we register you`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });*/
    postRegister.mutate(
      { data },
      {
        onSuccess: (data) => {
          setStep(true);
        },
        onError: (error: any) => {
          console.log(error);
          notifications.show({
            id: 'register',
            title: `Registration Failed`,
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
      {!step && (
        <div>
        <Paper shadow="xl" radius="sm" p="xl" style ={{ 
        backgroundColor:'#878585',borderRadius:'8px',position:'relative'
        }}>
        <Text fz="xl" lh="lg" color='#000000' weight={750} >Make a Bargain</Text>
        <Text fz="sm" lh="md" color='#C3BFBF' weight={600}>
        Welcome to DoshroBazar 
        </Text>
      </Paper>
            
      <Container style={{ 
        background: 'black', padding: '20px', borderRadius: '8px' ,position:'relative',top:'40px'
        }}>
          <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
            <TextInput
              label="Number"
              placeholder="9837372722"
              size="md"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Username"
              placeholder="Hari"
              size="md"
              required
              {...form.getInputProps('name')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              mt="md"
              size="md"
              required
              {...form.getInputProps('password')}
            />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'teal', deg: 90 }}>
              Register
            </Button>
          </form>
          </Container>
        </div>
      )}
      {step && <OtpCard phone_number={pNumber} />}
    </>
  );
};
export default Register;
