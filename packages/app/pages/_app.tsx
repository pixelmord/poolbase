import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import { ColorModeProvider, ThemeProvider, CSSReset } from '@chakra-ui/core';

import '@elastic/react-search-ui-views/lib/styles/styles.css';
import I18n from 'lib/i18n';
import 'lib/logger';
import PageLayout from 'components/PageLayout';

export const App: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider>
      <ColorModeProvider value="dark">
        <CSSReset />
        <Global
          styles={css`
            #__next {
              height: 100vh;
            }
          `}
        />
        <Head>
          <title>Poolbase</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
        </Head>
        <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </I18n>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
