import moment from 'moment';
import { Center, HStack, Skeleton, Text, VStack, Image, Flex } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { ChatContext } from '../../../screens/privateScreens/context/chat.context';

import { ProfileContext } from '../../../screens/privateScreens/context/profile.context';
import { AuthContext } from '../../../screens/publicScreens/context/auth.context';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';
import { ACTION_TYPE } from '../../../utils/constant';
import { CardContainer } from '../../shared/CardContainer/CardContainer';
import { TextButton } from '../../shared/TextButton/TextButton';

export const RequestCard = React.memo(
  ({
    active,
    request,
    navigation,
    showActionBtn = true,
    showAttendBtn = false,
    activeIdx,
    setActiveIdx,
    onCancel,
    onAccept,
    onReschedule,
  }) => {
    const { authUser } = useContext(AuthContext);
    const { setSelectedProfile } = useContext(ProfileContext);
    const { setSelectedUser } = useContext(ChatContext);

    const onNavigateProfile = (profileObj) => {
      setSelectedProfile(profileObj);
      navigation.navigate(APPLICATION_NAVIGATION.PROFILE_SCREEN);
    };

    const onCancelPress = (requestObj) => {
      Alert.alert('Confirm', 'Are you sure to delete this ?', [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => onCancel(requestObj, ACTION_TYPE.CANCEL) },
      ]);
    };

    return (
      <CardContainer onPress={() => {}} mx={1} mb={3} py={3}>
        <Center flexDirection='row'>
          <VStack flexDirection='column' flex={1}>
            {request ? (
              <HStack flex={1}>
                <Text flex={0.3} textAlign='left' lineHeight={'40px'} color='gray.400' fontSize='xl' fontWeight='100'>
                  From:
                </Text>
                <Text
                  textAlign='left'
                  color='gray.400'
                  fontSize='xl'
                  lineHeight={'40px'}
                  letterSpacing={2}
                  fontWeight='500'
                  flex={0.7}
                >
                  {request.data.fromProfile.fullname}
                </Text>
              </HStack>
            ) : (
              <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
            )}
            {request ? (
              <HStack flex={1}>
                <Text flex={0.3} textAlign='left' lineHeight={'40px'} color='gray.400' fontSize='xl' fontWeight='100'>
                  To:
                </Text>
                <Text
                  textAlign='left'
                  lineHeight={'40px'}
                  textDecoration='underline'
                  color='primary.800'
                  fontSize='xl'
                  fontWeight='500'
                  flex={0.7}
                  onPress={() => onNavigateProfile(request.data.toProfile)}
                >
                  {request.data.toProfile.fullname}
                </Text>
              </HStack>
            ) : (
              <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
            )}
            {request ? (
              <HStack flex={1}>
                <Text flex={0.3} textAlign='left' lineHeight={'40px'} color='gray.400' fontSize='xl' fontWeight='100'>
                  Amount:
                </Text>
                <Flex flexDirection='row' flex={0.7} alignItems='center'>
                  <Image
                    resizeMode='center'
                    size='xs'
                    source={require('../../../assets/media/icons/coin-1.png')}
                    alt='coins'
                  />
                  <Text fontWeight='700' fontSize='xl' color='gray.300'>
                    x{' '}
                  </Text>
                  <Text
                    textAlign='left'
                    lineHeight={'40px'}
                    color='yellow.400'
                    fontSize='xl'
                    letterSpacing={2}
                    fontWeight='500'
                  >
                    {request.amount}
                  </Text>
                </Flex>
              </HStack>
            ) : (
              <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
            )}
            {request ? (
              <>
                {showAttendBtn && (
                  <HStack flex={1}>
                    <Text
                      flex={0.3}
                      textAlign='left'
                      lineHeight={'40px'}
                      color='gray.400'
                      fontSize='xl'
                      fontWeight='100'
                    >
                      Schedule:
                    </Text>
                    <Flex flexDirection='row' flex={0.7} alignItems='center'>
                      <Text
                        textAlign='left'
                        lineHeight={'40px'}
                        color='gray.400'
                        fontSize='lg'
                        letterSpacing={2}
                        fontWeight='500'
                      >
                        {/* {JSON.stringify(moment(request.schedule.date.toDate()).format('ll'))} */}
                        {moment(request.schedule.date.toDate()).format('ll')}(
                        {moment(request.schedule.time.toDate()).format('LT')})
                      </Text>
                    </Flex>
                  </HStack>
                )}
              </>
            ) : (
              <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
            )}
            {request ? (
              <>
                {activeIdx === active && (
                  <>
                    <VStack mb={3} flex={1}>
                      <Text
                        flex={1}
                        textAlign='left'
                        lineHeight={'40px'}
                        color='gray.400'
                        fontSize='xl'
                        fontWeight='100'
                      >
                        Description:
                      </Text>
                      <Text
                        textAlign='left'
                        color='gray.400'
                        fontSize='md'
                        lineHeight={'25px'}
                        letterSpacing={2}
                        fontWeight='500'
                        flex={1}
                      >
                        {request.description}
                      </Text>
                    </VStack>
                    {showActionBtn && request && authUser.userId === request.data.toProfile.userId && (
                      <HStack justifyContent='space-between'>
                        <TextButton
                          onPress={() => onAccept(request)}
                          width={150}
                          height={35}
                          loading={false}
                          text='Accept'
                        />
                        <TextButton
                          bg='gray.300'
                          textColor='white'
                          width={150}
                          height={35}
                          loading={false}
                          onPress={() => onCancelPress(request)}
                          text='Cancel'
                        />
                      </HStack>
                    )}
                    {showAttendBtn &&
                      request &&
                      (authUser.userId === request.data.fromProfile.userId ||
                        authUser.userId === request.data.toProfile.userId) && (
                        <VStack justifyContent='center' alignItems='center' my={2}>
                          <TextButton
                            onPress={() => {
                              setSelectedUser({ to: request.to, from: request.from });
                              navigation.navigate(APPLICATION_NAVIGATION.CHAT_SCREEN);
                            }}
                            width={150}
                            height={35}
                            loading={false}
                            text='Attend'
                            style={{ marginBottom: 10 }}
                          />
                          {authUser.userId === request.data.toProfile.userId && (
                            <TextButton
                              bg='gray.300'
                              textColor='white'
                              width={150}
                              height={35}
                              loading={false}
                              text='Reschedule'
                              onPress={() => onReschedule(request)}
                            />
                          )}
                        </VStack>
                      )}
                  </>
                )}
              </>
            ) : (
              <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
            )}
            {request && (
              <TouchableOpacity
                onPress={() => {
                  setActiveIdx(activeIdx == null ? active : activeIdx === active ? null : active);
                }}
              >
                {activeIdx === null && (
                  <Text
                    flex={1}
                    textAlign='center'
                    letterSpacing={'1px'}
                    color='gray.400'
                    fontSize='md'
                    fontWeight='100'
                    color='gray.400'
                  >
                    View
                  </Text>
                )}
                {activeIdx === active && (
                  <Text
                    flex={1}
                    textAlign='center'
                    letterSpacing={'1px'}
                    color='gray.400'
                    fontSize='md'
                    fontWeight='100'
                  >
                    {activeIdx === null ? 'View' : 'Less'}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </VStack>
        </Center>
      </CardContainer>
    );
  },
);

RequestCard.propTypes = {
  active: PropTypes.number,
  activeIdx: PropTypes.number,
  setActiveIdx: PropTypes.func.isRequired,
  request: PropTypes.any,
  navigation: PropTypes.object,
  showActionBtn: PropTypes.bool,
  showAttendBtn: PropTypes.bool,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  onReschedule: PropTypes.func,
};
