/**
 * Created by lily on 2016/9/25.
 */
(function (app) {
	'use strict';
	app.controller('MovieController', function ($scope, $rootScope, $state, $stateParams, MovieService, SessionStorage) {
		$scope.movie = $stateParams.data;
		if (!$scope.movie) {
			$scope.movie = SessionStorage.get('movie');
		} else {
			SessionStorage.save('movie', $scope.movie);
		}

		$scope.update = function () {
			var promise = MovieService.updateMovie($scope.movie, $scope.movie._id);
			promise.then(function (data) {
				alert('update success!');
				SessionStorage.delete('movie');
				$state.go('movie.main');
			});
		};
	});
})(angular.module('app'));