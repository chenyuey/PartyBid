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
        dealRightBtnStatus($scope);

        bmMessageDeal($scope);

        //返回按钮
        $scope.btnReturn = function(){
            btnReturn($location);
        }

        //活动开始报名按钮
         $scope.btnStart = function(){
             btnStart($scope);
         }
        $scope.btnEnd = function(){
            btnEnd($scope);
        }

    });


function btnReturn($location)
{
    var bmActivity = BMingActivity.bmactivity();
    //没有点击开始按钮
    if(bmActivity.length != 0 && bmActivity[0].isStart == false)
    {
        BMingActivity.remove_bm_activity();
    }
    FromActivityIn.removeactivityin();
    $location.path('activityList');
}

function btnStart($scope)
{
    $scope.apply_status = '1';
    //将此活动保存到本地，为键值
    var bmActivity = BMingActivity.bmactivity();
    if(bmActivity.length == 0)
    {
        var fromAct = {name :FromActivityIn.fromactivityin().name,isStart :false};
        bmActivity.push(fromAct) ;
    }
    bmActivity[0].isStart = true;
    localStorage.setItem("bmActivity",JSON.stringify(bmActivity));
}

function btnEnd($scope)
{
    if(confirm("是否要结束报名") == true)
    {
        $scope.apply_status = '0';
        var bmActivity = BMingActivity.bmactivity();
        bmActivity[0].isStart = false;
        BMingActivity.set_item(bmActivity);
    }
}

function bmMessageDeal($scope)
{
    var sms = ShortMessage.getShortMessages();
    var fromActivityIn = FromActivityIn.fromactivityin();

    $scope.messages = _.filter(sms,function(sm){
        return fromActivityIn.length != 0 && sm.activity == fromActivityIn.name;
    });
}

function dealRightBtnStatus($scope)
{
    var bmActivity = BMingActivity.bmactivity();
    var fromActivityIn = FromActivityIn.fromactivityin();
    //如果进入的活动是开始报名的活动，显示结束按钮
    if(bmActivity.length != 0 && bmActivity[0].isStart == true)
    {
        apply_status_bmActivity_exist(fromActivityIn,bmActivity,$scope);
    }
    apply_status_undefined_deal($scope);
}
function apply_status_undefined_deal($scope)
{
    if($scope.apply_status === undefined)
    {
        $scope.apply_status = '0';
    }
}
function apply_status_bmActivity_exist(fromActivityIn,bmActivity,$scope)
{
    if(fromActivityIn.name == bmActivity[0].name)
    {
        $scope.apply_status = '1';
    }else if(fromActivityIn.name != bmActivity[0].name)
    {
        $scope.apply_status = '2';
    }
}