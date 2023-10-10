import React, { useState } from 'react';
import FirstStep from '../add-listing/FirstStep';
import useAddListingForm from '../add-listing/UseAddListingForm';
import ListingStepper from '../add-listing/ListingStepper';
import SecondStep from '../add-listing/SecondStep';
import { Button, Group, Step } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useListingsCreate } from '../../../orval/listings/listings';
import ListingAdded from '../add-listing/ListingAdded';
import { notifications } from '@mantine/notifications';

const AddListingPage = () => {
  const [active, setActive] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [listingAdded, setListingAdded] = useState(false);
  const creatingListing = useListingsCreate();

  const form = useAddListingForm();
  const handleNextClick = () => {
    if (active === 1) {
      if (!form.validate().hasErrors) {
        setActive((current) => current + 1);
      }
    } else if (active === 2) {
      createAd();
    }
  };

  const prevStep = () => setActive((current) => current - 1);
  const createAd = () => {
    const values = form.values.firstStep;

    const requestData = {
      data: {
        title: values.title,
        description: values.description,
        price: values.price.toString(),
        category: parseInt(values.sub_category, 10),
        location: values.location,
        phone_number: values.phone_number.toString(),
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
    creatingListing.mutate(requestData, {
      onSuccess: () => {
        
        setSubmitted(true);
        setListingAdded(true);
        notifications.update({
          id: 'Listing',
          title: `Listing added`,
          color: 'green',
          message: 'Congratulation, Listing added successfully',
          loading: false,
          autoClose: true,

          withCloseButton: true,
        });
      },
      onError: (error) => {
        notifications.update({
          id: 'Listing',
          title: `Listing added`,
          color: 'red',
          message: 'whoops, unexpected error occured!',
          loading: false,
          autoClose: true,

          withCloseButton: true,
        });
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
