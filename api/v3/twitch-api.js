/*
 * Copyright (c) 2014. Reinier Boon (ssjkrillen@hotmail.com)
 *
 * License
 * ----
 * Attribution-NonCommercial 3.0 Unported
 * https://creativecommons.org/licenses/by-nc/3.0/
 */

function TwitchApi () {
    var config  = {};

    this.constructor = function () {
        config = {
            channel:'', // your channel name goes here
            scope:'user_read user_follows_edit channel_read channel_editor channel_stream channel_subscriptions',
            token:'',
            clientId:'', // client id generated by registering the app in your twitch profile: http://www.twitch.tv/settings/connections
            baseUrl:'https://api.twitch.tv/kraken',
            redirectUrl:'', // callback url location where you have your script running must run with a webserver (wamp xamp are good examples)
            uriParam : {
                Accept:'application/vnd.twitchtv.v3+json',
                limit:25,// MAX 100
                offset:0, // default = 0
                direction:'DESC' // default = ASC
            }
        }
    };

    this.constructor();

    this.getConfig = function(){
        return config
    };

    this.setConfig = function(key,value){
        console.log("Setting config key: "+ key + " value: " + value)
        config[key] = value
    };

    this.setUriParam = function(key,value){
        config.uriParam[key] = value
    };
}

TwitchApi.prototype.getChannelsFollows = function (callback) {
    url = this.getConfig().baseUrl + '/channels/' + this.getConfig().channel + '/follows' + this.getUriParams();
    this.restCall('GET',url,callback)
};

TwitchApi.prototype.getChannelsSubscriptions = function (callback){
    url = this.getConfig().baseUrl + '/channels/' + this.getConfig().channel + '/subscriptions' + this.getUriParams();
    this.restCall('GET',url,callback)
};

TwitchApi.prototype.restCall = function (type,url,callback) {
    console.log(url);
    $(document).ready(function() {
        $.ajax({
            url: url,
            type: type,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(response) { callback(response) },
            error: function() { console.log("Failed to execute " + arguments.callee.name) }
        });
    });
};

TwitchApi.prototype.initializeAuth = function (){
    if (this.urlParam('access_token')){
        console.log("access_token found: " + this.urlParam('access_token'));
        this.setConfig("token",this.urlParam('access_token'))
    } else {
        console.log("access_token not found");
        this.appLoginRedirect()
    }
};

TwitchApi.prototype.setUriParam = function (key,value){
    this.setUriParam(key,value);
};

/*
 * Authenticate
 *
 */

TwitchApi.prototype.getAuth = function () {
	return '?oauth_token=' + this.getConfig().token
};

TwitchApi.prototype.appLoginRedirect = function (){
    console.log("Redirecting to twitch auth screen");
    window.location.replace(this.getConfig().baseUrl + '/oauth2/authorize?response_type=token&client_id='+this.getConfig().clientId+'&redirect_uri='+this.getConfig().redirectUrl+'&scope='+this.getConfig().scope);
};

TwitchApi.prototype.urlParam = function(name){
    var results = new RegExp('[\?(&|#)]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
};

TwitchApi.prototype.getUriParams = function(){
    return this.getAuth() + this.getAdditionalUriParamsUrl()
};

TwitchApi.prototype.getAdditionalUriParamsUrl = function(){
    uriParam = '';
    $.each(this.getConfig().uriParam, function(key, value){
        uriParam += '&' + key + '=' + value
    });
    return uriParam;
};