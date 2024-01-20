import React, { useState } from 'react';
import {
  Text,
  Avatar,
  Group,
  Paper,
  createStyles,
  Box,
  Flex,
  Card,
  TextInput,
  ActionIcon,
  rem,
} from '@mantine/core';
import {
  IconArrowRight,
  IconDotsCircleHorizontal,
  IconMessage,
  IconMessageShare,
  IconThumbUp,
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
};
type ActiveRepliesType = {
  [key: number]: boolean;
};
const RecursiveReplies = ({ replies }: RecursiveRepliesProps) => {
  const renderReplies = (replies: CommentsReplies) => {
    const [activeReplies, setActiveReplies] = useState<ActiveRepliesType>({});
    const handleReplyClick = (commentId: number) => {
      setActiveReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    };
    return (
      <Group mt={'sm'} pl={25} sx={{ position: 'relative' }}>
        <Flex direction={'column'}>
          {replies &&
            replies?.map((reply) => (
              <div key={reply.id} style={{ position: 'relative' }}>
                <Paper m={4} key={reply.id}>
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
                  <Text pl={54} size="sm">
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
                      // className={classes.textInput}
                      // value={searchValue}
                      // onChange={(event) => setSearchValue(event.target.value)}
                      size="md"
                      mt={5}
                      radius={'xl'}
                      icon={<IconMessageShare />}
                      placeholder={'Leave a Reply'}
                      rightSectionWidth={40}
                      rightSection={
                        <ActionIcon
                          size={30}
                          radius="xl"
                          // className={classes.actionIcon}
                          mr={'sm'}
                          color={'lime'}
                          variant="filled"
                          // onClick={() => {
                          //   if (searchValue) {
                          //     router.push(`/search?title__icontains=${searchValue}`);
                          //   }
                          // }}
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

export default RecursiveReplies;
