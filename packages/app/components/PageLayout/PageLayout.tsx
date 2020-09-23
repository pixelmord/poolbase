import Head from 'next/head';
import { NextPage } from 'next';

import AppLayout from 'components/AppLayout';
import AppMain from 'components/AppMain';
import Header from '../Header';

import { useSession, useI18n } from 'hooks';
import { contentLanguageMap } from 'lib/i18n';

const PageLayout: NextPage = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;
  const { user } = useSession();
  const i18n = useI18n();
  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      {!user ? (
        <AppMain>{children}</AppMain>
      ) : (
        <AppLayout>
          <Header />
          <AppMain>{children}</AppMain>
        </AppLayout>
      )}
    </>
  );
};

export default PageLayout;
