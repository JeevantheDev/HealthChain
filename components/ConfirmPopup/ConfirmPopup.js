import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Box } from 'native-base';
import { TextButton } from '../shared/TextButton/TextButton';

export const ConfirmPopup = ({ text, bg = 'gray.300' }) => {
  return (
    <Box h='60%' w='100%' alignItems='center'>
      <Popover
        trigger={(triggerProps) => {
          return (
            <TextButton
              {...triggerProps}
              bg={bg}
              textColor='white'
              width={150}
              height={35}
              loading={false}
              text={text}
            />
          );
        }}
      >
        <Popover.Content accessibilityLabel='Delete Customerd' w='56'>
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Delete Customer</Popover.Header>
          <Popover.Body>
            This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be
            recovered.
          </Popover.Body>
          <Popover.Footer justifyContent='flex-end'>
            <Button.Group space={2}>
              <Button colorScheme='coolGray' variant='ghost'>
                Cancel
              </Button>
              <Button colorScheme='danger'>Delete</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

ConfirmPopup.propTypes = {
  bg: PropTypes.string,
  text: PropTypes.string.isRequired,
};
