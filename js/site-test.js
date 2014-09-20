$(document).ready(function() {
    $("#test-mostRecentFollowerPopUp-button").click(function(){
        var newFollower = {
            "user": {
                "display_name":$("#test-mostRecentFollowerPopUp-value").val()
            }
        }
        twitch.newFollowerAction(newFollower,popUpFollower)
    })
});