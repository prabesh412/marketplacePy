import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  FocusTrap,
  Grid,
  Group,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import ImageDropper from './ImageDropper';
import { useCategoryList } from '../../../../orval/category/category';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import useAddListingForm from './UseAddListingForm';

type FirstStepProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const FirstStep = ({ form }: FirstStepProps) => {
  const [active, setActive] = useState(false);
  const [numOfFeatures, setNumOfFeatures] = useState<number[]>([0]);

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
    <div>
      <Stack>
        <FocusTrap active={active}>
          <TextInput
            required
            label={'Title of listing'}
            placeholder="Eg: House for sale in Bhaktapur, Radhe Radhe"
            {...form.getInputProps('firstStep.title')}
            data-autofocus={form.errors?.title !== undefined}
          />

          <Group grow>
            <NumberInput
              required
              label={'Price in रू'}
              placeholder="Eg:10,000"
              type="number"
              maxLength={10}
              min={1}
              {...form.getInputProps('firstStep.price')}
              data-autofocus={form.errors?.price !== undefined}
            />
            <NumberInput
              required
              label={'Phone number'}
              placeholder="Secondary Phone number"
              type="number"
              maxLength={10}
              minLength={10}
              {...form.getInputProps('firstStep.phone_number')}
            />
          </Group>
          <TextInput
            required
            label={'Location'}
            placeholder="Eg: New baneshwor chowk, opposite of parliament house"
            {...form.getInputProps('firstStep.location')}
            data-autofocus={form?.errors?.title !== undefined}
          />
          <Group grow>
            <Select
              label="Main category"
              required
              placeholder="Pick main category"
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
            />
            <Select
              key={selectedMainCategory}
              label="Sub category"
              required
              placeholder="Pick Sub category"
              {...form.getInputProps('firstStep.sub_category')}
              data={selectedSubcategories}
              disabled={selectedSubcategories.length < 1}
              error={form.errors['firstStep.sub_category']}
              value={form.values.firstStep.sub_category}
            />
          </Group>
          <Textarea
            placeholder={'Description'}
            label={'Description'}
            withAsterisk
            required
            {...form.getInputProps('firstStep.description')}
            data-autofocus={form.errors?.description !== undefined}
          />
          <Grid>
            {numOfFeatures.map((_, index) => (
              <>
                <Grid.Col span={6}>
                  <TextInput
                    key={index}
                    label={'Feature Name'}
                    placeholder="Eg: John Doe"
                    {...form.getInputProps(
                      `firstStep.listing_features.object.${index}.key`,
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    key={index}
                    label={'Feature Value'}
                    placeholder="Eg: John Doe"
                    {...form.getInputProps(
                      `firstStep.listing_features.object.${index}.value`,
                    )}
                  />
                </Grid.Col>
              </>
            ))}
          </Grid>
          <Flex justify="flex-end" align="flex-end">
            <ActionIcon
              variant="default"
              onClick={() =>
                setNumOfFeatures((current) => [
                  ...current,
                  current[current.length - 1] + 1,
                ])
              }
            >
              <IconPlus />
            </ActionIcon>
            {numOfFeatures.length !== 1 && (
              <ActionIcon
                variant="default"
                onClick={() =>
                  setNumOfFeatures((current) => current.slice(0, -1))
                }
              >
                <IconMinus />
              </ActionIcon>
            )}
          </Flex>
          <ImageDropper form={form} />
        </FocusTrap>
      </Stack>
    </div>
  );
};

export default FirstStep;
