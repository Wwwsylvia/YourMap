/**
 * Created by HF Q on 2016/6/1.
 */
angular.module('changeAvatarModule',[])
.controller('ChangeAvatarCtrl', function ($ionicNavBarDelegate,$scope, $state,$ionicActionSheet,$cordovaCamera,$cordovaFileTransfer) {
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
  $scope.changeState = function (path) {
    $state.go(path);
  };

  // $scope.imgSrc = "../resources/test/head.png";

  $scope.addPhoto = function () {
    $ionicActionSheet.show({
      cancelOnStateChange: true,
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
