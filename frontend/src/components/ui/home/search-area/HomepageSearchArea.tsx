import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
  Group,
  createStyles,
  Card,
  Title,
  Button,
  Text,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCategory,
  IconFilter,
  IconSearch,
  IconSettings,
  IconX,
} from '@tabler/icons-react';
import DefaultSideNav from '../../navigation/DefaultSideNav';
import { useRouter } from 'next/router';
import SearchCheckBox from './SearchCheckBox';

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: '1200px',
    margin: 'auto',
    // borderRadius: theme.radius.lg,
    width: '100%',
    '@media (max-width: 575px)': {
      borderRadius: theme.radius.md,
      marginBottom: theme.radius.md,
      marginTop: theme.spacing.sm,
    },
    '@media (max-width:1200px)': {
      width: '100%',
    },
  },
  description: {
    '@media (max-width: 575px)': {
      fontSize: theme.fontSizes.xs,
    },
  },
  textInput: {
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    width: '100%',
    border: '2px solid gray',
    borderRadius: theme.radius.xl,
    '@media (max-width: 575px)': {
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
      width: '100%',
      border: 'none',
    },
  },
  title: {
    fontSize: rem(45),
    fontWeight: 'bold',
    '@media (max-width: 575px)': {
      fontSize: rem(25),

      marginTop: theme.spacing.xs,
    },
  },
  categoryBox: {
    // marginLeft: theme.spacing.sm,
    // marginRight: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.dark[5],
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
  actionIcon: {
    '@media (max-width: 576px)': {
      width: '10px',
      height: '10px',
    },
  },
  homepageSearchArea: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    marginTop: theme.spacing.sm,
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
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  return (
    <>
      <Card
        maw={'1200px'}
        m={'auto'}
        className={classes.card}
        mt={'xl'}
        radius={'md'}
      >
        <div className={classes.homepageSearchArea}>
          <div
            style={{
              flex: 8,
            }}
          >
            <Group position="center">
              {/* <div className={classes.title}>
                <Title align="center" className={classes.title}>
                  Welcome to DoshroDeal.
                </Title>
                <Title c={'dimmed'} fw={'lighter'} order={4} align="center">
                  Start your journey of finding second deals.
                </Title>
              </div> */}

              <TextInput
                className={classes.textInput}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                size="lg"
                radius={'xl'}
                icon={<IconSearch />}
                placeholder="Search for what you are looking for and we will handle the rest."
                rightSectionWidth={50}
                rightSection={
                  <ActionIcon
                    size={40}
                    radius="xl"
                    className={classes.actionIcon}
                    mr={'sm'}
                    color={theme.primaryColor}
                    variant="filled"
                    onClick={() => {
                      if (searchValue) {
                        router.push(`/search?title__icontains=${searchValue}`);
                      }
                    }}
                  >
                    <IconArrowRight
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                }
                {...props}
              />

              <SearchCheckBox />
              <Group mb={'sm'}>
                <Button rightIcon={<IconCategory />}>Browse Categories</Button>
              </Group>
            </Group>
          </div>
        </div>
        <DefaultSideNav
          onClose={() => setSideNavOpen(false)}
          isOpen={isSideNavOpen}
        />
      </Card>
    </>
  );
};

export default HomepageSearchArea;
