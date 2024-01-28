import { UseFormReturnType, useForm } from '@mantine/form';
import { hideNotification, showNotification } from '@mantine/notifications';
import { useEffect } from 'react';

const useAddListingForm = () => {
  const form = useForm({
    initialValues: {
      firstStep: {
        title: '',
        description: '',
        price: '',
        phone_number: '',
        location: '',
        sub_category: '',
        main_category: '',
        is_negotiable: false,
        listing_condition: 'NW',
      },

      secondStep: {
        listing_features: {
          object: Array(6).fill({ key: '', value: '' }),
        },
      },
      thirdStep: { images: [] },
    },
    validate: {
      firstStep: {
        title: (value) => {
          if (!value) {
            return 'Title is necessary';
          } else if (value.length < 5) {
            return 'Title should be greater than 5 character';
          }
        },
        description: (value) => {
          if (!value) {
            return 'Description is necessary';
          } else if (value.length < 10) {
            return 'Description should be greater than 5 character';
          }
        },
        price: (value) => {
          const stringValue = value.toString();
          if (!stringValue) {
            return 'Price is necessary';
          } else if (stringValue.length > 8) {
            return 'Price should be smaller than 9 digits';
          }
        },
        phone_number: (value) => {
          console.log(value);
          if (!value) {
            return 'Secondary Phone Number is necessary';
          } else if (!/^\d{10}$/.test(value)) {
            return 'Invalid Phone number';
          }
        },

        location: (value) => {
          if (!value) {
            return 'Location is necessary';
          } else if (value.length < 5) {
            return 'Location should be greater than 5 digit';
          }
        },
        main_category: (value) => {
          if (!value || value === '') {
            return 'Main Category is necessary';
          }
        },

        sub_category: (value) => {
          if (!value || value === '') {
            return 'Sub Category is necessary';
          }
        },
      },
    },
  });
  console.log(form.errors);
  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      showNotification({
        id: 'listing-add-error',
        title: 'Form Submission Error',
        message: 'Please fill in all required fields.',
      });
    } else {
      hideNotification('listing-add-error');
    }
  }, [form.errors]);

  return form;
};
export default useAddListingForm;
