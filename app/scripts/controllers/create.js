/**
 * Created by chenyu on 14-6-26.
 */
'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demo1App
 */
angular.module('partyBidApp')
    .controller('CreateCtrl', function ($scope , $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.btnstatus = true;

        var activities = JSON.parse(localStorage.getItem('activities'))||[];
        $scope.btnReturnShow = true;
        if(activities.length == 0)
        {
            $scope.btnReturnShow = false;
        }
        $scope.inputstatus = function()
        {
            inputstatus($scope,activities);
        }

        $scope. btnclick = function(){
            createBtnClick($scope,$location,activities);
        }

        $scope.btnReturnList = function(){
            $location.path('activityList');
        }
    });

function inputstatus ($scope,activities)
{
    $scope.reminder = false;
    if($scope.activityname.length == 0)
    {
        $scope.btnstatus = true;
    }else
    {
        for(var i = 0;i < activities.length;i ++)
        {
            if(activities[i].name == $scope.activityname)
            {
                $scope.reminder = true;
            }
        }
        $scope.btnstatus = false;
    }
}

function createBtnClick ($scope,$location,activities)
{
    var activityname = $scope.activityname;
    var activity = {name : activityname ,status :''};
    activities.unshift(activity);
    localStorage.setItem("activities",JSON.stringify(activities));

    var formActivity =  {name : activityname};
    localStorage.setItem("fromActivityIn",JSON.stringify(formActivity));

    $location.path('signup');
}
