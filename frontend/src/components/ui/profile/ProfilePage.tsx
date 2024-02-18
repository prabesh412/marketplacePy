import { useUsersMeRetrieve } from '../../../../orval/users/users';
import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  const { data: userData } = useUsersMeRetrieve();
  return (
    <>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        {userData && <ProfileCard user={userData} />}
      </div>
    </>
  );
};

export default ProfilePage;
