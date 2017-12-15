# ycocoService
#### 保证依赖关系是安全的
nsp是一个命令行工具，用于检查Node Security项目漏洞数据库，以确定您的应用程序是否使用具有已知漏洞的软件包。安装如下：
```bash
$ npm i nsp -g
```
使用此命令提交npm-shrinkwrap.json/ package.json文件进行验证，以nodesecurity.io：
```bash
$ nsp check
```
Snyk提供了一个命令行工具和一个Github集成，可以检查您的应用程序与Snyk的开源漏洞数据库是否存在任何已知的依赖关系中的漏洞。按如下所示安装CLI：
```bash
$ npm install -g snyk
$ cd your-app
```
使用此命令测试您的应用程序是否存在漏洞：
```
$ snyk test
```
使用此命令打开一个向导，引导您完成应用更新或修补程序以修复发现的漏洞的过程：
```
$ snyk wizard
```
