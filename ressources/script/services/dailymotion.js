var DMPlayer;

function getDailyMotionId(url) {
    var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
    if (m !== null) {
        if(m[4] !== undefined) {
            return m[4];
        }
        return m[2];
    }
    return null;
}

function initDailymotionVideo(url){
    Video.type = "Dailymotion";

    console.log(getDailyMotionId(url));
    var idVideo = getDailyMotionId(url);

    DMPlayer = DM.player(document.getElementById("video"), {
    video: idVideo,
    background: "#000000",
    events: {
        onReady: function(){
            Video.element = DMPlayer;
            Video.type = "Dailymotion";
        }
    }
  });
}

/*function onYouTubeIframeAPIReady(id) {
    
}*/

/*function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}*/


/*

console.log(getDailyMotionId("http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music"));
console.log(getDailyMotionId("http://www.dailymotion.com/video/x44lvd"));
console.log(getDailyMotionId("http://www.dailymotion.com/hub/x9q_Galatasaray"));
console.log(getDailyMotionId("http://www.dailymotion.com/hub/x9q_Galatasaray#video=xjw21s"));
console.log(getDailyMotionId("http://www.dailymotion.com/video/xn1bi0_hakan-yukur-klip_sport"));
*/
