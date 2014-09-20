var twitch = new TwitchApp();
twitch.pollFollowers();


$(document).ready(function() {
    updateAppendFollowers();
});

function updateAppendFollowers(){
    setTimeout(function() {
        $("#recentFollowers li").remove()
            if(twitch.getRecentFollowers().length !== 0) {
                $.each(twitch.getRecentFollowers().slice(0,10), function( index, value ) {
                    entry = twitch.getRecentFollowers()[index]
                    $("#recentFollowers").append( "<li>"+ entry.user.display_name +"</li>" );
                });
            } else {
                $("#recentFollowers").append( "<li>No followers found</li>" );
            }
        updateAppendFollowers()
    }, 2000);
}