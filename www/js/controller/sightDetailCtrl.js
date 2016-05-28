/**
 * Created by HF Q on 2016/5/28.
 */
angular.module('sightDetailModule',[])
.controller('SightDetailCtrl',['$scope','$ionicNavBarDelegate',function($scope,$ionicNavBarDelegate){
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
}])
