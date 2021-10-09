import { Box, Center, KeyboardAvoidingView, ScrollView, Stack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { TopContainer } from '../../../../components/shared/TopContainer/TopContainer';
import { PublicHeader } from '../../../../components/PublicHeader/PublicHeader';

import { RegisterForm } from '../../../../components/RegisterForm/RegisterForm';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import Firebase from '../../../../config/firebase';
import { FOLDER, FORM } from '../../../../utils/constant';
import { ACCOUNT } from '../../../../utils/validators';
import { FormContext } from '../../../context/form.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { NotificationContext } from '../../../context/notification.context';

const auth = Firebase.auth();
const db = Firebase.firestore();

const UpdateAccountScreen = ({ navigation }) => {
  const { setRespError, setFormError, setFormSuccess, uploadImage } = useContext(FormContext);
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { token } = useContext(NotificationContext);

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formObj, setFormObj] = useState({
    fullname: '',
    email: '',
    avatar: '',
    status: '',
  });

  useEffect(() => {
    setFormError(null);
    setFormObj({
      fullname: authUser.fullname,
      email: authUser.email,
      avatar: authUser.avatar,
      status: authUser.status,
    });
  }, [authUser]);

  const handleTextChange = useCallback(
    ({ type, value }) => {
      setFormObj((state) => ({
        ...state,
        [type]: value,
      }));
    },
    [setFormObj],
  );

  const onPressUpdate = async () => {
    const { fullname, email, status, avatar } = formObj;

    setFormError({
      fullname: (!isEditPassword && ACCOUNT.validFullName(fullname)) || '',
      email: ACCOUNT.validEmail(email) || '',
      avatar: (!isEditPassword && ACCOUNT.validAvatar(avatar)) || '',
    });

    if (
      (!isEditPassword && ACCOUNT.validFullName(fullname)) ||
      ACCOUNT.validEmail(email) ||
      (!isEditPassword && ACCOUNT.validAvatar(avatar))
    )
      return;
    try {
      setIsLoading(true);
      isEditPassword
        ? await auth
            .sendPasswordResetEmail(email)
            .then(() => setFormSuccess(FORM.SUCCESS.EMAIL_SENT))
            .catch((err) => setRespError(err.message))
            .finally(() => setIsLoading(false))
        : await uploadImage(avatar, FOLDER.AVATAR, email).then((imageURL) => {
            auth.currentUser
              .updateEmail(email)
              .then(() => {
                db.collection('users')
                  .doc(authUser.userId)
                  .set({
                    fullname: fullname,
                    email: email,
                    avatar: imageURL || avatar,
                    status: status,
                    userId: authUser.userId,
                    expoToken: { ...token },
                  });
                setFormSuccess(FORM.SUCCESS.UPDATE_ACCOUNT);
                setAuthUser({ ...formObj, userId: authUser.userId });
              })
              .catch((err) => {
                setRespError(err.message);
              })
              .finally(() => setIsLoading(false));
          });
    } catch (error) {
      setRespError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Stack bg='primary.800' flex={1} direction='column'>
      <ScrollView>
        <TopContainer>
          <PublicHeader
            texts={[
              { color: 'yellow.400', value: 'Account Details', nested: {} },
              { color: 'yellow.400', value: 'With', nested: { color: 'white', value: 'HealthChain' } },
            ]}
            textDesc={isEditPassword ? 'Please Add Your Email' : 'Please Update Your Account.'}
          />
        </TopContainer>
        <BottomContainer justifyContentValue='center' alignItemsValue='stretch' paddingB={16}>
          <KeyboardAvoidingView
            h={{
              base: '600px',
              lg: 'auto',
            }}
            behavior={'padding'}
          >
            <Box my={'auto'}>
              <RegisterForm
                isEdit={true}
                inputBg='white'
                navigation={navigation}
                formObj={formObj}
                handleTextChange={handleTextChange}
                isEditPassword={isEditPassword}
                setIsEditPassword={setIsEditPassword}
              />
            </Box>
            <Box mt={'auto'} justifyContent='center' alignItems='center'>
              <TextButton
                disabled={isLoading}
                loading={isLoading}
                onPress={() => {
                  onPressUpdate();
                }}
                text={isLoading ? 'Loading...' : isEditPassword ? 'Send Email' : 'Update'}
              />
            </Box>
          </KeyboardAvoidingView>
        </BottomContainer>
      </ScrollView>
    </Stack>
  );
};

UpdateAccountScreen.propTypes = {
  navigation: PropTypes.object,
};

export default UpdateAccountScreen;
