import * as React from 'react';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from 'components/ListItem';
import { firestore } from 'lib/initFirebase';
import { PageData } from 'lib/types';
import { AddUrlForm } from 'components/AddUrlForm';
import { Grid, Stack } from '@chakra-ui/core';

const AddUrlPage: NextPage = () => {
  const query = firestore.collection('pages').orderBy('createdAt', 'desc').limit(3);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });

  return (
    <Stack gridGap={5}>
      <AddUrlForm />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']} gap={6}>
        {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
      </Grid>
    </Stack>
  );
};

export default AddUrlPage;
