import { Group, Text, Col, Grid, Pagination } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import React from 'react';
import FeaturedCard from './FeaturedCard';
import { useListingsList } from '../../../../orval/listings/listings';
const FeaturedHomepaeSection = () => {
  const { data: listing } = useListingsList();
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Group pt={'xl'} position="apart">
        <Text fw={500} size={'xl'}>
          Featured Listing
        </Text>
        <Group spacing={5}>
          <Text c="dimmed">Sort by</Text>
          <IconAdjustments color="grey" size="1.5em" />
        </Group>
      </Group>
      <Grid mb={'xl'} mt={'sm'}>
        {listing?.results?.map((listings) => (
          <Col span={6} xs={4} sm={3} md={3} lg={3}>
            <FeaturedCard listing={listings} />
          </Col>
        ))}
      </Grid>
      <Pagination
        mb={'xl'}
        total={15}
        position="center"
        styles={(theme) => ({
          control: {
            '&[data-active]': {
              backgroundImage: theme.fn.gradient({
                from: 'primary',
                to: 'primary',
              }),
              border: 0,
            },
          },
        })}
      />
    </div>
  );
};

export default FeaturedHomepaeSection;
