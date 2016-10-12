/**
 * Created by lily on 2016/9/25.
 */
(function (app) {
	'use strict';
	app.controller('MainController', function ($scope, $rootScope, $state, SessionStorage, movies,DIR) {
		$rootScope.title = 'express_demo2';
		$scope.movies = movies;
		$scope.dir = DIR;

		$scope.updateMovie = function (movie) {
			SessionStorage.delete('movie');
			$state.go('movie.update', {data: movie});
		};
	});
})(angular.module('app'));