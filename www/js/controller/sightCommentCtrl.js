/**
 * Created by HF Q on 2016/6/3.
 */
angular.module('sightCommentModule',[])
.controller('SightCommentCtrl',['$scope','$stateParams',function($scope,$stateParams){
  var map = new BMap.Map("container");          // 创建地图实例
  var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
  var opts1 = {offset: new BMap.Size(10, 220)}
  map.addControl(new BMap.NavigationControl(opts1));
  var opts2 = {offset: new BMap.Size(10, 220)}
  var scaleControl = new BMap.ScaleControl(opts2);
  map.addControl(scaleControl);

  if ($stateParams.sightName != undefined){
    map.clearOverlays();    //清除地图上所有覆盖物
    var result;
    function myFun() {
      result = local.getResults();
      var pp = result.getPoi(0).point;    //获取第一个智能搜索的结果
      map.centerAndZoom(pp, 18);
      map.addOverlay(new BMap.Marker(pp));    //添加标注

      console.log(result);

      var circle = new BMap.Circle(pp,500,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); //创建圆


      map.addOverlay(circle);
      map.zoomTo(map.getZoom() - 2);

    }

    var local = new BMap.LocalSearch(map, { //智能搜索
      onSearchComplete: myFun
    });
    local.search($stateParams.sightName);



  }
}]);
