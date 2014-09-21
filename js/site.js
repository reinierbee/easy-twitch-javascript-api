/*
 * Copyright (c) 2014. Reinier Boon (ssjkrillen@hotmail.com)
 *
 * License
 * ----
 * Attribution-NonCommercial 3.0 Unported
 * https://creativecommons.org/licenses/by-nc/3.0/
 */

var twitch = new TwitchApp();
twitch.pollFollowers();


$(document).ready(function() {
    twitch.setConfig("follower",{callback:popUpFollower,pollTime:2000,loaded:false})
    updateAppendFollowers();
});

function updateAppendFollowers(){
    setTimeout(function() {
        $("#recentFollowers li").remove();
            if(twitch.getRecentFollowers().length !== 0) {
                $.each(twitch.getRecentFollowers().slice(0,10), function( index, value ) {
                    entry = twitch.getRecentFollowers()[index];
                    $("#recentFollowers").append( "<li>"+ entry.user.display_name +"</li>" );
                });
            } else {
                $("#recentFollowers").append( "<li>No followers found</li>" );
            }
        updateAppendFollowers()
    }, 2000);
}

function popUpFollower(newFollower){
    console.log("New follower pop-up for: " + newFollower.user.display_name)
    $("#followerName").remove();
    $("#mostRecentFollowerPopUp").append( "<div id='followerName'>New follower: "+ newFollower.user.display_name +"</div>");
    twitch.playMusic("mp3/My_Anaconda.wav")
    $("#mostRecentFollowerPopUp").delay()
        .fadeIn(600)
        .delay(8000)
        .fadeOut(600);
}

function popUpSubscriber(newSubscriber){
    console.log("New subscriber pop-up for: " + newSubscriber.user.display_name)
    $("#subscriberName").remove();
    $("#mostRecentSubscriberPopUp").append( "<div id='subscriberName'>New subscriber: "+ newSubscriber.user.display_name +"</div>");
    twitch.playMusic("mp3/Youre_Tearing_Me_Apart_Lisa.mp3")
    $("#mostRecentSubscriberPopUp").delay()
        .fadeIn(600)
        .delay(8000)
        .fadeOut(600);
}