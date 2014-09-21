/*
 * Copyright (c) 2014. Reinier Boon (ssjkrillen@hotmail.com)
 *
 * License
 * ----
 * Attribution-NonCommercial 3.0 Unported
 * https://creativecommons.org/licenses/by-nc/3.0/
 */

$(document).ready(function() {
    $("#test-mostRecentFollowerPopUp-button").click(function(){
        var newFollower = {
            "user": {
                "display_name":$("#test-mostRecentFollowerPopUp-value").val()
            }
        }
        twitch.newFollowerAction(newFollower,popUpFollower)
    })

    $("#test-mostRecentSubscriberPopUp-button").click(function(){
        var newSubscriber = {
            "user": {
                "display_name":$("#test-mostRecentSubscriberPopUp-value").val()
            }
        }
        twitch.newSubscriberAction(newSubscriber,popUpSubscriber)
    })
});