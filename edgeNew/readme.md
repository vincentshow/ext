1. F12打开开发者工具，选择名为`Decryptor`的tab
<br/>![打开开发者工具panel](img/openpanel.png)
2. 刷新页面，开始请求试题库，一般是10题一次请求，所以依次选择第1题，第11题，第21题，以让此扩展逐步加载题库内容
3. 达到自己想要的题库数量后，保存题库内容，因开发者工具里的tab不允许打印和保存最新内容，按照下述方式保存题库
   - 右键`Decryptor`页面，选择`检查`以调出新的开发者工具窗口
   <br/>![打开panel的开发者工具](img/opendevforpanel.png)
   - 找到tab对应的`iframe`，在`html`这个元素上右键选择`复制元素`
   <br/>![copy html](img/copyhtml.png)
   - 创建一个空白文档，将复制的内容粘贴进去，保存为html文件
   - 用浏览器打开这个html文档，显示的就是题库内容
   - 打印可选择`添加页眉页脚`显示页码方便查阅 ，由于内容字体较大可视个人习惯选择缩放，比如80%打印
   <br/>![print](img/print.png)

Q&A

> 1. 刷新页面显示`malformed-utf8`错误

可能是加密key错误或者本地保存的和最新的不一致，通过清除题库站点的本地存储强制题库自动刷新加密key
- 打开开发者工具，切换到`应用程序`
<br/>![open storage](img/openstorage.png)
- 进入题库站点的本地存储，右键逐个删除
<br/>![delete storage](img/deletestorage.png)
- 重新刷新页面，页面报错继续再刷一次