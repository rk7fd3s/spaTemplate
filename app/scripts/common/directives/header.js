'use strict';

define(['app'], function(app) {
	app.directive('header', function () {
		return {
			templateUrl: '/views/common/frame/header.html',
			restrict: 'E',
			replace: true,
		}
	});
});
