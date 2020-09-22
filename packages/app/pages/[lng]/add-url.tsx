import * as React from 'react';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from 'components/ListItem';
import { firestore } from 'lib/initFirebase';
import { PageData } from 'lib/types';
import { AddUrlForm } from 'components/AddUrlForm';

const AddUrlPage: NextPage = () => {
  const query = firestore.collection('pages').orderBy('createdAt', 'desc').limit(3);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });

  return (
    <>
      <AddUrlForm />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
    </>
  );
};

export default AddUrlPage;
