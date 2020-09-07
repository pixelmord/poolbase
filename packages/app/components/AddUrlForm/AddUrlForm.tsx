import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core';
import { Field } from 'react-final-form';
import { useRouter } from 'next/router';
import * as z from 'zod';

import { api } from 'lib/api';

import Form from '../Form';

export const AddUrlForm: React.FC = () => {
  const router = useRouter();
  const onSubmit = async (data): Promise<void> => {
    try {
      await api.addURL(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={z.string()} submitText="Add" initialValues={{ url: router.query.url || '' }}>
      <Field name="url">
        {({ input, meta }) => (
          <FormControl isInvalid={meta.error}>
            <FormLabel htmlFor={input.name}>URL</FormLabel>
            <Input {...input} />
            {meta.error && meta.touched && <FormErrorMessage>{meta.error}</FormErrorMessage>}
          </FormControl>
        )}
      </Field>
    </Form>
  );
};
