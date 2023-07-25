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

function interceptRequest(details) {
    const { requestBody, url } = details;
    if (details.method == 'POST' && url.endsWith("ids")) {
        console.log(details);

        const rawBytes = new Uint8Array(requestBody.raw[0].bytes);
        const rawBody = decodeURIComponent(String.fromCharCode.apply(null, rawBytes));
        // const rawBody = readUTF(requestBody.raw[0].bytes);

        log("read original: ");
        log(rawBytes)
        log(rawBody);
        log(requestBody);

        const rawJson = JSON.parse(rawBody);
        rawJson.added = true;
        const changedRawBody = JSON.stringify(rawJson);
        const changedBytes = writeUTF(changedRawBody);
        //requestBody.raw[0].bytes = changedBytes;

        log("changed request body:");
        log(changedBytes);
        log(changedRawBody);
        log(requestBody);
    }
    return { requestBody }
}

function interceptResponse(request) {
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
            renderPaper(decrypted);
        });
    }
}

// 将字符串格式化为UTF8编码的字节
function writeUTF(str, isGetBytes = true) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.codePointAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x10000 <= code && code <= 0x10ffff)) {
            byteSize += 4;
            back.push((240 | (7 & (code >> 18))));
            back.push((128 | (63 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & (code))));
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back);
    }
}

// 读取UTF8编码的字节，并专为Unicode的字符串
function readUTF(arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i]);
        }
    }
    return UTF;
}

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

    try {
        const decrypted = CryptoJS.TripleDES.decrypt({
            ciphertext: _content
        },
            _key,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);

        return decrypted;
    } catch (error) {
        log(error.message);
        log({ msg: error.message, _content, _key });

        throw error;
    }
}