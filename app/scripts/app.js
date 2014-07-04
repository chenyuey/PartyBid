'use strict';

/**
 * @ngdoc overview
 * @name partyBidApp
 * @description
 * # partyBidApp
 *
 * Main module of the application.
 */
angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })

      .when('/activityList', {
         templateUrl: 'views/activityList.html',
          controller: 'ActivityListCtrl'
      })
      .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
      })
      .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
