// TODO: This is experimental code for the future and it doesn't work and hasn't been tested

var AutoLoader = {
    baseUrl: '/typo3conf/ext/koch_distribution/Resources/Public/Javascript/',
    plugins: null,
    init: function() {
        AutoLoader.loadObjects();
    },
    loadObjects: function() {
        Array.prototype.slice.call(document.getElementsByClassName('js-autoload')).forEach(AutoLoader.loadObject);
    },
    loadObject: function(item) {
        var key = item.getAttribute('data-autoload');

        if (key in AutoLoader.plugins && !AutoLoader.isLoaded(key)) {
            AutoLoader.loadObject(key);
        }
    },
    isLoaded: function(key) {
        return AutoLoader.plugins[key];
    },
    loadObject: function(key) {
        AutoLoader.plugins[key] = true;

        var tag = document.createElement('script');
        tag.src = AutoLoader.baseUrl + key + '.js';
        var firstScriptTag = document.getElementsByTagName('script').item(0);
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    registerPlugin: function(key) {
        AutoLoader.plugins[key] = {
            active: false,
            file: '',

        }

    }
};
