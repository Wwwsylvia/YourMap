/**
 * Created by HF Q on 2016/6/29.
 */
angular.module('otherLoginResultModule',[])
.controller('otherLoginResultCtrl',['$scope','$state',function($scope,$state){
  $scope.goBack = function(){
    $state.go('tab.personal');
  }
  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

  var code = GetQueryString("code");
  console.log(code);

  $.ajax(server + "userThirdLogin?code="+code,{
    type:"GET",
    xhrFields:{withCredentials: true},
    crossDomain:true,
    success:function(response, status, xhr){
      console.log(response);
      if (response.error_type == 0) {
        window.getElementById('text').innerHTML = "登陆成功！";
      }

    }
  });
}]);
