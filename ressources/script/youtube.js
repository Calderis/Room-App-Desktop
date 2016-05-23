var YTPlayer;

function initYoutubeVideo(url){
    console.log(url);
    Video.type = "Youtube";
    YTPlayer = new YT.Player('video', {
        videoId: url.split('watch?v=')[1],
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

