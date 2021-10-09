import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import * as Notifications from 'expo-notifications';

import Firebase from '../../config/firebase';
import { FormContext } from './form.context';

export const NotificationContext = createContext({});

const db = Firebase.firestore();

export const NotificationProvider = ({ children }) => {
  const { setRespError, setFormSuccess } = useContext(FormContext);
  const [token, setToken] = useState(null);

  const registerForPushNotificationAsync = async (user) => {
    try {
      let resToken = await Notifications.getExpoPushTokenAsync();
      setToken(resToken);
      await db
        .collection('users')
        .doc(user.userId)
        .set({ ...user, expoToken: resToken })
        .then(() => setFormSuccess('Done'))
        .catch((err) => setRespError(err.message));
    } catch (error) {
      setRespError(error.message);
    }
  };

  return (
    <NotificationContext.Provider value={{ token, setToken, registerForPushNotificationAsync }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
