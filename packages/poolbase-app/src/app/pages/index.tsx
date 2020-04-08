/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import { firestore, collectionData } from '../utils/auth/initFirebase';

import PageLayout from '../components/PageLayout';
import { PropsWithAuthUserInfo } from '../interfaces';

const HomePage: NextPage<PropsWithAuthUserInfo> = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const query = firestore
      .collection('pages')
      .orderBy('created', 'desc')
      .limit(3);
    const subscription = collectionData(query, 'id').subscribe(setData);
    // Specify how to clean up after this effect:
    return function cleanup(): void {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <PageLayout>
      {data.map(
        (page): JSX.Element => (
          <Styled.h3 key={page.id}>{page.url}</Styled.h3>
        )
      )}
    </PageLayout>
  );
};

export default withAuthUser(HomePage);