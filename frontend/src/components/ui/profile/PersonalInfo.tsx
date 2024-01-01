import { useStore } from '@/zustand/store';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FocusTrap,
  Group,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import React from 'react';
import {
  getUsersMeRetrieveQueryKey,
  useUsersMeRetrieve,
  useUsersUpdate,
  usersMeRetrieve,
} from '../../../../orval/users/users';

import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';

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
  const { data: user } = useUsersMeRetrieve();
  const userPatch = useUsersUpdate();
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: '',
      userName: '',
    },
    validate: {
      name: (value) =>
        value.length > 1
          ? null
          : 'User name should be greater than 3 alphabets',
      // userName: (value) => (value?.length === 10 ? null : 'invalid number'),
    },
  });
  const changeUserDetails = (values: { name: string; userName: string }) => {
    const data = {
      username: user?.username as string,
      name: values.name,
    };
    notifications.show({
      id: 'userPatch',
      title: `Changing your info`,
      message: `Please wait while we change your info`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    }),
      userPatch.mutate(
        { username: user?.username as string, data: data },
        {
          onSuccess: () => {
            notifications.update({
              id: 'userPatch',
              title: `User info changed successfully`,
              color: 'green',
              message: 'Successfully updated your info!',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
            queryClient.invalidateQueries(getUsersMeRetrieveQueryKey());
            form.reset();
          },
          onError: (error: any) => {
            notifications.update({
              id: 'userPatch',
              title: `Info update failed`,
              color: 'red',
              message: `${
                error['response']['data']['name'] ||
                error['response']['data']['username'] ||
                error['response']['data']['non_field_errors']
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
    <div
      style={{
        backgroundColor: 'white',
        padding: theme.spacing.lg,
        borderRadius: theme.radius.sm,
      }}
    >
      <form onSubmit={form.onSubmit((values) => changeUserDetails(values))}>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={user?.image} radius="xl" size={'lg'} />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user?.name}
              </Text>
            </div>

            <Button leftIcon={<IconUpload />} radius={'md'}>
              Upload New Photo
            </Button>
          </Group>
        </UnstyledButton>

        <Stack mt={'xl'}>
          <FocusTrap>
            <Group grow>
              <TextInput
                label={<Text c={'dimmed'}>Full name</Text>}
                size="lg"
                radius={'md'}
                placeholder={user?.name}
                maxLength={20}
                min={1}
                {...form.getInputProps('name')}
              />
              <TextInput
                label={<Text c={'dimmed'}>Phone Number</Text>}
                type="text"
                size="lg"
                placeholder={user?.username}
                radius={'md'}
                maxLength={10}
                minLength={10}
                // {...form.getInputProps('userName')}
              />
            </Group>
            <Group grow>
              <Select
                label={<Text c={'dimmed'}>Language</Text>}
                type="number"
                size="lg"
                radius={'md'}
                data={['English', 'नेपाली']}
                placeholder="English"
                maxLength={10}
                min={1}
                // {...form.getInputProps('firstStep.price')}
                // data-autofocus={form.errors?.price !== undefined}
              />
              <div>
                <Text c={'dimmed'}>Passsword</Text>
                <Popover width={'auto'} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <Button size="lg" radius={'md'} w={'100%'}>
                      Change Password
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text size={'sm'} fw={'600'}>
                      Select Price Range
                    </Text>

                    <TextInput
                      placeholder="Min"
                      type="number"
                      w={'100%'}
                      {...form.getInputProps('priceRangeMin')}
                    />
                    <TextInput
                      mt={'md'}
                      w={'100%'}
                      placeholder="Max"
                      type="number"
                      {...form.getInputProps('priceRangeMax')}
                    />
                  </Popover.Dropdown>
                </Popover>
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
                <Button
                  disabled={userPatch.isLoading}
                  radius={'md'}
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </Group>
          </FocusTrap>
        </Stack>
      </form>
    </div>
  );
};

export default PersonalInfo;