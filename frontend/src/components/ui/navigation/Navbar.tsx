import { useStore } from '@/zustand/store';
import {
  Avatar,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  Modal,
  Tabs,
  Text,
  TextInput,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
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
  IconSearch,
  IconSettings,
  IconStar,
  IconStars,
  IconUser,
} from '@tabler/icons-react';
import cx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Logo from '../../../../public/favicon/logo.png';
import GetInitials from '../common/GetInitials';
import DefaultSideNav from './DefaultSideNav';

interface HeaderSearchProps {
  isHomepage: boolean;
}

const Navbar = ({ isHomepage }: HeaderSearchProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();

  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const router = useRouter();
  const user = useStore((state) => state.profile);
  const logout = useStore((state) => state.logout);
  const defaultTab = router.pathname === '/' ? 'Home' : '';
  const [activeTab, setActiveTab] = useState<string | null>(defaultTab);
  const [modalTrigger, setModalTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const theme = useMantineTheme();

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
      <Container className={classes.header} fluid>
        <Flex
          className={classes.mainFlex}
          justify={'space-evenly'}
          align={'center'}
          h={'100%'}
        >
          <Image
            src={Logo}
            alt="logo"
            height={250}
            width={250}
            onClick={() => router.push('/')}
            style={{ paddingBottom: theme.spacing.xs }}
          />

          <Tabs
            variant="pills"
            radius="xl"
            value={activeTab}
            pt={'xs'}
            onTabChange={setActiveTab}
          >
            <Tabs.List className={classes.tabsList}>
              <Tabs.Tab
                className={classes.tab}
                value="Home"
                icon={<IconHome size="0.8rem" />}
                onClick={() => {
                  if (router.pathname !== '/') {
                    router.push('/');
                  }
                  setSideNavOpen(false);
                }}
              >
                Home
              </Tabs.Tab>
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
          <IconSearch
            onClick={() => setModalTrigger((prev) => !prev)}
            className={classes.burger}
            size="2em"
            stroke={'2'}
          />

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
        onClose={() => {
          setSideNavOpen(false);
          setActiveTab('Home');
        }}
        isOpen={isSideNavOpen}
      />
      {modalTrigger && (
        <Modal
          opened={modalTrigger}
          onClose={() => setModalTrigger((prev) => !prev)}
          centered
          radius={'lg'}
          transitionProps={{ transition: 'fade', duration: 300 }}
          overlayProps={{
            color: theme.colors.gray[7],
            opacity: 0.55,
            blur: 3,
          }}
        >
          <TextInput
            radius={'xl'}
            size="lg"
            placeholder="Search here"
            value={searchValue}
            variant="unstyled"
            sx={{ borderBottom: `1px solid ${theme.colors.gray[4]}` }}
            onChange={(event) => setSearchValue(event.target.value)}
            icon={<IconSearch />}
          />

          <Group mt={'sm'} position="right">
            <Text
              onClick={() => setModalTrigger((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Cancel
            </Text>
            <Button
              radius={'lg'}
              onClick={() => {
                if (searchValue) {
                  router.push(`/search?title__icontains=${searchValue}`);
                }
              }}
            >
              Confirm
            </Button>
          </Group>
        </Modal>
      )}
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
    '@media (max-width: 890px)': {
      justifyContent: 'space-between',
      paddingRight: theme.spacing.xs,
    },
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
