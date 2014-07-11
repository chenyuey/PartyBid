/**
 * Created by chenyu on 14-7-11.
 */
function Activity(name,status)
{
    this.name = name;
    this.status = status;
}

Activity.prototype.insert_activity = function(){
    var activities = JSON.parse(localStorage.getItem('activities'))||[];
    activities.unshift(this);
    localStorage.setItem("activities",JSON.stringify(activities));
}


Activity.activities = function(){
    var activities = JSON.parse(localStorage.getItem('activities'))||[];
    return activities;
}