var Poggler = {
    init: function () {
        Array.prototype.slice.call(document.getElementsByClassName('js-poggle')).forEach(Poggler.attachShowOnClick);
    },
    attachShowOnClick: function (item) {
        item.addEventListener('change', Poggler.togglePassword);
    },
    togglePassword: function () {
        var targetId = this.getAttribute('data-target');
        var target = targetId && document.getElementById(targetId);

        if(target) {
            if(this.checked) {
                target.type= 'text';
            } else {
                target.type= 'password';
            }
        }
    },
};

Poggler.init();
