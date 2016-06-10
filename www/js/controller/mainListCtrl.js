/**
 * Created by HF Q on 2016/5/8.
 */

var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('mainListModule', [])
  .controller('MainListCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.title = '首页';
    var sortType = 0;
    var type = -1;
    $scope.labelIndex = [0, 1, 2, 3, 4, 5, 6];
    $scope.labelClass = ['label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
    $scope.labelName = ['游乐园', '自然景观', '商城', '人文景观', '美食', '科技馆', '全部'];


    var compare = function (x, y) {
      if ((x - y) * 1000000 > 0) return 1;
      if ((x - y) * 1000000 < 0) return -1;
      return 0;
    }

    $scope.labels = [];
    $scope.addLabel = function (type) {
      console.log(type);

      if (type == 6) {
        $scope.labels = [0, 1, 2, 3, 4, 5];
        return;
      }

      var flag = false;
      for (var i = 0; i < $scope.labels.length; i++) {
        if ($scope.labels[i] == type) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        $scope.labels[$scope.labels.length] = type;
      }
    }

    $scope.deleteLabel = function (type) {
      console.log(type);
      for (var i = 0; i < $scope.labels.length; i++) {
        if ($scope.labels[i] == type) {
          for (var j = i; j < $scope.labels.length - 1; j++) {
            $scope.labels[j] = $scope.labels[j + 1];
          }
          $scope.labels[$scope.labels.length - 1] = null;
          $scope.labels.length--;
          break;
        }
      }
    }

    console.log($scope.labels);
    var json = $scope.labels[0];
    for (var i = 1; i < $scope.labels.length; i++) {
      json = json + "," + $scope.labels[i];
    }
    if (json == null || json == undefined || json == "") {
      json = "0,1,2,3,4,5";
    }


    $http.post(server + "sightListGetBySightType",
      {sightType: json},
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function (data) {
          return $.param(data);
        }
      })
      .success(function (response) {
        console.log(response);
      })


    $scope.data = [{
      "name": "虹桥火车站",
      "score": 4.5,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 5,
      "info": "购物街"
    }, {
      "name": "南京东路",
      "score": 4.5,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 66,
      "info": "购物街"
    }, {
      "name": "复旦大学",
      "score": 3.5,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 25,
      "info": "购物街"
    }, {
      "name": "南京东路",
      "score": 5.0,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 11,
      "info": "购物街"
    }, {
      "name": "张江高科",
      "score": 1.5,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 34,
      "info": "购物街"
    }, {
      "name": "南京东路",
      "score": 2.5,
      "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
      "distance": 10,
      "info": "购物街"
    },];
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

    $scope.searchScene = function () {
      $state.go('searchHistory');
    }

    $scope.toSight = function (sightName) {
      $state.go('tab.map', {sightName: sightName});
    }
  }])


