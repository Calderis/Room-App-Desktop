var zoneChat = document.getElementById("zoneChat");


// Enter pressed on chat input
function sendMessage(event, input){
	if(event.keyCode == 13) {
		speak(input.value);
		input.value = "";
	}
}
// User speak
function speak(msg){
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
	}
}

// When receiving message
var lastReveived = "";
function receive(name, msg){
	var li = document.createElement("li");
	li.className = "other";
	msg = msg.replace("\"", "'");
	if(lastReveived == name) li.innerHTML = "<span class='msg'>"+msg+"</span>";
	else li.innerHTML = "<span class='name'>"+name+"</span><span class='msg'>"+msg+"</span>";
	lastReveived = name;
	zoneChat.appendChild(li);
	zoneChat.scrollTop = zoneChat.scrollHeight;
}