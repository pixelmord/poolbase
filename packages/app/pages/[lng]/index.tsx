import * as React from 'react';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from 'components/ListItem';
import { firestore } from 'lib/initFirebase';
import { PageData } from 'lib/types';

import { useI18n, useSession } from 'hooks';
import { languages } from 'lib/i18n';

const HomePage: NextPage = () => {
  const { user } = useSession();
  const uid = user?.uid || '';
  const query = firestore.collection('pages').where('uid', '==', uid).orderBy('createdAt', 'desc').limit(30);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });
  const i18n = useI18n();

  return (
    <>
      <h1>{i18n.t('siteTitle')}</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
    </>
  );
};
export async function getStaticProps({ params }) {
  const { default: common = {} } = await import(`locales/${params.lng}/common.json`);
  const { default: index = {} } = await import(`locales/${params.lng}/index.json`);
  const lngDict = {
    ...common,
    ...index,
  };
  return {
    props: { lng: params.lng, lngDict },
  };
}

export function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  };
}
export default HomePage;
