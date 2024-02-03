import { Card, useMantineTheme } from '@mantine/core';
import HorizontalCard from '../listing/HorizontalCard';
import useAddListingForm from './UseAddListingForm';

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
