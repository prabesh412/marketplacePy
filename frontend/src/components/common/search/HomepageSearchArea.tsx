import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
  Group,
  createStyles,
  Box,
  Grid,
  Text,
  Title,
  Button,
} from '@mantine/core';
import {
  IconHome,
  IconCar,
  IconArmchair,
  IconSearch,
  IconShirt,
  IconCategory,
} from '@tabler/icons-react';
import DefaultSideNav from '../navigation/DefaultSideNav';

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
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(170),
    borderRadius: theme.radius.md,
    '@media (max-width: 575px)': {
      borderRadius: theme.radius.sm,
      height: rem(150),
    },
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

const HomepageSearchArea = (props: TextInputProps) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  return (
    <>
      <div className={classes.homepageSearchArea}>
        <div
          style={{
            flex: 8,
            paddingRight: rem(10),
          }}
        >
          <Group position="center">
            <Title mt={'lg'} className={classes.title}>
              Find your dream listing you are searching for.
            </Title>
            <TextInput
              className={classes.textInput}
              radius="md"
              size="md"
              placeholder="Search for what you are looking for and we will handle the rest."
              rightSectionWidth={50}
              rightSection={
                <ActionIcon
                  size={35}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled"
                >
                  <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
              {...props}
            />
          </Group>
          <Grid mt={'xs'} gutter="md">
            <Grid.Col span={6} xs={6} sm={6} md={3}>
              <Box className={classes.categoryBox} my={{ xs: 'xs', md: 'sm' }}>
                <IconHome size={'6em'} />
                <Text fw={'500'} mt={'xs'}>
                  House
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={6} xs={6} sm={6} md={3}>
              <Box className={classes.categoryBox} my={{ xs: 'xs', md: 'sm' }}>
                <IconShirt size={'6em'} />
                <Text fw={'500'} ml={'xs'}>
                  Aparallel
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={6} xs={6} sm={6} md={3}>
              <Box className={classes.categoryBox} my={{ xs: 'xs', md: 'sm' }}>
                <IconCar size={'6em'} />
                <Text fw={'500'} ml={'xs'}>
                  Automobile
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={6} xs={6} sm={6} md={3}>
              <Box className={classes.categoryBox} my={{ xs: 'xs', md: 'sm' }}>
                <IconArmchair size={'6em'} />
                <Text fw={'500'} ml={'xs'}>
                  Furniture
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
          <Group mt={'lg'} position="center">
            <Button
              onClick={() => setSideNavOpen(true)}
              leftIcon={<IconCategory />}
            >
              Browse categories
            </Button>
          </Group>
        </div>
      </div>
      <DefaultSideNav
        onClose={() => setSideNavOpen(false)}
        isOpen={isSideNavOpen}
      />
    </>
  );
};

export default HomepageSearchArea;
