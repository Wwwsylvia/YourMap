/**
 * Created by HF Q on 2016/6/25.
 */
angular.module('footprintListModule',[])
.controller('footprintListCtrl',['$scope','$ionicNavBarDelegate','$http','$stateParams',function($scope,$ionicNavBarDelegate,$http,$stateParams){
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
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
  var opts1 = {offset: new BMap.Size(10, 220)}
  map.addControl(new BMap.NavigationControl(opts1));
  var opts2 = {offset: new BMap.Size(10, 220)}
  var scaleControl = new BMap.ScaleControl(opts2);
  map.addControl(scaleControl);

  map.clearOverlays();    //清除地图上所有覆盖物

  //$http.get(server + "sightListGet?lng1=" + lng1 + "&lat1=" + lat1 + "&lng2=" + lng2 + "&lat2=" + lat2)
  //  .success(function (response) {
  //    console.log(response);
  //    if (response.error_type == 0) {
  //      $scope.mySights = response.sightList;
  //
  //      for (var i = 0; i < $scope.mySights.length; i++) {
  //        var sight = $scope.mySights[i];
  //
  //        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
  //          offset: new BMap.Size(10, 25), // 指定定位位置
  //          imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
  //        });
  //        var point = new BMap.Point($scope.mySights[i].lng, $scope.mySights[i].lat);
  //        var myMarker = new BMap.Marker(point, {icon: myIcon});
  //        map.addOverlay(myMarker);
  //      }
  //    }
  //  })

  $scope.data = [{
    "name": "虹桥火车站",
    "score": 4.5,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 5,
    "distanceText":"5km",
    "info": "购物街"
  }, {
    "name": "南京东路",
    "score": 4.5,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 66,
    "distanceText":"66km",
    "info": "购物街"
  }, {
    "name": "复旦大学",
    "score": 3.5,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 25,
    "distanceText":"25km",
    "info": "购物街"
  }, {
    "name": "南京东路",
    "score": 5.0,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 11,
    "distanceText":"11km",
    "info": "购物街"
  }, {
    "name": "张江高科",
    "score": 1.5,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 34,
    "distanceText":"34km",
    "info": "购物街"
  }, {
    "name": "南京东路",
    "score": 2.5,
    "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
    "distance": 10,
    "distanceText":"10km",
    "info": "购物街"
  },];

}])
