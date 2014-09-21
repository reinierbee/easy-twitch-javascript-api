/*
 * Copyright (c) 2014. Reinier Boon (ssjkrillen@hotmail.com)
 *
 * License
 * ----
 * Attribution-NonCommercial 3.0 Unported
 * https://creativecommons.org/licenses/by-nc/3.0/
 */

function TwitchApp () {

    var twitch = new TwitchApi();
    var app = this
    var config  = {};
    var followers = [];

    this.constructor = function () {
        config = {
            follower : {
                loaded:false,
                callback:'',
                pollTime:2000// MAX 100
            }
        };
        twitch.setConfig("clientId",myConfig.clientId);
        twitch.setConfig("channel",myConfig.channel);
        twitch.setConfig("redirectUrl",myConfig.redirectUrl);
        twitch.initializeAuth();
    };

    this.constructor();

    this.setConfig = function(key,value){
        console.log("Setting config key: "+ key + " value: " + value)
        config[key] = value
    };


    /*
     *  Subscriber stuff
     */

    this.newSubscriberAction = function (newSub,callback) {
        callback(newSub)
    };


    /*
     *  Followers stuff
     */
    this.pollFollowers = function () {
        setTimeout(function() {
            twitch.getChannelsFollows(app.getNewFollowers);
            app.pollFollowers();
        }, config.follower.pollTime);
    };

    this.addNewFollower = function (newFollower) {
        followers.unshift(newFollower)
        if(config.follower.loaded == true && config.follower.callback !== ''){
            app.newFollowerAction(newFollower,config.follower.callback)
        }
    };

    this.newFollowerAction = function (newFollower,callback) {
        callback(newFollower)
    };

    this.getNewFollowers = function (newFollowList) {
        newFollowList.follows = newFollowList.follows.reverse()
        for (key in newFollowList.follows) {
            entry = newFollowList.follows[key]
            if(followers.length === 0) {
                console.log("First entry _id: " + entry.user._id);
                app.addNewFollower(entry)
            } else if(!app.followerInList(entry.user._id)){
                console.log("New entry _id: " + newFollowList.follows[key].user._id);
                app.addNewFollower(entry)
            } else {
                //console.log("Excisting entry _id: " + entry.user._id);
            }
        }
        config.follower.loaded = true;
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

    this.playMusic = function(music){
        $("#audio").remove()
        $(document.body).append('<embed id="audio" src="'+ music +'" autostart="true" loop="false" width="2" height="0">');
    }
}