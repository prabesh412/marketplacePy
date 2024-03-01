import { useMantineTheme } from '@mantine/core';
import { useBookmarksProfileRetrieve } from '../../../../orval/bookmarks/bookmarks';
import { BookmarkProfile, Listings } from '../../../../orval/model';
import HorizontalCard from '../listing/HorizontalCard';

type HorizontalCardProps = {
  listing: Listings;
};
const BookMarks = () => {
  const { data: bookmarks } = useBookmarksProfileRetrieve();
  const theme = useMantineTheme();

  return (
    <>
      {bookmarks &&
        Array.isArray(bookmarks) &&
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
