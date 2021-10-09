import { FormControl, Input } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { FormContext } from '../../screens/context/form.context';

export const LoginForm = React.memo(({ handleTextChange }) => {
  const { formError } = useContext(FormContext);
  return (
    <>
      <FormControl my={3} isInvalid={formError && formError.email ? true : false}>
        <Input
          bg='white'
          color='dark.300'
          letterSpacing={2}
          _dark={{
            placeholderTextColor: 'dark.300',
          }}
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
      <FormControl my={3} isInvalid={formError && formError.password ? true : false}>
        <Input
          bg='white'
          letterSpacing={2}
          color='dark.300'
          _dark={{
            placeholderTextColor: 'dark.300',
          }}
          type={'password'}
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
    </>
  );
});

LoginForm.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
};
