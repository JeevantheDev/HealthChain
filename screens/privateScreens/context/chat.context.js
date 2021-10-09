import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import Firebase from 'firebase';

export const ChatContext = createContext({});

export const realTimeDB = Firebase.database();

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const sendMessage = (messages, collection = 'messages', userObj) => {
    messages.forEach((item) => {
      const message = {
        _id: Math.random().toString(36).substr(2, 5),
        to: (selectedUser || userObj).to,
        from: (selectedUser || userObj).from,
        text: item.text,
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      realTimeDB.ref(collection).push(message);
    });
  };

  const parseMessage = (message) => {
    const { user, to, from, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return { _id, to, from, createdAt, text, user };
  };

  const getMessage = (callback, collection = 'messages') => {
    realTimeDB.ref(collection).on('child_added', (snapshot) => callback(parseMessage(snapshot)));
  };

  const totalRecord = (collection) => {
    let totalrecord = 0;
    realTimeDB.ref(collection).on('value', (snap) => {
      totalrecord = snap.numChildren();
    });
    return totalrecord;
  };

  const offDB = (collection = 'messages') => {
    realTimeDB.ref(collection).off();
  };

  return (
    <ChatContext.Provider
      value={{ selectedUser, setSelectedUser, sendMessage, getMessage, parseMessage, totalRecord, offDB }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
