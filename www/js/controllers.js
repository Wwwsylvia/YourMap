angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('PersonalCtrl', function ($scope, $state) {
    $scope.changeState = function (path) {
      $state.go(path);
    };
  })


  .controller('RegisterCtrl', function ($scope, $state, $ionicPopup) {
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


  })

  .controller('LoginCtrl', function ($scope, $state) {
    $scope.changeState = function (path) {
      $state.go(path);
    };

    $scope.login = function () {
      $state.go('tab.personal');
    }
  })

  .controller('ChangeAvatarCtrl', function ($scope, $state,$ionicActionSheet,$cordovaCamera,$cordovaFileTransfer) {
    $scope.changeState = function (path) {
      $state.go(path);
    };

    $scope.addPhoto = function () {
      $ionicActionSheet.show({
        cancelOnstateChange: true,
        cssClass: 'actions_s',
        titleText: "图片来源",
        buttons: [
          {text: '拍照'},
          {text: '图库'}
        ],
        cancelText: '取消',
        cancel: function () {
          return true;
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              $scope.takePhoto();
              break;
            case 1:
              $scope.pickImage();
              break;
            default:
              break;
          }
          return true;
        }
      });
    };




    $scope.takePhoto = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,//Choose the format of the return value.
        sourceType: Camera.PictureSourceType.CAMERA,//资源类型：CAMERA打开系统照相机；PHOTOLIBRARY打开系统图库
        targetWidth: 300,//头像宽度
        targetHeight: 300//头像高度
      };


      $cordovaCamera.getPicture(options)
        .then(function (imageURI) {
          //Success
          $scope.imageSrc = imageURI;
          $scope.uploadPhoto();
        }, function (err) {
          //error
        });
    };


    $scope.pickImage = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,//Choose the format of the return value.
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//资源类型：CAMERA打开系统照相机；PHOTOLIBRARY打开系统图库
        targetWidth: 300,//头像宽度
        targetHeight: 300//头像高度
      };

      $cordovaCamera.getPicture(options)
        .then(function (imageURI) {
          //Success
          $scope.imageSrc = imageURI;
          $scope.uploadPhoto();
        }, function (err) {
          //Error
        });
    };


    $scope.uploadPhoto = function() {
      var requestParams = "?callback=JSON_CALLBACK";
      var server = encodeURI('注意这写的是你的后台请求地址' + requestParams);
      var fileURL = $scope.imageSrc;
      var options = {
        fileKey: "file",//相当于form表单项的name属性
        fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
        mimeType: "image/jpeg"
      };

      $cordovaFileTransfer.upload(server,fileURL,options)
        .then(function(result) {
          // Success!
          alert("Code = " + result.responseCode + "Response = " + result.response+ "Sent = " + result.bytesSent);
        }, function (err) {
          // Error
          alert("An error has occurred: Code = " + error.code + "upload error source " + error.source + "upload error target " + error.target);
        }, function (progress) {
          // constant progress updates
        });
    }


  });
