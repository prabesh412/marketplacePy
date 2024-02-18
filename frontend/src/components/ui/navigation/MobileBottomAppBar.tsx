import {
  Button,
  Card,
  Group,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCategory,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DefaultSideNav from './DefaultSideNav';

interface RouteItem {
  name: string;
  route: string;
  icon: React.ReactElement;
}
const BottomAppBar: React.FC = () => {
  const [modalTrigger, setModalTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const theme = useMantineTheme();
  const router = useRouter();
  const route: RouteItem[] = [
    {
      name: 'Home',
      route: '/',
      icon: <IconHome size={24} stroke={1.5} />,
    },
    {
      name: 'Categories',
      route: '/categories',
      icon: <IconCategory size={24} stroke={1.5} />,
    },
    {
      name: 'Add',
      route: 'listing/listing-add',
      icon: <IconPlus size={24} stroke={1.5} />,
    },
    {
      name: 'Search',
      route: '/search',
      icon: <IconSearch size={24} stroke={1.5} />,
    },
    {
      name: 'Profile',
      route: '/users/profile',
      icon: <IconUser size={24} stroke={1.5} />,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleItemClick = (item: RouteItem) => {
    if (item.name === 'Search') {
      setModalTrigger(true);
    } else if (item.name === 'Categories') {
      setOpen(true);
    } else {
      router.push(item.route);
    }
  };
  return (
    <>
      <Card
        component="nav"
        padding="sm"
        shadow="xl"
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-around',
          position: 'fixed',
          bottom: -3,
          left: 0,
          right: 0,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
          borderTop: `1px dashed gray`,

          '@media (min-width: 900px)': {
            display: 'none',
          },
          zIndex: 100,
        })}
      >
        <Group position="apart" style={{ width: '100%' }}>
          {route.map((item) => (
            <div
              key={item.name}
              onClick={() => handleItemClick(item)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {React.cloneElement(item.icon, {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[0]
                    : theme.colors.gray[6],
              })}
              <Text c={'dimmed'} size="xs" style={{ marginTop: 2 }}>
                {item.name}
              </Text>
            </div>
          ))}
        </Group>
      </Card>
      {open && (
        <DefaultSideNav
          isOpen={open}
          onClose={() => setOpen((prev) => !prev)}
        />
      )}
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

export default BottomAppBar;
