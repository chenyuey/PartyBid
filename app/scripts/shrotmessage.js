function parseJson (json_message)
{
    var messages = ShortMessage.getShortMessages();
    //正在报名的活动
    var bmActivity = BMingActivity.bmactivity();
    //去掉报名信息中的空格
    var message_content = json_message.messages[0].message.replace(/\s/g,"");
    var message_name = message_content.substring(2,message_content.length);
    //如果本地没有存储报名信息，则没有任何活动开始
    NOActivityStart(json_message,bmActivity);

    ActivityHasEnd(json_message,bmActivity);

    BMStartDeal(bmActivity,message_content,message_name,json_message,messages);

}
//报名开始处理
function BMStartDeal(bmActivity,message_content,message_name,json_message,messages)
{
    if(bmActivity.length != 0 && bmActivity[0].isStart == true && message_content.search(/bm|BM|bM|Bm/i) == 0)
    {
        //存储在正在报名的活动
        var message = new ShortMessage(message_name,json_message.messages[0].phone,bmActivity[0].name);
        BMSMSDeal(json_message,messages,message,bmActivity);

    }
}
//报名信息处理（包括第一个报名与非第一个报名）
function BMSMSDeal(json_message,messages,message,bmActivity)
{
    if(firstBMSMS(json_message,messages,message) == false)
    {
        NOFirstBMSMS(json_message,messages,message,bmActivity);
    }
}
//不是第一个报名的信息，需要做是否重复处理
function NOFirstBMSMS(json_message,messages,message,bmActivity)
{
    var isExist = false;
    if(_.find(messages,function(message){
        return message.phone == json_message.messages[0].phone && message.activity == bmActivity[0].name;
    }))
    {
        isExist = true;
    }
    BMrepeat(json_message,message,isExist);
}
//报名尚未开始
function NOActivityStart(json_message,bmActivity)
{
    if(bmActivity.length == 0)
    {
        native_accessor.send_sms(json_message.messages[0].phone,'活动尚未开始！');
        console.log('活动尚未开始！');
    }
}
//报名已结束
function ActivityHasEnd(json_message,bmActivity)
{
    if(bmActivity.length != 0 && bmActivity[0].isStart == false)
    {
        native_accessor.send_sms(json_message.messages[0].phone,'活动已经结束！');
        console.log('活动已经结束！');
    }
}
//重复报名
function BMrepeat(json_message,message,isExist)
{
    if(insert_sms_return_sms(json_message,message,isExist) == false)
    {
        native_accessor.send_sms(json_message.messages[0].phone,'已经报过名！');
        console.log('已经报过名！');
    }
}

//数据库里没有短信时
function firstBMSMS(json_message,messages,message){
    if(messages.length == 0)
    {
        message.insert_message();
        console.log('报名成功！');
        native_accessor.send_sms(json_message.messages[0].phone,'报名成功！');
        refreshSignupView();
        return true;
    }
    return false;
}
//如果数据库里没有存在相同活动的相同手机号，则插入一条短信
function insert_sms_return_sms(json_message,message,isExist){
    if(isExist == false)
    {
        message.insert_message();
        native_accessor.send_sms(json_message.messages[0].phone,'报名成功！');
        console.log('报名成功！');
        refreshSignupView();
        return true;
    }
    return false;
}
//刷新signup页面
function refreshSignupView()
{
    var signUp = document.getElementById("signuprefresh");
    if (signUp)
    {
        var  scope = angular.element(signUp).scope();
        scope.$apply(function (){
            bmMessageDeal(scope);
        })
    }
}

