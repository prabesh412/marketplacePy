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
  Modal,
} from '@mantine/core';
import { Listings } from '../../../orval/model/listings';
import {
  IconAdjustments,
  IconArrowBarBoth,
  IconArrowRight,
  IconCalendar,
  IconChevronDown,
  IconCurrencyRupeeNepalese,
  IconSearch,
  IconSortAscending2,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import HorizontalCard from '@/components/ui/listing/HorizontalCard';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import { DatePickerInput } from '@mantine/dates';

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
  const slug = router.query;
  const { data: listingDetail } = useListingsList(slug);
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
            new Date(form?.values?.created_at__gt as Date).setDate(
              new Date(form?.values?.created_at__gt as Date).getDate() + 1,
            ),
          )
            ?.toISOString()
            ?.substring(0, 10) as unknown as Date)
        : undefined,

      location: form.values.location,
      category: form.values.category,
      viewsCount: form.values.viewsCount,
      is_featured:
        ListingOptionMap[
          (form.values?.is_featured as keyof typeof ListingOptionMap) || ''
        ],
      price__gt: form.values.price__gt,
      price__lt: form.values.price__lt,
      is_negotiable:
        ListingOptionMap[
          (form.values?.is_negotiable as keyof typeof ListingOptionMap) || ''
        ],
      is_sfw:
        ListingOptionMap[
          (form.values?.is_sfw as keyof typeof ListingOptionMap) || ''
        ],
    };
    const filteredParams = Object.entries(queryParams).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    );
    form.reset();
    const existingParams = new URLSearchParams(window.location.search);
    filteredParams.forEach(([key, value]) => {
      existingParams.set(key, value);
    });
    const searchUrl = `/search?${existingParams.toString()}`;
    router.push(searchUrl);
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
                color={form.values.created_at__gt ? 'white' : 'black'}
                size="1.1rem"
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
              (form.values?.price__gt || form.values.price__lt) && !modalTrigger
                ? 'filled'
                : 'outline'
            }
            rightIcon={<IconCurrencyRupeeNepalese />}
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
                onClick={() => form.reset()}
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
    </div>
  );
}
