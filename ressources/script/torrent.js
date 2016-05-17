var videoBloc = document.getElementById('videoBloc');

var torrentStream = require('torrent-stream');


function initTorrentVideo(magnet){
  console.log("init torrent");
  var engine = torrentStream(magnet, {
      path:"./ressources/videos/"
  });

  engine.on('ready', function() {
      engine.files.forEach(function(file) {
          var stream = file.createReadStream();

          createVignette(file.name);
          // stream is readable stream to containing the file content
      });
      //createVignette(engine.files[0].name);
  });

  engine.on("download", function(piece){
      //console.log(piece);
  });
}

// http://www.cpasbien.cm/telechargement/game-of-thrones-s06e01-vostfr-hdtv.torrent
