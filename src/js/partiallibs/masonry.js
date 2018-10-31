var Masonry = {
    element: null,
    init: function () {
        if (document.getElementsByClassName('js-masonry')) {
            Masonry.element = document.getElementsByClassName('js-masonry')[0];
            Masonry.attachEventListeners();
        }
    },
    attachEventListeners: function () {
        if(document.readyState === 'complete'){
            Masonry.resizeAllMasonryItems();
        } else {
            window.addEventListener('load', function() {
                Masonry.resizeAllMasonryItems();
            });
        }
    },
    resizeMasonryItem: function (item) {
        if (BreakpointHelper.check() !== '"mobile"') {
            var rowHeight = parseInt(window.getComputedStyle(Masonry.element).getPropertyValue('grid-auto-rows'));
            var rowGap = parseInt(window.getComputedStyle(Masonry.element).getPropertyValue('grid-row-gap'));
            var rowSpan = Math.ceil((item.querySelector('.js-masonry-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = 'span ' + rowSpan;
        }

        item.classList.add('is-loaded');
        Masonry.element.classList.add('is-loaded');
    },
    resizeAllMasonryItems: function () {
        Array.prototype.slice.call(document.getElementsByClassName('js-masonry-item')).forEach(Masonry.resizeMasonryItem);
    }
};

Masonry.init();
