import {
  ProfileSection,
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
    <ProfileSection>
      <ProfileImage>
        <Image
          src={metadata.home.image}
          width={160}
          height={160}
          alt={metadata.home.name}
        />
      </ProfileImage>
      <ProfileDesc>
        <ProfileTitle>{metadata.home.name}</ProfileTitle>
        <ProfileMainDesc>{metadata.home.description}</ProfileMainDesc>
        <ProfileSubDesc>{metadata.home.subDescription}</ProfileSubDesc>
      </ProfileDesc>
    </ProfileSection>
  );
};

export default Profile;
