import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Avatar,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconMaximize } from '@tabler/icons-react';

const FeaturedCard = () => {
  return (
    <Card shadow="sm" padding="md" radius="lg" withBorder>
      <Card.Section>
        <Image
          src="https://cdn02.hamrobazaar.com/User/Posts/2022/11/10/63211c00-f36d-484d-b898-dea488311b39.webp?x-image-process=image/resize,m_lfit,h_500,w_500"
          height={140}
          withPlaceholder
          alt="image"
        />
      </Card.Section>

      <Group position="apart" mt="xs" mb="xs">
        <Text w={'70%'} truncate="end" fw={500}>
          House for sale in Jhapa, Birtamode
        </Text>
        <Badge color="blue" variant="light">
          New
        </Badge>
      </Group>
      <Text mb={'sm'} c="dimmed" size="sm">
        House in sale of kathmandu{' '}
      </Text>
      <Group position="apart">
        <Group>
          <Badge color="blue" variant="light">
            House
          </Badge>
        </Group>
        <Text size="sm">Rs 50,000</Text>
      </Group>

      <Group mt={'sm'} position="apart">
        <Group>
          <Avatar
            size={25}
            radius={'lg'}
            src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
          />
          <Text w={'65%'} truncate="end" size="sm">
            Prashant Uprety
          </Text>
        </Group>
        <ActionIcon component="a">
          <IconMaximize />
        </ActionIcon>
      </Group>
    </Card>
  );
};
export default FeaturedCard;
