import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { useCategoryList } from '../../../orval/category/category';

const ImageDropper = (props: Partial<DropzoneProps>) => {
  const [imageDropping, setimageDropping] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  return (
    <Dropzone
      onDrop={(files: File[]) => {
        setimageDropping(true);
        if (imageCount + files.length <= 5) {
          setImageCount(imageCount + files.length);
          console.log('accepted files', files);
        } else {
          console.log('Maximum image limit reached');
        }
      }}
      // onReject={(files: File) => {
      //   console.log('rejected files', files);
      // }}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      maxFiles={5}
      {...props}
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
