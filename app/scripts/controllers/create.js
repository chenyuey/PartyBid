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

        var activities = Activity.activities();
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
            createBtnClick($scope,$location);
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
        findRepeatActivityName(activities,$scope);
    }
}

function findRepeatActivityName(activities,$scope)
{
    if(_.find(activities,function(activity){
        return activity.name == $scope.activityname;
    }))
    {
        $scope.reminder = true;
    }
    $scope.btnstatus = false;
}

function createBtnClick ($scope,$location)
{
    var activityname = $scope.activityname;

    var activity = new Activity(activityname,'');
    activity.insert_activity();

    var fromActivity = new FromActivityIn(activityname);
    fromActivity.addActivityName();

    $location.path('signup');
}
