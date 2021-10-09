import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert, IconButton, CloseIcon } from 'native-base';
import { FormContext } from '../../../screens/context/form.context';

export const AlertContainer = React.memo(({ children, variant }) => {
  const { setRespError, setFormSuccess } = useContext(FormContext);

  const closeAlert = () => {
    setRespError(null);
    setFormSuccess(null);
  };

  return (
    <Alert
      action={<IconButton icon={<CloseIcon size='xs' />} onPress={() => closeAlert()} />}
      position='absolute'
      bottom={0}
      left={0}
      right={0}
      variant='left-accent'
      status={variant}
    >
      <Alert.Icon />
      <Alert.Title flexShrink={1}>{children}</Alert.Title>
    </Alert>
  );
});

AlertContainer.propTypes = {
  children: PropTypes.any.isRequired,
  variant: PropTypes.string.isRequired,
};
