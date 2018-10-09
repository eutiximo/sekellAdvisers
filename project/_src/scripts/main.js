//=include ../../../node_modules/jquery/dist/jquery.min.js
//=include ../../../node_modules/bootstrap/dist/js/bootstrap.min.js
//=include ../../../node_modules/particles.js/particles.js

(function () {
    'use strict';
    
    var $g = {
        ww: $(window).width(),
        wh: $(window).height()
    };
    
    //=include method.suit-section.js
    //=include method.particles.js
    
    $(window).on('resize', function (event) {
        $g.ww = $(window).width();
        $g.wh = $(window).height();
    });
    
    //When the document is ready
    $(function () {
        suitSection();
        fnParticles('particles-1', 'set1');
        fnParticles('particles-2', 'set2');
        fnParticles('particles-5', 'set2');
        fnParticles('particles-9', 'set2');
        
        $("a[href*='https://www.hostinger']").remove();
    });
}());