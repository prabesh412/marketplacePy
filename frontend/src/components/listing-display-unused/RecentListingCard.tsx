import {
  Text,
  Card,
  Group,
  createStyles,
  Image,
  Avatar,
  rem,
} from '@mantine/core';

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

const MainProductCard = () => {
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
              Gadgets
            </Text>
            <Text className={classes.title} mb="xs">
              New Dell laptop for sale, one month vayo
            </Text>
            <Text tt="uppercase" c="dimmed" mb={'xs'} fw={700} size="sm">
              रू 50,000
            </Text>
            <Group>
              <Group spacing="xs" noWrap>
                <Avatar
                  size={20}
                  src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                />
                <Text size="xs">Prashant Uprety</Text>
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
export default MainProductCard;
