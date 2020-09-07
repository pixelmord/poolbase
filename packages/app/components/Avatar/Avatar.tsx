import * as React from 'react';
import { Flex, Avatar as TUIAvatar } from '@chakra-ui/core';

import { UserProfileData, UserAccountData } from 'lib/types';

export const Avatar: React.FC<{ user: UserProfileData | UserAccountData }> = ({
  user,
}: {
  user: UserProfileData | UserAccountData;
}) => {
  if (user.photoURL) {
    return <TUIAvatar src={user.photoURL} />;
  }
  const name = (user as UserProfileData).displayName || (user as UserAccountData).name;
  return (
    <Flex
      bg="primary"
      color="white"
      rounded="50%"
      w="48px"
      h="48px"
      align="center"
      justify="center"
    >
      {!!name && name.split(' ').reduce((acc, name) => acc + name[0], '')}
    </Flex>
  );
};
export default Avatar;
