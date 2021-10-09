import * as ImagePicker from 'expo-image-picker';
import { Box, FormControl, IconButton, Image, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { FormContext } from '../../screens/context/form.context';
import { APPLICATION_NAVIGATION } from '../../utils/applicationNavigation';

export const RegisterForm = React.memo(
  ({ formObj, navigation, handleTextChange, inputBg = 'white', isEdit = false, isEditPassword, setIsEditPassword }) => {
    const { formError } = useContext(FormContext);
    const [image, setImage] = useState(require('../../assets/media/icons/image-add.png'));

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    useEffect(() => {
      setImage(formObj.avatar ? { uri: formObj.avatar } : require('../../assets/media/icons/image-add.png'));
    }, [formObj]);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.cancelled) return;
      setImage({ uri: result.uri });
      handleTextChange({
        type: 'avatar',
        value: result.uri,
      });
    };

    return (
      <>
        {!isEditPassword && (
          <Box justifyContent='center' alignItems='center' mb={3}>
            <IconButton
              borderRadius={50}
              onPress={pickImage}
              bg='dark.300'
              variant='solid'
              icon={<Image resizeMode='cover' size={70} borderRadius={100} source={image} alt={'avatar-btn'} />}
            />
          </Box>
        )}
        {!isEditPassword && (
          <FormControl my={3} isInvalid={formError && formError.fullname ? true : false}>
            <Input
              bg={inputBg}
              color='dark.300'
              letterSpacing={2}
              _dark={{
                placeholderTextColor: 'dark.300',
              }}
              value={formObj.fullname}
              onChangeText={(text) =>
                handleTextChange({
                  type: 'fullname',
                  value: text,
                })
              }
              placeholder='enter your fullname'
            />
            <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
              {formError && formError.fullname}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        <FormControl my={3} isInvalid={formError && formError.email ? true : false}>
          <Input
            bg={inputBg}
            color='dark.300'
            letterSpacing={2}
            _dark={{
              placeholderTextColor: 'dark.300',
            }}
            value={formObj.email}
            onChangeText={(text) =>
              handleTextChange({
                type: 'email',
                value: text,
              })
            }
            placeholder='enter your email'
          />
          <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
            {formError && formError.email}
          </FormControl.ErrorMessage>
        </FormControl>
        {!isEdit && (
          <FormControl my={3} isInvalid={formError && formError.password ? true : false}>
            <Input
              bg={inputBg}
              letterSpacing={2}
              color='dark.300'
              _dark={{
                placeholderTextColor: 'dark.300',
              }}
              type={'password'}
              value={formObj.password}
              onChangeText={(text) =>
                handleTextChange({
                  type: 'password',
                  value: text,
                })
              }
              placeholder='enter your password'
            />
            <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
              {formError && formError.password}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        <Text
          onPress={() =>
            !isEdit ? navigation.navigate(APPLICATION_NAVIGATION.LOGIN_SCREEN) : setIsEditPassword(!isEditPassword)
          }
          color={'white'}
          fontSize='lg'
          textAlign='center'
          letterSpacing={2}
          textDecoration='underline'
        >
          {!isEdit ? 'Already Have Account' : isEditPassword ? 'Back to Update' : 'Update Password ?'}
        </Text>
      </>
    );
  },
);

RegisterForm.propTypes = {
  inputBg: PropTypes.string,
  isEdit: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  formObj: PropTypes.object.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  isEditPassword: PropTypes.bool,
  setIsEditPassword: PropTypes.func,
};
