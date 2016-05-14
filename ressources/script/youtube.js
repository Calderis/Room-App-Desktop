var YTPlayer;

function initYoutubeVideo(url){
    url = url.split('watch?v=')[1];
    console.log(url);
    initializeYoutube(url);
}

function initializeYoutube(id){
    YTPlayer = new YT.Player('video', {
        videoId: id,
        playerVars: {
            color: 'black',
            controls: '0',
            modestbranding : "1",
            rel: "0",
            showinfo: "0"
        },
        events: {
            onReady: function(){
                Video.element = YTPlayer;
                Video.type = "Youtube";
                Video.bloc = document.getElementById('video');
            }
        }
    });
}

function onYouTubeIframeAPIReady(id) {
    
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

