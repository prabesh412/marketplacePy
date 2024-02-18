import {
  ActionIcon,
  Card,
  Group,
  TextInput,
  TextInputProps,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultSideNav from '../../navigation/DefaultSideNav';
import SearchCheckBox from './SearchCheckBox';

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: '1200px',
    margin: 'auto',
    // borderRadius: theme.radius.lg,
    width: '100%',
    '@media (max-width: 575px)': {
      borderRadius: theme.radius.md,
      marginBottom: theme.radius.md,
      marginTop: theme.spacing.sm,
    },
    '@media (max-width:1200px)': {
      width: '100%',
    },
  },
  description: {
    '@media (max-width: 575px)': {
      fontSize: theme.fontSizes.xs,
    },
  },
  textInput: {
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
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
  title: {
    fontSize: rem(45),
    fontWeight: 'bold',
    '@media (max-width: 575px)': {
      fontSize: rem(25),

      marginTop: theme.spacing.xs,
    },
  },
  categoryBox: {
    // marginLeft: theme.spacing.sm,
    // marginRight: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.dark[5],
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(170),
    borderRadius: theme.radius.md,
    '@media (max-width: 575px)': {
      borderRadius: theme.radius.sm,
      height: rem(150),
    },
  },
  actionIcon: {
    '@media (max-width: 576px)': {
      width: '10px',
      height: '10px',
    },
  },
  homepageSearchArea: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    marginTop: theme.spacing.sm,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

    '@media (max-width: 576px)': {
      width: '100%',
    },
  },
}));
export interface CheckboxStates {
  is_negotiable: boolean;
  condition: boolean;
  is_featured: boolean;
}
const HomepageSearchArea = (props: TextInputProps) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({
    is_negotiable: false,
    condition: false,
    is_featured: false,
  });
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue == null || searchValue.trim() === '') {
      return;
    }
    const queryParams = new URLSearchParams({ title__icontains: searchValue });
    if (checkboxStates.is_negotiable)
      queryParams.append('is_negotiable', 'true');
    if (checkboxStates.condition) queryParams.append('listing_condition', 'BN');
    if (checkboxStates.is_featured) queryParams.append('is_featured', 'true');

    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <>
      <Card
        maw={'1200px'}
        m={'auto'}
        p={7}
        className={classes.card}
        mt={'sm'}
        radius={'md'}
      >
        <div className={classes.homepageSearchArea}>
          <div
            style={{
              flex: 8,
            }}
          >
            <Group position="center">
              <TextInput
                className={classes.textInput}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                size="lg"
                radius={'xl'}
                icon={<IconSearch />}
                placeholder="Search what you are looking for"
                rightSectionWidth={40}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch();
                  }
                }}
                rightSection={
                  <ActionIcon
                    size={35}
                    radius="xl"
                    className={classes.actionIcon}
                    mr={'sm'}
                    color={theme.primaryColor}
                    variant="filled"
                    onClick={() => handleSearch()}
                    tabIndex={0}
                  >
                    <IconArrowRight
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                }
                {...props}
              />

              <SearchCheckBox
                checkboxStates={checkboxStates}
                setCheckboxStates={setCheckboxStates}
              />
            </Group>
          </div>
        </div>
        <DefaultSideNav
          onClose={() => setSideNavOpen(false)}
          isOpen={isSideNavOpen}
        />
      </Card>
    </>
  );
};

export default HomepageSearchArea;
