'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('MainCtrl', function ($scope , $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var activities = JSON.parse(localStorage.getItem('activities'))||[];
        console.log(activities.length);

        if(activities.length == 0)
        {
            $location.path('create');
        }else
        {
            $location.path('activityList');
        }

    });
