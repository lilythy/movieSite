/**
 * Created by lily on 2016/10/1.
 */
//引入express模块
var express = require('express');
//由express创建一个路由
var router = express.Router();
//引入movies.js文件
var movies = require('../controllers/movies.js');
/* 设置get方法路由映射. */
router.get('/all',movies.list);
//router.get('/:id',movies.update);

/* 设置post方法路由映射. */
router.post('/',movies.create);
router.post('/pic',movies.uploadPic);


//导出为router模块
module.exports = router;