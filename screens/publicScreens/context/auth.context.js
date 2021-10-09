import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { DEFAULT } from '../../../utils/constant';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [authProfile, setAuthProfile] = useState({
    coins: '',
    description: '',
    profession: '',
    specalization: '',
    totalExperience: '',
    profileId: '',
    isEdit: false,
  });

  return (
    <AuthContext.Provider value={{ authUser, authProfile, authLoading, setAuthUser, setAuthProfile, setAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
