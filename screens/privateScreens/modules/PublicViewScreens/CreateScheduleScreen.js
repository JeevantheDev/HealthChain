import { Box, Center, Image, Modal, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { ProfileCard } from '../../../../components/cards/ProfileCard/ProfileCard';
import { ModalPortal } from '../../../../components/ModalPortal/ModalPortal';
import { ScheduleForm } from '../../../../components/ScheduleForm/ScheduleForm';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import Firebase from '../../../../config/firebase';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { FORM } from '../../../../utils/constant';
import { ACCOUNT } from '../../../../utils/validators';
import { FormContext } from '../../../context/form.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ChatContext } from '../../context/chat.context';
import { ProfileContext } from '../../context/profile.context';

const db = Firebase.firestore();
const TEMP =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus non odio finibus mattis. Quisque venenatis tellus ligula. Etiam at ex placerat, auctor tortor vitae, tristique massa. Vivamus ac varius ';

const CreateScheduleScreen = ({ navigation }) => {
  const { selectedProfile } = useContext(ProfileContext);
  const { authUser, authProfile, setAuthProfile } = useContext(AuthContext);
  const { setFormSuccess, setFormError, setRespError } = useContext(FormContext);
  const { sendMessage } = useContext(ChatContext);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formObj, setFormObj] = useState({
    from: '',
    to: '',
    description: '',
    amount: '30',
  });
  useEffect(() => {
    setFormError(null);
    setFormObj((state) => ({
      ...state,
      from: authUser.userId,
      to: selectedProfile.data.userId,
      description: TEMP,
      amount: '30',
    }));
  }, [authUser, selectedProfile]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleTextChange = useCallback(
    ({ type, value }) => {
      setFormObj((state) => ({
        ...state,
        [type]: value,
      }));
    },
    [setFormObj],
  );

  const onPressRequest = () => {
    const { description, amount } = formObj;

    setFormError({
      description: ACCOUNT.validDescription(description) || '',
      amount: ACCOUNT.validAmount(amount, authProfile.coins) || '',
    });

    if (ACCOUNT.validDescription(description) || ACCOUNT.validAmount(amount, authProfile.coins)) return;
    try {
      setIsLoading(true);
      db.collection('pending-transactions')
        .add({
          ...formObj,
          amount: parseInt(amount),
          data: {
            fromProfile: {
              data: {
                coins: authProfile.coins,
                description: authProfile.description,
                profession: authProfile.profession,
                specalization: authProfile.specalization,
                totalExperience: authProfile.totalExperience,
                userId: authUser.userId,
              },
              profileId: authProfile.profileId,
              ...authUser,
            },
            toProfile: { ...selectedProfile },
          },
        })
        .then(() => {
          db.collection('profiles')
            .doc(authProfile.profileId)
            .set({
              description: authProfile.description,
              profession: authProfile.profession,
              specalization: authProfile.specalization,
              totalExperience: authProfile.totalExperience,
              userId: authUser.userId,
              coins: authProfile.coins - amount,
            })
            .then(() => {
              setFormSuccess(FORM.SUCCESS.REQUEST);
              setAuthProfile({ ...authProfile, coins: authProfile.coins - amount });
              sendMessage(
                [
                  {
                    text: 'New Pending Request',
                    isRead: false,
                    user: { ...authUser, _id: selectedProfile.userId },
                  },
                ],
                'notifications',
                { to: selectedProfile.userId, from: authUser.userId },
              );
              setShowModal(true);
            })
            .catch((err) => setRespError(err.message));
        })
        .catch((err) => setRespError(err.message))
        .finally(() => setIsLoading(false));
    } catch (error) {
      setRespError(error.message);
      setIsLoading(false);
    }
  };

  const onPressContinue = () => {
    setShowModal(false);
    navigation.navigate(APPLICATION_NAVIGATION.TAB_ACCOUNT);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
          <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
            <ScrollView>
              <VStack my={4}>
                <ProfileCard profile={selectedProfile} />
              </VStack>
              <VStack my={1}>
                <Text textAlign='left' letterSpacing={1} fontSize='2xl' color='dark.400' fontWeight={500}>
                  Schedule Info
                </Text>
                <Box>
                  <ScheduleForm formObj={formObj} handleTextChange={handleTextChange} />
                </Box>
                <Box mt={'auto'} alignItems='stretch'>
                  <TextButton
                    width='100%'
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={() => onPressRequest()}
                    text={isLoading ? 'Loading...' : 'Request'}
                  />
                </Box>
              </VStack>
            </ScrollView>
          </BottomContainer>
        </Stack>
      </TouchableWithoutFeedback>
      <ModalPortal showModal={showModal} closeModal={closeModal}>
        <Modal.Body>
          <Center>
            <Image
              size='2xl'
              resizeMode='contain'
              source={require('../../../../assets/media/icons/coins.png')}
              alt='coins'
            />
            <Text mb={2} fontSize='2xl' color='red.500' fontWeight={500}>
              - {formObj.amount} / {authProfile.coins}
            </Text>
            <TextButton loading={false} disabled={false} onPress={() => onPressContinue()} text={'Continue'} />
          </Center>
        </Modal.Body>
      </ModalPortal>
    </>
  );
};

CreateScheduleScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreateScheduleScreen;
