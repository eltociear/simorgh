import dynamic from 'next/dynamic';
import { Services, Variants } from '../../models/types/global';
import defaultServiceVariants from './defaultServiceVariants';

interface Props {
  service: Services;
  variant: Variants;
}

const getPathToTheme = (props: Props) => {
  return 'mundo';
  const variant = props.variant || defaultServiceVariants[props.service];

  if (variant === 'default' || !variant) {
    return props.service;
  }

  return `${props.service}/${variant}`;
};

const loadTheme = (props: Props) => import(`./themes/${getPathToTheme(props)}`);

const ThemeProvider = dynamic(loadTheme);

export default ThemeProvider;
