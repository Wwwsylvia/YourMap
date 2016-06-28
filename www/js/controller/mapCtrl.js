/**
 * Created by HF Q on 2016/5/8.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('mapModule', [])
  .controller('MapCtrl', ['$scope', '$ionicPopup', '$timeout', '$interval', '$http', '$state', '$stateParams','DistanceService', function ($scope, $ionicPopup, $timeout, $interval, $http, $state, $stateParams,DistanceService) {
    // var selectedSightID;
    $scope.labelIndex = [0, 1, 2, 3, 4, 5];
    $scope.labelClass = ['label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];
    $scope.labelName = ['游乐园', '自然景观', '商城', '人文景观', '美食', '科技馆'];

    console.log("in map");
    console.log(window.map);
    if (window.map != undefined) {
      window.location.reload();
    }
    console.log(window.map);
    var map = new BMap.Map("container");          // 创建地图实例
    window.map = map;
    var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
    map.centerAndZoom(point, 14);                 // 初始化地图，设置中心点坐标和地图级别
    map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
    var opts1 = {offset: new BMap.Size(10, 320)}
    var opts2 = {offset: new BMap.Size(10, 320)}
    var opts3 = {offset: new BMap.Size(5, 350), enableAutoLocation: true} //定位控件位置
    map.addControl(new BMap.NavigationControl(opts1));

    var scaleControl = new BMap.ScaleControl(opts2);
    map.addControl(scaleControl);


    // 设置定位控件 start
    var geolocationControl = new BMap.GeolocationControl(opts3);

    geolocationControl.addEventListener("locationSuccess", function (e) {
      // 定位成功事件
      console.log(e.addressComponent);
      locateMe(true);

    });

    var geolocation = new BMap.Geolocation();
    $scope.myPoint = new BMap.Point(121.48, 31.22);

    function locateMe(forceLocate) {
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var myMarker = new BMap.Marker(r.point);
          // map.clearOverlays();
          map.addOverlay(myMarker);
          if ($stateParams.sightName == undefined || forceLocate) {
            map.panTo(r.point);
            getNearByList();
          }
          $scope.myPoint  = r.point;
          console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        }
      }, {enableHighAccuracy: true})
    }

    locateMe(false);

    map.addControl(geolocationControl);
    // 设置定位控件 end





    // 提示控件 start
    $timeout(function () {
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
          "input": "suggestId", "location": map
        });

      ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $("#searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        $("#searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();
      });
      function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
    }, 1500);


    // 提示控件 end


    // 定义一个控件类,即function
    function lookSightDetail() {
      // 默认停靠位置和偏移量
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
      this.defaultOffset = new BMap.Size(50, 20);
    }

    // 通过JavaScript的prototype属性继承于BMap.Control
    lookSightDetail.prototype = new BMap.Control();

    // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
    lookSightDetail.prototype.initialize = function (map) {
      // 创建一个DOM元素
      var div = document.createElement("div");
      // 添加文字说明
      div.appendChild(document.createTextNode("查看景点详情"));
      // 设置样式
      div.style.cursor = "pointer";
      div.style.border = "1px solid gray";
      div.style.backgroundColor = "white";
      // 绑定事件,点击一次放大两级
      div.onclick = function (e) {
        if ($stateParams.sightName != undefined) {
          $state.go('sightDetail', {sightName: $stateParams.sightName});
        } else {
          layer.msg("请选择一个景点");
        }
      }
      // 添加DOM元素到地图中
      map.getContainer().appendChild(div);
      // 将DOM元素返回
      return div;
    }
    // 创建控件
    var myDetailCtrl = new lookSightDetail();
    // 添加到地图当中
    map.addControl(myDetailCtrl);





    if ($stateParams.sightName != undefined) {
      map.clearOverlays();    //清除地图上所有覆盖物
      var result;

      function myFun() {
        result = local.getResults();
        var pp = result.getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注

        console.log(result);

      }

      var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
      });
      local.search($stateParams.sightName);


    }

    // 路线规划 start
    $scope.data = {};
    var driving = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        autoViewport: true
      }
    });
    var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, autoViewport: true}});
    var transit = new BMap.TransitRoute(map, {
      renderOptions: {map: map, autoViewport: true},
      policy: 0
    });


    $scope.showPopup = function () {
      $scope.data = {}

      // 自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<input type="text" placeHolder="起点" ng-model="data.start"><br/><input type="text" placeHolder="终点" ng-model="data.end">',
        title: '路线规划',
        subTitle: '请输入起点和终点',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>步行</b>',
            type: 'button-positive',
            onTap: function (e) {
              console.log('xx');
              if ($scope.data.start != "" && $scope.data.end != "") {
                return 200;

              } else {
                e.preventDefault();
              }
            }
          },
          {
            text: '<b>驾车</b>',
            type: 'button-positive',
            onTap: function (e) {
              console.log('xx');
              if ($scope.data.start != "" && $scope.data.end != "") {
                return 201;

              } else {
                e.preventDefault();
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {

        // 显示自定义景点
        var searchComplete = function (results) {
          var plan = results.getPlan(0);
          var distance = plan.getDistance(false);

          var start = results.getStart();
          var end = results.getEnd();
          console.log(results);
          console.log(start);


          var center = new BMap.Point(0, 0);
          center.lng = (start.point.lng + end.point.lng) / 2.0;
          center.lat = (start.point.lat + end.point.lat) / 2.0;

          var lng1, lng2, lat1, lat2;
          if (start.point.lng > end.point.lng) {
            lng1 = end.point.lng-0.005;
            lng2 = start.point.lng+0.005;
          } else {
            lng2 = end.point.lng+0.005;
            lng1 = start.point.lng-0.005;
          }
          if (start.point.lat > end.point.lat) {
            lat1 = end.point.lat+0.005;
            lat2 = start.point.lat-0.005;
          } else {
            lat2 = end.point.lat-0.005;
            lat1 = start.point.lat+0.005;
          }


          var radius = distance / 2;
          console.log(center.lng + " " + center.lat + " " + radius);
          console.log(server + "sightListGet?lng1=" + lng1 + "&lat1=" + lat1 + "&lng2=" + lng2 + "&lat2=" + lat2);
          $http.get(server + "sightListGet?lng1=" + lng1 + "&lat1=" + lat1 + "&lng2=" + lng2 + "&lat2=" + lat2)
            .success(function (response) {
              console.log(response);
              $scope.data=[];
              if (response.error_type == 0) {
                $scope.mySights = response.sightList;
                for (var i = 0; i < $scope.mySights.length; i++) {
                  var sight = $scope.mySights[i];
                  // 点击显示标签 start
                  var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    offset: new BMap.Size(10, 25), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
                  });
                  var point = new BMap.Point($scope.mySights[i].lng, $scope.mySights[i].lat);
                  var myMarker = new BMap.Marker(point, {icon: myIcon});
                  map.addOverlay(myMarker);
                  addClickHandler(sight,myMarker);
                  // 点击显示标签 end
                  var obj = {};
                  obj.sightId = sight.sightId;
                  obj.name = sight.name;
                  obj.score = sight.avgScore;
                  obj.url = sight.mainImg;
                  obj.distance = DistanceService.calcDistance($scope.myPoint.lng,$scope.myPoint.lat,sight.lng,sight.lat);
                  if (obj.distance>1000) {
                    obj.distanceText = (obj.distance/1000).toFixed(2)+"km";
                  } else {
                    obj.distanceText = obj.distance.toFixed(0) + "m";
                  }
                  obj.labels = filterLabelList(response.labelList[i]);
                  $scope.data[i] = obj;

                }
              }
            })

        }

        console.log('Tapped!', res);
        if (res == 200) {
          console.log($scope.data.start + " " + $scope.data.end);
          var walking = new BMap.WalkingRoute(map, {
            renderOptions: {map: map, autoViewport: true},
            onSearchComplete: searchComplete,
          });
          walking.search($scope.data.start, $scope.data.end);
        }
        if (res == 201) {
          console.log($scope.data.start + " " + $scope.data.end);
          var driving = new BMap.DrivingRoute(map, {
            renderOptions: {map: map, autoViewport: true},
            onSearchComplete: searchComplete
          });
          driving.search($scope.data.start, $scope.data.end);
        }


      });
      $timeout(function () {
        myPopup.close(); // 30秒后关闭弹窗
      }, 30000);
    };
    // 路线规划 end

    // 附近景点
    function getNearByList(){
      var pointSW = map.getBounds().getSouthWest();
      var pointNE = map.getBounds().getNorthEast();

      var lng1, lng2, lat1, lat2;
      if (pointSW.lng > pointNE.lng) {
        lng1 = pointNE.lng-0.005;
        lng2 = pointSW.lng+0.005;
      } else {
        lng2 = pointNE.lng+0.005;
        lng1 = pointSW.lng-0.005;
      }
      if (pointSW.lat > pointNE.lat) {
        lat1 = pointNE.lat+0.005;
        lat2 = pointSW.lat-0.005;
      } else {
        lat2 = pointNE.lat-0.005;
        lat1 = pointSW.lat+0.005;
      }

      console.log(server + "sightListGet?lng1=" + lng1 + "&lat1=" + lat1 + "&lng2=" + lng2 + "&lat2=" + lat2);
      $http.get(server + "sightListGet?lng1=" + lng1 + "&lat1=" + lat1 + "&lng2=" + lng2 + "&lat2=" + lat2)
        .success(function (response) {
          console.log(response);
          $scope.data=[];
          if (response.error_type == 0) {
            $scope.mySights = response.sightList;
            for (var i = 0; i < $scope.mySights.length; i++) {
              var sight = $scope.mySights[i];
              // 点击显示标签 start
              var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25), // 指定定位位置
                imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
              });
              var point = new BMap.Point($scope.mySights[i].lng, $scope.mySights[i].lat);
              var myMarker = new BMap.Marker(point, {icon: myIcon});
              map.addOverlay(myMarker);
              addClickHandler(sight,myMarker);
              // 点击显示标签 end
              var obj = {};
              obj.sightId = sight.sightId;
              obj.name = sight.name;
              obj.score = sight.avgScore;
              obj.url = sight.mainImg;
             // console.log($scope.myPoint.lng+" "+$scope.myPoint.lat+" "+sight.lng+" "+sight.lat);
              obj.distance = DistanceService.calcDistance($scope.myPoint.lng,$scope.myPoint.lat,sight.lng,sight.lat);
              if (obj.distance>1000) {
                obj.distanceText = (obj.distance/1000).toFixed(2)+"km";
              } else {
                obj.distanceText = obj.distance.toFixed(0) + "m";
              }
              obj.labels = filterLabelList(response.labelList[i]);
              $scope.data[i] = obj;
            }
          }
        })
    }

    $scope.searchSights = function () {
      getNearByList();
    }

    function addClickHandler(sight,marker){
      marker.addEventListener("click",function(e){
        openInfo(sight,e)}
      );
    }
    function openInfo(sight,e){
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      console.log(sight);
      var title = sight.name;
      var info = sight.description;
      var img = sight.mainImg;
      var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + title + "</h4>" +
        "<img style='float:right;margin:4px' id='imgDemo' src='" + img + "' width='139' height='104' title='"+title+"'/>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + info + "</p>" +
        "</div>";
      var infoWindow = new BMap.InfoWindow(sContent);

      map.openInfoWindow(infoWindow,point);
      $stateParams.sightName = title;
      console.log(title);
    }

    $scope.toSight = function (sightName) {
      $state.go('sightDetail', {sightName: sightName});
    }

    $scope.recommends = ["东方明珠","迪士尼乐园","欢乐谷"];

    var compare = function (x, y) {
      if ((x - y) * 1000000 > 0) return 1;
      if ((x - y) * 1000000 < 0) return -1;
      return 0;
    }

    $scope.defualtSort = function () {
      for (var i = 0; i < $scope.data.length; i++) {
        for (var j = i; j < $scope.data.length; j++) {
          if (compare($scope.data[i].score, $scope.data[j].score) == -1 || (compare($scope.data[i].score, $scope.data[j].score) == 0 && compare($scope.data[i].distance, $scope.data[j].distance) == 1)) {
            var temp = $scope.data[i];
            $scope.data[i] = $scope.data[j];
            $scope.data[j] = temp;
          }
        }
      }
    }
    $scope.scoreSort = function (type) {
      for (var i = 0; i < $scope.data.length; i++) {
        for (var j = i; j < $scope.data.length; j++) {
          if (compare($scope.data[i].score, $scope.data[j].score) == type) {
            var temp = $scope.data[i];
            $scope.data[i] = $scope.data[j];
            $scope.data[j] = temp;
          }
        }
      }
    }
    $scope.distanceSort = function (type) {
      for (var i = 0; i < $scope.data.length; i++) {
        for (var j = i; j < $scope.data.length; j++) {
          if (compare($scope.data[i].distance, $scope.data[j].distance) == type) {
            var temp = $scope.data[i];
            $scope.data[i] = $scope.data[j];
            $scope.data[j] = temp;
          }
        }
      }
    }

    function filterLabelList(list) {
      var res=[];
      for (var i=0;i<list.length;i++){
        var x = list[i].type;
        if (!(x in res)) {
          res[res.length] = x;
        }
      }
      return res;
    }

  }])
