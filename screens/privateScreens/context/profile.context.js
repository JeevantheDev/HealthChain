import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { USER_ROLES } from '../../../utils/constant';
import Firebase from '../../../config/firebase';

const db = Firebase.firestore();

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [allProfiles, setAllProfiles] = useState();
  const [selectedProfile, setSelectedProfile] = useState({});
  const [filterQuery, setFilterQuery] = useState({
    search: '',
    profession: [USER_ROLES.DOCTOR, USER_ROLES.PHARMACIST, USER_ROLES.XRAY_TECHNICIAN],
  });

  const updateFilterQuery = ({ type, value }) => {
    setFilterQuery((state) => ({
      ...state,
      [type]: value,
    }));
  };

  const getProfiles = (professions) => {
    return new Promise((resolve, reject) => {
      db.collection('profiles')
        .where('profession', 'in', professions || filterQuery.profession)
        .get()
        .then(async (profiles) => {
          if (profiles.empty) resolve([]);
          const userObj = await profiles.docs.map(async (profile) => ({
            ...(await userById(profile.data().userId)),
            data: { ...profile.data(), profileId: profile.id },
          }));
          resolve(Promise.all(userObj));
        })
        .catch((err) => reject(err));
    });
  };

  const userById = (userId) => {
    return new Promise((resolve, reject) => {
      db.collection('users')
        .where('userId', '==', userId)
        .get()
        .then((users) => {
          users.forEach((user) => resolve(user.data()));
        })
        .catch((err) => reject(err));
    });
  };

  const profileByUserId = (userId) => {
    return new Promise((resolve, reject) => {
      db.collection('profiles')
        .where('userId', '==', userId)
        .get()
        .then((profiles) => {
          profiles.forEach((profile) => resolve({ ...profile.data(), profileId: profile.id }));
        })
        .catch((err) => reject(err));
    });
  };

  const profileIdByUser = (userId) => {
    return new Promise((resolve, reject) => {
      db.collection('profiles')
        .where('userId', '==', userId)
        .get()
        .then((profiles) => {
          profiles.forEach((profile) => resolve(profile.id));
        })
        .catch((err) => reject(err));
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        allProfiles,
        setAllProfiles,
        selectedProfile,
        setSelectedProfile,
        filterQuery,
        setFilterQuery,
        getProfiles,
        profileIdByUser,
        updateFilterQuery,
        profileByUserId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
