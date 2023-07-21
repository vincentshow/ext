let youClickedOn; 

console.log("caonima");

chrome.devtools.panels.create("Sample Panel", "icon.png", "panel.html", panel => {
    // code invoked on panel creation
    panel.onShown.addListener( (extPanelWindow) => {
        let sayHello = extPanelWindow.document.querySelector('#sayHello');
        youClickedOn = extPanelWindow.document.querySelector('#youClickedOn');
        
        sayHello.addEventListener("click", () => {
            console.log("caonima");
            // show a greeting alert in the inspected page
            chrome.devtools.inspectedWindow.eval('alert("Hello from the DevTools extension");');
        });             
    });
});

var passphrase = "";
console.log("added");
chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        console.log(request);

        var url = request.request.url;
        if(url.endsWith("setPassphrase")){
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
console.log("next");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Messages from content scripts should have sender.tab set
    if (sender.tab && request.click == true) {
        console.log('I am here!');
        if (youClickedOn) {
            youClickedOn.innerHTML = `You clicked on position (${request.xPosition}, ${request.yPosition}) in the inspected page.`;
        }
        sendResponse({
            xPosition: request.xPosition,
            yPosition: request.yPosition
        });
    }
});

// Create a connection to the background service worker
const backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

// Relay the tab ID to the background service worker
backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});