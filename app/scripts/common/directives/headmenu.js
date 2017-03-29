'use strict';

define(['app'], function(app) {
	app.directive('headmenu', function () {
		return {
			templateUrl: '/views/common/frame/headmenu.html',
			restrict: 'E',
			replace: true,
		};
	});
});
