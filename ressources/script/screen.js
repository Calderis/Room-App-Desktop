var app = document.getElementById("app");
var controls = document.getElementById("controls");
var inputChat = document.getElementById("inputChat");
var playlist = document.getElementById("playlist");

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
	if(playlist.className == "playlist") playlist.className = "playlist open";
	else closePlaylist()
}
function closePlaylist(){
	playlist.className = "playlist";
}

// Open Controls
function openControls(){
	if(controls.className == "controls") controls.className = "controls force";
	else controls.className = "controls";
}

// Keypress, detect Space to pause
document.addEventListener('keydown', function(event) {
	// Only when input is not focused
	if(document.activeElement.id != inputChat.id){
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
    console.log(event.keyCode);
});