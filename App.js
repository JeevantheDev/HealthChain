import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import Routes from './navigation';
import theme from './utils/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
  if (fontsLoaded) {
    return (
      <>
        <NativeBaseProvider theme={theme()}>
          <Routes />
        </NativeBaseProvider>
        <StatusBar style='auto' />
      </>
    );
  } else {
    return <AppLoading onError={console.warn} />;
  }
}
