var Cookienotice = {
    element: document.getElementById('js-cookienotice'),
    spacer: document.getElementById('js-cookienotice-spacer'),
    btnAccept: document.getElementById('js-cookienotice-accept'),
    btnDeny: document.getElementById('js-cookienotice-deny'),
    init: function () {
        if (!localStorage.cookieAccept && !sessionStorage.cookieAccept && Cookienotice.element) {
            Cookienotice.element.classList.remove('hidden');
            Cookienotice.setSpacerHeight();
        }

        if (Cookienotice.btnAccept) {
            Cookienotice.btnAccept.addEventListener('click', Cookienotice.setAccept);
        }

        if (Cookienotice.btnDeny) {
            Cookienotice.btnDeny.addEventListener('click', Cookienotice.setDeny);
        }
    },
    setAccept: function () {
        Cookienotice.element.classList.add('hidden');
        Cookienotice.resetSpacerHeight();
        localStorage.setItem('cookieAccept', 'true');
    },
    setDeny: function () {
        Cookienotice.element.classList.add('hidden');
        Cookienotice.resetSpacerHeight();
        sessionStorage.setItem('cookieDeny', 'true');
    },
    setSpacerHeight: function () {
        Cookienotice.spacer.style.height = Cookienotice.element.offsetHeight + 'px';
    },
    resetSpacerHeight: function () {
        Cookienotice.spacer.style.height = '';
    }
};

Cookienotice.init();
