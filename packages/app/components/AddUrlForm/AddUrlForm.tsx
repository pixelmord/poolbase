import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core';
import { Field } from 'react-final-form';
import { useRouter } from 'next/router';
import * as z from 'zod';

import { api } from 'lib/api';

import Form from '../Form';

export const AddUrlForm: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (values): Promise<void> => {
    try {
      await api.addURL(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      submitText="Add"
      schema={z.object({ url: z.string() })}
      initialValues={{ url: router.query.url || '' }}
    >
      <Field
        name="url"
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.error}>
            <FormLabel htmlFor={input.name}>URL</FormLabel>
            <Input {...input} />
            {meta.error && meta.touched && <FormErrorMessage>{meta.error}</FormErrorMessage>}
          </FormControl>
        )}
      />
    </Form>
  );
};
