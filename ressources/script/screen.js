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
	chatIcon.className = "";
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



// Delete little picture
function deleteVideo(element){
	element.parentNode.removeChild(element)
}


function checkAddEntry(event, input){
	if(event.keyCode == 13){
		sync.addVideoLink(input.value);
		input.value = "";
	}
}
//Add new video
function addVideoLink(link){
	if(link.match("youtube")) {
		console.log("Youtube Mode");
		Video.type = "Youtube";
		createVignette(link);
	} else if(link.match(".torrent")){
		console.log("WCJS Mode");
		Video.type = "WCJS";
		magnetLink(link, function (err, link) {
		  // you got a magnet link from a remote torrent file
		  initTorrentVideo(link);
		});
	} else {
		Video.type = "Classic";
		createVignette(link);
	}
}

//Add new vignettes
function createVignette(link){
	var li = document.createElement("li");
	if(Video.type == "Classic"){
		getPosterFilm(link, li);
		li.innerHTML = '<span class="icn" onclick="sync.selectVideo(\''+Video.type+'\', \''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span><h3>'+getNameFilm(link)+'</h3>';
	} else if(Video.type == "WCJS"){
		getPosterFilm(link, li);
		li.innerHTML = '<span class="icn" onclick="sync.selectVideo(\''+Video.type+'\', \''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span><h3>'+getNameFilm(link)+'</h3>';
	} else if(Video.type == "Youtube"){
		var id = link.split('watch?v=')[1];
		li.style.backgroundImage = "url('http://img.youtube.com/vi/"+id+"/0.jpg')";
		li.innerHTML = '<span class="icn" onclick="sync.selectVideo(\''+Video.type+'\', \''+link+'\')"></span><span class="close" onclick="deleteVideo(this.parentElement)">x</span>';
	}
	
	playlist.insertBefore(li, playlist.childNodes[0]);
	console.log(li);
}


// delete a div from id
function remove(id) {
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

// Set focus on input brother
function getFocus(div){
	console.log(div.parentNode.childNodes[0].focus());
}


function getPosterFilm(url, div){
	var filmName = getNameFilm(url);
	// get walking directions from central park to the empire state building
    api = "http://api.themoviedb.org/3/search/movie?api_key=ed9f85c76141c2976bbef8c5ba03c4e6&query=" + escape(filmName);

    var request = http.get(api, function (response) {
	    var buffer = "", 
	        data,
	        route;

	    response.on("data", function (chunk) {
	        buffer += chunk;
	    }); 

	    response.on("end", function (err) {
	        data = JSON.parse(buffer);
	        sync.poster = "http://image.tmdb.org/t/p/w500"+data.results[0].poster_path;
	        div.style.backgroundImage = "url("+sync.poster+")";
	    }); 
	}); 

}
//getPosterFilm("http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent");



function getNameFilm(url){
	// http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent
	var fileName = url.substring(url.lastIndexOf('/')+1);
	// game-of-thrones-s06e01-vostfr-hdtv.torrent
	fileName = fileName.replace(/\.\w*/, "");	// game-of-thrones-s06e01-vostfr-hdtv
	fileName = fileName.replace(/\W+/g, " ");
	// game of thrones vostfr hdtv
	fileName = fileName.replace(/\s(vo)+\S+.*/gi, "");
	// game of thrones
	fileName = fileName.replace(/\s\w+\d+.*/g, "");
	fileName = fileName.replace(/\s(hd.*)|\s(dvd.*)|\s(bd.*)/gi, "");
	fileName = fileName.replace(/www\s|cm\s/gi, "");

	fileName = checkLang(fileName);

	return fileName;
}

function checkLang(film){
	film = film.replace(/\sfrench.*/gi, ""); // french
	film = film.replace(/\sspanish.*/gi, ""); // spanish
	film = film.replace(/\senglish.*/gi, ""); // english
	film = film.replace(/\sportuguese.*/gi, ""); // portuguese
	return film
}


// Keypress, detect Space to pause
document.addEventListener('keydown', function(event) {
	if(login.mode){
		if(event.keyCode == 13){
			login.signin();
		}
		return false;
	}
	// Only when input is not focused
	if(document.activeElement.id != inputChat.id && document.activeElement.id != "dropInput"){
		if(event.keyCode == 32) sync.playPause();
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
    	//else openMenu();
    }
    else if(event.keyCode == 38){ // top
		openPlaylist();
    }
    else if(event.keyCode == 40){ // bottom, force controls to stay opened
		openControls();
    }
});


// Prevent from reloading
window.onbeforeunload = function (e) {
	e.preventDefault()
};