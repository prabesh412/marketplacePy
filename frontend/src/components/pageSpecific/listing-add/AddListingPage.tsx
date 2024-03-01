import SecondStep from '@/components/ui/add-listing/SecondStep';
import ThirdStep from '@/components/ui/add-listing/ThirdStep';
import { ListingOptionMap } from '@/components/utils/ListingOptionMap';
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useImageListingCreate } from '../../../../orval/image-listing/image-listing';
import { useListingsCreate } from '../../../../orval/listings/listings';
import { ListingConditionEnum } from '../../../../orval/model';
import FirstStep from '../../ui/add-listing/FirstStep';
import FourthStep from '../../ui/add-listing/FourthStep';
import ListingAdded from '../../ui/add-listing/ListingAdded';
import ListingStepper from '../../ui/add-listing/ListingStepper';
import useAddListingForm from '../../ui/add-listing/UseAddListingForm';

const AddListingPage = () => {
  const [active, setActive] = useState(1);
  const [listingSlug, setlistingSlug] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [listingAdded, setListingAdded] = useState(false);
  const { mutate: listingMutation, isLoading } = useListingsCreate({});
  const { mutate: listingImagesMutation, isLoading: imageLoading } =
    useImageListingCreate({});
  const form = useAddListingForm();

  const handleNextClick = async () => {
    if ((active === 1 || active === 3) && !form.validate().hasErrors)
      setActive((current) => current + 1);
    else if (active === 2) await createAd();
    else if (active === 4) await putImage();
  };
  const prevStep = () => setActive((current) => current - 1);
  const handleSuccessNotification = () => {
    notifications.update({
      id: 'ListingImage',
      title: 'Listing image added',
      color: 'green',
      message: 'Listing added successfully',
      loading: false,
      autoClose: true,
      withCloseButton: true,
    });
  };

  const handleErrorResponse = () => {
    notifications.update({
      id: 'Listing',
      title: 'Listing failed',
      color: 'red',
      message: 'Whoops, an unexpected error occurred!',
      loading: false,
      autoClose: true,
      withCloseButton: true,
    });
  };
  const createAd = async () => {
    const firstStepvalues = form.values.firstStep;
    const secondStepValues = form.values.secondStep;
    const mappedFeatures = secondStepValues.listing_features.object.reduce(
      (acc, feature) => {
        acc[feature.key] = feature.value;
        return acc;
      },
      {},
    );
    const requestData = {
      data: {
        title: firstStepvalues.title,
        description: firstStepvalues.description,
        price: firstStepvalues.price.toString(),
        category: parseInt(firstStepvalues.sub_category, 10),
        location: firstStepvalues.location,
        phone_number: firstStepvalues.phone_number.toString(),
        listing_features: mappedFeatures,
        listing_condition: ListingOptionMap[
          firstStepvalues.listing_condition as keyof typeof ListingOptionMap
        ] as ListingConditionEnum,
      },
    };

    listingMutation(requestData, {
      onSuccess: async (res) => {
        setlistingSlug(res.slug);
        setActive((prev) => prev + 1);
      },
      onError: () => {
        handleErrorResponse();
      },
    });
  };
  const putImage = async () => {
    notifications.show({
      id: 'ListingImage',
      title: `Listing image is getting added`,
      message: `Please wait, the image is being uploaded`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    listingImagesMutation(
      {
        data: {
          listing: listingSlug,
          image: form.values.thirdStep.images,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setListingAdded(true);
          handleSuccessNotification();
        },
        onError: () => {
          notifications.update({
            id: 'ListingImage',
            title: 'Unexpected error occured while uploading image',
            color: 'red',
            message:
              'The file you uploaded was either not an image or a corrupted image, please retry.',
            loading: false,
            autoClose: true,
            withCloseButton: true,
          });
        },
      },
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      {!submitted && (
        <>
          <ListingStepper step={active} form={form} />
          <form onSubmit={createAd}>
            {active === 1 && <FirstStep form={form} />}
            {active === 2 && <SecondStep form={form} />}
            {active === 3 && <ThirdStep form={form} />}
            {active === 4 && <FourthStep form={form} />}
            <Group position="apart">
              {active === 2 && (
                <Button
                  mt={'lg'}
                  radius={'lg'}
                  leftIcon={<IconArrowLeft />}
                  onClick={prevStep}
                  loading={isLoading}
                >
                  Previous
                </Button>
              )}
              {active < 5 && (
                <Button
                  mt={'lg'}
                  radius={'lg'}
                  rightIcon={<IconArrowRight />}
                  loading={isLoading || imageLoading}
                  onClick={handleNextClick}
                >
                  {active === 4 ? 'Publish' : 'Next'}
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
