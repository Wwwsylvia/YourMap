/**
 * Created by HF Q on 2016/6/1.
 */
angular.module('registerModule',[])
.controller('RegisterCtrl', function ($scope, $state, $ionicPopup,$ionicNavBarDelegate) {
  $scope.goBack = function(){
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
    } else if (form.registerNickname.$error.required || form.registerNickname.$invalid) {
      alertError("昵称不合法!")
    } else if (form.registerPassword.$error.required || form.registerPassword.$invalid) {
      alertError("密码不合法!")
    } else if (!isEqual) {
      alertError("两次密码输入不一致!");
    }

    if (form.$valid && isEqual) {
      alertSuccess();
      $state.go('tab.personal');
    }
  };


});
