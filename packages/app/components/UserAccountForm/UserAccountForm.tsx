import Form from '../Form';
import { UserAccountData, UserAccountSchema } from 'lib/types';
import { api } from 'lib/api';
import LabeledTextField from 'components/LabeledTextField';

export interface UserAccountProps {
  account: UserAccountData | Record<string, unknown>;
  onSuccess?: () => void;
}
export const UserAccountForm: React.FC<UserAccountProps> = (props: UserAccountProps) => {
  const onSubmit = async (data): Promise<void> => {
    try {
      await api.saveUserAccount(data);
      props.onSuccess && props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={UserAccountSchema} initialValues={props.account} submitText="Save">
      <LabeledTextField name="name" label="Name" />
      <LabeledTextField name="email" label="email" type="email" />
    </Form>
  );
};
export default UserAccountForm;
