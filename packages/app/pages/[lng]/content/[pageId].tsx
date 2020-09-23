import { useState, useEffect } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { languages } from 'lib/i18n';
import { firestore, storage } from 'lib/initFirebase';
import { useI18n, useSession } from 'hooks';
import { PageData } from 'lib/types';
import { Image } from '@chakra-ui/core';

const ContentPage: NextPage = ({ pageId }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user } = useSession();

  const query = firestore.collection('pages').doc(pageId);
  const [data, loading, error] = useDocumentData<PageData>(query, { idField: 'id' });
  const i18n = useI18n();
  const [imageLink, setImageLink] = useState('');
  useEffect(() => {
    const getDownloadUrl = async (url) => {
      const link = await storage.ref(url).getDownloadURL();
      setImageLink(link);
    };
    if (data) {
      console.log(data);
      getDownloadUrl(data.screenshotFullUrl);
    }
  }, [data]);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && (
        <>
          <h1>{data.metaTitle}</h1>
          <Image src={imageLink} />
        </>
      )}
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = String(params?.pageId);
  const lng = String(params?.lng);
  const { default: common = {} } = await import(`locales/${lng}/common.json`);
  const { default: content = {} } = await import(`locales/${lng}/content.json`);
  const lngDict = {
    ...common,
    ...content,
  };
  return {
    props: { lng: lng, lngDict, pageId: pageId },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snap = await firestore.collection('pages').get();
  const pages = snap.docs;
  return {
    paths: pages.map((doc) => doc.id).flatMap((pageId) => languages.map((l) => ({ params: { lng: l, pageId } }))),
    fallback: true,
  };
};

export default ContentPage;
