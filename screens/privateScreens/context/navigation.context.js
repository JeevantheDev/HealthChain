import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const NavigationContext = createContext({});

export const NavigationProvider = ({ children }) => {
  const [navigationStack, setNavigationStack] = useState({});

  return (
    <NavigationContext.Provider value={{ navigationStack, setNavigationStack }}>{children}</NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
