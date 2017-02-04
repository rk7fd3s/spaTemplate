# spaTempate v0.0.0

## Getting Started

### 開発に必要なソフトをPCにインストール
1. Node.js　http://nodejs.org/  
a. 使用しているPCのOSに合わせて、http://nodejs.org/download/ からインストーラーをダウンロードし、実行  
b. MacOSの場合：  
```shell
brew install node
```
2. Ruby https://www.ruby-lang.org/ja/  
a. Windowsの場合：http://rubyinstaller.org/downloads/ から最新のインストーラーをダウンロードし、実行  
b. MacOSの場合はインストールされているはず。。
```shell
ruby -v
```
インストールされていなければ下記を実行
```
brew install ruby
```

3. grunt-cli  (任意)ただし、grunt-cliをインストールしない場合は `grunt` を `node_modules/grunt/node_modules/grunt-cli/bin/grunt` に読み替えること
```shell
npm -g isntall grunt-cli
```
4. Compass  
```shell
sudo gem install compass
```

### package script
- npm start (npm install + bower install + grunt build)  
- npm install  
- bower install  
- grunt serve  
- grunt serve:dist  
- grunt build  

## Release History
0.0.0 base release.

---
