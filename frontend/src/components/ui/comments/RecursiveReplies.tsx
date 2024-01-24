import React, { useCallback, useState } from 'react';
import {
  Text,
  Avatar,
  Group,
  Paper,
  Box,
  Flex,
  TextInput,
  ActionIcon,
  rem,
} from '@mantine/core';
import {
  IconArrowRight,
  IconDotsCircleHorizontal,
  IconMessage,
  IconMessageShare,
} from '@tabler/icons-react';

type CommentsReply = {
  id: number;
  texts: string;
  user: {
    name: string;
  };
  replies: CommentsReply[];
  parent: number;
};

export type CommentsReplies = CommentsReply[];

type RecursiveRepliesProps = {
  replies?: CommentsReplies;
  handleReplySubmit: (
    parentCommentId: number,
    topParentCommentId: number,
    replyValue: string,
  ) => void;
  topParentCommentId: number;
};

const RecursiveReplies = ({
  replies,
  handleReplySubmit,
  topParentCommentId,
}: RecursiveRepliesProps) => {
  const [replyValue, setReplyValue] = useState<string>('');
  const [activeReplies, setActiveReplies] = useState<{
    [key: number]: boolean;
  }>({});

  const handleReplyClick = useCallback((commentId: number) => {
    setActiveReplies((prev) => ({ [commentId]: !prev[commentId] }));
  }, []);

  const renderReplies = (replies: CommentsReplies) => {
    return (
      <Group mt={'sm'} pl={25} sx={{ position: 'relative' }}>
        <Flex direction={'column'}>
          {replies &&
            replies?.map((reply) => (
              <div key={reply.id} style={{ position: 'relative' }}>
                <Paper m={4}>
                  <Group>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        bottom: 5,
                        left: '20px',
                        borderLeft: '3px solid #E0E0E0',
                      }}
                    />

                    <Avatar radius="xl" color="cyan">
                      {reply?.user?.name?.slice(0, 2)}
                    </Avatar>
                    <div>
                      <Text size="sm">{reply?.user?.name}</Text>
                      <Text size="xs" c="dimmed">
                        10 minutes ago
                      </Text>
                    </div>
                  </Group>
                  <Text pl={54} size="sm" w={'100%'}>
                    {reply?.texts}
                  </Text>
                  <Group mt={'xs'} mb={'xs'} pl={54}>
                    <Group
                      spacing={3}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleReplyClick(reply.id)}
                    >
                      <IconMessage color="gray" size={'1em'} />
                      <Text size={'xs'} c={'dimmed'}>
                        Reply
                      </Text>
                    </Group>
                    <IconDotsCircleHorizontal color="gray" size={'1em'} />
                  </Group>
                  {activeReplies[reply.id] && (
                    <TextInput
                      w={'100%'}
                      pl={50}
                      onChange={(event) =>
                        setReplyValue(event.currentTarget.value)
                      }
                      value={replyValue}
                      size="md"
                      mt={5}
                      radius={'xl'}
                      sx={{ width: '100%' }}
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
                          onClick={() => {
                            handleReplySubmit(
                              reply.id,
                              topParentCommentId,
                              replyValue,
                            );
                            setReplyValue('');
                            setActiveReplies((prev) => ({
                              ...prev,
                              [reply.id]: false,
                            }));
                          }}
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
                {reply.replies && reply.replies.length > 0 && (
                  <div>{renderReplies(reply.replies)}</div>
                )}
              </div>
            ))}
        </Flex>
      </Group>
    );
  };

  return <Group>{replies && renderReplies(replies)}</Group>;
};

export default React.memo(RecursiveReplies);
