import { Stack } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ChatContext } from '../../context/chat.context';

const ChatScreen = () => {
  const { selectedUser, setSelectedUser, getMessage, sendMessage, offDB } = useContext(ChatContext);
  const { authUser } = useContext(AuthContext);
  const [state, setState] = useState({ messages: [] });

  useEffect(() => {
    getMessage((message) => {
      setState((prev) => ({
        messages: GiftedChat.append(
          prev.messages,
          (message.to === authUser.userId && message.from === selectedUser.from) ||
            (message.from === authUser.userId && message.to === selectedUser.to)
            ? message
            : [],
        ),
      }));
    });
    return () => {
      offDB();
      setSelectedUser(null);
    };
  }, []);

  const chat = (
    <GiftedChat
      isTyping={true}
      messages={state.messages}
      onSend={sendMessage}
      user={{ ...authUser, _id: authUser.userId }}
    />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack bg='primary.100' flex={1}>
        {chat}
      </Stack>
    </SafeAreaView>
  );
};

export default ChatScreen;
