import { Slider, Text, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },

  sideNav: {
    '@media (max-width: 1280px)': {
      display: 'none',
    },
    background: '#1A1B1E',
    flex: 0.7,
    alignItems: 'column',
    marginLeft: '-80px',
  },
  elementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '4px',
  },
  elementsButton: {
    border: 'none',
    button: {
      marginRight: theme.spacing.md,
    },
  },

  elementsFilter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '8px',
    marginTop: theme.spacing.xl,
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
    '@media (max-width: 1280px)': {
      display: 'none',
    },
  },

  bannerContainer: {
    position: 'sticky',
    top: 0,
    maxWidth: '300px',
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
}));
const FilterSection = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Text size={20} mb={'lg'} weight={'bold'} c={'dimmed'}>
        Refine Search
      </Text>
      <div className={classes.elementsGrid}>
        <span>
          New <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 2 <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 3 <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 4 <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 5 <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 6 <input type="checkbox" name="" id="" />{' '}
        </span>
        <span>
          Example 7 <input type="checkbox" name="" id="" />{' '}
        </span>
      </div>

      <div>
        <h3>Property Type</h3>
      </div>
      <div className={classes.elementsGrid}>
        <button>Example 1</button>
        <button>Example 1</button>
        <button>Example 1</button>
        <button>Example 1</button>
        <button>Example 1</button>
      </div>

      <div>
        <h3>Price</h3>
      </div>

      <div>
        <Slider
          color="blue"
          marks={[
            { value: 20, label: '20%' },
            { value: 50, label: '50%' },
            { value: 80, label: '80%' },
          ]}
        />
      </div>

      <div>
        <h3>Bedrooms</h3>
      </div>
      <div className={classes.elementsButton}>
        <button>Any</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5+</button>
      </div>

      <div>
        <h3>Bathrooms</h3>
      </div>
      <div className={classes.elementsButton}>
        <button>Any</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5+</button>
      </div>

      <div className={classes.elementsFilter}>
        <button>Save Filter</button>
        <button>Reset Filter</button>
      </div>
    </div>
  );
};

export default FilterSection;
