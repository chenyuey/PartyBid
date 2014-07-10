function parseJson (json_message)
{
    var messages = JSON.parse(localStorage.getItem('messages'))||[];
    //正在报名的活动
    var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];

    //有开始报名的活动
    //去掉报名信息中的空格
    var message_content = json_message.messages[0].message.replace(/\s/g,"");
    var message_name = message_content.substring(2,message_content.length);
    //如果本地没有存储报名信息，则没有任何活动开始
    if(bmActivity.length == 0)
    {
        native_accessor.send_sms(json_message.messages[0].phone,'活动尚未开始！');
    }
    else if(bmActivity[0].isStart == false)
    {
        native_accessor.send_sms(json_message.messages[0].phone,'活动已经结束！');
    }else if( message_content.search(/bm|BM|bM|Bm/i) == 0)
    {
        //存储在正在报名的活动
        var message = {name : message_name , phone :json_message.messages[0].phone ,activity :bmActivity[0].name};
        if(messages.length == 0)
        {
            messages.unshift(message);
            localStorage.setItem("messages",JSON.stringify(messages));
            console.log('报名成功！');
            native_accessor.send_sms(json_message.messages[0].phone,'报名成功！');
            refreshSignupView();
        }
        else
        {
            var isExist = false;
            for(var i = 0;i < messages.length;i ++)
            {
                if(messages[i].phone == json_message.messages[0].phone && messages[i].activity == bmActivity[0].name)
                {
                    isExist = true;
                }
            }
            if(isExist == false)
            {
                messages.push(message);
                localStorage.setItem("messages",JSON.stringify(messages));
                native_accessor.send_sms(json_message.messages[0].phone,'报名成功！');
                console.log('报名成功！');
                refreshSignupView();
            }else
            {
                native_accessor.send_sms(json_message.messages[0].phone,'已经报过名！');
                console.log('已经报过名！');
            }
        }

    }

}
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
