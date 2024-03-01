import {
  ActionIcon,
  CopyButton,
  Group,
  Modal,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

// Adjust the interface if you're using TypeScript, otherwise, ensure the props are passed correctly in JSX.
interface ShareSocialMediaModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  shareUrl: string;
  title: string;
  size?: number;
}

const ShareSocialMediaModal = ({
  opened,
  setOpened,
  shareUrl,
  title,
  size,
}: ShareSocialMediaModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        radius={'md'}
        onClose={() => setOpened(false)}
        title={
          <>
            <Text c={'dimmed'} size={'xl'} underline>
              Share via
            </Text>
          </>
        }
        centered
      >
        <Group position="apart" spacing="lg">
          <FacebookShareButton url={shareUrl} title={title}>
            <FacebookIcon size={size || 45} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={size || 45} round />
          </TwitterShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="Check this product on doshrodeal.com!"
          >
            <EmailIcon size={size || 45} round />
          </EmailShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={size || 45} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={size || 45} round />
          </WhatsappShareButton>
          <CopyButton value={shareUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? 'lime' : 'gray'}
                  variant="filled"
                  size={size || 45}
                  mb={'xs'}
                  radius={'xl'}
                  onClick={copy}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(22) }} />
                  ) : (
                    <IconCopy style={{ width: rem(22) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Modal>
    </>
  );
};

export default ShareSocialMediaModal;
