/**
 * Created by HF Q on 2016/5/8.
 */
angular.module('personalModule',[])
  .controller('PersonalCtrl', function ($scope, $state) {
    $scope.changeState = function (path) {
      if (path == "changeAvatar") {
        var isLogin = window.localStorage ? localStorage.getItem("isLogin") : Cookie.read("isLogin");
        if (!(isLogin == "login")) {
          layer.msg("请登录");
          return;
        }
      }
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
        //document.getElementById('headView').src = "../resources/test/head.png";
        document.getElementById('headView').src = server+headImg;
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

          if (response.error_type == 101) {
            if (window.localStorage) {
              console.log("localStorage");
              localStorage.setItem("isLogin", "offine");
            } else {
              console.log("cookie");
              Cookie.write("isLogin", "offine");
            }
          }
        },
        error:function(){
          if (window.localStorage) {
            console.log("localStorage");
            localStorage.setItem("isLogin", "offine");
          } else {
            console.log("cookie");
            Cookie.write("isLogin", "offine");
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
      var url = "http://service.weibo.com/share/share.php?url=xx&type=3&count=1&appkey=2841902482&title=YourMap%E5%88%86%E4%BA%AB&pic=xx";
      window.open( url,'分享到新浪微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
    }

    $scope.abouts = function(){

    }


  })
