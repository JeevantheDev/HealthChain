import moment from 'moment';
import { Center, Modal, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AddDateTimeForm } from '../../../../components/AddDateTimeForm/AddDateTimeForm';
import { RequestCard } from '../../../../components/cards/RequestCard/RequestCard';
import { ModalPortal } from '../../../../components/ModalPortal/ModalPortal';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import Firebase from '../../../../config/firebase';
import { FORM } from '../../../../utils/constant';
import { FormContext } from '../../../context/form.context';
import { TransactionContext } from '../../../context/transaction.context';
import { ChatContext } from '../../context/chat.context';

const db = Firebase.firestore();

const ScheduleAcceptedScreen = ({ navigation }) => {
  const { setRespError, setFormSuccess } = useContext(FormContext);
  const { acceptedTransactions, setAcceptedTransactions, getAcceptedTransactions } = useContext(TransactionContext);
  const { sendMessage } = useContext(ChatContext);

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
    getAcceptedTransactions()
      .then((res) => {
        setAcceptedTransactions(res);
      })
      .catch((err) => {
        setRespError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setAcceptedTransactions();
    };
  }, []);

  useEffect(() => {
    setFormObj({
      date:
        showModal && showModal.payloadObj.schedule ? new Date(moment(showModal.payloadObj.schedule.date.toDate())) : '',
      time:
        showModal && showModal.payloadObj.schedule ? new Date(moment(showModal.payloadObj.schedule.time.toDate())) : '',
    });
  }, [showModal]);

  const requestReschedule = async (requestObj) => {
    setSubmitLoading(true);
    try {
      await db
        .collection('accepted-transactions')
        .doc(requestObj.id)
        .set({ ...requestObj, schedule: { ...formObj } })
        .then(() => {
          getAcceptedTransactions()
            .then((res) => {
              setAcceptedTransactions(res);
              sendMessage(
                [
                  {
                    text: 'Request is Rescheduled',
                    isRead: false,
                    user: { ...requestObj.data.toProfile, _id: requestObj.data.toProfile.userId },
                  },
                ],
                'notifications',
                { from: requestObj.to, to: requestObj.from },
              );
            })
            .catch((err) => {
              setRespError(err.message);
            });
          setFormSuccess(FORM.SUCCESS.REQUEST_RESCHEDULE);
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

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            {!isLoading && acceptedTransactions && acceptedTransactions.length == 0 && (
              <Text color='dark.400'>No Schedules Found...</Text>
            )}
            {(isLoading || !acceptedTransactions ? Array.from(new Array(10)) : acceptedTransactions).map(
              (schedule, idx) => (
                <RequestCard
                  showAttendBtn={true}
                  showActionBtn={false}
                  navigation={navigation}
                  request={schedule}
                  active={idx}
                  activeIdx={activeIdx}
                  setActiveIdx={setActiveIdx}
                  onAccept={(requestObj) => setShowModal({ switch: true, payloadObj: requestObj })}
                  onReschedule={(requestObj) => setShowModal({ switch: true, payloadObj: requestObj })}
                  key={schedule ? schedule.id : idx}
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
              onPress={() => requestReschedule(showModal.payloadObj)}
              text={'Reschedule'}
            />
          </Center>
        </Modal.Body>
      </ModalPortal>
    </Stack>
  );
};

ScheduleAcceptedScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ScheduleAcceptedScreen;
