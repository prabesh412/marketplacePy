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
              <Avatar
                radius={'xl'}
                src={
                  'https://www.legalzoom.com/sites/lz.com/files/inline-images/articles/when_is_a_promissory_note_negotiable_1.jpg'
                }
              />
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
              <Avatar
                radius={'xl'}
                src={
                  'https://static.vecteezy.com/system/resources/previews/005/073/083/original/add-new-product-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'
                }
              />
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
              <Avatar
                radius={'xl'}
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIGWrlszaSb4FF8tc2lVmlT8OD5xxUJpY0Q&usqp=CAU'
                }
              />
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
