import {
  Badge,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Text,
  rem,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';

import ShowNotification from '../common/Notification';
import useAddListingForm from './UseAddListingForm';

type ImageDropperProps = {
  form: ReturnType<typeof useAddListingForm>;
};

const ImageDropper = ({ form }: ImageDropperProps) => {
  const [imageCount, setImageCount] = useState(0);

  const handleDrop = (files: Blob[]) => {
    if (imageCount + files.length > 5) {
      return ShowNotification({
        title: 'Form Submission Error',
        message: 'Maximum Image Limit Reached .',
        color: 'red',
      });
    }

    setImageCount(imageCount + files.length);
    const prevImages = form.values.thirdStep.images;
    if (prevImages.length === 0) {
      console.log('you heere');
      return form.setFieldValue(`thirdStep.images`, files);
    }

    let allImages: Blob[] = [];

    for (let i = 0; i < prevImages.length; i++) {
      allImages.push(prevImages[i]);
    }
    for (let i = 0; i < files.length; i++) {
      allImages.push(files[i]);
    }
    return form.setFieldValue(`thirdStep.images`, allImages);
  };
  const previews = form?.values?.thirdStep?.images?.map(
    (file: Blob, index: number) => {
      const imageUrl = URL.createObjectURL(file);
      return (
        <Image
          key={index}
          width={150}
          height={200}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      );
    },
  );

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        maxFiles={5}
        sx={(theme) => ({
          minHeight: rem(120),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dashed gray.3',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],

          '&[data-accept]': {
            color: theme.white,
            backgroundColor: theme.colors.blue[6],
          },

          '&[data-reject]': {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        <Group
          position="center"
          spacing="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Group position="center">
              <IconPhoto
                style={{
                  width: rem(70),
                  height: rem(70),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </Group>
            <Text c={'dimmed'} mt={'xs'} size="md" fw={'lighter'} inline>
              Drag images here or click to select multiple images
            </Text>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
      {previews?.length >= 1 && (
        <>
          <Divider
            label={<Badge>Preview</Badge>}
            labelPosition="center"
            color="gray.3"
            mt={'xs'}
          />
          <Group
            style={{ cursor: 'pointer' }}
            onClick={() => {
              form.setFieldValue(`thirdStep.images`, []);
              setImageCount(0);
            }}
            spacing={2}
          >
            <Text c={'dimmed'} pb={rem(5)} underline>
              {previews?.length < 2 ? 'Clear image' : 'Clear images '}
            </Text>
            <IconTrash color="gray" size={'1.2em'} />
          </Group>
        </>
      )}
      <SimpleGrid
        cols={8}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews?.length > 0 ? 'xs' : 0}
      >
        {previews}
      </SimpleGrid>
    </>
  );
};

export default ImageDropper;
