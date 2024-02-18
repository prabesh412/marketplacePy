import { GetKeyFromValue } from '@/components/utils/GetKeyFromMap';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import { useStore } from '@/zustand/store';
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconClock,
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconX,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getBookmarksProfileRetrieveQueryKey,
  useBookmarksCreate,
  useBookmarksDestroy,
} from '../../../../orval/bookmarks/bookmarks';
import { getListingsListQueryKey } from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';
import GetInitials from '../common/GetInitials';

type HorizontalCardProps = {
  listing?: Listings;
  overViewDetails?: any;
  overViewImage?: Blob[];
  isBookmark?: boolean;
  bookmarkId?: number;
  isOverview?: boolean;
  currentPage?: number;
};
const HorizontalCard = ({
  listing,
  overViewImage,
  overViewDetails,
  isBookmark,
  bookmarkId,
  isOverview,
  currentPage,
}: HorizontalCardProps) => {
  const { classes } = useStyles();
  const overviewUrl =
    isOverview && overViewImage
      ? URL?.createObjectURL(overViewImage?.[0])
      : null;
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    listing?.is_bookmarked || false,
  );
  const bookmarkAddMutation = useBookmarksCreate();
  const bookmarkDestroyMutation = useBookmarksDestroy();
  const queryClient = useQueryClient();
  const user = useStore((state) => state.profile);

  const addAction = () => {
    if (!isBookmark) {
      const data = {
        listing: listing?.slug as string,
      };
      notifications.show({
        id: `userBookmark ${listing?.slug} ${isBookmarked}`,
        title: `${!isBookmarked ? 'Adding' : 'Removing'} your bookmark`,
        message: `Please wait while we ${
          !isBookmarked ? 'add' : 'remove'
        }  your bookmark`,
        loading: true,
        autoClose: false,
        withCloseButton: false,
      }),
        bookmarkAddMutation.mutate(
          { data: data },
          {
            onSuccess: async () => {
              setIsBookmarked((prev) => !prev);
              notifications.update({
                id: `userBookmark ${listing?.slug} ${isBookmarked}`,
                title: `Bookmark successfully ${
                  !isBookmarked ? 'added' : 'removed'
                }`,
                color: 'green',
                message: `Successfully  ${
                  !isBookmarked ? 'added' : 'removed'
                } the bookmark!`,
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
              await queryClient.invalidateQueries(getListingsListQueryKey());
              await queryClient.invalidateQueries(
                getBookmarksProfileRetrieveQueryKey(),
              );
            },
            onError: () => {
              notifications.update({
                id: `userBookmark ${listing?.slug} ${isBookmarked}`,
                title: `Bookmark couldnot be added`,
                color: 'red',
                message: 'Please make sure you are logged in',
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
            onSuccess: async () => {
              notifications.update({
                id: 'userBookmarkdestroy',
                title: `Bookmark successfully deleted`,
                color: 'green',
                message: 'Successfully deleted your bookmark!',
                loading: false,
                autoClose: true,
                withCloseButton: true,
              });
              await queryClient.invalidateQueries(
                getBookmarksProfileRetrieveQueryKey(),
              );
              await queryClient.refetchQueries(getListingsListQueryKey());
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
  const router = useRouter();
  console.log(listing?.listing_condition);
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
          size={30}
          radius="xl"
          color={'green'}
          sx={{ boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.5)' }}
          variant="filled"
          className={classes.heartIcon}
          onClick={() => {
            if (!isOverview) addAction();
          }}
        >
          {!isBookmark ? (
            isBookmarked ? (
              <IconHeartFilled size={24} stroke={1.5} />
            ) : (
              <IconHeart size={24} stroke={1.5} />
            )
          ) : (
            <IconX size={24} stroke={1.5} />
          )}
        </ActionIcon>
      </div>
      <div
        className={classes.textContainer}
        onClick={() =>
          !isOverview &&
          (!listing?.is_scraped
            ? router.push(`/listing/listing-detail/${listing?.slug}`)
            : window.open(listing.link_to_original as string))
        }
      >
        <Group position="apart" noWrap>
          <Text className={classes.title} fw={500} size="md">
            {isOverview ? overViewDetails?.title : listing?.title}
          </Text>

          <IconDotsVertical />
        </Group>
        <Group noWrap spacing={4}>
          <Text
            className={classes.priceText}
            truncate
            mt="xs"
            c={'dimmed'}
            fw={400}
            size="md"
          >
            रू. {isOverview ? overViewDetails?.price : listing?.price}
          </Text>
          <Text
            className={classes.smContainer}
            truncate
            mt="xs"
            c="dimmed"
            size="xs"
          >
            |{' '}
            <Badge variant="filled">
              {isOverview
                ? overViewDetails?.listing_condition
                : GetKeyFromValue(ListingOptionMap, listing?.listing_condition)}
            </Badge>
          </Text>
          <Text
            className={classes.smContainer}
            truncate
            mt="xs"
            c="dimmed"
            size="sm"
          >
            |
            <Badge>
              {isOverview ? "Your listing's category" : listing?.category?.name}
            </Badge>
          </Text>
        </Group>
        <Text className={classes.description} mt="xs" c="dimmed" size="sm">
          {isOverview ? overViewDetails?.description : listing?.description}
        </Text>
        <Group spacing={2} noWrap>
          <Text className={classes.smText} fw={400} truncate mt="xs" size="sm">
            {isOverview ? overViewDetails?.location : listing?.location}
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
          <Group noWrap spacing={4}>
            <Avatar size={25} radius="xl" color="cyan">
              {!isOverview
                ? listing?.is_scraped
                  ? listing?.scraped_username
                    ? GetInitials(listing?.scraped_username)
                    : ''
                  : listing?.user?.name
                  ? GetInitials(listing?.user?.name)
                  : ''
                : user?.name
                ? GetInitials(user?.name)
                : ''}
            </Avatar>
            <Text size="xs" w={'99%'} truncate={'end'}>
              {!isOverview
                ? listing?.is_scraped
                  ? listing?.scraped_username
                  : listing?.user?.name
                : user?.name}
            </Text>
          </Group>
          <Group className={classes.smContainer} spacing={2}>
            <IconClock style={{ color: 'green' }} size={17} />
            <Text size={'xs'}>
              {!isOverview
                ? listing?.created_at?.slice(0, 10)
                : 'Listing creation time'}
            </Text>
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
      borderRadius: theme.radius.sm,
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
      width: 130,
      height: 135,
    },
    '@media (max-width: 345px)': {
      width: 110,
      height: 125,
    },
  },

  heartIcon: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    zIndex: 10,
    cursor: 'pointer',
  },
  textContainer: {
    flex: 1,
    width: 0,
    paddingLeft: theme.spacing.xs,
    '@media (max-width: 576px)': {
      paddingLeft: 0,
    },
    cursor: 'pointer',
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
      fontSize: theme.fontSizes.xs,
    },
  },
  priceText: {
    '@media (max-width: 576px)': {
      marginTop: 0,
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
    },
  },
  divider: {
    '@media (max-width: 576px)': {
      marginTop: 2,
    },
  },
}));
export default HorizontalCard;
