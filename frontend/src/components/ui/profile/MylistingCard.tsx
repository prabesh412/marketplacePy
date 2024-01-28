import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Menu,
  Text,
  createStyles,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconClock,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getListingsMeRetrieveQueryKey,
  useListingsDestroy,
} from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';
import ConfirmationModal from '../common/ConfirmationModal';
import { GetKeyFromValue } from '@/components/utils/GetKeyFromMap';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';

type HorizontalCardProps = {
  listing: Listings;
};
const MylistingCard = ({ listing }: HorizontalCardProps) => {
  const { classes } = useStyles();
  const deleteMutation = useListingsDestroy();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = (slug: string) => {
    notifications.show({
      id: 'userListing',
      title: `Deleting your listing`,
      message: `Please wait while we delete your listing`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    }),
      deleteMutation.mutate(
        { slug: slug },
        {
          onSuccess: () => {
            notifications.update({
              id: 'userListing',
              title: `Listing successfully deleted`,
              color: 'green',
              message: 'Successfully deleted your listing!',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
            queryClient.invalidateQueries(getListingsMeRetrieveQueryKey());
          },
          onError: () => {
            notifications.update({
              id: 'userListing',
              title: `Error deleting your listing`,
              color: 'red',
              message: 'Unexpected error occured while deleting your listing',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
          },
        },
      );
  };
  const router = useRouter();
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const confirmDelete = () => {
    handleDelete(listing?.slug);
    closeDeleteModal();
  };
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius={'md'}
      className={classes.horizontalCard}
    >
      <div
        className={classes.imageContainer}
        style={{
          backgroundImage: `url(${
            listing?.images?.[0]?.image || listing?.banner_image
          })`,
        }}
      >
        <ActionIcon
          size={30}
          radius="xl"
          color={'green'}
          sx={{ boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.5)' }}
          variant="filled"
          className={classes.heartIcon}
        >
          <Menu
            transitionProps={{ transition: 'pop-top-right' }}
            position="top-start"
            width={220}
            withinPortal
          >
            <Menu.Target>
              <IconEdit size={24} stroke={1.5} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => openDeleteModal()}
                rightSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color="red"
                  />
                }
              >
                Delete Listing
              </Menu.Item>
              <Menu.Item
                onClick={() => router.push('/listing/')}
                rightSection={
                  <IconEdit
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Edit Listing Details
              </Menu.Item>
              <Menu.Item
                rightSection={
                  <IconCheck
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color="blue"
                  />
                }
              >
                Mark Listing as sold
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </ActionIcon>
      </div>
      <div className={classes.textContainer}>
        <Group position="apart" noWrap>
          <Text className={classes.title} fw={500} size="md">
            {listing?.title}
          </Text>

          <IconDotsVertical />
        </Group>
        <Group noWrap spacing={4}>
          <Text className={classes.smText} truncate mt="xs" fw={500} size="md">
            रू. {listing?.price}
          </Text>
          <Text
            className={classes.smContainer}
            truncate
            mt="xs"
            c="dimmed"
            size="xs"
          >
            |
            <Badge>
              {GetKeyFromValue(ListingOptionMap, listing?.listing_condition)}
            </Badge>
          </Text>
          <Text
            className={classes.smContainer}
            truncate
            mt="xs"
            c="dimmed"
            size="sm"
          >
            | <Badge>{listing?.category?.name}</Badge>
          </Text>
        </Group>
        <Text className={classes.description} mt="xs" c="dimmed" size="sm">
          {listing?.description}
        </Text>
        <Group spacing={2} noWrap>
          <Text className={classes.smText} truncate mt="xs" size="sm">
            {listing?.location}
          </Text>
        </Group>
        <Divider className={classes.divider} mt={'xs'} />
        <Group
          className={classes.divider}
          mt={'xs'}
          position="apart"
          spacing="xs"
          noWrap
        >
          <Group noWrap spacing={2}>
            <Avatar size={20} src={''} />
            <Text size="xs" w={'100%'} truncate>
              {listing?.user?.name}
            </Text>
          </Group>
          <Group className={classes.smContainer} spacing={2}>
            <IconClock size={15} />
            <Text size={'xs'}>12-20-2023</Text>
          </Group>
        </Group>
      </div>
      <ConfirmationModal
        title="Confirm Deletion"
        color="lime"
        text={
          'Are you sure, you want to delete your listing? once deleted it cannot be  restored.'
        }
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        confirmOperation={confirmDelete}
      />
    </Card>
  );
};
const useStyles = createStyles((theme) => ({
  horizontalCard: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 576px)': {
      padding: theme.spacing.xs,
    },
  },
  imageContainer: {
    width: 180,
    height: 180,
    position: 'relative',
    overflow: 'hidden',
    marginRight: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '@media (max-width: 576px)': {
      width: 115,
      height: 130,
    },
  },

  heartIcon: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    zIndex: 100,
    cursor: 'pointer',
  },
  textContainer: {
    flex: 1,
    width: 0,
    paddingLeft: theme.spacing.xs,
    '@media (max-width: 576px)': {
      paddingLeft: 0,
    },
  },
  smContainer: {
    '@media (max-width: 576px)': {
      display: 'none',
    },
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    '@media (max-width: 576px)': {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 2,
      fontSize: theme.fontSizes.sm,
    },
  },
  description: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    '@media (max-width: 576px)': {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 1,
      fontSize: theme.fontSizes.xs,
      marginTop: 0,
    },
  },
  smText: {
    '@media (max-width: 576px)': {
      marginTop: 0,
      fontSize: theme.fontSizes.sm,
    },
  },
  divider: {
    '@media (max-width: 576px)': {
      marginTop: 2,
    },
  },
}));
export default MylistingCard;
