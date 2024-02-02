import { Card, Group, useMantineTheme } from '@mantine/core';
import {
  IconBell,
  IconCategory,
  IconCirclePlus,
  IconHome,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DefaultSideNav from './DefaultSideNav';

const BottomAppBar: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        component="nav"
        padding={'md'}
        shadow="xl"
        sx={(theme) => ({
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(250 , 250 , 250 , 0.6)',
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          backdropFilter: 'blur(10px)',
          borderTopLeftRadius: theme.radius.lg,
          borderTopRightRadius: theme.radius.lg,
          '@media (min-width: 576px)': {
            display: 'none',
          },
          zIndex: 100,
        })}
      >
        <Group grow>
          <IconHome
            onClick={() => router.push('/')}
            size={'1.5em'}
            stroke={2}
            color={theme.colors.gray[9]}
          />
          <IconCategory
            size={'1.5em'}
            stroke={2}
            color={theme.colors.gray[9]}
            onClick={() => setOpen((prev) => !prev)}
          />
          <IconCirclePlus
            size={'1.5em'}
            stroke={2}
            color={theme.colors.gray[9]}
            onClick={() => router.push('/listing/listing-add')}
          />
          <IconBell
            onClick={() => router.push('/users/profile')}
            size={'1.5em'}
            stroke={2}
            color={theme.colors.gray[9]}
          />
          <IconUser
            onClick={() => router.push('/users/profile')}
            size={'1.5em'}
            stroke={2}
            color={theme.colors.gray[9]}
          />
        </Group>
      </Card>
      {open && (
        <DefaultSideNav
          isOpen={open}
          onClose={() => setOpen((prev) => !prev)}
        />
      )}
    </>
  );
};

export default BottomAppBar;
