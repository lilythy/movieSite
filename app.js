
var express = require('express');                  //引入express框架
var path = require('path');                        //引用NodeJS中的Path模块，用于处理和转换文件路径
var favicon = require('serve-favicon');            //引入serve-favicon中间件，可以用于请求网页的logo
var logger = require('morgan');                    //引入用于记录日志的中间件morgan
var cookieParser = require('cookie-parser');       //引入cookieParser中间件，用于获取web浏览器发送的cookie中的内容
var bodyParser = require('body-parser');           //引入body-parser模块，用于对请求进行拦截和解析

var app = express();                               //express()表示创建express应用程序。
var router = require('./src/routers/movieRouter.js'); //引用自定义的路由文件
var mongoose = require('mongoose');                //引入mongoose模块
var Conf = require('./src/config/dbConfig.js');      //引入数据库配置文件，提供了连接数据库所需的参数

mongoose.connect(Conf.db_str);                     //通过配置文件内的链接连接mongodb数据库

app.use(logger('dev'));                            //将请求信息打印在控制台，便于开发调试
app.use(cookieParser());                           //装载cookie-parser模块，之后便可以解析cookie
app.use(bodyParser.json());                        //装载一个只解析json的中间件body-parser
app.use(bodyParser.urlencoded({extended: false})); // bodyParser.urlencoded是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded

app.use('/api', router);                           //http://localhost:3000/api下的请求都经过router文件拦截

app.set('views', path.join(__dirname, 'public'));  //设置模版文件夹的路径为/public
app.engine('.html', require('jade').__express);     //设置jade引擎支持.html后缀
app.set('view engine', 'html');                    //在调用render函数时能自动为我们加上'.html' 后缀
app.use(express.static(path.join(__dirname, 'public')));    //设置静态文件目录为/public

//所有http://localhost:3000下的请求都被拦截，然后渲染为/public目录下的index.html页面
app.use('/', function (req, res) {
	res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

// 如果404错误就交给错误处理程序
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发环境错误处理程序将会打印出错误
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
