import {StyleSheet} from 'react-native';
import {Colors} from './palette';
import {FontSizeTheme, SpacingTheme} from './theme.interface';

export const fontSize: FontSizeTheme = {
  small: 12,
  regular: 14,
  large: 16,
  xLarge:24,
  title: 30,
};
export const Spacing: SpacingTheme = {
  small: 4,
  base: 8,
  double: 16,
  triple: 24,
};

export const lightTheme = StyleSheet.create({
  bodyText1: {
    color: Colors.onPrimary,
    fontSize: fontSize.regular,
  },
  bodyText2: {
    color: Colors.onSecondary,
    fontSize: fontSize.regular,
  },
  cardBgColor: {
    backgroundColor: Colors.cardBgColor,
  },
  backgroundColor: {
    backgroundColor: Colors.bgDefault,
  },
  title: {
    color: Colors.onPrimary,
    fontSize: fontSize.title,
    fontWeight: '600',
  },
  shadowed: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  card: {
    marginTop: Spacing.base,
    padding: Spacing.base,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  fill: {flex: 1},
});
