import { Flex, HStack, Image, Text } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { ProfileContext } from '../../../screens/privateScreens/context/profile.context';
import { AuthContext } from '../../../screens/publicScreens/context/auth.context';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';
import { PublicHeader } from '../../PublicHeader/PublicHeader';
import { CardContainer } from '../CardContainer/CardContainer';
import { KeyboardDissmiss } from '../KeyboardDismiss/KeyboardDissmiss';
import { SearchInput } from '../SearchInput/SearchInput';

export const HomeHeader = React.memo(({ navigation }) => {
  const { authUser, authProfile } = useContext(AuthContext);
  const { filterQuery, setFilterQuery } = useContext(ProfileContext);

  useEffect(() => {
    setFilterQuery({ ...filterQuery, search: '' });
  }, []);
  return (
    <>
      <Flex flexDirection='column' flex={1}>
        <HStack alignItems='center' justifyContent='space-between'>
          <View>
            <PublicHeader
              texts={[
                { color: 'white', value: 'HealthChain', nested: {} },
                {
                  color: 'yellow.400',
                  value: 'Hi,',
                  nested: { color: 'yellow.400', value: authUser.fullname.split(' ')[0] },
                },
              ]}
            />
          </View>
          <CardContainer onPress={() => navigation.navigate(APPLICATION_NAVIGATION.WALLET_SCREEN)}>
            <Image
              resizeMode='center'
              size='xs'
              source={require('../../../assets/media/icons/coin-1.png')}
              alt='coin'
            />
            <Text color='dark.400' fontSize='xl' fontWeight={700}>
              {authProfile.coins}
            </Text>
          </CardContainer>
        </HStack>
        <KeyboardDissmiss onPress={() => navigation.navigate(APPLICATION_NAVIGATION.SEARCH_SCREEN)}>
          <SearchInput navigation={navigation} />
        </KeyboardDissmiss>
      </Flex>
    </>
  );
});
