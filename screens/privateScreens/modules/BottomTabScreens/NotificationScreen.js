import { ScrollView, Stack, Text, VStack } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { NotificationCard } from '../../../../components/cards/NotificationCard/NotificationCard';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { FormContext } from '../../../context/form.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ChatContext, realTimeDB } from '../../context/chat.context';

const NotificationScreen = () => {
  const { authUser } = useContext(AuthContext);
  const { setRespError } = useContext(FormContext);
  const { getMessage, offDB } = useContext(ChatContext);

  const [state, setState] = useState({ notifications: null });

  useEffect(() => {
    getMessage((notification) => {
      setState((prev) => ({
        notifications: GiftedChat.append(
          prev.notifications || [],
          notification.to === authUser.userId ? notification : [],
        ),
      }));
    }, 'notifications');
    return () => {
      offDB('notifications');
    };
  }, []);

  const notificationRemove = (notificationObj) => {
    try {
      realTimeDB
        .ref(`notifications/${notificationObj._id}`)
        .remove()
        .then(() =>
          setState((prev) => ({
            notifications: prev.notifications.filter((notification) => notification._id !== notificationObj._id),
          })),
        )
        .catch((err) => setRespError(err.message));
    } catch (error) {
      setRespError(error.message);
    }
  };

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={4} paddingB={4} paddingX={4}>
        <ScrollView>
          <VStack>
            {!state.notifications && <Text color='dark.400'>No Notifications Found...</Text>}
            {state.notifications &&
              state.notifications.map((notification, idx) => (
                <NotificationCard
                  deleteNotification={notificationRemove}
                  notification={notification}
                  key={notification ? notification._id : idx}
                />
              ))}
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

export default NotificationScreen;
