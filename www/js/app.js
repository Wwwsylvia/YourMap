// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ngCordova', 'ngCookies', 'ionic', 'rootTabModule', 'mainListModule', 'addNewSightModule', 'sightDetailModule', 'searchHistoryModule', 'mapModule','personalModule','loginModule','registerModule','changeAvatarModule','sightCommentModule','show3DModule','footprintListModule','showVideoModule','otherLoginModule','otherLoginResultModule']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });

app.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    //$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
  });


app.config(function ($stateProvider, $urlRouterProvider) {


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: "RootTabCtrl"
      })

      .state('tab.main', {
        url: '/main',
        views: {
          'tab-scenicSpots': {
            templateUrl: "templates/main.tpl.html",
            controller: 'MainListCtrl'

          }

        }

      })
      .state('tab.map', {
        url: '/map?sightName',
        views: {
          'tab-nearby': {
            templateUrl: "templates/map.tpl.html",
            controller: 'MapCtrl'
          }

        }

      })
      // Each tab has its own nav history stack:


      .state('tab.personal', {
        url: '/personal',
        views: {
          'tab-personal': {
            templateUrl: 'templates/tab-personal.html',
            controller: 'PersonalCtrl'
          }
        }
      })

      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.tpl.html',
        controller: 'RegisterCtrl'
      })
      .state('otherLogin', {
        url: '/otherLogin',
        templateUrl: 'templates/other_login.tpl.html',
        controller: 'otherLoginCtrl'
      })
      .state('otherLoginResult', {
        url: '/otherLoginResult',
        templateUrl: 'templates/other_login_result.tpl.html',
        controller: 'otherLoginResultCtrl'
      })
      .state('searchHistory', {
        url: '/searchHistory',
        templateUrl: 'templates/search_history.tpl.html',
        controller: 'SearchHistoryCtrl'
      })
      .state('newSight', {
        url: '/newSight?:lng:lat',
        templateUrl: 'templates/add_new_sight.tpl.html',
        controller: 'AddNewSightCtrl'
      })
      .state('show3DSight', {
        url: '/show3DSight',
        templateUrl: 'templates/show_3d_sight.tpl.html',
        controller: 'Show3DSightCtrl'
      })
      .state('show3DSight2', {
        url: '/show3DSight2',
        templateUrl: 'templates/Shadow.html',
      })
      .state('showSightVideo', {
        url: '/showSightVideo?sightId',
        templateUrl: 'templates/show_video.tpl.html',
        controller:'showVideoCtrl'
      })
      .state('footprint', {
        url: '/footprint?:footprintType',
        templateUrl: 'templates/footprint.tpl.html',
        controller: 'footprintListCtrl'
      })
      .state('sightDetail', {
        url: '/sightDetail?:sightName',
        templateUrl: 'templates/sightDetail.tpl.html',
        controller: 'SightDetailCtrl'
      })
      .state('sightComment', {
        url: '/sightComment?:sightName:sightId',
        templateUrl: 'templates/sightComment.tpl.html',
        controller: 'SightCommentCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.tpl.html',
        controller: 'LoginCtrl'
      })

      .state('changeAvatar', {
        url: '/change-avatar',
        templateUrl: 'templates/change_avatar.tpl.html',
        controller: 'ChangeAvatarCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/main');


  });

app.run(['$rootScope', '$http', '$cookies', function ($rootScope, $http, $cookies) {
  console.log("reload");
  $rootScope.isLogin = false;
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  //var server = "http://192.168.1.117:8080/Adweb/";
  var server = "http://139.129.10.20:8080/Adweb/";
  if (window.localStorage) {
    console.log("localStorage ", server);
    localStorage.setItem("serverAddress", server);
  } else {
    console.log("cookie");
    Cookie.write("serverAddress", server);
  }

  var isLogin = window.localStorage ? localStorage.getItem("isLogin") : Cookie.read("isLogin");

  if (!(isLogin == "login")){
    if (window.localStorage) {
      console.log("localStorage ");
      localStorage.setItem("isLogin", "offline");
    } else {
      console.log("cookie");
      Cookie.write("isLogin", "offline");
    }
  } else {
    if (window.localStorage) {
      console.log("localStorage ", "login");
      localStorage.setItem("isLogin", "login");
    } else {
      console.log("cookie");
      Cookie.write("isLogin", "login");
    }
  }

  layer.ready(function () {

  });

}]);
app.provider('myCSRF', [function () {
  var headerName = 'X-CSRFToken';
  var cookieName = 'csrftoken';
  var allowedMethods = ['GET'];

  this.setHeaderName = function (n) {
    headerName = n;
  }
  this.setCookieName = function (n) {
    cookieName = n;
  }
  this.setAllowedMethods = function (n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function ($cookies) {
    return {
      'request': function (config) {
        if (allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
          console.log($cookies.csrftoken);
        }
        return config;
      }
    }
  }];
}]).config(function ($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
});



