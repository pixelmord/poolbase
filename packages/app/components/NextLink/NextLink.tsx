/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link, LinkProps } from '@chakra-ui/core';
import { PropsWithChildren } from 'react';
import { default as NLink, LinkProps as NLinkProps } from 'next/link';
import { useI18n } from 'hooks';
type NextLinkProps = Omit<LinkProps, 'as'> & NLinkProps;

export const NextLink: React.FC<NextLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  ...rest
}: PropsWithChildren<NextLinkProps>) => {
  const { activeLocale } = useI18n();
  return (
    <NLink
      href={`/${activeLocale}${href}`}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
    >
      <Link {...rest} />
    </NLink>
  );
};
export default NextLink;
