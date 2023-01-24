import metadata from '../data/metadata';
import Image from 'next/image';
import githubImg from 'public/social/github.png';
import mailImg from 'public/social/mail.png';
import portpolioImg from 'public/social/portpolio.png';
import github_day from 'public/social/github_day.svg';
import github_night from 'public/social/github_night.svg';
import mail_day from 'public/social/mail_day.svg';
import mail_night from 'public/social/mail_night.svg';
import portpolio_day from 'public/social/portpolio_day.svg';
import portpolio_night from 'public/social/portpolio_night.svg';
import {
  FooterContainer,
  FooterInnerContainer,
  BlogInfo,
  BlogLink,
  BlogContact,
  BlogContantContainer,
} from './Footer.style';

const Footer = () => {
  const github = github_night;
  const mail = mail_night;
  const portpolio = portpolio_night;
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <BlogInfo>{metadata.meta.title}</BlogInfo>
        <BlogLink href={metadata.repo} rel="noreferrer">
          Raoun4136-dev
        </BlogLink>
      </FooterInnerContainer>
      <BlogContantContainer>
        <BlogContact href={'https://github.com/Raoun4136'}>
          <Image src={github} alt="github" width={30} height={30}></Image>
        </BlogContact>
        <BlogContact href={''}>
          <Image src={mail} alt="mail" width={30} height={30}></Image>
        </BlogContact>
        <BlogContact href={''}>
          <Image src={portpolio} alt="portpolio" width={30} height={30}></Image>
        </BlogContact>
      </BlogContantContainer>
    </FooterContainer>
  );
};

export default Footer;
