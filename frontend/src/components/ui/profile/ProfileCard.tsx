import { Avatar, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { User } from '../../../../orval/model';
import Banner from '../../../../public/carousel-banner.png';
import GetInitials from '../common/GetInitials';
import ProfileTab from './ProfileTab';
type ProfileCardProps = {
  user: User;
  isPublic?: boolean;
};

const ProfileCard = ({ user, isPublic }: ProfileCardProps) => {
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
    <>
      <Card
        withBorder
        mt={'md'}
        sx={{ borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0` }}
      >
        <Card.Section
          h={200}
          mx="auto"
          style={{
            backgroundImage: `url(${Banner.src})`,
          }}
        />
        <Avatar
          src={user?.image}
          size={80}
          radius={80}
          color="cyan"
          mx="auto"
          mt={-30}
        >
          {GetInitials(user?.name ? user?.name : '')}
        </Avatar>

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
      {!isPublic && <ProfileTab />}
    </>
  );
};
export default ProfileCard;
