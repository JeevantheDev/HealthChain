import { Center, Modal, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AddDateTimeForm } from '../../../../components/AddDateTimeForm/AddDateTimeForm';
import { RequestCard } from '../../../../components/cards/RequestCard/RequestCard';
import { ModalPortal } from '../../../../components/ModalPortal/ModalPortal';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import Firebase from '../../../../config/firebase';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { ACTION_TYPE, FORM } from '../../../../utils/constant';
import { ACCOUNT } from '../../../../utils/validators';
import { FormContext } from '../../../context/form.context';
import { TransactionContext } from '../../../context/transaction.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ChatContext } from '../../context/chat.context';
import { ProfileContext } from '../../context/profile.context';

const db = Firebase.firestore();

const PendingRequestScreen = ({ navigation }) => {
  const { setRespError, setFormSuccess, setFormError } = useContext(FormContext);
  const { profileByUserId } = useContext(ProfileContext);
  const { sendMessage } = useContext(ChatContext);
  const { authProfile, setAuthProfile } = useContext(AuthContext);
  const { pendingTransactions, setPendingTransactions, getPendingTransactions } = useContext(TransactionContext);

  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [showModal, setShowModal] = useState({ switch: false, payloadObj: {} });

  const [formObj, setFormObj] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    setIsLoading(true);
    getPendingTransactions()
      .then((res) => {
        setPendingTransactions(res);
      })
      .catch((err) => {
        setRespError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setPendingTransactions();
    };
  }, []);

  const requestAction = async (requestObj, actionType) => {
    try {
      await deletePendingTx(requestObj.id)
        .then(async () => {
          const toUpdateProfile =
            actionType == ACTION_TYPE.CANCEL ? requestObj.data.fromProfile : requestObj.data.toProfile;

          await updateProfileCoins(toUpdateProfile, requestObj.amount)
            .then(() => {
              setPendingTransactions((prevTx) => prevTx.filter((tx) => tx.id !== requestObj.id));
              setFormSuccess(
                actionType == ACTION_TYPE.CANCEL ? FORM.SUCCESS.REQUEST_DELETE : FORM.SUCCESS.REQUEST_ACCEPT,
              );
              sendMessage(
                [
                  {
                    text: actionType == ACTION_TYPE.CANCEL ? 'Request is Canceled' : 'Request is Accepted',
                    isRead: false,
                    user: { ...requestObj.data.toProfile, _id: requestObj.data.toProfile.userId },
                  },
                ],
                'notifications',
                { from: requestObj.to, to: requestObj.from },
              );
              actionType == ACTION_TYPE.ACCEPT &&
                setAuthProfile({ ...authProfile, coins: authProfile.coins + requestObj.amount });
            })
            .catch((err) => setRespError(err.message))
            .finally(() => setSubmitLoading(false));
        })
        .catch((err) => setRespError(err.message))
        .finally(() => setSubmitLoading(false));
    } catch (error) {
      setRespError(error.message);
      setSubmitLoading(false);
    }
  };

  const requestAccept = async (requestObj) => {
    const { date, time } = formObj;

    setFormError({
      date: ACCOUNT.validDate(date) || '',
      time: ACCOUNT.validTime(time) || '',
    });
    if (ACCOUNT.validDate(date) || ACCOUNT.validTime(time)) return;

    try {
      setSubmitLoading(true);
      await db
        .collection('accepted-transactions')
        .add({ ...requestObj, schedule: { ...formObj } })
        .then(() => {
          requestAction(requestObj, ACTION_TYPE.ACCEPT);
          navigation.navigate(APPLICATION_NAVIGATION.SCHEDULE_ACCEPTED_SCREEN);
        })
        .catch((err) => setRespError(err.message))
        .finally(() => {
          setShowModal({ switch: false, payloadObj: {} });
          setSubmitLoading(false);
        });
    } catch (error) {
      setRespError(error.message);
      setSubmitLoading(false);
    }
  };

  const updateProfileCoins = async (profileObj, amount) => {
    const profile = await profileByUserId(profileObj.userId);
    return await db
      .collection('profiles')
      .doc(profile.profileId)
      .set({
        ...profileObj.data,
        coins: parseInt(amount) + profile.coins || 0,
      });
  };

  const deletePendingTx = async (txId) => {
    return await db.collection('pending-transactions').doc(txId).delete();
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            {!isLoading && pendingTransactions && pendingTransactions.length == 0 && (
              <Text color='dark.400'>No Requests Found...</Text>
            )}
            {(isLoading || !pendingTransactions ? Array.from(new Array(10)) : pendingTransactions).map(
              (request, idx) => (
                <RequestCard
                  navigation={navigation}
                  request={request}
                  active={idx}
                  activeIdx={activeIdx}
                  setActiveIdx={setActiveIdx}
                  onCancel={requestAction}
                  onAccept={(requestObj) => setShowModal({ switch: true, payloadObj: requestObj })}
                  key={request ? request.id : idx}
                />
              ),
            )}
          </VStack>
        </ScrollView>
      </BottomContainer>
      <ModalPortal title='Add Date & Time' showModal={showModal.switch} closeModal={closeModal}>
        <Modal.Body>
          <Center>
            <AddDateTimeForm formObj={formObj} setFormObj={setFormObj} />
            <TextButton
              width={150}
              height={35}
              loading={submitLoading}
              disabled={submitLoading}
              onPress={() => requestAccept(showModal.payloadObj)}
              text={'Save'}
            />
          </Center>
        </Modal.Body>
      </ModalPortal>
    </Stack>
  );
};

PendingRequestScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PendingRequestScreen;
