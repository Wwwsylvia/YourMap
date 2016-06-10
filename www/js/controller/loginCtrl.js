/**
 * Created by HF Q on 2016/6/1.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('loginModule',[])
.controller('LoginCtrl', ['$scope', '$state','$ionicNavBarDelegate','$ionicPopup','$http',function ($scope, $state,$ionicNavBarDelegate,$ionicPopup,$http) {
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
  $scope.changeState = function (path) {
    $state.go(path);
  };

  alertMsg = function (msg) {
    var alertPopup = $ionicPopup.alert({
      title: msg,
    });
    alertPopup.then(function (res) {
    });
  };

  $scope.login = function (form) {
    var account = form.loginAccount.$modelValue;
    var password = form.loginPassword.$modelValue;
    console.log(account +" "+password);
    if (account == undefined || password == undefined || account == "" || password == "") {
      alertMsg("用户名密码不能为空");
      return;
    }

    $http.post(server+"userLogin",
      {
        account: account,
        password: password,
        type:"0"
      },
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function (data) {
          return $.param(data);
        }
      })
      .success(function(response){
        console.log(response);
        if (response.error_type == 0) {
          if (window.localStorage) {
            console.log("localStorage ");
            localStorage.setItem("isLogin", "login");
          } else {
            console.log("cookie");
            Cookie.write("isLogin", "login");
          }
          $state.go('tab.personal');
        } else {
          alertMsg("登录失败，"+response.error_message);
        }
      });

  }
}]);
