import React from 'react';
import ProfileTab from './ProfileTab';
import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  return (
    <>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <ProfileCard />
        <ProfileTab />
      </div>
    </>
  );
};

export default ProfilePage;
