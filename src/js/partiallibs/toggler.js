var Toggler = {
    init: function () {
        Array.prototype.slice.call(document.getElementsByClassName('js-toggle')).forEach(Toggler.attachShowOnClick);
    },
    attachShowOnClick: function (item) {
        item.addEventListener('click', Toggler.toggleElements);
    },
    toggleElements: function (event) {
        if (this.nodeName === 'A') {
            event.preventDefault();
        }

        var triggerClassName = this.className;
        var targetClassName = 'js-toggle-' + this.getAttribute('data-toggle');

        if (this.on) {
            if (this.getAttribute('data-label-off')) {
                this.textContent = this.getAttribute('data-label-off');
            }

            this.className = triggerClassName.slice(0, triggerClassName.length - ' is-active'.length);

            this.on = false;
        } else {
            if (this.getAttribute('data-label-on')) {
                this.textContent = this.getAttribute('data-label-on');
            }

            this.className += ' is-active';

            this.on = true;
        }

        Array.prototype.slice.call(document.getElementsByClassName(targetClassName)).forEach(Toggler.toggleElement);
    },
    toggleElement: function (item) {
        var targetClassName = item.className;

        if (targetClassName.indexOf('is-toggled') === -1) {
            item.className += ' is-toggled';
        } else {
            item.className = targetClassName.slice(0, targetClassName.length - ' is-toggled'.length);
        }
    }
};

Toggler.init();
