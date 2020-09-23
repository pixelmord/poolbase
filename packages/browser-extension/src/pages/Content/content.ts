chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'found_in_db') {
    console.info(window.location);
  }
});
