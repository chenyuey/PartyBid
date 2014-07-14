/**
 * Created by chenyu on 14-7-14.
 */
function ShortMessage(name,phone,activity)
{
    this.name = name;
    this.phone = phone;
    this.activity = activity;
}

ShortMessage.getShortMessages = function()
{
    var sms = JSON.parse(localStorage.getItem('messages'))||[];
    return sms;
}
ShortMessage.prototype.insert_message = function()
{
    var sms = JSON.parse(localStorage.getItem('messages'))||[];
    sms.push(this);
    localStorage.setItem("messages",JSON.stringify(sms));
}