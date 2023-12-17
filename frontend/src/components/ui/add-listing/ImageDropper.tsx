import { Button, Group, Image, SimpleGrid, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { error } from 'console';
import ShowNotification from '../common/Notification';

type ImageDropperProps = {
  form: any;
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
    const prevImages = form.values.firstStep.images;
    if (prevImages.length === 0) {
      console.log('you heere');
      return form.setFieldValue(`firstStep.images`, files);
    }

    let allImages: Blob[] = [];

    for (let i = 0; i < prevImages.length; i++) {
      allImages.push(prevImages[i]);
    }
    for (let i = 0; i < files.length; i++) {
      allImages.push(files[i]);
    }
    return form.setFieldValue(`firstStep.images`, allImages);
  };
  const previews = form?.values?.firstStep?.images?.map(
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
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="md" inline>
              Drag images here or click to select images
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              You have selected
              {previews.length > 0 ? (
                <strong>
                  <strong> {previews.length} </strong>
                  {''}
                  {previews.length < 2 ? ' image' : ' images '}
                </strong>
              ) : (
                <strong> No image selected</strong>
              )}
            </Text>
          </div>
        </Group>
      </Dropzone>
      {previews.length >= 1 && (
        <Group
          style={{ cursor: 'pointer' }}
          onClick={() => {
            form.setFieldValue(`firstStep.images`, []);
            setImageCount(0);
          }}
          spacing={2}
        >
          <Text pb={rem(5)} underline>
            {previews.length < 2 ? 'Clear image' : 'Clear images '}
          </Text>
          <IconTrash size={'1.2em'} />
        </Group>
      )}
      <SimpleGrid
        cols={5}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews.length > 0 ? 'xs' : 0}
      >
        {previews}
      </SimpleGrid>
    </>
  );
};

export default ImageDropper;
