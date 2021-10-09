import { ScrollView, Stack, VStack, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProfileCard } from '../../../../components/cards/ProfileCard/ProfileCard';

import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { FormContext } from '../../../context/form.context';
import { ProfileContext } from '../../context/profile.context';

const AllProfilesScreen = ({ navigation }) => {
  const { setRespError } = useContext(FormContext);
  const { allProfiles, setAllProfiles, getProfiles, updateFilterQuery } = useContext(ProfileContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    updateFilterQuery({ type: 'search', value: '' });
    getProfiles()
      .then((res) => {
        setAllProfiles(res);
      })
      .catch((err) => {
        setRespError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setAllProfiles();
    };
  }, []);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={4}>
            {!isLoading && allProfiles && allProfiles.length == 0 && <Text color='dark.400'>No Profiles Found...</Text>}
            {(isLoading || !allProfiles ? Array.from(new Array(10)) : allProfiles).map((profile, idx) => (
              <ProfileCard navigation={navigation} profile={profile} key={idx} />
            ))}
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

AllProfilesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AllProfilesScreen;
