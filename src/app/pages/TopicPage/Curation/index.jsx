import React from 'react';
import { arrayOf, oneOf, shape, string, number } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import CurationGrid from './CurationGrid';
import HierarchicalGrid from '../HierarchicalGrid';
import Subheading from './Subhead';
import { VISUAL_PROMINENCE, VISUAL_STYLE } from '../constants';

// Maps a visual style and prominence to a component that renders that curation
const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINENCE.NORMAL]: CurationGrid,
    [VISUAL_PROMINENCE.HIGH]: HierarchicalGrid,
  },
};

const Curation = ({
  visualStyle,
  visualProminence,
  promos,
  title,
  topStoriesTitle,
  link,
  headingLevel,
  position,
  curationLength,
}) => {
  if (visualStyle === VISUAL_STYLE.BANNER) return null;
  if (!promos.length) return null;
  const Component = pathOr(
    CurationGrid,
    [visualStyle, visualProminence],
    components,
  );

  const createID = titleText => {
    return titleText.replaceAll(' ', '-');
  };

  const isFirstCuration = position === 0;
  const SubheadingComponent = isFirstCuration ? VisuallyHiddenText : Subheading;
  const id = createID(title || topStoriesTitle);

  return curationLength > 1 && (title || isFirstCuration) ? (
    <section aria-labelledby={id} role="region">
      <SubheadingComponent as="h2" a11yID={id} id={id} link={link}>
        {title || topStoriesTitle}
      </SubheadingComponent>
      <Component
        promos={promos}
        headingLevel={isFirstCuration ? 3 : headingLevel}
      />
    </section>
  ) : (
    <Component promos={promos} headingLevel={headingLevel} />
  );
};

Curation.propTypes = {
  visualStyle: oneOf(Object.values(VISUAL_STYLE)).isRequired,
  visualProminence: oneOf(Object.values(VISUAL_PROMINENCE)).isRequired,
  promos: arrayOf(shape({})).isRequired,
  title: string,
  link: string,
  headingLevel: number,
  position: number.isRequired,
  topStoriesTitle: string,
  curationLength: number.isRequired,
};

Curation.defaultProps = {
  title: '',
  link: '',
  headingLevel: 2,
  topStoriesTitle: '',
};

export default Curation;
