import { Button } from '@chakra-ui/core';

export type SubmitButtonProps = React.PropsWithChildren<{ submitting: boolean }>;
export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, submitting }: SubmitButtonProps) => (
  <Button isDisabled={submitting}>{children}</Button>
);
export default SubmitButton;
