/**
 * Created by HF Q on 2016/6/1.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('loginModule',[])
.controller('LoginCtrl', function ($scope, $state,$ionicNavBarDelegate,$ionicPopup,$http) {
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

  $scope.login = function () {
    var account = $scope.account;
    var password = $scope.password;
    if (username == undefined || password == undefined || username == "" || password == "") {
      alertMsg("用户名密码不能为空");
      return;
    }

    $http.post(server+"userLogin",
      {
        account: account,
        password: password,
        type:""
      },
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function (data) {
          return $.param(data);
        }
      })
      .success(function(response){
        if (response.error_code == 0) {
          $state.go('tab.personal');
        } else {
          alertMsg("登录失败，"+response.error_message);
        }
      });

  }
});
