import { Avatar, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { User } from '../../../../orval/model';

type ProfileCardProps = {
  user: User;
};

const ProfileCard = ({ user }: ProfileCardProps) => {
  const theme = useMantineTheme();

  const stats = [
    { value: user?.number_of_listings, label: 'Total Listings' },
    { value: user?.number_of_comments, label: 'Total Comments' },
    { value: user?.number_of_bookmark, label: 'Total Bookmarks' },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      mt={'md'}
      padding="xl"
      sx={{ borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0` }}
    >
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar src={user?.image} size={80} radius={80} mx="auto" mt={-30} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        +977 {user?.username}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
    </Card>
  );
};
export default ProfileCard;
