import { Divider, Image, createStyles, rem } from '@mantine/core';
import React from 'react';
import RecentListingCard from './RecentListingCard';
import DefaultSideNav from '../common/navigation/DefaultSideNav';
import AdvertisementImage from '../miscellanous/AdvertisementImage';
import { useListingsList } from '../../../orval/listings/listings';

const useStyles = createStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },

  sideNav: {
    position: 'sticky',
    top: 0,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  mainContent: {
    marginLeft: theme.spacing.md,
    flex: 2,
    marginRight: theme.spacing.md,
    '@media (max-width: 576px)': {
      marginRight: 0,
      marginLeft: 0,
    },
  },

  divider: {
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  bannerContainer: {
    position: 'sticky',
    top: 0,
    maxWidth: '300px',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
}));

const RecentListingDisplayParent = () => {
  const { data: listing } = useListingsList();
  const { classes } = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.sideNav}>
        <DefaultSideNav />
      </div>
      <div className={classes.mainContent}>
        {listing?.results?.map((product) => (
          <div>
            <RecentListingCard />
          </div>
        ))}
      </div>
      <Divider className={classes.divider} orientation="vertical" />
      <div className={classes.bannerContainer}>
        <AdvertisementImage
          imageUrl={
            'https://cdn02.hamrobazaar.com/feature_ads/suzuki/new_designs/250x250.gif'
          }
        />
      </div>
    </div>
  );
};

export default RecentListingDisplayParent;
