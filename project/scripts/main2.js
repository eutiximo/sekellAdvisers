var $g, window, document;

(function() {
    'use strict';
    
    $g = {
        ww: window.innerWidth,
        wh: window.innerHeight
    };
    
    /*
     * Function for get a new size windows if a resized
     */
    $g.fnWindowResize = function () {
        window.addEventListener('resize', function () {
            $g.ww = window.innerWidth;
            $g.wh = window.innerHeigh;
        });
    };
    
    /*
     * Change height size of container
     */
    $g.fnSuitSection = function () {
        var Elems = document.querySelectorAll('[suit]');
        
        [].forEach.call(Elems, function (elem, index) {
            var getSet = +elem.getAttribute('suit'),
                setHeight = getSet || $g.wh;
            
            elem.style.height = setHeight + 'px';
            
            if (!getSet) {
                window.addEventListener('resize', function () {
                    elem.style.height = window.innerHeight + 'px';
                });
            }
        });
    };
    
    //Init
    $g.fnWindowResize();
    $g.fnSuitSection();
})();