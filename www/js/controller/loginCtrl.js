/**
 * Created by HF Q on 2016/6/1.
 */
angular.module('loginModule',[])
.controller('LoginCtrl', function ($scope, $state,$ionicNavBarDelegate) {
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
  $scope.changeState = function (path) {
    $state.go(path);
  };

  $scope.login = function () {
    $state.go('tab.personal');
  }
});
