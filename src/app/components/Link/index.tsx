/** @jsx jsx */

import React, { FC, HTMLAttributes } from 'react';
import { jsx } from '@emotion/react';
import { Link as ClientSideRouteLink } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import { articlePath } from '../../routes/utils/regex';

interface Props extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  to: string;
}

const Link: FC<Props> = ({
  className,
  children,
  to,
  ...htmlAttributes
}: Props) => {
  const ClientSideRouteLinkProps = pathToRegexp(articlePath, [], {
    start: false,
    end: false,
  }).exec(to);
  const locationProps = ClientSideRouteLinkProps?.length
    ? {
        to: {
          pathname: ClientSideRouteLinkProps[0],
          hash: to.split('#')[1],
        },
      }
    : {
        href: to,
      };
  const Component = ClientSideRouteLinkProps ? ClientSideRouteLink : 'a';

  return (
    <Component className={className} {...htmlAttributes} {...locationProps}>
      {children}
    </Component>
  );
};

export default Link;
