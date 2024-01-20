import React from 'react';
import { Text, Avatar, Group, Box, Paper } from '@mantine/core';
import { useCommentsList } from '../../../../orval/comments/comments';
import RecursiveReplies, { CommentsReplies } from './RecursiveReplies';
import Background from '@/components/global/Background';

type CommentsProps = {
  listingSlug?: string;
};

const Comments = ({ listingSlug }: CommentsProps) => {
  const { data: comments } = useCommentsList({ listing: listingSlug });
  console.log(Array.isArray(comments?.results?.[1]?.replies));

  return (
    <Group sx={{ position: 'relative' }}>
      {comments?.results &&
        comments?.results.map((comment) => (
          <>
            <div key={comment.id} style={{ position: 'relative' }}>
              <Paper m={4}>
                <Group key={comment.id}>
                  {Array.isArray(comment.replies) ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 5,
                        bottom: 5,
                        left: 'calc(3% )',
                        borderLeft: '3px solid #E0E0E0',
                      }}
                    />
                  ) : null}
                  <Group sx={{ backgroundColor: '#fff', zIndex: 10 }}>
                    <Avatar
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                      alt="Jacob Warnhalter"
                      radius="xl"
                      sx={{ zIndex: 10, marginTop: 10, marginBottom: 5 }}
                    />
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
              </Paper>
              {comment?.replies && (
                <RecursiveReplies
                  replies={comment?.replies as unknown as CommentsReplies}
                />
              )}
            </div>
          </>
        ))}
      {/*  long verfical line*/}
    </Group>
  );
};

export default Comments;
