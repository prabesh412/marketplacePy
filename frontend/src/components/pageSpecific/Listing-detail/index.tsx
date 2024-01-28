import FeaturedCard from '@/components/ui/featured/FeaturedCard';
import LargeScreenProductDetail from '@/components/ui/listing/LargeScreenProductDetail';
import SmallScreenProductDetail from '@/components/ui/listing/SmallScreenProductDetail';
import {
  Badge,
  Button,
  Col,
  Divider,
  Grid,
  Group,
  createStyles,
  rem,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useListingsList } from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';

type ProductDetailProps = {
  listingDetail?: Listings;
};
const ListingDetailWrapper = ({ listingDetail }: ProductDetailProps) => {
  const { classes } = useStyles();
  const { data: userListings } = useListingsList({
    user__username: listingDetail?.user?.username,
  });
  const { data: similarListings } = useListingsList({
    category: listingDetail?.category?.id as number,
  });

  return (
    <>
      <div className={classes.smallScreen}>
        <SmallScreenProductDetail listing={listingDetail} />
      </div>
      <div className={classes.largeScreen}>
        <LargeScreenProductDetail listing={listingDetail} />
      </div>
      {userListings?.results?.length && userListings?.results?.length > 1 && (
        <Divider
          label={<Badge>More from {listingDetail?.user?.name}</Badge>}
          labelPosition="center"
          c={'dimmed'}
          mt={'sm'}
          size={1}
          orientation="horizontal"
        />
      )}
      <div
        style={{
          margin: 'auto',
          paddingLeft: 10,
          maxWidth: '1300px',
          width: '100%',
        }}
      >
        <Grid mb={rem(2)} mt={rem(1)}>
          {userListings &&
            userListings?.results
              ?.filter(
                (userListing) => userListing?.slug !== listingDetail?.slug,
              )
              ?.map((userListings, index) => (
                <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
                  <FeaturedCard listing={userListings} />
                </Col>
              ))}
        </Grid>
        {userListings?.next && (
          <Group mt={'sm'} pb={'sm'} position="center">
            <Button rightIcon={<IconArrowRight />}>View more</Button>
          </Group>
        )}
        {similarListings?.results?.length &&
          similarListings?.results?.length > 1 && (
            <Divider
              label={<Badge>Similar products</Badge>}
              labelPosition="center"
              c={'dimmed'}
              mt={'sm'}
              size={1}
              orientation="horizontal"
            />
          )}
        <Grid mb={rem(2)} mt={rem(1)}>
          {similarListings &&
            similarListings?.results
              ?.filter(
                (similarListings) =>
                  similarListings?.slug !== listingDetail?.slug,
              )
              .map((similarListings, index) => (
                <Col span={6} xs={4} sm={3} md={3} lg={3} key={index}>
                  <FeaturedCard listing={similarListings} />
                </Col>
              ))}
        </Grid>
        {similarListings?.next && (
          <Group mt={'sm'} pb={'sm'} position="center">
            <Button rightIcon={<IconArrowRight />}>View more</Button>
          </Group>
        )}
      </div>
    </>
  );
};
const useStyles = createStyles((theme) => ({
  smallScreen: {
    display: 'block',
    [`@media (min-width: 950px)`]: {
      display: 'none',
    },
  },
  largeScreen: {
    display: 'none',

    [`@media (min-width: 950px)`]: {
      display: 'block',
    },
  },
}));
export default ListingDetailWrapper;
