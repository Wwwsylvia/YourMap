/**
 * Created by HF Q on 2016/5/8.
 */
angular.module('personalModule',[])
  .controller('PersonalCtrl', function ($scope, $state) {
    $scope.changeState = function (path) {
      $state.go(path);
    };
  })
