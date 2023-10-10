// import cx from 'clsx';
// import { useState } from 'react';
// import {
//   Container,
//   Avatar,
//   UnstyledButton,
//   Group,
//   Text,
//   Menu,
//   Tabs,
//   Burger,
//   rem,
//   useMantineTheme,
// } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import {
//   IconLogout,
//   IconHeart,
//   IconStar,
//   IconMessage,
//   IconSettings,
//   IconPlayerPause,
//   IconTrash,
//   IconSwitchHorizontal,
//   IconChevronDown,
// } from '@tabler/icons-react';
// import classes from './HeaderTabs.module.css';
// import React from 'react';

// const user = {
//   name: 'Jane Spoonfighter',
//   email: 'janspoon@fighter.dev',
//   image:
//     'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
// };

// const tabs = [
//   'Home',
//   'Orders',
//   'Education',
//   'Community',
//   'Forums',
//   'Support',
//   'Account',
//   'Helpdesk',
// ];

// const Navbar = () => {
//   const theme = useMantineTheme();
//   const [opened, { toggle }] = useDisclosure(false);
//   const [userMenuOpened, setUserMenuOpened] = useState(false);

//   const items = tabs.map((tab) => (
//     <Tabs.Tab value={tab} key={tab}>
//       {tab}
//     </Tabs.Tab>
//   ));

//   return (
//     <div className={classes.header}>
//       <Container className={classes.mainSection} size="md">
//         <Group position="apart">
//           <Burger
//             opened={opened}
//             onClick={toggle}
//             className={classes.burger}
//             size="sm"
//           />

//           <Menu
//             width={260}
//             position="bottom-end"
//             transitionProps={{ transition: 'pop-top-right' }}
//             onClose={() => setUserMenuOpened(false)}
//             onOpen={() => setUserMenuOpened(true)}
//             withinPortal
//           >
//             <Menu.Target>
//               <UnstyledButton
//                 className={cx(classes.user, {
//                   [classes.userActive]: userMenuOpened,
//                 })}
//               >
//                 <Group spacing={7}>
//                   <Avatar
//                     src={user.image}
//                     alt={user.name}
//                     radius="xl"
//                     size={20}
//                   />
//                   <Text fw={500} size="sm" lh={1} mr={3}>
//                     {user.name}
//                   </Text>
//                   <IconChevronDown
//                     style={{ width: rem(12), height: rem(12) }}
//                     stroke={1.5}
//                   />
//                 </Group>
//               </UnstyledButton>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item
//               // leftSection={
//               //   <IconHeart
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     color={theme.colors.red[6]}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Liked posts
//               </Menu.Item>
//               <Menu.Item
//               // leftSection={
//               //   <IconStar
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     color={theme.colors.yellow[6]}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Saved posts
//               </Menu.Item>
//               <Menu.Item
//               // leftSection={
//               //   <IconMessage
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     color={theme.colors.blue[6]}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Your comments
//               </Menu.Item>

//               <Menu.Label>Settings</Menu.Label>
//               <Menu.Item
//               // leftSection={
//               //   <IconSettings
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Account settings
//               </Menu.Item>
//               <Menu.Item
//               // leftSection={
//               //   <IconSwitchHorizontal
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Change account
//               </Menu.Item>
//               <Menu.Item
//               // leftSection={
//               //   <IconLogout
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Logout
//               </Menu.Item>

//               <Menu.Divider />

//               <Menu.Label>Danger zone</Menu.Label>
//               <Menu.Item
//               // leftSection={
//               //   <IconPlayerPause
//               //     style={{ width: rem(16), height: rem(16) }}
//               //     stroke={1.5}
//               //   />
//               // }
//               >
//                 Pause subscription
//               </Menu.Item>
//               <Menu.Item
//                 color="red"
//                 // leftSection={
//                 //   <IconTrash
//                 //     style={{ width: rem(16), height: rem(16) }}
//                 //     stroke={1.5}
//                 //   />
//                 // }
//               >
//                 Delete account
//               </Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </Group>
//       </Container>
//       <Container size="md">
//         <Tabs
//           defaultValue="Home"
//           variant="outline"
//           classNames={{
//             root: classes.tabs,
//             tab: classes.tab,
//           }}
//         >
//           <Tabs.List>{items}</Tabs.List>
//         </Tabs>
//       </Container>
//     </div>
//   );
// };
// export default React.memo(Navbar);

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
  IconMenu,
  IconRocket,
  IconStars,
  IconThumbUp,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useStore } from '@/zustand/store';
import { usersMeRetrieve } from '../../../orval/users/users';
import { PATH_AUTH } from '@/routes';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
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

const tabsData = [
  { label: 'All', icon: <IconMenu size="0.8rem" />, value: 'messages' },
  { label: 'Home', icon: <IconHome size="0.8rem" />, value: 'Home' },
  { label: 'Featured', icon: <IconStars size="0.8rem" />, value: 'settings' },
  { label: 'Popular', icon: <IconCrown size="0.8rem" />, value: 'settings' },
  { label: 'Latest', icon: <IconClock size="0.8rem" />, value: 'settings' },
  {
    label: 'Recommended',
    icon: <IconThumbUp size="0.8rem" />,
    value: 'settings',
  },
  { label: 'Boosting', icon: <IconRocket size="0.8rem" />, value: 'settings' },
  {
    label: 'Help & support',
    icon: <IconHelp size="0.8rem" />,
    value: 'settings',
  },
];

const menuLabelsAndItems = [
  {
    label: 'Settings',
    items: [
      {
        label: 'Account settings',
        icon: <IconSettings />,
        value: 'account_settings',
      },
      {
        label: 'Change account',
        icon: <IconSwitchHorizontal />,
        value: 'change_account',
      },
      { label: 'Logout', icon: <IconLogout />, value: 'logout' },
    ],
  },
  {
    label: 'Danger zone',
    items: [
      {
        label: 'Pause subscription',
        icon: <IconPlayerPause />,
        value: 'pause_subscription',
      },
      { label: 'Delete account', icon: <IconTrash />, value: 'delete_account' },
    ],
  },
];

interface HeaderSearchProps {
  links: {
    link: string;
    iconArg: React.ReactElement;
  }[];
  showSideNav?: () => void;
}

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();
  const accessToken = useStore((state) => state.accessToken);
  const logout = useStore((state) => state.logout);

  return (
    <>
      <div className={classes.header}>
        <Container size="xl">
          <Group position="apart">
            <h3>Doshrobazar|np</h3>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
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
                    <Avatar src="" alt="Prashant" radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      Prashant
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {menuLabelsAndItems.map((menu) => (
                  <>
                    {menu.items.map((userActivity) => (
                      <Menu.Item icon={userActivity.icon}>
                        {userActivity.label}
                      </Menu.Item>
                    ))}
                    <Menu.Item
                      icon={
                        <IconStar
                          style={{ width: rem(16), height: rem(16) }}
                          // color={theme.colors.yellow[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Saved posts
                    </Menu.Item>
                    <Menu.Item
                      icon={
                        <IconMessage
                          style={{ width: rem(16), height: rem(16) }}
                          // color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Your comments
                    </Menu.Item>

                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                      icon={
                        <IconSettings
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Account settings
                    </Menu.Item>
                    <Menu.Item
                      icon={
                        <IconSwitchHorizontal
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Change account
                    </Menu.Item>
                    <Menu.Item
                      icon={
                        <IconLogout
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Logout
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      icon={
                        <IconPlayerPause
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Pause subscription
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      icon={
                        <IconTrash
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Delete account
                    </Menu.Item>
                  </>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container size="xl">
          <Tabs variant="pills" radius="xs" defaultValue="Home">
            <Tabs.List className={classes.tabsList}>
              <Tabs.Tab
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
    </>
  );
};

export default React.memo(Navbar);
