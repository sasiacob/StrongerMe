import {View, ViewProps} from 'react-native';
import React from 'react';
import {lightTheme} from '../../theme';

interface ICardProps extends ViewProps {
  children: React.ReactNode;
}

const Card = ({children, style, ...props}: ICardProps) => {
  return (
    <View {...props} style={[lightTheme.card, lightTheme.shadowed, style]}>
      {children}
    </View>
  );
};

export default Card;
