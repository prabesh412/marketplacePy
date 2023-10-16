import { Box, Divider, Text } from '@mantine/core';
import { IconStars } from '@tabler/icons-react';

export function FeaturedSectionHead() {
  return (
    <>
      <Divider
        my="sm"
        labelPosition="center"
        label={
          <>
            <IconStars size={20} />
            <Box ml={5}>
              <Text fz="sm">Featured Section</Text>
            </Box>
          </>
        }
      />{' '}
    </>
  );
}
