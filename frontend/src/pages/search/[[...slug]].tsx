import { getDefaultStore } from '@/components/utils/PageDefaults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';

import {
  getListingsListQueryKey,
  listingsList,
  useListingsList,
} from '../../../orval/listings/listings';
import SearchLayout from '@/components/layouts/SearchLayout';
import {
  Group,
  Select,
  createStyles,
  rem,
  Text,
  Button,
  TextInput,
  useMantineTheme,
  ActionIcon,
  Divider,
} from '@mantine/core';
import { Listings } from '../../../orval/model/listings';
import {
  IconAdjustments,
  IconArrowRight,
  IconChevronDown,
  IconCurrencyRupeeNepalese,
  IconMapPinFilled,
  IconSearch,
  IconSortAscending2,
  IconX,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';

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
  condition?: string;
  datePosted?: string;
  location?: string;
  category?: string;
  viewsCount?: string;
  priceRangeMin?: string;
  priceRangeMax?: string;
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
  const slug = router.query;
  const { data: listingDetail } = useListingsList(slug);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [searchValue, setSearchValue] = useState('');
  const form = useForm<SortOptions>({
    initialValues: {
      condition: '',
      datePosted: '',
      location: '',
      category: '',
      viewsCount: '',
      priceRangeMin: '',
      priceRangeMax: '',
    },
  });
  const handleFilter = () => {
    const queryParams: SortOptions = {
      condition: form.values.condition,
      datePosted: form.values.datePosted,
      location: form.values.location,
      category: form.values.category,
      viewsCount: form.values.viewsCount,
      priceRangeMin: form.values.priceRangeMin,
      priceRangeMax: form.values.priceRangeMax,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([key, value]) => value !== '' && value !== null && value !== undefined,
      ),
    );
    const queryString = Object.entries(filteredParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    form.reset();
    router.push(
      `/search?title__icontains=${slug?.title__icontains}&${queryString}`,
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <div className={classes.sort}>
        <TextInput
          mb={'md'}
          className={classes.textInput}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          size="md"
          radius={'xl'}
          icon={<IconSearch />}
          placeholder={slug?.title__icontains as string}
          rightSectionWidth={40}
          rightSection={
            <ActionIcon
              size={30}
              radius="xl"
              className={classes.actionIcon}
              mr={'sm'}
              color={theme.primaryColor}
              variant="filled"
              onClick={() => {
                if (searchValue) {
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
            data={['New', 'Like New', 'Used']}
            {...form.getInputProps('condition')}
            rightSection={<IconChevronDown size="1.2rem" />}
            rightSectionWidth={30}
            styles={(theme) => ({
              rightSection: { pointerEvents: 'none' },
              input: {
                backgroundColor: theme.colors.gray[1],
              },
            })}
            className={classes.selectInput}
          />
          <Select
            radius={'xl'}
            placeholder="Date posted"
            data={['Recently', 'ddd']}
            {...form.getInputProps('datePosted')}
            rightSection={<IconChevronDown size="1.2rem" />}
            rightSectionWidth={30}
            styles={(theme) => ({
              rightSection: { pointerEvents: 'none' },

              input: {
                backgroundColor: theme.colors.gray[1],
              },
            })}
            className={classes.selectInput}
          />
          <Select
            radius={'xl'}
            placeholder="SFW"
            data={['NSFW', 'SFW']}
            {...form.getInputProps('location')}
            rightSection={<IconChevronDown size="1.2rem" />}
            rightSectionWidth={30}
            styles={(theme) => ({
              rightSection: { pointerEvents: 'none' },
              input: {
                backgroundColor: theme.colors.gray[1],
              },
              dropdown: {
                borderRadius: theme.radius.sm,
              },
            })}
            className={classes.selectInput}
          />
          <Select
            radius={'xl'}
            placeholder="Category"
            data={['Recently', 'ddd']}
            {...form.getInputProps('category')}
            rightSection={<IconChevronDown size="1.2rem" />}
            rightSectionWidth={30}
            styles={(theme) => ({
              rightSection: { pointerEvents: 'none' },

              input: {
                backgroundColor: theme.colors.gray[1],
              },
            })}
            className={classes.selectInput}
          />
          <Button radius={'xl'} rightIcon={<IconCurrencyRupeeNepalese />}>
            Price Range
          </Button>
          <Button
            radius={'xl'}
            rightIcon={<IconMapPinFilled />}
            onClick={handleFilter}
          >
            Near me
          </Button>
        </Group>
        <Divider size={2} />
        <Group spacing={5} position="apart" mt={'xs'}>
          <Group spacing={3}>
            <Text c={'dimmed'}>Sort By</Text>
            <IconSortAscending2 color="gray" size={'1.3em'} />
          </Group>
          <Group spacing={3}>
            <Button.Group>
              <Button
                rightIcon={<IconX size={'1.3em'} />}
                radius={'sm'}
                size="xs"
                variant="default"
              >
                Clear
              </Button>
              <Button
                rightIcon={<IconAdjustments size={'1.3em'} />}
                radius={'sm'}
                size="xs"
                variant="default"
              >
                Filter
              </Button>
            </Button.Group>
          </Group>
        </Group>
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
    </div>
  );
}
