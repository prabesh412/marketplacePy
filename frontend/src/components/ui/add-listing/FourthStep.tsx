import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Overlay,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import ListingOverview from './ListingOverview';
import useAddListingForm from './UseAddListingForm';
import { IconCamera, IconPhotoSearch } from '@tabler/icons-react';

type FourthStepProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const FourthStep = ({ form }: FourthStepProps) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <>
      <Card className={classes.card} p={'xl'} radius={'md'}>
        <Card mb={'md'} withBorder shadow="sm" bg={'gray.1'}>
          <Group spacing={5}>
            <IconPhotoSearch color="gray" />
            <Text c={'dimmed'}>
              Buyers tend to show a higher interest in listings that looks good
              with all the details
            </Text>
          </Group>
        </Card>

        <ListingOverview form={form} />
      </Card>
    </>
  );
};

export default FourthStep;
const useStyles = createStyles((theme) => ({
  card: {
    [`@media (max-width: 576px)`]: {
      padding: theme.spacing.xs,
    },
  },
}));
