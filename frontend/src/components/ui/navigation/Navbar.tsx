import { useStore } from '@/zustand/store';
import {
  Avatar,
  Button,
  Flex,
  Group,
  Menu,
  Tabs,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCategory,
  IconChevronDown,
  IconCirclePlus,
  IconClock,
  IconCrown,
  IconHome,
  IconLogin,
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
  IconStars,
  IconUser,
} from '@tabler/icons-react';
import cx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Logo from '../.../../../../../public/favicon/logo1.png';
import GetInitials from '../common/GetInitials';
import DefaultSideNav from './DefaultSideNav';

interface HeaderSearchProps {
  isHomepage: boolean;
}

const Navbar = ({ isHomepage }: HeaderSearchProps) => {
  const { classes } = useStyles();

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  const router = useRouter();

  const getPathBasedActiveTab = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'Home',
      '/featured': 'Featured',
      '/popular': 'Popular',
      '/latest': 'Latest',
    };
    const activeTab =
      router.pathname in pathMap ? pathMap[router.pathname] : '/';
    return activeTab;
  };
  const user = useStore((state) => state.profile);
  const logout = useStore((state) => state.logout);

  const [activeTab, setActiveTab] = useState<string | null>(
    getPathBasedActiveTab(),
  );

  const theme = useMantineTheme();
  const handleLogout = () => {
    logout();
    window?.location?.reload();
  };
  const handlePillClick = (value: string) => {
    switch (value) {
      case 'Home':
        router.push('/');
        break;
      case 'Categories':
        setSideNavOpen(true);
        break;
      default:
        router.push(`/${value.toLowerCase()}`);
        break;
    }
  };
  const pills = [
    {
      value: 'Home',
      icon: <IconHome size="0.8rem" />,
    },
    {
      value: 'Categories',
      icon: <IconCategory size="0.8rem" />,
    },
    { value: 'Featured', icon: <IconStars size="0.8rem" /> },
    { value: 'Popular', icon: <IconCrown size="0.8rem" /> },
    { value: 'Latest', icon: <IconClock size="0.8rem" /> },
  ];

  const userAction = [
    {
      title: 'Profile',
      icon: (
        <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      ),
      url: '/users/profile',
    },
    {
      title: 'Saved posts',
      icon: (
        <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      ),
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
        <IconSettings
          style={{ width: rem(16), height: rem(16) }}
          stroke={1.5}
        />
      ),
      url: '/users/profile',
    },
  ];

  return (
    <>
      <div className={classes.header}>
        <Flex
          className={classes.mainFlex}
          justify={'space-evenly'}
          align={'center'}
          h={'100%'}
        >
          <Image
            src={Logo}
            alt="logo"
            height={40}
            onClick={() => router.push('/')}
            style={{
              paddingLeft: theme.spacing.xs,
              cursor: 'pointer',
            }}
          />
          <Tabs
            variant="pills"
            radius="xl"
            value={activeTab}
            pt={'xs'}
            onTabChange={setActiveTab}
          >
            <Tabs.List className={classes.tabsList}>
              {pills.map((pill) => (
                <Tabs.Tab
                  key={pill.value}
                  className={classes.tab}
                  value={pill.value}
                  icon={pill.icon}
                  onClick={() => handlePillClick(pill.value)}
                >
                  {pill.value}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
          <Group classNames={classes.burger} spacing={7}>
            <Button
              leftIcon={<IconCirclePlus />}
              radius={'xl'}
              className={classes.tabsList}
              onClick={() => router.push('/listing/listing-add')}
            >
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
                        {user.name ? GetInitials(user?.name) : ''}
                      </Avatar>
                      <IconChevronDown
                        style={{
                          width: rem(20),
                          height: rem(20),
                          color: 'gray',
                        }}
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
                    onClick={() => handleLogout()}
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
                  onClick={() => router.push('/users/auth')}
                >
                  Login
                </Button>
              )
            )}
          </Group>
        </Flex>
      </div>
      <DefaultSideNav
        onClose={() => {
          setSideNavOpen(false);
          setActiveTab('Home');
        }}
        isOpen={isSideNavOpen}
      />
    </>
  );
};

export default React.memo(Navbar);

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[9] : '#fff',
    height: 80,
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  mainFlex: {
    '@media (max-width: 900px)': {
      justifyContent: 'space-between',
      paddingRight: theme.spacing.xs,
    },
  },
  user: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.white,
    // padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.white,
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
    '@media (max-width: 900px)': {
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
