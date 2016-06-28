/**
 * Created by HF Q on 2016/6/29.
 */
angular.module('otherLoginModule',[])
.controller('otherLoginCtrl',['$scope','$state',function($scope,$state){
  window.location.href = "https://github.com/login/oauth/authorize?client_id=6cdfa6b91383b5732650&state=601&redirect_uri=http://localhost:8080/YourMap/www/result.html";
  $scope.goBack = function(){
    $state.go('login');
  }
}]);
