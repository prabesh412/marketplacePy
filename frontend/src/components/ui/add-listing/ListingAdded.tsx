import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import { Keyframes } from '@emotion/react';
import ListingStepper from './ListingStepper';
import { useRouter } from 'next/router';

const ListingAdded = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <>
      <ListingStepper step={5} />
      <Center>
        <Card
          shadow="sm"
          radius="lg"
          style={{ width: '100%', height: rem(400) }}
        >
          <Stack
            spacing="md"
            align="center"
            justify="center"
            style={{ height: '100%' }}
          >
            <Paper
              radius="xl"
              style={{
                padding: rem(20),
                backgroundColor: theme.colors.lime[6],
              }}
            >
              <IconCircleCheck color="white" stroke={1.5} size={rem(80)} />
            </Paper>
            <Title order={3} style={{ color: theme.colors.lime[7] }}>
              Listing Added Successfully
            </Title>
            <Text size="md" align="center">
              Your listing has been added. You can view it or add another one.
            </Text>
            <Group position="center" mt="md">
              <Button
                variant="outline"
                radius={'md'}
                leftIcon={<IconArrowRight size={20} />}
                onClick={() => router.push('/')}
                style={{
                  borderColor: theme.colors.lime[6],
                  color: theme.colors.lime[6],
                }}
              >
                Return home
              </Button>
              <Button
                onClick={() => router.push('/listing/listing-add')}
                radius={'md'}
                color="lime"
              >
                Add Another Listing
              </Button>
            </Group>
          </Stack>
        </Card>
      </Center>
    </>
  );
};

export default ListingAdded;
