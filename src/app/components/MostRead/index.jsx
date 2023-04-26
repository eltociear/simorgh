import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { oneOf, string, elementType, shape } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import nodeLogger from '#lib/logger.node';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import {
  MOST_READ_CLIENT_REQUEST,
  MOST_READ_FETCH_ERROR,
} from '#lib/logger.const';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { MostReadLink, MostReadItemWrapper } from './Item';
import MostReadList from './List';
import MostReadRank from './Rank';
import LastUpdated from './LastUpdated';
import processMostRead from '../../legacy/containers/MostRead/utilities/processMostRead';
import mostReadShape from '../../legacy/containers/MostRead/utilities/mostReadShape';

const logger = nodeLogger(__filename);

const MostRead = ({
  endpoint,
  columnLayout,
  size,
  initialData,
  wrapper: Wrapper,
  eventTrackingData,
}) => {
  const { isAmp } = useContext(RequestContext);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    serviceDatetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);

  const filteredData = processMostRead({
    data: initialData,
    isAmp,
    numberOfItems,
    service,
  });

  const [items, setItems] = useState(filteredData);

  const locale = serviceDatetimeLocale || datetimeLocale;

  return (
    <Wrapper>
      <MostReadList
        numberOfItems={items.length}
        dir={dir}
        columnLayout={columnLayout}
      >
        {items.map((item, i) => (
          <MostReadItemWrapper
            dir={dir}
            key={item.id}
            columnLayout={columnLayout}
            ref={viewRef}
          >
            <MostReadRank
              service={service}
              script={script}
              listIndex={i + 1}
              numberOfItems={items.length}
              dir={dir}
              columnLayout={columnLayout}
              size={size}
            />
            <MostReadLink
              dir={dir}
              service={service}
              script={script}
              title={item.title}
              href={item.href}
              size={size}
              eventTrackingData={eventTrackingData}
            >
              {shouldRenderLastUpdated(item.timestamp) && (
                <LastUpdated
                  prefix={lastUpdated}
                  script={script}
                  service={service}
                  timestamp={item.timestamp}
                  locale={locale}
                  timezone={timezone}
                />
              )}
            </MostReadLink>
          </MostReadItemWrapper>
        ))}
      </MostReadList>
    </Wrapper>
  );
};

MostRead.propTypes = {
  endpoint: string.isRequired,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
  eventTrackingData: shape({
    componentName: string,
  }),
};

MostRead.defaultProps = {
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: null,
  wrapper: React.Fragment,
  eventTrackingData: null,
};

export default MostRead;
