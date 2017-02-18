'use strict';

define([
  'app',
], function(app) {
  app.directive('sidebar', function() {

    return {
      templateUrl: '/views/common/frame/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function($scope, $translate, $state, $timeout) {
        $scope.currentStateName = '';
        $scope.openStateName = '';

        /** サイドバー本体DOM **/
        var $sideBar = angular.element('.sidebar-nav');

        /** コンテンツ本体　**/
        var $pageWrapper = angular.element('#page-wrapper');

        // ページステータス名を監視。
        $scope.$watch(function() {
          return $state.$current.name
        }, function(newVal) {
          $scope.currentStateName = newVal;
          $scope.openStateName = newVal.substr(0, newVal.lastIndexOf('.') + 1);

          // ページ移動後はメニューを閉じる(スマホサイズ)
          $sideBar.collapse('hide');
        })

        $scope.check = function(x) {
          if ($scope.openStateName.search(x) == 0) {
            $scope.openStateName = x.substr(0, x.search(/\.[^\.]+\.$/) + 1);
          } else {
            $scope.openStateName = x;
          }
        };

        $scope.isActiveMenu = function(stateName) {
          return ($scope.openStateName.search(stateName)==0) ? true : false;
            // return ($scope.currentStateName.search(stateName)==0 && $scope.openStateName.search(stateName)==0) ? true : false;
        };

        $scope.isCollapseMenu = function(stateName) {
          return ($scope.openStateName.search(stateName)!=0) ? true : false;
        };

        // メニュー展開時に、ページコンテンツ押下イベントを追加
        $sideBar.on('show.bs.collapse', function () {
          angular.element('#page-wrapper').on('click.bs.collapse', function(e) {
            // メニューを閉じる
            $sideBar.collapse('hide');
          });
        });

        // メニュー収納時に、ページコンテンツ押下イベントを削除
        $sideBar.on('hide.bs.collapse', function () {
          angular.element('#page-wrapper').off('click.bs.collapse');
        });

        $sideBar.collapse('hide');

        // windowのloadイベントを発火させる(高さ調整のため)
        $timeout(function(){
          angular.element(window).trigger('load');
        }, 0);
      }
    }
  });
});
