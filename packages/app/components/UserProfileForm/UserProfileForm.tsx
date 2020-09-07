import { Box, Checkbox, FormLabel } from '@chakra-ui/core';
import Form from '../Form';

import { UserProfileData, UserProfileSchema } from 'lib/types';
import { api } from 'lib/api';
import LabeledTextField from 'components/LabeledTextField';

export interface UserProfileProps {
  profile: UserProfileData | Record<string, unknown>;
  onSuccess?: () => void;
}
export const UserProfileForm: React.FC<UserProfileProps> = (props: UserProfileProps) => {
  const onSubmit = async (data): Promise<void> => {
    try {
      console.log(data);
      await api.saveUserProfile(data);
      props.onSuccess && props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={UserProfileSchema} initialValues={props.profile} submitText="Save">
      <LabeledTextField name="displayName" label="Name" />
      <LabeledTextField name="email" label="email" type="email" />
      <Box>
        <FormLabel mb={3}>
          <Checkbox name="isEmailPublic" />
          Show email on profile
        </FormLabel>
      </Box>
      <LabeledTextField name="twitter" label="Twitter Username" />
      <LabeledTextField name="github" label="Github Username" />
    </Form>
  );
};
export default UserProfileForm;
