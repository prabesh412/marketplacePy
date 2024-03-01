import { Alert, Button, Divider, Group, Modal, Text } from '@mantine/core';
import { IconAlertHexagon } from '@tabler/icons-react';

interface ConfirmationModalProps {
  color: string;
  text: string;
  title: string;
  isModalOpen: boolean;
  closeModal: () => void;
  confirmOperation: () => void;
}
const ConfirmationModal = ({
  color,
  isModalOpen,
  title,
  closeModal,
  confirmOperation,
  text,
}: ConfirmationModalProps) => {
  return (
    <Modal
      centered
      opened={isModalOpen}
      radius={'md'}
      onClose={closeModal}
      overlayProps={{
        blur: 3,
      }}
      title={
        <Text c={'dimmed'} fw={400}>
          {title}
        </Text>
      }
    >
      <Alert
        variant="light"
        color={color}
        title={title}
        icon={<IconAlertHexagon />}
      >
        {text}
      </Alert>
      <Divider mt={'md'} />
      <Group mt={'md'} position="right">
        <Text onClick={closeModal} style={{ cursor: 'pointer' }}>
          Cancel
        </Text>
        <Button radius={'lg'} onClick={confirmOperation} color={color}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};
export default ConfirmationModal;
