import {
  PressableProps,
  StyleSheet,
  TextStyle,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Text} from '.';
import {Colors} from '../../theme';
interface IButtonProps extends PressableProps {
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  text: string;
}
const Button = ({textStyle, text, containerStyle, ...props}: IButtonProps) => {
  return (
    <Pressable {...props}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: {
    color: Colors.surface,
    fontWeight: '600',
    padding: 16,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
});
