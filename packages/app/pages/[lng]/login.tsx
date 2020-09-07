import * as React from 'react';
import { NextPage } from 'next';

import { useI18n } from 'hooks';
import { languages } from 'lib/i18n';
import FirebaseAuth from 'components/FirebaseAuth';

const LoginPage: NextPage = () => {
  const i18n = useI18n();

  return (
    <>
      <h1>{i18n.t('title')}</h1>
      <FirebaseAuth />
    </>
  );
};
export async function getStaticProps({ params }) {
  const { default: common = {} } = await import(`locales/${params.lng}/common.json`);
  const { default: login = {} } = await import(`locales/${params.lng}/login.json`);
  const lngDict = {
    ...common,
    ...login,
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
export default LoginPage;
