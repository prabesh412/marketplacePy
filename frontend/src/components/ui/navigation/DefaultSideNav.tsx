import { LinksGroup } from '@/components/ui/common/NavLinks';
import {
  createStyles,
  Drawer,
  Group,
  rem,
  ScrollArea,
  Text,
} from '@mantine/core';
import { IconCategory } from '@tabler/icons-react';
import React from 'react';
import { useCategoryList } from '../../../../orval/category/category';

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

const DefaultSideNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
          link: `search/?category=${subcategory.id}`,
        }))}
        key={parentCategory.id}
        icon={icons}
      />
    );
  });

  return (
    <Drawer
      overlayProps={{ blur: 4 }}
      scrollAreaComponent={ScrollArea.Autosize}
      title={
        <>
          <Group ml={'lg'} spacing={10}>
            <IconCategory />
            <Text fw={500} size={'md'} align="center">
              Browse all categories
            </Text>
          </Group>
        </>
      }
      sx={{ overflow: 'auto' }}
      opened={isOpen}
      onClose={onClose}
    >
      <div className={classes.linksInner}>{links}</div>
    </Drawer>
  );
};

export default React.memo(DefaultSideNav);
