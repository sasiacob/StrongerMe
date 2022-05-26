import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface ICheckBoxProps {
  selected?: boolean;
  onPress?: () => void;
}
const CheckBox = ({onPress, selected}: ICheckBoxProps) => {
  return (
    <Pressable onPress={onPress}>
      {selected ? (
        <Icon size={25} name="checkbox-marked-circle" />
      ) : (
        <Icon size={25} name="checkbox-blank-circle-outline" />
      )}
    </Pressable>
  );
};

export default CheckBox;
