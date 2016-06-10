/**
 * Created by HF Q on 2016/6/1.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('registerModule', [])
  .controller('RegisterCtrl', ['$scope', '$state', '$ionicPopup', '$ionicNavBarDelegate', '$http', function ($scope, $state, $ionicPopup, $ionicNavBarDelegate, $http) {
    $scope.goBack = function () {
      $ionicNavBarDelegate.back();
    }
    $scope.changeState = function (path) {
      $state.go(path);
    };


    alertError = function (message) {
      var alertPopup = $ionicPopup.alert({
        title: '注册失败!',
        template: message
      });
      alertPopup.then(function (res) {
        console.log(message);
      });
    };

    alertSuccess = function () {
      var alertPopup = $ionicPopup.alert({
        title: '注册成功!',
      });
      alertPopup.then(function (res) {
      });
    };

    $scope.signup = function (form, isEqual) {
      if (form.registerUsername.$error.required || form.registerUsername.$invalid) {
        alertError("用户名不合法!")
        return;
      } else if (form.registerNickname.$error.required || form.registerNickname.$invalid) {
        alertError("昵称不合法!")
        return;
      } else if (form.registerPassword.$error.required || form.registerPassword.$invalid) {
        alertError("密码不合法!")
        return;
      } else if (!isEqual) {
        alertError("两次密码输入不一致!");
        return;
      }
      var registerUsername = form.registerUsername.$modelValue;
      var registerNickname = form.registerNickname.$modelValue;
      var registerPassword = form.registerPassword.$modelValue;
      console.log(registerUsername);
      $http.post(server + "userRegister",
        {
          account: registerUsername,
          username: registerNickname,
          password: registerPassword,
          type: "0"
        },
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: function (data) {
            return $.param(data);
          }
        })
        .success(function (response) {
          console.log(response);
          if (response.error_type == 0) {
            $state.go('tab.personal');
          } else {
            alertError(response.error_message);
          }

        })
        .error(function(error){
          console.log(error);
        })

    };


  }]);

