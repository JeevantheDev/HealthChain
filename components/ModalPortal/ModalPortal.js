import { Center, Modal, Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';

export const ModalPortal = React.memo(({ title = '', showModal, closeModal, children }) => {
  return (
    <Center>
      <Modal size='lg' isOpen={showModal} onClose={closeModal}>
        <Modal.Content bg='primary.100' maxWidth='400px'>
          {title && (
            <Modal.Header>
              <Text textAlign='center' fontSize='3xl' color='gray.400' fontWeight={500}>
                {title}
              </Text>
            </Modal.Header>
          )}
          {children}
        </Modal.Content>
      </Modal>
    </Center>
  );
});

ModalPortal.propTypes = {
  title: PropTypes.string,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
