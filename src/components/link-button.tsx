import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from 'react';
import { Button, ButtonProps } from './ui/button';
import Link, { LinkProps } from 'next/link';

interface LinkButtonProps extends ButtonProps {
  href: LinkProps['href'];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
}

const LinkButton = ({ href, target, ...props }: LinkButtonProps) => {
  return (
    <Link href={href} target={target} rel="noopener noreferrer" tabIndex={-1}>
      <Button {...props} />
    </Link>
  );
};

export default LinkButton;
