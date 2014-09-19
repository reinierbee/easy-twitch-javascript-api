$(document).ready(function() {

    var twitch = new TwitchApi();

    twitch.initializeAuth();
    twitch.getChannelsFollows(appendFollowers,undefined,10,0,'DESC');
});


function appendFollowers(followList){
	$.each(followList.follows, function(index, value){
		$( "#recentFollowers" ).append( "<li>"+ value.user.name +"</li>" );
	});
	//$( ".main" ).append( "<span>Test</span>" );
}