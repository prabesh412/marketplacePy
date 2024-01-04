import React from 'react';
import {
  Card,
  Col,
  Grid,
  Group,
  Stack,
  Title,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PlainDivider } from '../common/PlainDivider';
import HorizontalCard from '../listing/HorizontalCard';

interface ListingDetailProps {
  firstStepValues: any;
}

const ListingOverview = ({ firstStepValues }: ListingDetailProps) => {
  const theme = useMantineTheme();
  return (
    <Card bg={theme.colors.gray[1]} sx={{ padding: '2px' }}>
      <Stack sx={{ marginTop: '20px' }}>
        <Text>Title:</Text>
        <Group position="apart">
          <Title order={2}>{firstStepValues.title}</Title>
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
              {firstStepValues?.description}
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
              {firstStepValues?.location}
            </Text>
            <PlainDivider />
          </Col>
        </Grid>
        <Text>Listing card:</Text>

        <HorizontalCard
          overViewImage={firstStepValues?.images}
          listing={firstStepValues}
        />

        <PlainDivider />
      </Stack>
    </Card>
  );
};

export default ListingOverview;
