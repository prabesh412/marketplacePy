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
  Popover,
  Button,
  TextInput,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';
import { Listings } from '../../../orval/model/listings';
import {
  IconAdjustments,
  IconArrowRight,
  IconClearAll,
  IconSearch,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import HomepageSearchArea from '@/components/ui/home/search-area/HomepageSearchArea';

const useStyles = createStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },

  sideNav: {
    position: 'sticky',
    top: 0,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  mainContent: {
    marginLeft: theme.spacing.md,
    flex: 2,
    marginRight: theme.spacing.md,
    '@media (max-width: 576px)': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  title: {
    fontSize: rem(30),

    '@media (max-width: 575px)': {
      fontSize: theme.fontSizes.xl,
      marginTop: theme.spacing.xs,
    },
  },

  divider: {
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },

  bannerContainer: {
    position: 'sticky',
    top: 0,
    maxWidth: '300px',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
  sort: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    padding: theme.spacing.sm,
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  textInput: {
    width: '100%',
    border: '2px solid gray',
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
  if (!slug || Object.keys(slug).length === 0) {
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
          size="lg"
          radius={'xl'}
          icon={<IconSearch />}
          placeholder="Search for what you are looking for and we will handle the rest."
          rightSectionWidth={50}
          rightSection={
            <ActionIcon
              size={40}
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
        <Group pb={'md'} grow>
          <Select
            placeholder="Condition"
            data={['New', 'Like New', 'Used']}
            {...form.getInputProps('condition')}
          />
          <Select
            placeholder="Date posted"
            data={['Recently', 'ddd']}
            {...form.getInputProps('datePosted')}
          />
        </Group>
        <Group pb={'md'} grow>
          <Select
            placeholder="location"
            data={['Near me', 'Anywhere in Nepal', 'Kathmandu', 'Bhaktapur']}
            {...form.getInputProps('location')}
          />
          <Select
            placeholder="Category"
            data={['Recently', 'ddd']}
            {...form.getInputProps('category')}
          />
        </Group>
        <Group w={'100%'} grow>
          <TextInput
            placeholder="Views Count"
            type="number"
            {...form.getInputProps('viewsCount')}
          />
          <Popover width={400} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button>Select Price Range</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Group>
                <Text size={'sm'} fw={'600'}>
                  Select Price Range
                </Text>
              </Group>
              <Group mb={'xs'} mt={'xs'} grow>
                <TextInput
                  placeholder="Min"
                  type="number"
                  {...form.getInputProps('priceRangeMin')}
                />
                <TextInput
                  placeholder="Max"
                  type="number"
                  {...form.getInputProps('priceRangeMax')}
                />
              </Group>
            </Popover.Dropdown>
          </Popover>
        </Group>
        <Group position="apart" mt={'md'}>
          <Button rightIcon={<IconAdjustments />} onClick={handleFilter}>
            Filter now
          </Button>
          <Button rightIcon={<IconClearAll />} onClick={() => form.reset()}>
            Clear all
          </Button>
        </Group>
      </div>

      {listingDetail?.results && listingDetail.results.length > 0 ? (
        (
          <Text align="center" fw={'200'} mt={'xs'}>
            {listingDetail.results.length}
          </Text>
        ) &&
        listingDetail?.results?.map((listing: Listings, key: number) => (
          <div
            style={{
              marginTop: theme.spacing.sm,
              marginBottom: theme.spacing.sm,
            }}
            key={key}
          >
            <HorizontalCard listing={listing} />
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No results found</p>
      )}
    </div>
  );
}
