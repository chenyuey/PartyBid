function parseJson (json_message)
{
    var messages = JSON.parse(localStorage.getItem('messages'))||[];
    //正在报名的活动
    var bmActivity = JSON.parse(localStorage.getItem('bmActivity'))||[];

//    var str_message = json_message.messages[0].message;
//    str_message.replace('//')


    //有开始报名的活动
    if(bmActivity.length != 0 && bmActivity[0].isStart == true)
    {
        //存储在正在报名的活动
        var message = {name : json_message.messages[0].message , phone :json_message.messages[0].phone ,activity :bmActivity[0].name};
        if(messages.length == 0)
        {
            messages.unshift(message);
            localStorage.setItem("messages",JSON.stringify(messages));
        }
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
            messages.unshift(message);
            localStorage.setItem("messages",JSON.stringify(messages));
        }
    }
}
