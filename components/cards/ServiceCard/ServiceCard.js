import { Center, HStack, Image, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { CardContainer } from '../../shared/CardContainer/CardContainer';
import Firebase from '../../../config/firebase';
import { FormContext } from '../../../screens/context/form.context';
import { FORM } from '../../../utils/constant';

const auth = Firebase.auth();

export const ServiceCard = ({ service, navigation }) => {
  const { setFormSuccess, setRespError } = useContext(FormContext);

  const onPressCard = (service) => {
    service.name.toLowerCase() === 'logout' ? userLogout() : navigation.navigate(service.screen);
  };

  const userLogout = async () => {
    try {
      await auth
        .signOut()
        .then(() => setFormSuccess(FORM.SUCCESS.LOGOUT))
        .catch((err) => setRespError(err.message));
    } catch (error) {
      setRespError(error.message);
    }
  };

  return (
    <CardContainer alignItems='stretch' onPress={() => onPressCard(service)} mx={1} mb={5} py={3}>
      <Center flexDirection='row'>
        <HStack flex={0.8} alignItems='center'>
          <Image size='xs' resizeMode='contain' source={service.icon} alt={'icon'} />
          <Text
            ml={4}
            textAlign='center'
            lineHeight={'40px'}
            letterSpacing={1}
            color='dark.400'
            fontSize='lg'
            fontWeight={500}
          >
            {service.name}
          </Text>
        </HStack>
        <HStack justifyContent='flex-end' flex={0.2}>
          <Image size='xs' resizeMode='center' source={service.arrow} alt={'arrow'} />
        </HStack>
      </Center>
    </CardContainer>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.any,
  navigation: PropTypes.object,
};
