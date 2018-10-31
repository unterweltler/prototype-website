function onYouTubeIframeAPIReady() {
    YouTubeLoader.assignPlayerEvent();
}

var YouTubeLoader = {
    jsLoaded: false,
    players: [],
    init: function() {
        if (document.getElementsByClassName('js-start-youtube').length > 0) {
            if (!YouTubeLoader.jsLoaded) {
                YouTubeLoader.initYouTubeJS();
            } else {
                YouTubeLoader.assignPlayerEvent();
            }
        }
    },
    assignPlayerEvent: function() {
        Array.prototype.slice.call(document.getElementsByClassName('js-start-youtube')).forEach(function(item) {
            item.onclick = YouTubeLoader.initVideoPlayer;
        });
    },
    initVideoPlayer: function() {
        if (this.parentNode.className.indexOf('is-video-initialized') === -1) {
            var data = JSON.parse(this.getAttribute('data-params'));
            data.events = {
                'onReady': YouTubeLoader.playVideo,
                'onStateChange': YouTubeLoader.stateChange
            };

            YouTubeLoader.players.push(new YT.Player(this.previousElementSibling, data));
            this.parentNode.className += ' is-video-initialized';
        }
    },
    stateChange: function(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            YouTubeLoader.players.forEach(YouTubeLoader.pauseVideo, event);
        }
    },
    initYouTubeJS: function() {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        YouTubeLoader.jsLoaded = true;
    },
    pauseVideo: function(player) {
        if (player !== this.target) {
            player.pauseVideo();
        }
    },
    pauseAllVideos: function() {
        YouTubeLoader.players.forEach(YouTubeLoader.pauseVideo);
    },
    playVideo: function(event) {
        event.target.playVideo();
    },
    resetVideo: function(player) {
        var videoWrapper = player.getIframe().parentNode;
        var className = videoWrapper.className;

        videoWrapper.className = className.slice(0, className.length - ' is-video-initialized'.length);
        player.destroy();
        YouTubeLoader.players.pop();
    },
    resetVideos: function() {
        YouTubeLoader.players.forEach(YouTubeLoader.resetVideo);
    }
};

YouTubeLoader.init();
