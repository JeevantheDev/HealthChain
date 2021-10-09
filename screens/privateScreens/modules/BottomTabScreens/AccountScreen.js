import { Box, Center, Image, Stack, Text, VStack } from 'native-base';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { ServiceCard } from '../../../../components/cards/ServiceCard/ServiceCard';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { SERVICES, USER_ROLES } from '../../../../utils/constant';
import { AuthContext } from '../../../publicScreens/context/auth.context';

const AccountScreen = ({ navigation }) => {
  const { authUser } = useContext(AuthContext);
  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack>
            <Center>
              <Box my={4} flexDirection='column'>
                <Center>
                  <Image size='lg' rounded='full' source={{ uri: authUser.avatar }} alt='avatar' />
                </Center>
                <Center my={4}>
                  <Text fontSize='2xl' letterSpacing={1} lineHeight={'30px'} color='dark.400' fontWeight={500}>
                    {authUser.fullname}
                  </Text>
                  <Text fontSize='lg' letterSpacing={1} color='dark.400' fontWeight={100}>
                    {authUser.email}
                  </Text>
                </Center>
              </Box>
            </Center>
            <Box mt={4}>
              {SERVICES.map((service, idx) => (
                <ServiceCard navigation={navigation} key={idx} service={service} />
              ))}
            </Box>
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

export default AccountScreen;
