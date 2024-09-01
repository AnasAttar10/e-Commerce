import { useAppSelector } from '@store/hooks';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <h2>Account Information </h2>
      <p>
        userName : {user.firstName} {user.lastName}
      </p>
      <p>Email : {user.email}</p>
    </div>
  );
};

export default Profile;
