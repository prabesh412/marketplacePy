import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Image,
  Text,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';

import { useCategoryList } from '../../../../orval/category/category';
import { Carousel } from '@mantine/carousel';
import { useRouter } from 'next/router';
const useStyles = createStyles((theme) => ({
  textInput: {
    width: '100%',
  },
  title: {
    fontSize: rem(30),

    '@media (max-width: 575px)': {
      fontSize: theme.fontSizes.xl,
      marginTop: theme.spacing.xs,
    },
  },
  categoryBox: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[4],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[5],
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(170),
    borderRadius: theme.radius.md,
  },

  homepageSearchArea: {
    width: '55%',
    maxWidth: '1200px',
    margin: 'auto',
    marginTop: theme.spacing.md,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    '@media (max-width: 1200px)': {
      width: '80%',
    },
    '@media (max-width: 576px)': {
      width: '100%',
    },
  },
}));
const CategoryMarquee = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { data: categories } = useCategoryList();
  const router = useRouter();
  return (
    <div
      style={{
        marginTop: theme.spacing.xs,
        maxWidth: '1200px',
        width: '100%',
        margin: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <Carousel
        align={'start'}
        withControls
        controlSize={30}
        loop
        dragFree
        slideSize="1%"
        height={'auto'}
        slideGap="xs"
      >
        {categories?.map(
          (category) =>
            !category.parent && (
              <Carousel.Slide>
                <Box
                  onClick={() =>
                    router.push(`/search?category__parent=${category?.id}`)
                  }
                  key={category.id}
                  w={'200px'}
                  className={classes.categoryBox}
                  my={{ xs: 'xs', md: 'sm' }}
                >
                  <Image
                    height={'70px'}
                    width={'70px'}
                    src={category?.main_category_image}
                  />
                  <Text
                    maw={'100%'}
                    truncate={'end'}
                    fw={'500'}
                    size={'xs'}
                    mt={'md'}
                  >
                    {category?.name}
                  </Text>
                </Box>
              </Carousel.Slide>
            ),
        )}
      </Carousel>
      <Divider
        label={<Badge>Browse Featured Listings</Badge>}
        labelPosition="center"
        c={'dimmed'}
        mt={1}
        mb={-5}
        size={1}
        orientation="horizontal"
      />
    </div>
  );
};

export default CategoryMarquee;
