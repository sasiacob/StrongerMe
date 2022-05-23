import {StyleSheet, Text as RNText, TextProps, View} from 'react-native';
import React from 'react';
import {lightTheme} from '../../theme';

interface ITextProps extends TextProps {
  children: React.ReactNode;
}

const Text = ({children, style}: ITextProps) => {
  return <RNText style={[lightTheme.bodyText1, style]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({});
