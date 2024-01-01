import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';

const ListingAdded = () => {
  return (
    <Container sx={{ minHeight: '300px' }}>
      <Group position="center">
        <Title sx={{ paddingBottom: '50px' }}>
          Congratulations, your listing is now live 🎉🎉
        </Title>
      </Group>
      <Stack>
        <Text sx={{ textAlign: 'center' }}>
          Your listing is ready to be published! Only you can see it for now, it
          will be public once its reviewed.
        </Text>
        <Button size="md" sx={{ marginTop: '50px' }}>
          Go to my listings
        </Button>
      </Stack>
    </Container>
  );
};
export default ListingAdded;
