import { useUsersMeRetrieve } from '../../../../orval/users/users';
import ProfileCard from './ProfileCard';
import ProfileTab from './ProfileTab';

const ProfilePage = () => {
  const { data: userData } = useUsersMeRetrieve();
  return (
    <>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        {userData && <ProfileCard user={userData} />}
        <ProfileTab />
      </div>
    </>
  );
};

export default ProfilePage;
