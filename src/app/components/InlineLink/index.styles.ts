import { css, Theme } from '@emotion/react';

const styles = {
  self: ({ palette }: Theme) =>
    css({
      color: palette.EBON,
      borderBottom: `1px solid ${palette.POSTBOX}`,
      textDecoration: 'none',
      '&:visited': {
        color: palette.METAL,
        borderBottom: `1px solid ${palette.METAL}`,
      },
      '&:focus, &:hover': {
        borderBottom: `2px solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};

export default styles;
