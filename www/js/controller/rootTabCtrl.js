angular.module('rootTabModule', [])
    .controller('RootTabCtrl',['$scope','$state','$rootScope',function($scope,$state,$rootScope){
        $scope.tabSwitch = function(state){
            console.log(state);
            $state.go(state);
        }
    }])

    .controller('content1Controller', function ($scope, $stateParams) {

        $scope.title = 'content1Controller';


        console.log($stateParams);

    })



