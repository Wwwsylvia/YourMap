/**
 * Created by HF Q on 2016/5/8.
 */
angular.module('personalModule',[])
  .controller('PersonalCtrl', function ($scope, $state) {
    $scope.changeState = function (path) {
      $state.go(path);
    };
    console.log("dddd");
    setInterval(function(){
      var isLogin = window.localStorage ? localStorage.getItem("isLogin") : Cookie.read("isLogin");
      var username = window.localStorage ? localStorage.getItem("username") : Cookie.read("username");
      var headImg = window.localStorage ? localStorage.getItem("headImg") : Cookie.read("headImg");
      //console.log(isLogin+" "+username+" "+headImg);
      if (isLogin == "login") {
        $('#logoutBtn').show();
        document.getElementById('nameText').innerHTML = username;
        document.getElementById('headView').src = headImg;
      } else {
        $('#logoutBtn').hide();
        document.getElementById('nameText').innerHTML = "未登录";
        document.getElementById('headView').src = "../resources/test/head.png";
      }
    },100);


    $scope.logout = function(){
      $.ajax(server + "userLogout",{
        type:"GET",
        xhrFields:{withCredentials: true},
        crossDomain:true,
        success:function(response, status, xhr){
          console.log(response);
          if (response.error_type == 0) {
            if (window.localStorage) {
              console.log("localStorage");
              localStorage.setItem("isLogin", "offine");
            } else {
              console.log("cookie");
              Cookie.write("isLogin", "offine");
            }
          }
        }
      });
    }

    $scope.toFootprint = function(){
      $state.go('footprint',{footprintType: 1});
    }

    $scope.toPlan = function(){
      $state.go('footprint',{footprintType: 3});
    }

    $scope.toStar = function(){
      $state.go('footprint',{footprintType: 2});
    }

    $scope.share = function(){

    }

    $scope.abouts = function(){

    }


  })
