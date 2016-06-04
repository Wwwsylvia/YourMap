/**
 * Created by HF Q on 2016/6/3.
 */


angular.module('sightCommentModule', [])
  .controller('SightCommentCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.labelIndex = [0, 1, 2, 3, 4, 5];
    $scope.labelClass = ['label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];
    $scope.labelName = ['游乐园', '自然景观', '商城', '人文景观', '美食', '科技馆'];


    $scope.suggestIndex = [0, 1, 2, 3, 4, 5];
    $scope.suggestClass = ['label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];
    $scope.suggestName = ['游乐园', '自然景观', '商城', '人文景观', '美食', '科技馆'];

    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
    var opts1 = {offset: new BMap.Size(10, 220)}
    map.addControl(new BMap.NavigationControl(opts1));
    var opts2 = {offset: new BMap.Size(10, 220)}
    var scaleControl = new BMap.ScaleControl(opts2);
    map.addControl(scaleControl);

    if ($stateParams.sightName != undefined) {
      map.clearOverlays();    //清除地图上所有覆盖物
      var result;

      function myFun() {
        result = local.getResults();
        var pp = result.getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注

        console.log(result);

        var circle = new BMap.Circle(pp, 500, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5}); //创建圆


        map.addOverlay(circle);
        map.zoomTo(map.getZoom() - 2);

      }

      var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
      });
      local.search($stateParams.sightName);

    }

    $scope.class1 = "in active";
    $scope.commentTab = function () {
      console.log("click 1");

      $scope.class1 = "in active";
      $scope.class2 = "";
      $scope.class3 = "";
      $scope.class4 = "";
    }

    $scope.labelTab = function () {
      console.log("click 2");

      $scope.class1 = "";
      $scope.class2 = "in active";
      $scope.class3 = "";
      $scope.class4 = "";

    }

    $scope.suggestTab = function () {
      console.log("click 3");

      $scope.class1 = "";
      $scope.class2 = "";
      $scope.class3 = "in active";
      $scope.class4 = "";
    }

    $scope.surveyTab = function () {
      console.log("click 4");

      $scope.class1 = "";
      $scope.class2 = "";
      $scope.class3 = "";
      $scope.class4 = "in active";
    }

    $scope.labels = [0, 1, 2, 3];

    $scope.comments = [{
      "user": "陈公子",
      "img": "http://www.runoob.com/try/demo_source/venkman.jpg",
      "content": "我好饥渴，大家快来上我！"
    },{
      "user": "老汤",
      "img": "http://www.runoob.com/try/demo_source/venkman.jpg",
      "content": "我很强！"
    },{
      "user": "流流",
      "img": "http://www.runoob.com/try/demo_source/venkman.jpg",
      "content": "蛤？"
    },{
      "user": "芒芒",
      "img": "http://www.runoob.com/try/demo_source/venkman.jpg",
      "content": "你们这些渣渣！"
    },{
      "user": "海峰",
      "img": "http://www.runoob.com/try/demo_source/venkman.jpg",
      "content": "嘿嘿嘿，巴拉巴拉巴拉超长超长超长超长超长超长超长超长超长超超长超超长超超长超超长超超长超超长超超长超超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长2"
    }];

    console.log($scope.comments[0].content.length);

    var splitPartgraph = function(text){
      var result=[];
      var count = 0;
      var ss="";
      var lineTexts = 20;
      while (text.length>lineTexts) {
        ss = text.substring(0,lineTexts)
        count ++;
        result[count-1] = ss;
        text = text.substring(lineTexts,text.length);
      }
      count ++;
      result[count-1] = text;
      return result;
    }

    for (var i=0;i<$scope.comments.length;i++){
      $scope.comments[i].content = splitPartgraph($scope.comments[i].content);
    }


    document.getElementById('comment-input').onkeydown = function()
    {
      if(this.value.length >= 50)
        this.value = this.value.substring(0,50);
    }
    $scope.addLabel = function (type) {
      console.log(type);
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


    $scope.suggests = [];
    $scope.addSuggest = function (type) {
      console.log(type);
      var flag = false;
      for (var i = 0; i < $scope.suggests.length; i++) {
        if ($scope.suggests[i] == type) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        $scope.suggests[$scope.suggests.length] = type;
      }
    }

    $scope.deleteSuggest = function (type) {
      console.log(type);
      for (var i = 0; i < $scope.suggests.length; i++) {
        if ($scope.suggests[i] == type) {
          for (var j=i;j<$scope.suggests.length-1;j++) {
            $scope.suggests[j] = $scope.suggests[j+1];
          }
          $scope.suggests[$scope.suggests.length-1] = null;
          $scope.suggests.length--;
          break;
        }
      }
    }





    var isRight = true;
    $scope.clickRight = function(){
      isRight = true;
      console.log(isRight);
    }
    $scope.clickError = function(){
      isRight = false;
      console.log(isRight);
    }

    var stepW = 24;
    var stars = $("#star > li");
    var n = 0;
    $("#showb").css("width",0);
    stars.each(function(i){
      $(stars[i]).click(function(e){
        n = i+1;
        $("#showb").css({"width":stepW*n});
        $(this).find('a').blur();
        console.log(n);
      });
    });
  }]);


