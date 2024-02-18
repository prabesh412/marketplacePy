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
import { useState } from 'react';
import {
  getUsersMeRetrieveQueryKey,
  useUsersMeRetrieve,
  useUsersUpdate,
} from '../../../../orval/users/users';

import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmationModal from '../common/ConfirmationModal';
import GetInitials from '../common/GetInitials';

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

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
  const changeUserDetails = (values?: { name: string; userName: string }) => {
    const data = {
      username: user?.username as string,
      name: values?.name as string,
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
            closeConfirmModal();
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
  const handleUpdateConfirmation = (values: {
    name: string;
    userName: string;
  }) => {
    setIsConfirmModalOpen(true);
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: theme.spacing.lg,
        borderRadius: theme.radius.sm,
      }}
    >
      <form onSubmit={form.onSubmit(handleUpdateConfirmation)}>
        <div>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar size={40} radius="xl" color="cyan">
                {GetInitials(user?.name ? user?.name : '')}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {user?.name}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </div>

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
                readOnly
                placeholder={user?.username}
                radius={'md'}
                maxLength={10}
                minLength={10}
                // {...form.getInputProps('userName')}
              />
            </Group>
            <Group grow>
              <Select
                readOnly
                label={<Text c={'dimmed'}>Language</Text>}
                type="number"
                size="lg"
                radius={'md'}
                data={['English', 'नेपाली']}
                placeholder="English"
                maxLength={10}
                min={1}
              />
              <div>
                <Text c={'dimmed'}>Passsword</Text>
                <Popover width={'auto'} position="bottom" withArrow shadow="md">
                  <Button disabled size="lg" radius={'md'} w={'100%'}>
                    Reset
                  </Button>
                </Popover>
              </div>
            </Group>
            <Checkbox
              mt={'sm'}
              disabled
              label={<Text c={'dimmed'}>Make Me Anonymous</Text>}
            />
            <Checkbox
              disabled
              label={<Text c={'dimmed'}>NSFW Listings</Text>}
            />
            <Checkbox disabled label={<Text c={'dimmed'}>Open To Chat</Text>} />

            <Divider c={'dimmed'} size={1} />
            <Group position="right">
              {!userPatch.isLoading && (
                <Button
                  disabled={userPatch.isLoading}
                  radius={'md'}
                  type="submit"
                >
                  Save Changes
                </Button>
              )}
            </Group>
          </FocusTrap>
        </Stack>
      </form>
      <ConfirmationModal
        title="Confirm Update"
        color="lime"
        text={'Are you sure, you want to update your profile details?'}
        isModalOpen={isConfirmModalOpen}
        closeModal={closeConfirmModal}
        confirmOperation={() => {
          changeUserDetails(form.values);
        }}
      />
    </div>
  );
};

export default PersonalInfo;
