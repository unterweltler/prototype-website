var Hero = {
    element: document.getElementById('js-trianglify'),
    wrapper: null,
    init: function () {
        Hero.wrapper = Hero.element.parentNode;

        var pattern = Hero.getPattern();
        Hero.element.appendChild(pattern.canvas());
    },
    getPattern: function() {
        var pattern = Trianglify({
            width: Hero.wrapper.scrollWidth,
            height: Hero.wrapper.scrollHeight,
            x_colors: 'Oranges',
        });

        return pattern;
    },
    reCalc: function () {
        var pattern = Hero.getPattern();
        Hero.element.replaceChild(pattern.canvas(), Hero.element.getElementsByTagName('canvas')[0]);
    }
};

Hero.init();