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
        var activities = JSON.parse(localStorage.getItem('activities'))||[];
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

    //没有任何一个活动开始
    if(bmActivity.length == 0)
    {
        var activityinfo = {name :activity.name, isStart :false};
        bmActivity.push(activityinfo);
        localStorage.setItem("bmActivity",JSON.stringify(bmActivity));
    }
    //传入参数 判断“开始”按钮是否可用
    $location.path('signup');
}
function dealBMActivityBGC(bmActivity,activities)
{
    if(bmActivity.length != 0 && bmActivity[0].isStart == true)
    {
        for(var i = 0; i < activities.length; i ++)
        {
            console.log(activities[i].name);
            if(activities[i].name == bmActivity[0].name)
            {
                activities[i].status = 'start';
            }else
            {
                activities[i].status = '';
            }

        }
    }
    return activities;
}