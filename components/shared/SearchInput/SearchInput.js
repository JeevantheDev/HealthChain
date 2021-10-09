import { Box, Icon, IconButton, Image, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { ProfileContext } from '../../../screens/privateScreens/context/profile.context';

export const SearchInput = ({ title, height = 60, width = '100%' }) => {
  const { filterQuery, updateFilterQuery } = useContext(ProfileContext);
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(filterQuery.search);
  }, [filterQuery]);

  const onPressSearch = () => {
    updateFilterQuery({
      type: 'search',
      value: input,
    });
  };

  return (
    <Box>
      {title && (
        <Text fontSize='xl' letterSpacing={1} textAlign='center' fontWeight={500}>
          {title}
        </Text>
      )}
      <Input
        bg='primary.100'
        color='dark.400'
        letterSpacing={2}
        _dark={{
          placeholderTextColor: 'dark.300',
        }}
        value={input}
        onChangeText={(text) => setInput(text)}
        borderRadius={20}
        mt={10}
        width={width}
        height={height}
        placeholder='Search Doctors...'
        InputRightElement={
          <IconButton
            onPress={() => onPressSearch()}
            variant={'solid'}
            size='md'
            bg='yellow.500'
            icon={
              <Icon size='lg'>
                <Image
                  size='xs'
                  resizeMode='center'
                  source={require('../../../assets/media/icons/search.png')}
                  alt='search'
                />
              </Icon>
            }
          />
        }
      />
    </Box>
  );
};

SearchInput.propTypes = {
  title: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  navigation: PropTypes.object,
};
