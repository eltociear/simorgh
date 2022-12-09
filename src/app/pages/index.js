import dynamic from 'next/dynamic';

export const ArticlePage = dynamic(() => import('./ArticlePage'));
export const ErrorPage = dynamic(() => import('./ErrorPage'));
export const FrontPage = dynamic(() => import('./FrontPage'));
export const MediaAssetPage = dynamic(() => import('./MediaAssetPage'));
export const MostReadPage = dynamic(() => import('./MostReadPage'));
export const MostWatchedPage = dynamic(() => import('./MostWatchedPage'));
export const PhotoGalleryPage = dynamic(() => import('./PhotoGalleryPage'));
export const LiveRadioPage = dynamic(() => import('./LiveRadioPage'));
export const OnDemandAudioPage = dynamic(() => import('./OnDemandAudioPage'));
export const OnDemandTvPage = dynamic(() => import('./OnDemandTvPage'));
export const TopicPage = dynamic(() => import('./TopicPage'));
export const StoryPage = dynamic(() => import('./StoryPage'));
export const IdxPage = dynamic(() => import('./IdxPage'));
export const FeatureIdxPage = dynamic(() => import('./FeatureIdxPage'));
