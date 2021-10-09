import { Stack } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

export const BottomContainer = React.memo(
  ({
    children,
    justifyContentValue = 'flex-start',
    alignItemsValue = 'baseline',
    paddingX = 6,
    paddingT = 2,
    paddingB = 5,
    flexValue = 0.8,
  }) => {
    return (
      <Stack
        direction='column'
        justifyContent={justifyContentValue}
        alignItems={alignItemsValue}
        flex={flexValue}
        px={paddingX}
        pt={paddingT}
        pb={paddingB}
      >
        {children}
      </Stack>
    );
  },
);

BottomContainer.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContentValue: PropTypes.string,
  alignItemsValue: PropTypes.string,
  paddingX: PropTypes.any,
  paddingT: PropTypes.any,
  paddingB: PropTypes.any,
  flexValue: PropTypes.number,
};
