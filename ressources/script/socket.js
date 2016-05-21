var sync = {
    socket : io.connect('http://localhost:1234'),
    poster : ""
}

var user;


// Get user account
var handshake = function(){
	sync.socket.emit("handshake", { name : "Wetteren", firstname : "Rémi"});
}
sync.socket.on("handshake", function(data){
    user = data.user;
});

sync.socket.on("system", function(msg){
    system(msg);
});

// Connexion
handshake();





// SYNCHRONISATION
// Adding video
sync.addVideo = function(link){
    sync.socket.emit("addVideo", {link : link});
}
sync.socket.on("addVideo", function(data){
    addVideoLink(data.link);
});

// Selecting video
sync.selectVideo = function(type, link){
    sync.socket.emit("selectVideo", {type : type, link : link});
}
sync.socket.on("selectVideo", function(data){
    if(data.type == "Classic"){
        initClassicVideoFromURL(data.link);
    } else if(data.type == "WCJS") {
        initClassicVideoFromFile(data.link);
    } else if(data.type == "Youtube") {
        initVideo(link);
    }
});

// PlayPause video
sync.playPause = function(){
    sync.socket.emit("playPause");
}
sync.socket.on("playPause", function(){
    playPauseVideo();
});