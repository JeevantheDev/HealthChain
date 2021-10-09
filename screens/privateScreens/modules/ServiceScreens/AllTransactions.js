import { ScrollView, Stack, VStack, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RequestCard } from '../../../../components/cards/RequestCard/RequestCard';

import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { FormContext } from '../../../context/form.context';
import { TransactionContext } from '../../../context/transaction.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';

const AllTransactionsScreen = ({ navigation }) => {
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
    return () => {
      setPendingTransactions();
    };
  }, []);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            {!isLoading && pendingTransactions && pendingTransactions.length == 0 && (
              <Text color='dark.400'>No Transactions Found...</Text>
            )}
            {(isLoading || !pendingTransactions ? Array.from(new Array(10)) : pendingTransactions).map(
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

AllTransactionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AllTransactionsScreen;
