import { Box, Divider, Text } from '@mantine/core';

interface pageProps {
  title: string;
  icon: React.ReactNode;
}
export function SectionHead({ title, icon }: pageProps) {
  return (
    <>
      <Divider
        my="sm"
        labelPosition="center"
        label={
          <>
            {icon}
            <Box ml={5}>
              <Text fz="sm">{title}</Text>
            </Box>
          </>
        }
      />{' '}
    </>
  );
}
