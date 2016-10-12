/**
 * Created by lily on 2016/10/3.
 */
//mongodb数据库参数配置
var user_name = 'lilythy';  //用户名
var password = '123456';    //密码
var db_url = 'localhost';   //主机名
var db_port = 27017;        //端口
var db_name = 'moviesite';  //database名称

//导出连接mongodb数据库的链接
exports.db_str = 'mongodb://' + user_name + ':' + password + '@' + db_url + ':' + db_port + '/' + db_name;