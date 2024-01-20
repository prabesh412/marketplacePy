import {
  Card,
  Image,
  Text,
  Group,
  useMantineTheme,
  Avatar,
  createStyles,
  ActionIcon,
  Badge,
  rem,
  Divider,
} from '@mantine/core';
import React from 'react';
import {
  IconCategory,
  IconClock,
  IconCurrencyRupeeNepalese,
  IconDeviceWatch,
  IconEye,
  IconHeart,
  IconStarFilled,
  IconTool,
} from '@tabler/icons-react';
import { Listings } from '../../../../orval/model';
import { Router, useRouter } from 'next/router';
import { useBookmarksCreate } from '../../../../orval/bookmarks/bookmarks';
import { notifications } from '@mantine/notifications';
import GetInitials from '../common/GetInitials';

const useStyles = createStyles((theme) => ({
  card: {
    '@media (max-width: 980px)': {
      borderRadius: theme.radius.md,
      padding: theme.radius.md,
    },
  },
  image: {
    '@media (max-width: 575px)': {
      borderRadius: 0,
    },
    '@media (max-width: 980px)': {
      borderRadius: theme.radius.sm,
    },
  },

  userName: {
    '@media (max-width: 1026px)': {
      display: 'none',
    },
  },
  badge: {
    '@media (max-width: 320px)': {
      display: 'none',
    },
  },
  icon: {
    '@media (max-width: 575px)': {
      height: '1.2em',
    },
  },
  rating: {
    '@media (max-width: 575px)': {
      display: 'none',
    },
  },
  smText: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',

    WebkitLineClamp: 1,
    '@media (max-width: 576px)': {
      display: '-webkit-box',
      height: '2.6em',
      lineHeight: '1.3em',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 2,
      fontSize: theme.fontSizes.sm,
    },
  },
  smGroup: {
    '@media (max-width: 576px)': {
      marginTop: 5,
    },
  },
  price: {
    '@media (max-width: 576px)': {
      fontSize: theme.fontSizes.md,
      marginTop: -7,
    },
  },
}));
type listing = {
  listing?: Listings;
};
const FeaturedCard = ({ listing }: listing) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const router = useRouter();
  const bookmarkMutation = useBookmarksCreate();
  const addBookmark = () => {
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
      bookmarkMutation.mutate(
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
  };

  return (
    <>
      <Card
        className={classes.card}
        radius={'md'}
        shadow="sm"
        sx={{
          maxWidth: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Card.Section
          pl={'xs'}
          pr={'xs'}
          pt={'xs'}
          sx={{
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '30px',
              right: '20px',
              zIndex: 5,
            }}
          >
            <ActionIcon
              size={30}
              radius="xl"
              color={theme.primaryColor}
              sx={{ boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.5)' }}
              variant="filled"
              onClick={() => addBookmark()}
            >
              <IconHeart size={24} stroke={1.5} />
            </ActionIcon>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '87%',
              left: '20px',
              zIndex: 5,
            }}
          >
            <Badge
              sx={{ boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.5)' }}
              className={classes.badge}
            >
              <Group spacing={3}>
                <IconStarFilled style={{ color: '#FFD700' }} size={15} />
                <Text> Featured</Text>
              </Group>
            </Badge>
          </div>

          <Image
            className={classes.image}
            src={listing?.banner_image || listing?.images[0]?.image}
            onClick={() =>
              listing?.is_scraped
                ? window.open(listing.link_to_original as string)
                : router.push(`/listing/listing-detail/${listing?.slug}`)
            }
            height="200px"
            width="100%"
            radius={'md'}
            sx={{
              objectFit: 'cover',
            }}
            alt={listing?.title}
            imageProps={{ loading: 'lazy' }}
            withPlaceholder
          />
        </Card.Section>
        <Card.Section
          pl={'md'}
          pb={'md'}
          pr={'md'}
          pt={'xs'}
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            listing?.is_scraped
              ? window.open(listing.link_to_original as string)
              : router.push(`/listing/listing-detail/${listing?.slug}`)
          }
        >
          <Text className={classes.smText} fw={500} size="md">
            {listing?.title}
          </Text>
          <Group noWrap spacing={4} mt={'xs'}>
            <Badge
              variant="filled"
              className={classes.badge}
              radius={'sm'}
              size="xs"
              w={'45%'}
              color="lime"
            >
              <Group noWrap spacing={5}>
                <IconTool size={'1.5em'} />
                <Text truncate>Like new</Text>
              </Group>
            </Badge>
            <Divider size={3} orientation="vertical" />
            <Badge
              variant="filled"
              className={classes.badge}
              radius={'sm'}
              size="xs"
              color="cyan"
              w={'50%'}
            >
              <Group noWrap spacing={5}>
                <IconCategory size={'1.5em'} />
                <Text truncate>{listing?.category?.name}</Text>
              </Group>
            </Badge>
          </Group>

          <Group mt={'xs'} position="apart">
            <Text className={classes.price} fw={500} size={'lg'} c={'dimmed'}>
              रू. {listing?.price}
            </Text>
            <Group className={classes.rating} spacing={5}>
              <IconStarFilled style={{ color: '#FFD700' }} />
              <Text size={'md'} c={'dimmed'}>
                4.0
              </Text>
            </Group>
          </Group>
          <Group className={classes.smGroup} mt={'md'} position="apart">
            <Group spacing={5}>
              <Avatar size={30} radius="xl" color="cyan">
                {listing?.is_scraped
                  ? GetInitials(
                      listing?.scraped_username
                        ? listing?.scraped_username
                        : '',
                    )
                  : GetInitials(listing?.user?.name ? listing?.user?.name : '')}
              </Avatar>
              <Text className={classes.userName} truncate="end" size="sm">
                {listing?.is_scraped
                  ? listing?.scraped_username?.substring(0, 18)
                  : listing?.user?.name}
              </Text>
            </Group>

            <Group className={classes.badge} spacing={9}>
              <IconEye />
              <Text c={'dimmed'}>
                {' '}
                {listing?.views || listing?.scraped_views}
              </Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
      {/* ) : ( */}
      {/* <Card
          shadow="sm"
          padding="md"
          sx={{
            width: '100%',
            height: '100%',
            marginBottom: '1em',
          }}
        >
          <Card.Section>
            <Image
              height="200px"
              width="100%"
              sx={{
                objectFit: 'cover',
              }}
              withPlaceholder
            />
          </Card.Section>
          <Skeleton variant="rectangle" />

          <Skeleton variant="text" width={50}></Skeleton>

          <Skeleton width={50}>
            <Button color="blue" fullWidth>
              Read Now
            </Button>
          </Skeleton>
        </Card> */}
    </>
  );
};
export default FeaturedCard;
