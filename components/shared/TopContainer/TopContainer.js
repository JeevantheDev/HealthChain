import { Box } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

export const TopContainer = React.memo(({ children, paddingX = 6, paddingT = 20, flexValue = 0.2 }) => {
  return (
    <Box direction='column' flex={flexValue} justifyContent='center' px={paddingX} pt={paddingT}>
      {children}
    </Box>
  );
});

TopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  paddingX: PropTypes.any,
  paddingT: PropTypes.any,
  flexValue: PropTypes.number,
};
