import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Center, Image, Text, Skeleton, VStack, HStack, Box } from 'native-base';
import { CardContainer } from '../../shared/CardContainer/CardContainer';
import { ProfileContext } from '../../../screens/privateScreens/context/profile.context';
import { APPLICATION_NAVIGATION } from '../../../utils/applicationNavigation';
import { USER_ROLES } from '../../../utils/constant';

export const ProfileCard = ({ profile, navigation }) => {
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
            <Image size='sm' rounded='full' resizeMode='cover' source={{ uri: profile.avatar || '' }} alt={'avatar'} />
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='circle' height={6} size={12} />
          )}
        </VStack>
        <VStack flexDirection='column' flex={0.8}>
          {profile ? (
            <Text textAlign='left' lineHeight={'40px'} color='primary.800' fontSize='2xl' fontWeight='500'>
              {profile.data.profession === USER_ROLES.DOCTOR ? 'Dr.' : ''} {profile.fullname}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
          {profile ? (
            <Text
              textAlign='left'
              color='gray.400'
              fontSize='lg'
              lineHeight={'30px'}
              letterSpacing={2}
              fontWeight='100'
            >
              {profile.data.specalization}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
          {profile ? (
            <Text
              textAlign='left'
              color='gray.400'
              fontSize='lg'
              lineHeight={'30px'}
              letterSpacing={2}
              fontWeight='400'
            >
              {(profile.data.totalExperience || 0) + ' Experience'}
            </Text>
          ) : (
            <Skeleton startColor='gray.100' endColor='dark.100' variant='text' ml={1} height={6} />
          )}
        </VStack>
        <VStack flex={0.2}>
          {profile && (
            <HStack justifyContent='space-evenly'>
              <Box justifyContent='center' alignItems='center'>
                <Image size={6} source={require('../../../assets/media/icons/up.png')} alt='up' />
                <Text textAlign='center' color='green.500' fontSize='md' fontWeight='700'>
                  + {profile.data.upVotes.length || 0}
                </Text>
              </Box>
              <Box justifyContent='center' alignItems='center'>
                <Text textAlign='center' color='red.500' fontSize='md' fontWeight='700'>
                  - {profile.data.downVotes.length || 0}
                </Text>
                <Image size={6} source={require('../../../assets/media/icons/down.png')} alt='up' />
              </Box>
            </HStack>
          )}
        </VStack>
      </Center>
    </CardContainer>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.any,
  navigation: PropTypes.object,
};
