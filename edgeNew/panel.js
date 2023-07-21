
// chrome extension中不能使用console.log
// 所以，需要通过发送请求给后台脚本的方式来打印日志
// const log = (...args) => chrome.extension.sendRequest({
//     tabId: chrome.devtools.tabId,
//     args,
//   });

const log = (args) => {
    //console.log(args);

    let contentPanel = document.getElementById("content");
    let textBuilder = document.createElement('li');
    if ("string" != typeof (args)) {
        args = JSON.stringify(args);
    }
    textBuilder.innerText = args;

    contentPanel.appendChild(textBuilder);
};

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

chrome.devtools.network.onRequestFinished.addListener(function (request) {
    try {
        const {
            // 请求的类型，查询参数，以及url
            request: { method, postData, url }
        } = request;

        if (url.endsWith("setPassphrase")) {

            request.getContent(function (content) {
                passphrase = parseAndSavePass(content);
            });
        }

        //process encrypted response data
        if (url.endsWith("ids")) {
            request.getContent(function (content) {
                const decrypted = decryptContent(content, passphrase);
                log(JSON.parse(decrypted));
            });
        }

    } catch (err) {
        log(err.stack || err.toString());
    }
});

chrome.devtools.network.onRequestFinished.addListener(function (request) {
    try {
        const {
            // 请求的类型，查询参数，以及url
            request: { method, postData, url }
        } = request;

        if (url.endsWith("setPassphrase")) {

            request.getContent(function (content) {
                passphrase = parseAndSavePass(content);
            });
        }

        //process encrypted response data
        if (url.endsWith("ids")) {
            request.getContent(function (content) {
                const decrypted = decryptContent(content, passphrase);
                log(JSON.parse(decrypted));
            });
        }

    } catch (err) {
        log(err.stack || err.toString());
    }
});

/*
content structure：
{
  "data":{"passphrase":"Ad4IKN56HuEUzCMnSMdsjf=="}
}
*/
function parseAndSavePass(content) {

    //解析接口返回的数据
    let response = JSON.parse(content);
    const newPassphrase = response.data.passphrase;

    if (newPassphrase == undefined || newPassphrase == null) {
        const msg = "no passphrase found in api.";
        log(msg);
        throw Error(msg);
    }
    else {
        chrome.storage.local.set({ passphrase: newPassphrase }, function () {
            log('set passphrase from api ' + newPassphrase);
        });
    }

    return newPassphrase;
}

/*
Example:
- content: EmlYBsK0Hfu1tV5s3C6IaxAizWvDF9FtpDv1LxMtDObk6UQGXCSJw+FPu7PZAVcqc2bzLIfgVd+EtWumJJs7nqPwhZ4+oRzD7XztnZoto9Ts4yPRsxloIFWeVeTNud8j
- key: 72xvcZT9i9iM9DhZgzaq8G==
- output: '{"code":"200","data":{"1":"501"},"time":"1689850277","encrypt":"CwMDMVwrP2U6riSnw3Ygkb=="}'
*/
function decryptContent(content, key) {
    const _key = CryptoJS.enc.Utf8.parse(key);
    const _content = CryptoJS.enc.Base64.parse(content);

    const decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: _content
    },
        _key,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

    return decrypted;
}