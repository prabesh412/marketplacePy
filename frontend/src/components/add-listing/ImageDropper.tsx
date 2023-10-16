import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import useAddListingForm from './UseAddListingForm';

const ImageDropper = () => {
  const [imageDropping, setImageDropping] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const form = useAddListingForm();

  const handleDrop = (files: []) => {
    setImageDropping(true);
    if (imageCount + files.length <= 5) {
      setImageCount(imageCount + files.length);
      const images = files.map((file) => file?.path);
      form.setFieldValue('firstStep.images', images);
    } else {
      console.log('Maximum image limit reached');
    }
  };

  return (
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
          <Text size="xl" inline>
            Drag images here or click to select images
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many as 5 images of your listing, but shouldnot exceed 5mb
            per image,
            {imageCount > 0 ? (
              <strong> {imageCount} Image selected </strong>
            ) : (
              <strong> no image selected</strong>
            )}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default ImageDropper;
