var VimeoLoader = {
    jsLoaded: false,
    players: [],
    init: function() {
        if (document.getElementsByClassName('js-start-vimeo').length > 0) {
            if (!VimeoLoader.jsLoaded) {
                VimeoLoader.assignPlayerEvent();
                VimeoLoader.initVimeoJS();
            } else {
                VimeoLoader.assignPlayerEvent();
            }
        }
    },
    assignPlayerEvent: function() {
        Array.prototype.slice.call(document.getElementsByClassName('js-start-vimeo')).forEach(function(item) {
            item.onclick = VimeoLoader.initVideoPlayer;
        });
    },
    initVideoPlayer: function() {
        if (this.parentNode.className.indexOf('is-video-initialized') === -1) {
            var data = JSON.parse(this.getAttribute('data-params'));
            var player = new Vimeo.Player(this.previousElementSibling, data);

            VimeoLoader.players.push(player);
            this.parentNode.className += ' is-video-initialized';
        }
    },
    initVimeoJS: function() {
        var tag = document.createElement('script');
        tag.src = 'https://player.vimeo.com/api/player.js';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        VimeoLoader.jsLoaded = true;
    }
};

VimeoLoader.init();
