var socket = io.connect('http://localhost:1234');

var user;






// Get user account
var handshake = function(){
	socket.emit("handshake", { name : "Wetteren", firstname : "Rémi"});
}
socket.on("handshake", function(data){
    user = data.user;
    console.log(user);
});

// Create Room
var createRoom = function(){
	socket.emit("createRoom", { name : "MyRoom" });
}
// Get room data
socket.on("refreshRoom", function(data){
    user.room = data.room;
    console.log(user);
});


socket.on("msg", function(data){
    console.log(data);
    var li = document.createElement("li");
    li.innerHTML = data;
    document.getElementById("tchat").appendChild(li);
});



// Connexion
handshake();
createRoom();