import { Description, Item, Title } from './PortfolioItem.style';

const PortfolioItem = ({ title, description, link }) => {
  return (
    <Item>
      <a href={link} target="_blank">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </a>
    </Item>
  );
};

export default PortfolioItem;
