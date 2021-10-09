import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

import { KeyboardDissmiss } from '../../components/shared/KeyboardDismiss/KeyboardDissmiss';
import { SearchInput } from '../../components/shared/SearchInput/SearchInput';
import { APPLICATION_NAVIGATION } from '../../utils/applicationNavigation';
import { ACCOUNT_STATUS } from '../../utils/constant';
import { AuthContext } from '../publicScreens/context/auth.context';
import { NavigationContext } from './context/navigation.context';
import { ProfileProvider } from './context/profile.context';
import AllProfilesScreen from './modules/PublicViewScreens/AllProfilesScreen';
import CreateProfileScreen from './modules/ServiceScreens/CreateProfileScreen';
import CreateScheduleScreen from './modules/PublicViewScreens/CreateScheduleScreen';
import ProfileScreen from './modules/PublicViewScreens/ProfileScreen';
import SearchScreen from './modules/PublicViewScreens/SearchScreen';
import UpdateAccountScreen from './modules/ServiceScreens/UpdateAccountScreen';
import TabNavigators from './modules/TabScreens/TabNavigators';
import theme from '../../utils/theme';
import PendingRequestScreen from './modules/ServiceScreens/PendingRequestScreen';
import WalletScreen from './modules/ServiceScreens/WalletScreen';
import AllTransactionsScreen from './modules/ServiceScreens/AllTransactions';
import ScheduleAcceptedScreen from './modules/ServiceScreens/ScheduleAcceptedScreen';
import ChatScreen from './modules/PublicViewScreens/ChatScreen';

const PrivateStack = createStackNavigator();

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
    backgroundColor: theme().colors.primary[100],
  },
};

const PrivateScreenNavigator = () => {
  const { authUser, authProfile } = useContext(AuthContext);
  const { navigationStack } = useContext(NavigationContext);

  return (
    <ProfileProvider>
      <NavigationContainer>
        <PrivateStack.Navigator
          initialRouteName={
            authUser.status === ACCOUNT_STATUS.PENDING
              ? APPLICATION_NAVIGATION.CREATE_PROFILE_SCREEN
              : APPLICATION_NAVIGATION.TAB
          }
          screenOptions={privateScreenConfig.headerVisible(false)}
        >
          <PrivateStack.Screen
            options={privateScreenConfig.headerVisible(authProfile.isEdit)}
            name={APPLICATION_NAVIGATION.CREATE_PROFILE_SCREEN}
            component={CreateProfileScreen}
          />
          <PrivateStack.Screen
            options={{
              headerLeft: () => null,
            }}
            name={APPLICATION_NAVIGATION.TAB}
            component={TabNavigators}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
                height: 130,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerLeftContainerStyle: {
                marginTop: 10,
              },
              headerTitleAlign: 'left',
              headerTitle: (props) => <SearchInput width='90%' height={50} {...props} />,
            }}
            name={APPLICATION_NAVIGATION.SEARCH_SCREEN}
            component={SearchScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
                height: 190,
              },
              headerLeftContainerStyle: {
                justifyContent: 'flex-start',
                marginTop: 6,
              },
              headerTitleAlign: 'center',
              headerTitle: (props) => (
                <KeyboardDissmiss onPress={() => navigationStack.navigate(APPLICATION_NAVIGATION.SEARCH_SCREEN)}>
                  <SearchInput title={APPLICATION_NAVIGATION.PROFILES_SCREEN} />
                </KeyboardDissmiss>
              ),
            }}
            name={APPLICATION_NAVIGATION.PROFILES_SCREEN}
            component={AllProfilesScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
                height: 190,
              },
              headerLeftContainerStyle: {
                justifyContent: 'flex-start',
                marginTop: 6,
              },
              headerTitleAlign: 'center',
              headerTitle: (props) => (
                <KeyboardDissmiss onPress={() => navigationStack.navigate(APPLICATION_NAVIGATION.SEARCH_SCREEN)}>
                  <SearchInput title={APPLICATION_NAVIGATION.PROFILE_SCREEN} {...props} />
                </KeyboardDissmiss>
              ),
            }}
            name={APPLICATION_NAVIGATION.PROFILE_SCREEN}
            component={ProfileScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.CREATE_SCHEDULE_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.CREATE_SCHEDULE_SCREEN}
            component={CreateScheduleScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
            }}
            name={APPLICATION_NAVIGATION.UPDATE_ACCOUNT_SCREEN}
            component={UpdateAccountScreen}
          />

          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.PENDING_REQUEST_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.PENDING_REQUEST_SCREEN}
            component={PendingRequestScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.SCHEDULE_ACCEPTED_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.SCHEDULE_ACCEPTED_SCREEN}
            component={ScheduleAcceptedScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.WALLET_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.WALLET_SCREEN}
            component={WalletScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.CHAT_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.CHAT_SCREEN}
            component={ChatScreen}
          />
          <PrivateStack.Screen
            options={{
              ...privateScreenConfig.headerVisible(true),
              headerTransparent: false,
              headerBackgroundContainerStyle: {
                ...privateScreenConfig.customHeaderBackground,
              },
              headerStyle: {
                ...privateScreenConfig.customHeader,
              },
              headerTitleAlign: 'center',
              headerTitle: APPLICATION_NAVIGATION.TRANSACTION_SCREEN,
            }}
            name={APPLICATION_NAVIGATION.TRANSACTION_SCREEN}
            component={AllTransactionsScreen}
          />
        </PrivateStack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default PrivateScreenNavigator;
