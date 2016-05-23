var sync = {
    socket : io.connect('http://163.172.29.197:1234'),
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
    if(isURL(link)) sync.socket.emit("selectVideo", {type : type, link : link});
    console.log("select video");
}
sync.socket.on("selectVideo", function(data){
    console.log("video selectec", data.type);
    if(data.type == "Classic"){
        initClassicVideoFromURL(data.link);
    } else if(data.type == "WCJS") {
        initClassicVideoFromFile(data.link);
    } else if(data.type == "Youtube") {
        initYoutubeVideo(data.link);
    }
    showPlayPause();
});

// PlayPause video
sync.playPause = function(){
    sync.socket.emit("playPause");
}
sync.socket.on("playPause", function(){
    playPauseVideo();
});