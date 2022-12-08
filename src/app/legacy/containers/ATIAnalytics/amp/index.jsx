import React from 'react';
import { string } from 'prop-types';
import Script from 'next/script';
import getAmpAnalyticsJson from './ampAnalyticsJson';

const JsonInlinedScript = data => (
  <Script id="amp-analytics" strategy="lazyOnload" type="application/json">
    {JSON.stringify(data)}
  </Script>
);

const AmpATIAnalytics = ({ pageviewParams }) => {
  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: process.env.SIMORGH_ATI_BASE_URL,
          pageviewParams,
        }),
      )}
    </amp-analytics>
  );
};

AmpATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default AmpATIAnalytics;
