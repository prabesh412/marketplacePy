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
    <Grid w={'100%'} m={'auto'} mt={'xs'} gutter="md">
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
                    Negotiable
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
                  'https://www.legalzoom.com/sites/lz.com/files/inline-images/articles/when_is_a_promissory_note_negotiable_1.jpg'
                }
              />
              <Group position="apart">
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Condition
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    New
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
                  'https://www.legalzoom.com/sites/lz.com/files/inline-images/articles/when_is_a_promissory_note_negotiable_1.jpg'
                }
              />
              <Group position="apart">
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Negotiable
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Negotiable
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
