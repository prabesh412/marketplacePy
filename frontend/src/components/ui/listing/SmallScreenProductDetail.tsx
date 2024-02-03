import { GetKeyFromValue } from '@/components/utils/GetKeyFromMap';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import { Carousel } from '@mantine/carousel';
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
import { Listings } from '../../../../orval/model';
import Comments from '../comments/Comments';

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
        {listing?.images?.map((listingImage, index) => (
          <Carousel.Slide>
            <Image
              src={listingImage?.image}
              withPlaceholder
              radius={'sm'}
              fit="fill"
              height={250}
            />
          </Carousel.Slide>
        ))}
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
          <Badge size="md" mt={'sm'}>
            {listing?.category?.name}
          </Badge>

          <Group mt={'sm'} mb={'md'} position="apart">
            <Group spacing={2}>
              <IconEye size={'1.5em'} color="grey" />
              <Text c="dimmed" size={'sm'}>
                {listing?.views} views
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
                {listing?.description}
              </Text>
              <Text fw={500} c={'dimmed'} mt={'sm'}>
                Specifications
              </Text>
              <Card mt={'sm'} bg={theme.colors.gray[1]} radius={'lg'}>
                <div>
                  <SimpleGrid cols={2} spacing="sm" p={rem(2)}>
                    <Group spacing={10}>
                      <IconCash size={'1.3em'} />
                      <Text fw={400} size={'sm'}>
                        Negotiable
                      </Text>
                    </Group>
                    <Text fw={300} size={'sm'}>
                      {listing?.is_negotiable ? 'Negotiable' : 'Not Negotiable'}
                    </Text>
                  </SimpleGrid>
                  <Divider p={rem(1)} />
                  <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
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
                  <Divider p={rem(1)} />
                  <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
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
                  <Divider p={rem(1)} />
                  <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
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
                  <Divider p={rem(1)} />

                  <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
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
                  <Divider p={rem(1)} />
                  <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
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
                          <SimpleGrid cols={2} spacing="sm" p={rem(4)}>
                            <Group spacing={10}>
                              <IconCheck size={'1.3em'} />
                              <Text truncate w={'60%'} fw={400} size={'sm'}>
                                {key as string}
                              </Text>
                            </Group>
                            <Text truncate fw={300} size={'sm'}>
                              {value as string}
                            </Text>
                          </SimpleGrid>
                          {index < array.length - 1 && <Divider p={rem(1)} />}
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

            <Tabs.Panel value="messages">
              <Comments listingSlug={listing?.slug} />
            </Tabs.Panel>

            {/* <Tabs.Panel value="settings">
              <></>
              <Divider mt={'sm'} />
              <Group mt={'sm'} position="apart">
                <Button leftIcon={<IconPhoto size={14} />} variant="default">
                  Gallery
                </Button>

                <Button rightIcon={<IconDownload size={14} />}>Download</Button>
              </Group>
            </Tabs.Panel> */}
          </Tabs>
        </div>
      </Card>
    </div>
  );
};
export default SmallScreenProductDetail;
