// chrome extension中不能使用console.log
// 所以，需要通过发送请求给后台脚本的方式来打印日志
const log = (...args) => chrome.extension.sendRequest({
    tabId: chrome.devtools.tabId,
    args,
  });
  
  // 注册回调，每一个http请求响应后，都触发该回调
  chrome.devtools.network.onRequestFinished.addListener((...args) => {
    try {
        //log(args);
      const [{
        // 请求的类型，查询参数，以及url
        request: { method, postData, url }
      }] = args;
  
      if(method == "POST" && url.endsWith("PivotQuery"))
      {
        const {text} = postData;
        var query = JSON.parse(text);
        const { widgetId} = query;
        log(widgetId, "|", text);
        //   var query = JSON.parse(postData.text);
        //  log(query.widgetId, query, url);
      }
  
    } catch (err) {
      log(err.stack || err.toString());
    }
  });