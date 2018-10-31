var Tabby = {
    init: function () {
        var tabs = document.getElementsByClassName('js-tab');
        if (tabs.length > 0) {
            Array.prototype.slice.call(tabs).forEach(Tabby.initTabElement);
            if (window.location.hash && window.location.hash.indexOf('#tab-') !== -1) {
                var activeIdElement = document.getElementById(window.location.hash.replace('#tab-', ''));
                if (activeIdElement.className.indexOf('js-tab-trigger') !== -1) {
                    activeIdElement.click();
                }
            }
        }
    },
    initTabElement: function (item) {
        var options = item.getAttribute('data-options');
        if(options) {
            item.options = JSON.parse(item.getAttribute('data-options'));
        }

        Array.prototype.slice.call(item.getElementsByClassName('js-tab-trigger')).forEach(Tabby.attachEventListener, item);
    },
    attachEventListener: function (item) {
        item.addEventListener('click', Tabby.toggleElements);

        if (item.checked) {
            Tabby.setTab(item);
            item.previous = true;
        }
    },
    collapseTab: function (item) {
        if (item.previous) {
            item.checked = false;
            item.previous = false;
        } else {
            item.previous = true;
        }
    },
    toggleElements: function (event) {
        if (this.hasAttribute('data-collapse')) {
            Tabby.collapseTab(this);
        }
        Tabby.toggleElement(this.name);
    },
    toggleElement: function (name) {
        Array.prototype.slice.call(document.getElementsByName(name)).forEach(Tabby.setTab);
    },
    setTab: function (item) {
        var tabContent = document.getElementById('js-tab-' + item.id);

        if (item.checked) {
            tabContent ? tabContent.classList.add('is-toggled') : '';

            var options = Tabby.getOptions(item);
            if((options && options.history !== false) || !options) {
                history.replaceState(undefined, undefined, '#tab-' + item.id);
            }
        } else {
            tabContent ? tabContent.classList.remove('is-toggled') : '';
            item.previous = false;
        }
    },
    getOptions: function (item) {
        return Tabby.getWrapperNode(item.parentNode).options;
    },
    getWrapperNode: function(node) {
        if (node.className.indexOf('js-tab') === -1) {
            node = Tabby.getWrapperNode(node.parentNode);
        }

        return node;
    }
};

Tabby.init();
