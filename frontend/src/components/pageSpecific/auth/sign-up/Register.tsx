import {
  Button,
  Checkbox,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDjRestAuthRegisterCreate } from '../../../../../orval/dj-rest-auth/dj-rest-auth';
import OtpCard from './OtpCard';

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
              error['response']['data']['password1'] ||
              'Unexpected error occured'
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
          <Title order={3} mt="xl" mb={'md'}>
            Register
          </Title>
          <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
            <TextInput
              placeholder="Registered Phone Number"
              size="lg"
              radius={'lg'}
              pb={'xl'}
              type="number"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              placeholder="Username"
              size="lg"
              radius={'lg'}
              pb={'xl'}
              required
              {...form.getInputProps('name')}
            />
            <PasswordInput
              placeholder="Password"
              size="lg"
              radius={'lg'}
              pb={'xl'}
              required
              {...form.getInputProps('password')}
            />
            <Divider size={3} />
            <Checkbox
              mt={'xl'}
              label={`I hereby accept the Terms and Condition of Doshrodeal.`}
              size="sm"
            />
            <Button
              radius={'lg'}
              fullWidth
              mt="xl"
              size="lg"
              type="submit"
              loading={postRegister.isLoading}
              disabled={postRegister.isLoading}
            >
              Register
            </Button>
            <Divider size={1} c={'dimmed'} mt={'xl'} />
          </form>
        </div>
      )}
      {step && <OtpCard phone_number={pNumber} />}
    </>
  );
};
export default Register;
