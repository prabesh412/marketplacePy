import { Card, Image, Text, Badge, Button, Group, Center, Loader, TextInput } from '@mantine/core';

const OtpCard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        <TextInput
          type="number"
          placeholder="Enter the OTP here"
          mb="xl"
          rightSection={<Loader size="xs" />}
        />
        <Button variant="light" color="blue" fullWidth mt="xl" radius="md">
          Verify me
        </Button>
      </Card>
    </div>
  );
};
export default OtpCard;
