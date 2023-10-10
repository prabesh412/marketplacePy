import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Loader,
  TextInput,
} from '@mantine/core';
import { useDjRestAuthOtpCreate } from '../../../orval/dj-rest-auth/dj-rest-auth';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { PATH_APP, ROOTS_AUTH } from '@/routes';

interface OtpProps {
  phone_number: string;
}
const OtpCard = ({ phone_number }: OtpProps) => {
  const router = useRouter();

  console.log(phone_number);
  const postOtp = useDjRestAuthOtpCreate();
  const form = useForm({
    initialValues: {
      otp: '',
    },
  });
  const handleOtp = (values: { otp: string }) => {
    console.log('clicked');
    const data = {
      otp: values.otp,
      phone_number: phone_number,
    };
    notifications.show({
      id: 'otp',
      title: `Checking OTP`,
      message: `Please wait while we Confirm its you`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    postOtp.mutate(
      { data },
      {
        onSuccess: (data) => {
          router.push(ROOTS_AUTH);
          notifications.update({
            id: 'otp',
            title: `Registration Success`,
            color: 'green',
            message: 'You have been registered successfully',
            loading: false,
            autoClose: true,

            withCloseButton: true,
          });
        },
        onError: (error: any) => {
          console.log(error);
          notifications.update({
            id: 'otp',
            title: `Verification Failed`,
            color: 'red',
            message: `${error?.response?.data?.message || 'An error occurred'}`,
            loading: false,
            autoClose: true,
            withCloseButton: true,
          });
        },
      },
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card shadow="sm" padding="lg" radius="xl" withBorder>
        <Group position="center" mt="md" mb="md">
          <Text weight={700} mb="xl" fz={'xl'}>
            Enter the OTP sent to your device
          </Text>
        </Group>
        <Card.Section>
          <Image
            src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
            height={'300px'}
            width={'100%'}
            mb={'xl'}
            alt="No way!"
          />
        </Card.Section>
        <form onSubmit={form.onSubmit(handleOtp)}>
          <TextInput
            placeholder="Enter the OTP here"
            mb="xl"
            rightSection={<Loader size="xs" />}
            {...form.getInputProps('otp')}
          />
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="xl"
            radius="md"
            type="submit"
          >
            Verify me
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default OtpCard;
