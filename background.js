let isFullscreen = false;

chrome.action.onClicked.addListener((tab) => {
  isFullscreen = !isFullscreen;
  chrome.windows.update(tab.windowId, { state: isFullscreen ? "fullscreen" : "maximized" });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.sync.get(['fullscreenUrls'], function(result) {
      if (result.fullscreenUrls && result.fullscreenUrls.includes(changeInfo.url)) {
        chrome.windows.update(tab.windowId, { state: "fullscreen" });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggleFullscreen') {
    chrome.windows.getCurrent({}, (window) => {
      isFullscreen = !isFullscreen;
      chrome.windows.update(window.id, { state: isFullscreen ? "fullscreen" : "maximized" });
    });
  } else if (request.message === 'saveUrl') {
    chrome.storage.sync.get(['fullscreenUrls'], function(result) {
      let urls = result.fullscreenUrls || [];
      urls.push(request.url);
      chrome.storage.sync.set({fullscreenUrls: urls});
    });
  }


  else if (request.message === 'removeUrl') {
    chrome.storage.sync.get(['fullscreenUrls'], function(result) {
      let urls = result.fullscreenUrls || [];
      urls = urls.filter(url => url !== request.url);
      chrome.storage.sync.set({fullscreenUrls: urls});
    });
  }
});