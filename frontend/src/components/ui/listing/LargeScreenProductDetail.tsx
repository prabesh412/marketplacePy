import { GetKeyFromValue } from '@/components/utils/GetKeyFromMap';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCalendar,
  IconCash,
  IconCheck,
  IconEye,
  IconHeart,
  IconMessage,
  IconPackage,
  IconShare,
  IconTag,
  IconThumbUp,
  IconTool,
  IconWriting,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Listings } from '../../../../orval/model';
import Comments from '../comments/Comments';
import GetInitials from '../common/GetInitials';

type LargeScreenProductDetailProps = {
  listing?: Listings;
};
const LargeScreenProductDetail = ({
  listing,
}: LargeScreenProductDetailProps) => {
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <Container maw={'1300px'} m={'auto'} fluid mt={'lg'}>
      <Group position="apart" style={{ alignItems: 'flex-start' }}>
        <ScrollArea
          style={{ flex: 5, flexDirection: 'row', minHeight: '100vh' }}
        >
          {listing?.images?.map((listingImage, index) => (
            <Card key={index} mb={'md'} radius={'md'} shadow="sm">
              <Image
                radius={'md'}
                src={listingImage?.image}
                withPlaceholder
                fit="cover"
                height={'500px'}
                width={'100%'}
                alt={`Product Image ${index + 1}`}
              />
            </Card>
          ))}
        </ScrollArea>
        <Card
          p={'xl'}
          radius={'md'}
          mb={'md'}
          sx={{
            position: 'sticky',
            flex: 5,
            top: 0,
            backgroundColor: 'white',
            minHeight: '100vh',
          }}
        >
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
                  {listing?.views}
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
              </Tabs.List>

              <Tabs.Panel value="Description">
                <Text c={'dimmed'} mt={'sm'}>
                  {listing?.description}
                </Text>
                <Text fw={500} c={'dimmed'} mt={'sm'}>
                  Specifications
                </Text>
                <Card mt={'sm'} bg={theme.colors.gray[1]} radius={'lg'}>
                  <div>
                    <SimpleGrid cols={3} spacing="sm" p={rem(2)}>
                      <Group spacing={10}>
                        <IconCash size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          Negotiable
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {listing?.is_negotiable
                          ? 'Negotiable'
                          : 'Not Negotiable'}
                      </Text>
                    </SimpleGrid>
                    <Divider p={rem(1)} color="gray.3" />
                    <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                      <Group spacing={10}>
                        <IconTool size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          Condition
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {GetKeyFromValue(
                          ListingOptionMap,
                          listing?.listing_condition,
                        )}
                      </Text>
                    </SimpleGrid>
                    <Divider p={rem(1)} color="gray.3" />
                    <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                      <Group spacing={10}>
                        <IconPackage size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          Delivery
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {listing?.status}
                      </Text>
                    </SimpleGrid>
                    <Divider p={rem(1)} color="gray.3" />
                    <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                      <Group spacing={10}>
                        <IconTag size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          Sale Status
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {listing?.sale_status}
                      </Text>
                    </SimpleGrid>
                    <Divider p={rem(1)} color="gray.3" />

                    <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                      <Group spacing={10}>
                        <IconThumbUp size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          SFW
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {listing?.is_sfw ? 'Yes' : 'No'}
                      </Text>
                    </SimpleGrid>
                    <Divider p={rem(1)} color="gray.3" />
                    <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                      <Group spacing={10}>
                        <IconCalendar size={'1.3em'} />
                        <Text fw={400} size={'sm'}>
                          Ad Posted
                        </Text>
                      </Group>
                      <Text fw={300} size={'sm'}>
                        {listing?.created_at.slice(0, 10)}
                      </Text>
                    </SimpleGrid>
                  </div>
                </Card>
                <Text fw={500} c={'dimmed'} mt={'sm'}>
                  Features
                </Text>
                <Card mt={'sm'} bg={'gray.1'} radius={'lg'}>
                  <div>
                    {Object.keys(listing?.listing_features || {}).length > 0 ? (
                      Object.entries(listing?.listing_features || {})
                        .filter(([key, value]) => key !== '' && value !== '')
                        .map(([key, value], index, array) => (
                          <div key={index}>
                            <SimpleGrid cols={3} spacing="sm" p={rem(4)}>
                              <Group spacing={10}>
                                <IconCheck size={'1.3em'} />
                                <Text fw={400} size={'sm'}>
                                  {key as string}
                                </Text>
                              </Group>
                              <Text fw={300} size={'sm'}>
                                {value as string}
                              </Text>
                            </SimpleGrid>
                            {index < array.length - 1 && (
                              <Divider p={rem(1)} color="gray.3" />
                            )}
                          </div>
                        ))
                    ) : (
                      <Text align="center" color={'dimmed'}>
                        Listing features not available
                      </Text>
                    )}
                  </div>
                </Card>
                <Divider mt={'md'} />
                <Group mt={'md'} spacing={5}>
                  <Avatar radius="xl" color="cyan">
                    {listing?.user?.name ? GetInitials(listing.user.name) : ''}
                  </Avatar>
                  <div>
                    <Text c={'dimmed'} size={'md'}>
                      {listing?.user?.name}
                    </Text>

                    <Text c={'dimmed'} size={'xs'}>
                      +977 {listing?.user?.username}
                    </Text>
                  </div>
                </Group>
                <Button
                  radius={'lg'}
                  mt={'sm'}
                  onClick={() =>
                    router.push(`/public-profile/${listing?.user?.username}`)
                  }
                >
                  Visit profile
                </Button>
              </Tabs.Panel>

              <Tabs.Panel value="messages">
                <ScrollArea h={'70vh'}>
                  <Box mt={10}>
                    <Comments listingSlug={listing?.slug} />
                  </Box>
                </ScrollArea>
              </Tabs.Panel>
            </Tabs>
          </div>
        </Card>
      </Group>
    </Container>
  );
};
export default LargeScreenProductDetail;
