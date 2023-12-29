import React, { useRef } from 'react';
import { Group, Tabs, Text, useMantineTheme } from '@mantine/core';
import {
  IconClockCancel,
  IconMessageCircle,
  IconPencil,
  IconSettings,
  IconUpload,
} from '@tabler/icons-react';
import { useListingsMeRetrieve } from '../../../../orval/listings/listings';
import { Listings } from '../../../../orval/model';
import { useRouter } from 'next/router';
import PersonalInfo from './PersonalInfo';

import MylistingCard from './MylistingCard';

const tabs = [
  { label: 'Personal Info', icon: <IconMessageCircle size="1.2rem" /> },
  { label: 'Inbox', icon: <IconMessageCircle size="1.2rem" /> },
  { label: 'Pending Listings', icon: <IconClockCancel size="1.2rem" /> },
  { label: 'Manage Listings', icon: <IconPencil size="1.2rem" /> },
  { label: 'Public Listings', icon: <IconUpload size="1.2rem" /> },
  { label: 'settings', icon: <IconSettings size="1.2rem" /> },
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
        <PersonalInfo />
      </Tabs.Panel>

      <Tabs.Panel value="Public Listings" pt="xs">
        <Tabs.Panel value="Public Listings">
          {Array.isArray(myListings) ? (
            myListings.map((listing: Listings, index: number) => (
              <MylistingCard listing={listing} />
            ))
          ) : (
            <Group spacing={5}>
              <Text c={'dimmed'}>You haven't uploaded anything yet,</Text>
              <Text
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  router.push('http://localhost:3000/listing/listing-add')
                }
                c={theme.primaryColor}
                underline
              >
                upload a listing now
              </Text>
            </Group>
          )}
        </Tabs.Panel>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileTab;
