import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import Firebase from '../../config/firebase';
import { AuthContext } from '../publicScreens/context/auth.context';

const db = Firebase.firestore();

export const TransactionContext = createContext({});

export const TransactionProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const [pendingTransactions, setPendingTransactions] = useState();
  const [acceptedTransactions, setAcceptedTransactions] = useState();

  const getPendingTransactions = () => {
    setPendingTransactions();
    return new Promise((resolve, reject) => {
      db.collection('pending-transactions')
        .get()
        .then((tx) => {
          if (tx.empty) resolve([]);
          let response = [];
          tx.forEach((t) => {
            if (t.data().from === authUser.userId || t.data().to === authUser.userId) {
              response.push({ ...t.data(), id: t.id });
            }
          });
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };
  const getAcceptedTransactions = () => {
    setAcceptedTransactions();
    return new Promise((resolve, reject) => {
      db.collection('accepted-transactions')
        .get()
        .then((tx) => {
          if (tx.empty) resolve([]);
          let response = [];
          tx.forEach((t) => {
            if (t.data().from === authUser.userId || t.data().to === authUser.userId) {
              response.push({ ...t.data(), id: t.id });
            }
          });
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        pendingTransactions,
        setPendingTransactions,
        acceptedTransactions,
        setAcceptedTransactions,
        getPendingTransactions,
        getAcceptedTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
