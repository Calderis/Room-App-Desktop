var zoneChat = document.getElementById("zoneChat");
var chatIcon = document.getElementById("chatIcon");


// Enter pressed on chat input
function sendMessage(event, input){
	if(event.keyCode == 13) {
		speak(input.value);
		input.value = "";
	}
}
// User speak
function speak(msg){
	if(typeof msg == "string"){
		if(msg == "") {
			document.getElementById("inputChat").blur();
			closeBoth();
		}
		else {
			var li = document.createElement("li");
			li.className = "me";
			msg = msg.replace("\"", "'");
			li.innerHTML = "<span class='msg'>"+msg+"</span>";
			zoneChat.appendChild(li);
			zoneChat.scrollTop = zoneChat.scrollHeight;

			// Send message to other
			sync.socket.emit("newRoomMessage", { message : msg});
		}
	}
}

// System message
function system(msg){
	var li = document.createElement("li");
	li.className = "system";
	li.innerHTML = "<span>"+msg+"</span>";
	zoneChat.appendChild(li);
	zoneChat.scrollTop = zoneChat.scrollHeight;
}

sync.socket.on("receiveRoomMessage", function(data){
	if(data.name != user.identity.firstname) receive(data.name, data.message);
});

// When receiving message
var lastReveived = "";
function receive(name, msg){
	console.log(name, user.identity.name);
	if( name != user.identity.name){
		var li = document.createElement("li");
		li.className = "other";
		msg = msg.replace("\"", "'");
		if(lastReveived == name) li.innerHTML = "<span class='msg'>"+msg+"</span>";
		else li.innerHTML = "<span class='name'>"+name+"</span><span class='msg'>"+msg+"</span>";
		lastReveived = name;
		zoneChat.appendChild(li);
		zoneChat.scrollTop = zoneChat.scrollHeight;
		if(app.className != "app openChat") {
			chatIcon.className = "alert";
		}
	}
}
