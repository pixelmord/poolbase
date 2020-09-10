import 'app/lib/logger';
import i18next, { defaultOptions } from '../../common/i18n';
import { api } from 'app/lib/api';
import { firestore } from 'app/lib/initFirebase';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-background'];
i18next.init(defaultOptions).then((t) => {
  console.info(t('siteTitle'));
});

const _on = false; // extension isn't on
const _popupOpen = false; // popup isn't open
const disable = (tab) => {
  chrome.browserAction.setBadgeText({ text: '', tabId: tab.id });
};
const enable = (tab) => {
  chrome.browserAction.setBadgeText({ text: 'ON', tabId: tab.id });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'crimson' });
};

chrome.browserAction.onClicked.addListener((tab) => {
  // _on ? disable(tab) : enable(tab);
  // _on = !_on;
  // _popupOpen = !_popupOpen;
  // console.info(tab, 'hello');
  // _popupOpen && chrome.browserAction.setPopup({ popup: 'popup.html' });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];
    try {
      await api.addURL({ url: activeTab.url });
      enable(tab);
      chrome.tabs.sendMessage(activeTab.id, {
        message: 'clicked_browser_action',
      });
    } catch (e) {
      console.error(e);
    }
  });
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const found = await checkUrlInDB(tab.url);
  if (found) {
    enable(tab);
    chrome.tabs.sendMessage(tab.id, {
      message: 'found_in_db',
    });
  } else {
    disable(tab);
  }
});

chrome.tabs.onActiveChanged.addListener((tabId) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  chrome.tabs.get(tabId, async (tab) => {
    const found = await checkUrlInDB(tab.url);
    if (found) {
      enable(tab);
      chrome.tabs.sendMessage(tab.id, {
        message: 'found_in_db',
      });
    } else {
      disable(tab);
    }
  });
});

const checkUrlInDB = async (url): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const snapshot = await firestore.collection('pages').where('url', '==', url).get();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!snapshot.docs.length;
};
