var Toaster = {
    loaf: null,
    getToast: function (text, cssClass, removeTime, fadeoutTime) {
        var loaf = Toaster.getToastLoaf();
        var toast = document.createElement('div');
        toast.innerHTML = text;
        toast.className = 'c-toast fadein ' + cssClass;

        toast.fadeoutTime = fadeoutTime || 5000;
        toast.removeTime = removeTime || 1000;

        return loaf.appendChild(toast);
    },
    getToastLoaf: function () {
        if (!Toaster.loaf) {
            Toaster.loaf = document.createElement('div');
            Toaster.loaf.id = 'c-toast-loaf';
            document.body.appendChild(Toaster.loaf);
        }
        return Toaster.loaf;
    },
    addCheeseToast: function (text, cssClass, removeTime) {
        cssClass = cssClass || '';
        var toast = Toaster.getToast(
            text,
            'c-toast--static ' + cssClass,
            removeTime
        );
        toast.addEventListener('click', Toaster.initToastRemoval);

        return toast;
    },
    addToast: function (text, cssClass, removeTime, fadeoutTime) {
        cssClass = cssClass || '';
        var toast = Toaster.getToast(text, cssClass, removeTime, fadeoutTime);
        Toaster.initFadeoutTimeout(toast);
        toast.addEventListener('mouseenter', Toaster.resetTimeout);
        toast.addEventListener('mouseleave', Toaster.initFadeoutTimeout, toast);

        return toast;
    },
    resetTimeout: function (toast) {
        toast = toast.target || toast;
        window.clearTimeout(toast.timeoutId);
    },
    initToastRemoval: function (toast) {
        toast = toast.target || toast;
        toast.className += ' fadeout';
        window.setTimeout(Toaster.removeToast, toast.removeTime, toast);
    },
    removeToast: function (toast) {
        toast.parentNode.removeChild(toast);
    },
    initFadeoutTimeout: function (toast) {
        toast = toast.target || toast;
        toast.timeoutId = window.setTimeout(
            Toaster.initToastRemoval,
            toast.fadeoutTime,
            toast
        );
    }
};
