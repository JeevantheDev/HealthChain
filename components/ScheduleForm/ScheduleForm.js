import { FormControl, Input, Text, TextArea } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { KeyboardDissmiss } from '../shared/KeyboardDismiss/KeyboardDissmiss';
import { FormContext } from '../../screens/context/form.context';

export const ScheduleForm = React.memo(({ formObj, handleTextChange }) => {
  const { formError } = useContext(FormContext);
  return (
    <>
      <FormControl my={3} isInvalid={false}>
        <FormControl.Label>
          <Text letterSpacing={1} fontSize='xl' color='gray.300' fontWeight={100}>
            From
          </Text>
        </FormControl.Label>
        <KeyboardDissmiss>
          <Input
            bg='white'
            color='dark.300'
            letterSpacing={2}
            _dark={{
              placeholderTextColor: 'dark.300',
            }}
            size='xl'
            fontWeight={500}
            value={formObj.from}
            placeholder='your from address'
          />
        </KeyboardDissmiss>
      </FormControl>
      <FormControl my={3} isInvalid={false}>
        <FormControl.Label>
          <Text letterSpacing={1} fontSize='xl' color='gray.300' fontWeight={100}>
            To
          </Text>
        </FormControl.Label>
        <KeyboardDissmiss>
          <Input
            bg='white'
            letterSpacing={2}
            color='dark.300'
            _dark={{
              placeholderTextColor: 'dark.300',
            }}
            size='xl'
            fontWeight={500}
            value={formObj.to}
            isDisabled={false}
            placeholder='your to address'
          />
        </KeyboardDissmiss>
      </FormControl>
      <FormControl my={3} isInvalid={formError && formError.description ? true : false}>
        <FormControl.Label>
          <Text letterSpacing={1} fontSize='xl' color='gray.300' fontWeight={100}>
            Health Description
          </Text>
        </FormControl.Label>
        <TextArea
          textAlignVertical='top'
          h={150}
          numberOfLines={4}
          bg='white'
          letterSpacing={2}
          color='dark.300'
          _dark={{
            placeholderTextColor: 'dark.300',
          }}
          fontSize='sm'
          value={formObj.description}
          onChangeText={(text) => {
            handleTextChange({
              type: 'description',
              value: text,
            });
          }}
          placeholder='Add your health description...'
        />
        <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
          {formError && formError.description}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl my={3} isInvalid={formError && formError.amount ? true : false}>
        <FormControl.Label>
          <Text letterSpacing={1} fontSize='xl' color='gray.300' fontWeight={100}>
            Reward Amount
          </Text>
        </FormControl.Label>
        <Input
          bg='white'
          letterSpacing={2}
          color='dark.300'
          _dark={{
            placeholderTextColor: 'dark.300',
          }}
          fontSize='sm'
          type='number'
          keyboardType='numeric'
          defaultValue={formObj.amount}
          value={formObj.amount}
          onChangeText={(text) => {
            handleTextChange({
              type: 'amount',
              value: text,
            });
          }}
          placeholder='Add your amount to transfer(e.g. 30 coins)'
        />
        <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
          {formError && formError.amount}
        </FormControl.ErrorMessage>
      </FormControl>
    </>
  );
});

ScheduleForm.propTypes = {
  formObj: PropTypes.object.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};
