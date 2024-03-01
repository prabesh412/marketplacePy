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
import Condition from '../../../../../public/quick-select-condition.png';
import Featured from '../../../../../public/quick-select-featured.png';
import Negotiable from '../../../../../public/quick-select-negotiable.jpg';

import { CheckboxStates } from './HomepageSearchArea';

const useStyles = createStyles((theme) => ({
  CheckBox: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  },
}));

interface SearchCheckBoxProps {
  checkboxStates: CheckboxStates;
  setCheckboxStates: React.Dispatch<React.SetStateAction<CheckboxStates>>;
}
const SearchCheckBox = ({
  checkboxStates,
  setCheckboxStates,
}: SearchCheckBoxProps) => {
  const { classes } = useStyles();
  const handleCheckboxChange = (checkboxName: keyof CheckboxStates) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };
  return (
    <Grid w={'100%'} m={'auto'} gutter="md">
      <Grid.Col w={'100%'} span={12} md={4}>
        <Card w={'auto'} radius={'md'} className={classes.CheckBox} p={10}>
          <Group position="apart" pl={'sm'} pr={'sm'}>
            <Group spacing={3}>
              <Avatar radius={'xl'} src={Negotiable.src} />
              <Group position="apart" pl={'sm'} pr={'sm'}>
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Offers
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Negotiable
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox
              onChange={() => handleCheckboxChange('is_negotiable')}
              size={'md'}
              radius={'md'}
            />
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} md={4}>
        <Card w={'auto'} radius={'md'} className={classes.CheckBox} p={10}>
          <Group position="apart" pl={'sm'} pr={'sm'}>
            <Group spacing={3}>
              <Avatar size={30} src={Condition.src} />
              <Group position="apart" pl={'sm'} pr={'sm'}>
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Product Condition
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Brand New
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox
              onChange={() => handleCheckboxChange('condition')}
              size={'md'}
              radius={'md'}
            />
          </Group>
        </Card>
      </Grid.Col>{' '}
      <Grid.Col span={12} md={4}>
        <Card w={'auto'} radius={'md'} className={classes.CheckBox} p={10}>
          <Group position="apart" pl={'sm'} pr={'sm'}>
            <Group spacing={3}>
              <Avatar radius={'xl'} src={Featured.src} />
              <Group position="apart" pl={'sm'} pr={'sm'}>
                <div>
                  <Text c={'dimmed'} size={'xs'}>
                    Status
                  </Text>
                  <Text fw={'bold'} size={'sm'}>
                    Featured
                  </Text>
                </div>
              </Group>
            </Group>
            <Checkbox
              onChange={() => handleCheckboxChange('is_featured')}
              size={'md'}
              radius={'md'}
            />
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default SearchCheckBox;
