import { HStack, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Application from 'expo-application';
import { ProfessionCard } from '../../../../components/cards/ProfessionCard/ProfessionCard';
import { ProfileCard } from '../../../../components/cards/ProfileCard/ProfileCard';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { ServiceText } from '../../../../components/shared/ServiceText/ServiceText';
import { APPLICATION_NAVIGATION } from '../../../../utils/applicationNavigation';
import { PROFESSIONS, USER_ROLES } from '../../../../utils/constant';
import { FormContext } from '../../../context/form.context';
import { ProfileContext } from '../../context/profile.context';

const ALL_PROFILES = [USER_ROLES.DOCTOR, USER_ROLES.PHARMACIST, USER_ROLES.XRAY_TECHNICIAN];

const HomeScreen = ({ navigation }) => {
  const { setRespError } = useContext(FormContext);
  const { allProfiles, setAllProfiles, getProfiles, filterQuery, setFilterQuery, updateFilterQuery } =
    useContext(ProfileContext);

  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  // console.log(Application.applicationId);

  useEffect(() => {
    if (!isFocused) return;
    updateFilterQuery({ type: 'search', value: '' });
    setIsLoading(true);
    getProfiles(ALL_PROFILES)
      .then((res) => {
        setAllProfiles(res || []);
      })
      .catch((err) => {
        setAllProfiles([]);
        setRespError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setAllProfiles();
    };
  }, [isFocused]);

  const onNavigateProfiles = (profileTypes) => {
    setFilterQuery({
      ...filterQuery,
      profession: [...profileTypes],
    });
    navigation.navigate(APPLICATION_NAVIGATION.PROFILES_SCREEN);
  };

  return (
    <>
      <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
        <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
          <ScrollView mt={0} mb={2}>
            <VStack>
              <ServiceText text='Check By Professions' />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack pb={3}>
                  {PROFESSIONS.map((profession, idx) => (
                    <ProfessionCard onChooseCard={onNavigateProfiles} profession={profession} key={idx} />
                  ))}
                </HStack>
              </ScrollView>
              <ServiceText text='Health Professionalist'>
                <TouchableOpacity onPress={() => onNavigateProfiles(ALL_PROFILES)}>
                  <Text textDecoration='underline' color='gray.300' fontSize='lg' fontWeight='100'>
                    See all
                  </Text>
                </TouchableOpacity>
              </ServiceText>
              {!isLoading && allProfiles && allProfiles.length == 0 && (
                <Text color='dark.400'>No Profiles Found...</Text>
              )}
              {(isLoading || !allProfiles ? Array.from(new Array(5)) : allProfiles.slice(0, 4)).map((profile, idx) => (
                <ProfileCard navigation={navigation} profile={profile} key={profile ? profile.data.profileId : idx} />
              ))}
            </VStack>
          </ScrollView>
        </BottomContainer>
      </Stack>
    </>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default HomeScreen;
