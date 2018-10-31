var HistoryBack = {
    init: function () {
        Array.prototype.slice.call(document.getElementsByClassName('js-historyback')).forEach(HistoryBack.attachEventListeners);
    },
    attachEventListeners: function (item) {
        item.addEventListener('click', HistoryBack.pageBack);
    },
    pageBack: function (event) {
        if (document.referrer.indexOf(location.origin) === 0) {
            event.preventDefault();

            window.history.back();
        }
    }
};

HistoryBack.init();
