/**
 * Created by lily on 2016/9/25.
 */
//(function (app) {})(angular.module('app')),将angular声明的app模块传给function的参数'app',表示在app模块的作用域里执行以下语句
(function (app) {
	//使用严格模式
	'use strict';
	/*利用config方法做一些注册工作，这些工作需要在模块加载时完成
	* $stateProvider用于配置路由状态
	* $urlRouterProvider负责监视$location，当$location改变后，$urlRouterProvider将从一个列表，一个接一个查找匹配项，直到找到。
	* $locationProvider用于配置$location服务，去掉单页面应用链接中的'#' */
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		//AngularJS框架提供了一种HTML5模式的路由，设置为true就可以直接去掉#号
		$locationProvider.html5Mode(true);
		//访问其他不存在的路径时都跳到'/'
		$urlRouterProvider.otherwise('/');
		$stateProvider
		/*设置一个母版页状态为'movie'，路径为views目录下的menu.html
		* abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活*/
			.state('movie', {
				abstract: 'true',
				templateUrl: '/views/menu.html'
			})
			/*设置路由状态为movie.main,表示是menu.html下的一个子页面，该子页面的路径为views文件夹下的main.html文件。
			路由为'/'，对应的控制器名称为MainController
			 resolve 被使用来处理异步数据调用，以下是返回所有电影数据*/
			.state('movie.main', {
				url: '/',
				controller: 'MainController',
				templateUrl: '/views/main.html',
				resolve: {
					'movies': function (MovieService) {
						return MovieService.getAllMovies();
					}
				}
			})
			/**/
			.state('movie.update', {
				url: '/update',
				controller: 'MovieController',
				templateUrl: '/views/update.html',
				params: {
					data: null
				}
			})
			/* 设置路由状态'add',路由为'/addmovie'，对应的html页面为views文件夹下的'addmovie.html'，作用于该页面的控制器名称为'AddController' */
			.state('add', {
				url: '/addmovie',
				templateUrl: '/views/addmovie.html',
				controller: 'AddController',
			});
	});
})(angular.module('app'));