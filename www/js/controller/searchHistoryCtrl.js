/**
 * Created by HF Q on 2016/5/29.
 */
angular.module('searchHistoryModule',[])
.controller('SearchHistoryCtrl',['$scope','$ionicNavBarDelegate','$state',function($scope,$ionicNavBarDelegate,$state){
  Array.prototype.unique = function()
  {
    this.sort();
    var re=[this[0]];
    for(var i = 1; i < this.length; i++)
    {
      if( this[i] !== re[re.length-1])
      {
        re.push(this[i]);
      }
    }
    return re;
  }

  $scope.historyList=[];
  var searchHistory = $.cookie("searchHistory");
  if (searchHistory != null && searchHistory != undefined ) {
    searchHistory = JSON.parse(searchHistory);
    $scope.historyList = searchHistory.list.unique();
  }

  $scope.input=[];
  $scope.goBack = function(){
    $ionicNavBarDelegate.back();
  }
  $scope.search = function(){
    var item = $scope.input.inputContent;
    var searchHistory = $.cookie("searchHistory");

    if (searchHistory == null) {
      console.log("null");
      searchHistory = {list:[],count:0};
      var jsonStr = JSON.stringify(searchHistory);
      searchHistory = JSON.parse(jsonStr);
      searchHistory.count++;
      searchHistory.list[searchHistory.count-1] = item;
      searchHistory = JSON.stringify(searchHistory);
      $.cookie("searchHistory",searchHistory);
    } else {
      searchHistory = JSON.parse(searchHistory);
      searchHistory.count++;
      searchHistory.list[searchHistory.count-1] = item;
      searchHistory = JSON.stringify(searchHistory);
      $.cookie("searchHistory",searchHistory);
    }

    $state.go("tab.map",{"sightName":item});

    $scope.input.inputContent="";


  }


  $scope.searchSight = function(item){
    $state.go("tab.map",{"sightName":item});
  }


  $scope.inputChange = function(){


  }

  $scope.clearHistory = function(){
    var searchHistory = {list:[],count:0};
    var searchHistory = JSON.stringify(searchHistory);
    $.cookie("searchHistory",searchHistory);
    $scope.historyList = [];

  }

}])
