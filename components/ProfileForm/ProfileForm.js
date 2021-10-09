import { CheckIcon, FormControl, Input, Select, TextArea } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormContext } from '../../screens/context/form.context';

import { USER_TYPES } from '../../utils/constant';

export const ProfileForm = React.memo(({ formObj, setFormObj }) => {
  const { formError } = useContext(FormContext);

  return (
    <>
      <FormControl my={3} isInvalid={formError && formError.profession ? true : false}>
        <Select
          bg='white'
          color='dark.300'
          selectedValue={formObj.profession}
          minWidth={100}
          placeholder='select your profession'
          _dark={{
            placeholderTextColor: 'dark.300',
          }}
          onValueChange={(itemValue) => setFormObj({ ...formObj, profession: itemValue })}
          _selectedItem={{
            bg: 'white',
            endIcon: <CheckIcon size={4} />,
          }}
        >
          {USER_TYPES.map((select, idx) => (
            <Select.Item key={idx} label={select.type} value={select.value} />
          ))}
        </Select>
        <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
          {formError && formError.profession}
        </FormControl.ErrorMessage>
      </FormControl>
      {formObj.profession !== '' && formObj.profession !== 4 && (
        <>
          <FormControl my={3} isInvalid={formError && formError.specalization ? true : false}>
            <Input
              bg='white'
              color='dark.300'
              letterSpacing={2}
              _dark={{
                placeholderTextColor: 'dark.300',
              }}
              value={formObj.specalization}
              onChangeText={(text) =>
                setFormObj({
                  ...formObj,
                  specalization: text,
                })
              }
              placeholder='enter your specalization'
            />
            <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
              {formError && formError.specalization}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl my={3} isInvalid={formError && formError.totalExperience ? true : false}>
            <Input
              bg='white'
              letterSpacing={2}
              color='dark.300'
              _dark={{
                placeholderTextColor: 'dark.300',
              }}
              value={formObj.totalExperience}
              onChangeText={(text) =>
                setFormObj({
                  ...formObj,
                  totalExperience: text,
                })
              }
              placeholder='enter your total experience'
            />
            <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
              {formError && formError.totalExperience}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl my={3} isInvalid={formError && formError.description ? true : false}>
            <TextArea
              textAlignVertical='top'
              h={200}
              numberOfLines={10}
              bg='white'
              letterSpacing={2}
              color='dark.300'
              _dark={{
                placeholderTextColor: 'dark.300',
              }}
              value={formObj.description}
              onChangeText={(text) =>
                setFormObj({
                  ...formObj,
                  description: text,
                })
              }
              placeholder='add your description...'
            />
            <FormControl.ErrorMessage _text={{ fontSize: 'xs', letterSpacing: 1, color: 'red.100' }}>
              {formError && formError.description}
            </FormControl.ErrorMessage>
          </FormControl>
        </>
      )}
    </>
  );
});

ProfileForm.propTypes = {
  formObj: PropTypes.object.isRequired,
  setFormObj: PropTypes.func.isRequired,
};
