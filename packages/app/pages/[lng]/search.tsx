import * as React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Heading, Stack } from '@chakra-ui/core';

import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';

import { useI18n, useSession } from 'hooks';
import { languages } from 'lib/i18n';

const connector = new AppSearchAPIConnector({
  searchKey: 'search-eieat6pp3xkf5zsuyawgxmax',
  engineName: 'poolbase-test',
  endpointBase: 'https://e7d9e917fe404514aca8d22de04649e4.ent-search.europe-west3.gcp.cloud.es.io',
});

const SearchPage: NextPage = () => {
  const i18n = useI18n();
  useSession();
  return (
    <Stack gridGap={5} py={5}>
      <Heading>{i18n.t('title')}</Heading>
      <SearchProvider
        config={{
          apiConnector: connector,
        }}
      >
        <SearchBox />
        <Results titleField="title" urlField="nps_link" />
      </SearchProvider>
    </Stack>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lng = String(params?.lng);
  const { default: common = {} } = await import(`locales/${lng}/common.json`);
  const { default: search = {} } = await import(`locales/${lng}/search.json`);
  const lngDict = {
    ...common,
    ...search,
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
export default SearchPage;
