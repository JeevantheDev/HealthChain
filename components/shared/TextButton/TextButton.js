import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

export const TextButton = React.memo(
  ({
    disabled = false,
    loading,
    text,
    onPress,
    width = 300,
    height = 60,
    bg = 'yellow.500',
    textColor = 'dark.400',
    style = {},
    ...props
  }) => {
    return (
      <Button
        isLoading={loading || false}
        disabled={disabled || false}
        onPress={onPress ? onPress : () => {}}
        width={width}
        height={height}
        bg={bg}
        borderRadius={50}
        size='lg'
        style={style}
        {...props}
      >
        <Text color={textColor} fontSize={width === 300 || width === '100%' ? 'xl' : 'lg'} fontWeight='500'>
          {text}
        </Text>
      </Button>
    );
  },
);

TextButton.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  width: PropTypes.any,
  height: PropTypes.any,
  bg: PropTypes.string,
  textColor: PropTypes.string,
  style: PropTypes.object,
};
