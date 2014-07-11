/**
 * Created by chenyu on 14-7-11.
 */
function FromActivityIn (name)
{
    this.name = name;
}
FromActivityIn.prototype.addActivityName = function()
{
    localStorage.setItem("fromActivityIn",JSON.stringify(this));
}
FromActivityIn.fromactivityin = function()
{
    var activity = JSON.parse(localStorage.getItem('fromActivityIn'))||[];
    return activity;
}
FromActivityIn.removeactivityin = function()
{
    localStorage.removeItem("fromActivityIn");
}