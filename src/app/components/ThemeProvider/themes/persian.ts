import { GHOST, WHITE, NEWS_CORE } from '../palette';
import arabicScript from '../fontScripts/arabic';
import { REITH_QALAM_REGULAR, REITH_QALAM_BOLD } from '../fontFaces';
import reithQalamFontVariants from '../fontVariants/reithQalam';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/persian';

const persianTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: arabicScript,
    fontVariants: reithQalamFontVariants,
    fontFaces: [REITH_QALAM_REGULAR, REITH_QALAM_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(persianTheme);
