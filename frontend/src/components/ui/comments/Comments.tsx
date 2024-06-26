import { useStore } from '@/zustand/store';
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
  Transition,
  rem,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconDotsCircleHorizontal,
  IconMessage,
  IconMessageShare,
} from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import {
  useCommentsCreate,
  useCommentsList,
} from '../../../../orval/comments/comments';
import GetInitials from '../common/GetInitials';
import RecursiveReplies, { CommentsReplies } from './RecursiveReplies';

type CommentsProps = {
  listingSlug?: string;
};
type ActiveRepliesType = {
  [key: number]: boolean;
};

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

const Comments = ({ listingSlug }: CommentsProps) => {
  const { data: comments, refetch } = useCommentsList({ listing: listingSlug });
  const { mutate: commentMutation, isLoading } = useCommentsCreate({});
  const [activeReplies, setActiveReplies] = useState<ActiveRepliesType>({});
  const [commentValue, setCommentValue] = useState<string>('');
  const [replyValue, setReplyValue] = useState<string>('');
  const user = useStore((state) => state.profile);
  const [activeLoadMore, setActiveLoadMore] = useState<{
    [key: number]: boolean;
  }>({});
  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

  const handleLoadMoreClick = useCallback((commentId: number) => {
    setActiveLoadMore((prev) => ({ [commentId]: !prev[commentId] }));
  }, []);

  const handleReplyClick = useCallback((commentId: number) => {
    setActiveReplies((prev) => ({ [commentId]: !prev[commentId] }));
  }, []);

  const handleCommentSubmit = () => {
    notifications.show({
      id: 'comment',
      title: `Comment is getting added`,
      message: `Please wait, the comment is being added`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    const requestData = {
      data: {
        listing: listingSlug as string,
        texts: commentValue,
      },
    };
    commentMutation(requestData, {
      onSuccess: async () => {
        await refetch();
        notifications.update({
          id: 'comment',
          title: `Comment added`,
          message: `Comment added successfully`,
          loading: false,
          autoClose: true,
          withCloseButton: true,
        });
        setCommentValue('');
      },
      onError: () => {
        notifications.update({
          id: 'comment',
          title: `Comment failed`,
          message: `Comment failed`,
          loading: false,
          autoClose: true,
          withCloseButton: true,
        });
      },
    });
  };

  const handleReplySubmit = useCallback(
    (
      parentCommentId: number,
      topParentCommentId?: number | undefined,
      replyString?: string,
    ) => {
      notifications.show({
        id: 'reply',
        title: `Reply is getting added`,
        message: `Please wait, the reply is being added`,
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
      const requestData = {
        data: {
          listing: listingSlug as string,
          texts: replyString || '',
          parent: parentCommentId,
          top_parent: topParentCommentId ? topParentCommentId : parentCommentId,
        },
      };
      commentMutation(requestData, {
        onSuccess: async () => {
          await refetch();
          notifications.update({
            id: 'reply',
            title: `Reply added`,
            message: `Reply added successfully`,
            loading: false,
            autoClose: true,
            withCloseButton: true,
          });
          setReplyValue('');
          setActiveReplies((prev) => ({ ...prev, [parentCommentId]: false }));
        },
        onError: () => {
          notifications.update({
            id: 'reply',
            title: `Reply failed`,
            message: `Reply failed`,
            loading: false,
            autoClose: true,
            withCloseButton: true,
          });
        },
      });
    },
    [listingSlug, commentMutation],
  );

  return (
    <Group sx={{ position: 'relative' }}>
      <Card w={'100%'} bg={'gray.0.5'} radius={'md'}>
        <Group noWrap>
          <Avatar radius="xl" color="cyan">
            {user?.name ? GetInitials(user?.name) : ''}
          </Avatar>
          <TextInput
            w={'100%'}
            size="md"
            mt={5}
            radius={'xl'}
            value={commentValue}
            onChange={(event) => setCommentValue(event.currentTarget.value)}
            // icon={<IconMessage />}
            placeholder={'Add a comment'}
            rightSectionWidth={40}
            rightSection={
              <ActionIcon
                size={30}
                radius="xl"
                mr={'sm'}
                color={'lime'}
                variant="filled"
                onClick={handleCommentSubmit}
                disabled={isLoading}
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
        </Group>
      </Card>
      <Flex mt={-13} direction={'column'}>
        {comments?.results &&
          comments?.results.map((comment, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                marginBottom: 7,
              }}
            >
              <Paper m={4}>
                <Group>
                  {Array.isArray(comment.replies) ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 5,
                        bottom: 5,
                        left: '20px',
                        borderLeft: '3px solid #E0E0E0',
                      }}
                    />
                  ) : null}
                  <Group sx={{ backgroundColor: '#fff', zIndex: 10 }}>
                    <Avatar
                      color="lime"
                      alt="Jacob Warnhalter"
                      radius="xl"
                      sx={{ zIndex: 10, marginTop: 10, marginBottom: 5 }}
                    >
                      {comment?.user?.name?.slice(0, 2)}
                    </Avatar>
                  </Group>
                  <div>
                    <Text size="sm">{comment?.user?.name}</Text>
                    <Text size="xs" c="dimmed">
                      10 minutes ago
                    </Text>
                  </div>
                </Group>
                <Text pl={54} size="sm">
                  {comment?.texts}
                </Text>

                <Group mt={'xs'} mb={'xs'} pl={54}>
                  <Group
                    spacing={3}
                    onClick={() => handleReplyClick(comment.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <IconMessage color="gray" size={'1em'} />
                    <Text size={'xs'} c={'dimmed'}>
                      Reply
                    </Text>
                  </Group>
                  {comment?.replies && (
                    <Group
                      spacing={3}
                      onClick={() => {
                        handleLoadMoreClick(comment.id);
                        setActiveReplies((prev) => ({
                          ...prev,
                          [comment.id]: false,
                        }));
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      {activeLoadMore[comment.id] ? (
                        <IconArrowUp color="gray" size={'1em'} />
                      ) : (
                        <IconArrowDown color="gray" size={'1em'} />
                      )}

                      <Text size={'xs'} c={'dimmed'}>
                        {activeLoadMore[comment.id]
                          ? 'Hide replies'
                          : 'Load replies'}
                      </Text>
                    </Group>
                  )}

                  <IconDotsCircleHorizontal color="gray" size={'1em'} />
                </Group>
                {activeReplies[comment.id] && (
                  <TextInput
                    w={'100%'}
                    pl={52}
                    size="md"
                    onChange={(event) =>
                      setReplyValue(event.currentTarget.value)
                    }
                    value={replyValue}
                    mt={5}
                    radius={'xl'}
                    icon={<IconMessageShare />}
                    placeholder={'Leave a Reply'}
                    rightSectionWidth={40}
                    rightSection={
                      <ActionIcon
                        size={30}
                        radius="xl"
                        mr={'sm'}
                        color={'lime'}
                        variant="filled"
                        disabled={isLoading}
                        onClick={(e) =>
                          handleReplySubmit(comment.id, undefined, replyValue)
                        }
                      >
                        <IconArrowRight
                          style={{ width: rem(18), height: rem(18) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    }
                  />
                )}
              </Paper>

              <Transition
                mounted={activeLoadMore[comment.id]}
                transition={scaleY}
                duration={100}
                timingFunction="ease"
              >
                {(styles) => (
                  <Paper style={styles}>
                    {comment?.replies && (
                      <RecursiveReplies
                        replies={comment?.replies as unknown as CommentsReplies}
                        topParentCommentId={comment.id}
                        handleReplySubmit={handleReplySubmit}
                      />
                    )}
                  </Paper>
                )}
              </Transition>
            </div>
          ))}
      </Flex>
      {/*  long verfical line*/}
    </Group>
  );
};

export default React.memo(Comments);
