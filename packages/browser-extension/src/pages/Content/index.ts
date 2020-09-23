import 'app/lib/logger';
import i18next, { defaultOptions } from '../../common/i18n';
import './content';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-content'];
i18next.init(defaultOptions).then((t) => {
  console.info('content script:', t('siteTitle'));
});
