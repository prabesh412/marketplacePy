import {
  Button,
  Checkbox,
  createStyles,
  PasswordInput,
  rem,
  TextInput,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useDjRestAuthRegisterCreate } from '../../../orval/dj-rest-auth/dj-rest-auth';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import OtpCard from './OtpCard';

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

const Register = () => {
  const [step, setStep] = useState<Boolean>(false);
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

  const handleRegister = (values: { username: string; password: string; name: string }) => {
    const data = {
      username: values.username,
      name: values.name,
      password: values.password,
    };
    postRegister.mutate(
      { data },
      {
        onSuccess: (data) => {
          setStep(true);
        },
      }
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
              {...form.getInputProps('username')}
            />
            <TextInput
              label="username"
              placeholder="Hari"
              size="md"
              {...form.getInputProps('name')}
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
              Register
            </Button>
          </form>
        </div>
      )}
      {step && <OtpCard />}
    </>
  );
};
export default Register;
