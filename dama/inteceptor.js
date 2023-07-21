console.log("init loaded, test CryptoJS.enc.Utf8.parse");
console.log(CryptoJS.enc.Utf8.parse("秘钥"));

var passphrase = "";
chrome.devtools.panels.create("Sample Panel", "icon.png", "panel.html", panel => {
   // code invoked on panel creation
});

/*
chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        var url = request.request.url;
        if(url.endsWith("setPassphrase")){
            console.log(request);
            passphrase = request.getContent;
            console.log(passphrase);
        }
        
        if(url.endsWith("ids")){
            var content = request.getContent;
            console.log(content);
        }
        
        //request 包含请求响应数据，如：url,响应内容等
        //request.request.url 接口 的url
        //request.getContent 接口返回的内容
    }
);
*/