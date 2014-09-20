/**
 * Created by reinier on 20-9-2014.
 */



function TwitchApp () {

    var twitch = new TwitchApi();
    var app = this
    var config  = {};
    var followers = [];

    this.constructor = function () {
        config = {
            follower : {
                poll:true,
                pollTime:2000// MAX 100
            }
        };
        twitch.setConfig("clientId","");
        twitch.setConfig("channel","");
        twitch.initializeAuth();
    };

    this.constructor();

    this.pollFollowers = function () {
        setTimeout(function() {
            twitch.getChannelsFollows(app.getNewFollowers);
            app.pollFollowers();
        }, config.follower.pollTime);
    };

    this.addNewFollower = function (newFollower) {
        followers.push(newFollower)
    };

    this.getNewFollowers = function (newFollowList) {
        for (key in newFollowList.follows) {
            entry = newFollowList.follows[key]
            if(followers.length === 0) {
                console.log("First entry _id: " + entry.user._id);
                app.addNewFollower(entry)
            } else if(!app.followerInList(entry.user._id)){
                console.log("New entry _id: " + newFollowList.follows[key].user._id);
                app.addNewFollower(entry)
            } else {
                console.log("Excisting entry _id: " + entry.user._id);
            }
        }
    };

    this.followerInList = function(followerId){
        for (i in followers) {
            if (followers[i].user._id == followerId) {
                return true;
            }
        }
        return false;
    };

    this.getRecentFollowers = function () {
        return followers;
    };
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}