// chrome extension中不能使用console.log
// 所以，需要通过发送请求给后台脚本的方式来打印日志
const log = (...args) => chrome.extension.sendRequest({
  tabId: chrome.devtools.tabId,
  args,
});

let passphrase;
chrome.storage.local.get(["passphrase"], function (data) {
  passphrase = data.passphrase;
  log("last passphrase found in local storage is " + passphrase)
});

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  try {
    //log(request);

    const {
      // 请求的类型，查询参数，以及url
      request: { method, postData, url }
    } = request;

    if (url.endsWith("setPassphrase")) {
      /*
      {
        "code":"200",
        "data":{
                 "expire_at":"2023-07-22 15:21:40",
                 "passphrase":"Ad4IKN56HuEUzCMnSMdsjf==",
                 "second":"172800"},
        "time":"1689837700",
        "encrypt":"CjFDtvV2QzEGMrMhp24d8j=="}
      */
      request.getContent(function (content) {
        let response = JSON.parse(content);
        const newPassphrase = response.data.passphrase;
        //从接口获取
        if (newPassphrase == undefined || newPassphrase == null) {
          throw Error("no passphrase found in api.");
        }
        else {
          passphrase = newPassphrase;
          // chrome.storage.local.set({ passphrase: newPassphrase }, function () {
          //   log('set passphrase ' + newPassphrase);
          // });
        }
      });
    }

    //process encrypted response data
    if (url.endsWith("ids")) {
      request.getContent(function (content) {
        const decrypted = decryptContent(content, passphrase);
        log(decrypted);
      });
    }

  } catch (err) {
    log(err.stack || err.toString());
  }
});

function decryptContent(content, key) {
  const _key = CryptoJS.enc.Utf8.parse;
  const _content = CryptoJS.enc.Base64.parse(content);

  const decrypted = CryptoJS.TripleDES.decrypt(_content, _key);
  log(decrypted);

  return decrypted;
}