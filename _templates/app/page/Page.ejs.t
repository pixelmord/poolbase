---
to: "<%= h.src() %>/pages/[lng]/<%= name %>.tsx"
---
import * as React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Heading } from '@chakra-ui/core';

import { useI18n, useSession } from 'hooks';
import { languages } from 'lib/i18n';

const <%= Name %>Page: NextPage = () => {
  const i18n = useI18n();
  useSession();
  return (
    <>
      <Heading>{i18n.t('title')}</Heading>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lng = String(params?.lng);
  const { default: common = {} } = await import(`locales/${lng}/common.json`);
  const { default: <%= name %> = {} } = await import(`locales/${lng}/<%= name %>.json`);
  const lngDict = {
    ...common,
    ...<%= name %>,
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
export default <%= Name %>Page;
