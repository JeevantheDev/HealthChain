import moment from 'moment';
import { Center, HStack, Icon, Image, Skeleton, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { CardContainer } from '../../shared/CardContainer/CardContainer';

export const NotificationCard = ({ notification, deleteNotification }) => {
  return (
    <CardContainer onPress={() => {}} mx={1} mb={3} py={3}>
      <Center flexDirection='row'>
        <VStack flex={0.2}>
          {notification ? (
            <Image
              size='xs'
              rounded='full'
              resizeMode='cover'
              source={{ uri: notification.user.avatar || '' }}
              alt={'avatar'}
            />
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='circle' height={6} size={12} />
          )}
        </VStack>
        <HStack flexDirection='column' flex={1}>
          {notification ? (
            <Text textAlign='left' letterSpacing={0.5} color='dark.300' fontSize='lg' fontWeight='500'>
              {notification.text}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
          {notification ? (
            <Text textAlign='left' color='gray.400' fontSize='xs' letterSpacing={2} fontWeight='100'>
              {moment(notification.createdAt).startOf('hour').fromNow()}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
        </HStack>
        <VStack flex={0.1}>
          {notification && (
            <CardContainer bg='gray.200' px={2} onPress={() => deleteNotification(notification)}>
              <Icon size='sm' justifyContent='center' alignItems='center'>
                <FontAwesomeIcon
                  style={{ alignSelf: 'center', marginHorizontal: 5, marginVertical: 2 }}
                  name='trash'
                  color={'#FF3F3F'}
                  size={16}
                />
              </Icon>
            </CardContainer>
          )}
        </VStack>
      </Center>
    </CardContainer>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.any,
  deleteNotification: PropTypes.func.isRequired,
};
