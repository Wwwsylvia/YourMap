/**
 * Created by HF Q on 2016/6/1.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('changeAvatarModule', [])
  .controller('ChangeAvatarCtrl', function ($ionicNavBarDelegate, $scope, $state, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker) {
    $scope.goBack = function () {
      $ionicNavBarDelegate.back();
    }
    $scope.changeState = function (path) {
      $state.go(path);
    };
    var image_file;
    var head_changed_flag = false;
    previewVideoCover = function () {
      var file = document.getElementById("video-cover-file").files[0];
      if (file) {
        if (file.type.substring(0, 5) == "image") {
          head_changed_flag = true;
          image_file = file;
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            var urlData = this.result;
            document.getElementById("video-cover-img").setAttribute("src", urlData);
          }
        }
        else {
          alert("不要调皮!封面只能是图片！");
        }
      }
    };
    // "添加附件"Event
    $scope.addPhoto = function () {
      $('#video-cover-file').trigger('click');
    }

    $scope.uploadPhoto = function () {
      var coverImg = image_file;
      var formData = new FormData();
      formData.append("headImg", coverImg);

      $.ajax({
        url: server + "userHeadImgUpload",
        type: 'POST',
        data: formData,

        /**
         * 必须false才会避开jQuery对 formdata 的默认处理
         * XMLHttpRequest会对 formdata 进行正确的处理
         */
        processData: false,
        /**
         *必须false才会自动加上正确的Content-Type
         */
        contentType: false,
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function (response) {
          console.log(response);
          if (response.error_type == 0) {
            layer.msg("修改成功");
            if (window.localStorage) {
              console.log("localStorage");

              localStorage.setItem("headImg", response.url);
            } else {
              console.log("cookie");

              Cookie.write("headImg", response.url);
            }
          }
        }
      });
    }


  });
