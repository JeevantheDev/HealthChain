import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { APPLICATION_NAVIGATION } from '../../utils/applicationNavigation';
import LandingScreen from './modules/LandingScreen';
import LoginScreen from './modules/LoginScreen';
import RegisterScreen from './modules/RegisterScreen';

const PublicStack = createStackNavigator();

const publicScreenConfig = {
  headerVisible: (isVisible) => ({
    headerShown: isVisible,
    headerTransparent: true,
    headerShadowVisible: false,
    title: null,
    headerTintColor: 'white',
  }),
};

const PublicScreenNavigator = () => {
  return (
    <NavigationContainer>
      <PublicStack.Navigator screenOptions={publicScreenConfig.headerVisible(false)}>
        <PublicStack.Screen name={APPLICATION_NAVIGATION.LANDING_SCREEN} component={LandingScreen} />
        <PublicStack.Screen
          options={publicScreenConfig.headerVisible(true)}
          name={APPLICATION_NAVIGATION.LOGIN_SCREEN}
          component={LoginScreen}
        />
        <PublicStack.Screen
          options={publicScreenConfig.headerVisible(true)}
          name={APPLICATION_NAVIGATION.REGISTER_SCREEN}
          component={RegisterScreen}
        />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
};

export default PublicScreenNavigator;
