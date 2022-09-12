import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { Services, Variants } from '../../models/types/global';
import ThemeProvider from '../ThemeProvider';
import InlineLink from '.';
import Text from '../Text';

interface Props {
  children: React.ReactNode;
  service: Services;
  variant: Variants;
  text: string;
}

const Providers = ({ children, service, variant }: Omit<Props, 'text'>) => (
  <ThemeProvider service={service} variant={variant}>
    <ServiceContextProvider service={service} variant={variant}>
      {children}
    </ServiceContextProvider>
  </ThemeProvider>
);

const InlineLinkStory = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => (
  <Providers service={service} variant={variant}>
    <InlineLink to="/" text={text} />
  </Providers>
);

const InsideTextStory = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => {
  const words = text.split(' ');
  const randomNumber = Math.floor(Math.random() * words.length);
  const randomWord = words[randomNumber];

  return (
    <Providers service={service} variant={variant}>
      <Text fontVariant="sansBoldItalic">
        {words.slice(0, randomNumber).join(' ')}
        &nbsp;
        <InlineLink to="http://bbc.com" text={randomWord} />
        &nbsp;
        {words.slice(randomNumber + 1).join(' ')}
      </Text>
    </Providers>
  );
};

export default {
  title: 'NewComponents/InlineLink',
  Component: InlineLinkStory,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = InlineLinkStory;
export const InsideText = InsideTextStory;
