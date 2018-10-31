var LazyLoader = {
    imageList: null,
    viewMinX: 0,
    viewMaxX: 0,
    timeout: 300,
    stopClick: true,
    init: function() {
        if ('pointer-events' in document.documentElement.style) {
            LazyLoader.stopClick = false;
        }
        LazyLoader.updateImageList();
        LazyLoader.loadHighRes();
    },
    inView: function(element) {
        var offsetTop = element.top;
        var offsetMax = element.bottom;
        return (offsetTop >= LazyLoader.viewMinX || offsetMax >= LazyLoader.viewMinX)
            && (offsetTop <= LazyLoader.viewMaxX || offsetMax <= LazyLoader.viewMaxX);
    },
    getScrollTop: function() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    },
    setViewPosition: function() {
        LazyLoader.viewMinX = LazyLoader.getScrollTop();
        LazyLoader.viewMaxX = LazyLoader.viewMinX + window.innerHeight;
    },
    showHighRes: function() {
        var link = this.element.parentNode;
        link.style.backgroundImage = "url('" + link.href + "')";
        this.element.className = "lazy--hide";
        link.onclick = LazyLoader.stopClick && LazyLoader.noClick;
        this.element.loading = false;
    },
    noClick: function(e) {
        e.preventDefault();
    },
    updateImageList: function() {
        LazyLoader.imageList = Array.prototype.slice.call(document.getElementsByClassName("lazy--low"));
        LazyLoader.updateImagePositions();
    },
    updateImagePositions: function() {
        LazyLoader.imageList.forEach(LazyLoader.setImagePosition);
    },
    setImagePosition: function(image) {
        var rect = image.getBoundingClientRect();
        image.top = rect.top;
        image.bottom = rect.bottom;
    },
    loadBackground: function(element) {
        if (LazyLoader.inView(element) && !element.loading) {
            element.loading = true;
            var image = new Image();
            image.src = element.parentNode.href;
            image.element = element;
            image.addEventListener('load', LazyLoader.showHighRes);
        }
    },
    loadHighRes: function() {
        LazyLoader.setViewPosition();
        LazyLoader.imageList.forEach(LazyLoader.loadBackground);
        return true;
    }
};

LazyLoader.init();
