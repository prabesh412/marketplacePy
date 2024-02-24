import { Button, Card, Group, Text, Title, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';

const AddListingFreeBanner = () => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Card shadow="sm" className={classes.card} bg={'lime.8'} mt={'sm'}>
        <Group p={'xs'} position="apart">
          <div>
            <Title className={classes.title} order={1} c={'white'}>
              Sell your goods faster!
            </Title>
            <Text className={classes.description} pt={'xs'} c={'white'}>
              No matter if your goods are new or old, we've got you covered! Log
              in now to continue your journey with <strong>Doshrodeal</strong>
            </Text>
          </div>
          <Button
            onClick={() => router.push('/listing/listing-add')}
            radius={'xl'}
            size="md"
            bg={'white'}
            c={'black'}
          >
            Add a listing
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default AddListingFreeBanner;
const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    '@media (max-width: 576px)': {
      borderRadius: theme.radius.md,
      padding: theme.spacing.sm,
    },
  },
  title: {
    '@media (max-width: 576px)': {
      fontSize: 25,
    },
  },
  description: {
    '@media (max-width: 576px)': {
      fontSize: theme.fontSizes.sm,
    },
  },
}));
