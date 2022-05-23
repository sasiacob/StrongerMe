import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import {lightTheme} from '../../theme';

interface ICardProps extends ViewProps {
  children: React.ReactNode;
  fill?: boolean;
  transparent?: boolean;
}

const Container = ({
  children,
  transparent = false,
  fill,
  style,
  ...props
}: ICardProps) => {
  return (
    <View
      {...props}
      style={[
        !transparent && lightTheme.backgroundColor,
        fill && styles.fill,
        style,
      ]}>
      {React.Children.only(children)}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
