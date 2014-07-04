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
    .controller('SignupCtrl', function ($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];
        var fromActivityIn = JSON.parse(localStorage.getItem('fromActivityIn'))||[];
        //如果进入的活动是开始报名的活动，显示结束按钮
        if(bmActivity.length != 0 && bmActivity[0].isStart == true)
        {
            if(fromActivityIn.name == bmActivity[0].name)
            {
                $scope.apply_status = '1';
            }else if(fromActivityIn.name != bmActivity[0].name)
            {
                $scope.apply_status = '2';
            }
        }

        if($scope.apply_status === undefined)
        {
            $scope.apply_status = '0';
        }
        //返回按钮
        $scope.btnReturn = function(){
            var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];
            //没有点击开始按钮
            if(bmActivity.length != 0 && bmActivity[0].isStart == false)
            {
                localStorage.removeItem("bmActivity");
            }
            localStorage.removeItem("fromActivityIn");
            $location.path('activityList');
        }
        //活动开始报名按钮
         $scope.btnStart = function(){
             $scope.apply_status = '1';
             //将此活动保存到本地，为键值
             var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];
             if(bmActivity.length == 0)
             {
                 var fromAct = {name :JSON.parse(localStorage.getItem('fromActivityIn')).name,isStart :false};
                 bmActivity.push(fromAct) ;
             }
             bmActivity[0].isStart = true;
             localStorage.setItem("bmActivity",JSON.stringify(bmActivity));
         }
        $scope.btnEnd = function(){
            $scope.apply_status = '0';
            var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];
            bmActivity[0].isStart = false;
            localStorage.setItem("bmActivity",JSON.stringify(bmActivity));
        }

        //显示报名信息
        //判断报名信息是否为当前活动
        var messages = JSON.parse(localStorage.getItem('messages'))||[];
        var activityMessages = [];
        for(var i = 0 ; i < messages.length ; i ++)
        {
            var fromActivityIn = JSON.parse(localStorage.getItem('fromActivityIn'))||[];
            if(fromActivityIn.length != 0 && messages[i].activity == fromActivityIn.name)
            {
                activityMessages.unshift(messages[i]);
            }
        }
        $scope.messages = activityMessages;
    });
