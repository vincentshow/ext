
// chrome extension中不能使用console.log
// 所以，需要通过发送请求给后台脚本的方式来打印日志
// const log = (...args) => chrome.extension.sendRequest({
//     tabId: chrome.devtools.tabId,
//     args,
//   });

let passphrase;
chrome.storage.local.get(["passphrase"], function (data) {
    passphrase = data.passphrase;
    if (passphrase == undefined || passphrase == null) {
        passphrase = "ffI9rBa9F8B7ARBNkVudtS==";
        log("last passphrase NOT found in local storage,use default " + passphrase)
    }
    else {
        log("last passphrase found in local storage is " + passphrase)
    }
});

// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//         //interceptRequest(details);
//     },
//     { urls: ['*://www.zaixiankaoshi.com/*'] },
//     ['requestBody']);

chrome.devtools.network.onRequestFinished.addListener(function (request) {
    interceptResponse(request);
});