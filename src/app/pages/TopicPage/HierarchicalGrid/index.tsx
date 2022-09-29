/** @jsx jsx */

import { css, jsx, Theme } from '@emotion/react';
import Promo from '../../../legacy/components/Promo';
import { getParagon } from '../../../legacy/psammead/gel-foundations/src/typography';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';

type Summary = {
  title: string;
  description?: string;
  type: string;
  id: string;
  link?: string;
  firstPublished: string | number;
  mediaDuration?: string | number;
  imageUrl: string;
  imageAlt: string;
  mediaType?: 'audio' | 'video' | 'photogallery';
};

type Summaries = {
  summaries: Summary[];
};

const styles = {
  item: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      display: 'inline',
      paddingBottom: `${spacings.FULL}rem`,
    }),
  list: ({ mq, spacings }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      display: 'grid',
      gridGap: `${spacings.FULL}rem`,
      gridTemplateColumns: 'repeat(2, 1fr)',
      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    }),
};

const getStyles = (promoCount: number, i: number, mq: any) => {
  return css({
    [mq.GROUP_1_MAX_WIDTH]: {
      ...SMALL[promoCount - 1][i],
    },
    [mq.GROUP_2_ONLY]: {
      ...MOBILE[promoCount - 1][i],
    },
    [mq.GROUP_3_ONLY]: {
      ...TABLET[promoCount - 1][i],
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      ...DESKTOP[promoCount - 1][i],
    },
  });
};

const HiearchicalGrid = ({ summaries }: Summaries) => {
  if (!summaries || summaries.length < 3) return null;
  const summaryItems = summaries.slice(0, 12);
  return (
    <ul role="list" css={styles.list}>
      {summaryItems.map((promo, i) => {
        return (
          <li
            key={promo.id}
            css={({ mq }: Theme) => [
              styles.item,
              getStyles(summaryItems.length, i, mq),
            ]}
          >
            <Promo>
              <Promo.Image
                src={promo.imageUrl}
                alt={promo.imageAlt}
                loading="lazy"
              >
                <Promo.MediaIcon type={promo.mediaType}>
                  {promo.mediaDuration}
                </Promo.MediaIcon>
              </Promo.Image>
              <Promo.Heading typography={i === 0 ? getParagon : null}>
                <Promo.A href={promo.link}>{promo.title}</Promo.A>
              </Promo.Heading>
              <Promo.Body className="promo-paragraph">
                {promo.description}
              </Promo.Body>
              <Promo.Timestamp className="promo-timestamp">
                {promo.firstPublished}
              </Promo.Timestamp>
            </Promo>
          </li>
        );
      })}
    </ul>
  );
};

export default HiearchicalGrid;
