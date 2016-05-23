var video = document.getElementById('video');
var videoBloc = document.getElementById('videoBloc');
var play = document.getElementById('play');
var progression = document.getElementById('progression');
var actualTime = document.getElementById('actualTime');
var totalTime = document.getElementById('totalTime');
var cursor = document.getElementById('cursor');
var slide = document.getElementById('slide');
var soundCursor = document.getElementById('soundCursor');
var soundIcon = document.getElementById('soundIcon');

const ipcRenderer = require('electron').ipcRenderer;
var Video = {
	type : "Classic",
	bloc : document.getElementById('video'),
	element : document.getElementById('video'),
	paused : true,
	muted : false,
	url : "",
	currentTime : 0,
	duration : 0
}


// Launch Video
function launchVideo(){
	video.play();
	video.volume = 1;
	videoBloc.className = "video launched";
}

//reset current video
function resetVideo(){
	console.log("Reset ", Video.bloc);
	remove("video");
	var div = document.createElement("div");
	div.id = "video";
	videoBloc.appendChild(div);

	console.log(Video.type);
	Video.type = "";
	pauseVideo();
}



// Play/Pause
function playPauseVideo(){
	if(Video.paused){
		playVideo();
		showProgression();
		if(Video.type == "Classic"){
			totalTime.innerHTML = "/ " + formatTime(Video.element.duration);
		} else if(Video.type == "Youtube"){
			totalTime.innerHTML = "/ " + formatTime(Video.element.getDuration() );
		} else if(Video.type == "WCJS"){
			totalTime.innerHTML = "/ " + formatTime(Video.element.length() / 1000 );
		}
	}
	else {
		pauseVideo();
	}
}

// Play Video
function playVideo(){
	Video.paused = false;
	if(Video.type == "Classic"){
		Video.element.play();
	} else if(Video.type == "Youtube"){
		Video.element.playVideo();
	} else if(Video.type == "WCJS"){
		document.getElementById("webchimera").style.background = "black";
		Video.element.play();
	}
	play.className = "play";
	videoBloc.className = "video launched";
}

// Pause Video
function pauseVideo(){
	Video.paused = true;
	if(Video.type == "Classic"){
		Video.element.pause();
	} else if(Video.type == "Youtube"){
		Video.element.pauseVideo();
	} else if(Video.type == "WCJS"){
		Video.element.pause();
	}
	clearInterval(interval);
	play.className = "play pause";
	videoBloc.className = "video";
}

//Show progression
var interval;
function showProgression(){
	// Print out progress every 1 second
	interval = setInterval(function () {
		// % of downloaded
		var progress = 0;
		if(Video.type == "Classic"){
			progress = (Video.element.currentTime * 100) / Video.element.duration;
			actualTime.innerHTML = formatTime(Video.element.currentTime);
		} else if(Video.type == "Youtube"){
			progress = (Video.element.getCurrentTime() * 100) / Video.element.getDuration();
			actualTime.innerHTML = formatTime(Video.element.getCurrentTime());
		} else if(Video.type == "WCJS"){
			progress = (Video.element.time()) / (Video.element.length()/100);
			actualTime.innerHTML = formatTime(Video.element.time()/1000);
		}
		cursor.style.width = progress + "%";

		
	}, 24);
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

	if(Video.type == "Classic"){
		Video.element.volume = volume;
	} else if(Video.type = "Youtube"){
		Video.element.setVolume(volume * 100);
	} else if(Video.type = "WCJS"){
		Video.element.volume(volume * 2);
	}
	setVolumeIcon(volume);
}
// Mute/Unmute
function mute(){
	var volume = 0;
	if(Video.type == "Classic"){
		if(Video.element.muted) {
			Video.element.muted = false;
			soundCursor.style.height = (Video.element.volume * 100) + "%";		}
		else {
			Video.element.muted = true;
			soundCursor.style.height = "0%";
		}
		volume = Video.element.volume;
	} else if(Video.type = "Youtube"){
		if(Video.element.isMuted()) {
			Video.element.unMute();
			soundCursor.style.height = (Video.element.getVolume()) + "%";
		}
		else {
			Video.element.mute();
			soundCursor.style.height = "0%";
		}
		volume = Video.element.getVolume()/100;
	} else if(Video.type = "WCJS"){
		if(Video.element.mute()) {
			Video.element.mute(false);
			soundCursor.style.height = (Video.element.volume()/2) + "%";
		}
		else {
			Video.element.mute(true);
			soundCursor.style.height = "0%";
		}
		volume = Video.element.getVolume()/100;
	}
	setVolumeIcon(volume);
}

// Format time
function formatTime(time){
	time = Math.floor(time);
	var hour = Math.floor(time / 3600);
	var minutes = Math.floor(time / 60) - (60 * hour);
	var seconds = time - (60 * minutes) - (60 * hour);

	if(hour > 0 && minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;

	if(hour > 0){
		time = hour + ":" + minutes + ":" + seconds;
	} else {
		time = minutes + ":" + seconds;
	}
	return time;
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

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}	





