chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#ffffff', bgColor: '#3aa757' }, function () {
    console.log('The bgcolor is green with white font color.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: "www.zaixiankaoshi.com" },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// 注册回调，当收到请求的时候触发
chrome.extension.onRequest.addListener(({ tabId, args }) => {

  // 在给定tabId的tab页中执行脚本
  chrome.tabs.executeScript(tabId, {
    code: `console.log(...${JSON.stringify(args)});`,
  });
});