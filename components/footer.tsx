import metadata from '../data/metadata';
import { FooterContainer, FooterInner, BlogInfo } from './Footer.style';

const Footer = () => {
  return (
    <FooterContainer>
      {metadata.meta.title}
      <FooterInner>
        <BlogInfo href={metadata.repo} rel="noreferrer">
          Raoun4136-dev
        </BlogInfo>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
