import React from 'react';
import { Group, Button, Box } from '@mantine/core';

const BottomAppBar: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.gray[0],
        padding: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
        zIndex: 10,
      })}
    >
      <Group position="center" spacing="md">
        {/* Add your buttons or icons here */}
        <Button>Home</Button>
        <Button>Search</Button>
        <Button>Profile</Button>
      </Group>
    </Box>
  );
};

export default BottomAppBar;
