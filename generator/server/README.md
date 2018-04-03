# node-express-server

一个node服务器得小demo，可以用来快速搭建一个本地服务器

## 安装：
```bash
$ cd node-express-demo
$ npm install 
```

## 运行
``` bash
$ node app.js 

```
注意：修改后端代码，需要重启服务（重新运行`node app.js`）

## 使用pm2运行
```
$ npm install pm2 -g

// 运行
$ pm2 start app.js  --name my-name 

// 运行，并监听改变，修改代码之后，会自动重启
$ pm2 start app.js --watch

// 查看云心结果
$ pm2 show app
 
// 实时查看日志
$ tail -f xxx/xxx.log

```

