import {
  ProfileContainer,
  ProfileDesc,
  ProfileTitle,
  ProfileMainDesc,
  ProfileSubDesc,
  ProfileImage,
} from './Profile.style';
import Image from 'next/image';
import metadata from 'data/metadata';

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileDesc>
        <ProfileTitle>{metadata.home.name}</ProfileTitle>
        <ProfileMainDesc>{metadata.home.description}</ProfileMainDesc>
        <ProfileSubDesc>{metadata.home.subDescription}</ProfileSubDesc>
      </ProfileDesc>
      <ProfileImage>
        <Image
          src={metadata.home.image}
          width={180}
          height={180}
          alt={metadata.home.name}
        />
      </ProfileImage>
    </ProfileContainer>
  );
};

export default Profile;
