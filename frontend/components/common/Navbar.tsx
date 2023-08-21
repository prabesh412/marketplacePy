import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Text,
  Select,
  Flex,
  Button,
  Burger,
  Container,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { routes } from '../utils/routes';
import React, { useContext } from 'react';
import { useStore } from '../store/store';
import { useUsersMeRetrieve, usersMeRetrieve } from '../../orval/users/users';
import { SideNav } from './SideNav';

// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  selectControl: {
    border: 'none',
  },
  selectInput: {
    border: 'none',
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    },
  },
  profile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderSearchProps {
  links: {
    link: string;
    iconArg: React.ReactElement;
  }[];
  showSideNav: () => void;
}

const Navbar = ({ links, showSideNav }: HeaderSearchProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();
  const profile = usersMeRetrieve();
  const user = useStore((state) => state.profile);
  const logout = useStore((state) => state.logout);

  const items = links.map((link) => {
    return (
      <a
        key={link.link}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.iconArg}
      </a>
    );
  });

  return (
    <>
      <Header height={60} mt={10} sx={{ zIndex: 1000 }}>
        <Container fluid>
          <div className={classes.inner}>
            <Burger
              opened={opened}
              onClick={showSideNav}
              className={classes.burger}
              size="sm"
              pr={'sm'}
            />
            <Text weight={500} size="lg" pl={10}>
              HamroBazar
            </Text>
            <Select
              ml={15}
              placeholder="Search Here..."
              searchable
              icon={<IconSearch />}
              sx={{
                width: '450px',
                minHeight: '20px',
                boxShadow: ' -1px 3px 24px -5px rgba(200,204,204,0.76)',
              }}
              nothingFound="Nobody here"
              data={[]}
            />
            <Group>
              <Group spacing={15} ml={70} className={classes.links}>
                {items}
              </Group>

              <Group spacing={10} ml={25}>
                {user ? (
                  <>
                    <Avatar
                      color="grape"
                      radius="xl"
                      placeholder="MK"
                      variant="filled"
                    >
                      MK
                    </Avatar>
                    <Button onClick={logout}></Button>
                  </>
                ) : (
                  <Button onClick={() => router.push(routes.auth)}>
                    Login
                  </Button>
                )}
              </Group>
            </Group>
          </div>
        </Container>
      </Header>
    </>
  );
};

export default React.memo(Navbar);
