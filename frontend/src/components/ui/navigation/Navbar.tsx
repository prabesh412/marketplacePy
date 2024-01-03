import {
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  rem,
  UnstyledButton,
  Menu,
  Tabs,
  Flex,
} from '@mantine/core';
import cx from 'clsx';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCategory,
  IconClock,
  IconCrown,
  IconHome,
  IconLogin,
  IconPlus,
  IconStars,
  IconUser,
  IconLogout,
  IconMessage,
  IconSettings,
  IconChevronDown,
  IconStar,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useStore } from '@/zustand/store';
import DefaultSideNav from './DefaultSideNav';
import Logo from '../../../../public/favicon/logo.png';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[9] : '#fff',
    height: 80,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },

  user: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.white,
    },

    '@media (max-width: 575px)': {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  tabsList: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tab: {
    fontWeight: 500,
    backgroundColor: 'transparent',
    position: 'relative',
    bottom: -1,
    marginBottom: rem(7),

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    '&[data-active="true"]': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.primary,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
      borderBottomColor: 'transparent',
    },
  },
}));

const userAction = [
  {
    title: 'Profile',
    icon: <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
    url: '/users/profile',
  },
  {
    title: 'Saved posts',
    icon: <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
    url: '/users/profile',
  },
  {
    title: 'Your comments',
    icon: (
      <IconMessage style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    url: '/users/profile',
  },
];

const userSetting = [
  {
    title: 'Account settings',
    icon: (
      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
    url: '/users/profile',
  },
];

interface HeaderSearchProps {
  isHomepage: boolean;
}

const Navbar = ({ isHomepage }: HeaderSearchProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const router = useRouter();
  const user = useStore((state) => state.profile);
  const logout = useStore((state) => state.logout);

  return (
    <>
      <Container className={classes.header} fluid>
        <Flex justify={'space-around'} align={'center'} h={'100%'}>
          <Group pb={'xs'} spacing={4}>
            <Image src={Logo} alt="as" height={120} width={170} />
          </Group>
          <Tabs variant="pills" radius="xl" defaultValue="Home" pt={'xs'}>
            <Tabs.List className={classes.tabsList}>
              <Tabs.Tab
                onClick={() => setSideNavOpen(true)}
                value="messages"
                className={classes.tab}
                icon={<IconCategory size="0.8rem" />}
              >
                Category
              </Tabs.Tab>
              <Tabs.Tab
                className={classes.tab}
                value="Home"
                icon={<IconHome size="0.8rem" />}
              >
                Home
              </Tabs.Tab>

              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconStars size="0.8rem" />}
              >
                Featured
              </Tabs.Tab>
              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconCrown size="0.8rem" />}
              >
                Popular
              </Tabs.Tab>
              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconClock size="0.8rem" />}
              >
                Latest
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Burger
            opened={opened}
            onClick={() => toggle()}
            className={classes.burger}
            size="sm"
          />
          <Group spacing={7}>
            <Button leftIcon={<IconPlus />} variant="light" radius={'xl'}>
              Create
            </Button>
            {user ? (
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={4}>
                      <Avatar radius="xl" color="cyan">
                        {user.name
                          ? user.name.substring(0, 2).toUpperCase()
                          : ''}
                      </Avatar>
                      <IconChevronDown
                        style={{ width: rem(15), height: rem(15) }}
                        stroke={2}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {userAction.map((action) => (
                    <Menu.Item
                      key={action.title}
                      onClick={() => router.push(action.url)}
                      icon={action.icon}
                    >
                      {action.title}
                    </Menu.Item>
                  ))}
                  <Menu.Label>Settings</Menu.Label>
                  {userSetting.map((setting) => (
                    <Menu.Item key={setting.title} icon={setting.icon}>
                      {setting.title}
                    </Menu.Item>
                  ))}
                  <Menu.Item
                    onClick={logout}
                    icon={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              isHomepage && (
                <Button
                  leftIcon={<IconLogin />}
                  variant="light"
                  radius={'xl'}
                  onClick={() => router.push('users/auth')}
                >
                  Login
                </Button>
              )
            )}
          </Group>
        </Flex>
      </Container>
      <DefaultSideNav
        onClose={() => setSideNavOpen(false)}
        isOpen={isSideNavOpen}
      />
    </>
  );
};

export default React.memo(Navbar);
