import { Col, Grid, rem } from '@mantine/core';
import { useListingsList } from '../../../../orval/listings/listings';
import { ListingsListOrderItem } from '../../../../orval/model';
import FeaturedCard from '../featured/FeaturedCard';

const FeaturedListings = () => {
  const { data: featuredListing } = useListingsList({
    is_featured: true,
    order: ListingsListOrderItem[
      '-created_at'
    ] as unknown as ListingsListOrderItem[],
  });
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <div style={{ marginTop: 10 }}>
        <Grid mt={rem(1)}>
          {featuredListing?.results?.map((listings, index) => (
            <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
              <FeaturedCard listing={listings} />
            </Col>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default FeaturedListings;
