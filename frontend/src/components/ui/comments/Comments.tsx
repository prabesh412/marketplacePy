import React, { useState } from 'react';
import {
  Text,
  Avatar,
  Group,
  Box,
  Paper,
  Flex,
  Divider,
  Card,
  TextInput,
  ActionIcon,
  rem,
} from '@mantine/core';
import { useCommentsList } from '../../../../orval/comments/comments';
import RecursiveReplies, { CommentsReplies } from './RecursiveReplies';
import {
  IconArrowRight,
  IconDotsCircleHorizontal,
  IconMessage,
  IconMessageShare,
  IconThumbUp,
} from '@tabler/icons-react';

type CommentsProps = {
  listingSlug?: string;
};
type ActiveRepliesType = {
  [key: number]: boolean;
};
const Comments = ({ listingSlug }: CommentsProps) => {
  const { data: comments } = useCommentsList({ listing: listingSlug });
  const [activeReplies, setActiveReplies] = useState<ActiveRepliesType>({});
  const handleReplyClick = (commentId: number) => {
    setActiveReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <Group sx={{ position: 'relative' }}>
      <TextInput
        w={'100%'}
        // className={classes.textInput}
        // value={searchValue}
        // onChange={(event) => setSearchValue(event.target.value)}
        size="md"
        mt={5}
        radius={'xl'}
        icon={<IconMessage />}
        placeholder={'Add a comment'}
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
      />{' '}
      <Flex mt={-13} direction={'column'}>
        {comments?.results &&
          comments?.results.map((comment) => (
            <>
              <div
                key={comment.id}
                style={{
                  position: 'relative',
                  marginBottom: 7,
                }}
              >
                <Paper m={4}>
                  <Group key={comment.id}>
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
                    <Group spacing={3}>
                      <IconThumbUp color="gray" size={'1em'} />
                      <Text size={'xs'} c={'dimmed'}>
                        Like
                      </Text>
                    </Group>
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
                    <IconDotsCircleHorizontal color="gray" size={'1em'} />
                  </Group>
                  {activeReplies[comment.id] && (
                    <TextInput
                      w={'100%'}
                      pl={52}
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
                {comment?.replies && (
                  <RecursiveReplies
                    replies={comment?.replies as unknown as CommentsReplies}
                  />
                )}
              </div>
            </>
          ))}
      </Flex>
      {/*  long verfical line*/}
    </Group>
  );
};

export default Comments;
