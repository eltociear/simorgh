import React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import ArticlePage from './ArticlePage';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

// article c5jje4ejkqvo contains a Headline, a Paragraph, a timestamp
// a Portrait Image with Caption, a Landscape Image with Caption and Square Image with Caption.
import articleData from '#data/news/articles/c5jje4ejkqvo';
import articleDataWithRelatedTopics from '#data/kyrgyz/articles/c41p9ll9n0po';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';

// Not all services have fixtures for article data yet
// the service selector will be constrained to services that have article fixtures:

storiesOf('Pages/Article Page', module)
  .addDecorator(withKnobs)
  .add('Articles', () => (
    <ToggleContextProvider>
      {/* Service set to pidgin to enable most read. Article data is in english */}
      <ServiceContextProvider service="pidgin">
        <RequestContextProvider
          isAmp={false}
          pageType={ARTICLE_PAGE}
          service="pidgin"
        >
          <UserContextProvider>
            <MemoryRouter>
              <ArticlePage
                pageData={articleData}
                mostReadEndpointOverride="./data/news/mostRead/index.json"
              />
            </MemoryRouter>
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));

storiesOf('Pages/Article Page', module)
  .addDecorator(withKnobs)
  .add('With related topics', () => (
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: true,
        },
        topicsTags: {
          enabled: true,
        },
      }}
    >
      {/* Service set to pidgin to enable most read. Article data is in english */}
      <ServiceContextProvider service="kyrgyz">
        <RequestContextProvider
          isAmp={false}
          pageType={ARTICLE_PAGE}
          service="kyrgyz"
        >
          <EventTrackingContextProvider>
            <UserContextProvider>
              <MemoryRouter>
                <ArticlePage
                  pageData={articleDataWithRelatedTopics}
                  mostReadEndpointOverride="./data/news/mostRead/index.json"
                />
              </MemoryRouter>
            </UserContextProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
