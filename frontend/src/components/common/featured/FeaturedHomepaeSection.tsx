import { Group, Text, Col, Grid, Pagination } from '@mantine/core';
import { IconAdjustments, IconFilter, IconSort09 } from '@tabler/icons-react';
import React from 'react';
import FeaturedCard from './FeaturedCard';

const FeaturedHomepaeSection = () => {
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
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
        <Col span={6} xs={4} sm={3} md={3} lg={3}>
          <FeaturedCard />
        </Col>
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
