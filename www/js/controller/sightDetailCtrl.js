/**
 * Created by HF Q on 2016/5/28.
 */
angular.module('sightDetailModule',[])
.controller('SightDetailCtrl',['$scope','$ionicNavBarDelegate','$ionicPopup','$state','$stateParams',function($scope,$ionicNavBarDelegate,$ionicPopup,$state,$stateParams){
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }

  $scope.toComment = function(){
    $state.go('sightComment',{sightName:$stateParams.sightName});
  }

  var stepW = 24;
  var description = new Array("1分","2分","3分","4分","5分");
  var stars = $("#star > li");
  var descriptionTemp;
  $("#showb").css("width",0);


  $scope.sight = {
    sightName:"复旦大学",
    brief:"张江大学五角场校区",
    description:"复旦大学坐落于上海杨浦区五角场，是张江大学的五角场校区",
    score:3.6,
    coverImg:"./img/perry.png",
    img:[['./img/adam.jpg','./img/ben.png','./img/mike.png'],['./img/adam.jpg','./img/ben.png','./img/mike.png'],['./img/adam.jpg','./img/ben.png','./img/mike.png']],
    video:"",
    d3:"",
    otherInfo:"asdfasfdaf"

  }

  var n = $scope.sight.score;
  if (n>5) n=5;
  console.log(n);
  $("#showb").css({"width":stepW*n});

  $scope.isShowMore = false;
  $scope.showText = "显示";
  $scope.showToggle = function(){
    if ($scope.showText == "显示") {
      $scope.isShowMore = true;
      $scope.showText = "隐藏";
    } else {
      $scope.isShowMore = false;
      $scope.showText = "显示";
    }
  }

  $scope.lookVideo = function(){

  }

  $scope.look3D = function(){

  }

  $scope.reportError = function(){
// 自定义弹窗
    $scope.data=[];
    var myPopup = $ionicPopup.show({
      template: '<input type="text" placeHolder="错误详情" ng-model="data.error">',
      title: '提交错误报告',
      subTitle: '请输入错误信息',
      scope: $scope,
      buttons: [
        {text: '取消'},
        {
          text: '<b>提交</b>',
          type: 'button-positive',
          onTap: function (e) {
            console.log('xx');
            if ($scope.data.error != "" && $scope.data.error != undefined) {
              return 200;

            } else {
              e.preventDefault();
            }
          }
        }
      ]
    });
    myPopup.then(function (res) {

      console.log('Tapped!', res);
      if (res == 200) {
        console.log($scope.data.error);

      }

    });
  }

  $scope.addToPlan = function() {

  }

  $scope.addToFootprint = function() {

  }

  $scope.addToStar = function(){

  }


}])
