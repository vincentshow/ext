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

// let passphrase;
// chrome.webRequest.onCompleted.addListener(function(request){

//     var url = request.url;
//     if(url.endsWith("setPassphrase")){
//         console.log(request);
//         request.getContent(function(content){
//             console.log(content);
//         });
//     }
    
//     if(url.endsWith("ids")){
//         // console.log("catched ids...")
//         // request.getContent(function(content){
//         //     console.log(content);
//         // });
//         // console.log("catched ids...end")
//     }
    
//     console.log("catched " + request.url);
//     console.log(request);
// },{urls: ["*://www.zaixiankaoshi.com/*",]},);