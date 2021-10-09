import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import { FormContext } from '../../../context/form.context';
import axios from 'axios';
import { BUY_COINS, FORM } from '../../../../utils/constant';
import { Image, Stack, HStack, Text, Modal, ScrollView, Divider, CheckIcon, Flex, VStack } from 'native-base';
import { CardContainer } from '../../../../components/shared/CardContainer/CardContainer';
import { ModalPortal } from '../../../../components/ModalPortal/ModalPortal';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import Firebase from '../../../../config/firebase';

const STRIPE_API_URL = 'https://stripe-gateway.netlify.app/.netlify/functions/index';
const db = Firebase.firestore();

const BuyCoinsScreen = (props) => {
  const { setFormSuccess, setRespError } = useContext(FormContext);
  const { authUser, authProfile, setAuthProfile } = useContext(AuthContext);

  const { confirmPayment, loading } = useConfirmPayment();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();

  const [coins, setCoins] = useState(BUY_COINS[0]);

  useEffect(() => {
    setEmail(authUser.email);
    setName('');
    setCardDetails();
    setCoins(BUY_COINS[0]);
  }, [authUser]);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(STRIPE_API_URL, { amount: eval(`10*${coins.value}`) });
    const { clientSecret, paymentMethodId, error } = await response.data;
    return { clientSecret, paymentMethodId, error };
  };

  const handlePayPress = async () => {
    setRespError(null);
    if (!cardDetails?.complete || !email) {
      setRespError(FORM.ERROR.PAYMENT_USER_DETAILS);
      return;
    }
    if (coins.value == 0) {
      setRespError(FORM.ERROR.COINS_LESS);
      return;
    }
    const billingDetails = {
      email: email,
      name: name,
    };
    try {
      const { clientSecret, paymentMethodId, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        setRespError(error);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: 'Card',
          paymentMethodId,
          billingDetails: billingDetails,
        });
        if (error) {
          setRespError(`${FORM.ERROR.PAYMENT_FAILED} ${error.message}`);
        } else if (paymentIntent) {
          db.collection('coins-buy')
            .add({
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
              coins: coins.value,
              userId: authUser.userId,
              cardHolderName: name,
              email: email,
              createdAt: paymentIntent.created,
            })
            .then(() => {
              db.collection('profiles')
                .doc(authProfile.profileId)
                .set({
                  userId: authUser.userId,
                  specalization: authProfile.specalization || 'NA',
                  totalExperience: authProfile.totalExperience || 'NA',
                  description: authProfile.description || 'NA',
                  profession: authProfile.profession || 'NA',
                  upVotes: authProfile.upVotes || [],
                  downVotes: authProfile.downVotes || [],
                  coins: authProfile.coins + coins.value,
                })
                .then(() => {
                  setFormSuccess(FORM.SUCCESS.PAYMENT_ACCEPT);
                  setAuthProfile({ ...authProfile, coins: authProfile.coins + coins.value });
                  setName('');
                  setCardDetails();
                  setCoins(BUY_COINS[0]);
                })
                .catch((err) => setRespError(err.message));
            })
            .catch((err) => setRespError(err.message));
        }
      }
    } catch (e) {
      setRespError(e.message);
    }
  };

  return (
    <>
      <Stack bg='primary.100' flex={1}>
        <View style={styles.container}>
          <HStack justifyContent='space-between' my={2}>
            <CardContainer width={160} px={3} onPress={() => setShowModal(true)}>
              <Image
                resizeMode='center'
                size='sm'
                source={require('../../../../assets/media/icons/coin-1.png')}
                alt='coin'
              />
              <Text color='primary.800' textAlign='center' letterSpacing={1} fontSize='3xl' fontWeight={700}>
                {coins.text} Coins
              </Text>
              <Text textAlign='center' color='gray.400' letterSpacing={2} fontSize='sm' fontWeight={100}>
                Choose Coins
              </Text>
            </CardContainer>
            <CardContainer alignItems='flex-start' px={2} py={8} width={215} onPress={() => {}}>
              <Text color='gray.400' fontSize='lg' fontWeight={100}>
                Total Pay
              </Text>
              <Text color='gray.400' fontSize='3xl' fontWeight={500}>
                10 x {coins.value} = ₹{eval(`10*${coins.value}`)}
              </Text>
            </CardContainer>
          </HStack>

          <TextInput autoCapitalize='none' placeholder='email' style={styles.input} value={email} />
          <TextInput
            autoCapitalize='none'
            placeholder='Card Holder Name'
            onChange={(value) => setName(value.nativeEvent.text)}
            style={styles.input}
            value={name}
          />
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
          <TextButton
            onPress={() => handlePayPress()}
            width='100%'
            bg='gray.400'
            textColor='white'
            text='Pay'
            disabled={loading}
            loading={loading}
            style={{ marginVertical: 10 }}
          />
        </View>
      </Stack>
      <ModalPortal title='Select Coins to Buy' showModal={showModal} closeModal={() => setShowModal(false)}>
        <Modal.Body>
          <ScrollView>
            <VStack>
              {BUY_COINS.map((coin, idx) => (
                <React.Fragment key={idx}>
                  <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => {
                      setCoins(coin);
                      setShowModal(false);
                    }}
                  >
                    <Flex flexDirection='row'>
                      <Text color='primary.800' mr='auto' letterSpacing={1} fontSize='2xl' fontWeight={700}>
                        {coin.text} Coins
                      </Text>
                      {coins.value == coin.value && <CheckIcon ml='auto' color='dark.400' />}
                    </Flex>
                  </TouchableHighlight>
                  <Divider bg='dark.300' opacity={0.3} my='2' />
                </React.Fragment>
              ))}
            </VStack>
          </ScrollView>
        </Modal.Body>
      </ModalPortal>
    </>
  );
};
export default BuyCoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  input: {
    backgroundColor: '#efefefef',
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: '#efefefef',
  },
  cardContainer: {
    height: 50,
    marginVertical: 10,
  },
});
