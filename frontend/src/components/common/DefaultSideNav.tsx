import { createStyles, Navbar, rem, ScrollArea, Text } from '@mantine/core';
import { IconCategory } from '@tabler/icons-react';
import { LinksGroup } from './NavLinks';
import { useCategoryList } from '../../../orval/category/category';
import { PlainDivider } from './PlainDivider';
import React from 'react';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? 'transparent' : theme.white,
    paddingBottom: 0,
    height: '100vh',
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingBottom: theme.spacing.xl,
  },
  headText: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },
  browseText: {
    lineHeight: 1.5,
    marginLeft: rem(10),
    fontSize: rem(20),
    color: theme.white,
    padding: rem(1),
    paddingLeft: rem(5),
    paddingRight: rem(5),

    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.blue[5],
    borderRadius: rem(4),
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
  },

  icon: {
    backgroundColor: theme.colors.blue[5],
    color: theme.white,
  },
}));

const DefaultSideNav = () => {
  const { classes } = useStyles();
  const { data: categories } = useCategoryList();
  const icons = () => {
    return <IconCategory />;
  };

  const parentCategories = categories?.filter(
    (category) => category.parent === null,
  );

  const links = parentCategories?.map((parentCategory) => {
    const subcategories = categories?.filter(
      (category) => category.parent === parentCategory.id,
    );

    return (
      <LinksGroup
        label={parentCategory.name}
        links={subcategories?.map((subcategory) => ({
          label: subcategory.name,
          link: `/${subcategory.slug}`,
        }))}
        key={parentCategory.id}
        icon={icons}
      />
    );
  });

  return (
    <Navbar
      sx={{ height: '100vh' }}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
};

export default React.memo(DefaultSideNav);
