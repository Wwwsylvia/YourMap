/**
 * Created by HF Q on 2016/6/25.
 */
angular.module('footprintListModule',[])
.controller('footprintListCtrl',['$scope','$ionicNavBarDelegate','$http','$stateParams','$state',function($scope,$ionicNavBarDelegate,$http,$stateParams,$state){
  if ($stateParams.footprintType == 1) {
    $scope.title = "足迹";
  } else if ($stateParams.footprintType == 2) {
    $scope.title = "收藏";
  } else {
    $scope.title = "心愿单";
  }

  $scope.goBack = function () {
    $ionicNavBarDelegate.back();
  }
  if (window.map != undefined) {
    window.location.reload();
  }
  var map = new BMap.Map("footprintMap");
  window.map = map;
  var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
  map.centerAndZoom(point, 10);                 // 初始化地图，设置中心点坐标和地图级别
  map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
  var opts1 = {offset: new BMap.Size(10, 220)}
  map.addControl(new BMap.NavigationControl(opts1));
  var opts2 = {offset: new BMap.Size(10, 220)}
  var scaleControl = new BMap.ScaleControl(opts2);
  map.addControl(scaleControl);

  map.clearOverlays();    //清除地图上所有覆盖物

  $.ajax(server + "footprintListGet?footprintType=" + $stateParams.footprintType,{
    type:"GET",
    xhrFields:{withCredentials: true},
    crossDomain:true,
    success:function(response, status, xhr){
      console.log(response);
      if (response.error_type == 0) {
        $scope.mySights = response.sightList;
        $scope.data = [];
        for (var i = 0; i < $scope.mySights.length; i++) {
          var sight = $scope.mySights[i];

          var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25), // 指定定位位置
            imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
          });
          var point = new BMap.Point($scope.mySights[i].lng, $scope.mySights[i].lat);
          var myMarker = new BMap.Marker(point, {icon: myIcon});
          map.addOverlay(myMarker);

          var obj = {};
          obj.sightId = sight.sightId;
          obj.name = sight.name;
          obj.score = sight.avgScore;
          obj.url = sight.mainImg;
          $scope.data[i] = obj;
        }
      }
    }
  });

  $scope.delete = function(sightId){
    $.ajax(server + "footprintDelete?sightId="+sightId+"&footprintType=" + $stateParams.footprintType,{
      type:"GET",
      xhrFields:{withCredentials: true},
      crossDomain:true,
      success:function(response, status, xhr){
        console.log(response);
        if (response.error_type == 0) {

        }
      }
    });
  }

  $scope.toSight = function(name){
    $state.go('tab.map', {sightName: name});
  }

}])
