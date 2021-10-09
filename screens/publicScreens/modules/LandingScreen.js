import { Stack } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { PublicHeader } from '../../../components/PublicHeader/PublicHeader';
import { BottomContainer } from '../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../components/shared/TextButton/TextButton';
import { TopContainer } from '../../../components/shared/TopContainer/TopContainer';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';

const HEADER_TEXTS = [
  { color: 'yellow.400', value: 'Welcome', nested: {} },
  { color: 'yellow.400', value: 'to', nested: { color: 'white', value: 'HealthChain' } },
];

const LandingScreen = ({ navigation }) => {
  return (
    <Stack bg='primary.800' flex={1} direction='column'>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../../assets/media/landing-showcase.png')}
        resizeMode='contain'
      >
        <TopContainer paddingT={8}>
          <PublicHeader texts={HEADER_TEXTS} textDesc='Resolve Health issue on successfull transaction.' />
        </TopContainer>
        <BottomContainer justifyContentValue='flex-end' alignItemsValue='center' paddingB={16}>
          <TextButton onPress={() => navigation.navigate(APPLICATION_NAVIGATION.LOGIN_SCREEN)} text='Get Started' />
        </BottomContainer>
      </ImageBackground>
    </Stack>
  );
};

LandingScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, justifyContent: 'center' },
});

export default LandingScreen;
