import { Card, Skeleton, createStyles } from '@mantine/core';

interface HorizontalCardSkeletonProps {
  repeat: number;
}
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    paddingBottom: 10,
  },
  imageSkeleton: {
    width: 185,
    height: 180,
    marginRight: theme.spacing.xs,
    '@media (max-width: 576px)': {
      width: 130,
      height: 135,
    },
  },

  textSkeleton: {
    flex: 1,
  },
}));

const HorizontalCardSkeleton = ({ repeat }: HorizontalCardSkeletonProps) => {
  const { classes } = useStyles();
  let repetition = Array.from({ length: repeat }, (_, index) => index);
  return (
    <div>
      {repetition?.map((_, index) => (
        <Card key={index} className={classes.card} shadow="sm">
          <Skeleton className={classes.imageSkeleton} radius="md" />
          <div className={classes.textSkeleton}>
            <Skeleton height={20} mt={5} mb={5} radius="xl" />
            <Skeleton height={15} radius="xl" />
            <Skeleton height={15} mt={6} radius="xl" />
            <Skeleton height={15} mt={6} width="70%" radius="xl" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HorizontalCardSkeleton;
