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

	// Using HTML5 player
	// var vid = document.createElement("video");
	// vid.src = url;
	// vid.setAttribute("preload", "true");
	// Video.bloc = document.getElementById("video");
	// Video.bloc.appendChild(vid);
	// Video.element = vid;
	// Video.type = "Classic";
	// console.log(Video.element);
	// console.log(Video.bloc);

	// Using WCJS player
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



var testItOut = function(){
	initClassicVideoFromURL("http://www.sample-videos.com/video/mp4/360/big_buck_bunny_360p_50mb.mp4");
}
