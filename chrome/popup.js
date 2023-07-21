
let defaultColor = document.getElementById('defaultColor');

function syncDefaultTheme() {
    chrome.storage.sync.get(['color','bgColor'], function (data) {
        defaultColor.style.backgroundColor = data.bgColor;
        defaultColor.style.color = data.color;
        defaultColor.setAttribute('bgValue', data.bgColor);
        defaultColor.setAttribute('colorValue', data.color);
    });

}

function changeTheme(element) {
    let bgValue = element.target.getAttribute("bgValue");
    let colorValue = element.target.getAttribute("colorValue");

    chrome.storage.sync.set({ bgColor: bgValue, color: colorValue }, function () {
        console.log('bgColor is ' + bgValue + ", color is " + colorValue);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + bgValue + '";document.body.style.color = "' + colorValue + '";' });
    });

    syncDefaultTheme();
}

// init default
defaultColor.onclick = changeTheme;
syncDefaultTheme();

//construct theme options
let page = document.getElementById('buttonDiv');
const kButtonColors = [['#3aa757'], ['#e8453c'], ['#f9bb2d'], ['#4688f1'], ['#000000', '#ffffff']];
function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let span = document.createElement('span');
        let bgValue = item[0];
        let colorValue= "";
        if(item.length > 1){
            colorValue = item[1];
        }
        span.style.backgroundColor = bgValue;
        span.style.color = colorValue;
        span.setAttribute('bgValue', bgValue);
        span.setAttribute('colorValue', colorValue);
        span.innerText = "T"

        span.onclick = changeTheme;
        page.appendChild(span);
    }
}

constructOptions(kButtonColors);