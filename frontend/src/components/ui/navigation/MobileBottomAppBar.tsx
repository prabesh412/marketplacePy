import React from 'react';
import { Group, Card, useMantineTheme } from '@mantine/core';
import {
  IconBell,
  IconCategory,
  IconCirclePlus,
  IconHome,
  IconUser,
} from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';

const BottomAppBar: React.FC = () => {
  const theme = useMantineTheme();

  return (
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
        <IconHome size={'1.5em'} stroke={2} color={theme.colors.gray[9]} />
        <IconCategory size={'1.5em'} stroke={2} color={theme.colors.gray[9]} />
        <IconCirclePlus
          size={'1.5em'}
          stroke={2}
          color={theme.colors.gray[9]}
        />
        <IconBell size={'1.5em'} stroke={2} color={theme.colors.gray[9]} />
        <IconUser size={'1.5em'} stroke={2} color={theme.colors.gray[9]} />
      </Group>
    </Card>
  );
};

export default BottomAppBar;
