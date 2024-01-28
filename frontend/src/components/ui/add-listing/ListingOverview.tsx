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
  Badge,
} from '@mantine/core';
import { PlainDivider } from '../common/PlainDivider';
import HorizontalCard from '../listing/HorizontalCard';
import useAddListingForm from './UseAddListingForm';
import { IconCamera } from '@tabler/icons-react';

interface ListingDetailProps {
  form: ReturnType<typeof useAddListingForm>;
}

const ListingOverview = ({ form }: ListingDetailProps) => {
  const theme = useMantineTheme();
  return (
    <Card
      bg={theme.colors.gray[1]}
      radius={'md'}
      sx={{ padding: '2px', border: '1px dashed gray' }}
    >
      <HorizontalCard
        overViewImage={form.values?.thirdStep?.images}
        overViewDetails={form?.values?.firstStep}
        isOverview={true}
      />
    </Card>
  );
};

export default ListingOverview;
