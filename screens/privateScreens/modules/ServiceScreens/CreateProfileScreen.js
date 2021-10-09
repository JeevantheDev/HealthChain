import { Box, KeyboardAvoidingView, Stack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { ProfileForm } from '../../../../components/ProfileForm/ProfileForm';
import { PublicHeader } from '../../../../components/PublicHeader/PublicHeader';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { TextButton } from '../../../../components/shared/TextButton/TextButton';
import { TopContainer } from '../../../../components/shared/TopContainer/TopContainer';
import Firebase from '../../../../config/firebase';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { ACCOUNT_STATUS, DEFAULT, FORM, USER_ROLES } from '../../../../utils/constant';
import { ACCOUNT } from '../../../../utils/validators';
import { FormContext } from '../../../context/form.context';
import { AuthContext } from '../../../publicScreens/context/auth.context';
import { ProfileContext } from '../../context/profile.context';

const db = Firebase.firestore();

const CreateProfileScreen = ({ navigation }) => {
  const { authUser, authProfile, setAuthProfile } = useContext(AuthContext);
  const { setRespError, setFormError, setFormSuccess } = useContext(FormContext);
  const { profileIdByUser } = useContext(ProfileContext);

  const [isLoading, setIsLoading] = useState(false);
  const [formObj, setFormObj] = useState({
    profession: '',
    specalization: '',
    totalExperience: '',
    description: '',
    coins: DEFAULT.COINS,
  });

  useEffect(() => {
    setFormError(null);
    setFormObj({
      profession: authProfile.profession,
      specalization: authProfile.specalization,
      totalExperience: authProfile.totalExperience,
      description: authProfile.description,
      coins: authProfile.coins,
    });
  }, [authProfile]);

  const onPressCreateProfile = async () => {
    const { profession, specalization, totalExperience, description, coins } = formObj;
    setFormError({
      profession: ACCOUNT.validProfession(profession) || '',
      specalization: ACCOUNT.validSpecalization(specalization) || '',
      totalExperience: ACCOUNT.validExperience(totalExperience) || '',
      description: ACCOUNT.validDescription(description) || '',
    });
    if (
      profession !== USER_ROLES.NONE &&
      (ACCOUNT.validSpecalization(specalization) ||
        ACCOUNT.validExperience(totalExperience) ||
        ACCOUNT.validDescription(description))
    )
      return;
    try {
      setIsLoading(true);
      await db
        .collection('users')
        .doc(authUser.userId)
        .set({ ...authUser, status: ACCOUNT_STATUS.COMPLETE })
        .then(() => {
          (authProfile.isEdit
            ? db
                .collection('profiles')
                .doc(authProfile.profileId)
                .set({
                  userId: authUser.userId,
                  specalization: specalization || 'NA',
                  totalExperience: totalExperience || 'NA',
                  description: description || 'NA',
                  profession,
                  coins,
                  upVotes: authProfile.upVotes,
                  downVotes: authProfile.downVotes,
                })
            : db.collection('profiles').add({
                userId: authUser.userId,
                specalization: specalization || 'NA',
                totalExperience: totalExperience || 'NA',
                description: description || 'NA',
                profession,
                coins,
                upVotes: [],
                downVotes: [],
              })
          )
            .then(async () => {
              setFormSuccess(authProfile.isEdit ? FORM.SUCCESS.UPDATE_PROFILE : FORM.SUCCESS.PROFILE);
              setAuthProfile({
                ...formObj,
                isEdit: true,
                userId: authUser.userId,
                profileId: authProfile.profileId ? authProfile.profileId : await profileIdByUser(authUser.userId),
              });
              navigation.navigate(APPLICATION_NAVIGATION.TAB);
            })
            .catch((err) => setRespError(err.message))
            .finally(() => setIsLoading(false));
        });
    } catch (error) {
      console.log('My Error', error);
      setRespError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Stack bg='primary.800' flex={1} direction='column'>
      <ScrollView>
        <TopContainer>
          <PublicHeader
            texts={[
              { color: 'yellow.400', value: 'My Profile', nested: {} },
              { color: 'yellow.400', value: 'With', nested: { color: 'white', value: 'HealthChain' } },
            ]}
            textDesc={`Please ${authProfile.isEdit ? 'Update' : 'Create'} Your Profile.`}
          />
        </TopContainer>
        <BottomContainer justifyContentValue='center' alignItemsValue='stretch' paddingB={16}>
          <KeyboardAvoidingView
            h={{
              base: '600px',
              lg: 'auto',
            }}
            behavior={'padding'}
          >
            <Box my={'auto'}>
              <ProfileForm formObj={formObj} setFormObj={setFormObj} />
            </Box>
            <Box mt={'auto'} justifyContent='center' alignItems='center'>
              <TextButton
                disabled={formObj.profession ? (isLoading ? true : false) : true}
                loading={isLoading}
                onPress={() => onPressCreateProfile()}
                text={
                  authProfile.isEdit
                    ? isLoading
                      ? 'Updating...'
                      : 'Update Profile'
                    : isLoading
                    ? 'Creating...'
                    : 'Create Profile'
                }
              />
            </Box>
          </KeyboardAvoidingView>
        </BottomContainer>
      </ScrollView>
    </Stack>
  );
};

CreateProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CreateProfileScreen;
