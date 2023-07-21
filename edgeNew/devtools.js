
chrome.devtools.panels.create("Decryptor", "icon.png", "panel.html", panel => {
    // code invoked on panel creation
    panel.onShown.addListener( (extPanelWindow) => {
        let signature = extPanelWindow.document.querySelector('#signature');
        signature.innerHTML = new Date();
        
        signature.addEventListener("click", () => {
            console.log("you clicked me!");
            // show a greeting alert in the inspected page
            chrome.devtools.inspectedWindow.eval('alert("Hello from the DevTools extension");');
        });             
    });
});