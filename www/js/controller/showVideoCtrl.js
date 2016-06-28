/**
 * Created by HF Q on 2016/6/29.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('showVideoModule',[])
  .controller('showVideoCtrl',['$scope','$ionicNavBarDelegate','$stateParams','$http','$sce','$ionicPopup',function($scope,$ionicNavBarDelegate,$stateParams,$http,$sce,$ionicPopup){
    $scope.goBack = function(){
      $ionicNavBarDelegate.back();
    }

    $scope.videos = [];
    $scope.selectedUrl="";

    $scope.play = function (name,url){
      console.log(url);
      $scope.selectedUrl = $sce.trustAsUrl(url);
      var myPopup = $ionicPopup.show({
        template: '<video width="100%" src="'+url+'" preload loop autoplay>',
        title:name,
        scope: $scope,
        buttons: [
          {text: '关闭'},
        ]
      });
    }



    function getVideoList(){
      $http.get(server+"videoGet?sightId="+$stateParams.sightId)
        .success(function(response){
          console.log(response);
          if (response.error_type == 0) {
            for (var i=0;i<response.videoList.length;i++){
              var obj={};
              obj.name = "视频"+i;
              obj.url = server + response.videoList[i].url;
              $scope.videos[i] = obj;
            }
          }
        });
    }
    getVideoList();

    var image_file;
    var head_changed_flag = false;
    previewVideoCover = function () {
      var file = document.getElementById("video-cover-file").files[0];
      if (file) {
        layer.msg("已选择");
          $('#selectInfo').show();
          $('#confirmUploadPic').show();
          head_changed_flag = true;
          image_file = file;
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            var urlData = this.result;
            //document.getElementById("video-cover-img").setAttribute("src", urlData);
          }

      }
    };
    // "添加附件"Event
    $scope.addVideo = function () {
      $('#video-cover-file').trigger('click');
    }

    $scope.uploadVideo = function () {
      var coverImg = image_file;
      var formData = new FormData();
      formData.append("sightId", $stateParams.sightId);
      formData.append("video", coverImg);
      layer.msg("上传中......");
      $.ajax({
        url: server + "videoUpload",
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
            layer.msg("上传成功");
            getVideoList();
            $('#selectInfo').hide();
            $('#confirmUploadPic').hide();
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
  }]);
