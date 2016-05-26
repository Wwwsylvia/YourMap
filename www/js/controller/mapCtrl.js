/**
 * Created by HF Q on 2016/5/8.
 */
angular.module('mapModule', [])
  .controller('MapCtrl', ['$scope', '$ionicPopup', '$timeout', '$interval', '$http', '$state', function ($scope, $ionicPopup, $timeout, $interval, $http, $state) {
    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
    var opts1 = {offset: new BMap.Size(10, 1120)}
    var opts2 = {offset: new BMap.Size(10, 1120)}
    var opts3 = {offset: new BMap.Size(5, 1150), enableAutoLocation: true} //定位控件位置
    map.addControl(new BMap.NavigationControl(opts1));

    var scaleControl = new BMap.ScaleControl(opts2);
    map.addControl(scaleControl);


    // 设置定位控件 start
    var geolocationControl = new BMap.GeolocationControl(opts3);

    geolocationControl.addEventListener("locationSuccess", function (e) {
      // 定位成功事件
      console.log(e.addressComponent);
      locateMe();

    });

    var geolocation = new BMap.Geolocation();
    var myPoint = new BMap.Point(121.48, 31.22);

    function locateMe() {
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var myMarker = new BMap.Marker(r.point);
          map.clearOverlays();
          map.addOverlay(myMarker);
          map.panTo(r.point);
          console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        }
      }, {enableHighAccuracy: true})
    }

    locateMe();

    map.addControl(geolocationControl);
    // 设置定位控件 end


    var local = new BMap.LocalSearch(map,
      {renderOptions: {map: map, autoViewport: true}});


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


    // 点击显示标签 start
    var sContent =
      "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
      "<img style='float:right;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" +
      "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
      "</div>";
    var point = new BMap.Point(121.48, 31.22);
    var marker = new BMap.Marker(point);
    var infoWindow = new BMap.InfoWindow(sContent);
    map.addOverlay(marker);
    marker.addEventListener("click", function () {
      this.openInfoWindow(infoWindow);
      //图片加载完毕重绘infowindow
      document.getElementById('imgDemo').onload = function () {
        infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
      }
    });

    // 点击显示标签 end

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


    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;

    function getRad(d) {
      return d * PI / 180.0;
    }

    // calculate distance
    function getFlatternDistance(lat1, lng1, lat2, lng2) {
      var f = getRad((lat1 + lat2) / 2);
      var g = getRad((lat1 - lat2) / 2);
      var l = getRad((lng1 - lng2) / 2);

      var sg = Math.sin(g);
      var sl = Math.sin(l);
      var sf = Math.sin(f);

      var s, c, w, r, d, h1, h2;
      var a = EARTH_RADIUS;
      var fl = 1 / 298.257;

      sg = sg * sg;
      sl = sl * sl;
      sf = sf * sf;

      s = sg * (1 - sl) + (1 - sf) * sl;
      c = (1 - sg) * (1 - sl) + sf * sl;

      w = Math.atan(Math.sqrt(s / c));
      r = Math.sqrt(s * c) / w;
      d = 2 * w * a;
      h1 = (3 * r - 1) / 2 / c;
      h2 = (3 * r + 1) / 2 / s;

      return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    }

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

          var radius = distance / 2;
          console.log(center.lng + " " + center.lat + " " + radius);
          $http.get("/sightListGet?lng=" + center.lng + "&lat=" + center.lat + "&radius=" + radius)
            .success(function (response) {
              if (response.error_code == 0) {
                $scope.mySights = response.sightList;

                for (var i = 0; i < $scope.mySights.length; i++) {
                  var sight = $scope.mySights[i];
                  var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    offset: new BMap.Size(10, 25), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
                  });
                  var myMarker = new BMap.Marker(r.point, {icon: myIcon});
                  map.addOverlay(myMarker);
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
            renderOptions: {map: map, autoViewport:true},
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

    $scope.searchSights = function () {
      local.searchInBounds("景点", map.getBounds());
    }


    map.addEventListener("click", function (e) {
      var point = e.point;

      var myPopup = $ionicPopup.show({
        template: '',
        title: '要把该地设为景点吗？',
        scope: $scope,
        buttons: [
          {
            text: '忽略',
            onTap: function (e) {
              var json = {"error_code": -1};
              return json;
            }
          },
          {
            text: '<b>是</b>',
            type: 'button-positive',
            onTap: function (e) {
              var json = {"error_code": 0, "content": point};
              return json;
            }
          },
        ]
      });
      myPopup.then(function (res) {

        console.log('Tapped!', res);
        if (res.error_code == 0) {
          $state.go('newSight', {lng: res.content.lng, lat: res.content.lat});
        }

      });
      $timeout(function () {
        myPopup.close(); // 30秒后关闭弹窗
      }, 5000);

    });

  }])
