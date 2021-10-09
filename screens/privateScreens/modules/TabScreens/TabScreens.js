import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import Constants from 'expo-constants';

import { HomeHeader } from '../../../../components/shared/HomeHeader/HomeHeader';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { NavigationContext } from '../../context/navigation.context';
import AccountScreen from '../BottomTabScreens/AccountScreen';
import HomeScreen from '../BottomTabScreens/HomeScreen';
import NotificationScreen from '../BottomTabScreens/NotificationScreen';
import BuyCoinsScreen from '../BottomTabScreens/BuyCoinsScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

const TabStack = createStackNavigator();

const RootCoinsScreen = () => (
  <StripeProvider publishableKey={Constants.manifest.extra.publishableKey}>
    <BuyCoinsScreen />
  </StripeProvider>
);

const privateScreenConfig = {
  headerVisible: (isVisible) => ({
    headerShown: isVisible,
    headerTransparent: true,
    headerShadowVisible: false,
    title: null,
    headerTintColor: 'white',
  }),

  customHeader: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#185ADB',
  },

  customHeaderBackground: {
    backgroundColor: '#C5E4F3',
  },
};

const TabHomeScreen = ({ navigation }) => {
  const { setNavigationStack } = useContext(NavigationContext);

  useEffect(() => {
    setNavigationStack(navigation);
  }, []);

  return (
    <TabStack.Navigator screenOptions={privateScreenConfig.headerVisible(true)}>
      <TabStack.Screen
        options={{
          ...privateScreenConfig.headerVisible(true),
          headerTransparent: false,
          headerBackgroundContainerStyle: {
            ...privateScreenConfig.customHeaderBackground,
          },

          headerStyle: {
            ...privateScreenConfig.customHeader,
            height: 300,
          },
          headerTitle: (props) => <HomeHeader navigation={navigation} {...props} />,
          headerLeft: () => null,
        }}
        name={APPLICATION_NAVIGATION.HOME_SCREEN}
        component={HomeScreen}
      />
    </TabStack.Navigator>
  );
};

const TabAccountScreen = () => {
  return (
    <TabStack.Navigator screenOptions={privateScreenConfig.headerVisible(false)}>
      <TabStack.Screen
        options={{
          ...privateScreenConfig.headerVisible(true),
          headerTransparent: false,
          headerBackgroundContainerStyle: {
            ...privateScreenConfig.customHeaderBackground,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            ...privateScreenConfig.customHeader,
          },
          headerTitle: 'My ' + APPLICATION_NAVIGATION.ACCOUNT_SCREEN,
          headerLeft: () => null,
        }}
        name={APPLICATION_NAVIGATION.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
    </TabStack.Navigator>
  );
};

const TabBuyCoinsScreen = () => {
  return (
    <TabStack.Navigator screenOptions={privateScreenConfig.headerVisible(false)}>
      <TabStack.Screen
        options={{
          ...privateScreenConfig.headerVisible(true),
          headerTransparent: false,
          headerBackgroundContainerStyle: {
            ...privateScreenConfig.customHeaderBackground,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            ...privateScreenConfig.customHeader,
          },
          headerTitle: APPLICATION_NAVIGATION.SUBSCRIPTION_SCREEN,
          headerLeft: () => null,
        }}
        name={APPLICATION_NAVIGATION.SUBSCRIPTION_SCREEN}
        component={RootCoinsScreen}
      />
    </TabStack.Navigator>
  );
};

const TabNotificationScreen = () => {
  return (
    <TabStack.Navigator screenOptions={privateScreenConfig.headerVisible(false)}>
      <TabStack.Screen
        options={{
          ...privateScreenConfig.headerVisible(true),
          headerTransparent: false,
          headerBackgroundContainerStyle: {
            ...privateScreenConfig.customHeaderBackground,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            ...privateScreenConfig.customHeader,
          },
          headerTitle: APPLICATION_NAVIGATION.NOTIFICATION_SCREEN,
          headerLeft: () => null,
        }}
        name={APPLICATION_NAVIGATION.NOTIFICATION_SCREEN}
        component={NotificationScreen}
      />
    </TabStack.Navigator>
  );
};

export { TabHomeScreen, TabBuyCoinsScreen, TabNotificationScreen, TabAccountScreen };
