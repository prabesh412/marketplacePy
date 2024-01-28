import {
  Card,
  Divider,
  FocusTrap,
  Group,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  Text,
  TextInput,
  Textarea,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAbc,
  IconCategory,
  IconCategoryFilled,
  IconCurrencyRupeeNepalese,
  IconFileDescription,
  IconHomeSearch,
  IconMapPinFilled,
  IconPhone,
  IconTool,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useCategoryList } from '../../../../orval/category/category';
import useAddListingForm from './UseAddListingForm';

type FirstStepProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const FirstStep = ({ form }: FirstStepProps) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [active, setActive] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>(
    form.values.firstStep.main_category || '',
  );

  const [selectedSubcategories, setSelectedSubcategories] = useState<
    SelectItem[]
  >([]);

  useEffect(() => {
    if (form.errors) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [form.errors]);

  const { data: categories } = useCategoryList();

  const parentCategories = categories?.filter(
    (category) => category.parent === null,
  );

  const categoryOptions = parentCategories?.map((parentCategory) => {
    const subcategories = categories?.filter(
      (category) => category.parent === parentCategory.id,
    );

    const subcategoryOptions = subcategories?.map((subcategory) => ({
      value: subcategory.id,
      label: subcategory.name,
    }));

    return {
      value: parentCategory.id,
      label: parentCategory.name,
      data: subcategoryOptions || [],
    };
  });

  const handleMainCategoryChange = (mainCategory: string) => {
    setSelectedMainCategory(mainCategory);
    const selectedCategory = categoryOptions?.find(
      (category) => category.value.toString() === mainCategory,
    );

    setSelectedSubcategories(
      (selectedCategory?.data || []).map((subcategory) => ({
        value: subcategory.value.toString(),
        label: subcategory.label,
      })),
    );
    form.setFieldValue('firstStep.sub_category', '');
    form.setFieldValue('firstStep.main_category', mainCategory);
  };

  useEffect(() => {
    if (form.values.firstStep.main_category) {
      const selectedCategory = categoryOptions?.find(
        (category) =>
          category.value.toString() === form.values.firstStep.main_category,
      );

      const subcategoryOptions = (selectedCategory?.data || []).map(
        (subcategory) => ({
          value: subcategory.value.toString(),
          label: subcategory.label,
        }),
      );

      setSelectedSubcategories(subcategoryOptions);
    } else {
      setSelectedSubcategories([]);
    }
  }, [form.values.firstStep.main_category]);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: theme.radius.md,
      }}
    >
      <Stack className={classes.stack} p={'xl'}>
        <FocusTrap active={active}>
          <Card withBorder shadow="sm" bg={'gray.1'}>
            <Group spacing={5}>
              <IconHomeSearch color="gray" />
              <Text c={'dimmed'}>
                Buyers tend to show a higher interest in listings that offer
                comprehensive and detailed information.
              </Text>
            </Group>
          </Card>
          <Divider color="gray.1" />
          <TextInput
            withAsterisk={false}
            required
            placeholder="Ad title (Eg: House for sale in Koteshwor)"
            {...form.getInputProps('firstStep.title')}
            icon={<IconAbc />}
            data-autofocus={form.errors?.title !== undefined}
            radius={'md'}
            size="md"
            maxLength={70}
          />

          <Group grow>
            <NumberInput
              required
              placeholder="Price in रू"
              icon={<IconCurrencyRupeeNepalese />}
              type="number"
              precision={2}
              min={0}
              {...form.getInputProps('firstStep.price')}
              data-autofocus={form.errors?.price !== undefined}
              radius={'md'}
              size="md"
              hideControls
            />
            <NumberInput
              required
              placeholder="Secondary Phone number"
              icon={<IconPhone />}
              type="number"
              maxLength={10}
              minLength={10}
              {...form.getInputProps('firstStep.phone_number')}
              radius={'md'}
              size="md"
              hideControls
            />
          </Group>
          <Group grow>
            <TextInput
              required
              placeholder="Location (Eg: Koteshwor, opposite of Shiva mandir)"
              {...form.getInputProps('firstStep.location')}
              icon={<IconMapPinFilled />}
              radius={'md'}
              size="md"
              data-autofocus={form?.errors?.title !== undefined}
            />
            <Select
              required
              placeholder="Condition"
              {...form.getInputProps('firstStep.listing_condition')}
              data={['New', 'Used', 'Like New', 'Brand New']}
              icon={<IconTool />}
              radius={'md'}
              size="md"
              data-autofocus={form?.errors?.title !== undefined}
            />
          </Group>
          <Group grow>
            <Select
              required
              placeholder="Pick main category"
              icon={<IconCategory />}
              searchable
              data={(categoryOptions || []).map((category) => ({
                value: category.value.toString(),
                label: category.label,
              }))}
              value={form.values.firstStep.main_category}
              onChange={(mainCategory) =>
                handleMainCategoryChange(mainCategory as string)
              }
              error={form.errors['firstStep.main_category']}
              radius={'md'}
              size="md"
            />
            <Select
              key={selectedMainCategory}
              required
              icon={<IconCategoryFilled />}
              placeholder="Pick Sub category"
              {...form.getInputProps('firstStep.sub_category')}
              data={selectedSubcategories}
              disabled={selectedSubcategories.length < 1}
              error={form.errors['firstStep.sub_category']}
              value={form.values.firstStep.sub_category}
              radius={'md'}
              size="md"
            />
          </Group>
          <Textarea
            icon={
              <IconFileDescription style={{ marginBottom: theme.spacing.lg }} />
            }
            placeholder={'Description'}
            required
            {...form.getInputProps('firstStep.description')}
            data-autofocus={form.errors?.description !== undefined}
            radius={'md'}
            size="md"
          />
        </FocusTrap>
      </Stack>
    </div>
  );
};

export default FirstStep;

const useStyles = createStyles((theme) => ({
  stack: {
    [`@media (max-width: 576px)`]: {
      padding: theme.spacing.xs,
    },
  },
}));
