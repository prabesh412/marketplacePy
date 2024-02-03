import { Card, Group, Text, useMantineTheme } from '@mantine/core';
import { IconPhotoSearch } from '@tabler/icons-react';
import ImageDropper from './ImageDropper';
import useAddListingForm from './UseAddListingForm';

type SecondStepProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const ThirdStep = ({ form }: SecondStepProps) => {
  const theme = useMantineTheme();

  return (
    <>
      <Card radius={'md'}>
        <Card mb={'md'} withBorder shadow="sm" bg={'gray.1'}>
          <Group spacing={5}>
            <IconPhotoSearch color="gray" />
            <Text c={'dimmed'}>
              Buyers tend to show a higher interest in listings that has quality
              images of product
            </Text>
          </Group>
        </Card>
        <ImageDropper form={form} />
      </Card>
    </>
  );
};

export default ThirdStep;
