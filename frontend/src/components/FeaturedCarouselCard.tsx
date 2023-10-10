import React from 'react';
import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  getStylesRef,
  rem,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import {
  IconBookmarks,
  IconDotsVertical,
  IconMaximize,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  cardContainer: {
    width: '100%',
    maxWidth: '180px',
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  carousel: {
    '&:hover': {
      [`& .${getStylesRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },
  carouselControls: {
    ref: getStylesRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',
    //backgroundColor: 'primary',
    '&[data-active]': {
      width: rem(16),
    },
  },

  cardContent: {
    position: 'relative',
    marginTop: rem(10),
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: rem(14),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    marginLeft: rem(8),
    cursor: 'pointer',
    color: 'grey',
  },
  conditionBadge: {
    marginBottom: rem(8),
  },
}));

interface CardProps {
  title: string;
  image: string[];
  condition: string;
  price: string;
}

export function FeaturedCarouselCard({
  title,
  image,
  condition,
  price,
}: CardProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card radius="sm" padding="xs">
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {image?.map((img) => (
              <Carousel.Slide key={img}>
                <Image radius="md" src={img} height={130} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>
        <div className={classes.cardContent}>
          <div className={classes.titleContainer}>
            <Text className={classes.title} fw={500}>
              {title}
            </Text>
            <ActionIcon className={classes.icon} component="a">
              <IconBookmarks />
            </ActionIcon>
          </div>
          <Group position="apart">
            <Badge
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              className={classes.conditionBadge}
            >
              {condition}
            </Badge>
          </Group>
          <Group position="apart">
            <Text fz="md" span fw={500}>
              रू{price}
            </Text>
            <ActionIcon component="a">
              <IconMaximize />
            </ActionIcon>
          </Group>
        </div>
        <ActionIcon
          component="a"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <IconDotsVertical />
        </ActionIcon>
      </Card>
    </div>
  );
}
