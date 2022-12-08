import ms from 'ms';
import ArticlePage from '#pages/ArticlePage/ArticlePage';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import { getArticlePageProps } from '../../../lib/fake-bbc-api';

const Article = ({ pageData, mostRead }) => (
  <ArticlePage mostRead={mostRead} pageData={pageData} />
);

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  const { articleId, service } = params;
  const props = await getArticlePageProps(service, articleId);

  return {
    props,
    revalidate: ms('1h'),
  };
};

export default withOptimizelyProvider(Article);
