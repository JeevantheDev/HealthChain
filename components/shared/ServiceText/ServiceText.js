import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Text } from 'native-base';

export const ServiceText = React.memo(({ text, children }) => {
  return (
    <HStack justifyContent='space-between' alignItems='center' py={5}>
      <Text color='dark.400' fontSize='2xl' letterSpacing={1} fontWeight={500}>
        {text}
      </Text>
      {children}
    </HStack>
  );
});

ServiceText.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};
