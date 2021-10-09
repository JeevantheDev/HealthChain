import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Center, Image, Text, Skeleton, VStack, HStack } from 'native-base';
import { CardContainer } from '../../shared/CardContainer/CardContainer';
import { ProfileContext } from '../../../screens/privateScreens/context/profile.context';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';
import { USER_ROLES } from '../../../utils/constant';

export const SearchProfileCard = ({ profile, navigation }) => {
  const { setSelectedProfile, filterQuery, setFilterQuery } = useContext(ProfileContext);

  const onPressCard = (profileObj) => {
    setFilterQuery({
      ...filterQuery,
      search: profileObj.fullname,
    });
    setSelectedProfile({ ...profileObj });
    navigation.navigate(APPLICATION_NAVIGATION.PROFILE_SCREEN);
  };

  return (
    <CardContainer onPress={() => (navigation && profile ? onPressCard(profile) : {})} mx={1} mb={3} py={3}>
      <Center flexDirection='row'>
        <VStack flex={0.3}>
          {profile ? (
            <Image size='xs' rounded='full' resizeMode='cover' source={{ uri: profile.avatar || '' }} alt={'avatar'} />
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='circle' height={6} size={12} />
          )}
        </VStack>
        <HStack flexDirection='column' flex={1}>
          {profile ? (
            <Text textAlign='left' lineHeight={'40px'} color='primary.800' fontSize='lg' fontWeight='500'>
              {profile.data.profession === USER_ROLES.DOCTOR ? 'Dr.' : ''} {profile.fullname}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
          {profile ? (
            <Text
              textAlign='left'
              color='gray.400'
              fontSize='sm'
              lineHeight={'30px'}
              letterSpacing={2}
              fontWeight='100'
            >
              {profile.data.specalization}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
        </HStack>
      </Center>
    </CardContainer>
  );
};

SearchProfileCard.propTypes = {
  profile: PropTypes.any,
  navigation: PropTypes.object,
};
