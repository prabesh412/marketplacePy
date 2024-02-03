import {
  ActionIcon,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import {
  IconCheck,
  IconClick,
  IconHomeCheck,
  IconMinus,
  IconPencil,
  IconPlus,
  IconQuestionMark,
} from '@tabler/icons-react';
import { useState } from 'react';
import useAddListingForm from './UseAddListingForm';

type SecondStepProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const SecondStep = ({ form }: SecondStepProps) => {
  const { classes } = useStyles();

  const [active, setActive] = useState(false);
  const [numOfFeatures, setNumOfFeatures] = useState<number[]>([0]);

  return (
    <>
      <Card className={classes.card} padding={'xl'} radius={'md'}>
        <Card withBorder shadow="sm" bg={'gray.1'}>
          <Group spacing={5}>
            <IconHomeCheck color="gray" />
            <Text c={'dimmed'}>
              Buyers tend to prefer listings that clearly present detailed
              features, offering a better understanding of the product
            </Text>
          </Group>
        </Card>

        <Card mt={'md'} radius={'md'} withBorder bg={'gray.0.7'}>
          <Group
            style={{ cursor: 'pointer' }}
            onClick={() => setActive((prev) => !prev)}
            spacing={5}
          >
            <IconClick color="gray" />
            <Text pb={2} underline c={'dimmed'}>
              Click here to check the example of custom features
            </Text>
          </Group>
          {/* <Divider mt={'xs'} mb={'xs'} /> */}
          <ScrollArea scrollbarSize={0} mt={'xs'} h={'30vh'}>
            <Grid>
              {numOfFeatures.map((_, index) => (
                <>
                  <Grid.Col span={6}>
                    <TextInput
                      key={index}
                      icon={<IconPencil />}
                      placeholder="Name"
                      {...form.getInputProps(
                        `secondStep.listing_features.object.${index}.key`,
                      )}
                      size="md"
                      radius={'md'}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      key={index}
                      icon={<IconCheck />}
                      placeholder="Value"
                      {...form.getInputProps(
                        `secondStep.listing_features.object.${index}.value`,
                      )}
                      size="md"
                      radius={'md'}
                    />
                  </Grid.Col>
                </>
              ))}
            </Grid>
          </ScrollArea>

          <Flex mt={'xs'} justify="flex-start" align="flex-start">
            {numOfFeatures.length < 5 && (
              <ActionIcon
                variant="default"
                radius={'xl'}
                bg="lime"
                onClick={() =>
                  setNumOfFeatures((current) => [
                    ...current,
                    current[current.length - 1] + 1,
                  ])
                }
                sx={{
                  '&:hover': {
                    backgroundColor: 'gray',
                    transition: '.5s ease',
                  },
                }}
              >
                <IconPlus color="white" />
              </ActionIcon>
            )}
            {numOfFeatures.length !== 1 && (
              <ActionIcon
                variant="default"
                radius={'xl'}
                bg="lime"
                onClick={() =>
                  setNumOfFeatures((current) => current.slice(0, -1))
                }
                sx={{
                  '&:hover': {
                    backgroundColor: 'gray',
                    transition: '.5s ease',
                  },
                }}
              >
                <IconMinus color="white" />
              </ActionIcon>
            )}
          </Flex>
        </Card>
        {active && (
          <Card withBorder mt={'md'} shadow="xsx" radius={'md'} bg="gray.0.5">
            <Group spacing={1}>
              <IconQuestionMark color="gray" />
              <Text c={'dimmed'}>Example of how custom feature works</Text>
            </Group>
            <Divider color="gray.3" mt={'xs'} />
            <Group mt={'xs'}>
              <Grid w={'100%'}>
                <>
                  <Grid.Col span={6}>
                    <TextInput
                      placeholder="Land area"
                      size="md"
                      radius={'md'}
                      readOnly
                      icon={<IconPencil />}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      placeholder="5 Ana"
                      size="md"
                      radius={'md'}
                      readOnly
                      icon={<IconCheck />}
                    />
                  </Grid.Col>
                </>
              </Grid>
            </Group>
          </Card>
        )}
      </Card>
    </>
  );
};

export default SecondStep;

const useStyles = createStyles((theme) => ({
  card: {
    [`@media (max-width: 576px)`]: {
      padding: theme.spacing.xs,
    },
  },
}));
