import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  getListingsRetrieveQueryKey,
  listingsRetrieve,
  useListingsRetrieve,
} from '../../../../orval/listings/listings';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Tabs,
  Text,
  Title,
  rem,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBook,
  IconCamera,
  IconCameraPlus,
  IconDeviceMobileMessage,
  IconEye,
  IconHeart,
  IconMapPinFilled,
  IconMessage,
  IconPhone,
  IconPhoto,
  IconShare,
} from '@tabler/icons-react';
import ListingDetailLayout from '@/components/layouts/ListingDetail';

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsRetrieveQueryKey(slug as string),
    () => listingsRetrieve(slug as string),
    {
      staleTime: Infinity,
    },
  );
  console.log(dehydrate(queryClient));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
ListingDetail.getLayout = (page: ReactElement) => (
  <ListingDetailLayout>{page}</ListingDetailLayout>
);

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: listingDetail } = useListingsRetrieve(slug as string);

  return (
    <div>
      <Group onClick={() => router.back()} mt={'md'} spacing={3}>
        <IconArrowLeft cursor={'pointer'} />
        <Text c="dimmed" size={'sm'}>
          Go back
        </Text>
      </Group>
      <Group position="apart" mt={'md'}>
        <Title order={2}>{listingDetail?.title}</Title>
        <Text c="dimmed" size={'lg'}>
          रू. {listingDetail?.price}
        </Text>
      </Group>
      <Badge>Home</Badge>
      <Group mt={'sm'} mb={'md'} position="apart">
        <Group>
          <Group spacing={2}>
            <IconEye color="grey" />
            <Text c="dimmed" size={'xs'}>
              1.2k views
            </Text>
          </Group>

          <Text underline c="dimmed" size={'xs'}>
            Posted on {listingDetail?.created_at.slice(0, 10)}
          </Text>
        </Group>
        <Group>
          <Group>
            <IconShare />
            <Text size={'xs'}>share</Text>
          </Group>
          <Group>
            <IconHeart />
            <Text size={'xs'}>save</Text>
          </Group>
        </Group>
      </Group>
      <Grid gutter="xs">
        <Grid.Col span={4}>
          <Image
            radius={'md'}
            src={
              'https://cdn02.hamrobazaar.com/User/Posts/2023/10/09/2f5b7daf-9d87-3ea8-f4ba-421a5f0c974f.webp?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
          />
        </Grid.Col>
        <Grid.Col span={4}>
          {' '}
          <Image
            radius={'md'}
            src={
              'https://cdn02.hamrobazaar.com/User/Posts/2023/10/09/2f5b7daf-9d87-3ea8-f4ba-421a5f0c974f.webp?x-image-process=image/resize,m_lfit,h_500,w_500'
            }
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <div style={{ position: 'relative' }}>
            <Image
              src={
                'https://cdn02.hamrobazaar.com/User/Posts/2023/10/09/2f5b7daf-9d87-3ea8-f4ba-421a5f0c974f.webp?x-image-process=image/resize,m_lfit,h_500,w_500'
              }
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActionIcon
                size={40}
                radius="xl"
                color="primary"
                variant="filled"
              >
                <IconCameraPlus />
              </ActionIcon>
            </div>
          </div>
        </Grid.Col>
      </Grid>
      <Group spacing={2} mt={'md'}>
        <IconMapPinFilled color="grey" />
        <Text underline c={'dimmed'} size={'sm'}>
          Koteshowr, near kwality banquet
        </Text>
      </Group>
      <Title order={3} mt={'xl'}>
        About this Listing
      </Title>
      <div style={{ marginTop: rem(10) }}>
        <Tabs defaultValue="Description">
          <Tabs.List>
            <Tabs.Tab value="Description" icon={<IconBook />}>
              Description
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconMessage />}>
              Comments
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconPhone />}>
              Contact
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Description">
            <Text mt={'sm'}>{listingDetail?.description}</Text>
          </Tabs.Panel>

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="settings">
            <Group spacing={3}>
              <Avatar
                size={'md'}
                radius={'xl'}
                src={listingDetail?.user.image}
              />
              <div>
                <Text c={'dimmed'} underline size={'md'}>
                  {listingDetail?.user?.username}
                </Text>
                <Text c={'dimmed'} size={'xs'}>
                  25+ ads
                </Text>
              </div>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
