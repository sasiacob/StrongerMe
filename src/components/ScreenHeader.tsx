import {StyleSheet, View} from 'react-native';
import React from 'react';
import {lightTheme, Spacing} from '../theme';
import {Text} from '.';
interface IScreenHeaderProps {
  text: string;
}
const ScreenHeader = ({text}: IScreenHeaderProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={lightTheme.title}>{text}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: Spacing.triple,
  },
});
