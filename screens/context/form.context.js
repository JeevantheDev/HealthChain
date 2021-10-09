import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import Firebase from '../../config/firebase';

const storage = Firebase.storage();

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [respError, setRespError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const uploadImage = async (image, imageFolder, userEmail) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });
      const ref = storage.ref().child(`${imageFolder}/${userEmail}`);
      const snapshot = await ref.put(blob, { contentType: 'image/png' });
      const remoteURL = await snapshot.ref.getDownloadURL();
      return remoteURL;
    } catch (error) {
      setRespError(error.message);
    }
  };

  return (
    <FormContext.Provider
      value={{
        respError,
        formError,
        formSuccess,
        setRespError,
        setFormError,
        setFormSuccess,
        uploadImage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
