//=require vendor/*.js
//=require partiallibs/_*.js

// Remove function if it shouldn't be called
function scrollEvent() {
    /*
    if (typeof Paginate !== 'undefined') {
        Paginate.scrollCheck(); // use this if you want to trigger pagination on scrolling
    }
    */
    
    /* Put your code here */

    GlobalEventThrottle.throttleScroll = false;
    //console.log(GlobalEventThrottle.scrollEvent);
}

// Remove function if it shouldn't be called
function resizeEvent() {
    Hero.reCalc();

    GlobalEventThrottle.throttleResize = false;
    //console.log(GlobalEventThrottle.resizeEvent);
}

//=require partials/*.js
