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

        var messages = JSON.parse(localStorage.getItem('messages'))||[];
        console.log(messages.length);

        if(messages.length == 0)
        {
            console.log(0);
            $location.path('create');
        }else
        {
            console.log(1);
            $location.path('activityList');
        }

    });
