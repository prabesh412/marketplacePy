import { Group, Text, rem, Grid } from '@mantine/core';
import { IconAdjustments, IconFilter, IconSort09 } from '@tabler/icons-react';
import React from 'react';
import FeaturedCard from './FeaturedCard';
import { FeaturedCarouselCard } from './FeaturedCarouselCard';

const FeaturedHomepaeSection = () => {
  return (
    <div>
      <Group pt={'xl'} position="apart">
        <Text fw={500} size={'xl'}>
          Featured Listing
        </Text>
        <Group spacing={5}>
          <Text c="dimmed">Sort by</Text>
          <IconAdjustments color="grey" size="1.5em" />
        </Group>
      </Group>
      <Group mt={'lg'}>
        <Grid gutter="lg">
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4} lg={3}>
            <FeaturedCard />
          </Grid.Col>
        </Grid>
      </Group>
    </div>
  );
};

export default FeaturedHomepaeSection;
