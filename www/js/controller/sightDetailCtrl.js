/**
 * Created by HF Q on 2016/5/28.
 */
angular.module('sightDetailModule',[])
.controller('SightDetailCtrl',['$scope','$ionicNavBarDelegate',function($scope,$ionicNavBarDelegate){
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }

  var stepW = 24;
  var description = new Array("1分","2分","3分","4分","5分");
  var stars = $("#star > li");
  var descriptionTemp;
  $("#showb").css("width",0);
  stars.each(function(i){
    $(stars[i]).click(function(e){
      var n = i+1;
      $("#showb").css({"width":stepW*n});
      descriptionTemp = description[i];
      $(".description").text(description[i]);
      $(this).find('a').blur();
    });
  });

}])
