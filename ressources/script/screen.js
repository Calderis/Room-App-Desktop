var app = document.getElementById("app");
var controls = document.getElementById("controls");
var inputChat = document.getElementById("inputChat");
var playlist = document.getElementById("playlist");
var dropInput = document.getElementById("dropInput");

var magnetLink = require('magnet-link');


// Open Menu
function openMenu(){
	app.className = "app openMenu";
}

// Close both : Chat and Menu
function closeBoth(){
	app.className = "app";
	setTimeout(function(){
		document.getElementById("inputChat").blur();
	}, 330);
}

// Open Chat
function openChat(){
	app.className = "app openChat";
	setTimeout(function(){
		document.getElementById("inputChat").focus();
	}, 330);
}

// Open Chat
function openPlaylist(){
	if(playlist.className == "playlist") {
		playlist.className = "playlist open";
		dropInput.focus();
	}
	else closePlaylist()
}
function closePlaylist(){
	playlist.className = "playlist";
	dropInput.blur();
}

// Open Controls
function openControls(){
	if(controls.className == "controls") controls.className = "controls force";
	else controls.className = "controls";
}

// Close windows
function closeWindow(){
	ipcRenderer.send('close-main-window');
}
// Toggle fullscreen
function fullscreenWindow(){
	ipcRenderer.send('fullscreen-main-window');
}
// Toggle minimize mode
function minimizeWindow(){
	ipcRenderer.send('minimize-main-window');
}


// Delete little picture
function deleteVideo(element){
	element.parentNode.removeChild(element)
}

//Add new video
function addVideoLink(event, input){
	if(event.keyCode == 13) {
		if(input.value.match("youtube")) {
			console.log("Youtube Mode");
			Video.type = "Youtube";
			createVignette(input.value);
		} else if(input.value.match(".torrent")){
			console.log("WCJS Mode");
			Video.type = "WCJS";
			magnetLink(input.value, function (err, link) {
			  // you got a magnet link from a remote torrent file
			  initTorrentVideo(link);
			});
		} else {
			Video.type = "Classic";
			createVignette(input.value);
		}
		input.value = "";
	}
}

//Add new vignettes
function createVignette(link){
	var li = document.createElement("li");
	console.log(Video.type);
	if(Video.type == "Classic"){
		li.style.backgroundColor = "white";
		li.style.backgroundImage = "url('ressources/images/logo/logo-fullSize.png')";
		li.innerHTML = '<span class="icn" onclick="initClassicVideoFromURL(\''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span><h3>'+cutIfTooLong(link)+'</h3>';
	} else if(Video.type == "WCJS"){
		li.style.backgroundColor = "white";
		li.style.backgroundImage = "url('ressources/images/logo/logo-fullSize.png')";
		li.innerHTML = '<span class="icn" onclick="initClassicVideoFromFile(\''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span><h3>'+cutIfTooLong(link)+'</h3>';
	} else if(Video.type == "Youtube"){
		var id = link.split('watch?v=')[1];
		li.style.backgroundImage = "url('http://img.youtube.com/vi/"+id+"/0.jpg')";
		li.innerHTML = '<span class="icn" onclick="initVideo(\''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span>';
	}
	
	playlist.insertBefore(li, playlist.childNodes[0]);
	console.log(li);
}

// Reduce Name
function cutIfTooLong(word){
	var w = word.substring(0,30);
}

// delete a div from id
function remove(id) {
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}


// Keypress, detect Space to pause
document.addEventListener('keydown', function(event) {
	// Only when input is not focused
	if(document.activeElement.id != inputChat.id && document.activeElement.id != "dropInput"){
		if(event.keyCode == 32) playPauseVideo();
		else if(event.keyCode == 13){// ->
	    	if(app.className == "app openChat") closeBoth();
	    	else openChat();
	    }
	}
    if(event.keyCode == 39){// ->
    	if(app.className == "app openChat") closeBoth();
    	else openChat();
    }
    else if(event.keyCode == 37){ // <-
		if(app.className == "app openMenu") closeBoth();
    	else openMenu();
    }
    else if(event.keyCode == 38){ // top
		openPlaylist();
    }
    else if(event.keyCode == 40){ // bottom, force controls to stay opened
		openControls();
    }
});