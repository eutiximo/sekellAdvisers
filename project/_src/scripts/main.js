var $g, window, document;

//=include ../../../node_modules/jquery/dist/jquery.min.js
//=include ../../../node_modules/bootstrap/dist/js/bootstrap.min.js
//=include ../../../node_modules/particles.js/particles.js

(function() {
    'use strict';
    
    $g = {
        ww: window.innerWidth,
        wh: window.innerHeight,
        methos: {}
    };
    
    /*
     * Function for get a new size windows if a resized
     */
    $g.methos.windowResize = function () {
        window.addEventListener('resize', function () {
            $g.ww = window.innerWidth;
            $g.wh = window.innerHeigh;
        });
    };
    
    /*
     * Change height size of container
     */
    $g.methos.suitSection = function () {
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
    
    /*
     * 
     */
    $g.methos.fitFontSize = function () {
        var Elems = $("[fit-fz]");
        
        function core(divElem) {
            var spanElem,
                spanWidth,
                getReduce = divElem.data("reduce"),
                divWidth = divElem.width();
            
            divElem.html("<span>" + divElem.text() + "</div>");
            
            spanElem = divElem.children();
            spanWidth = spanElem.width();
            
            let currentFontSize = 1,
                prevWidth = 0;
            
            while (divWidth > spanWidth && currentFontSize < 200) {
                divElem.css({
                    "font-size": `${currentFontSize}px`,
                    "line-height": `${currentFontSize}px`
                });
                
                currentFontSize += 1;
                prevWidth = spanWidth;
                spanWidth = spanElem.width();
                
                if (spanWidth < prevWidth && currentFontSize > 3) {
                    spanWidth = divWidth;
                    divElem.css("font-size", (currentFontSize - 2) + "px");
                }
            }
            
            if (getReduce) {
                let getReduceInPx = currentFontSize - (getReduce * 100 / currentFontSize);
                divElem.css({
                    "font-size": `${ getReduceInPx }px`,
                    "line-height": `${ getReduceInPx }px`
                });
            }
        }
        
        Elems.each(function (index, value) {
            var getDiv = $(this).children("div");
            
            getDiv.each(function (inx, val) { core($(val)); });
            
            $(window).on("resize", function () {
                getDiv.each(function (inx, val) { core($(val)); });
            });
            
        });
    };
    
    //Init
    $g.methos.windowResize();
    $g.methos.suitSection();
    //$g.methos.fitFontSize();
    setTimeout($g.methos.fitFontSize, 100);
})();