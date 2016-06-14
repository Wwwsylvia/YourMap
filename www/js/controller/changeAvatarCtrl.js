/**
 * Created by HF Q on 2016/6/1.
 */
var myServer = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('changeAvatarModule',[])
.controller('ChangeAvatarCtrl', function ($ionicNavBarDelegate,$scope, $state,$ionicActionSheet,$cordovaCamera,$cordovaFileTransfer,$cordovaImagePicker) {
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
  $scope.changeState = function (path) {
    $state.go(path);
  };

  // "添加附件"Event
  $scope.addPhoto = function() {
    console.log("open");
    //nonePopover();
    $ionicActionSheet.show({
      buttons: [
        { text: '相机' },
        { text: '图库' }
      ],
      cancelText: '关闭',
      cancel: function() {
        return true;
      },
      buttonClicked: function(index) {

        switch (index){

          case 0:appendByCamera();
            break;
          case 1:

            pickImage();
            break;
          default:
            break;
        }
        return true;
      }
    });
  }


  //image picker
  var pickImage = function () {



    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {

        $scope.imageSrc=results[0];

      }, function (error) {
        // error getting photos
      });

  }


  $scope.uploadPhoto = function() {
    var requestParams = "?callback=JSON_CALLBACK";
    var server = encodeURI(myServer+'userHeadImgUpload' + requestParams);
    var fileURL = $scope.imageSrc;
    var options = {
      fileKey: "headImg",//相当于form表单项的name属性
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
