import React, { useState } from 'react';
import FirstStep from '../../ui/add-listing/FirstStep';
import useAddListingForm from '../../ui/add-listing/UseAddListingForm';
import ListingStepper from '../../ui/add-listing/ListingStepper';
import SecondStep from '../../ui/add-listing/SecondStep';
import { Button, Group } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useListingsCreate } from '../../../../orval/listings/listings';
import ListingAdded from '../../ui/add-listing/ListingAdded';
import { notifications } from '@mantine/notifications';
import { useImageListingCreate } from '../../../../orval/image-listing/image-listing';

const AddListingPage = () => {
  const [active, setActive] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [listingAdded, setListingAdded] = useState(false);
  const { mutate: listingMutation } = useListingsCreate({});
  const { mutate: listingImagesMutation } = useImageListingCreate({});
  const form = useAddListingForm();

  const handleNextClick = async () => {
    if (active === 1 && !form.validate().hasErrors) {
      setActive((current) => current + 1);
    } else if (active === 2) {
      await createAd();
    }
  };

  const prevStep = () => setActive((current) => current - 1);

  const handleSuccessNotification = () => {
    notifications.update({
      id: 'Listing',
      title: 'Listing added',
      color: 'green',
      message: 'Congratulations, Listing added successfully',
      loading: false,
      autoClose: true,
      withCloseButton: true,
    });
  };

  const handleErrorResponse = () => {
    notifications.update({
      id: 'Listing',
      title: 'Listing added',
      color: 'red',
      message: 'Whoops, an unexpected error occurred!',
      loading: false,
      autoClose: true,
      withCloseButton: true,
    });
  };
  const createAd = async () => {
    const values = form.values.firstStep;
    const mappedFeatures = values.listing_features.object.reduce(
      (acc, feature) => {
        acc[feature.key] = feature.value;
        return acc;
      },
      {},
    );

    const requestData = {
      data: {
        title: values.title,
        description: values.description,
        price: values.price.toString(),
        category: parseInt(values.sub_category, 10),
        location: values.location,
        phone_number: values.phone_number.toString(),
        listing_features: mappedFeatures,
      },
    };

    notifications.show({
      id: 'Listing',
      title: `Listing is getting added`,
      message: `Please wait, the listing is being added`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    listingMutation(requestData, {
      onSuccess: async (res) => {
        listingImagesMutation(
          {
            data: {
              listing: res.slug,
              image: values.images,
            },
          },
          {
            onSuccess: () => {
              setSubmitted(true);
              setListingAdded(true);
              handleSuccessNotification();
            },
          },
        );
      },
      onError: () => {
        handleErrorResponse();
      },
    });
  };

  return (
    <div>
      {!submitted && (
        <>
          <ListingStepper step={active} form={form} />
          <form onSubmit={createAd}>
            {active === 1 && <FirstStep form={form} />}
            {active === 2 && <SecondStep form={form} />}
            <Group position="apart">
              {active !== 1 && (
                <Button
                  mt={'lg'}
                  leftIcon={<IconArrowLeft />}
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {active < 3 && (
                <Button
                  mt={'lg'}
                  rightIcon={<IconArrowRight />}
                  onClick={handleNextClick}
                >
                  {active !== 1 ? 'Publish' : 'Next'}
                </Button>
              )}
            </Group>
          </form>
        </>
      )}
      {listingAdded && <ListingAdded />}
    </div>
  );
};

export default AddListingPage;
