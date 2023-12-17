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
} from '@mantine/core';
import React from 'react';
import {
  IconClock,
  IconCurrencyRupeeNepalese,
  IconEye,
  IconHeart,
  IconStarFilled,
} from '@tabler/icons-react';
import { Listings } from '../../../../orval/model';
import { Router, useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    '@media (max-width: 575px)': {
      borderRadius: 0,
      padding: theme.spacing.xs,
    },
    '@media (max-width: 980px)': {
      borderRadius: theme.radius.sm,
      padding: theme.spacing.xs,
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
    '@media (max-width: 319px)': {
      display: 'none',
    },
  },
}));
type listing = {
  listing: Listings;
};
const FeaturedCard = ({ listing }: listing) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <>
      <Card
        onClick={() =>
          listing?.is_scraped
            ? window.open(listing.link_to_original as string)
            : router.push(`/listing/listing-detail/${listing?.slug}`)
        }
        className={classes.card}
        radius={'md'}
        shadow="sm"
        padding="sm"
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
            src={listing?.banner_image || listing?.images[0].image}
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
        <Card.Section pl={'md'} pb={'md'} pr={'md'} pt={'xs'}>
          <Group>
            <Group miw={'63%'} spacing={'xl'} position="apart">
              <div style={{ width: '99%' }}>
                <Text truncate>{listing?.title}</Text>
                <Badge className={classes.badge} mt={'sm'} radius={'sm'}>
                  <Group spacing={3}>
                    <IconClock style={{ color: '#FFD700' }} size={15} />
                    <Text> 12hr ago</Text>
                  </Group>
                </Badge>
              </div>
            </Group>
          </Group>
          <Group mt={'xs'} position="apart">
            <Group spacing={5}>
              <IconCurrencyRupeeNepalese />
              <Text c={'dimmed'}>{listing?.price}</Text>
            </Group>
            <Group spacing={5}>
              <IconStarFilled />
              <Text size={'md'} c={'dimmed'}>
                4.0
              </Text>
            </Group>
          </Group>
          <Group mt={'md'} position="apart">
            <Group spacing={5}>
              <Avatar size={20} radius={'xl'} src={listing?.user?.image} />
              <Text className={classes.userName} truncate="end" size="sm">
                {listing?.user?.name}
              </Text>
            </Group>

            <Group spacing={9}>
              <IconEye />
              <Text c={'dimmed'}> {listing?.views}</Text>
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
