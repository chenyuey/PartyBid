/**
 * Created by chenyu on 14-7-11.
 */
function BMingActivity(name,isStart)
{
    this.name = name;
    this.isStart = isStart;
}
BMingActivity.bmactivity = function()
{
    var activity = JSON.parse(localStorage.getItem('bmActivity'))||[];
    return activity;
}
BMingActivity.remove_bm_activity = function()
{
    localStorage.removeItem("bmActivity");
}
BMingActivity.prototype.set_item = function(){
    localStorage.setItem("bmActivity",JSON.stringify(this));
}