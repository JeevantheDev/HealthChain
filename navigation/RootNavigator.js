import { Center, Spinner } from 'native-base';
import React, { useState, useEffect, useContext } from 'react';

import Firebase from '../config/firebase';
import { AuthContext } from '../screens/publicScreens/context/auth.context';
import PublicScreenNavigator from '../screens/publicScreens/PublicScreenNavigator';
import PrivateScreenNavigator from '../screens/privateScreens/PrivateScreenNavigator';
import { AlertContainer } from '../components/shared/AlertContainer/AlertContainer';
import { FormContext } from '../screens/context/form.context';
import { ACCOUNT_STATUS, DEFAULT, FORM } from '../utils/constant';
import { NotificationContext } from '../screens/context/notification.context';
import NotificationHandler from '../components/shared/NotificationHandler/NotificationHandler';

const auth = Firebase.auth();
const db = Firebase.firestore();

const RootNavigator = () => {
  const { authUser, setAuthLoading, setAuthUser, setAuthProfile } = useContext(AuthContext);
  const { respError, formSuccess, setRespError } = useContext(FormContext);
  const { registerForPushNotificationAsync } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        if (authenticatedUser) {
          await db
            .collection('users')
            .doc(authenticatedUser.uid)
            .get()
            .then(async (docRef) => {
              setAuthUser({ ...docRef.data(), userId: authenticatedUser.uid });
              // await registerForPushNotificationAsync({ ...docRef.data(), userId: authenticatedUser.uid });
              docRef.data().status === ACCOUNT_STATUS.COMPLETE
                ? db
                    .collection('profiles')
                    .where('userId', '==', authenticatedUser.uid)
                    .get()
                    .then((snapshot) =>
                      snapshot.forEach((doc) => setAuthProfile({ ...doc.data(), profileId: doc.id, isEdit: true })),
                    )
                    .catch((err) => setRespError(err.message))
                : setAuthProfile({
                    coins: DEFAULT.COINS,
                    description: '',
                    profession: '',
                    specalization: '',
                    totalExperience: '',
                    profileId: '',
                    isEdit: false,
                  });
            })
            .catch((err) => setRespError(err.message))
            .finally(() => setAuthLoading(false));
        } else {
          setAuthUser(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('err', error.message);
        setRespError(error.message);
      }
    });
    // unsubscribe auth listener on ummount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel='Loading User' />
      </Center>
    );
  }

  return (
    <>
      {authUser ? <PrivateScreenNavigator /> : <PublicScreenNavigator />}
      {(respError || formSuccess) && (
        <AlertContainer variant={respError ? FORM.STATUS.ERROR : FORM.STATUS.SUCCESS}>
          {respError || formSuccess}
        </AlertContainer>
      )}
      <NotificationHandler />
    </>
  );
};

export default RootNavigator;
