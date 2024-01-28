import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Image,
  Text,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCategory,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconStarFilled,
  IconTool,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useBookmarksCreate } from '../../../../orval/bookmarks/bookmarks';
import { getListingsListQueryKey } from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';
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
type FeaturedCardProps = {
  listing?: Listings;
  currentPage?: number;
};

const FeaturedCard = ({ listing, currentPage }: FeaturedCardProps) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const router = useRouter();
  const bookmarkMutation = useBookmarksCreate();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    listing?.is_bookmarked || false,
  );
  const queryClient = useQueryClient();
  const addBookmark = () => {
    const data = {
      listing: listing?.slug as string,
    };
    notifications.show({
      id: `userBookmark ${listing?.slug} ${isBookmarked}`,
      title: `${!isBookmarked ? 'Adding' : 'Removing'} your bookmark`,
      message: `Please wait while we add to your bookmark`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    }),
      bookmarkMutation.mutate(
        { data: data },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(
              getListingsListQueryKey({ page: currentPage }),
            );
            setIsBookmarked((prev) => !prev);
            notifications.update({
              id: `userBookmark ${listing?.slug} ${isBookmarked}`,
              title: `Bookmark successfully ${
                !isBookmarked ? 'added' : 'removed'
              }`,
              color: 'green',
              message: 'Successfully saved the bookmark!',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
          },
          onError: () => {
            notifications.update({
              id: `userBookmark ${listing?.slug} ${isBookmarked}`,
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
              {isBookmarked ? (
                <IconHeartFilled size={24} stroke={1.5} />
              ) : (
                <IconHeart size={24} stroke={1.5} />
              )}
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

          <Group mt={'sm'} noWrap position="apart">
            <Text
              className={classes.price}
              truncate
              fw={500}
              size={'lg'}
              c={'dimmed'}
            >
              रू. {listing?.price}
            </Text>

            <Group noWrap spacing={4}>
              <IconHeart stroke={2.1} style={{ color: theme.colors.lime[8] }} />
              <Text size={'md'} c={'dimmed'}>
                3
              </Text>
            </Group>
          </Group>
          <Group
            noWrap
            className={classes.smGroup}
            mt={'xs'}
            position="apart"
            spacing={5}
          >
            <Text truncate={'end'} size="sm">
              <Group noWrap spacing={5}>
                <Avatar size={30} radius="xl" color="cyan">
                  {listing?.is_scraped
                    ? GetInitials(
                        listing?.scraped_username
                          ? listing?.scraped_username
                          : '',
                      )
                    : GetInitials(
                        listing?.user?.name ? listing?.user?.name : '',
                      )}
                </Avatar>
                <Text truncate>
                  {listing?.is_scraped
                    ? listing?.scraped_username
                    : listing?.user?.name}
                </Text>
              </Group>
            </Text>

            <Group noWrap spacing={4}>
              <IconEye stroke={1.7} />
              <Text c={'dimmed'}>
                {listing?.views || listing?.scraped_views}
              </Text>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
export default FeaturedCard;
