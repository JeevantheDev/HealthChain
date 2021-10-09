import { Center, ScrollView, Stack, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { SearchProfileCard } from '../../../../components/cards/SearchProfileCard/SearchProfileCard';
import { BottomContainer } from '../../../../components/shared/BottomContainer/BottomContainer';
import { FormContext } from '../../../context/form.context';
import { ProfileContext } from '../../context/profile.context';

const SearchScreen = ({ navigation }) => {
  const { filterQuery, updateFilterQuery, getProfiles } = useContext(ProfileContext);
  const { setRespError } = useContext(FormContext);

  const [isLoading, setIsLoading] = useState(false);
  const [searchRes, setSearchRes] = useState();

  useEffect(() => {
    if (!filterQuery.search) return;

    setIsLoading(true);
    getProfiles()
      .then((res) => {
        const filterRes = res.filter(
          (profile) => profile.fullname.toLowerCase().search(filterQuery.search.toLowerCase()) !== -1,
        );
        setSearchRes(filterRes || []);
      })
      .catch((err) => setRespError(err.message))
      .finally(() => setIsLoading(false));

    // return () => {
    //   updateFilterQuery({ type: 'search', value: '' });
    // };
  }, [filterQuery.search]);

  return (
    <Stack bg='primary.100' flex={1} justifyContent='flex-end'>
      <BottomContainer alignItemsValue='stretch' flexValue={1} paddingT={0} paddingB={0} paddingX={4}>
        <ScrollView>
          <VStack my={10}>
            {!filterQuery.search && (
              <Text textAlign='center' color='dark.400' fontWeight={100}>
                Search By Name...
              </Text>
            )}
            <Text display='flex' flexDirection='column' flex={1}>
              {filterQuery.search && !isLoading && searchRes && searchRes.length === 0 && (
                <Text color='dark.400' fontWeight={100}>
                  No Profiles Found...
                </Text>
              )}
              {filterQuery.search &&
                (isLoading || !searchRes ? Array.from(new Array(10)) : searchRes).map((profile, idx) => (
                  <SearchProfileCard navigation={navigation} profile={profile} key={idx} />
                ))}
            </Text>
          </VStack>
        </ScrollView>
      </BottomContainer>
    </Stack>
  );
};

SearchScreen.proptypes = {
  navigation: PropTypes.object.isRequired,
};

export default SearchScreen;
