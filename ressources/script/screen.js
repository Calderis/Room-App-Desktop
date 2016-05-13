var app = document.getElementById("app");

// Open Menu
function openMenu(){
	app.className = "app openMenu";
}

// Close both : Chat and Menu
function closeBoth(){
	app.className = "app";
}

// Open Chat
function openChat(){
	app.className = "app openChat";
}