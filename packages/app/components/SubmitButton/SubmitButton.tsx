import { Button } from '@chakra-ui/core';

export type SubmitButtonProps = React.PropsWithChildren<{ submitting: boolean; pristine: boolean;}>;
export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, submitting, pristine }: SubmitButtonProps) => (
  <Button isDisabled={submitting || pristine} type="submit">{children}</Button>
);
export default SubmitButton;
