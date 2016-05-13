var video = document.getElementById('video');
var play = document.getElementById('play');

function playPauseVideo(){
	if(video.paused){
		video.play();
		play.className = "play";
	}
	else {
		video.pause();
		play.className = "play pause";
	}
}