var socket = io.connect('http://localhost:1234');

var user;


// Get user account
var handshake = function(){
	socket.emit("handshake", { name : "Wetteren", firstname : "Rémi"});
}
socket.on("handshake", function(data){
    user = data.user;
});

socket.on("system", function(msg){
    system(msg);
});


// Connexion
handshake();