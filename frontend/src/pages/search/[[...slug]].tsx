import SeoElement from '@/components/global/SeoElement';
import SearchLayout from '@/components/layouts/SearchLayout';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import { getDefaultStore } from '@/components/utils/PageDefaults';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Modal,
  Pagination,
  Select,
  Text,
  TextInput,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconAdjustments,
  IconArrowBarBoth,
  IconArrowRight,
  IconCalendar,
  IconCash,
  IconChevronDown,
  IconCurrencyRupeeNepalese,
  IconSortAscending2,
  IconStar,
  IconThumbUp,
  IconTool,
} from '@tabler/icons-react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import {
  getListingsListQueryKey,
  listingsList,
  useListingsList,
} from '../../../orval/listings/listings';
import { Listings } from '../../../orval/model/listings';

const useStyles = createStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  sort: {
    backgroundColor: 'white',
    padding: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.md,
    '@media (max-width: 575px)': {
      padding: theme.spacing.xs,
    },
  },
  textInput: {
    width: '100%',
    border: '1px solid gray',
    borderRadius: theme.radius.xl,
    '@media (max-width: 575px)': {
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
      width: '100%',
      border: 'none',
    },
  },
  actionIcon: {
    '@media (max-width: 576px)': {
      width: '10px',
      height: '10px',
    },
  },
  scrollableGroup: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '@media (max-width: 575px)': {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      overflow: '-moz-scrollbars-none',
    },
  },

  selectInput: {
    minWidth: rem(150),
  },
}));

//Sort params interface
interface SortOptions {
  listing_condition?: string;
  created_at__gt?: Date;
  location?: string;
  is_negotiable?: string;
  category?: string;
  viewsCount?: string;
  price__gt?: string;
  price__lt?: string;
  is_sfw?: string;
  is_featured?: string;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const slug = ctx.query;
  if (
    !slug ||
    Object.keys(slug).length === 0 ||
    Object.values(slug).length === 0
  ) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const queryClient = new QueryClient();
  const zustandStore = await getDefaultStore(ctx);

  await queryClient.prefetchQuery(
    getListingsListQueryKey(slug),
    () => listingsList(slug),
    {
      staleTime: Infinity,
    },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore)),
    },
  };
}
Search.getLayout = (page: ReactElement) => <SearchLayout>{page}</SearchLayout>;

export default function Search() {
  const router = useRouter();
  const queryParams = router.query;
  const page = parseInt(router.query.page as string);
  const { data: listingDetail } = useListingsList(queryParams);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const [modalTrigger, setModalTrigger] = useState<boolean>(false);

  const form = useForm<SortOptions>({
    initialValues: {
      listing_condition: '',
      created_at__gt: undefined,
      location: '',
      category: '',
      is_negotiable: '',
      viewsCount: '',
      price__gt: '',
      price__lt: '',
      is_sfw: '',
      is_featured: '',
    },
  });
  const handleFilter = () => {
    const queryParams: SortOptions = {
      listing_condition:
        ListingOptionMap[
          (form.values.listing_condition as keyof typeof ListingOptionMap) || ''
        ],
      created_at__gt: form.values.created_at__gt
        ? (new Date(
            new Date(form.values.created_at__gt as Date).setDate(
              new Date(form.values.created_at__gt as Date).getDate() + 1,
            ),
          )
            .toISOString()
            .substring(0, 10) as unknown as Date)
        : undefined,
      location: form.values.location,
      category: form.values.category,
      viewsCount: form.values.viewsCount,
      is_featured:
        ListingOptionMap[
          (form.values.is_featured as keyof typeof ListingOptionMap) || ''
        ],
      price__gt: form.values.price__gt,
      price__lt: form.values.price__lt,
      is_negotiable:
        ListingOptionMap[
          (form.values.is_negotiable as keyof typeof ListingOptionMap) || ''
        ],
      is_sfw:
        ListingOptionMap[
          (form.values.is_sfw as keyof typeof ListingOptionMap) || ''
        ],
    };

    const filteredParams = Object.entries(queryParams).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    );

    const existingParams = new URLSearchParams(window.location.search);
    filteredParams.forEach(([key, value]) => {
      existingParams.set(key, value);
    });
    existingParams.set('page', '1');
    const searchUrl = `/search?${existingParams.toString()}`;
    router.push(searchUrl);
  };
  const handleClearFilters = () => {
    form.reset();
    const currentUrl = router.asPath;
    const [basePath, queryString] = currentUrl.split('?');
    if (queryString) {
      const firstAmpersandIndex = queryString.indexOf('&');
      let baseQuery = queryString;
      let additionalParams = '';
      if (firstAmpersandIndex !== -1) {
        baseQuery = queryString.substring(0, firstAmpersandIndex);
        additionalParams = queryString.substring(firstAmpersandIndex + 1);
      }
      const params = new URLSearchParams(additionalParams);
      params.set('page', '1');
      const pageParam = params.get('page');
      let newQueryString = baseQuery;
      if (pageParam) {
        newQueryString += (baseQuery ? '&' : '') + `page=${pageParam}`;
      }
      const newUrl = `${basePath}?${newQueryString}`;
      router.replace(newUrl);
    }
  };

  const handlePaginationChange = (newPage: number) => {
    const existingParams = new URLSearchParams(window.location.search);
    existingParams.set('page', newPage.toString());
    router.push(`/search?${existingParams}`);
  };
  console.log(queryParams);
  return (
    <>
      <SeoElement
        description={`Discover listings for "${queryParams.title__icontains}" on Doshrodeal. Explore a wide range of items from electronics to home goods in Nepal's emerging online marketplace.`}
        title={`Search Results for "${queryParams.title__icontains}" | Doshrodeal`}
        url={`https://www.doshrodeal.com/search?title__icontains=${queryParams.title__icontains}&page=${queryParams.page}`}
        image={''}
        keywords={`Search, ${queryParams.title__icontains}, Listings, Doshrodeal, Online Marketplace, Nepal, Buy and Sell, Electronics, Home Goods, Second-hand, Deals`}
      />
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <div className={classes.sort}>
          <TextInput
            mb={'md'}
            className={classes.textInput}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            size="md"
            radius={'xl'}
            placeholder={queryParams?.title__icontains as string}
            rightSectionWidth={40}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                if (searchValue.length > 0) {
                  router.push(`/search?title__icontains=${searchValue}`);
                }
              }
            }}
            rightSection={
              <ActionIcon
                size={30}
                radius="xl"
                className={classes.actionIcon}
                mr={'sm'}
                color={theme.primaryColor}
                variant="filled"
                onClick={() => {
                  if (searchValue.length > 0) {
                    router.push(`/search?title__icontains=${searchValue}`);
                  }
                }}
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
          <Group
            className={classes.scrollableGroup}
            noWrap
            position="apart"
            pb={'md'}
          >
            <Select
              radius={'xl'}
              placeholder="Condition"
              icon={
                <IconTool
                  size="1.3rem"
                  stroke={1.5}
                  color={form.values.listing_condition ? 'white' : 'gray'}
                />
              }
              withinPortal={true}
              data={['New', 'Used', 'Like New', 'Brand New']}
              {...form.getInputProps('listing_condition')}
              rightSection={
                <IconChevronDown
                  color={form.values.listing_condition ? 'white' : 'black'}
                  size="1.2rem"
                />
              }
              rightSectionWidth={30}
              styles={(theme) => ({
                dropdown: {
                  position: 'fixed',
                },
                rightSection: { pointerEvents: 'none' },
                input: {
                  backgroundColor: form.values.listing_condition
                    ? `${theme.colors.lime[8]}`
                    : `${theme.colors.gray[1]}`,
                  color: form.values.listing_condition ? 'white' : 'black',
                  fontWeight: 600,
                },
              })}
              className={classes.selectInput}
            />
            <DatePickerInput
              radius={'xl'}
              placeholder="Pick date after"
              valueFormat="YYYY MMM DD"
              className={classes.selectInput}
              dropdownType={'popover'}
              icon={
                <IconCalendar
                  color={form.values.created_at__gt ? 'white' : 'gray'}
                  size="1.2rem"
                  stroke={1.5}
                />
              }
              {...form.getInputProps('created_at__gt')}
              w={220}
              rightSection={
                <IconChevronDown
                  color={form.values.created_at__gt ? 'white' : 'black'}
                  size="1.2rem"
                />
              }
              rightSectionWidth={30}
              styles={{
                calendar: {
                  position: 'fixed',
                  marginTop: -12.5,
                  marginLeft: -20,
                  backgroundColor: 'white',
                  padding: theme.spacing.sm,
                  border: `1px solid ${theme.colors.gray[3]}`,
                },

                rightSection: { pointerEvents: 'none' },
                input: {
                  backgroundColor: form.values.created_at__gt
                    ? `${theme.colors.lime[8]}`
                    : `${theme.colors.gray[1]}`,
                  color: form.values.created_at__gt
                    ? 'white'
                    : `${theme.colors.gray[5]}`,
                  fontWeight: 600,
                },
              }}
            />

            <Select
              radius={'xl'}
              placeholder="Negotiable"
              data={['Negotiable', 'Non Negotiable']}
              {...form.getInputProps('is_negotiable')}
              icon={
                <IconCash
                  color={form.values.is_negotiable ? 'white' : 'gray'}
                  size="1.2rem"
                  stroke={1.5}
                />
              }
              rightSection={
                <IconChevronDown
                  color={form.values.is_negotiable ? 'white' : 'black'}
                  size="1.2rem"
                />
              }
              rightSectionWidth={30}
              styles={(theme) => ({
                dropdown: {
                  position: 'fixed',
                },
                rightSection: { pointerEvents: 'none' },
                input: {
                  backgroundColor: form.values.is_negotiable
                    ? `${theme.colors.lime[8]}`
                    : `${theme.colors.gray[1]}`,
                  color: form.values.is_negotiable ? 'white' : 'black',
                  fontWeight: 600,
                },
              })}
              className={classes.selectInput}
            />
            <Select
              radius={'xl'}
              placeholder="Featured"
              data={['Featured', 'Non-featured']}
              {...form.getInputProps('is_featured')}
              icon={
                <IconStar
                  color={form.values.is_featured ? 'white' : 'gray'}
                  size="1.11rem"
                  stroke={1.5}
                />
              }
              rightSection={
                <IconChevronDown
                  color={form.values.is_featured ? 'white' : 'black'}
                  size="1.2rem"
                />
              }
              withinPortal={true}
              rightSectionWidth={30}
              styles={(theme) => ({
                dropdown: {
                  position: 'fixed',
                },
                rightSection: { pointerEvents: 'none' },
                input: {
                  backgroundColor: form.values.is_featured
                    ? `${theme.colors.lime[8]}`
                    : `${theme.colors.gray[1]}`,
                  color: form.values.is_featured ? 'white' : 'black',
                  fontWeight: 600,
                  dropdown: {
                    overflow: 'auto',
                  },
                },
              })}
              className={classes.selectInput}
            />
            <Select
              radius={'xl'}
              placeholder="SFW"
              data={['SFW', 'NSFW']}
              {...form.getInputProps('is_sfw')}
              icon={
                <IconThumbUp
                  color={form.values.is_sfw ? 'white' : 'gray'}
                  size="1.11rem"
                  stroke={1.5}
                />
              }
              rightSection={
                <IconChevronDown
                  color={form.values.is_sfw ? 'white' : 'black'}
                  size="1.2rem"
                />
              }
              withinPortal={true}
              rightSectionWidth={30}
              styles={(theme) => ({
                dropdown: {
                  position: 'fixed',
                },
                rightSection: { pointerEvents: 'none' },
                input: {
                  backgroundColor: form.values.is_sfw
                    ? `${theme.colors.lime[8]}`
                    : `${theme.colors.gray[1]}`,
                  color: form.values.is_sfw ? 'white' : 'black',
                  fontWeight: 600,
                },
              })}
              className={classes.selectInput}
            />
            <Button
              radius={'xl'}
              onClick={() => setModalTrigger((prev) => !prev)}
              variant={
                (form.values?.price__gt || form.values.price__lt) &&
                !modalTrigger
                  ? 'filled'
                  : 'outline'
              }
              leftIcon={<IconCurrencyRupeeNepalese />}
            >
              Price Range
            </Button>
          </Group>
          <Divider size={2} />
          <Group spacing={5} position="apart" mt={'xs'}>
            <Group spacing={3}>
              <Text c={'dimmed'}>Sort By</Text>
              <IconSortAscending2 color="gray" size={'1.3em'} />
            </Group>
            <Group>
              <Group>
                <Text
                  onClick={() => handleClearFilters()}
                  c={'dimmed'}
                  underline
                  size={'sm'}
                  style={{ cursor: 'pointer' }}
                >
                  Clear Filter
                </Text>
              </Group>
              <Button
                rightIcon={<IconAdjustments size={'1.3em'} />}
                onClick={() => handleFilter()}
                size="xs"
                radius={'xl'}
              >
                Apply Filter
              </Button>
            </Group>
          </Group>
          {modalTrigger && (
            <Modal
              opened={modalTrigger}
              onClose={() => setModalTrigger((prev) => !prev)}
              centered
              radius={'lg'}
              transitionProps={{ transition: 'fade', duration: 300 }}
              overlayProps={{
                color: theme.colors.gray[7],
                opacity: 0.55,
                blur: 3,
              }}
            >
              <Group noWrap>
                <TextInput
                  placeholder="Min Price"
                  variant="unstyled"
                  sx={{ borderBottom: `1px solid ${theme.colors.gray[4]}` }}
                  icon={<IconCurrencyRupeeNepalese />}
                  type="number"
                  w={'100%'}
                  {...form.getInputProps('price__gt')}
                />

                <IconArrowBarBoth
                  style={{ paddingTop: 20 }}
                  size={'3.5em'}
                  color="gray"
                />
                <TextInput
                  placeholder="Max Price"
                  type="number"
                  variant="unstyled"
                  sx={{ borderBottom: `1px solid ${theme.colors.gray[4]}` }}
                  icon={<IconCurrencyRupeeNepalese />}
                  {...form.getInputProps('price__lt')}
                  w={'100%'}
                />
              </Group>

              <Group mt={'sm'} position="right">
                <Text
                  onClick={() => {
                    form.setFieldValue('price__lt', '');
                    form.setFieldValue('price__gt', '');
                    setModalTrigger((prev) => !prev);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Cancel
                </Text>
                <Button
                  radius={'lg'}
                  onClick={() => {
                    setModalTrigger((prev) => !prev);
                  }}
                >
                  Confirm
                </Button>
              </Group>
            </Modal>
          )}
        </div>

        {listingDetail?.results && listingDetail.results.length > 0 ? (
          <React.Fragment>
            {listingDetail.results.map((listing: Listings, key: number) => (
              <div
                style={{
                  marginTop: theme.spacing.sm,
                  marginBottom: theme.spacing.sm,
                }}
                key={listing.slug}
              >
                <HorizontalCard listing={listing} />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <Text mt={'xs'} align="center" c={'dimmed'}>
            No results found
          </Text>
        )}

        {listingDetail?.count !== 0 && (
          <Card w={'100%'} radius={'md'}>
            <Center>
              <Pagination
                total={
                  listingDetail?.count ? Math.ceil(listingDetail.count / 12) : 0
                }
                value={page || 1}
                onChange={handlePaginationChange}
                size="md"
                radius="md"
              />
            </Center>
          </Card>
        )}
      </div>
    </>
  );
}
