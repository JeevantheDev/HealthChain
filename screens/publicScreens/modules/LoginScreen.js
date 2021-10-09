import { Box, KeyboardAvoidingView, Stack, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { LoginForm } from '../../../components/LoginForm/LoginForm';
import { PublicHeader } from '../../../components/PublicHeader/PublicHeader';
import { BottomContainer } from '../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../components/shared/TextButton/TextButton';
import { TopContainer } from '../../../components/shared/TopContainer/TopContainer';
import Firebase from '../../../config/firebase';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';
import { FORM } from '../../../utils/constant';
import { ACCOUNT } from '../../../utils/validators';
import { FormContext } from '../../context/form.context';
import { AuthContext } from '../context/auth.context';

const auth = Firebase.auth();

const LoginScreen = ({ navigation }) => {
  const { setRespError, setFormError, setFormSuccess } = useContext(FormContext);
  const { authLoading, setAuthLoading } = useContext(AuthContext);

  useEffect(() => setFormError(null), []);

  const [isLoading, setIsLoading] = useState(false);

  const [formObj, setFormObj] = useState({
    email: '',
    password: '',
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

  const onPressLogin = async () => {
    const { email, password } = formObj;
    setFormError({
      email: ACCOUNT.validEmail(email) || '',
      password: ACCOUNT.validPassword(password) || '',
    });
    if (ACCOUNT.validEmail(email) || ACCOUNT.validPassword(password)) return;
    try {
      setIsLoading(true);
      setAuthLoading(true);
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          setFormSuccess(FORM.SUCCESS.LOGIN);
        })
        .catch((err) => {
          setRespError(err.message);
          setAuthLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
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
              { color: 'yellow.400', value: 'Get Started', nested: {} },
              { color: 'yellow.400', value: 'With', nested: { color: 'white', value: 'HealthChain' } },
            ]}
            textDesc={`Please Login With Your Details`}
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
              <LoginForm handleTextChange={handleTextChange} />
              <Text
                onPress={() => navigation.navigate(APPLICATION_NAVIGATION.REGISTER_SCREEN)}
                color='white'
                fontSize='lg'
                textAlign='center'
                letterSpacing={2}
                textDecoration='underline'
              >
                Create Your Account
              </Text>
            </Box>
            <Box mt={'auto'} justifyContent='center' alignItems='center'>
              <TextButton
                loading={isLoading || authLoading}
                disabled={isLoading || authLoading}
                onPress={() => onPressLogin()}
                text={isLoading || authLoading ? 'Loading...' : 'Login'}
              />
            </Box>
          </KeyboardAvoidingView>
        </BottomContainer>
      </ScrollView>
    </Stack>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
