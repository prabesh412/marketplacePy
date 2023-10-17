import {
  Text,
  Card,
  Group,
  createStyles,
  Image,
  Avatar,
  rem,
} from '@mantine/core';
import { User } from '../../../../orval/model';

const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    height: rem(150),
    paddingRight: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    '@media (max-width: 576px)': {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  title: {
    fontWeight: 600,
    fontSize: theme.fontSizes.lg,
    lineHeight: 1,

    '@media (max-width: 576px)': {
      fontWeight: 400,
      fontSize: theme.fontSizes.md,
    },
  },
  body: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
}));
interface MainProductCardProps {
  title: string;
  image: string;
  price: string;
  user: User;
}
const SearchProductCard = ({
  title,
  image,
  price,
  user,
}: MainProductCardProps) => {
  const { classes } = useStyles();

  return (
    <div>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          <div>
            <Image
              src="https://cdn02.hamrobazaar.com/User/Posts/2023/09/30/b4f67870-673f-11b6-9729-ce738be7881c.webp?x-image-process=image/resize,m_lfit,h_500,w_500"
              height={120}
              p={'sm'}
              radius={'md'}
              width={110}
            />
          </div>
          <div className={classes.body}>
            <Text tt="uppercase" c="dimmed" fw={700} size="xs" mb={rem(5)}>
              Like new
            </Text>
            <Text w={'90%'} truncate className={classes.title} mb="xs">
              {title}
            </Text>
            <Text tt="uppercase" c="dimmed" mb={'xs'} fw={700} size="sm">
              रू. {price}
            </Text>
            <Group>
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={user.image} />
                <Text size="xs">{user.name}</Text>
              </Group>
              <Group>
                <Text size="xs" c="dimmed">
                  • 2m ago
                </Text>
              </Group>
            </Group>
          </div>
        </Group>
      </Card>
    </div>
  );
};
export default SearchProductCard;
