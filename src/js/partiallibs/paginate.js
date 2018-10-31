var Paginate = {
    active: false,
    before: null,
    fire: null,
    after: null,
    callback: null,
    init: function(target) {
        var start = target || document;
        Array.prototype.slice.call(start.getElementsByClassName('js-load')).forEach(Paginate.attachLoader);
        Paginate.registerEvents();
    },
    registerEvents: function() {
        if (typeof Event === 'function') {
            Paginate.before = new Event('paginate.before');
            Paginate.after = new Event('paginate.after');
            Paginate.fire = new Event('paginate.fire', {bubbles: true});
        } else {
            Paginate.before = document.createEvent('Event');
            Paginate.after = document.createEvent('Event');
            Paginate.fire = document.createEvent('Event');

            Paginate.before.initEvent('paginate.before', false, true);
            Paginate.after.initEvent('paginate.after', false, true);
            Paginate.fire.initEvent('paginate.fire', true, true);
        }
    },
    addCallback: function(callback) {
        Paginate.callback = callback;
    },
    attachLoader: function(control) {
        control.top = control.getBoundingClientRect().top + Paginate.getScrollTop();
        control.checking = false;

        if (control.hasAttribute('data-autoscroll')) {
            Paginate.active = true;
        }

        control.addEventListener('click', Paginate.load);
    },
    scrollCheck: function() {
        Array.prototype.slice.call(document.getElementsByClassName('js-load-scroll')).forEach(Paginate.triggerScroll);
    },
    triggerScroll: function(control) {
        if (Paginate.active && control && !control.checking && Paginate.isVisible(control)) {
            control.checking = true;
            Paginate.request(control);
        }
    },
    isVisible: function(element) {
        return element.top <= Paginate.getViewPosition();
    },
    getViewPosition: function() {
        return Paginate.getScrollTop() + window.innerHeight;
    },
    getScrollTop: function() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    },
    load: function(event) {
        event.preventDefault();
        if (!this.loading) {
            this.dispatchEvent(Paginate.fire);
            this.loading = true;
            Paginate.request(this);
            Paginate.active = true;
        }
    },
    getTargetClassName: function(dataId) {
        return 'js-partial-' + dataId;
    },
    request: function(control) {
        var dataId = Paginate.getTargetClassName(control.getAttribute('data-id'));
        var target = document.getElementsByClassName(dataId).item(0);
        var dataAction = control.getAttribute('data-action');
        Paginate.before.dataAction = dataAction;
        target.dispatchEvent(Paginate.before);

        var request = new XMLHttpRequest();

        request.open('GET', control.href, true);
        request.responseType = 'document';
        request.control = control;
        request.target = target;
        request.dataAction = dataAction;
        request.targetClassName = dataId;
        request.addEventListener('load', Paginate.success);
        request.addEventListener('error', Paginate.error);
        request.addEventListener('abort', Paginate.error);
        request.send();
    },
    success: function() {
        if (this.status >= 200 && this.status < 400) {
            var content = this.responseXML.getElementsByClassName(this.targetClassName).item(0);
            var target = this.target;
            var action = this.dataAction;

            if (target) {
                switch (action) {
                    case 'append':
                        Paginate.removeLoadButton(this.control, this.target);
                        target.innerHTML += content.innerHTML;
                        break;
                    case 'replace':
                        target.innerHTML = content.innerHTML;
                        break;
                    case 'add':
                        Paginate.removeLoadButton(this.control, this.target);
                        Array.prototype.slice.call(content.children).forEach(Paginate.callback, this);
                        break;
                }
            }

            Paginate.init(target);
        } else {
            Paginate.error();
        }
        Paginate.after.dataAction = action;
        target.dispatchEvent(Paginate.after);
        this.control.loading = false;
    },
    removeLoadButton: function(control, target) {
        var loadWrapper = Paginate.getLoadWrapperNode(control, target);

        if (loadWrapper) {
            target.removeChild(loadWrapper);
        }
    },
    getLoadWrapperNode: function(node, target) {
        var loadWrapper = false;

        if (node.className.indexOf('js-load-wrapper') !== -1 && node !== target) {
            loadWrapper = node;
        } else {
            loadWrapper = Paginate.getLoadWrapperNode(node.parentNode, target);
        }

        return loadWrapper;
    },
    error: function() {
        console.log('Error establishing the connection or invalid response');
    }
};

Paginate.init();
