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
} from '@mantine/core';
import React from 'react';
import {
  IconCurrencyRupeeNepalese,
  IconEye,
  IconHeart,
  IconStarFilled,
} from '@tabler/icons-react';

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
const FeaturedCard = ({}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <>
      <Card
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
          pl={'md'}
          pr={'md'}
          pt={'md'}
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
            src={
              'https://cdn02.hamrobazaar.com/User/Posts/2023/09/24/21eb311d-ee4f-8ea2-06e5-ee4d86253add.webp?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
            height="200px"
            width="100%"
            radius={'md'}
            sx={{
              objectFit: 'cover',
            }}
            alt={'ddddd'}
            imageProps={{ loading: 'lazy' }}
            withPlaceholder
          />
        </Card.Section>
        <Card.Section pl={'md'} pb={'md'} pr={'md'} pt={'xs'}>
          <Group>
            <Group miw={'63%'} spacing={'xl'} position="apart">
              <div style={{ width: '99%' }}>
                <Text truncate>
                  House for sale in kathmandu near buddhanilakantha
                </Text>
                <Text c={'dimmed'}>Like New</Text>
              </div>
            </Group>
          </Group>
          <Group mt={'xs'} position="apart">
            <Group spacing={5}>
              <IconCurrencyRupeeNepalese />
              <Text c={'dimmed'}>50,000</Text>
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
              <Avatar
                size={25}
                radius={'xl'}
                src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
              />
              <Text
                className={classes.userName}
                w={'75%'}
                truncate="end"
                size="sm"
              >
                Prashant Uprety
              </Text>
            </Group>

            <Group spacing={9}>
              <IconEye />
              <Text c={'dimmed'}> 4k</Text>
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
