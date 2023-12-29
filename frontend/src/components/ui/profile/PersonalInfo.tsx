import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FocusTrap,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconChevronRight,
  IconPassword,
  IconUpload,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme == 'light'
        ? theme.colors.gray[1]
        : theme.colors.dark[4],
    borderRadius: theme.radius.sm,
  },
}));
const PersonalInfo = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: theme.spacing.lg,
        borderRadius: theme.radius.sm,
      }}
    >
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
            size={'lg'}
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Harriette Spoonlicker
            </Text>
          </div>

          <Button leftIcon={<IconUpload />} radius={'md'}>
            Upload Photo
          </Button>
        </Group>
      </UnstyledButton>

      <Stack mt={'xl'}>
        <FocusTrap>
          <Group grow>
            <TextInput
              label={<Text c={'dimmed'}>Full name</Text>}
              type="number"
              size="lg"
              radius={'md'}
              maxLength={10}
              min={1}
              // {...form.getInputProps('firstStep.price')}
              // data-autofocus={form.errors?.price !== undefined}
            />
            <TextInput
              label={<Text c={'dimmed'}>Phone Number</Text>}
              type="text"
              size="lg"
              radius={'md'}
              maxLength={10}
              minLength={10}
              // {...form.getInputProps('firstStep.phone_number')}
            />
          </Group>
          <Group grow>
            <Select
              label={<Text c={'dimmed'}>Language</Text>}
              type="number"
              size="lg"
              radius={'md'}
              data={['English', 'नेपाली']}
              maxLength={10}
              min={1}
              // {...form.getInputProps('firstStep.price')}
              // data-autofocus={form.errors?.price !== undefined}
            />
            <div>
              <Text c={'dimmed'}>Passsword</Text>
              <Button size="lg" radius={'md'} w={'100%'}>
                Change Password
              </Button>
            </div>
          </Group>
          <Checkbox
            mt={'sm'}
            label={<Text c={'dimmed'}>Make Me Anonymous</Text>}
          />
          <Checkbox label={<Text c={'dimmed'}>NSFW Listings</Text>} />
          <Checkbox label={<Text c={'dimmed'}>Open To Chat</Text>} />

          <Divider c={'dimmed'} size={1} />
          <Group position="right">
            <div>
              <Button radius={'md'}>Save Changes</Button>
            </div>
          </Group>
        </FocusTrap>
      </Stack>
    </div>
  );
};

export default PersonalInfo;
