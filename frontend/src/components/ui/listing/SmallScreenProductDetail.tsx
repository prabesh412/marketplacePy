import { Carousel } from '@mantine/carousel';
import { Listings } from '../../../../orval/model';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconDownload,
  IconEye,
  IconHeart,
  IconMessage,
  IconPhoto,
  IconShare,
  IconWriting,
} from '@tabler/icons-react';

type SmallScreenProductDetailProps = {
  listing?: Listings;
};
const SmallScreenProductDetail = ({
  listing,
}: SmallScreenProductDetailProps) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Carousel
        breakpoints={[
          { maxWidth: 450, slideSize: '100%', slideGap: 'md' },
          { minWidth: 450, slideSize: '50%', slideGap: 'md' },
        ]}
        mt={'xs'}
        withIndicators
        align={'start'}
        mih={250}
        height={250}
      >
        <Carousel.Slide>
          <Image
            src={
              'https://hamrobazaar.blr1.cdn.digitaloceanspaces.com/User/Posts/2024/01/03/3a23bef7-a17d-910a-d339-40223156683a.jpeg?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
            withPlaceholder
            radius={'sm'}
            fit="fill"
            height={250}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          {' '}
          <Image
            src={
              'https://hamrobazaar.blr1.cdn.digitaloceanspaces.com/User/Posts/2024/01/03/3a23bef7-a17d-910a-d339-40223156683a.jpeg?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
            withPlaceholder
            radius={'sm'}
            fit="fill"
            height={250}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          {' '}
          <Image
            src={
              'https://hamrobazaar.blr1.cdn.digitaloceanspaces.com/User/Posts/2024/01/03/3a23bef7-a17d-910a-d339-40223156683a.jpeg?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
            withPlaceholder
            radius={'sm'}
            fit="fill"
            height={250}
          />
        </Carousel.Slide>
      </Carousel>
      <Card p={'md'} radius={'sm'} mt={'xs'} mb={'md'}>
        <div>
          <Group mb={'md'} spacing={3}>
            <IconArrowLeft cursor={'pointer'} />
            <Text
              underline
              c="dimmed"
              size={'sm'}
              style={{ cursor: 'pointer' }}
            >
              Go back
            </Text>
          </Group>
          <Title order={2}>{listing?.title}</Title>
          <Text mt={'sm'} c="dimmed" fw={600} size={'xl'}>
            रू. {listing?.price}
          </Text>
          <Badge mt={'sm'}>{listing?.category?.name}</Badge>

          <Group mt={'sm'} mb={'md'} position="apart">
            <Group spacing={2}>
              <IconEye size={'1.5em'} color="grey" />
              <Text c="dimmed" size={'sm'}>
                1.2k views
              </Text>
            </Group>

            <Group>
              <Group spacing={3}>
                <IconShare />
                <Text size={'xs'}>Share</Text>
              </Group>
              <Group spacing={3}>
                <IconHeart />
                <Text size={'xs'}>Save</Text>
              </Group>
            </Group>
          </Group>
          <Tabs defaultValue="Description">
            <Tabs.List>
              <Tabs.Tab value="Description" icon={<IconWriting />}>
                Description
              </Tabs.Tab>
              <Tabs.Tab value="messages" icon={<IconMessage />}>
                Comments
              </Tabs.Tab>
              {/* <Tabs.Tab value="settings" icon={<IconMapPinFilled />}>
                Location
              </Tabs.Tab> */}
            </Tabs.List>

            <Tabs.Panel value="Description">
              <Text c={'dimmed'} mt={'sm'}>
                Its less used laptop brought from Korea without any scratches..
                FEEL FREE TO VISIT MY HOUSE, CHECK THE LAPTOP AND BUY🙂 (No
                exchange!!!) Direct Call: 9843297470 Location: Sorokhutte Chowk
                Brand: MacBook Model: Pro 2018(TouchBar Series) Processor: Intel
                i5 processor Ram: 16GB SSD: 256GB Screen size: 13" Battery
                Backup: 4-5Hrs Price: NRs 80,000/-
              </Text>
              <Text fw={500} c={'dimmed'} mt={'sm'}>
                Specifications
              </Text>
              <Card mt={'sm'} bg={theme.colors.gray[1]} radius={'md'}>
                <div>
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>AD ID</Text>
                    <Text size={'sm'}>{listing?.status}</Text>
                  </SimpleGrid>
                  <Divider />
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>Delivery</Text>
                    <Text size={'sm'}>{listing?.status}</Text>
                  </SimpleGrid>

                  <Divider />
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>Ad posted</Text>

                    <Text size={'sm'}>{listing?.created_at.slice(0, 10)}</Text>
                  </SimpleGrid>
                </div>
              </Card>
              <Text fw={500} c={'dimmed'} mt={'sm'}>
                Features
              </Text>
              <Card mt={'sm'} bg={theme.colors.gray[1]} radius={'md'}>
                <div>
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>AD ID</Text>

                    <Text size={'sm'}>{listing?.status}</Text>
                  </SimpleGrid>
                  <Divider />
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>Delivery</Text>

                    <Text size={'sm'}>{listing?.status}</Text>
                  </SimpleGrid>

                  <Divider />
                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>Ad posted</Text>
                    <Text size={'sm'}>{listing?.created_at.slice(0, 10)}</Text>
                  </SimpleGrid>
                  <Divider size={1} />

                  <SimpleGrid cols={2} spacing="sm" p="xs">
                    <Text size={'sm'}>Ad posted</Text>
                    <Text size={'sm'}>{listing?.created_at.slice(0, 10)}</Text>
                  </SimpleGrid>
                </div>
              </Card>
              <Divider mt={'md'} />
              <Group mt={'md'} spacing={5}>
                <Avatar size={'md'} radius={'xl'} src={listing?.user.image} />
                <div>
                  <Text c={'dimmed'} size={'md'}>
                    {listing?.user?.name}
                  </Text>

                  <Text c={'dimmed'} size={'xs'}>
                    +977 {listing?.user?.username}
                  </Text>
                </div>
              </Group>
              <Button radius={'lg'} mt={'sm'}>
                Visit profile
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

            <Tabs.Panel value="settings">
              <></>
              <Divider mt={'sm'} />
              <Group mt={'sm'} position="apart">
                <Button leftIcon={<IconPhoto size={14} />} variant="default">
                  Gallery
                </Button>

                <Button rightIcon={<IconDownload size={14} />}>Download</Button>
              </Group>
            </Tabs.Panel>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};
export default SmallScreenProductDetail;
