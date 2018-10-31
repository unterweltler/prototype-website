var Materialize = {
    init: function() {
        HTMLLabelElement.prototype.isActive = Materialize.isActive;
        HTMLLabelElement.prototype.setActive = Materialize.setActive;
        HTMLLabelElement.prototype.removeActive = Materialize.removeActive;
        Array.prototype.slice.call(document.getElementsByClassName('form-group--materialize')).forEach(Materialize.attachEvents);
    },
    attachEvents: function(item) {
        var field = item.querySelector('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea');

        if (field) {
            var label = item.getElementsByTagName('label').item(0);

            if (field.value !== '') {
                label.setActive();
            }

            field.label = label;
            field.addEventListener('focus', Materialize.onfocus);
            field.addEventListener('blur', Materialize.onblur);
        }
    },
    onfocus: function() {
        this.label.setActive();
    },
    onblur: function() {
        if (this.value === '') {
            this.label.removeActive();
        }
    },
    removeActive: function() {
        if (this.isActive()) {
            this.className = this.className.replace(' active', '');
        }
    },
    setActive: function() {
        if (!this.isActive()) {
            this.className += ' active';
        }
    },
    isActive: function() {
        return this.className.indexOf('active') !== -1
    }
};

Materialize.init();
