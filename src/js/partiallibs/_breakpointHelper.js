var BreakpointHelper = {
    check: function () {
        var helperElement = document.getElementById('js-breakpointhelper');
        var breakpoint = 'none';

        if(helperElement) {
            breakpoint = window.getComputedStyle(helperElement, ':before').content;
        }

        return breakpoint;
    }
};
