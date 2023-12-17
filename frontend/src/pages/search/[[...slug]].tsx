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
  Col,
  Grid,
  Group,
  Select,
  Title,
  createStyles,
  rem,
  Text,
  Popover,
  Button,
  TextInput,
} from '@mantine/core';
import { Listings } from '../../../orval/model/listings';
import FeaturedCard from '@/components/ui/featured/FeaturedCard';
import { IconAdjustments, IconClearAll } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

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
    borderRadius: theme.radius.md,
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
  if (!slug || !slug.title__icontains) {
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
      <Title align="center" mt={'lg'} mb={'lg'} className={classes.title}>
        {slug?.title__icontains}
      </Title>
      <div className={classes.sort}>
        <Group pb={'sm'} position="center" spacing={5}>
          <Text fw={'dimmed'}>Sort By</Text>
          <IconAdjustments color="grey" size="1.3em" />
        </Group>
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
          <div key={key}>
            <Grid mb={'xl'} mt={'sm'}>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
              <Col span={6} xs={4} sm={3} md={3} lg={3}>
                <FeaturedCard />
              </Col>
            </Grid>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No results found</p>
      )}
    </div>
  );
}
