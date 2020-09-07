import { Input, InputProps, FormControl, FormControlProps, FormLabel, FormErrorMessage } from '@chakra-ui/core';
import { PropsWithoutRef, forwardRef } from 'react';
import { useField } from 'react-final-form';

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number';
  outerProps?: PropsWithoutRef<FormControlProps>;
}

// eslint-disable-next-line react/display-name
export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, type = 'text', ...props }: LabeledTextFieldProps, ref) => {
    const {
      input,
      meta: { touched, error, submitting },
    } = useField(name);

    return (
      <FormControl isInvalid={error} {...outerProps}>
        <FormLabel htmlFor={input.name}>{label}</FormLabel>
        <Input {...input} {...props} isDisabled={submitting} ref={ref} type={type} />
        {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default LabeledTextField;
