/**
 * Created by HF Q on 2016/5/26.
 */
angular.module('addNewSightModule',[])
.controller('AddNewSightCtrl',['$scope','$stateParams','$ionicNavBarDelegate','$cordovaImagePicker','$ionicActionSheet',function($scope,$stateParams,$ionicNavBarDelegate,$cordovaImagePicker,$ionicActionSheet){
  var lng = $stateParams.lng;
  var lat = $stateParams.lat;

  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }


  $scope.images_list = [];



  // "添加附件"Event
  $scope.addAttachment = function() {
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

        $scope.images_list.push(results[0]);

      }, function (error) {
        // error getting photos
      });

  }
}])
