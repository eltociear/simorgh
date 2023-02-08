import React from 'react';
import { headers } from 'next/headers';
import omit from 'ramda/src/omit';
import bffFetch from '#app/routes/topic/getInitialData';
import getAgent from '#server/utilities/getAgent';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';

import LivePageLayout from './LivePageLayout';

const logger = nodeLogger(__filename);

export const dynamic = 'force-dynamic';

interface fetchProps {
  params: {
    service: Services;
    id: string;
    variant: Variants;
  };
  searchParams: {
    page?: number;
    rendererEnv?: string;
  };
}

const testFetch = async ({
  params: { service, id, variant },
  searchParams: { page },
}: fetchProps) => {
  const reqHeaders = headers();

  logger.info(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: '',
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
  });

  const data = await bffFetch({
    getAgent,
    page,
    path: `${id}`,
    service,
    variant,
  });

  const toggles = await getToggles(service);

  logger.info(ROUTING_INFORMATION, {
    url: '',
    status: data.status,
    pageType: LIVE_PAGE,
  });

  return {
    bbcOrigin: reqHeaders.get('bbc-origin') || null,
    id,
    isAmp: false,
    isNextJs: true,
    page: page || null,
    pageData: data?.pageData || null,
    pageType: LIVE_PAGE,
    pathname: '',
    service,
    showAdsBasedOnLocation: reqHeaders.get('bbc-adverts') === 'true' || false,
    status: data.status,
    timeOnServer: Date.now(), // TODO: check if needed?
    toggles,
    variant: variant?.[0] || null,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (props: any) => {
  const data = await testFetch(props);

  return <LivePageLayout {...data} />;
};
