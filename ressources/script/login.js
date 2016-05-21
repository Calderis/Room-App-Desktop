var http = require("http");
var login = {
	mode : true,
	signin : function(){
		console.log("Signin");
		login.mode = false;
		if(login.pseudo.childNodes[0].value == "") {
			login.pseudo.childNodes[1].className = "alert";
			login.mode = true;
		}
		if(login.room.childNodes[0].value == "") {
			login.room.childNodes[1].className = "alert";
			login.mode = true;
		}
		console.log(login.mode);
		if(!login.mode){
			createRoom(login.pseudo.childNodes[0].value, login.link.childNodes[0].value, login.room.childNodes[0].value, login.password.childNodes[0].value);
		}
	},
	pseudo : document.getElementById("pseudo"),
	link : document.getElementById("link"),
	room : document.getElementById("room"),
	password : document.getElementById("password")
}


// Watch for focus out on Input. If input aren't empty, let's let up label
login.pseudo.childNodes[0].addEventListener("blur", function(){
	setLabelOut(this);
}, this);
login.link.childNodes[0].addEventListener("blur", function(){
	setLabelOut(this);
}, this);
login.room.childNodes[0].addEventListener("blur", function(){
	setLabelOut(this);
}, this);
login.password.childNodes[0].addEventListener("blur", function(){
	setLabelOut(this);
}, this);

// Set label out
function setLabelOut(div){
	if(div.value != ""){
		div.parentNode.childNodes[1].className = "out";
	} else {
		if(div.parentNode.childNodes[1].className != "alert"){
			div.parentNode.childNodes[1].className = "";
		}
	}
}

// Create Room
var createRoom = function(pseudo, link, room, password){
    console.log("Create room");
	socket.emit("createRoom", { pseudo : pseudo, link : link, room : room, password : password });
}
// Join Room
socket.on("joinRoom", function(data){
    console.log(data);
    ipcRenderer.send('openApp'); // Open in full and editable size
    document.getElementById("login").style.display = "none"; // hide login panel
    document.getElementById("app").style.display = "block";

    for(var i = 0; i<data.room.playlist.length; i++){
        addVideoLink(data.room.playlist[i].identity.link);
    }
});

socket.on("needLink", function(){
    login.link.childNodes[1].className = "alert";
    login.mode = true;
});
socket.on("badPassword", function(){
    login.password.childNodes[0].value = "";
    login.password.childNodes[1].className = "alert";
    login.mode = true;
});
