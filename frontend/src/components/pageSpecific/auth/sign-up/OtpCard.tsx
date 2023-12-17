import { Card, Text, Button, Group, PinInput } from '@mantine/core';
import { useDjRestAuthOtpCreate } from '../../../../../orval/dj-rest-auth/dj-rest-auth';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ROOTS_AUTH } from '@/components/routes';
import { IconLock } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

interface OtpProps {
  phone_number: string;
}
const OtpCard = ({ phone_number }: OtpProps) => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

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
      <Card radius={'md'} shadow="sm" w={'100%'} mt={'xl'} padding="xl">
        <Group mb={'sm'} spacing={3} position="center">
          <Text size={25} fw={'bold'}>
            OTP Verification
          </Text>
          <IconLock size={'1.5em'} />
        </Group>
        <Text align="center" size={'md'} c={'dimmed'}>
          We have sent you a verification code to your Mobile Phone. Enter the
          digits below.
        </Text>

        <form onSubmit={form.onSubmit(handleOtp)}>
          <PinInput
            mt={'xl'}
            disabled={postOtp.isLoading}
            {...form.getInputProps('otp')}
            required
            length={5}
            size={isSmallScreen ? 'md' : 'xl'}
            placeholder="o"
            type="number"
            inputMode="numeric"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          />
          <Text align="center" mt={'xl'} size={'xs'} c={'dimmed'}>
            Didn't recieve an OTP?
          </Text>
          {/* <Text underline align="center" fw={'bolder'} size={'sm'}>
            Resend OTP
          </Text> */}
          <Button
            loading={postOtp.isLoading}
            disabled={postOtp.isLoading}
            radius={'lg'}
            fullWidth
            mt="xl"
            size="lg"
            type="submit"
          >
            Verify & Proceed
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default OtpCard;
