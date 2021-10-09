import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Image, Input } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import moment from 'moment';
import { FormContext } from '../../screens/context/form.context';
import { KeyboardDissmiss } from '../shared/KeyboardDismiss/KeyboardDissmiss';

export const AddDateTimeForm = React.memo(({ formObj, setFormObj }) => {
  const { formError, setFormError } = useContext(FormContext);
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    // empty formError on unmount the component.
    return () => {
      setFormError(null);
    };
  }, []);

  const onChange = (event, value) => {
    setShow(Platform.OS === 'ios');
    setFormObj((state) => ({
      date: mode === 'date' ? value : state.date,
      time: mode === 'time' ? value : state.time,
    }));
  };

  return (
    <>
      <FormControl my={3} isInvalid={formError && formError.date ? true : false}>
        <KeyboardDissmiss
          onPress={() => {
            setMode('date');
            setShow(true);
          }}
        >
          <Input
            bg='white'
            color='dark.300'
            letterSpacing={2}
            _dark={{
              placeholderTextColor: 'dark.300',
            }}
            InputRightElement={
              <Image
                size={7}
                mr={2}
                resizeMode='contain'
                source={require('../../assets/media/icons/date.png')}
                alt='date'
              />
            }
            value={formObj.date ? moment(formObj.date).format('ll') : ''}
            placeholder='add date for your schedule'
          />
        </KeyboardDissmiss>
        <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
          {formError && formError.date}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl my={3} isInvalid={formError && formError.time ? true : false}>
        <KeyboardDissmiss
          onPress={() => {
            setMode('time');
            setShow(true);
          }}
        >
          <Input
            bg='white'
            letterSpacing={2}
            color='dark.300'
            _dark={{
              placeholderTextColor: 'dark.300',
            }}
            InputRightElement={
              <Image
                size={7}
                mr={2}
                resizeMode='contain'
                source={require('../../assets/media/icons/clock.png')}
                alt='clock'
              />
            }
            value={formObj.time ? moment(formObj.time).format('LT') : ''}
            placeholder='add time for your schedule'
          />
        </KeyboardDissmiss>
        <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
          {formError && formError.time}
        </FormControl.ErrorMessage>
      </FormControl>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={formObj.date || formObj.time || new Date()}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </>
  );
});

AddDateTimeForm.propTypes = {
  formObj: PropTypes.object.isRequired,
  setFormObj: PropTypes.func.isRequired,
};
