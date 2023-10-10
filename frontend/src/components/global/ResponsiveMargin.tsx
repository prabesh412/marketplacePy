import { useMediaQuery } from '@mantine/hooks';

const ResponsiveMargin = () => {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279px)',
  );
  const isExtraLargeScreen = useMediaQuery('(min-width: 1920px)');

  const marginValues = {
    small: { margin: '0 1em' },
    medium: { margin: '0 2em' },
    large: { margin: '0 6em' },
    extraLarge: { margin: '0 10em' },
  };

  const marginStyle = isSmallScreen
    ? marginValues.small
    : isMediumScreen
    ? marginValues.medium
    : isExtraLargeScreen
    ? marginValues.extraLarge
    : marginValues.large;

  return marginStyle;
};

export default ResponsiveMargin;
