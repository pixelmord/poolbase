import * as React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { useI18n, useSession } from 'hooks';
import { languages } from 'lib/i18n';
import FirebaseAuth from 'components/FirebaseAuth';

const LoginPage: NextPage = () => {
  const i18n = useI18n();
  useSession();
  return (
    <>
      <h1>{i18n.t('title')}</h1>
      <FirebaseAuth />
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lng = String(params?.lng);
  const { default: common = {} } = await import(`locales/${lng}/common.json`);
  const { default: login = {} } = await import(`locales/${lng}/login.json`);
  const lngDict = {
    ...common,
    ...login,
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
export default LoginPage;
