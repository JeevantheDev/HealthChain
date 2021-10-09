import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

export const KeyboardDissmiss = React.memo(({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => (onPress ? onPress() : {})}>
      <View>
        <View pointerEvents='none'>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
});

KeyboardDissmiss.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
};
