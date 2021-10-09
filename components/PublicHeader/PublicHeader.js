import { Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';

export const PublicHeader = React.memo(({ texts, textDesc }) => {
  return (
    <>
      {texts.map((text, idx) => (
        <Text key={idx} fontSize='4xl' color={text.color} letterSpacing={3} fontWeight='bold'>
          {text.value}{' '}
          <Text fontSize='4xl' letterSpacing={3} color={text.nested.color} fontWeight='bold'>
            {text.nested.value}
          </Text>
        </Text>
      ))}
      <Text letterSpacing={1} lineHeight={'25px'} fontSize='sm' fontWeight='100'>
        {textDesc}
      </Text>
    </>
  );
});

PublicHeader.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  textDesc: PropTypes.string,
};
