/**
 * Created by HF Q on 2016/5/8.
 */
angular.module('profileModule',[])
.controller('ProfileCtrl',['$scope','$ionicPopup','$timeout',function($scope,$ionicPopup, $timeout){
    $scope.title = '我的';

    $scope.showPopup = function() {
        $scope.data = {}

            $.fn.umshare.login('renren',function(user){
                $.fn.umshare.tip('登录成功,token:' + user.token + ', uid:' + user.uid);
                $("#loginInfo").html('登录成功,token:' + user.token + ', uid:' + user.uid);
            });

    };
}])
