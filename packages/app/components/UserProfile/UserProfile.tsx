import { Box } from '@chakra-ui/core';

import { UserProfileData } from 'lib/types';

export interface UserProfileProps {
  profile: UserProfileData;
}
export const UserProfile: React.FC = (props: React.PropsWithChildren<UserProfileProps>) => {
  return <Box {...props} />;
};
export default UserProfile;
