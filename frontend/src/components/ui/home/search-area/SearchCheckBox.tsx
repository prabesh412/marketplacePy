import {
  Avatar,
  Card,
  Checkbox,
  Grid,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import React from 'react';
const useStyles = createStyles((theme) => ({
  CheckBox: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  },
}));
const SearchCheckBox = () => {
  const { classes } = useStyles();

  return (
    <Grid w={'100%'} m={'auto'} gutter="md">
      <Grid.Col w={'100%'} span={12} md={4}>
        <Card w={'auto'} className={classes.CheckBox} p={10}>
          <Group position="apart">
            <Group>
              <Avatar
                radius={'xl'}
                src={
                  'https://www.legalzoom.com/sites/lz.com/files/inline-images/articles/when_is_a_promissory_note_negotiable_1.jpg'
                }
              />
              <Group position="apart">
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Negotiable
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Negotiable offers
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox />
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} md={4}>
        <Card w={'auto'} className={classes.CheckBox} p={10}>
          <Group position="apart">
            <Group>
              <Avatar
                radius={'xl'}
                src={
                  'https://static.vecteezy.com/system/resources/previews/005/073/083/original/add-new-product-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'
                }
              />
              <Group position="apart">
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Product Condition
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    New products
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox />
          </Group>
        </Card>
      </Grid.Col>{' '}
      <Grid.Col span={12} md={4}>
        <Card w={'auto'} className={classes.CheckBox} p={10}>
          <Group position="apart">
            <Group>
              <Avatar
                radius={'xl'}
                src={
                  'https://img.freepik.com/free-vector/address-illustration-concept_114360-301.jpg'
                }
              />
              <Group position="apart">
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Location
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Listings near me
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox />
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default SearchCheckBox;
