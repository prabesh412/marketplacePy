import React from 'react';
import { Text, Avatar, Group, Paper, createStyles, Box } from '@mantine/core';

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

const RecursiveReplies = ({ replies }: RecursiveRepliesProps) => {
  const renderReplies = (replies: CommentsReplies) => {
    return (
      <Group pl={25} sx={{ position: 'relative' }}>
        {replies &&
          replies?.map((reply) => (
            <div key={reply.id} style={{ position: 'relative' }}>
              <Paper m={4} key={reply.id}>
                <Group>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 5,
                      bottom: 5,
                      left: 'calc(3% )',
                      borderLeft: '3px solid #E0E0E0',
                    }}
                  />

                  <Avatar radius="xl" color="lime">
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
              </Paper>
              {reply.replies && reply.replies.length > 0 && (
                <div>{renderReplies(reply.replies)}</div>
              )}
            </div>
          ))}
      </Group>
    );
  };

  return <Group>{replies && renderReplies(replies)}</Group>;
};

export default RecursiveReplies;
