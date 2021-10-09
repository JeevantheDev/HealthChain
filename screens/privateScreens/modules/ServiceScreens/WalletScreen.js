import { ScrollView, Stack, VStack, Text, Center, Image, Box } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RequestCard } from '../../../../components/cards/RequestCard/RequestCard';

import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { FormContext } from '../../../context/form.context';
import { TransactionContext } from '../../../context/transaction.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ServiceText } from '../../../../components/shared/ServiceText/ServiceText';
import { TouchableOpacity } from 'react-native';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';

const WalletScreen = ({ navigation }) => {
  const { setRespError } = useContext(FormContext);
  const { authUser, authProfile } = useContext(AuthContext);
  const { pendingTransactions, setPendingTransactions, getAcceptedTransactions } = useContext(TransactionContext);

  const [isLoading, setIsLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAcceptedTransactions()
      .then((res) => {
        const filteredRequests = res.filter((request) => {
          if (request.data.fromProfile.userId === authUser.userId) {
            return request;
          }
        });
        setPendingTransactions(filteredRequests || []);
      })
      .catch((err) => {
        setRespError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            <Center>
              <Center position='relative' width={240} height={240} bg='yellow.500' borderRadius='full'>
                <Center mb={2}>
                  <Image
                    resizeMode='contain'
                    size='lg'
                    source={require('../../../../assets/media/icons/coin-1.png')}
                    alt='coin'
                  />
                  <Text letterSpacing={1} color='primary.800' fontSize='4xl' fontWeight='700'>
                    {authProfile.coins || 0} Coins
                  </Text>
                </Center>
                <TextButton
                  style={{ position: 'absolute', bottom: 0 }}
                  bg='gray.300'
                  textColor='white'
                  width={150}
                  height={35}
                  loading={false}
                  text='Buy'
                  onPress={() => navigation.navigate(APPLICATION_NAVIGATION.TAB_SUBSCRIPTION)}
                />
              </Center>
            </Center>
            <ServiceText text='My Transactions'>
              {!isLoading && pendingTransactions && pendingTransactions.length > 0 && (
                <TouchableOpacity onPress={() => navigation.navigate(APPLICATION_NAVIGATION.TRANSACTION_SCREEN)}>
                  <Text textDecoration='underline' color='gray.300' fontSize='lg' fontWeight='100'>
                    See all
                  </Text>
                </TouchableOpacity>
              )}
            </ServiceText>
            {!isLoading && pendingTransactions && pendingTransactions.length == 0 && (
              <Text color='dark.400'>No Transactions Found...</Text>
            )}
            {(isLoading || !pendingTransactions ? Array.from(new Array(10)) : pendingTransactions.slice(0, 4)).map(
              (request, idx) => (
                <RequestCard
                  showActionBtn={false}
                  navigation={navigation}
                  request={request}
                  active={idx}
                  activeIdx={activeIdx}
                  setActiveIdx={setActiveIdx}
                  key={idx}
                />
              ),
            )}
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

WalletScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WalletScreen;
