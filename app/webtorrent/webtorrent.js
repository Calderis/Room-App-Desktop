// Logs
var logs = [];
function log(str){
  logs.push(str);
}

// Client
var client = new WebTorrent();
function createClient(){
  var clt = new WebTorrent();
  log('New client created.');

  clt.on('error', function (err) {
    console.error('ERROR: ' + err.message);
  });

  return clt;
};

// Download new torrent
function newTorrent(torrentId){
  console.log('Adding torrent ' + torrentId);
  client.add(torrentId, onTorrent);
};

// Get torrent data
function onTorrent(torrent){
  log('Got torrent metadata!');

  var progression = 0;

  // Print out progress every 41 milliseconds
  var interval = setInterval(function () {
    // % of downloaded
    progression = (torrent.progress * 100).toFixed(1);
    onDownload(progression);
  }, 41);

  torrent.on('done', function () {
    log('Progress: 100%');
    clearInterval(interval);
  });

  // Render all files into to the page
  torrent.files.forEach(function (file) {
    file.appendTo('.log');
    file.getBlobURL(function (err, url) {
      if (err) return log(err.message);
      log('File done.');
      log('<a href="' + url + '">Download full file: ' + file.name + '</a>');
    });
  });
}
function onDownload(percent){
  log(percent);
}