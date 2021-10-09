import { Box, KeyboardAvoidingView, Stack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PublicHeader } from '../../../components/PublicHeader/PublicHeader';
import { RegisterForm } from '../../../components/RegisterForm/RegisterForm';
import { BottomContainer } from '../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../components/shared/TextButton/TextButton';
import { TopContainer } from '../../../components/shared/TopContainer/TopContainer';
import Firebase from '../../../config/firebase';
import { ACCOUNT_STATUS, FOLDER, FORM } from '../../../utils/constant';
import { ACCOUNT } from '../../../utils/validators';
import { FormContext } from '../../context/form.context';
import { AuthContext } from '../context/auth.context';

const auth = Firebase.auth();
const db = Firebase.firestore();

const RegisterScreen = ({ navigation }) => {
  const { setRespError, setFormError, setFormSuccess, uploadImage } = useContext(FormContext);
  const { authLoading, setAuthLoading } = useContext(AuthContext);
  useEffect(() => setFormError(null), []);

  const [isLoading, setIsLoading] = useState(false);
  const [formObj, setFormObj] = useState({
    fullname: 'Henry Hoe Doe',
    email: 'henry@gmail.com',
    password: '123456',
    avatar: '',
  });

  const handleTextChange = useCallback(
    ({ type, value }) => {
      setFormObj((state) => ({
        ...state,
        [type]: value,
      }));
    },
    [setFormObj],
  );

  const onPressRegister = async () => {
    const { fullname, email, password, avatar } = formObj;

    setFormError({
      fullname: ACCOUNT.validFullName(fullname) || '',
      email: ACCOUNT.validEmail(email) || '',
      password: ACCOUNT.validPassword(password) || '',
      avatar: ACCOUNT.validAvatar(avatar) || '',
    });

    if (
      ACCOUNT.validFullName(fullname) ||
      ACCOUNT.validEmail(email) ||
      ACCOUNT.validPassword(password) ||
      ACCOUNT.validAvatar(avatar)
    )
      return;

    try {
      setIsLoading(true);
      setAuthLoading(true);
      await uploadImage(avatar, FOLDER.AVATAR, email).then((imageURL) => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            db.collection('users').doc(res.user.uid).set({
              fullname: fullname,
              email: res.user.email,
              avatar: imageURL,
              status: ACCOUNT_STATUS.PENDING,
              userId: res.user.uid,
            });
            setFormSuccess(FORM.SUCCESS.REGISTER);
          })
          .catch((err) => {
            setRespError(err.message);
            setAuthLoading(false);
          })
          .finally(() => setIsLoading(false));
      });
    } catch (error) {
      setRespError(error.message);
      setAuthLoading(false);
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
            textDesc='Please Register Your account.'
          />
        </TopContainer>
        <BottomContainer justifyContentValue='center' alignItemsValue='stretch' paddingB={16}>
          <KeyboardAvoidingView
            h={{
              base: '600px',
              lg: 'auto',
            }}
            behavior={'height'}
          >
            <Box my={'auto'}>
              <RegisterForm navigation={navigation} formObj={formObj} handleTextChange={handleTextChange} />
            </Box>
            <Box mt={'auto'} justifyContent='center' alignItems='center'>
              <TextButton
                disabled={isLoading || authLoading}
                loading={isLoading || authLoading}
                onPress={() => {
                  onPressRegister();
                }}
                text={isLoading || authLoading ? 'Loading...' : 'Register'}
              />
            </Box>
          </KeyboardAvoidingView>
        </BottomContainer>
      </ScrollView>
    </Stack>
  );
};

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
