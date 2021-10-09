import React from 'react';
import PropTypes from 'prop-types';
import { Center, Image, Text } from 'native-base';
import { CardContainer } from '../../shared/CardContainer/CardContainer';

export const ProfessionCard = ({ profession, onChooseCard }) => {
  return (
    <CardContainer onPress={() => onChooseCard([profession.type])} mr={3} ml={1} py={2}>
      <Center>
        <Image size='md' resizeMode='cover' source={profession.icon || ''} alt={profession.value} />
        <Text textAlign='center' color='dark.400' fontSize='sm' letterSpacing={1} fontWeight='500'>
          {profession.value}
        </Text>
      </Center>
    </CardContainer>
  );
};

ProfessionCard.propTypes = {
  profession: PropTypes.object.isRequired,
  onChooseCard: PropTypes.func.isRequired,
};
