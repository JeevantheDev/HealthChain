import { Box, Center, Divider, HStack, Image, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { ProfileCard } from '../../../../components/cards/ProfileCard/ProfileCard';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { CardContainer } from '../../../../components/shared/CardContainer/CardContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import Firebase from '../../../../config/firebase';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { FORM, USER_ROLES } from '../../../../utils/constant';
import { FormContext } from '../../../context/form.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ProfileContext } from '../../context/profile.context';

const db = Firebase.firestore();

const BUTTONS = [
  { image: require('../../../../assets/media/icons/up.png'), type: 'Up' },
  { image: require('../../../../assets/media/icons/down.png'), type: 'Down' },
];

const ProfileScreen = ({ navigation }) => {
  const { selectedProfile, setSelectedProfile } = useContext(ProfileContext);
  const { authUser } = useContext(AuthContext);
  const { setRespError, setFormSuccess } = useContext(FormContext);

  const [submitLoading, setSubmitLoading] = useState(false);

  const voteAction = async (type) => {
    try {
      setSubmitLoading(true);
      await db
        .collection('profiles')
        .doc(selectedProfile.data.profileId)
        .set({
          ...selectedProfile.data,
          ...getVotes(type, selectedProfile.data.upVotes, selectedProfile.data.downVotes),
        })
        .then(() => {
          setFormSuccess(type === 'up' ? FORM.SUCCESS.PROFILE_UP_VOTE : FORM.SUCCESS.PROFILE_DOWN_VOTE);
          setSelectedProfile({
            ...selectedProfile,
            data: {
              ...selectedProfile.data,
              ...getVotes(type, selectedProfile.data.upVotes, selectedProfile.data.downVotes),
            },
          });
        })
        .catch((err) => setRespError(err.message))
        .finally(() => setSubmitLoading(false));
    } catch (error) {
      setRespError(error.message);
      setSubmitLoading(false);
    }
  };

  const getVotes = (type, upVotes, downVotes) => {
    const filteredVotes = (type === 'up' ? downVotes : upVotes).filter((vote) => vote !== authUser.userId);
    const updatedVotes = [
      ...(type === 'up' ? selectedProfile.data.upVotes : selectedProfile.data.downVotes),
      authUser.userId,
    ];

    return {
      upVotes: type === 'up' ? updatedVotes : filteredVotes,
      downVotes: type === 'down' ? updatedVotes : filteredVotes,
    };
  };

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            <ProfileCard profile={selectedProfile} />
            <Box my={2} alignItems='stretch'>
              <TextButton
                disabled={authUser.userId === selectedProfile.data.userId}
                width={'100%'}
                onPress={() => navigation.navigate(APPLICATION_NAVIGATION.CREATE_SCHEDULE_SCREEN)}
                text={'Request Shedule'}
              />
            </Box>
            {authUser.userId !== selectedProfile.data.userId && (
              <HStack my={3} justifyContent='center' alignItems='center'>
                {BUTTONS.map((button, idx) => (
                  <CardContainer
                    disabled={
                      (button.type === 'Up' && [...selectedProfile.data.upVotes].includes(authUser.userId)) ||
                      (button.type === 'Down' && [...selectedProfile.data.downVotes].includes(authUser.userId))
                    }
                    bg={
                      (button.type === 'Up' && [...selectedProfile.data.upVotes].includes(authUser.userId)) ||
                      (button.type === 'Down' && [...selectedProfile.data.downVotes].includes(authUser.userId))
                        ? 'gray.200'
                        : 'white'
                    }
                    mx={4}
                    key={idx}
                    onPress={() => voteAction(button.type.toLowerCase())}
                  >
                    <Center>
                      <Image size='xs' resizeMode='contain' source={button.image} alt='upvote' />
                      <Text fontSize='lg' color='dark.400' fontWeight={700}>
                        {button.type}
                      </Text>
                    </Center>
                  </CardContainer>
                ))}
              </HStack>
            )}
            <CardContainer shadow={0} py={3} alignItems='baseline' my={3} width='100%' onPress={() => {}}>
              <Text textAlign='left' letterSpacing={1} fontSize='3xl' color='gray.400' fontWeight={400}>
                About{' '}
                <Text letterSpacing={1} textAlign='left' fontSize='3xl' color='primary.800' fontWeight={500}>
                  {selectedProfile.data.profession === USER_ROLES.DOCTOR ? 'Dr.' : ''}{' '}
                  {selectedProfile.fullname.split(' ')[0]}
                </Text>
              </Text>
              <Divider letterSpacing={1} opacity={0.1} my={2} />
              <Box my={3}>
                <Text letterSpacing={2} textAlign='left' fontSize='lg' color='gray.400' fontWeight={100}>
                  {selectedProfile.data.description}
                </Text>
              </Box>
            </CardContainer>
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
