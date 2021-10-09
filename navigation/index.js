import React from 'react';
import { TransactionProvider } from '../screens/context/transaction.context';

import { FormProvider } from '../screens/context/form.context';
import { NavigationProvider } from '../screens/privateScreens/context/navigation.context';
import { AuthProvider } from '../screens/publicScreens/context/auth.context';
import RootNavigator from './RootNavigator';
import { ChatProvider } from '../screens/privateScreens/context/chat.context';
import { NotificationProvider } from '../screens/context/notification.context';

const Routes = () => {
  return (
    <NavigationProvider>
      <ChatProvider>
        <AuthProvider>
          <FormProvider>
            <NotificationProvider>
              <TransactionProvider>
                <RootNavigator />
              </TransactionProvider>
            </NotificationProvider>
          </FormProvider>
        </AuthProvider>
      </ChatProvider>
    </NavigationProvider>
  );
};

export default Routes;
