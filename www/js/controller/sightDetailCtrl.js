/**
 * Created by HF Q on 2016/5/28.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('sightDetailModule',[])
.controller('SightDetailCtrl',['$scope','$ionicNavBarDelegate','$ionicPopup','$state','$stateParams','$http',function($scope,$ionicNavBarDelegate,$ionicPopup,$state,$stateParams,$http){
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }

  alertMsg = function (msg) {
    var alertPopup = $ionicPopup.alert({
      title: msg,
    });
    alertPopup.then(function (res) {
    });
  };

  $scope.toComment = function(){
    if (!sightExist) {
      alertMsg('暂无该景点信息！');
      return;
    }
    $state.go('sightComment',{sightName:$stateParams.sightName,sightId:$scope.sight.sightId});
  }


  var stepW = 24;
  var description = new Array("1分","2分","3分","4分","5分");
  var stars = $("#star > li");
  var descriptionTemp;
  $("#showb").css("width",0);

  var sightExist = false;
  $http.get(server+"sightGetBySightName?sightName="+$stateParams.sightName)
    .success(function(response){
      console.log(response);
      var temp = response.sight;
      $scope.sight = {
        sightId:0,
        sightName:$stateParams.sightName,
        brief:"暂无",
        description:"暂无",
        score:0,
        coverImg:"",
        img:[],
        video:"",
        d3:"",
        otherInfo:"暂无"

      }
      if (response.error_type == 0) {
        sightExist = true;
        $scope.sight.sightId = temp.sightId;
        $scope.sight.sightName = temp.name;
        $scope.sight.brief = temp.description;
        $scope.sight.description = temp.detail;
        $scope.sight.score = temp.avgScore;
        $scope.sight.coverImg = temp.mainImg;
        $scope.sight.img = [];
        $scope.sight.video = temp.video;
        $scope.sight.otherInfo = temp.otherInfo;
      }

      var n = $scope.sight.score;
      if (n>5) n=5;
      console.log(n);
      $("#showb").css({"width":stepW*n});

    });




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
    $state.go('show3DSight');
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
        layer.msg("错误报告已提交");

      }

    });
  }

  $scope.addToPlan = function() {
    if (!sightExist) {
      alertMsg('暂无该景点信息！');
      return;
    }
    $.ajax(server + "footprintCreate?sightId="+$scope.sight.sightId+"&footprintType=3",{
      type:"GET",
      xhrFields:{withCredentials: true},
      crossDomain:true,
      success:function(response, status, xhr){
        console.log(response);
        if (response.error_type == 0) {
          layer.msg("加入心愿单成功");
        }
        if (response.error_type == 301) {
          layer.msg("您已经添加过了");
        }
      }
    });
  }

  $scope.addToFootprint = function() {
    if (!sightExist) {
      alertMsg('暂无该景点信息！');
      return;
    }
    $.ajax(server + "footprintCreate?sightId="+$scope.sight.sightId+"&footprintType=1",{
      type:"GET",
      xhrFields:{withCredentials: true},
      crossDomain:true,
      success:function(response, status, xhr){
        console.log(response);
        if (response.error_type == 0) {
          layer.msg("添加足迹成功");
        }
        if (response.error_type == 301) {
          layer.msg("您已经添加过了");
        }
      }
    });
  }

  $scope.addToStar = function(){
    if (!sightExist) {
      alertMsg('暂无该景点信息！');
      return;
    }
    $.ajax(server + "footprintCreate?sightId="+$scope.sight.sightId+"&footprintType=2",{
      type:"GET",
      xhrFields:{withCredentials: true},
      crossDomain:true,
      success:function(response, status, xhr){
        console.log(response);
        if (response.error_type == 0) {
          layer.msg("收藏成功");
        }
        if (response.error_type == 301) {
          layer.msg("您已经收藏过了");
        }
      }
    });
  }


}])
