import React from 'react';
import dynamic from 'next/dynamic';

export default dynamic(
  () =>
    import(
      /* webpackChunkName: "frosted_promo" */
      '.'
    ),
  { fallback: <span data-testid="frosted-promo-loader" /> },
);
