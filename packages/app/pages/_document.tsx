import * as React from 'react';
import { Box } from '@chakra-ui/core';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document<{ lang: string }> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { pathname } = ctx;
    const lang = pathname.startsWith('/de/') ? 'de' : 'en';
    return { ...initialProps, lang };
  }
  public render(): JSX.Element {
    const { lang } = this.props;
    return (
      <Html lang={lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="description" content="All your information in one place" />
          <meta name="keywords" content="bookmarks, groups, collaboration, search, information management" />

          <meta name="theme-color" content="#1887ED" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="Poolbase" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />

          <meta name="msapplication-navbutton-color" content="#1887ED" />
          <meta name="msapplication-TileColor" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          <meta name="application-name" content="Poolbase" />
          <meta name="msapplication-tooltip" content="All your informnation in one place" />
          <meta name="msapplication-starturl" content="/" />

          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable" />

          <meta name="layoutmode" content="fitscreen" />

          <meta name="screen-orientation" content="portrait" />
          <link href="/images/icons/icon16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/images/icons/icon32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="/images/icons/icon48.png" rel="icon" type="image/png" sizes="48x48" />

          <link href="/images/icons/icon32.png" rel="apple-touch-icon" />
          <link href="/images/icons/icon76.png" rel="apple-touch-icon" sizes="76x76" />
          <link href="/images/icons/icon120.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/images/icons/icon152.png" rel="apple-touch-icon" sizes="152x152" />

          <link href="/images/icons/touch-icon-start-up-320x480.png" rel="apple-touch-startup-image" />

          <link href="/images/icons/poolbase-icon.svg" rel="mask-icon" color="#1887ED" />

          <link href="/images/icons/icon192.png" rel="icon" sizes="192x192" />
          <link href="/images/icons/icon128.png" rel="icon" sizes="128x128" />

          <link href="/images/icons/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          <link href="/images/icons/icon57.png" rel="apple-touch-icon-precomposed" sizes="57x57" />
          <link href="/images/icons/icon72.png" rel="apple-touch-icon" sizes="72x72" />

          <link href="/manifest.json" rel="manifest" />
        </Head>
        <Box as="body">
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}
