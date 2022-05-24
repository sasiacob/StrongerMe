import {StyleSheet, Text as RNText, TextProps, View} from 'react-native';
import React from 'react';
import {lightTheme} from '../../theme';

interface ITextProps extends TextProps {
  children: React.ReactNode;
  strong?: boolean;
}

const Text = ({children, strong = false, style}: ITextProps) => {
  return (
    <RNText style={[lightTheme.bodyText1, strong && styles.strong, style]}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  strong: {
    fontWeight: '600',
  },
});
