import { Box } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

export const CardContainer = React.memo(
  ({
    children,
    width = 'auto',
    height = 'auto',
    px = 5,
    py = 1,
    ml,
    mr,
    mt,
    mb,
    mx = 0,
    my = 0,
    alignItems = 'center',
    disabled = false,
    onPress,
    bg = 'white',
  }) => {
    return (
      <TouchableHighlight disabled={disabled} underlayColor={'none'} onPress={() => onPress()}>
        <Box
          alignItems={alignItems}
          bg={bg}
          borderRadius={10}
          px={px}
          py={py}
          mx={mx}
          my={my}
          ml={ml}
          mr={mr}
          mt={mt}
          mb={mb}
          width={width}
          height={height}
        >
          {children}
        </Box>
      </TouchableHighlight>
    );
  },
);

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  px: PropTypes.number,
  py: PropTypes.number,
  mx: PropTypes.number,
  my: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  alignItems: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.any,
  height: PropTypes.any,
  onPress: PropTypes.func,
  bg: PropTypes.string,
};
