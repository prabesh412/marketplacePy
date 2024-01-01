import {
  Box,
  Card,
  Group,
  Overlay,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import ListingOverview from './ListingOverview';

const SecondStep = ({ form }: any) => {
  const theme = useMantineTheme();
  return (
    <>
      <Group position="center">
        <Title>Below is how your listing will look like</Title>
      </Group>
      <Box sx={{ position: 'relative', marginTop: '20px' }}>
        <Card bg={theme.colors.gray[1]}>
          <ListingOverview firstStepValues={form.values.firstStep} />
        </Card>
      </Box>
    </>
  );
};

export default SecondStep;
