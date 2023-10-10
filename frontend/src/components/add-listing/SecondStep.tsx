import { Box, Card, Group, Overlay, Text, Title } from '@mantine/core';
import React from 'react';
import ListingOverview from './ListingOverview';

const SecondStep = ({ form }: any) => {
  return (
    <>
      <Group position="center">
        <Title>Below is how your listing will look like</Title>
      </Group>
      <Box sx={{ position: 'relative', marginTop: '20px' }}>
        <Overlay opacity={0.1} color="#000" />
        <Card>
          <ListingOverview listing={form.values.firstStep} />
          {/* {listingCopy?.sub_category?.category && <ListingDetail listing={listingCopy} />} */}
        </Card>
      </Box>
    </>
  );
};

export default SecondStep;
