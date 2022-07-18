import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';
import TopStoriesSection from '.';
import { topStoriesList, topStoriesSingleItem } from './fixture';

// eslint-disable-next-line react/prop-types
const TopStories = ({ fixtureData, service = 'mundo' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <TopStoriesSection content={fixtureData} />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Related Content Promo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(<TopStories fixtureData={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Related Content Ul when given More than one Related Content', () => {
    const { getAllByRole, container } = render(
      <TopStories fixtureData={topStoriesList} />,
    );
    const listItems = getAllByRole('listitem');
    const list = container.querySelector('ul');
    expect(listItems.length).toBe(3);
    expect(list).toBeInTheDocument();
  });

  it('should render a default title if translations are not available', () => {
    const { getByText } = render(
      <TopStories fixtureData={topStoriesList} service="news" />,
    );

    const label = getByText(`Top Stories`);
    expect(label).toBeInTheDocument();
  });

  it('should have a "region" role', () => {
    const { getByRole } = render(<TopStories fixtureData={topStoriesList} />);
    const region = getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it("should have a section labelled-by the section label's id", () => {
    const { getByRole, getByText } = render(
      <TopStories fixtureData={topStoriesList} />,
    );
    const regionLabelId = getByRole('region').getAttribute('aria-labelledBy');
    const LabelLabelId = getByText('Principales noticias').getAttribute('id');
    expect(regionLabelId).toBe(LabelLabelId);
  });

  it('should render RelatedContent component without <ul> and <li> when given single item in collection', () => {
    const { queryAllByRole, queryByRole } = render(
      <TopStories fixtureData={topStoriesSingleItem} />,
    );
    const listItems = queryAllByRole('listitem');
    const list = queryByRole('list');

    expect(listItems.length).toBe(0);
    expect(list).toBeNull();
  });
});

describe('Event Tracking', () => {
  it('should implement 3 BLOCK level click trackers(1 for each promo item) and 0 link level click trackers', () => {
    const expected = {
      componentName: 'top-stories',
      preventNavigation: true,
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(<TopStories fixtureData={topStoriesList} />);

    const [
      [blockLevelTrackingItem1],
      [linkLevelTrackingItem1],

      [blockLevelTrackingItem2],
      [linkLevelTrackingItem2],

      [blockLevelTrackingItem3],
      [linkLevelTrackingItem3],
    ] = clickTrackerSpy.mock.calls;

    expect(blockLevelTrackingItem1).toEqual(expected);
    expect(linkLevelTrackingItem1).toEqual({});

    expect(blockLevelTrackingItem2).toEqual(expected);
    expect(linkLevelTrackingItem2).toEqual({});

    expect(blockLevelTrackingItem3).toEqual(expected);
    expect(linkLevelTrackingItem3).toEqual({});
  });

  it('should implement 1 BLOCK level view tracker', () => {
    const expected = {
      componentName: 'top-stories',
    };
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(<TopStories fixtureData={topStoriesList} />);

    const [[blockLevelTracking]] = viewTrackerSpy.mock.calls;

    expect(blockLevelTracking).toEqual(expected);
  });
});
