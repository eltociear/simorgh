import nodeLogger from '../../../lib/logger.node';
import { Services, Toggles, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
import addDisclaimer from '../utils/addDisclaimer';
import { advertisingAllowed, isSfv } from '../utils/paramChecks';
import { FetchError } from '../../../models/types/fetch';
import handleError from '../../utils/handleError';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import getAgent from '../../../../server/utilities/getAgent';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
  toggles?: Toggles;
  isAmp?: boolean;
};

export default async ({
  service,
  pageType,
  path: pathname,
  variant,
  toggles,
  isAmp,
}: Props) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType,
      service,
      variant,
      isAmp,
    });

    const agent = await getAgent();

    if (!json?.data?.article) {
      throw handleError('Article data is malformed', 500);
    }

    const {
      data: { article, secondaryData },
    } = json;

    const isAdvertising = advertisingAllowed(pageType, article);
    const isArticleSfv = isSfv(article);
    let wsojData = [];
    try {
      wsojData = await getOnwardsPageData({
        pathname,
        service,
        variant,
        isAdvertising,
        isArticleSfv,
        agent,
      });
    } catch (error) {
      logger.error('Recommendations JSON malformed', error);
    }

    const { topStories, features, latestMedia, mostRead, mostWatched } =
      secondaryData;

    const response = {
      status,
      pageData: {
        ...(await addDisclaimer(article, toggles, isArticleSfv)),
        secondaryColumn: {
          topStories,
          features,
          latestMedia,
        },
        mostRead,
        mostWatched,
        ...(wsojData && wsojData),
      },
    };

    return response;
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
