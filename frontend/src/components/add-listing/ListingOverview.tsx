import React from 'react';
import { Card, Col, Grid, Group, Stack, Title, Text } from '@mantine/core';
import { PlainDivider } from '../common/PlainDivider';
import { FeaturedCarouselCard } from '../common/FeaturedCarouselCard';

interface ListingDetailProps {
  listing: any;
}

const ListingOverview = ({ listing }: ListingDetailProps) => {
  return (
    <Card sx={{ padding: '2px' }}>
      <Stack sx={{ marginTop: '20px' }}>
        <Text>Title:</Text>
        <Group position="apart">
          <Title order={2}>{listing.title}</Title>
          {/* <BookmarkButton listingData={listing} id={listing?.id} /> */}
        </Group>
        {/* {listing?.listing_images && (
          <ImageBox images={listing.listing_images} />
        )} */}

        <PlainDivider />

        <Grid grow>
          <Col span={12} sm={12} md={8} xs={8} xl={8}>
            <Text
              sx={(theme) => ({
                fontSize: 15,
                paddingBottom: '10px',
              })}
            >
              Description:
            </Text>
            <Text
              sx={(theme) => ({
                fontWeight: 600,
                fontSize: 16,
                [theme.fn.smallerThan('md')]: { fontSize: 20 },
              })}
            >
              {listing?.description}
            </Text>
            <PlainDivider />
            <Text
              sx={(theme) => ({
                fontSize: 15,
                paddingBottom: '10px',
              })}
            >
              Location:
            </Text>
            <Text
              sx={(theme) => ({
                fontWeight: 600,
                fontSize: 16,
                [theme.fn.smallerThan('md')]: { fontSize: 20 },
              })}
            >
              {listing?.location}
            </Text>
            <PlainDivider />
          </Col>

          <Col span={12} sm={12} md={8} xs={8} xl={8}>
            <Text mb={'md'}>Listing card:</Text>
            <FeaturedCarouselCard
              title={listing.title}
              image={[
                'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
              ]}
              condition={'New'}
              price={listing.price}
            />
          </Col>
        </Grid>
        <PlainDivider />
      </Stack>
    </Card>
  );
};

export default ListingOverview;
