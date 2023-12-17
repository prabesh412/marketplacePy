import { Badge, createStyles, rem } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

const AddListingFloatButton = () => {
  const router = useRouter();

  const useStyles = createStyles((theme) => ({
    button: {
      position: 'fixed',
      bottom: rem(20),
      right: rem(0),
      paddingTop: rem(23),
      paddingBottom: rem(16),
      paddingLeft: rem(8),
      paddingRight: rem(8),
      zIndex: 9999,
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out', // Add a smooth transition
      ':hover': {
        transform: 'scale(1.1)', // Scale up on hover
      },
    },
    text: {
      paddingBottom: '5px',
    },
  }));

  const { classes } = useStyles();

  const handleButtonClick = () => {
    router.push('/listing/listing-add');
  };

  return (
    <>
      <Badge
        radius="sm"
        leftSection={<IconCirclePlus />}
        className={classes.button}
        onClick={handleButtonClick}
      >
        <h3 className={classes.text}>Add listing for free</h3>
      </Badge>
    </>
  );
};

export default AddListingFloatButton;
