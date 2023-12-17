import {
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  rem,
  Text,
  UnstyledButton,
  Menu,
  Tabs,
} from '@mantine/core';
import cx from 'clsx';

import { useDisclosure } from '@mantine/hooks';
import {
  IconCategory,
  IconClock,
  IconCrown,
  IconHelp,
  IconHome,
  IconLogin,
  IconRocket,
  IconStars,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useStore } from '@/zustand/store';

import {
  IconLogout,
  IconStar,
  IconMessage,
  IconSettings,
  IconChevronDown,
} from '@tabler/icons-react';
import DefaultSideNav from './DefaultSideNav';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[1],
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
  },
  {
    title: 'Saved posts',
    icon: <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
  },
  {
    title: 'Your comments',
    icon: (
      <IconMessage style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
  },
];
const userSetting = [
  {
    title: 'Account settings',
    icon: (
      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    ),
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
      <div className={classes.header}>
        <Container size="xl">
          <Group position="apart">
            <h3 style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
              Doshrodeal
            </h3>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
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
                    <Group spacing={7}>
                      <Avatar src="" alt={user.name} radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {user.name}
                      </Text>
                      <IconChevronDown
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <>
                    {userAction.map((actions) => (
                      <Menu.Item icon={actions.icon}>{actions.title}</Menu.Item>
                    ))}
                    <Menu.Label>Settings</Menu.Label>
                    {userSetting.map((setting) => (
                      <Menu.Item icon={setting.icon}>{setting.title}</Menu.Item>
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
                  </>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button.Group>
                {isHomepage ? (
                  <Button
                    variant="gradient"
                    leftIcon={<IconLogin />}
                    onClick={() => router.push('users/auth')}
                  >
                    Login
                  </Button>
                ) : null}
              </Button.Group>
            )}
          </Group>
        </Container>
        <Container size="xl">
          <Tabs variant="pills" radius="xs" defaultValue="Home">
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
              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconThumbUp size="0.8rem" />}
              >
                Recommended
              </Tabs.Tab>
              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconRocket size="0.8rem" />}
              >
                Boosting
              </Tabs.Tab>
              <Tabs.Tab
                className={classes.tab}
                value="settings"
                icon={<IconHelp size="0.8rem" />}
              >
                Help & support
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Container>
      </div>
      <DefaultSideNav
        onClose={() => setSideNavOpen(false)}
        isOpen={isSideNavOpen}
      />
    </>
  );
};

export default React.memo(Navbar);
