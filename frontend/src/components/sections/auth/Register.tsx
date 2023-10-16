import {
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
  Title,
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
          <Title order={2} ta="center" mt="md" mb={50}>
            Register to DoshroBazar
          </Title>
          <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
            <TextInput
              label="Number"
              placeholder="9837372722"
              size="md"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              label="username"
              placeholder="Hari"
              size="md"
              required
              {...form.getInputProps('name')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              required
              {...form.getInputProps('password')}
            />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" type="submit">
              Register
            </Button>
          </form>
        </div>
      )}
      {step && <OtpCard phone_number={pNumber} />}
    </>
  );
};
export default Register;
