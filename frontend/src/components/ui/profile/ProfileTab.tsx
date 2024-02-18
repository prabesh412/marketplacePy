import { Tabs, useMantineTheme } from '@mantine/core';
import {
  IconBookmark,
  IconMessageCircle,
  IconUpload,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useListingsMeRetrieve } from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';

import BookMarks from './Bookmark';
import MylistingCard from './MylistingCard';
import PersonalInfo from './PersonalInfo';

const tabs = [
  { label: 'Personal Info', icon: <IconMessageCircle size="1.2rem" /> },
  { label: 'Bookmark', icon: <IconBookmark size="1.2rem" /> },
  { label: 'Public Listings', icon: <IconUpload size="1.2rem" /> },
];
const ProfileTab = () => {
  const { data: myListings } = useListingsMeRetrieve();
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <Tabs h={'auto'} orientation="horizontal" defaultValue="Personal Info">
      <Tabs.List
        sx={(theme) => ({
          backgroundColor: 'white',
        })}
        grow
      >
        {tabs.map((tab, index) => (
          <Tabs.Tab value={tab.label} key={index} icon={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="Personal Info" pt="xs">
        <div>
          <PersonalInfo />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="Bookmark" pt="xs">
        <div>
          <BookMarks />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="Public Listings" pt="xs">
        <Tabs.Panel value="Public Listings">
          {Array.isArray(myListings) &&
            myListings.map((listing: Listings, index: number) => (
              <div style={{ marginBottom: theme.spacing.sm }}>
                <MylistingCard listing={listing} />
              </div>
            ))}
        </Tabs.Panel>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileTab;
