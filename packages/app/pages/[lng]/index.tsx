import * as React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from 'components/ListItem';
import { firestore } from 'lib/initFirebase';
import { PageData } from 'lib/types';

import { useI18n, useSession } from 'hooks';
import { languages } from 'lib/i18n';
import { Heading, Grid } from '@chakra-ui/core';

const HomePage: NextPage = () => {
  const { user } = useSession();
  const uid = user?.uid || '';
  const query = firestore.collection('pages').where('uid', '==', uid).orderBy('createdAt', 'desc').limit(30);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });
  const i18n = useI18n();

  return (
    <>
      <Heading as="h1" size="2xl">
        {i18n.t('siteTitle')}
      </Heading>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']} gap={6}>
        {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
      </Grid>
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lng = String(params?.lng);
  const { default: common = {} } = await import(`locales/${lng}/common.json`);
  const { default: index = {} } = await import(`locales/${lng}/index.json`);
  const lngDict = {
    ...common,
    ...index,
  };
  return {
    props: { lng: lng, lngDict },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  };
};
export default HomePage;
