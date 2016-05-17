var video = document.getElementById('video');

var wjs = require("wcjs-player");


// Init Classic Video with a video already on the web
function initClassicVideoFromFile(file){
	resetVideo();
	Video.type = "WCJS";
	Video.element = new wjs("#video").addPlayer({ autoplay: false , titleBar: "both"});

	Video.element.addPlaylist(getPathVideo(file));
}

// Init Classic video with a video locally placed
function initClassicVideoFromURL(url){
	resetVideo();
	Video.type = "WCJS";
	Video.element = new wjs("#video").addPlayer({ autoplay: false });

	Video.element.addPlaylist(url);
}



function getPathVideo(video){
	var pathArray = window.location.pathname.split( '/' );
	var path = window.location.protocol + "//" + window.location.host;
	for (i = 0; i < pathArray.length-1; i++) {
	  path += "/";
	  path += pathArray[i];
	}
	path += "/ressources/videos/" + video;
	console.log(path)
	return path;
}