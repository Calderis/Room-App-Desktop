var video = document.getElementById('video');
var videoBloc = document.getElementById('videoBloc');
var play = document.getElementById('play');
var progression = document.getElementById('progression');
var cursor = document.getElementById('cursor');
var slide = document.getElementById('slide');
var soundCursor = document.getElementById('soundCursor');
var soundIcon = document.getElementById('soundIcon');

const ipcRenderer = require('electron').ipcRenderer;


// Init video
function initVideo(){
	
}

// Launch Video
function launchVideo(){
	video.play();
	video.volume = 1;

	videoBloc.className = "video launched";

	// Print out progress every 1 second
	var interval = setInterval(function () {
		// % of downloaded
		var progress = (video.currentTime * 100) / video.duration;
		cursor.style.width = progress + "%";
	}, 24);
}
//launchVideo()



// Play/Pause
function playPauseVideo(){
	if(video.paused){
		video.play();
		play.className = "play";
		videoBloc.className = "video launched";
	}
	else {
		video.pause();
		play.className = "play pause";
		videoBloc.className = "video";
	}
}
// Video bar
progression.onclick = function(e){
	var ratio = e.offsetX / progression.offsetWidth;
	var time = ratio * video.duration;

	cursor.style.width = ratio * 100 + "%";
	video.currentTime = Math.floor(time);
}
// Volume bar
slide.onclick = function(e){
	var ratio = (100 - e.offsetY) / slide.offsetHeight;
	var volume = ratio;

	soundCursor.style.height = ratio * 100 + "%";
	video.volume = volume;
	setVolumeIcon(volume);
}
// Mute/Unmute
function mute(){
	if(video.muted) {
		video.muted = false;
		soundCursor.style.height = (video.volume * 100) + "%";
		setVolumeIcon(video.volume);
	}
	else {
		video.muted = true;
		soundCursor.style.height = "0%";
		setVolumeIcon(video.volume);
	}
}
// Set Volume icon
function setVolumeIcon(volume){
	if(video.muted || volume == 0){
		soundIcon.className = "icon muted";
	} else if(volume > 0 && volume < 0.3){
		soundIcon.className = "icon levelA";
	} else if(volume >= 0.3 && volume < 0.6){
		soundIcon.className = "icon levelB";
	} else if(volume >= 0.6){
		soundIcon.className = "icon levelC";
	}
}
// Toggle fullscreen
function fullscreen(){
	// video.webkitRequestFullscreen();
	console.log("?");}

// Close windows
function closeWindow(){
	console.log("Close");
	ipcRenderer.send('close-main-window');
}

// Keypress, detect Space to pause
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) playPauseVideo();
});

