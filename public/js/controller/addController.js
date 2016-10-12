/**
 * Created by lily on 2016/10/5.
 */
(function (app) {
	'use strict';
	//controller第一个参数是名称，后面是一个数组，数组的前面是声明注入的内容，可以是n个，最后是个function，function的参数个数也必须是n个，必须跟前面声明注入的内容一一对应
	app.controller('AddController',['$scope', 'Upload', '$state','MovieService', 'DIR', function ($scope, Upload, $state, MovieService, DIR) {
		//初始化数据库存的图片名称
		$scope.serverPicName = '';
		//引用自定义路径，并赋值给该作用域的dir变量
		$scope.dir = DIR;
		//定义图片预览的img标签是否显示，true则显示
		$scope.isShow = false;
		//定义上传图片方法
		$scope.uploadFiles = function(file, errFiles) {
			//将文件参数赋值给该作用域的f
			$scope.f = file;
			//$scope.size = ($scope.f.size/1024/1024).toFixed(2);
			//将文件错误参数传给该作用域的errFile
			$scope.errFile = errFiles && errFiles[0];
			//如果是文件的话，则调用Upload插件上传该文件
			if (file) {
				//调用Upload的upload()方法将data数据（即文件）上传至后台url处理
				file.upload = Upload.upload({
						url: 'http://localhost:3000/api/upload',
						data: {file: file}
				});
				//then方法里面有文件上传成功后要执行的语句，这里表示上传成功后则显示预览的img标签并将返回的数据赋给serverPicName
				file.upload.then(function (response) {
					$scope.isShow = true;
					$scope.serverPicName = response.data;
				}, function (response) {  //不成功则返回错误信息
					if (response.status > 0)
						$scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) { //执行上传行为时返回上传进度
					file.progress = Math.min(100, parseInt(100.0 *
						evt.loaded / evt.total));
				});
			}
		}

		//点击提交按钮后提交表单数据给后台的方法
		$scope.postMovie = function(){
			//获得隐藏input的值，即上传图片后后台返回前端唯一的图片名称
			var moviepic = document.getElementById("serverPicName").value;
			//生成一个1~10之间的星级数
			$scope.starNum = (Math.random()*10+1).toFixed(1);
			//将后台返回的图片名称赋给movie对象的moviepic属性
			$scope.movie.moviepic = moviepic;
			//将生成的星级数赋值给movie对象的starnum属性
			$scope.movie.starnum = $scope.starNum;
			//生成决定html页面使用哪个类的参数
			var starClass = (Math.round($scope.starNum)/2)*10;
			$scope.movie.starclass = starClass;
			//调用自定义服务MovieService里的addMovie方法，并将返回结果赋值给promise
			var promise = MovieService.addMovie($scope.movie);
			//数据提交成功后，刷新页面
			promise.then(function (data) {
				window.location.reload();
			});

		}

	}]);
})(angular.module('app'));