import {
  Text,
  Card,
  Group,
  createStyles,
  Avatar,
  Divider,
  Badge,
  ActionIcon,
  Menu,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCheck,
  IconClock,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { BookmarkProfile, Listings } from '../../../../orval/model';
import {
  getListingsMeRetrieveQueryKey,
  useListingsDestroy,
  useListingsUpdate,
} from '../../../../orval/listings/listings';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import {
  useBookmarksMeRetrieve,
  useBookmarksProfileRetrieve,
} from '../../../../orval/bookmarks/bookmarks';
import HorizontalCard from '../listing/HorizontalCard';

type HorizontalCardProps = {
  listing: Listings;
};
const BookMarks = () => {
  const deleteMutation = useListingsDestroy();
  const { data: bookmarks } = useBookmarksProfileRetrieve();
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const handleDelete = (slug: string) => {
    notifications.show({
      id: 'userListing',
      title: `Deleting your listing`,
      message: `Please wait while we delete your listing`,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    }),
      deleteMutation.mutate(
        { slug: slug },
        {
          onSuccess: () => {
            notifications.update({
              id: 'userListing',
              title: `Listing successfully deleted`,
              color: 'green',
              message: 'Successfully deleted your listing!',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
            queryClient.invalidateQueries(getListingsMeRetrieveQueryKey());
          },
          onError: () => {
            notifications.update({
              id: 'userListing',
              title: `Error deleting your listing`,
              color: 'red',
              message: 'Unexpected error occured while deleting your listing',
              loading: false,
              autoClose: true,
              withCloseButton: true,
            });
          },
        },
      );
  };
  const router = useRouter();
  return (
    <>
      {bookmarks &&
        bookmarks?.map((bookmark: BookmarkProfile) => (
          <div
            style={{ marginBottom: theme.spacing.sm }}
            key={bookmark.listing.slug}
          >
            <HorizontalCard
              key={bookmark?.listing?.slug}
              isBookmark={true}
              bookmarkId={bookmark?.id}
              listing={bookmark.listing}
            />
          </div>
        ))}
    </>
  );
};

export default BookMarks;
