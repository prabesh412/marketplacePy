import {
  Text,
  Card,
  Group,
  createStyles,
  Image,
  Avatar,
  Divider,
  Badge,
  ActionIcon,
} from '@mantine/core';
import {
  IconClock,
  IconDotsVertical,
  IconHeart,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { Listings } from '../../../../orval/model';
import { notifications } from '@mantine/notifications';
import {
  getBookmarksProfileRetrieveQueryKey,
  useBookmarksCreate,
  useBookmarksDestroy,
} from '../../../../orval/bookmarks/bookmarks';
import { useQueryClient } from '@tanstack/react-query';

type HorizontalCardProps = {
  listing: Listings;
  overViewImage?: Blob[];
  isBookmark?: boolean;
  bookmarkId?: number;
};
const HorizontalCard = ({
  listing,
  overViewImage,
  isBookmark,
  bookmarkId,
}: HorizontalCardProps) => {
  console.log(listing);
  const { classes } = useStyles();
  const overviewUrl = overViewImage
    ? URL.createObjectURL(overViewImage?.[0])
    : null;
  const bookmarkAddMutation = useBookmarksCreate();
  const bookmarkDestroyMutation = useBookmarksDestroy();
  const queryClient = useQueryClient();
  const addAction = () => {
    if (!isBookmark) {
      const data = {
        listing: listing?.slug as string,
      };
      notifications.show({
        id: 'userBookmark',
        title: `Adding to your bookmark`,
        message: `Please wait while we add to your bookmark`,
        loading: true,
        autoClose: false,
        withCloseButton: false,
      }),
        bookmarkAddMutation.mutate(
          { data: data },
          {
            onSuccess: () => {
              notifications.update({
                id: 'userBookmark',
                title: `Bookmark successfully added`,
                color: 'green',
                message: 'Successfully saved the bookmark!',
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
            },
            onError: () => {
              notifications.update({
                id: 'userBookmark',
                title: `Bookmark couldnot be added`,
                color: 'red',
                message: 'Bookmark already exist',
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
            },
          },
        );
    } else {
      notifications.show({
        id: 'userBookmarkdestroy',
        title: `Deleting your bookmark`,
        message: `Please wait while we delete your bookmark`,
        loading: true,
        autoClose: false,
        withCloseButton: false,
      }),
        bookmarkDestroyMutation.mutate(
          { id: bookmarkId as number },
          {
            onSuccess: () => {
              notifications.update({
                id: 'userBookmarkdestroy',
                title: `Bookmark successfully deleted`,
                color: 'green',
                message: 'Successfully deleted your bookmark!',
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
              queryClient.invalidateQueries(
                getBookmarksProfileRetrieveQueryKey(),
              );
            },
            onError: () => {
              notifications.update({
                id: 'userBookmarkdestroy',
                title: `Bookmark couldnot be deleted`,
                color: 'red',
                message: 'Unexpected error occured while deleting bookmark.',
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
            },
          },
        );
    }
  };
  return (
    <Card
      shadow="sm"
      padding="md"
      radius={'md'}
      className={classes.horizontalCard}
    >
      <div
        className={classes.imageContainer}
        style={{
          backgroundImage: `url(${
            listing?.images?.[0]?.image || listing?.banner_image || overviewUrl
          })`,
        }}
      >
        <ActionIcon
          disabled={overViewImage ? true : false}
          size={30}
          radius="xl"
          color={'green'}
          sx={{ boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.5)' }}
          variant="filled"
          className={classes.heartIcon}
          onClick={() => addAction()}
        >
          {!isBookmark ? (
            <IconHeart size={24} stroke={1.5} />
          ) : (
            <IconX size={24} stroke={1.5} />
          )}
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
          <Text
            className={classes.smText}
            truncate
            mt="xs"
            c={'dimmed'}
            fw={400}
            size="md"
          >
            रू. {listing?.price}
          </Text>
          <Text
            className={classes.smContainer}
            truncate
            mt="xs"
            c="dimmed"
            size="xs"
          >
            | <Badge variant="filled"> Like New</Badge>
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
            <IconClock style={{ color: 'green' }} size={17} />
            <Text size={'xs'}>{listing?.created_at?.slice(0, 10)}</Text>
          </Group>
        </Group>
      </div>
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
    width: 185,
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
export default HorizontalCard;