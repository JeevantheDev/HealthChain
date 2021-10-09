import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import theme from '../../../../utils/theme';
import { TabAccountScreen, TabHomeScreen, TabNotificationScreen, TabBuyCoinsScreen } from './TabScreens';

const Tab = createMaterialBottomTabNavigator();

const TabNavigators = () => {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor={theme().colors.primary[800]}
      barStyle={{ backgroundColor: theme().colors.yellow[500] }}
    >
      <Tab.Screen
        name={APPLICATION_NAVIGATION.TAB_HOME}
        component={TabHomeScreen}
        options={{
          tabBarLabel: APPLICATION_NAVIGATION.HOME_SCREEN,
          tabBarColor: theme().colors.singletons.white,
          tabBarIcon: ({ color }) => <MaterialIcon name='home' color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name={APPLICATION_NAVIGATION.TAB_SUBSCRIPTION}
        component={TabBuyCoinsScreen}
        options={{
          tabBarLabel: APPLICATION_NAVIGATION.SUBSCRIPTION_SCREEN,
          tabBarColor: theme().colors.singletons.white,
          tabBarIcon: ({ color }) => <FontAwesomeIcon name='coins' color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name={APPLICATION_NAVIGATION.TAB_NOTIFICATION}
        component={TabNotificationScreen}
        options={{
          tabBarLabel: APPLICATION_NAVIGATION.NOTIFICATION_SCREEN,
          tabBarColor: theme().colors.singletons.white,
          tabBarIcon: ({ color }) => <MaterialIcon name='bell' color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name={APPLICATION_NAVIGATION.TAB_ACCOUNT}
        component={TabAccountScreen}
        options={{
          tabBarLabel: APPLICATION_NAVIGATION.ACCOUNT_SCREEN,
          tabBarColor: theme().colors.singletons.white,
          tabBarIcon: ({ color }) => <MaterialIcon name='account-circle' color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigators;
