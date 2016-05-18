/**
 * Created by HF Q on 2016/5/8.
 */


angular.module('mainListModule', [])
    .controller('MainListCtrl', ['$scope', function ($scope) {
        $scope.title = '首页';
        $scope.data = [{
            "name": "南京东路",
            "score": 4.5,
            "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
            "distance": "10km",
            "info": "购物街"
        }, {
            "name": "南京东路",
            "score": 4.5,
            "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
            "distance": "10km",
            "info": "购物街"
        }, {
            "name": "南京东路",
            "score": 4.5,
            "url": "http://www.runoob.com/try/demo_source/stantz.jpg",
            "distance": "10km",
            "info": "购物街"
        }, ];
        $scope.sort1 = function () {

        }
        $scope.sort2 = function () {

        }
        $scope.sort3 = function () {

        }
    }])


