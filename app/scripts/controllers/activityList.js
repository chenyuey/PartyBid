/**
 * Created by chenyu on 14-6-27.
 */
'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:ActivityListCtrl
 * @description
 * # ActivityListCtrl
 * Controller of the demo1App
 */
angular.module('partyBidApp')
    .controller('ActivityListCtrl', function ($scope , $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        //开始报名的活动
        var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];
        var activities = Activity.activities();
        $scope.activities = dealBMActivityBGC(bmActivity,activities);

        $scope. btnCreateActivity = function(){
            $location.path('create');
        }
        $scope.jumpToBM = function(activity){
            jumpToBMLoc($location,bmActivity,activity);
        }
    });

function jumpToBMLoc ($location,bmActivity,activity)
{
    //将进入的活动保存到本地
    var formActivity =  {name : activity.name};
    localStorage.setItem("fromActivityIn",JSON.stringify(formActivity));
    NOActivityStart(bmActivity,activity);
    //传入参数 判断“开始”按钮是否可用
    $location.path('signup');
}
function NOActivityStart(bmActivity,activity)
{
    //没有任何一个活动开始
    if(bmActivity.length == 0)
    {
        var activityinfo = {name :activity.name, isStart :false};
        bmActivity.push(activityinfo);
        localStorage.setItem("bmActivity",JSON.stringify(bmActivity));
    }
}
function dealBMActivityBGC(bmActivity,activities)
{
    if(bmActivity.length != 0 && bmActivity[0].isStart == true)
    {
        findStartActivity(activities,bmActivity);
    }
    return activities;
}
function findStartActivity(activities,bmActivity)
{
    var activity = _.find(activities,function(activity){
        return activity.name == bmActivity[0].name
    });
    if(activity)
    {
        activity.status = 'start';
    }
}
