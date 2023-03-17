import metadata from 'data/metadata';
import {
  FooterContainer,
  FooterInnerContainer,
  FooterInfoContainer,
  BlogInfo,
  BlogLink,
  BlogContact,
  BlogContantContainer,
} from './Footer.style';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FooterInfoContainer>
          <BlogInfo>{metadata.meta.title}</BlogInfo>
          <BlogLink href={metadata.repo} rel="noreferrer">
            Raoun4136-dev
          </BlogLink>
        </FooterInfoContainer>

        <BlogContantContainer>
          <BlogContact href={'https://github.com/Raoun4136'}>
            <svg
              viewBox="-1.6 -1.6 19.20 19.20"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path d="m5.75 14.25s-.5-2 .5-3c0 0-2 0-3.5-1.5s-1-4.5 0-5.5c-.5-1.5.5-2.5.5-2.5s1.5 0 2.5 1c1-.5 3.5-.5 4.5 0 1-1 2.5-1 2.5-1s1 1 .5 2.5c1 1 1.5 4 0 5.5s-3.5 1.5-3.5 1.5c1 1 .5 3 .5 3"></path>{' '}
                <path d="m5.25 13.75c-1.5.5-3-.5-3.5-1"></path>{' '}
              </g>
            </svg>
          </BlogContact>
          <BlogContact href={''}>
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </BlogContact>
          <BlogContact href={''}>
            <svg
              viewBox="-51.2 -51.2 614.40 614.40"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>ionicons-v5-j</title>
                <path
                  d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48px"
                ></path>
                <path
                  d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="48px"
                ></path>
              </g>
            </svg>
          </BlogContact>
        </BlogContantContainer>
      </FooterInnerContainer>
    </FooterContainer>
  );
};

export default Footer;
