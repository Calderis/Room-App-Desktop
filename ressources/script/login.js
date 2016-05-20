var http = require("http");

var loginMode = true;
function login(){
	loginMode = false;
	ipcRenderer.send('openApp');
	document.getElementById("login").style.display = "none";
;}


function getPosterFilm(url){
	var filmName = getNameFilm(url);
	console.log(filmName);
	// get walking directions from central park to the empire state building
    api = "http://api.themoviedb.org/3/search/movie?api_key=ed9f85c76141c2976bbef8c5ba03c4e6&query=" + escape(filmName);

    // http://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
    getFilm(api);

}
//getPosterFilm("http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent");
function getFilm(url){
	var request = http.get(url, function (response) {
	    var buffer = "", 
	        data,
	        route;

	    response.on("data", function (chunk) {
	        buffer += chunk;
	    }); 

	    response.on("end", function (err) {
	        data = JSON.parse(buffer);
	        console.log(data.results);
	        document.getElementById("backgroundPict").style.backgroundImage = "url(http://image.tmdb.org/t/p/w500"+data.results[0].poster_path+")"
	    }); 
	}); 
}




var listFilms = ["http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent", "David.And.Goliath.2016.FRENCH.BDRiP.x264-AViTECH.www.topanalyse.org.mkv", "Pandemic.2016.FRENCH.BDRip.x264-ViVi-www.topanalyse.org.mkv", "Arrete.Ton.Cinema.2016.FRENCH.BDRip.x264-PRiDEHD.www.topanalyse.org.mkv", "david-et-goliath-french-dvdrip-2016.torrent", "david-et-goliath-french-dvdrip-x264-2016.torrent", "le-convoi-french-dvdrip-2016.torrent", "pandemic-french-dvdrip-2016.torrent", "zootopie-french-dvdrip-2016.torrent"]

function getNameFilm(url){
	// http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent
	var fileName = url.substring(url.lastIndexOf('/')+1);
	// game-of-thrones-s06e01-vostfr-hdtv.torrent
	fileName = fileName.replace(/\.\w*/, "");
	// game-of-thrones-s06e01-vostfr-hdtv
	fileName = fileName.replace(/\W+/g, " ");
	// game of thrones vostfr hdtv
	fileName = fileName.replace(/\s(vo)+\S+.*/gi, "");
	// game of thrones
	fileName = fileName.replace(/\s\w+\d+.*/g, "");
	fileName = fileName.replace(/\s(hd.*)|\s(dvd.*)|\s(bd.*)/gi, "");

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
