import Url from 'url-parse';

const allowList = [
  'www.bbc.com',
  'bbc.com',
  'www.bbc.co.uk',
  'bbc.co.uk',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const makeRelativeUrlPath = (urlPath, isLow = false) => {
  if (!urlPath) return null;

  const url = new Url(urlPath);
  const isBBCDomain = allowList.some(domain => url.hostname === domain);

  if (isBBCDomain) {
    return `${url.pathname}${url.query}${url.hash}${isLow ? '.low' : ''}`;
  }

  return urlPath;
};

export default makeRelativeUrlPath;
