// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngCordova', 'ionic', 'rootTabModule', 'mainListModule', 'addNewSightModule', 'sightDetailModule', 'searchHistoryModule', 'mapModule','personalModule','loginModule','registerModule','changeAvatarModule','sightCommentModule'])

  .run(function ($ionicPlatform) {
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
  })

  .config(function ($ionicConfigProvider) {
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
  })


  .config(function ($stateProvider, $urlRouterProvider) {


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


      //.state('tab.nearby', {
      //  url: '/chats',
      //  views: {
      //    'tab-nearby': {
      //      templateUrl: 'templates/tab-chats.html',
      //      controller: 'ChatsCtrl'
      //    }
      //  }
      //})
      //.state('tab.chat-detail', {
      //  url: '/chats/:chatId',
      //  views: {
      //    'tab-nearby': {
      //      templateUrl: 'templates/chat-detail.html',
      //      controller: 'ChatDetailCtrl'
      //    }
      //  }
      //})

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
        // url: '/register',
        // views: {
        //   'register': {
        //     templateUrl: 'templates/register.tpl.html',
        //     controller: 'RegisterCtrl'
        //   }
        // }
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
      .state('sightDetail', {
        url: '/sightDetail?:sightName',
        templateUrl: 'templates/sightDetail.tpl.html',
        controller: 'SightDetailCtrl'
      })
      .state('sightComment', {
        url: '/sightComment?:sightName',
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



